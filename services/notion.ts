import { logger } from "./logger.js";

const NOTION_VERSION = "2022-06-28";
const NOTION_API = "https://api.notion.com/v1";

/** Notion rejects any single rich text item longer than this. */
const RICH_TEXT_LIMIT = 2000;

export interface JournalEntry {
  id: string;
  note: string;
  date: string | null;
  state: string | null;
  detail: string;
}

export interface QueueDraft {
  hook: string;
  body: string;
  date: string;
  channel: "LinkedIn" | "X" | "Reddit" | "Product Hunt";
  format: string;
  subject: string;
  media: string;
  whyThisFormat: string;
  beat: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is required. See .env.example, and README section "Connecting Notion" for where to get it.`
    );
  }

  return value;
}

async function notionFetch<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${NOTION_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${requireEnv("NOTION_API_KEY")}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...init.headers
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Notion ${init.method ?? "GET"} ${path} failed (${response.status}): ${detail}`);
  }

  return (await response.json()) as T;
}

/**
 * Notion caps each rich text item at 2000 characters, so longer bodies are
 * split across several items. They render as one continuous block.
 */
function richText(value: string): Array<Record<string, unknown>> {
  if (!value) {
    return [];
  }

  const chunks: string[] = [];

  for (let index = 0; index < value.length; index += RICH_TEXT_LIMIT) {
    chunks.push(value.slice(index, index + RICH_TEXT_LIMIT));
  }

  return chunks.map((chunk) => ({ type: "text", text: { content: chunk } }));
}

function plainText(property: unknown): string {
  if (!property || typeof property !== "object") {
    return "";
  }

  const container = property as { title?: unknown[]; rich_text?: unknown[] };
  const items = container.title ?? container.rich_text ?? [];

  return items
    .map((item) => (item as { plain_text?: string }).plain_text ?? "")
    .join("")
    .trim();
}

function selectName(property: unknown): string | null {
  const container = property as { select?: { name?: string } } | undefined;
  return container?.select?.name ?? null;
}

function dateStart(property: unknown): string | null {
  const container = property as { date?: { start?: string } } | undefined;
  return container?.date?.start ?? null;
}

interface NotionQueryResponse {
  results: Array<{ id: string; properties: Record<string, unknown> }>;
  has_more: boolean;
  next_cursor: string | null;
}

/**
 * Reads journal entries added on or after `sinceIso`.
 *
 * This is the input the whole system runs on. If it comes back empty the
 * daily run stops rather than inventing material.
 */
export async function readJournalSince(sinceIso: string): Promise<JournalEntry[]> {
  const databaseId = requireEnv("NOTION_JOURNAL_DB_ID");
  const entries: JournalEntry[] = [];
  let cursor: string | null = null;

  do {
    const page: NotionQueryResponse = await notionFetch<NotionQueryResponse>(
      `/databases/${databaseId}/query`,
      {
        method: "POST",
        body: JSON.stringify({
          filter: { property: "Date", date: { on_or_after: sinceIso } },
          sorts: [{ property: "Date", direction: "descending" }],
          start_cursor: cursor ?? undefined,
          page_size: 100
        })
      }
    );

    for (const result of page.results) {
      entries.push({
        id: result.id,
        note: plainText(result.properties.Note),
        date: dateStart(result.properties.Date),
        state: selectName(result.properties.State),
        detail: plainText(result.properties.Detail)
      });
    }

    cursor = page.has_more ? page.next_cursor : null;
  } while (cursor);

  logger.info("Read journal entries from Notion", { count: entries.length, since: sinceIso });

  return entries;
}

/**
 * Hooks already in the queue, used to stop the same beat being drafted twice.
 */
export async function readQueuedHooks(): Promise<string[]> {
  const databaseId = requireEnv("NOTION_QUEUE_DB_ID");

  const page = await notionFetch<NotionQueryResponse>(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify({ page_size: 100 })
  });

  return page.results.map((result) => plainText(result.properties.Hook)).filter(Boolean);
}

/**
 * Files one draft into the Content Queue.
 *
 * Status is always "Draft". Nothing this system writes is ever marked Ready,
 * and nothing is ever published: Alif reads, approves and posts by hand.
 */
