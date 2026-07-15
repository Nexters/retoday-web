import type {
  AnalysisCategoryData,
  AnalysisScreenTimeData,
  AnalysisWorkPatternData,
  DateTimeZoneQueryType,
  FrequencyVisitedSitesData,
  GetScreenTimeQueryType,
  GetWebsiteAnalysesQueryType,
  LongestWebSiteData,
} from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { analysisAPIService } from "@/features/analysis/api";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";

export const screenTimeQueryOptions = (dateQuery: GetScreenTimeQueryType) => ({
  queryKey: ANALYSIS_KEYS.screenTime([
    dateQuery.period,
    dateQuery.date,
    dateQuery.timeZone,
  ]),
  queryFn: async () => {
    const envelope = await analysisAPIService.getScreenTime(dateQuery);
    return envelope.data;
  },
});

export const useGetAnalysisScreenTime = <TData = AnalysisScreenTimeData>(
  dateQuery: GetScreenTimeQueryType,
  options?: Omit<
    UseQueryOptions<AnalysisScreenTimeData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisScreenTimeData, Error, TData>({
    ...screenTimeQueryOptions(dateQuery),
    ...options,
  });
};

export const useGetAnalysisCategory = <TData = AnalysisCategoryData>(
  dateQuery: DateTimeZoneQueryType,
  options?: Omit<
    UseQueryOptions<AnalysisCategoryData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisCategoryData, Error, TData>({
    queryKey: ANALYSIS_KEYS.categoryAnalysis([dateQuery.date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getCategoryAnalysis(dateQuery);
      return envelope.data;
    },
    ...options,
  });
};

export const useGetFrequencyVisitedSites = <TData = FrequencyVisitedSitesData>(
  dateQuery: GetWebsiteAnalysesQueryType,
  options?: Omit<
    UseQueryOptions<FrequencyVisitedSitesData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<FrequencyVisitedSitesData, Error, TData>({
    queryKey: ANALYSIS_KEYS.frequentlyVisitedSites([
      dateQuery.date,
      dateQuery.limit,
    ]),
    queryFn: async () => {
      const envelope =
        await analysisAPIService.getFrequentlyVisitedWebSite(dateQuery);
      return envelope.data;
    },
    ...options,
  });
};

export const useGetLongestWebSite = <TData = LongestWebSiteData>(
  dateQuery: DateTimeZoneQueryType,
  options?: Omit<
    UseQueryOptions<LongestWebSiteData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<LongestWebSiteData, Error, TData>({
    queryKey: ANALYSIS_KEYS.longestStayedWebsite([dateQuery.date]),
    queryFn: async () => {
      const envelope =
        await analysisAPIService.getLongestStayedWebsite(dateQuery);
      return envelope.data;
    },
    ...options,
  });
};

export const useGetWorkPattern = <TData = AnalysisWorkPatternData>(
  dateQuery: DateTimeZoneQueryType,
  options?: Omit<
    UseQueryOptions<AnalysisWorkPatternData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisWorkPatternData, Error, TData>({
    queryKey: ANALYSIS_KEYS.workPattern([dateQuery.date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getWorkPattern(dateQuery);
      return envelope.data;
    },
    ...options,
  });
};
