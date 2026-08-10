import "dotenv/config";
import cron from "node-cron";
import { fileDrafts, runDrip } from "../agents/drip-agent.js";
import { logger } from "../services/logger.js";
import { notionConfigured } from "../services/notion.js";

/**
 * Which channel gets drafted on which weekday.
 *
 * LinkedIn three times, X twice, nothing at the weekend. This is supply, not a
 * schedule: the ceiling in data/platform.md is four published posts a week, so
 * the run deliberately produces more drafts than Alif will use. Unused drafts
 * expire.
 *
 * Reddit and Product Hunt never appear here. Reddit needs Alif's review before
 * a post exists at all, and Product Hunt is event-driven.
 */
const CHANNEL_BY_WEEKDAY: Record<number, "LinkedIn" | "X" | null> = {
  0: null, // Sunday
  1: "LinkedIn",
  2: "X",
  3: "LinkedIn",
  4: "X",
  5: "LinkedIn",
  6: null // Saturday
};

function channelForToday(): "LinkedIn" | "X" | null {
  return CHANNEL_BY_WEEKDAY[new Date().getUTCDay()] ?? null;
}

export async function runDailyDrafts(): Promise<void> {
  const channel = channelForToday();

  if (!channel) {
    logger.info("Weekend. No drafting today.");
    return;
  }

  if (!notionConfigured()) {
    throw new Error(
      "Notion is not configured. Set NOTION_API_KEY, NOTION_QUEUE_DB_ID and NOTION_JOURNAL_DB_ID. See README, section \"Connecting Notion\"."
    );
  }

  logger.info("Starting daily draft run", { channel });

  const result = await runDrip(channel);

  if (!result.drafted) {
    logger.warn("No drafts produced", { reason: result.reason ?? "The model found nothing worth drafting." });

    for (const skipped of result.skipped) {
      logger.info("Skipped", { reason: skipped.reason });
    }

    return;
  }

  const urls = await fileDrafts(result);

  logger.info("Daily draft run complete", { filed: urls.length, channel });

  for (const url of urls) {
    logger.info("Draft filed", { url });
  }
}

async function main(): Promise<void> {
  const runOnce = process.argv.includes("--once");

  if (runOnce) {
    await runDailyDrafts();
    return;
  }

  // 07:00 Asia/Dubai, weekdays. Drafts are waiting before the working day starts.
  cron.schedule(
    "0 7 * * 1-5",
    () => {
      runDailyDrafts().catch((error) => logger.error("Daily draft run failed", error));
    },
    { timezone: "Asia/Dubai" }
  );

  logger.info("Daily draft scheduler started. Weekdays at 07:00 Asia/Dubai.");
}

main().catch((error) => {
  logger.error("Daily runner failed", error);
  process.exitCode = 1;
});
