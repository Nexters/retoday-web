import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { ScreenTimePeriodType } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { dayjs } from "@recap/lib";

import { useGetAnalysisScreenTime } from "@/features/analysis/api/analysis-query";
import {
  toDailyBarData,
  toWeeklyBarData,
} from "@/features/analysis/model/screen-time-bar-data";
import { secondsToMinute } from "@/shared/lib/date/format-date";

const useScreenTimeChartData = (mode: ScreenTimePeriodType) => {
  const date = useSearchParams()?.get("date") ?? "";
  const { t } = useLocale("analysis");

  const { data } = useGetAnalysisScreenTime(mode, date);
  // const data = getMockAnalysisScreenTimeData(mode, date ?? "");

  return useMemo(() => {
    if (!data) {
      return { chartData: [], duration: 0 };
    }
    const rangeLabel = `${dayjs(data.startedAt).format("MM.DD")} - ${dayjs(data.endedAt).format("MM.DD")}`;
    const totalMinutes = secondsToMinute(data.totalStayDuration);

    return {
      chartData:
        mode === "DAILY"
          ? toDailyBarData(data.screenTimes, t)
          : toWeeklyBarData(data.screenTimes, rangeLabel, t),
      duration:
        mode === "DAILY"
          ? totalMinutes * 60
          : Math.round(totalMinutes / 7) * 60,
    };
  }, [data, mode, t]);
};

export { useScreenTimeChartData };
