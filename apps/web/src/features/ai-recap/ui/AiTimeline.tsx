"use client";

import { useMemo } from "react";
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

import type { NormalizedRecap } from "@/features/ai-recap/model/recap.type";
import { toTimelineChartData } from "@/features/ai-recap/model/timeline-chart-data";
import TimeLine from "@/shared/ui/TimeLine";

const AiTimeline = ({ recap }: { recap: NormalizedRecap }) => {
  const { t } = useLocale("ai-recap");
  const { t: tc } = useLocale("common");

  const timelineData = useMemo(
    () =>
      toTimelineChartData(recap.timelines ?? [], (seconds) =>
        formatDuration(seconds, tc),
      ),
    [recap.timelines, tc],
  );

  return (
    <Card className="relative flex flex-row flex-nowrap gap-9 rounded-[1.25rem] bg-white px-9 py-8 shadow-none">
      <CardHeader className="max-w-57 shrink-0 gap-0 p-0">
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
