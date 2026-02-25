"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import RecapSummary from "@/app/ai-recap/src/components/RecapSummary";
import Timeline from "@/app/ai-recap/src/components/Timeline";
import TopVisitedTopics from "@/app/ai-recap/src/components/TopVisitedTopics";
import { recapAPIService } from "@/app/ai-recap/src/service";
import { tokenStore } from "@/app/settings/src/lib/token-store";
import EmptyRecapImg1 from "@/assets/img/empty-reacp-1.png";
import EmptyRecapImg2 from "@/assets/img/empty-recap-2.png";
import LoginBanner from "@/components/LoginBanner";

const Recap = ({ date }: { date: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(tokenStore.getAccess()));
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return <UnloginRecapLayout onLoginSuccess={handleLoginSuccess} />;
  }

  return <LoggedInRecap date={date} />;
};

const LoggedInRecap = ({ date }: { date: string }) => {
  const { data } = useQuery({
    queryKey: ["generateRecap", date],
    queryFn: () => recapAPIService.getRecap({ date }),
  });

  void data;

  return (
    <>
      <RecapSummary />
      <Timeline />
      <TopVisitedTopics />
    </>
  );
};

const UnloginRecapLayout = ({
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

      <div className="rounded-[1.25rem] bg-white px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-heading-md text-blue-400">Today&apos;s Recap</p>
            <h2 className="text-title-1 md:text-display-2 leading-tight text-gray-900">
              매일밤 오늘의 인터넷 리캡을 배달해드려요
            </h2>
          </div>

          <div className="flex items-start justify-between gap-6 border-t border-solid border-gray-100 pt-4 md:justify-start md:gap-8 md:border-0 md:pt-0">
            <div className="min-w-26 space-y-1 md:w-26">
              <p className="text-subtitle-2-rg text-gray-500">총 스크린타임</p>
              <p className="text-heading-rg text-gray-900">-</p>
            </div>
            <div className="h-14 w-px bg-gray-200" />
            <div className="min-w-26 space-y-1 md:w-26">
              <p className="text-subtitle-2-rg text-gray-500">측정시간</p>
              <p className="text-heading-rg text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.25rem] bg-white px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
        <p className="text-heading-rg text-gray-800">
          리캡은 이런 형태로 제공돼요
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-9 md:grid-cols-2 md:gap-9">
          <div>
            <MockPreviewImage src={EmptyRecapImg1} alt="emptyRecapImg1" />
            <p className="text-body-1 md:text-headline-sb mt-3 text-gray-600 md:mt-4">
              오늘 하루가 어떤 하루였는지 요약해드려요
            </p>
          </div>

          <div>
            <MockPreviewImage src={EmptyRecapImg2} alt="emptyRecapImg2" />
            <p className="text-body-1 md:text-headline-sb mt-3 text-gray-600 md:mt-4">
              관심있었던 주제, 하루 타임라인을 확인해요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockPreviewImage = ({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) => {
  return (
    <div className="h-56 w-full overflow-hidden rounded-[1.25rem] md:h-140">
      <Image
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        priority={false}
      />
    </div>
  );
};

export default Recap;
