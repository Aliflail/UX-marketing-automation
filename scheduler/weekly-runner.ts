import "dotenv/config";
import cron from "node-cron";
import { runEmailAgent } from "../agents/email-agent.js";
import { runResearchAgent } from "../agents/research-agent.js";
import { runWriterAgent } from "../agents/writer-agent.js";
import { logger } from "../services/logger.js";
import { getWeekDate } from "../utils/date.js";

const SCHEDULE = "0 8 * * 1";
const TIMEZONE = "Asia/Dubai";

export async function runWeeklyWorkflow(date = getWeekDate()): Promise<void> {
  const startedAt = Date.now();
  logger.info("Weekly workflow started", { date });

  try {
    await runResearchAgent(date);
    await runWriterAgent(date);
    await runEmailAgent(date);

    logger.info("Weekly workflow completed", {
      date,
      duration_ms: Date.now() - startedAt
    });
  } catch (error) {
    logger.error("Weekly workflow failed", error, { date });
    throw error;
  }
}

function startScheduler(): void {
  logger.info("Scheduler started", { schedule: "Every Monday at 08:00", timezone: TIMEZONE });

  cron.schedule(
    SCHEDULE,
    () => {
      runWeeklyWorkflow().catch((error) => {
        logger.error("Scheduled run failed", error);
      });
    },
    { timezone: TIMEZONE }
  );
}

const args = process.argv.slice(2);

if (args.includes("--once")) {
  runWeeklyWorkflow().catch(() => {
    process.exitCode = 1;
  });
} else {
  startScheduler();
}
