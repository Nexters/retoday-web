import type { WorkPatternDayType } from "@recap/api";

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

export const toWorkPatternRatioData = (
  source?: Partial<Record<WorkPatternDayType, number>> | null,
): WorkPatternItem[] => {
  const counts = source ?? {};

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
