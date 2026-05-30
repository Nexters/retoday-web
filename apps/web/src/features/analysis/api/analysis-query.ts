import type {
  AnalysisCategoryData,
  AnalysisScreenTimeData,
  AnalysisWorkPatternData,
  DateTimeZoneQueryType,
  FrequencyVisitedSitesData,
  GetScreenTimeQueryType,
  LongestWebSiteData,
} from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { analysisAPIService } from "@/features/analysis/api";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";

const useGetAnalysisScreenTime = <TData = AnalysisScreenTimeData>(
  dateQuery: GetScreenTimeQueryType,
  options?: Omit<
    UseQueryOptions<AnalysisScreenTimeData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisScreenTimeData, Error, TData>({
    queryKey: ANALYSIS_KEYS.detail([
      "screen-time",
      dateQuery.period,
      dateQuery.date,
    ]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getScreenTime(dateQuery);
      return envelope.data;
    },
    ...options,
  });
};

const useGetAnalysisCategoryAnalysis = (dateQuery: DateTimeZoneQueryType) => {
  return useQuery<AnalysisCategoryData>({
    queryKey: ANALYSIS_KEYS.detail(["category-analysis", dateQuery.date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getCategoryAnalysis(dateQuery);
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

const useGetLongestWebSite = (dateQuery: DateTimeZoneQueryType) => {
  return useQuery<LongestWebSiteData>({
    queryKey: ANALYSIS_KEYS.detail(["longest-web-site", dateQuery.date]),
    queryFn: async () => {
      const envelope =
        await analysisAPIService.getLongestStayedWebsite(dateQuery);
      return envelope.data;
    },
  });
};

const useGetWorkPattern = (dateQuery: DateTimeZoneQueryType) => {
  return useQuery<AnalysisWorkPatternData>({
    queryKey: ANALYSIS_KEYS.detail(["work-pattern", dateQuery.date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getWorkPattern(dateQuery);
      return envelope.data;
    },
  });
};

export {
  useGetAnalysisCategoryAnalysis,
  useGetAnalysisScreenTime,
  useGetFrequencyVisitedSites,
  useGetLongestWebSite,
  useGetWorkPattern,
};
