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
import { AnalysisAPIService } from "@recap/api";
import { type FetchQueryOptions, queryOptions } from "@tanstack/react-query";

import { createServerAuthedRestAPI } from "@/entities/auth/lib/create-server-authed-rest";

import { ANALYSIS_KEYS } from "./query-keys";

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

const serverAnalysisAPIService = new AnalysisAPIService(
  createServerAuthedRestAPI(undefined, { apiBaseURL: "v1" }),
);

export const serverScreenTimeQueryOptions = (
  dateQuery: GetScreenTimeQueryType,
): FetchQueryOptions<
  AnalysisScreenTimeData,
  Error,
  AnalysisScreenTimeData,
  ScreenTimeQueryKey
> =>
  queryOptions<
    AnalysisScreenTimeData,
    Error,
    AnalysisScreenTimeData,
    ScreenTimeQueryKey
  >({
    queryKey: ANALYSIS_KEYS.screenTime([dateQuery.period, dateQuery.date]),
    queryFn: async () => {
      const envelope = await serverAnalysisAPIService.getScreenTime(dateQuery);
      return envelope.data;
    },
  });

export const serverCategoryAnalysisQueryOptions = (
  dateQuery: DateTimeZoneQueryType,
): FetchQueryOptions<
  AnalysisCategoryData,
  Error,
  AnalysisCategoryData,
  CategoryAnalysisQueryKey
> =>
  queryOptions<
    AnalysisCategoryData,
    Error,
    AnalysisCategoryData,
    CategoryAnalysisQueryKey
  >({
    queryKey: ANALYSIS_KEYS.categoryAnalysis([dateQuery.date]),
    queryFn: async () => {
      const envelope =
        await serverAnalysisAPIService.getCategoryAnalysis(dateQuery);
      return envelope.data;
    },
  });

export const serverFrequentlyVisitedSitesQueryOptions = (
  dateQuery: GetWebsiteAnalysesQueryType,
): FetchQueryOptions<
  FrequencyVisitedSitesData,
  Error,
  FrequencyVisitedSitesData,
  FrequentlyVisitedSitesQueryKey
> =>
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
        await serverAnalysisAPIService.getFrequentlyVisitedWebSite(dateQuery);
      return envelope.data;
    },
  });

export const serverLongestStayedWebsiteQueryOptions = (
  dateQuery: DateTimeZoneQueryType,
): FetchQueryOptions<
  LongestWebSiteData,
  Error,
  LongestWebSiteData,
  LongestStayedWebsiteQueryKey
> =>
  queryOptions<
    LongestWebSiteData,
    Error,
    LongestWebSiteData,
    LongestStayedWebsiteQueryKey
  >({
    queryKey: ANALYSIS_KEYS.longestStayedWebsite([dateQuery.date]),
    queryFn: async () => {
      const envelope =
        await serverAnalysisAPIService.getLongestStayedWebsite(dateQuery);
      return envelope.data;
    },
    retry: false,
  });

export const serverWorkPatternQueryOptions = (
  dateQuery: DateTimeZoneQueryType,
): FetchQueryOptions<
  AnalysisWorkPatternData,
  Error,
  AnalysisWorkPatternData,
  WorkPatternQueryKey
> =>
  queryOptions<
    AnalysisWorkPatternData,
    Error,
    AnalysisWorkPatternData,
    WorkPatternQueryKey
  >({
    queryKey: ANALYSIS_KEYS.workPattern([dateQuery.date]),
    queryFn: async () => {
      const envelope = await serverAnalysisAPIService.getWorkPattern(dateQuery);
      return envelope.data;
    },
  });
