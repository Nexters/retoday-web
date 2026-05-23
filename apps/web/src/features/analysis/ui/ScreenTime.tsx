"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLocale } from "@recap/i18n";
import { dayjs, formatDuration } from "@recap/lib";
import { Badge, type WeeklyBarDatum } from "@recap/ui";

import { useGetAnalysisScreenTime } from "@/features/analysis/api/analysis-query";
import type { ScreenTimePeriodType } from "@/features/analysis/model/get-screen-time.schema";
import {
  toDailyBarData,
  toWeeklyBarData,
} from "@/features/analysis/model/screen-time-bar-data";
import EmptyDayChartImg from "@/shared/assets/img/empty-day-chart.png";
import EmptyWeekChartImg from "@/shared/assets/img/empty-week-chart.png";
import { secondsToMinute } from "@/shared/lib/date/format-date";
import ScreenTimeWeeklyBarChart from "@/shared/ui/ScreenTimeWeeklyBarChart";

const EMPTY_SRC: Record<ScreenTimePeriodType, StaticImageData> = {
  WEEKLY: EmptyWeekChartImg,
  DAILY: EmptyDayChartImg,
};

const ScreenTime = ({ date }: { date: string }) => {
  const [mode, setMode] = useState<ScreenTimePeriodType>("DAILY");
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");

  const { data } = useGetAnalysisScreenTime(mode, date);

  const served = useMemo(() => {
    if (!data) {
      return {
        chartData: [] as WeeklyBarDatum[],
        summaryText: "-",
        isEmpty: true,
      };
    }

    const totalMinutes = secondsToMinute(data.data.totalStayDuration);
    const isEmpty = totalMinutes <= 0 || data.data.screenTimes.length === 0;

    const rangeLabel = `${dayjs(data.data.startedAt).format("MM.DD")} - ${dayjs(data.data.endedAt).format("MM.DD")}`;

    const chartData =
      data.data.period === "DAILY"
        ? toDailyBarData(data.data.screenTimes, t)
        : toWeeklyBarData(data.data.screenTimes, rangeLabel, t);

    const summaryText =
      data.data.period === "DAILY"
        ? formatDuration(totalMinutes * 60, tc)
        : formatDuration(Math.round(totalMinutes / 7) * 60, tc);

    return { chartData, summaryText, isEmpty };
  }, [data, t, tc]);

  const emptyAlt =
    mode === "WEEKLY"
      ? t("screenTime.emptyWeeklyChartAlt")
      : t("screenTime.emptyDailyChartAlt");

  return (
    <div className="flex flex-col rounded-[1.25rem] bg-white xl:flex-row">
      <div className="p-5 md:p-6 xl:min-w-71.5 xl:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
              {mode === "WEEKLY"
                ? t("screenTime.weeklyAverageTitle")
                : t("screenTime.title")}
            </h2>

            <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
              {served.isEmpty ? "-" : served.summaryText}
            </h3>
          </div>

          <div className="hidden items-center gap-2 md:flex xl:hidden">
            <Badge
              variant={mode === "DAILY" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setMode("DAILY")}
            >
              {t("screenTime.buttonToday")}
            </Badge>

            <Badge
              variant={mode === "WEEKLY" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setMode("WEEKLY")}
            >
              {t("screenTime.buttonWeekly")}
            </Badge>
          </div>
        </div>
      </div>

      <div className="w-full px-5 pb-3 md:px-6 md:pb-4 xl:px-6 xl:pt-10 xl:pb-3">
        <div className="flex items-center justify-end gap-2 md:hidden xl:flex xl:justify-start">
          <Badge
            variant={mode === "DAILY" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setMode("DAILY")}
          >
            {t("screenTime.buttonToday")}
          </Badge>

          <Badge
            variant={mode === "WEEKLY" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setMode("WEEKLY")}
          >
            {t("screenTime.buttonWeekly")}
          </Badge>
        </div>

        <div className="relative mt-6 md:mt-7 xl:mt-12">
          <ScreenTimeWeeklyBarChart
            data={served.chartData}
            height={140}
            minBarHeight={10}
            striped={!served.isEmpty}
            isEmpty={served.isEmpty}
          />

          {served.isEmpty && (
            <div
              className="absolute inset-x-0 top-0 z-10"
              style={{ height: 122 }}
            >
              <div className="absolute inset-0 bg-white" />
              <Image
                src={EMPTY_SRC[mode]}
                alt={emptyAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenTime;
