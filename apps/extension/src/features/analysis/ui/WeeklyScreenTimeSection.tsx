import { useState } from "react";
import { useLocale } from "@recap/i18n";
import { formatDate, formatDuration } from "@recap/utils";

import { useSettingStore } from "@/app/store/model";
import { useGetAnalysisScreenTime } from "@/features/analysis/api/analysis-query";
import {
  ANALYSIS_PERIOD,
  type AnalysisPeriod,
} from "@/features/analysis/model/analysis.type";
import { transformScreenTimeToChartData } from "@/features/analysis/model/screen-time-chart-mapper";
import WeeklyScreenTimeSectionSkeleton from "@/features/analysis/ui/WeeklyScreenTimeSectionSkeleton";
import { DATE_FORMAT } from "@/shared/config";
import {
  ScreenTimeWeeklyBarChart,
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/ui";

const WeeklyScreenTimeSection = () => {
  const selectedDate = useSettingStore((state) => state.selectedDate);
  const [mode, setMode] = useState<AnalysisPeriod>(ANALYSIS_PERIOD.WEEKLY);
  const { locale, t } = useLocale("analysis");

  const { data: screenTime, isLoading } = useGetAnalysisScreenTime(
    mode,
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
  );

  const { data: weeklyScreenTime, isLoading: isLoadingWeeklyScreenTime } =
    useGetAnalysisScreenTime(
      ANALYSIS_PERIOD.WEEKLY,
      formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
      {
        select: (data) =>
          data.screenTimes.reduce(
            (acc, screenTime) => acc + screenTime.stayDuration,
            0,
          ),
      },
    );

  if (isLoading || isLoadingWeeklyScreenTime) {
    return <WeeklyScreenTimeSectionSkeleton />;
  }

  return (
    <div className="w-full bg-white flex flex-col py-4 px-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
            {t("screenTime.weeklyAverageTitle")}
          </h2>
          <h3 className="text-headline-sb mt-2 whitespace-nowrap text-gray-900">
            {t("screenTime.perDayAverage", {
              duration: weeklyScreenTime
                ? formatDuration(weeklyScreenTime / 7, t)
                : "-",
            })}
          </h3>
        </div>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(value) => {
            if (value.length === 0) return;
            setMode(value as AnalysisPeriod);
          }}
        >
          <ToggleGroupItem value={ANALYSIS_PERIOD.DAILY} position="left">
            {t("screenTime.buttonToday")}
          </ToggleGroupItem>
          <ToggleGroupItem value={ANALYSIS_PERIOD.WEEKLY} position="right">
            {t("screenTime.buttonWeekly")}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="h-6" />

      <ScreenTimeWeeklyBarChart
        data={
          screenTime
            ? transformScreenTimeToChartData(mode, screenTime, {
                locale,
                t,
              })
            : []
        }
        height={100}
        className="mt-20"
        minBarHeight={10}
        striped
      />
    </div>
  );
};

export default WeeklyScreenTimeSection;
