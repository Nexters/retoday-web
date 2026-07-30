"use client";

import { useLocale } from "@recap/i18n";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@recap/ui";

import TimeThiefIllustration from "@/features/analysis/ui/TimeThiefIllustration";
import TimeThiefPill from "@/features/analysis/ui/TimeThiefPill";

const EmptyTodayTimeThief = () => {
  const { t } = useLocale("analysis");

  return (
    <Card className="gap-0 overflow-hidden rounded-[1.25rem] bg-white p-0 shadow-none">
      <CardHeader className="gap-3.5 p-5 pb-0 md:p-6 md:pb-0 xl:p-10 xl:pb-0">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
            {t("timeThief.title")}
          </CardTitle>

          <CardAction className="text-body-1 m-0 w-auto shrink-0 text-gray-500">
            -
          </CardAction>
        </div>

        <TimeThiefPill title="-" faviconUrl={null} />
      </CardHeader>

      <CardContent className="p-0">
        <TimeThiefIllustration
          alt={t("timeThief.imageAlt")}
          faviconUrl={null}
        />
      </CardContent>
    </Card>
  );
};

export default EmptyTodayTimeThief;
