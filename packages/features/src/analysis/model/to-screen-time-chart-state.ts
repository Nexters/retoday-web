import type { AnalysisScreenTimeData, ScreenTimePeriodType } from "@recap/api";

import type {
  AnalysisBarChartDatum,
  AnalysisBarChartTranslateFn,
} from "./analysis-bar-chart.type";
import {
  toDailyAnalysisBarChartState,
  toWeeklyAnalysisBarChartState,
} from "./to-analysis-bar-chart-state";

export type ScreenTimeChartState = {
  chartData: AnalysisBarChartDatum[];
  duration: number;
};

export type ToScreenTimeChartStateInput = {
  data: AnalysisScreenTimeData | null | undefined;
  mode: ScreenTimePeriodType;
  date: string;
  t: AnalysisBarChartTranslateFn;
};

export const toScreenTimeChartState = ({
  data,
  mode,
  date,
  t,
}: ToScreenTimeChartStateInput): ScreenTimeChartState => {
  if (!data) {
    return { chartData: [], duration: 0 };
  }

  const chartData =
    mode === "DAILY"
      ? toDailyAnalysisBarChartState(data.screenTimes, t)
      : toWeeklyAnalysisBarChartState(data.screenTimes, date, t);

  const duration =
    mode === "DAILY"
      ? data.totalStayDuration
      : Math.round(data.totalStayDuration / 7);

  return { chartData, duration };
};
