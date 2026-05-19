export function getWeekDate(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function getContentOutputPath(date = getWeekDate()): string {
  return `outputs/content-week-${date}.json`;
}
