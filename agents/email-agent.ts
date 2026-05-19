import { z } from "zod";
import { generateJson } from "../services/openai.js";
import { logger } from "../services/logger.js";
import { markdownToHtml, sendEmail } from "../services/resend.js";
import { readJsonFile, readTextFile, writeJsonFile } from "../utils/file.js";
import { getContentOutputPath, getWeekDate } from "../utils/date.js";
import type { WeeklyContent } from "./writer-agent.js";

const EmailDigestSchema = z.object({
  week: z.string(),
  subject: z.string(),
  weekly_theme: z.string(),
  strongest_predicted_post: z.string(),
  markdown: z.string(),
  suggested_visual_ideas: z.array(z.string()).min(1),
  posting_schedule_recommendations: z.array(z.string()).min(1),
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

  const digest = EmailDigestSchema.parse({
    ...result,
    week: date
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
