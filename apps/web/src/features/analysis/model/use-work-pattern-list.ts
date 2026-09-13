import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTimeZone } from "@/entities/language";
import { dashboardQueryOptions } from "@/features/analysis/api/analysis-query.client";
import {
  toWorkPatternRatioData,
  WORK_PATTERN_DAYS,
} from "@/features/analysis/model/work-pattern-ratio-data";

const useWorkPatternList = (date: string) => {
  const timeZone = useTimeZone();
  const { data } = useSuspenseQuery({
    ...dashboardQueryOptions({ date, timeZone, period: "DAILY" }),
    select: (dashboard) => dashboard.getWorkPatternResponse,
  });

  return useMemo(() => {
    const hourlyCounts = data?.counts ?? [];

    const ratioByPattern = new Map(
      toWorkPatternRatioData(hourlyCounts).map((item) => [
        item.pattern,
        item.percentage,
      ]),
    );
    const list = WORK_PATTERN_DAYS.map((pattern) => ({
      pattern,
      percentage: ratioByPattern.get(pattern) ?? 0,
    }));

    const topPattern = list.reduce((prev, cur) =>
      cur.percentage > prev.percentage ? cur : prev,
    );

    return { list, topPattern };
  }, [data]);
};

export { useWorkPatternList };
