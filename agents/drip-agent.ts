import { z } from "zod";
import { generateJson } from "../services/openai.js";
import { logger } from "../services/logger.js";
import {
  createQueueDraft,
  readJournalSince,
  readQueuedHooks,
  setJournalState,
  type JournalEntry
} from "../services/notion.js";
import { readTextFile, writeJsonFile } from "../utils/file.js";
import { getWeekDate } from "../utils/date.js";

/** Channels the daily run is allowed to draft for. */
const DAILY_CHANNELS = ["LinkedIn", "X"] as const;
type DailyChannel = (typeof DAILY_CHANNELS)[number];

/**
 * Reddit is excluded because every Reddit post needs Alif's review before it
 * exists at all, and Product Hunt is event-driven rather than a daily channel.
 * Both are drafted through a DRIP session, by hand.
 */
const VOICE_FILES: Record<DailyChannel, string> = {
  LinkedIn: ".claude/rules/voice-linkedin-alif.md",
  X: ".claude/rules/voice-x.md"
};

/** The journal must have moved within this window or the run refuses to draft. */
const JOURNAL_STALE_DAYS = 7;

const DraftSchema = z.object({
  channel: z.enum(["LinkedIn", "X", "Reddit", "Product Hunt"]),
  hook: z.string().trim().min(1),
  body: z.string().trim().min(1),
  format: z.enum([
    "The Room",
    "The Correction",
    "The Quiet Cost",
    "The Question I Keep Getting",
    "The Disagreement",
    "The Small Artifact",
    "The Founder Note"
  ]),
  subject: z.enum([
    "Enterprise UX reality",
    "Design leadership and craft",
    "Building Ommelo",
    "Design and AI in practice"
  ]),
  media: z.enum(["None", "Screenshot", "Image", "Carousel", "Video"]),
  why_this_format: z.string().trim().min(1),
  beat: z.string().trim().min(1),
  journal_entry_id: z.string().optional()
});

const ResponseSchema = z.object({
  drafts: z.array(DraftSchema).default([]),
  skipped: z.array(z.object({ reason: z.string() })).default([])
});

export type Draft = z.infer<typeof DraftSchema>;

export interface DripResult {
  drafted: boolean;
  reason?: string;
  drafts: Draft[];
  skipped: Array<{ reason: string }>;
  discarded: Array<{ hook: string; reason: string }>;
}

function daysAgoIso(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

/**
 * "No em dashes" is the single voice rule confirmed by Alif rather than
 * guessed, so it is enforced here rather than left to the prompt. A draft that
 * breaks it is discarded instead of rewritten, because silently substituting
 * punctuation changes sentences that Alif has not seen.
 */
function containsEmDash(draft: Draft): boolean {
  return /[—–]/.test(`${draft.hook}\n${draft.body}`);
}

function formatJournal(entries: JournalEntry[]): string {
  return entries
    .map((entry) => {
      const detail = entry.detail ? `\n  detail: ${entry.detail}` : "";
      return `- id: ${entry.id}\n  date: ${entry.date ?? "unknown"}\n  state: ${entry.state ?? "raw"}\n  note: ${entry.note}${detail}`;
    })
    .join("\n");
}

function pickProvider(): "openai" | "anthropic" {
  return process.env.ANTHROPIC_API_KEY ? "anthropic" : "openai";
}

export async function runDrip(channel: DailyChannel = "LinkedIn"): Promise<DripResult> {
  const since = daysAgoIso(JOURNAL_STALE_DAYS);
  const entries = await readJournalSince(since);

  if (entries.length === 0) {
    const reason = `The journal has had no entries since ${since}. Not drafting. An empty week is information; inventing material to fill it is not.`;
    logger.warn(reason);
    return { drafted: false, reason, drafts: [], skipped: [], discarded: [] };
  }

  const usable = entries.filter((entry) => entry.state === "raw" || entry.state === "beat");

  if (usable.length === 0) {
    const reason = `${entries.length} journal entries found, but all have already been drafted from. Not drafting, so nothing gets used twice.`;
    logger.warn(reason);
    return { drafted: false, reason, drafts: [], skipped: [], discarded: [] };
  }

  const [systemPrompt, voice, story, rules, platform, queuedHooks] = await Promise.all([
    readTextFile("prompts/daily-draft-prompt.md"),
    readTextFile(VOICE_FILES[channel]),
    readTextFile("data/story.md"),
    readTextFile("data/rules.md"),
    readTextFile("data/platform.md"),
    readQueuedHooks()
  ]);

  const userPrompt = [
    `Draft for ${channel} only. Today is ${getWeekDate()}.`,
    `Draft at most one post. Fewer is fine. None is fine if the material is not there.`,
    ``,
    `=== VOICE FILE (${channel}) ===`,
    voice,
    ``,
    `=== STORY ===`,
    story,
    ``,
    `=== PRIVACY RAILS ===`,
    rules,
    ``,
    `=== PLATFORM ===`,
    platform,
    ``,
    `=== JOURNAL ENTRIES (last ${JOURNAL_STALE_DAYS} days) ===`,
    formatJournal(usable),
    ``,
    `=== HOOKS ALREADY IN THE QUEUE, DO NOT REPEAT ===`,
    queuedHooks.length ? queuedHooks.map((hook) => `- ${hook}`).join("\n") : "(queue is empty)"
  ].join("\n");

  const raw = await generateJson({
    systemPrompt,
    userPrompt,
    temperature: 0.7,
    provider: pickProvider()
  });

  const parsed = ResponseSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error(`Draft response did not match the expected shape: ${parsed.error.message}`);
  }

  const discarded: Array<{ hook: string; reason: string }> = [];
  const kept: Draft[] = [];

  for (const draft of parsed.data.drafts) {
    if (draft.channel !== channel) {
      discarded.push({ hook: draft.hook, reason: `Wrong channel: asked for ${channel}, got ${draft.channel}.` });
      continue;
    }

    if (containsEmDash(draft)) {
      discarded.push({ hook: draft.hook, reason: "Contains an em dash or en dash, which Alif never uses." });
      continue;
    }

    kept.push(draft);
  }

  for (const item of discarded) {
    logger.warn("Discarded a draft", { reason: item.reason });
  }

  return {
    drafted: kept.length > 0,
    drafts: kept,
    skipped: parsed.data.skipped,
    discarded
  };
}

/**
 * Files drafts into Notion as Status "Draft" and moves their source journal
 * entries to "drafted". Nothing is ever marked Ready and nothing is published:
 * Alif reads every row and posts by hand.
 */
export async function fileDrafts(result: DripResult, date = getWeekDate()): Promise<string[]> {
  const urls: string[] = [];

  for (const draft of result.drafts) {
    const url = await createQueueDraft({
      hook: draft.hook,
      body: draft.body,
      date,
      channel: draft.channel,
      format: draft.format,
      subject: draft.subject,
      media: draft.media,
      whyThisFormat: draft.why_this_format,
      beat: draft.beat
    });

    urls.push(url);

    if (draft.journal_entry_id) {
      await setJournalState(draft.journal_entry_id, "drafted");
    }
  }

  await writeJsonFile(`outputs/drafts-${date}.json`, result);

  return urls;
}
