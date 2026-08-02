"use client";

import { useMemo } from "react";
import type { AiRecapTimeline } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { formatDuration } from "@recap/lib";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Stack,
} from "@recap/ui";

import { toTimeLineChartState } from "@/features/ai-recap/model/to-time-line-chart-state";
import TimeLine from "@/shared/ui/TimeLine";

const AiTimeline = ({ timelines }: { timelines: AiRecapTimeline[] }) => {
  const { t } = useLocale("ai-recap");
  const { t: tc } = useLocale("common");

  const timelineData = useMemo(
    () =>
      toTimeLineChartState(timelines ?? [], (seconds) =>
        formatDuration(seconds, tc),
      ),
    [timelines, tc],
  );

  return (
    <Card className="relative flex flex-col gap-6 rounded-[1.25rem] bg-white px-5 py-5 shadow-none md:flex-row md:flex-nowrap md:gap-9 md:px-6 md:py-6 xl:px-9 xl:py-8">
      <CardHeader className="shrink-0 gap-0 p-0 md:max-w-57">
        <Stack gap="none" className="gap-2">
          <CardTitle className="text-heading-rg text-gray-800">
            {t("todayRecap.aiTimelineTitle")}
          </CardTitle>
          <CardDescription className="text-title-1 m-0 text-gray-900">
            {t("todayRecap.aiTimelineSubtitle")}
          </CardDescription>
        </Stack>
      </CardHeader>

      <CardContent className="relative min-w-0 flex-1 p-0">
        <TimeLine
          data={timelineData}
          emptyMessage={t("todayRecap.timelineEmpty")}
        />
      </CardContent>
    </Card>
  );
};

export default AiTimeline;
