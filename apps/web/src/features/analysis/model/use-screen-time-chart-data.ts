import { useMemo } from "react";
import type { ScreenTimePeriodType } from "@recap/api";
import { toScreenTimeChartState } from "@recap/features";
import { useLocale } from "@recap/i18n";
import { CURRENT_TIMEZONE } from "@recap/lib";

import { useGetAnalysisScreenTime } from "@/features/analysis/api/analysis-query";

const useScreenTimeChartData = (mode: ScreenTimePeriodType, date: string) => {
  const { t } = useLocale("analysis");

  const { data } = useGetAnalysisScreenTime({
    date,
    period: mode,
    timeZone: CURRENT_TIMEZONE,
  });

  return useMemo(
    () => toScreenTimeChartState({ data, mode, date, t }),
    [data, date, mode, t],
  );
};

export { useScreenTimeChartData };
