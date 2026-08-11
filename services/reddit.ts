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
 * Candidate threads across all three subs, newest first.
 *
 * This returns candidates, not answers. Whether Alif has anything real to say
 * about a thread is decided later, by the model, against the voice files, and
 * a thread he cannot speak to from experience gets dropped rather than filled.
 */
export async function findRedditThreads(): Promise<RedditThread[]> {
  const token = await getToken();
  const all: RedditThread[] = [];

  for (const subreddit of SUBREDDITS) {
    all.push(...(await readSubreddit(subreddit, token)));

    // Reddit asks for no more than one request a second on this tier.
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  all.sort((a, b) => a.ageHours - b.ageHours);

  logger.info("Found Reddit candidates", { count: all.length, subreddits: SUBREDDITS.length });

  return all;
}
