import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createQueryClient, dehydrateState } from "@recap/react-query";
import { Grid, Stack } from "@recap/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import AuthBoundary from "@/entities/auth/ui/AuthBoundary";
import { TimeZoneProvider } from "@/entities/language";
import {
  serverCategoryAnalysisQueryOptions,
  serverFrequentlyVisitedSitesQueryOptions,
  serverLongestStayedWebsiteQueryOptions,
  serverWorkPatternQueryOptions,
} from "@/features/analysis/api/analysis-query.server";
import CategoryAnalysis from "@/features/analysis/ui/CategoryAnalysis";
import CategoryAnalysisSkeleton from "@/features/analysis/ui/CategoryAnalysisSkeleton";
import EmptyTodayTimeThief from "@/features/analysis/ui/EmptyTodayTimeThief";
import ScreenTime from "@/features/analysis/ui/ScreenTime";
import TodayTimeThief from "@/features/analysis/ui/TodayTimeThief";
import TodayTimeThiefSkeleton from "@/features/analysis/ui/TodayTimeThiefSkeleton";
import TopVisitedSites from "@/features/analysis/ui/TopVisitedSites";
import TopVisitedSitesSkeleton from "@/features/analysis/ui/TopVisitedSitesSkeleton";
import TrackDomainSetting from "@/features/analysis/ui/TrackDomainSetting";
import WorkPattern from "@/features/analysis/ui/WorkPattern";
import WorkPatternSkeleton from "@/features/analysis/ui/WorkPatternSkeleton";
import { getServerUserTimeZone } from "@/features/settings/api/user-query.server";
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

  const queryClient = createQueryClient();
  const timeZone = await getServerUserTimeZone(queryClient);

  if (!timeZone) {
    return <AnalysisUnloginPage />;
  }

  return (
    <AuthBoundary
      loading={<AnalysisLoadingPage />}
      fallback={<AnalysisUnloginPage />}
    >
      <HydrationBoundary state={dehydrateState(queryClient)}>
        <TimeZoneProvider timeZone={timeZone}>
          <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
            <ScreenTime date={date} />
            <Suspense fallback={<CategoryAnalysisSkeleton />}>
              <FetchBoundary
                queries={[
                  serverCategoryAnalysisQueryOptions({
                    date,
                    timeZone,
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
                      timeZone,
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
                        timeZone,
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
                    timeZone,
                  }),
                ]}
              >
                <TopVisitedSites date={date} />
              </FetchBoundary>
            </Suspense>
          </Stack>
          <TrackDomainSetting />
        </TimeZoneProvider>
      </HydrationBoundary>
    </AuthBoundary>
  );
}
