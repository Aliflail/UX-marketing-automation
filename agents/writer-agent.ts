import { z } from "zod";
import { generateJson } from "../services/openai.js";
import { logger } from "../services/logger.js";
import { readJsonFile, readTextFile, writeJsonFile } from "../utils/file.js";
import { getContentOutputPath, getWeekDate } from "../utils/date.js";
import type { WeeklyResearch } from "./research-agent.js";

const PlatformSchema = z.enum(["linkedin", "instagram", "x", "reddit"]);

const ContentPostSchema = z.object({
  platform: PlatformSchema,
  post_type: z.string(),
  content: z.union([
    z.string(),
    z.array(z.string()),
    z.record(z.unknown())
  ]),
  scheduled_time: z.string(),
  manual_review_required: z.boolean().optional(),
  target_community: z.string().optional()
});

const WeeklyContentSchema = z.object({
  week: z.string(),
  theme: z.string(),
  posts: z.array(ContentPostSchema).min(14)
});

export type WeeklyContent = z.infer<typeof WeeklyContentSchema>;

export async function runWriterAgent(date = getWeekDate()): Promise<WeeklyContent> {
  logger.info("Content Writer Agent started", { date });

  const systemPrompt = await readTextFile("prompts/writer-prompt.md");
  const research = await readJsonFile<WeeklyResearch>("outputs/weekly-research.json");

  const result = await generateJson({
    systemPrompt,
    userPrompt: [
      `Week date: ${date}`,
      "Read this weekly-research.json content:",
      JSON.stringify(research, null, 2),
      "Return only valid JSON with this top-level shape: { week, theme, posts }.",
      "The posts array must contain exactly 3 linkedin, 4 instagram, 5 x, and 2 reddit posts.",
      "For reddit posts, set manual_review_required to true.",
      "Do not use em dashes."
    ].join("\n\n"),
    temperature: 0.55
  });

  const content = WeeklyContentSchema.parse({ ...result, week: date });
  const outputPath = getContentOutputPath(date);
  await writeJsonFile(outputPath, content);

  logger.info("Content Writer Agent completed", { output: outputPath });
  return content;
}
