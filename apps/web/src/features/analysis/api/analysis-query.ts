import type { Envelope } from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";
import type { z } from "zod";

import { analysisAPIService } from "@/features/analysis/api";
import type { GetCategoryAnalysesSchema } from "@/features/analysis/model/get-category-analysis.schema";
import type { GetWebsiteAnalysesSchema } from "@/features/analysis/model/get-frequently-visited-websites.schema";
import type { TopVisitedSiteSchema } from "@/features/analysis/model/get-longest-stayed-website.schema";
import type { GetScreenTimeSchema } from "@/features/analysis/model/get-screen-time.schema";
import { type ScreenTimePeriodType } from "@/features/analysis/model/get-screen-time.schema";
import type { GetWorkPatternSchema } from "@/features/analysis/model/get-work-pattern.schema";

import { ANALYSIS_KEYS } from "./query-key.const";

type AnalysisScreenTimeResponse = Envelope<z.infer<typeof GetScreenTimeSchema>>;
type AnalysisCategoryResponse = Envelope<
  z.infer<typeof GetCategoryAnalysesSchema>
>;
type FrequencyVisitedSitesResponse = Envelope<
  z.infer<typeof GetWebsiteAnalysesSchema>
>;
type LongestWebSiteResponse = Envelope<z.infer<typeof TopVisitedSiteSchema>>;
type WorkPatternResponse = Envelope<z.infer<typeof GetWorkPatternSchema>>;

const useGetAnalysisScreenTime = <TData = AnalysisScreenTimeResponse>(
  period: ScreenTimePeriodType,
  date: string,
  options?: Omit<
    UseQueryOptions<AnalysisScreenTimeResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisScreenTimeResponse, Error, TData>({
    queryKey: ANALYSIS_KEYS.detail(["screen-time", period, date]),
    queryFn: () =>
      analysisAPIService.getScreenTime({
        date,
        period,
      }),
    ...options,
  });
};

const useGetAnalysisCategoryAnalysis = (date: string) => {
  return useQuery<AnalysisCategoryResponse>({
    queryKey: ANALYSIS_KEYS.detail(["category-analysis", date]),
    queryFn: () => analysisAPIService.getCategoryAnalysis({ date }),
  });
};

const useGetFrequencyVisitedSites = <TData = FrequencyVisitedSitesResponse>(
  date: string,
  limit: number,
  options?: Omit<
    UseQueryOptions<FrequencyVisitedSitesResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<FrequencyVisitedSitesResponse, Error, TData>({
    queryKey: ANALYSIS_KEYS.detail(["frequency-visited-sites", date, limit]),
    queryFn: () =>
      analysisAPIService.getFrequentlyVisitedWebSite({
        date,
        limit,
      }),
    ...options,
  });
};

const useGetLongestWebSite = (date: string) => {
  return useQuery<LongestWebSiteResponse>({
    queryKey: ANALYSIS_KEYS.detail(["longest-web-site", date]),
    queryFn: () => analysisAPIService.getLongestStayedWebsite({ date }),
  });
};

const useGetWorkPattern = (date: string) => {
  return useQuery<WorkPatternResponse>({
    queryKey: ANALYSIS_KEYS.detail(["work-pattern", date]),
    queryFn: () => analysisAPIService.getWorkPattern({ date }),
  });
};

export {
  useGetAnalysisCategoryAnalysis,
  useGetAnalysisScreenTime,
  useGetFrequencyVisitedSites,
  useGetLongestWebSite,
  useGetWorkPattern,
};
