import type { WorkPatternDayType, WorkPatternHourCount } from "@recap/api";

import { toRatio } from "@/shared/lib/number";

type WorkPatternItem = {
  pattern: WorkPatternDayType;
  percentage: number;
};

export const WORK_PATTERN_DAYS = [
  "MORNING",
  "DAYTIME",
  "EVENING",
  "DAWN",
] as const satisfies readonly WorkPatternDayType[];

const WORK_PATTERN_HOUR_RANGES: Record<WorkPatternDayType, readonly number[]> =
  {
    DAWN: [0, 1, 2, 3, 4, 5],
    MORNING: [6, 7, 8, 9, 10, 11],
    DAYTIME: [12, 13, 14, 15, 16, 17],
    EVENING: [18, 19, 20, 21, 22, 23],
  };

const HOUR_TO_WORK_PATTERN = Object.entries(WORK_PATTERN_HOUR_RANGES).reduce<
  Record<number, WorkPatternDayType>
>((acc, [pattern, hours]) => {
  for (const hour of hours) {
    acc[hour] = pattern as WorkPatternDayType;
  }
  return acc;
}, {});

export const toWorkPatternCountsByPeriod = (
  hourlyCounts?: WorkPatternHourCount[] | null,
): Partial<Record<WorkPatternDayType, number>> => {
  const counts: Partial<Record<WorkPatternDayType, number>> = {};

  for (const { hour, count } of hourlyCounts ?? []) {
    if (
      typeof hour !== "number" ||
      hour < 0 ||
      hour > 23 ||
      typeof count !== "number" ||
      !Number.isFinite(count) ||
      count <= 0
    ) {
      continue;
    }

    const pattern = HOUR_TO_WORK_PATTERN[hour];
    if (!pattern) continue;

    counts[pattern] = (counts[pattern] ?? 0) + count;
  }

  return counts;
};

export const toWorkPatternRatioData = (
  hourlyCounts?: WorkPatternHourCount[] | null,
): WorkPatternItem[] => {
  const counts = toWorkPatternCountsByPeriod(hourlyCounts);

  const total = WORK_PATTERN_DAYS.reduce((sum, pattern) => {
    const value = counts[pattern];
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
      return sum;
    }
    return sum + value;
  }, 0);

  return WORK_PATTERN_DAYS.map((pattern) => ({
    pattern,
    percentage: toRatio({
      value: counts[pattern] ?? 0,
      total,
      digits: 3,
    }),
  }));
};
