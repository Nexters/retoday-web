import type { TFunction } from "@recap/i18n";
import { formatDuration } from "@recap/lib";

export const formatScreenTime = (tc: TFunction, totalMinutes: number) => {
  if (totalMinutes <= 0) return "-";
  return formatDuration(totalMinutes * 60, tc);
};

export const formatMeridiemTime = (t: TFunction, value: Date) => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return null;

  const hour = value.getHours();
  const minute = value.getMinutes();
  const meridiem = hour < 12 ? t("meridiemAm") : t("meridiemPm");
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  if (minute === 0) {
    return `${displayHour}${meridiem}`;
  }

  return `${displayHour}:${String(minute).padStart(2, "0")}${meridiem}`;
};

export const formatMeasuredRange = (
  t: TFunction,
  startedAt: Date,
  closedAt: Date,
) => {
  const started = formatMeridiemTime(t, startedAt);
  const closed = formatMeridiemTime(t, closedAt);

  if (!started || !closed) return "-";
  return `${started} - ${closed}`;
};
