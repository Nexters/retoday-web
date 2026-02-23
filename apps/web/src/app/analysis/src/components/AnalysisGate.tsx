"use client";

import { useCallback, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@recap/ui";
import { useQueryClient } from "@tanstack/react-query";

import CategoryAnalysis from "@/app/analysis/src/components/CategoryAnalysis";
import ScreenTime from "@/app/analysis/src/components/ScreenTime";
import TodayTimeThief from "@/app/analysis/src/components/TodayTimeThief";
import TopVisitedSites from "@/app/analysis/src/components/TopVisitedSites";
import WorkPattern from "@/app/analysis/src/components/WorkPattern";
import { tokenStore } from "@/app/settings/src/lib/token-store";
import UnloginCategoryImg from "@/assets/img/analysis-unlogin-category.png";
import UnloginScreenTimeImg from "@/assets/img/analysis-unlogin-screentime.png";
import UnloginTimeThiefImg from "@/assets/img/analysis-unlogin-timethief.png";
import UnloginTopVisitedImg from "@/assets/img/analysis-unlogin-topvisited.png";
import UnloginWorkPatternImg from "@/assets/img/analysis-unlogin-workpattern.png";
import LoginButton from "@/components/LoginButton";

const AnalysisGate = ({ date }: { date: string }) => {
  const initialLoggedIn = useMemo(() => {
    const snapshot =
      "get" in tokenStore && typeof tokenStore.get === "function"
        ? tokenStore.get()
        : null;

    return Boolean(snapshot?.accessToken);
  }, []);

  // ✅ 로그인 상태를 state로 들고 있어야 화면 전환이 됨
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  const handleLoginSuccess = useCallback(() => {
    // tokenStore.set(...) 이후 여기 호출되면 즉시 UI 전환
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return <UnloginAnalysisLayout onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <ScreenTime date={date} />
      <CategoryAnalysis date={date} />
      <div className="grid grid-cols-2 gap-7">
        <WorkPattern date={date} />
        <TodayTimeThief date={date} />
      </div>
      <TopVisitedSites date={date} />
    </>
  );
};

export default AnalysisGate;

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
    <>
      <div className="bg-blue-75 rounded-[1.25rem] px-9 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-display-3 text-gray-800">
            로그인하고 내 하루 기록을 확인해 보세요
          </h2>

          <LoginButton onLoginSuccess={handleLoginSuccess} />
        </div>
        <p className="text-heading-rg mt-2 text-gray-800">
          지금 보이는 화면은 샘플데이터에요
        </p>
      </div>

      <AssetCardImage src={UnloginScreenTimeImg} alt="unlogin-screentime" />
      <AssetCardImage src={UnloginCategoryImg} alt="unlogin-category" />

      <div className="grid grid-cols-2 gap-7">
        <AssetCardImage src={UnloginWorkPatternImg} alt="unlogin-workpattern" />
        <AssetCardImage src={UnloginTimeThiefImg} alt="unlogin-timethief" />
      </div>

      <AssetCardImage src={UnloginTopVisitedImg} alt="unlogin-topvisited" />
    </>
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
