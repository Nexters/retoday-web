"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { analysisAPIService } from "@/app/analysis/src/service";

type WebsiteAnalysis = {
  domain: string;
  faviconUrl: string | null;
  visitCount: number;
  stayDuration: number;
};

const formatMinutesFromSeconds = (seconds: number) => {
  const minutes = Math.max(0, Math.round(seconds / 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h <= 0) return `${m}분`;
  if (m <= 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

const toDisplayUrl = (domain: string) => {
  const trimmed = domain.trim();
  if (!trimmed) return "-";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return `https://${trimmed}`;
};

const TopVisitedSites = ({ date }: { date: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getFrequentlyVisitedWebSite", date, 10],
    queryFn: () =>
      analysisAPIService.getFrequentlyVisitedWebSite({
        date,
        limit: 10,
      }),
  });

  const served = useMemo(() => {
    const list: WebsiteAnalysis[] = data?.data?.websiteAnalyses ?? [];

    const top = [...list]
      .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
      .slice(0, 10);

    return top.map((it) => ({
      ...it,
      displayUrl: toDisplayUrl(it.domain),
      durationText: formatMinutesFromSeconds(it.stayDuration ?? 0),
    }));
  }, [data]);

  const isEmpty = !isLoading && served.length === 0;

  return (
    <div className="rounded-[1.25rem] bg-white p-10">
      <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
        자주 방문한 사이트
      </h2>

      <div className="mt-6 flex flex-col gap-2">
        {isEmpty ? (
          <div className="text-body-1 text-gray-500">
            아직 기록된 방문 사이트가 없어요
          </div>
        ) : (
          served.map((it, idx) => (
            <div
              className="bg-gray-75 flex items-center justify-between rounded-full p-2"
              key={`${it.domain}-${idx}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative size-6 overflow-hidden rounded-full bg-gray-200">
                  {it.faviconUrl ? (
                    <Image
                      src={it.faviconUrl}
                      alt={`${it.domain} favicon`}
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  ) : null}
                </div>

                <p className="text-body-1 truncate text-gray-500">
                  {it.displayUrl}
                </p>
              </div>

              <p className="text-body-1 whitespace-nowrap text-gray-900">
                {it.durationText}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopVisitedSites;
