import { useMemo } from "react";

import { useGetWorkPattern } from "@/features/analysis/api/analysis-query";
import { toWorkPatternRatioData } from "@/features/analysis/model/work-pattern-ratio-data";

const useWorkPatternList = (date: string) => {
  const { data } = useGetWorkPattern(date);

  //const data = getMockWorkPatternData(date);

  return useMemo(() => {
    if (!data) {
      return {
        total: 0,
        list: [],
        topPattern: null,
      };
    }
    const counts = data.counts ?? {};

    const values = Object.values(counts).filter(
      (v): v is number => typeof v === "number" && Number.isFinite(v) && v > 0,
    );
    const total = values.reduce((a, b) => a + b, 0);

    const list = toWorkPatternRatioData(counts);

    const topPattern = list.reduce((prev, cur) =>
      cur.percentage > prev.percentage ? cur : prev,
    );
    return { total, list, topPattern };
  }, [data]);
};

export { useWorkPatternList };
