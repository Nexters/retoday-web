"use client";

import { useMemo } from "react";
import Image from "next/image";
import { cn } from "@recap/ui";
import { useQuery } from "@tanstack/react-query";

import { analysisAPIService } from "@/app/analysis/src/service";
import TimeThiefImg from "@/assets/img/time-thief.png";

const formatMinutesFromSeconds = (seconds: number) => {
  const minutes = Math.max(0, Math.round(seconds / 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h <= 0) return `${m}분`;
  if (m <= 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

const getHostLabel = (domain: string | null) => {
  if (!domain) return null;

  const v = domain.trim();
  if (!v) return "-";
  const host = v.replace(/^https?:\/\//, "").split("/")[0];
  return host?.split(".")[0] || host;
};

const TodayTimeThief = ({ date }: { date: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getTopVisitedSite", date],
    queryFn: () => analysisAPIService.getLongestStayedWebsite({ date }),
  });

  const served = useMemo(() => {
    const site = data?.data;

    if (!site) {
      return {
        isEmpty: true,
        title: "-",
        durationText: "-",
        faviconUrl: null as string | null,
      };
    }

    return {
      isEmpty: false,
      title: getHostLabel(site.domain) ?? "-",
      durationText: formatMinutesFromSeconds(site.stayDuration ?? 0),
      faviconUrl: site.faviconUrl ?? null,
    };
  }, [data]);

  return (
    <div className="overflow-hidden rounded-[1.25rem] bg-white">
      <div className="p-10 pb-0">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
            오늘의 시간 도둑
          </h2>

          <p className="text-body-1 text-gray-500">
            {isLoading || served.isEmpty ? "-" : `총 ${served.durationText}`}
          </p>
        </div>

        <div className="mt-3.5">
          <TimeThiefPill
            title={isLoading ? "-" : served.title}
            faviconUrl={isLoading || served.isEmpty ? null : served.faviconUrl}
          />
        </div>
      </div>

      <div className="relative h-54 w-full">
        <Image
          src={TimeThiefImg}
          alt="img"
          fill
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
};

export default TodayTimeThief;

const TimeThiefPill = ({
  title,
  faviconUrl,
}: {
  title: string;
  faviconUrl: string | null;
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        "bg-blue-75 rounded-xl px-3 py-2",
        "text-title-1 text-gray-900",
      )}
    >
      {faviconUrl ? (
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-white/80">
          <Image
            src={faviconUrl}
            alt=""
            width={18}
            height={18}
            className="size-4.5 object-contain"
            referrerPolicy="no-referrer"
            unoptimized
          />
        </span>
      ) : null}

      <span className="whitespace-nowrap">{title}</span>
    </div>
  );
};
