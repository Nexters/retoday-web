"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useLocale } from "@recap/i18n";

import { useGetFrequencyVisitedSites } from "@/features/analysis/api/analysis-query";
import { formatSecondsToMinutes } from "@/shared/lib/date/format-date";

type WebsiteAnalysis = {
  domain: string;
  faviconUrl: string | null;
  visitCount: number;
  stayDuration: number;
};

const toDisplayUrl = (domain: string) => {
  const trimmed = domain.trim();
  if (!trimmed) return "-";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return `https://${trimmed}`;
};

const TopVisitedSites = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");
  const { data, isLoading } = useGetFrequencyVisitedSites(date, 10);

  const served = useMemo(() => {
    const list: WebsiteAnalysis[] = data?.websiteAnalyses ?? [];

    const top = [...list]
      .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
      .slice(0, 10);

    return top.map((it) => ({
      ...it,
      displayUrl: toDisplayUrl(it.domain),
      durationText: formatSecondsToMinutes(it.stayDuration ?? 0, tc),
    }));
  }, [data, tc]);

  const isEmpty = !isLoading && served.length === 0;

  return (
    <div className="rounded-[1.25rem] bg-white p-5 md:p-6 xl:p-10">
      <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
        {t("frequentSites.title")}
      </h2>

      <div className="mt-5 flex flex-col gap-2 md:mt-6">
        {isEmpty ? (
          <div className="text-body-1 text-gray-500">
            {t("frequentSites.emptyState")}
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