export async function createQueueDraft(draft: QueueDraft): Promise<string> {
  const databaseId = requireEnv("NOTION_QUEUE_DB_ID");

  const page = await notionFetch<{ id: string; url: string }>("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Hook: { title: richText(draft.hook) },
        Body: { rich_text: richText(draft.body) },
        Date: { date: { start: draft.date } },
        Channel: { select: { name: draft.channel } },
        Format: { select: { name: draft.format } },
        Subject: { select: { name: draft.subject } },
        Media: { select: { name: draft.media } },
        Status: { select: { name: "Draft" } },
        "Why this format": { rich_text: richText(draft.whyThisFormat) },
        Beat: { rich_text: richText(draft.beat) }
      }
    })
  });

  logger.info("Filed draft into Notion queue", { channel: draft.channel, format: draft.format });

  return page.url;
}

/** Moves a journal entry along the pipeline once a draft has come out of it. */
export async function setJournalState(pageId: string, state: string): Promise<void> {
  await notionFetch(`/pages/${pageId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: { State: { select: { name: state } } } })
  });
}

export function notionConfigured(): boolean {
  return Boolean(
    process.env.NOTION_API_KEY && process.env.NOTION_QUEUE_DB_ID && process.env.NOTION_JOURNAL_DB_ID
  );
}

/* --------------------------------------------------------------------------
 * Daily Plan
 *
 * One row per day, every channel in that row. This is the database Alif opens
 * in the morning, so ENGAGE writes the day's comment targets into it rather
 * than leaving them in a terminal he will never see.
 * ------------------------------------------------------------------------ */

export interface CommentTarget {
  platform: string;
  url: string;
  summary: string;
  comment: string;
  why: string;
}

/**
 * Finds today's row. Returns null rather than creating one, because a missing
 * row means DRIP has not planned the day and inventing a row here would hide
 * that.
 */
export async function findDailyPlanRow(isoDate: string): Promise<string | null> {
  const databaseId = requireEnv("NOTION_DAILY_DB_ID");

  const page = await notionFetch<NotionQueryResponse>(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: { property: "Date", date: { equals: isoDate } },
      page_size: 1
    })
  });

  return page.results[0]?.id ?? null;
}

function heading(text: string): Record<string, unknown> {
  return {
    object: "block",
    type: "heading_3",
    heading_3: { rich_text: richText(text) }
  };
}

function paragraph(text: string): Record<string, unknown> {
  return {
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: richText(text) }
  };
}

function linkedParagraph(label: string, url: string): Record<string, unknown> {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [{ type: "text", text: { content: label, link: { url } } }]
    }
  };
}

/**
 * Appends the day's drafted comments to the row, each one under its link.
 *
 * Appends rather than replaces: ENGAGE may run more than once in a morning,
 * and losing yesterday's working notes to a re-run would be worse than a
 * slightly long page.
 */
export async function appendCommentTargets(
  pageId: string,
  targets: CommentTarget[],
  skipped: Array<{ url: string; reason: string }>
): Promise<void> {
  const blocks: Array<Record<string, unknown>> = [
    heading(`Drafted comments, ${new Date().toISOString().slice(0, 10)}`),
    paragraph(
      "Copy each comment, open its link, paste, edit anything that is not yours. Nothing here has been posted."
    )
  ];

  for (const [index, target] of targets.entries()) {
    blocks.push(linkedParagraph(`${index + 1}. ${target.platform}: ${target.summary}`, target.url));
    blocks.push(paragraph(target.comment));

    if (target.why) {
      blocks.push(paragraph(`Why this one: ${target.why}`));
    }
  }

  if (skipped.length > 0) {
    blocks.push(heading("Skipped, and why"));

    for (const item of skipped) {
      blocks.push(paragraph(`${item.reason} (${item.url})`));
    }
  }

  // Notion accepts at most 100 blocks per append.
  for (let index = 0; index < blocks.length; index += 100) {
    await notionFetch(`/blocks/${pageId}/children`, {
      method: "PATCH",
      body: JSON.stringify({ children: blocks.slice(index, index + 100) })
    });
  }

  logger.info("Wrote comment targets into the Daily Plan", {
    drafted: targets.length,
    skipped: skipped.length
  });
}

/** Updates the day's comment tally, e.g. "0 / 9 drafted". */
export async function setCommentTally(pageId: string, tally: string): Promise<void> {
  await notionFetch(`/pages/${pageId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: { Comments: { rich_text: richText(tally) } } })
  });
}

export function dailyPlanConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DAILY_DB_ID);
}
