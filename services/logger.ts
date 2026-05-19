export type LogContext = Record<string, string | number | boolean | undefined>;

function formatContext(context?: LogContext): string {
  if (!context || Object.keys(context).length === 0) {
    return "";
  }

  return ` ${JSON.stringify(context)}`;
}

export const logger = {
  info(message: string, context?: LogContext) {
    console.log(`[${new Date().toISOString()}] INFO  ${message}${formatContext(context)}`);
  },

  warn(message: string, context?: LogContext) {
    console.warn(`[${new Date().toISOString()}] WARN  ${message}${formatContext(context)}`);
  },

  error(message: string, error?: unknown, context?: LogContext) {
    const details = error instanceof Error ? error.message : String(error ?? "");
    console.error(`[${new Date().toISOString()}] ERROR ${message}${formatContext(context)} ${details}`);
  }
};
