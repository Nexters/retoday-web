import type { ScreenTimeType } from "@recap/api";
import { dayjs, padNumber, toIanaTimeZone } from "@recap/lib";

import type {
  AnalysisBarChartDatum,
  AnalysisBarChartTranslateFn,
} from "./analysis-bar-chart.type";

export const secondsToMinute = (seconds: number): number => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return 0;
  }
  const minutes = dayjs.duration(seconds, "seconds").asMinutes();
  return Math.round(minutes);
};

export const SCREEN_TIME_BAR_WEEKDAY_KEYS = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
] as const;

export const toDailyAnalysisBarChartState = (
  screenTimes: ScreenTimeType[],
  t: AnalysisBarChartTranslateFn,
  timeZone: string,
): AnalysisBarChartDatum[] => {
  const ianaTimeZone = toIanaTimeZone(timeZone);

  const blocks: AnalysisBarChartDatum[] = Array.from({ length: 12 }, (_, i) => {
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

  for (const screenTime of screenTimes) {
    const hour = dayjs(screenTime.startedAt).tz(ianaTimeZone).hour();
    const idx = Math.floor(hour / 2);
    if (!blocks[idx]) continue;

    blocks[idx].totalMinutes += secondsToMinute(screenTime.stayDuration);
  }

  blocks.forEach((block) => {
    block.avgMinutes = block.totalMinutes;
  });
  return blocks;
};

export const toWeeklyAnalysisBarChartState = (
  screenTimes: ScreenTimeType[],
  anchorDate: string | Date,
  t: AnalysisBarChartTranslateFn,
  timeZone: string,
): AnalysisBarChartDatum[] => {
  const ianaTimeZone = toIanaTimeZone(timeZone);

  const labels = SCREEN_TIME_BAR_WEEKDAY_KEYS.map((key) =>
    t(`screenTime.weekdayShort.${key}`),
  );

  const weekStart = dayjs(anchorDate).tz(ianaTimeZone).startOf("week");

  const blocks: AnalysisBarChartDatum[] = labels.map((label, idx) => ({
    key: `week-${idx}-${label}`,
    label,
    subLabel: weekStart.add(idx, "day").format("MM.DD"),
    totalMinutes: 0,
    avgMinutes: 0,
  }));

  for (const screenTime of screenTimes) {
    const day = dayjs(screenTime.startedAt).tz(ianaTimeZone).day();
    if (!blocks[day]) continue;

    blocks[day].totalMinutes += secondsToMinute(screenTime.stayDuration);
  }

  blocks.forEach((block) => {
    block.avgMinutes = block.totalMinutes;
  });
  return blocks;
};
