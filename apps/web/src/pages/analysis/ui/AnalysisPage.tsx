"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Grid, Stack } from "@recap/ui";

import { AuthConsumer } from "@/entities/auth/ui";
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

import AnalysisLoadingPage from "./AnalysisLoadingPage";
import AnalysisUnloginPage from "./AnalysisUnloginPage";

const AnalysisPage = ({ date }: { date: string }) => (
  <AuthConsumer>
    {({ isReady, isLoggedIn }) => {
      if (!isReady) return <AnalysisLoadingPage />;
      if (!isLoggedIn) return <AnalysisUnloginPage />;

      return <AnalysisLoggedInSection date={date} />;
    }}
  </AuthConsumer>
);

const AnalysisLoggedInSection = ({ date }: { date: string }) => {
  return (
    <>
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
    </>
  );
};

export default AnalysisPage;
