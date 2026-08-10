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
