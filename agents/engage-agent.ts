import { readFile } from "node:fs/promises";
import { generateJson } from "../services/openai.js";
import { logger } from "../services/logger.js";
import type { RedditThread } from "../services/reddit.js";
import type { ProductHuntLaunch } from "../services/producthunt.js";

/**
 * Turns candidate threads and launches into drafted comments in Alif's voice.
 *
 * The voice files are read from disk at run time rather than baked in, so a
 * correction Alif makes in a DRIP session takes effect on the next run without
 * anyone remembering to update this file.
 */

const VOICE_FILES: Record<Platform, string> = {
  Reddit: ".claude/rules/voice-reddit.md",
  "Product Hunt": ".claude/rules/voice-producthunt.md"
};

export type Platform = "Reddit" | "Product Hunt";

export interface DraftedComment {
  platform: Platform;
  url: string;
  summary: string;
  comment: string;
  why: string;
}

export interface SkippedItem {
  url: string;
  reason: string;
}

export interface EngageResult {
  comments: DraftedComment[];
  skipped: SkippedItem[];
}

async function read(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8");
  } catch {
    logger.warn("Could not read file, continuing without it", { path });
    return "";
  }
}

function provider(): "openai" | "anthropic" {
  return process.env.ANTHROPIC_API_KEY ? "anthropic" : "openai";
}

/**
 * The instruction the model works to. Everything load-bearing about how Alif
 * sounds lives in the voice files; this only says what to do with them.
 */
async function systemPrompt(platform: Platform): Promise<string> {
  const [voice, rails, story] = await Promise.all([
    read(VOICE_FILES[platform]),
    read("data/rules.md"),
    read("data/story.md")
  ]);

  return `You are drafting comments for Alif Noushad to post by hand. You never post anything.

Alif is a Senior Experience Designer at IBM iX Studio Dubai, six years in enterprise consultancy, a computer science degree and a year and a half as a software engineer before design. He is building Ommelo, a design review tool, on the side.

THE VOICE FILE FOR ${platform.toUpperCase()}. The "Comment voice" section is the operative part.
${voice}

THE PRIVACY RAILS. These are absolute.
${rails}

HIS SUBJECTS AND HIS REAL MATERIAL. Comments may only draw on things that actually happened, which means this file and nothing else.
${story}

HOW TO WORK

Open every comment with something concrete from Alif's own working life. Never a grade of their post. Never restate their point back to them. Never reframe what they said as a lesson. Stay on their exact subject and speak from a different seat: enterprise consultancy, Dubai, an engineering background, a product on the side.

Disagree with claims, never with people. Alif is warm about people and blunt about practices, and there is no sardonic register anywhere in him.

Never invent a number, a result, a client, a user or an experience. If a thread needs a story Alif does not have, skip the thread. Skipping is the correct outcome and it is expected often.

No links. No mention of Ommelo unless the person has directly asked what he is building, and never in r/UXDesign in any form.

No em dashes anywhere.

SKIP AGGRESSIVELY. Twelve good comments beat twenty filled slots. Skip anything where the honest answer is that he has nothing real to add, anything that would need an invented experience, anything a hundred other designers could have written, and anything that sits near a rail.

Return JSON only, in this exact shape:
{"comments":[{"url":"...","summary":"the post in one line","comment":"the drafted comment","why":"one line on why this one"}],"skipped":[{"url":"...","reason":"..."}]}`;
}

function redditUserPrompt(threads: RedditThread[], target: number): string {
  const items = threads.map((thread) => ({
    url: thread.url,
    subreddit: `r/${thread.subreddit}`,
    title: thread.title,
    body: thread.selftext.slice(0, 1500),
    ageHours: Math.round(thread.ageHours * 10) / 10,
    existingComments: thread.numComments
  }));

  return `Draft at most ${target} Reddit comments from these threads. Answer the exact question asked, from direct experience, and stop.

Length: two sentences is often right, six is fine if the question is technical.

Remember r/UXDesign has no Ommelo mention of any kind.

THREADS:
${JSON.stringify(items, null, 2)}`;
}

function productHuntUserPrompt(launches: ProductHuntLaunch[], target: number): string {
  const items = launches.map((launch) => ({
    url: launch.url,
    name: launch.name,
    tagline: launch.tagline,
    description: launch.description.slice(0, 800),
    topics: launch.topics
  }));

  return `Draft at most ${target} Product Hunt comments on these launches. Two to four sentences each, on a specific part of what they built, from someone who has hit the same problem from a different angle.

Never "congrats". Never a comparison to Ommelo. Never a link.

LAUNCHES:
${JSON.stringify(items, null, 2)}`;
}

export async function draftComments(
  platform: Platform,
  candidates: RedditThread[] | ProductHuntLaunch[],
  target: number
): Promise<EngageResult> {
  if (candidates.length === 0) {
    logger.warn("No candidates to draft from", { platform });
    return { comments: [], skipped: [] };
  }

  const userPrompt =
    platform === "Reddit"
      ? redditUserPrompt(candidates as RedditThread[], target)
      : productHuntUserPrompt(candidates as ProductHuntLaunch[], target);

  const raw = (await generateJson({
    systemPrompt: await systemPrompt(platform),
    userPrompt,
    temperature: 0.6,
    provider: provider()
  })) as { comments?: unknown[]; skipped?: unknown[] };

  const comments: DraftedComment[] = (raw.comments ?? [])
    .map((item) => item as Record<string, string>)
    .filter((item) => item.url && item.comment)
    // An em dash is a hard fail everywhere in this system, so it is enforced
    // here rather than trusted to the prompt.
    .filter((item) => {
      if (item.comment.includes("—")) {
        logger.warn("Discarded a comment containing an em dash", { url: item.url });
        return false;
      }
      return true;
    })
    .map((item) => ({
      platform,
      url: item.url,
      summary: item.summary ?? "",
      comment: item.comment,
      why: item.why ?? ""
    }));

  const skipped: SkippedItem[] = (raw.skipped ?? [])
    .map((item) => item as Record<string, string>)
    .filter((item) => item.url)
    .map((item) => ({ url: item.url, reason: item.reason ?? "" }));

  logger.info("Drafted comments", { platform, drafted: comments.length, skipped: skipped.length });

  return { comments, skipped };
}
