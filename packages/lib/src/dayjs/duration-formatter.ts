export type TranslateFn = (
  key: string,
  options?: Record<string, unknown>,
) => string;

export const formatDuration = (seconds: number, t: TranslateFn): string => {
  if (seconds <= 0 || Number.isNaN(seconds)) {
    return t("common:duration.second", { count: 0 });
  }

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(t("common:duration.hour", { count: hours }));
  }

  if (minutes > 0) {
    parts.push(t("common:duration.minute", { count: minutes }));
  }

  if (secs > 0 || parts.length === 0) {
    parts.push(t("common:duration.second", { count: secs }));
  }

  return parts.slice(0, 2).join(" ");
};
