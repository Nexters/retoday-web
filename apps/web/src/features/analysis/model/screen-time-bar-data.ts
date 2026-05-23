import type { ScreenTimeType } from "@recap/api";
import type { TFunction } from "@recap/i18n";
import { formatTwoDigitNumber } from "@recap/lib";
import type { WeeklyBarDatum } from "@recap/ui";

import { secondsToMinute } from "@/shared/lib/date/format-date";

export const SCREEN_TIME_BAR_WEEKDAY_KEYS = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
] as const;
export function toDailyBarData(
  screenTimes: ScreenTimeType[],
  t: TFunction,
): WeeklyBarDatum[] {
  const blocks: WeeklyBarDatum[] = Array.from({ length: 12 }, (_, i) => {
    const startHour = i * 2;
    return {
      key: `today-${startHour}`,
      label: String(startHour),
      subLabel: t("screenTime.dailyTimeSlotSubLabel", {
        start: formatTwoDigitNumber(startHour),
        end: formatTwoDigitNumber(startHour + 2),
      }),
      totalMinutes: 0,
      avgMinutes: 0,
    };
  });

  for (const st of screenTimes) {
    const d = new Date(st.startedAt);
    const hour = d.getHours();
    const idx = Math.floor(hour / 2);
    if (!blocks[idx]) continue;

    blocks[idx].totalMinutes += secondsToMinute(st.stayDuration);
  }

  blocks.forEach((b) => {
    b.avgMinutes = b.totalMinutes;
  });
  return blocks;
}

export function toWeeklyBarData(
  screenTimes: ScreenTimeType[],
  rangeLabel: string,
  t: TFunction,
): WeeklyBarDatum[] {
  const labels = SCREEN_TIME_BAR_WEEKDAY_KEYS.map((k) =>
    t(`screenTime.weekdayShort.${k}`),
  );

  const blocks: WeeklyBarDatum[] = labels.map((label, idx) => ({
    key: `week-${idx}-${label}`,
    label,
    subLabel: rangeLabel,
    totalMinutes: 0,
    avgMinutes: 0,
  }));

  for (const st of screenTimes) {
    const d = new Date(st.startedAt);
    const day = d.getDay();
    if (!blocks[day]) continue;

    blocks[day].totalMinutes += secondsToMinute(st.stayDuration);
  }

  blocks.forEach((b) => {
    b.avgMinutes = b.totalMinutes;
  });
  return blocks;
}
