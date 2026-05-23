import type {
  AnalysisCategoryData,
  AnalysisScreenTimeData,
  FrequencyVisitedSitesData,
  LongestWebSiteData,
  ScreenTimePeriodType,
} from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { analysisAPIService } from "@/features/analysis/api";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";

const useGetAnalysisScreenTime = <TData = AnalysisScreenTimeData>(
  period: ScreenTimePeriodType,
  date: string,
  options?: Omit<
    UseQueryOptions<AnalysisScreenTimeData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisScreenTimeData, Error, TData>({
    queryKey: ANALYSIS_KEYS.detail(["screen-time", period, date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getScreenTime({
        date,
        period,
      });
      return envelope.data;
    },
    ...options,
  });
};

const useGetAnalysisCategoryAnalysis = (date: string) => {
  return useQuery<AnalysisCategoryData>({
    queryKey: ANALYSIS_KEYS.detail(["category-analysis", date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getCategoryAnalysis({ date });
      return envelope.data;
    },
  });
};

const useGetFrequencyVisitedSites = <TData = FrequencyVisitedSitesData>(
  date: string,
  limit: number,
  options?: Omit<
    UseQueryOptions<FrequencyVisitedSitesData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<FrequencyVisitedSitesData, Error, TData>({
    queryKey: ANALYSIS_KEYS.detail(["frequency-visited-sites", date, limit]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getFrequentlyVisitedWebSite({
        date,
        limit,
      });
      return envelope.data;
    },
    ...options,
  });
};

const useGetLongestWebSite = (date: string) => {
  return useQuery<LongestWebSiteData>({
    queryKey: ANALYSIS_KEYS.detail(["longest-web-site", date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getLongestStayedWebsite({
        date,
      });
      return envelope.data;
    },
  });
};

export {
  useGetAnalysisCategoryAnalysis,
  useGetAnalysisScreenTime,
  useGetFrequencyVisitedSites,
  useGetLongestWebSite,
};
