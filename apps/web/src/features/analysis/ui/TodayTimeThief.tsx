"use client";

import Image from "next/image";
import { useLocale } from "@recap/i18n";
import { CURRENT_TIMEZONE } from "@recap/lib";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@recap/ui";

import { useGetLongestWebSite } from "@/features/analysis/api/analysis-query";
import TimeThiefPill from "@/features/analysis/ui/TimeThiefPill";
import TimeThiefImg from "@/shared/assets/img/time-thief.png";
import { formatSecondsToMinutes } from "@/shared/lib/date/format-date";
import { getHostFromUrl } from "@/shared/lib/url";

const TodayTimeThief = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");
  const { data, isLoading } = useGetLongestWebSite({
    date,
    timeZone: CURRENT_TIMEZONE,
  });

  return (
    <Card className="gap-0 overflow-hidden rounded-[1.25rem] bg-white p-0 shadow-none">
      <CardHeader className="gap-3.5 p-5 pb-0 md:p-6 md:pb-0 xl:p-10 xl:pb-0">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
            {t("timeThief.title")}
          </CardTitle>

          <CardAction className="text-body-1 m-0 w-auto shrink-0 text-gray-500">
            {isLoading
              ? "-"
              : t("timeThief.totalLabel", {
                  duration: formatSecondsToMinutes(data?.stayDuration ?? 0, tc),
                })}
          </CardAction>
        </div>

        <TimeThiefPill
          title={isLoading ? "-" : (getHostFromUrl(data?.domain ?? "") ?? "")}
          faviconUrl={data?.faviconUrl ?? null}
        />
      </CardHeader>

      <CardContent className="relative h-48 p-0 md:h-52 xl:h-54">
        <Image
          src={TimeThiefImg}
          alt={t("timeThief.imageAlt")}
          fill
          className="object-cover"
          priority={false}
        />
      </CardContent>
    </Card>
  );
};

export default TodayTimeThief;
