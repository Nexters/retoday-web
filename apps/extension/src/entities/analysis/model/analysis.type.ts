export const ANALYSIS_PERIOD = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
} as const;
export type AnalysisPeriod =
  (typeof ANALYSIS_PERIOD)[keyof typeof ANALYSIS_PERIOD];

export type AnalysisScreenTime = {
  startedAt: string;
  endedAt: string;
  stayDuration: number;
};
export type AnalysisScreenTimeResponse = {
  period: AnalysisPeriod;
  startedAt: string;
  endedAt: string;
  totalStayDuration: number;
  screenTimes: AnalysisScreenTime[];
};
