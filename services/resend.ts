import { Resend } from "resend";
import { logger } from "./logger.js";

export interface EmailPayload {
  subject: string;
  markdown: string;
  html: string;
}

function markdownToHtml(markdown: string): string {
  const escaped = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br />");
}

export async function sendEmail(payload: EmailPayload): Promise<{ id?: string; skipped: boolean }> {
  const to = process.env.EMAIL_TO ?? "alifnoushad.96@gmail.com";
  const from = process.env.EMAIL_FROM ?? "UX Intelligence Engine <weekly@yourdomain.com>";

  if (!process.env.RESEND_API_KEY) {
    logger.warn("RESEND_API_KEY missing, email send skipped");
    return { skipped: true };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const response = await resend.emails.send({
    from,
    to,
    subject: payload.subject,
    html: payload.html || markdownToHtml(payload.markdown),
    text: payload.markdown
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  logger.info("Weekly digest email sent", { to, id: response.data?.id });
  return { id: response.data?.id, skipped: false };
}

export { markdownToHtml };
