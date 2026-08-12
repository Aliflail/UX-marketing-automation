import { logger } from "./logger.js";

/**
 * Reads new threads from the subreddits Alif works, so ENGAGE can hand him
 * real links instead of a search page to go hunting through.
 *
 * Read-only, and it never posts. Reddit's own API, with an app credential
 * rather than a login, which is the route their terms actually allow. There is
 * no account of Alif's involved and nothing here can comment.
 */

const SUBREDDITS = ["UXDesign", "userexperience", "SideProject"] as const;

/**
 * A comment on a thread that is hours old with forty replies is not read by
 * anyone. These two numbers are the whole reason this file exists: they are the
 * filter a human cannot apply quickly by eye.
 */
const MAX_AGE_HOURS = 4;
const MAX_EXISTING_COMMENTS = 15;

/** Reddit rejects requests with a generic or absent User-Agent. */
const USER_AGENT = "web:the-signal-desk:v1.0 (personal content research, read only)";

export interface RedditThread {
  subreddit: string;
  title: string;
  selftext: string;
  url: string;
  ageHours: number;
  numComments: number;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

interface ListingResponse {
  data: {
    children: Array<{
      data: {
        subreddit: string;
        title: string;
        selftext: string;
        permalink: string;
        created_utc: number;
        num_comments: number;
        stickied: boolean;
        over_18: boolean;
      };
    }>;
  };
}

export function redditConfigured(): boolean {
  return Boolean(process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET);
}

/**
 * App-only token. This authenticates the script, not a user: it cannot vote,
 * comment or post, which is exactly the permission level this system should
 * ever hold.
 */
async function getToken(): Promise<string> {
  const id = process.env.REDDIT_CLIENT_ID;
  const secret = process.env.REDDIT_CLIENT_SECRET;

  if (!id || !secret) {
    throw new Error(
      "REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET are required. Create a free 'script' app at https://www.reddit.com/prefs/apps."
    );
  }

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": USER_AGENT
    },
    body: "grant_type=client_credentials"
  });

  if (!response.ok) {
    throw new Error(`Reddit token request failed (${response.status}): ${await response.text()}`);
  }

  return ((await response.json()) as TokenResponse).access_token;
}

async function readSubreddit(subreddit: string, token: string): Promise<RedditThread[]> {
  const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/new?limit=40`, {
    headers: { Authorization: `Bearer ${token}`, "User-Agent": USER_AGENT }
  });

  if (!response.ok) {
    logger.warn("Reddit listing failed", { subreddit, status: response.status });
    return [];
  }

  const listing = (await response.json()) as ListingResponse;
  const now = Date.now() / 1000;

  return listing.data.children
    .map((child) => child.data)
    .filter((post) => !post.stickied && !post.over_18)
    .map((post) => ({
      subreddit: post.subreddit,
      title: post.title,
      selftext: post.selftext ?? "",
      url: `https://www.reddit.com${post.permalink}`,
      ageHours: (now - post.created_utc) / 3600,
      numComments: post.num_comments
    }))
    .filter((post) => post.ageHours <= MAX_AGE_HOURS && post.numComments <= MAX_EXISTING_COMMENTS);
}

/**
 * Reddit's public JSON API now returns 403 without an OAuth app credential, and
 * Reddit is no longer issuing those to everyone. The one read-only path that
 * still works key-free is each subreddit's Atom RSS feed, so this is the
 * fallback when no REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET are configured.
 *
 * RSS gives title, permalink, subreddit, posted time and body text, but NOT the
 * comment count, so the MAX_EXISTING_COMMENTS filter cannot run on this path.
 * That filter is skipped here on purpose rather than silently guessed at.
 */
async function readSubredditRss(subreddit: string): Promise<RedditThread[]> {
  let response: Response | null = null;

  // Reddit throttles key-free RSS heavily and answers 429 without a body telling
  // you when to retry, so back off with a little jitter and try again.
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    response = await fetch(`https://www.reddit.com/r/${subreddit}/new/.rss`, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8"
      }
    });

    if (response.ok) break;

    logger.warn("Reddit RSS failed, retrying", { subreddit, status: response.status, attempt });

    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt + Math.round(Math.random() * 1000)));
    }
  }

  // The loop always assigns on every attempt, so this is safe after it exits.
  const final = response as Response;

  if (!final.ok) {
    logger.warn("Reddit RSS failed after retries", { subreddit, status: final.status });
    return [];
  }

  const xml = await final.text();
  const now = Date.now();
  const threads: RedditThread[] = [];

  // Atom is a predictable fixed structure; parse entries without an XML dep.
  for (const entry of extractAtomEntries(xml)) {
    const title = extractAtomTag(entry, "title");
    const url = extractAtomLink(entry);
    const published = extractAtomTag(entry, "published") || extractAtomTag(entry, "updated");
    const contentHtml = unescapeHtml(extractAtomTag(entry, "content") || extractAtomTag(entry, "summary"));

    if (!title || !url || !published) continue;

    const selftext = contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const ageHours = (now - Date.parse(published)) / 3600000;

    // numComments is unknown on RSS, so 0 keeps it under any ceiling above.
    threads.push({ subreddit, title, selftext, url, ageHours, numComments: 0 });
  }

  return threads.filter((post) => Number.isFinite(post.ageHours) && post.ageHours <= MAX_AGE_HOURS);
}

/** Splits an Atom feed into its <entry> blocks. */
function extractAtomEntries(xml: string): string[] {
  return Array.from(xml.matchAll(/<entry[\s>][\s\S]*?<\/entry>/g), (m) => m[0]);
}

/** Pulls the text content of the first occurrence of a tag inside an entry. */
function extractAtomTag(entry: string, tag: string): string {
  const match = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? unescapeXml(match[1]?.trim() ?? "") : "";
}

/** Pulls the href of an entry's <link .../>. */
function extractAtomLink(entry: string): string {
  const match = entry.match(/<link[^>]*href\s*=\s*"([^"]+)"/);
  return match?.[1] ?? "";
}

function unescapeHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#32;/g, " ");
}

function unescapeXml(xml: string): string {
  return unescapeHtml(xml);
}

/**
 * Candidate threads across all three subs, newest first.
 *
 * This returns candidates, not answers. Whether Alif has anything real to say
 * about a thread is decided later, by the model, against the voice files, and
 * a thread he cannot speak to from experience gets dropped rather than filled.
 *
 * Uses the OAuth API when credentials are configured (gives comment counts),
 * otherwise falls back to the key-free RSS feeds.
 */
export async function findRedditThreads(): Promise<RedditThread[]> {
  const all: RedditThread[] = [];

  if (redditConfigured()) {
    const token = await getToken();

    for (const subreddit of SUBREDDITS) {
      all.push(...(await readSubreddit(subreddit, token)));

      // Reddit asks for no more than one request a second on this tier.
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  } else {
    for (const subreddit of SUBREDDITS) {
      all.push(...(await readSubredditRss(subreddit)));

      // Give the unauthenticated RSS endpoint breathing room between subs.
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  all.sort((a, b) => a.ageHours - b.ageHours);

  logger.info("Found Reddit candidates", {
    count: all.length,
    subreddits: SUBREDDITS.length,
    source: redditConfigured() ? "oauth" : "rss"
  });

  return all;
}
