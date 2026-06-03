import { useState } from "react";
import type { ScreenTimePeriodType } from "@recap/api";
import { toScreenTimeChartState } from "@recap/features";
import { useLocale } from "@recap/i18n";
import { CURRENT_TIMEZONE, formatDate, formatDuration } from "@recap/lib";

import { useGetAnalysisScreenTime } from "@/features/analysis/api/analysis-query";
import {
  SCREEN_TIME_MODE_CONFIG,
  SCREEN_TIME_PERIOD_LIST,
} from "@/features/analysis/lib/screen-time-config.const";
import WeeklyScreenTimeSectionSkeleton from "@/features/analysis/ui/WeeklyScreenTimeSectionSkeleton";
import { DATE_FORMAT } from "@/shared/config";
import {
  ScreenTimeWeeklyBarChart,
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/ui";
import { useDateSelectorStore } from "@/widgets/date-selector/model";

const WeeklyScreenTimeSection = () => {
  const selectedDate = useDateSelectorStore((state) => state.selectedDate);
  const [mode, setMode] = useState<ScreenTimePeriodType>("DAILY");
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");

  const date = formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH);

  const { data, isLoading } = useGetAnalysisScreenTime(
    { date, period: mode, timeZone: CURRENT_TIMEZONE },
    {
      select: (screenTimeData) =>
        toScreenTimeChartState({ data: screenTimeData, mode, date, t }),
    },
  );

  const isEmpty = data?.duration && data.duration <= 0;
  const modeConfig = SCREEN_TIME_MODE_CONFIG[mode];

  if (isLoading) {
    return <WeeklyScreenTimeSectionSkeleton />;
  }

  return (
    <div className="w-full bg-white flex flex-col py-4 px-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
            {t(modeConfig.titleKey)}
          </h2>
          <h3 className="text-headline-sb mt-2 whitespace-nowrap text-gray-900">
            {isEmpty ? "-" : formatDuration(data?.duration ?? 0, tc)}
          </h3>
        </div>

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
      </div>

      <div className="h-6" />

      <div className="relative mt-6 w-full min-w-0">
        <ScreenTimeWeeklyBarChart
          className="w-full min-w-0"
          data={data?.chartData ?? []}
          height={140}
          minBarHeight={10}
          striped={!isEmpty}
          isEmpty={isEmpty || false}
        />

        {isEmpty && (
          <div
            className="absolute inset-x-0 top-0 z-10"
            style={{ height: 122 }}
          >
            <div className="absolute inset-0 bg-white" />
            <img
              src={modeConfig.emptySrc}
              alt={t(modeConfig.emptyAltKey)}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyScreenTimeSection;
