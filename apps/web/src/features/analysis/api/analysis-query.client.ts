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
import { queryOptions } from "@tanstack/react-query";

import { analysisAPIService } from "@/features/analysis/api";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";

type ScreenTimeQueryKey = ReturnType<typeof ANALYSIS_KEYS.screenTime>;
type CategoryAnalysisQueryKey = ReturnType<
  typeof ANALYSIS_KEYS.categoryAnalysis
>;
type FrequentlyVisitedSitesQueryKey = ReturnType<
  typeof ANALYSIS_KEYS.frequentlyVisitedSites
>;
type LongestStayedWebsiteQueryKey = ReturnType<
  typeof ANALYSIS_KEYS.longestStayedWebsite
>;
type WorkPatternQueryKey = ReturnType<typeof ANALYSIS_KEYS.workPattern>;

type UseGetAnalysisScreenTimeOptions<TData = AnalysisScreenTimeData> = Omit<
  UseQueryOptions<AnalysisScreenTimeData, Error, TData, ScreenTimeQueryKey>,
  "queryKey" | "queryFn"
>;

type UseGetAnalysisCategoryOptions<TData = AnalysisCategoryData> = Omit<
  UseQueryOptions<AnalysisCategoryData, Error, TData, CategoryAnalysisQueryKey>,
  "queryKey" | "queryFn"
>;

type UseGetFrequencyVisitedSitesOptions<TData = FrequencyVisitedSitesData> =
  Omit<
    UseQueryOptions<
      FrequencyVisitedSitesData,
      Error,
      TData,
      FrequentlyVisitedSitesQueryKey
    >,
    "queryKey" | "queryFn"
  >;

type UseGetLongestWebSiteOptions<TData = LongestWebSiteData> = Omit<
  UseQueryOptions<
    LongestWebSiteData,
    Error,
    TData,
    LongestStayedWebsiteQueryKey
  >,
  "queryKey" | "queryFn" | "retry"
>;

type UseGetWorkPatternOptions<TData = AnalysisWorkPatternData> = Omit<
  UseQueryOptions<AnalysisWorkPatternData, Error, TData, WorkPatternQueryKey>,
  "queryKey" | "queryFn"
>;

const screenTimeQueryOptions = (dateQuery: GetScreenTimeQueryType) =>
  queryOptions<
    AnalysisScreenTimeData,
    Error,
    AnalysisScreenTimeData,
    ScreenTimeQueryKey
  >({
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

const categoryAnalysisQueryOptions = (dateQuery: DateTimeZoneQueryType) =>
  queryOptions<
    AnalysisCategoryData,
    Error,
    AnalysisCategoryData,
    CategoryAnalysisQueryKey
  >({
    queryKey: ANALYSIS_KEYS.categoryAnalysis([dateQuery.date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getCategoryAnalysis(dateQuery);
      return envelope.data;
    },
  });

const frequentlyVisitedSitesQueryOptions = (
  dateQuery: GetWebsiteAnalysesQueryType,
) =>
  queryOptions<
    FrequencyVisitedSitesData,
    Error,
    FrequencyVisitedSitesData,
    FrequentlyVisitedSitesQueryKey
  >({
    queryKey: ANALYSIS_KEYS.frequentlyVisitedSites([
      dateQuery.date,
      dateQuery.limit,
    ]),
    queryFn: async () => {
      const envelope =
        await analysisAPIService.getFrequentlyVisitedWebSite(dateQuery);
      return envelope.data;
    },
  });

const longestStayedWebsiteQueryOptions = (dateQuery: DateTimeZoneQueryType) =>
  queryOptions<
    LongestWebSiteData,
    Error,
    LongestWebSiteData,
    LongestStayedWebsiteQueryKey
  >({
    queryKey: ANALYSIS_KEYS.longestStayedWebsite([dateQuery.date]),
    queryFn: async () => {
      const envelope =
        await analysisAPIService.getLongestStayedWebsite(dateQuery);
      return envelope.data;
    },
    retry: false,
  });

const workPatternQueryOptions = (dateQuery: DateTimeZoneQueryType) =>
  queryOptions<
    AnalysisWorkPatternData,
    Error,
    AnalysisWorkPatternData,
    WorkPatternQueryKey
  >({
    queryKey: ANALYSIS_KEYS.workPattern([dateQuery.date]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getWorkPattern(dateQuery);
      return envelope.data;
    },
  });

const useGetAnalysisScreenTime = <TData = AnalysisScreenTimeData>(
  dateQuery: GetScreenTimeQueryType,
  options: UseGetAnalysisScreenTimeOptions<TData> = {},
) => {
  return useQuery<AnalysisScreenTimeData, Error, TData, ScreenTimeQueryKey>({
    ...(screenTimeQueryOptions(dateQuery) as UseQueryOptions<
      AnalysisScreenTimeData,
      Error,
      TData,
      ScreenTimeQueryKey
    >),
    ...options,
  });
};

const useGetAnalysisCategory = <TData = AnalysisCategoryData>(
  dateQuery: DateTimeZoneQueryType,
  options: UseGetAnalysisCategoryOptions<TData> = {},
) => {
  return useQuery<AnalysisCategoryData, Error, TData, CategoryAnalysisQueryKey>(
    {
      ...(categoryAnalysisQueryOptions(dateQuery) as UseQueryOptions<
        AnalysisCategoryData,
        Error,
        TData,
        CategoryAnalysisQueryKey
      >),
      ...options,
    },
  );
};

const useGetFrequencyVisitedSites = <TData = FrequencyVisitedSitesData>(
  dateQuery: GetWebsiteAnalysesQueryType,
  options: UseGetFrequencyVisitedSitesOptions<TData> = {},
) => {
  return useQuery<
    FrequencyVisitedSitesData,
    Error,
    TData,
    FrequentlyVisitedSitesQueryKey
  >({
    ...(frequentlyVisitedSitesQueryOptions(dateQuery) as UseQueryOptions<
      FrequencyVisitedSitesData,
      Error,
      TData,
      FrequentlyVisitedSitesQueryKey
    >),
    ...options,
  });
};

const useGetLongestWebSite = <TData = LongestWebSiteData>(
  dateQuery: DateTimeZoneQueryType,
  options: UseGetLongestWebSiteOptions<TData> = {},
) => {
  return useQuery<
    LongestWebSiteData,
    Error,
    TData,
    LongestStayedWebsiteQueryKey
  >({
    ...(longestStayedWebsiteQueryOptions(dateQuery) as UseQueryOptions<
      LongestWebSiteData,
      Error,
      TData,
      LongestStayedWebsiteQueryKey
    >),
    ...options,
  });
};

const useGetWorkPattern = <TData = AnalysisWorkPatternData>(
  dateQuery: DateTimeZoneQueryType,
  options: UseGetWorkPatternOptions<TData> = {},
) => {
  return useQuery<AnalysisWorkPatternData, Error, TData, WorkPatternQueryKey>({
    ...(workPatternQueryOptions(dateQuery) as UseQueryOptions<
      AnalysisWorkPatternData,
      Error,
      TData,
      WorkPatternQueryKey
    >),
    ...options,
  });
};

export {
  categoryAnalysisQueryOptions,
  frequentlyVisitedSitesQueryOptions,
  longestStayedWebsiteQueryOptions,
  screenTimeQueryOptions,
  useGetAnalysisCategory,
  useGetAnalysisScreenTime,
  useGetFrequencyVisitedSites,
  useGetLongestWebSite,
  useGetWorkPattern,
  workPatternQueryOptions,
};
