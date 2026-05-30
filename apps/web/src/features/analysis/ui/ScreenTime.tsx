"use client";

import { useState } from "react";
import Image from "next/image";
import type { ScreenTimePeriodType } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { formatDuration } from "@recap/lib";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@recap/ui";

import {
  SCREEN_TIME_MODE_CONFIG,
  SCREEN_TIME_PERIOD_LIST,
} from "@/features/analysis/lib/screen-time-config.const";
import { useScreenTimeChartData } from "@/features/analysis/model/use-screen-time-chart-data";
import {
  ScreenTimeWeeklyBarChart,
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/ui";

const ScreenTime = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");
  const [mode, setMode] = useState<ScreenTimePeriodType>("DAILY");

  const { chartData, duration } = useScreenTimeChartData(mode, date);
  const isEmpty = duration <= 0;

  const modeConfig = SCREEN_TIME_MODE_CONFIG[mode];

  const renderPeriodToggle = () => (
    <ToggleGroup<ScreenTimePeriodType>
      type="single"
      value={mode}
      onValueChange={setMode}
    >
      {SCREEN_TIME_PERIOD_LIST.map(({ value, labelKey }) => (
        <ToggleGroupItem key={value} value={value}>
          {t(labelKey)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );

  return (
    <Card className="flex w-full min-w-0 flex-col flex-nowrap items-stretch gap-0 rounded-[1.25rem] bg-white p-0 shadow-none xl:flex-row xl:flex-nowrap">
      <CardHeader className="flex w-full min-w-0 flex-col flex-nowrap gap-4 p-5 pb-6 md:flex-row md:flex-nowrap md:items-start md:justify-between md:p-6 md:pb-6 xl:h-auto xl:min-h-0 xl:w-auto xl:max-w-none xl:min-w-71.5 xl:flex-none xl:shrink-0 xl:grow-0 xl:basis-auto xl:p-10 xl:pb-10">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
            {t(modeConfig.titleKey)}
          </CardTitle>

          <CardDescription className="text-title-1 m-0 mt-2 whitespace-nowrap text-gray-900">
            {isEmpty ? "-" : formatDuration(duration, tc)}
          </CardDescription>
        </div>

        <CardAction className="hidden w-auto shrink-0 md:flex xl:hidden">
          {renderPeriodToggle()}
        </CardAction>
      </CardHeader>

      <CardContent className="flex min-h-0 w-full min-w-0 flex-1 flex-col flex-nowrap gap-0 px-5 pt-0 pb-3 md:px-6 md:pb-4 xl:flex-1 xl:grow xl:basis-0 xl:px-6 xl:pt-10 xl:pb-3">
        <CardAction className="flex w-full min-w-0 justify-end gap-2 md:hidden xl:flex xl:justify-start">
          {renderPeriodToggle()}
        </CardAction>

        <div className="relative mt-6 w-full min-w-0 md:mt-7 xl:mt-12">
          <ScreenTimeWeeklyBarChart
            className="w-full min-w-0"
            data={chartData}
            height={140}
            minBarHeight={10}
            striped={!isEmpty}
            isEmpty={isEmpty}
          />

          {isEmpty && (
            <div
              className="absolute inset-x-0 top-0 z-10"
              style={{ height: 122 }}
            >
              <div className="absolute inset-0 bg-white" />
              <Image
                src={modeConfig.emptySrc}
                alt={t(modeConfig.emptyAltKey)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenTime;
