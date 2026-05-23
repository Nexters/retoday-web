import type {
  GetCategoryAnalysesSchema,
  GetScreenTimeSchema,
  GetWebsiteAnalysesSchema,
  ScreenTimePeriodType,
  TopVisitedSiteSchema,
} from "@recap/api";
import type { z } from "zod";

export const ANALYSIS_PERIOD = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
} as const;

export type AnalysisPeriod = ScreenTimePeriodType;

/** Screen-time API payload (`users/me/screen-times`). */
export type AnalysisScreenTimeResponse = z.infer<typeof GetScreenTimeSchema>;

export type AnalysisCategoryResponse = z.infer<
  typeof GetCategoryAnalysesSchema
>;

export type AnalysisCategoryItem =
  AnalysisCategoryResponse["categoryAnalyses"][number];

export type AnalysisWebsite = AnalysisCategoryItem["websiteAnalyses"][number];

export type FrequencyVisitedSitesResponse = z.infer<
  typeof GetWebsiteAnalysesSchema
>;

export type AnalysisFrequencyItem =
  FrequencyVisitedSitesResponse["websiteAnalyses"][number];

export type LongestWebSiteResponse = z.infer<typeof TopVisitedSiteSchema>;
