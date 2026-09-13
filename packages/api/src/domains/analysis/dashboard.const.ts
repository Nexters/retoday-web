import type { AnalysisDashboardData } from "./dashboard.schema";

export const HISTORY_NOT_FOUND_CODE = "HISTORY_NOT_FOUND";

export const EMPTY_ANALYSIS_DASHBOARD = {
  getScreenTimeResponse: {
    totalStayDuration: 0,
    buckets: [],
  },
  getCategoryAnalysesResponse: {
    categoryAnalyses: [],
  },
  getFrequentlyVisitedWebsitesResponse: {
    websiteAnalyses: [],
  },
  getWorkPatternResponse: {
    counts: [],
  },
  getLongestStayedWebsiteResponse: {
    domain: null,
    faviconUrl: null,
    stayDuration: 0,
  },
} satisfies AnalysisDashboardData;
