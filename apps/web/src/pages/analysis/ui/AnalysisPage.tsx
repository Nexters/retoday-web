"use client";

import Link from "next/link";

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

      return (
        <>
          <div className="flex flex-col gap-4 md:gap-5 xl:gap-7">
            <ScreenTime date={date} />
            <CategoryAnalysis date={date} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:gap-7">
              <WorkPattern date={date} />
              <TodayTimeThief date={date} />
            </div>
            <TopVisitedSites date={date} />
          </div>
          <Link
            href="/settings"
            className="text-subtitle-1-md mt-7 flex items-center justify-end gap-1 p-2 text-[#4378ff]"
          >
            추적금지 도메인 추가하기
            <ArrowRightBlueIcon />
          </Link>
        </>
      );
    }}
  </AuthConsumer>
);

export default AnalysisPage;
