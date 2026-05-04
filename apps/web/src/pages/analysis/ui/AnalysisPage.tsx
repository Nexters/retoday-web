"use client";

import { useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@recap/ui";
import { useQueryClient } from "@tanstack/react-query";

import { useAuthStatus } from "@/entities/auth/model/use-auth-status";
import CategoryAnalysis from "@/features/analysis/ui/CategoryAnalysis";
import ScreenTime from "@/features/analysis/ui/ScreenTime";
import TodayTimeThief from "@/features/analysis/ui/TodayTimeThief";
import TopVisitedSites from "@/features/analysis/ui/TopVisitedSites";
import WorkPattern from "@/features/analysis/ui/WorkPattern";
import ArrowRightBlueIcon from "@/shared/assets/icons/arrow-right-blue.svg";
import UnloginCategoryImg from "@/shared/assets/img/analysis-unlogin-category.png";
import UnloginScreenTimeImg from "@/shared/assets/img/analysis-unlogin-screentime.png";
import UnloginTimeThiefImg from "@/shared/assets/img/analysis-unlogin-timethief.png";
import UnloginTopVisitedImg from "@/shared/assets/img/analysis-unlogin-topvisited.png";
import UnloginWorkPatternImg from "@/shared/assets/img/analysis-unlogin-workpattern.png";
import LoginBanner from "@/shared/ui/LoginBanner";

const AnalysisPage = ({ date }: { date: string }) => {
  const { isReady, isLoggedIn, refreshAuth } = useAuthStatus();

  const handleLoginSuccess = useCallback(() => {
    refreshAuth();
  }, [refreshAuth]);

  if (!isReady) {
    return <LoadingAnalysisLayout />;
  }

  if (!isLoggedIn) {
    return <UnloginAnalysisLayout onLoginSuccess={handleLoginSuccess} />;
  }

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
};

export default AnalysisPage;

const LoadingAnalysisLayout = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-5 xl:gap-7">
      <div className="h-80 animate-pulse rounded-[1.25rem] bg-white md:h-96" />
      <div className="h-108 animate-pulse rounded-[1.25rem] bg-white md:h-120" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:gap-7">
        <div className="h-80 animate-pulse rounded-[1.25rem] bg-white md:h-96" />
        <div className="h-80 animate-pulse rounded-[1.25rem] bg-white md:h-96" />
      </div>
      <div className="h-88 animate-pulse rounded-[1.25rem] bg-white md:h-96" />
    </div>
  );
};

const UnloginAnalysisLayout = ({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) => {
  const queryClient = useQueryClient();

  const handleLoginSuccess = async () => {
    await queryClient.resetQueries({ queryKey: ["getUserProfile"] });
    await queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });

    onLoginSuccess();
  };

  return (
    <div className="flex flex-col gap-4 md:gap-5 xl:gap-7">
      <LoginBanner handleLoginSuccess={handleLoginSuccess} />

      <AssetCardImage src={UnloginScreenTimeImg} alt="unlogin-screentime" />
      <AssetCardImage src={UnloginCategoryImg} alt="unlogin-category" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:gap-7">
        <AssetCardImage src={UnloginWorkPatternImg} alt="unlogin-workpattern" />
        <AssetCardImage src={UnloginTimeThiefImg} alt="unlogin-timethief" />
      </div>

      <AssetCardImage src={UnloginTopVisitedImg} alt="unlogin-topvisited" />
    </div>
  );
};

const AssetCardImage = ({
  src,
  alt,
  className,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={cn("w-full overflow-hidden rounded-[1.25rem]", className)}>
      <Image src={src} alt={alt} className="h-auto w-full" priority={false} />
    </div>
  );
};
