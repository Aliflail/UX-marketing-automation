import "dotenv/config";
import { draftComments } from "../agents/engage-agent.js";
import { logger } from "../services/logger.js";
import { findProductHuntLaunches, productHuntConfigured } from "../services/producthunt.js";
import { findRedditThreads, redditConfigured } from "../services/reddit.js";
import {
  appendCommentTargets,
  dailyPlanConfigured,
  findDailyPlanRow,
  setCommentTally,
  type CommentTarget
} from "../services/notion.js";

/**
 * The morning ENGAGE run.
 *
 * Finds real threads and launches, drafts a comment for each one Alif can
 * genuinely speak to, and writes them into today's Daily Plan row with their
 * links. He opens Notion, copies, and posts by hand.
 *
 * TWO CHANNELS ONLY, AND THE REASON MATTERS.
 *
 * Reddit and Product Hunt both have a real read-only API that works without
 * anyone logging in as anyone. LinkedIn and X do not: both require an
 * authenticated session to see a feed at all, both forbid automated reading in
 * their terms, and LinkedIn bans accounts for it. Automating those two would
 * mean risking the account this whole plan is built on to save some scrolling.
 * So they stay manual, on purpose, and that is not a gap to be closed later.
 *
 * Nothing here posts. There is no credential in this repo that can.
 *
 * ON GREEN TICKS THAT MEAN NOTHING.
 *
 * The first version of this file caught every error, logged it and returned
 * normally, so a run where all three legs were broken still reported success.
 * Alif watched a green tick produce nothing for five days. A run now fails
 * loudly when something is actually broken, and only reports success when
 * either comments were written or there was genuinely nothing to say. Those
 * two outcomes are different and the exit code has to tell them apart.
 */

/** Alif's daily targets for the two channels this run covers. */
const REDDIT_TARGET = 4;
const PRODUCT_HUNT_TARGET = 5;

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function runEngage(): Promise<void> {
  if (!dailyPlanConfigured()) {
    throw new Error(
      "Notion is not configured for the Daily Plan. Set NOTION_API_KEY and NOTION_DAILY_DB_ID. See .env.example."
    );
  }

  // Say the configuration out loud before doing anything, so the first lines of
  // the log answer "why is this empty" without anyone reading the code.
  logger.info("ENGAGE preflight", {
    reddit: redditConfigured() ? "app credentials" : "key-free RSS, heavily rate limited",
    productHunt: productHuntConfigured() ? "configured" : "NOT CONFIGURED, leg will be skipped",
    model: process.env.OPENROUTER_API_KEY
      ? "openrouter"
      : process.env.ANTHROPIC_API_KEY
        ? "anthropic"
        : process.env.OPENAI_API_KEY
          ? "openai"
          : "NONE, no model key set"
  });

  const today = new Date().toISOString().slice(0, 10);
  const rowId = await findDailyPlanRow(today);

  if (!rowId) {
    throw new Error(
      `No Daily Plan row for ${today}. Add the row in Notion or run DRIP to plan the day. This run creates nothing.`
    );
  }

  const all: CommentTarget[] = [];
  const skipped: Array<{ url: string; reason: string }> = [];
  const failures: string[] = [];

  // Reddit runs regardless of credentials: it falls back to key-free RSS feeds
  // when no OAuth app credentials are configured.
  try {
    const threads = await findRedditThreads();

    if (threads.length === 0) {
      failures.push(
        "Reddit returned no candidate threads at all. With key-free RSS this usually means rate limiting, not a quiet day. Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET."
      );
    } else {
      const result = await draftComments("Reddit", threads, REDDIT_TARGET);
      all.push(...result.comments);
      skipped.push(...result.skipped);
    }
  } catch (error) {
    failures.push(`Reddit leg failed: ${describe(error)}`);
    logger.error("Reddit leg failed", error);
  }

  if (productHuntConfigured()) {
    try {
      const launches = await findProductHuntLaunches();
      const result = await draftComments("Product Hunt", launches, PRODUCT_HUNT_TARGET);
      all.push(...result.comments);
      skipped.push(...result.skipped);
    } catch (error) {
      failures.push(`Product Hunt leg failed: ${describe(error)}`);
      logger.error("Product Hunt leg failed", error);
    }
  } else {
    failures.push("Product Hunt is not configured. Set PRODUCTHUNT_TOKEN.");
  }

  // Write whatever did come through, even on a partial failure. Half a morning
  // of comments is worth having.
  if (all.length > 0) {
    await appendCommentTargets(rowId, all, skipped);
    await setCommentTally(rowId, `0 / ${all.length} drafted, plus 10 LinkedIn by hand`);
    logger.info("Wrote to the Daily Plan", { drafted: all.length, date: today });
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      logger.error("BROKEN", { detail: failure });
    }

    throw new Error(
      `ENGAGE finished with ${failures.length} broken leg(s) and wrote ${all.length} comment(s). See the BROKEN lines above. This run is marked failed on purpose: a green tick on a run that produced nothing is how a fault goes unnoticed for a week.`
    );
  }

  if (all.length === 0) {
    logger.info("Nothing worth commenting on today, and nothing was broken.");
    logger.info("An empty morning is a real outcome. It is not a failure and it is not filled.");
    return;
  }

  logger.info("ENGAGE complete", { drafted: all.length, skipped: skipped.length, date: today });
}

runEngage().catch((error) => {
  logger.error("ENGAGE run failed", error);
  process.exitCode = 1;
});
