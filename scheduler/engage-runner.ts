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
 */

/** Alif's daily targets for the two channels this run covers. */
const REDDIT_TARGET = 4;
const PRODUCT_HUNT_TARGET = 5;

export async function runEngage(): Promise<void> {
  if (!dailyPlanConfigured()) {
    throw new Error(
      "Notion is not configured for the Daily Plan. Set NOTION_API_KEY and NOTION_DAILY_DB_ID. See .env.example."
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const rowId = await findDailyPlanRow(today);

  if (!rowId) {
    logger.warn("No Daily Plan row for today. Nothing written.", { date: today });
    logger.warn("Run DRIP to plan the day, or add the row by hand. This run creates nothing.");
    return;
  }

  const all: CommentTarget[] = [];
  const skipped: Array<{ url: string; reason: string }> = [];

  if (redditConfigured()) {
    try {
      const threads = await findRedditThreads();
      const result = await draftComments("Reddit", threads, REDDIT_TARGET);
      all.push(...result.comments);
      skipped.push(...result.skipped);
    } catch (error) {
      logger.error("Reddit leg failed. Continuing with the rest.", error);
    }
  } else {
    logger.warn("Reddit is not configured. Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET.");
  }

  if (productHuntConfigured()) {
    try {
      const launches = await findProductHuntLaunches();
      const result = await draftComments("Product Hunt", launches, PRODUCT_HUNT_TARGET);
      all.push(...result.comments);
      skipped.push(...result.skipped);
    } catch (error) {
      logger.error("Product Hunt leg failed. Continuing with the rest.", error);
    }
  } else {
    logger.warn("Product Hunt is not configured. Set PRODUCTHUNT_TOKEN.");
  }

  if (all.length === 0) {
    logger.warn("Nothing worth commenting on today. Writing nothing.");
    logger.warn("An empty morning is a real outcome. It is not a failure and it is not filled.");
    return;
  }

  await appendCommentTargets(rowId, all, skipped);
  await setCommentTally(rowId, `0 / ${all.length} drafted, plus 10 LinkedIn by hand`);

  logger.info("ENGAGE complete", { drafted: all.length, skipped: skipped.length, date: today });
}

runEngage().catch((error) => {
  logger.error("ENGAGE run failed", error);
  process.exitCode = 1;
});
