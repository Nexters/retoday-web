import type { ScreenTimeType } from "@recap/api";
import type { TFunction } from "@recap/i18n";
import { CURRENT_TIMEZONE, dayjs, padNumber } from "@recap/lib";
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
        start: padNumber(startHour),
        end: padNumber(startHour + 2),
      }),
      totalMinutes: 0,
      avgMinutes: 0,
    };
  });

  for (const st of screenTimes) {
    const hour = dayjs(st.startedAt).tz(CURRENT_TIMEZONE).hour();
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
  anchorDate: string | Date,
  t: TFunction,
): WeeklyBarDatum[] {
  const labels = SCREEN_TIME_BAR_WEEKDAY_KEYS.map((k) =>
    t(`screenTime.weekdayShort.${k}`),
  );

  const weekStart = dayjs(anchorDate).tz(CURRENT_TIMEZONE).startOf("week");

  const blocks: WeeklyBarDatum[] = labels.map((label, idx) => ({
    key: `week-${idx}-${label}`,
    label,
    subLabel: weekStart.add(idx, "day").format("MM.DD"),
    totalMinutes: 0,
    avgMinutes: 0,
  }));

  for (const st of screenTimes) {
    const day = dayjs(st.startedAt).tz(CURRENT_TIMEZONE).day();
    if (!blocks[day]) continue;

    blocks[day].totalMinutes += secondsToMinute(st.stayDuration);
  }

  blocks.forEach((b) => {
    b.avgMinutes = b.totalMinutes;
  });
  return blocks;
}
