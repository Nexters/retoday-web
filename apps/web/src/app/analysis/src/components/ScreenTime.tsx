"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Badge, type WeeklyBarDatum } from "@recap/ui";
import { useQuery } from "@tanstack/react-query";

import { analysisAPIService } from "@/app/analysis/src/service";
import type {
  ScreenTimePeriodType,
  ScreenTimeType,
} from "@/app/analysis/src/service/schema/get-screen-time.schema";
import EmptyDayChartImg from "@/assets/img/empty-day-chart.png";
import EmptyWeekChartImg from "@/assets/img/empty-week-chart.png";
import ScreenTimeWeeklyBarChart from "@/components/ScreenTimeWeeklyBarChart";

const EMPTY_ASSET: Record<
  ScreenTimePeriodType,
  { src: StaticImageData; alt: string }
> = {
  WEEKLY: {
    src: EmptyWeekChartImg,
    alt: "이번 주간에는 아직 누적된 활동이 보이지 않아요",
  },
  DAILY: {
    src: EmptyDayChartImg,
    alt: "이 날에는 누적된 활동이 없어요",
  },
};

const ScreenTime = ({ date }: { date: string }) => {
  const [mode, setMode] = useState<ScreenTimePeriodType>("DAILY");

  const { data } = useQuery({
    queryKey: ["getScreenTime", mode, date],
    queryFn: () =>
      analysisAPIService.getScreenTime({
        date,
        period: mode,
      }),
  });

  const served = useMemo(() => {
    if (!data) {
      return {
        chartData: [] as WeeklyBarDatum[],
        summaryText: "-",
        isEmpty: true,
      };
    }

    const totalMinutes = secondsToMinutes(data.data.totalStayDuration);
    const isEmpty = totalMinutes <= 0 || data.data.screenTimes.length === 0;

    const rangeLabel = `${toMMDD(data.data.startedAt)} - ${toMMDD(data.data.endedAt)}`;

    const chartData =
      data.data.period === "DAILY"
        ? toDailyBarData(data.data.screenTimes)
        : toWeeklyBarData(data.data.screenTimes, rangeLabel);

    const summaryText =
      data.data.period === "DAILY"
        ? formatMinutes(totalMinutes)
        : formatMinutes(Math.round(totalMinutes / 7));

    return { chartData, summaryText, isEmpty };
  }, [data]);

  return (
    <div className="flex rounded-[1.25rem] bg-white">
      <div className="min-w-71.5 p-10">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          {mode === "WEEKLY" ? "이번주 평균 스크린타임" : "총 스크린타임"}
        </h2>

        <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
          {served.isEmpty ? "-" : served.summaryText}
        </h3>
      </div>

      <div className="w-full px-6 pt-10 pb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={mode === "DAILY" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setMode("DAILY")}
          >
            오늘
          </Badge>

          <Badge
            variant={mode === "WEEKLY" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setMode("WEEKLY")}
          >
            주간
          </Badge>
        </div>

        <div className="relative mt-12">
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
                src={EMPTY_ASSET[mode].src}
                alt={EMPTY_ASSET[mode].alt}
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

const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h <= 0) return `${m}분`;
  if (m <= 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

const toMMDD = (date: Date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}.${dd}`;
};

const secondsToMinutes = (seconds: number) =>
  Math.max(0, Math.round(seconds / 60));

const toDailyBarData = (screenTimes: ScreenTimeType[]): WeeklyBarDatum[] => {
  const blocks: WeeklyBarDatum[] = Array.from({ length: 12 }, (_, i) => {
    const startHour = i * 2;
    return {
      key: `today-${startHour}`,
      label: String(startHour),
      subLabel: `오늘 ${String(startHour).padStart(2, "0")}:00 - ${String(
        startHour + 2,
      ).padStart(2, "0")}:00`,
      totalMinutes: 0,
      avgMinutes: 0,
    };
  });

  for (const t of screenTimes) {
    const d = new Date(t.startedAt);
    const hour = d.getHours();
    const idx = Math.floor(hour / 2);
    if (!blocks[idx]) continue;

    blocks[idx].totalMinutes += secondsToMinutes(t.stayDuration);
  }

  blocks.forEach((b) => (b.avgMinutes = b.totalMinutes));
  return blocks;
};

const toWeeklyBarData = (
  screenTimes: ScreenTimeType[],
  rangeLabel: string,
): WeeklyBarDatum[] => {
  const labels = ["일", "월", "화", "수", "목", "금", "토"];

  const blocks: WeeklyBarDatum[] = labels.map((label, idx) => ({
    key: `week-${idx}-${label}`,
    label,
    subLabel: rangeLabel,
    totalMinutes: 0,
    avgMinutes: 0,
  }));

  for (const t of screenTimes) {
    const d = new Date(t.startedAt);
    const day = d.getDay();
    if (!blocks[day]) continue;

    blocks[day].totalMinutes += secondsToMinutes(t.stayDuration);
  }

  blocks.forEach((b) => (b.avgMinutes = b.totalMinutes));
  return blocks;
};
