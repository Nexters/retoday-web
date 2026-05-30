import { useMemo } from "react";
import type { ScreenTimePeriodType } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { CURRENT_TIMEZONE } from "@recap/lib";

import { useGetAnalysisScreenTime } from "@/features/analysis/api/analysis-query";
import {
  toDailyBarData,
  toWeeklyBarData,
} from "@/features/analysis/model/screen-time-bar-data";
import { secondsToMinute } from "@/shared/lib/date/format-date";

const useScreenTimeChartData = (mode: ScreenTimePeriodType, date: string) => {
  const { t } = useLocale("analysis");

  const { data } = useGetAnalysisScreenTime({
    date,
    period: mode,
    timeZone: CURRENT_TIMEZONE,
  });
  //const data = getMockAnalysisScreenTimeData(mode, date);

  return useMemo(() => {
    if (!data) {
      return { chartData: [], duration: 0 };
    }

    const totalMinutes = secondsToMinute(data.totalStayDuration);
    const chartData =
      mode === "DAILY"
        ? toDailyBarData(data.screenTimes, t)
        : toWeeklyBarData(data.screenTimes, date, t);

    const duration =
      mode === "DAILY" ? totalMinutes * 60 : Math.round(totalMinutes / 7) * 60;

    return { chartData, duration };
  }, [data, date, mode, t]);
};

export { useScreenTimeChartData };
