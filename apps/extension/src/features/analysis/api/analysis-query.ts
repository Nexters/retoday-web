import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { analysisAPIService } from "@/features/analysis/api";
import type {
  AnalysisCategoryResponse,
  AnalysisPeriod,
  AnalysisScreenTimeResponse,
  FrequencyVisitedSitesResponse,
  LongestWebSiteResponse,
} from "@/features/analysis/model/analysis.type";

import { ANALYSIS_KEYS } from "./query-key.const";

const useGetAnalysisScreenTime = <TData = AnalysisScreenTimeResponse>(
  period: AnalysisPeriod,
  date: string,
  options?: Omit<
    UseQueryOptions<AnalysisScreenTimeResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisScreenTimeResponse, Error, TData>({
    queryKey: ANALYSIS_KEYS.detail(["screen-time", period, date]),
    queryFn: async () => {
      const response = await analysisAPIService.getScreenTime(period, date);
      return response as AnalysisScreenTimeResponse;
    },
    ...options,
  });
};

const useGetAnalysisCategoryAnalysis = (date: string) => {
  return useQuery<AnalysisCategoryResponse>({
    queryKey: ANALYSIS_KEYS.detail(["category-analysis", date]),
    queryFn: async () => {
      const response = await analysisAPIService.getCategoryAnalysis(date);
      return response as AnalysisCategoryResponse;
    },
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
    queryFn: async () => {
      const response = await analysisAPIService.getFrequencyVisitedSites(
        date,
        limit,
      );
      return response as FrequencyVisitedSitesResponse;
    },
    ...options,
  });
};

const useGetLongestWebSite = (date: string) => {
  return useQuery<LongestWebSiteResponse>({
    queryKey: ANALYSIS_KEYS.detail(["longest-web-site", date]),
    queryFn: async () => {
      const response = await analysisAPIService.getLongestWebSite(date);
      return response as LongestWebSiteResponse;
    },
  });
};

export {
  useGetAnalysisCategoryAnalysis,
  useGetAnalysisScreenTime,
  useGetFrequencyVisitedSites,
  useGetLongestWebSite,
};
