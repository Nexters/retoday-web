import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Grid, Stack } from "@recap/ui";

import AuthBoundary from "@/entities/auth/ui/AuthBoundary";
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
import AnalysisLoadingPage from "@/pages/analysis/ui/AnalysisLoadingPage";
import AnalysisUnloginPage from "@/pages/analysis/ui/AnalysisUnloginPage";
import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";

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
        <ScreenTime date={date} />
        <Suspense fallback={<CategoryAnalysisSkeleton />}>
          <CategoryAnalysis date={date} />
        </Suspense>
        <Grid
          cols={{ base: 1, md: 2 }}
          gap="none"
          className="gap-4 md:gap-5 xl:gap-7"
        >
          <Suspense fallback={<WorkPatternSkeleton />}>
            <WorkPattern date={date} />
          </Suspense>
          <ErrorBoundary fallback={<EmptyTodayTimeThief />}>
            <Suspense fallback={<TodayTimeThiefSkeleton />}>
              <TodayTimeThief date={date} />
            </Suspense>
          </ErrorBoundary>
        </Grid>
        <Suspense fallback={<TopVisitedSitesSkeleton />}>
          <TopVisitedSites date={date} />
        </Suspense>
      </Stack>
      <TrackDomainSetting />
    </AuthBoundary>
  );
}
