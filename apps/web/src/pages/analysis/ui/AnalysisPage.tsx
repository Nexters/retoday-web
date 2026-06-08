"use client";

import Link from "next/link";
import { useLocale } from "@recap/i18n";
import { Grid, Stack } from "@recap/ui";

import { AuthConsumer } from "@/entities/auth/ui";
import CategoryAnalysis from "@/features/analysis/ui/CategoryAnalysis";
import ScreenTime from "@/features/analysis/ui/ScreenTime";
import TodayTimeThief from "@/features/analysis/ui/TodayTimeThief";
import TopVisitedSites from "@/features/analysis/ui/TopVisitedSites";
import WorkPattern from "@/features/analysis/ui/WorkPattern";
import ArrowRightBlueIcon from "@/shared/assets/icons/arrow-right-blue.svg";

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
  const { t } = useLocale("analysis");

  return (
    <>
      <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
        <ScreenTime date={date} />
        <CategoryAnalysis date={date} />
        <Grid
          cols={{ base: 1, md: 2 }}
          gap="none"
          className="gap-4 md:gap-5 xl:gap-7"
        >
          <WorkPattern date={date} />
          <TodayTimeThief date={date} />
        </Grid>
        <TopVisitedSites date={date} />
      </Stack>
      <Link
        href="/settings"
        className="text-subtitle-1-md mt-7 flex items-center justify-end gap-1 p-2 text-[#4378ff]"
      >
        {t("settings.addNonTrackingDomainLink")}
        <ArrowRightBlueIcon />
      </Link>
    </>
  );
};

export default AnalysisPage;
