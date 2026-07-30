"use client";

import { useLocale } from "@recap/i18n";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@recap/ui";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTimeZone } from "@/entities/language";
import { longestStayedWebsiteQueryOptions } from "@/features/analysis/api/analysis-query.client";
import TimeThiefIllustration from "@/features/analysis/ui/TimeThiefIllustration";
import TimeThiefPill from "@/features/analysis/ui/TimeThiefPill";
import { formatSecondsToMinutes } from "@/shared/lib/date/format-date";
import { getHostFromUrl } from "@/shared/lib/url";

const TodayTimeThief = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");
  const timeZone = useTimeZone();
  const { data } = useSuspenseQuery(
    longestStayedWebsiteQueryOptions({
      date,
      timeZone,
    }),
  );

  const host = getHostFromUrl(data?.domain ?? "") ?? "";

  return (
    <Card className="gap-0 overflow-hidden rounded-[1.25rem] bg-white p-0 shadow-none">
      <CardHeader className="gap-3.5 p-5 pb-0 md:p-6 md:pb-0 xl:p-10 xl:pb-0">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
            {t("timeThief.title")}
          </CardTitle>

          <CardAction className="text-body-1 m-0 w-auto shrink-0 text-gray-500">
            {t("timeThief.totalLabel", {
              duration: formatSecondsToMinutes(data?.stayDuration ?? 0, tc),
            })}
          </CardAction>
        </div>

        <TimeThiefPill title={host} faviconUrl={data?.faviconUrl ?? null} />
      </CardHeader>

      <CardContent className="p-0">
        <TimeThiefIllustration
          alt={t("timeThief.imageAlt")}
          faviconUrl={data?.faviconUrl ?? null}
          faviconAlt={host}
        />
      </CardContent>
    </Card>
  );
};

export default TodayTimeThief;
