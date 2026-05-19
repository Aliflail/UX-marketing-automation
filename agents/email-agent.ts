import { z } from "zod";
import { generateJson } from "../services/openai.js";
import { logger } from "../services/logger.js";
import { markdownToHtml, sendEmail } from "../services/resend.js";
import { readJsonFile, readTextFile, writeJsonFile } from "../utils/file.js";
import { getContentOutputPath, getWeekDate } from "../utils/date.js";
import type { WeeklyContent } from "./writer-agent.js";

function stringifyEmailField(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, entry]) => `${key}: ${Array.isArray(entry) ? entry.join(", ") : String(entry)}`)
      .join(" | ");
  }

  return String(value ?? "");
}

function normalizeStringArray(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(stringifyEmailField);
  }

  return [stringifyEmailField(value)];
}

const DEFAULT_VISUAL_IDEAS = [
  "Before and after UX audit annotation",
  "Carousel showing pain point, consequence, and recommendation",
  "Simple product flow screenshot with highlighted friction"
];

const DEFAULT_SCHEDULE_RECOMMENDATIONS = [
  "Publish LinkedIn posts on Tuesday and Thursday between 8:00 and 9:00 AM.",
  "Use Instagram midday for carousel posts.",
  "Review Reddit posts manually before posting."
];

const EmailDigestSchema = z.object({
  week: z.string(),
  subject: z.string(),
  weekly_theme: z.string(),
  strongest_predicted_post: z.unknown().transform(stringifyEmailField),
  markdown: z.string(),
  suggested_visual_ideas: z.unknown().transform(normalizeStringArray),
  posting_schedule_recommendations: z.unknown().transform(normalizeStringArray),
  sent: z.boolean().optional(),
  resend_id: z.string().optional()
});

export type EmailDigest = z.infer<typeof EmailDigestSchema>;

export async function runEmailAgent(date = getWeekDate()): Promise<EmailDigest> {
  logger.info("Email Digest Agent started", { date });

  const systemPrompt = await readTextFile("prompts/email-prompt.md");
  const weeklyContent = await readJsonFile<WeeklyContent>(getContentOutputPath(date));

  const result = await generateJson({
    systemPrompt,
    userPrompt: [
      `Week date: ${date}`,
      "Read this content-week JSON:",
      JSON.stringify(weeklyContent, null, 2),
      "Return only valid JSON with: week, subject, weekly_theme, strongest_predicted_post, markdown, suggested_visual_ideas, posting_schedule_recommendations.",
      "The markdown field must be the complete email body with platform sections and copy/paste-ready post content."
    ].join("\n\n"),
    temperature: 0.4
  });

  const rawDigest = result as Record<string, unknown>;
  const normalizedVisualIdeas = normalizeStringArray(rawDigest.suggested_visual_ideas ?? rawDigest.visual_ideas);
  const normalizedSchedule = normalizeStringArray(
    rawDigest.posting_schedule_recommendations ?? rawDigest.schedule_recommendations ?? rawDigest.posting_schedule
  );

  const digest = EmailDigestSchema.parse({
    ...rawDigest,
    week: date,
    suggested_visual_ideas: normalizedVisualIdeas.length > 0 ? normalizedVisualIdeas : DEFAULT_VISUAL_IDEAS,
    posting_schedule_recommendations:
      normalizedSchedule.length > 0 ? normalizedSchedule : DEFAULT_SCHEDULE_RECOMMENDATIONS
  });

  const emailResult = await sendEmail({
    subject: digest.subject,
    markdown: digest.markdown,
    html: markdownToHtml(digest.markdown)
  });

  const finalDigest: EmailDigest = {
    ...digest,
    sent: !emailResult.skipped,
    resend_id: emailResult.id
  };

  await writeJsonFile("outputs/final-email.json", finalDigest);

  logger.info("Email Digest Agent completed", { output: "outputs/final-email.json", sent: finalDigest.sent });
  return finalDigest;
}
