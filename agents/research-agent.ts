import { z } from "zod";
import { generateJson } from "../services/openai.js";
import { logger } from "../services/logger.js";
import { readTextFile, writeJsonFile } from "../utils/file.js";
import { getWeekDate } from "../utils/date.js";

function stringifyResearchItem(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, entry]) => `${key}: ${Array.isArray(entry) ? entry.join(", ") : String(entry)}`)
      .join(" | ");
  }

  return String(value);
}

const ResearchItemSchema = z.unknown().transform(stringifyResearchItem);

const ResearchSchema = z.object({
  week: z.string(),
  pain_points: z.array(ResearchItemSchema).min(5),
  trending_topics: z.array(ResearchItemSchema).min(3),
  ux_crime_candidate: z.string(),
  hot_take_angles: z.array(ResearchItemSchema).min(3),
  content_angles: z.array(ResearchItemSchema).min(5)
});

export type WeeklyResearch = z.infer<typeof ResearchSchema>;

export async function runResearchAgent(date = getWeekDate()): Promise<WeeklyResearch> {
  logger.info("Research Agent started", { date });

  const systemPrompt = await readTextFile("prompts/research-prompt.md");
  const result = await generateJson({
    systemPrompt,
    userPrompt: [
      `Today is ${date}.`,
      "Return only valid JSON. Do not include markdown.",
      "If live browsing is unavailable, infer timely research themes from the provided communities and clearly include source context labels in each item."
    ].join("\n"),
    temperature: 0.35
  });

  const research = ResearchSchema.parse({ ...result, week: date });
  await writeJsonFile("outputs/weekly-research.json", research);

  logger.info("Research Agent completed", { output: "outputs/weekly-research.json" });
  return research;
}
