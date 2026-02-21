export const ANALYSIS_PERIOD = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
} as const;
export type AnalysisPeriod =
  (typeof ANALYSIS_PERIOD)[keyof typeof ANALYSIS_PERIOD];

// screen time analysis
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

// category analysis
export type AnalysisWebsite = {
  domain: string;
  faviconUrl: string;
  stayDuration: number;
};
export type AnalysisCategoryItem = {
  categoryName: string;
  stayDuration: number;
  websiteAnalyses: AnalysisWebsite[];
};
export type AnalysisCategoryResponse = {
  date: string;
  categoryAnalyses: AnalysisCategoryItem[];
};
