import { createQueryKeys } from "@recap/react-query";

const analysisKeys = createQueryKeys("analysis");

export const ANALYSIS_KEYS = {
  ...analysisKeys,

  screenTime: (args: unknown[]) =>
    analysisKeys.detail(["screen-time", ...args]),
  categoryAnalysis: (args: unknown[]) =>
    analysisKeys.detail(["category-analysis", ...args]),
  frequentlyVisitedSites: (args: unknown[]) =>
    analysisKeys.detail(["frequently-visited-sites", ...args]),
  longestStayedWebsite: (args: unknown[]) =>
    analysisKeys.detail(["longest-stayed-website", ...args]),
  workPattern: (args: unknown[]) =>
    analysisKeys.detail(["work-pattern", ...args]),
};
