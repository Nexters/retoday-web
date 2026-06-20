import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Grid, Stack } from "@recap/ui";

import AuthBoundary from "@/entities/auth/ui/AuthBoundary";
import {
  serverCategoryAnalysisQueryOptions,
  serverFrequentlyVisitedSitesQueryOptions,
  serverLongestStayedWebsiteQueryOptions,
  serverScreenTimeQueryOptions,
  serverWorkPatternQueryOptions,
} from "@/features/analysis/api/analysis-query.server";
import CategoryAnalysis from "@/features/analysis/ui/CategoryAnalysis";
import CategoryAnalysisSkeleton from "@/features/analysis/ui/CategoryAnalysisSkeleton";
import EmptyTodayTimeThief from "@/features/analysis/ui/EmptyTodayTimeThief";
import ScreenTime from "@/features/analysis/ui/ScreenTime";
import ScreenTimeSkeleton from "@/features/analysis/ui/ScreenTimeSkeleton";
import TodayTimeThief from "@/features/analysis/ui/TodayTimeThief";
import TodayTimeThiefSkeleton from "@/features/analysis/ui/TodayTimeThiefSkeleton";
import TopVisitedSites from "@/features/analysis/ui/TopVisitedSites";
import TopVisitedSitesSkeleton from "@/features/analysis/ui/TopVisitedSitesSkeleton";
import TrackDomainSetting from "@/features/analysis/ui/TrackDomainSetting";
import WorkPattern from "@/features/analysis/ui/WorkPattern";
import WorkPatternSkeleton from "@/features/analysis/ui/WorkPatternSkeleton";
import AnalysisLoadingPage from "@/pages/analysis/ui/AnalysisLoadingPage";
import AnalysisUnloginPage from "@/pages/analysis/ui/AnalysisUnloginPage";
import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";
import FetchBoundary from "@/shared/lib/query/FetchBoundary";

type AnalysisRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: AnalysisRouteProps) {
  const sp = searchParams ? await searchParams : {};

  const rawDate = sp.date;
  const dateParam = Array.isArray(rawDate) ? rawDate[0] : rawDate;

  const date = getSafeQueryDate(dateParam);

  return (
    <AuthBoundary
      loading={<AnalysisLoadingPage />}
      fallback={<AnalysisUnloginPage />}
    >
      <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
        <Suspense fallback={<ScreenTimeSkeleton />}>
          <FetchBoundary
            queries={[
              serverScreenTimeQueryOptions({
                date,
                period: "DAILY",
                timeZone: "SEOUL",
              }),
            ]}
          >
            <ScreenTime date={date} />
          </FetchBoundary>
        </Suspense>
        <Suspense fallback={<CategoryAnalysisSkeleton />}>
          <FetchBoundary
            queries={[
              serverCategoryAnalysisQueryOptions({
                date,
                timeZone: "SEOUL",
              }),
            ]}
          >
            <CategoryAnalysis date={date} />
          </FetchBoundary>
        </Suspense>
        <Grid
          cols={{ base: 1, md: 2 }}
          gap="none"
          className="gap-4 md:gap-5 xl:gap-7"
        >
          <Suspense fallback={<WorkPatternSkeleton />}>
            <FetchBoundary
              queries={[
                serverWorkPatternQueryOptions({
                  date,
                  timeZone: "SEOUL",
                }),
              ]}
            >
              <WorkPattern date={date} />
            </FetchBoundary>
          </Suspense>
          <ErrorBoundary fallback={<EmptyTodayTimeThief />}>
            <Suspense fallback={<TodayTimeThiefSkeleton />}>
              <FetchBoundary
                queries={[
                  serverLongestStayedWebsiteQueryOptions({
                    date,
                    timeZone: "SEOUL",
                  }),
                ]}
              >
                <TodayTimeThief date={date} />
              </FetchBoundary>
            </Suspense>
          </ErrorBoundary>
        </Grid>
        <Suspense fallback={<TopVisitedSitesSkeleton />}>
          <FetchBoundary
            queries={[
              serverFrequentlyVisitedSitesQueryOptions({
                date,
                limit: 10,
                timeZone: "SEOUL",
              }),
            ]}
          >
            <TopVisitedSites date={date} />
          </FetchBoundary>
        </Suspense>
      </Stack>
      <TrackDomainSetting />
    </AuthBoundary>
  );
}
