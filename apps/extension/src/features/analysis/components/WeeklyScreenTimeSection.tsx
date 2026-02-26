import { useState } from "react";

import { ScreenTimeWeeklyBarChart } from "@/components/ScreenTimeWeeklyBarChart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ToggleGroup";
import { DATE_FORMAT } from "@/const/date-format.const";
import {
  ANALYSIS_PERIOD,
  type AnalysisPeriod,
} from "@/entities/analysis/model/analysis.type";
import { useGetAnalysisScreenTime } from "@/entities/analysis/queries/analysis-query";
import { DUMMY_CHART_DATA } from "@/features/ai-recap/const/dummy.const";
import { formatDate } from "@/utils/date";

const WeeklyScreenTimeSection = ({ selectedDate }: { selectedDate: Date }) => {
  const [mode, setMode] = useState<AnalysisPeriod>(ANALYSIS_PERIOD.WEEKLY);

  const { data: screenTime } = useGetAnalysisScreenTime(
    mode,
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
  );
  console.log("screenTime", screenTime);
  return (
    <div className="w-full bg-white flex flex-col py-4 px-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
            이번주 평균 스크린타임
          </h2>
          <h3 className="text-headline-sb mt-2 whitespace-nowrap text-gray-900">
            하루 109시간 2분
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
            오늘
          </ToggleGroupItem>
          <ToggleGroupItem value={ANALYSIS_PERIOD.WEEKLY} position="right">
            주간
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="h-6" />

      <ScreenTimeWeeklyBarChart
        data={DUMMY_CHART_DATA}
        height={100}
        className="mt-20"
        minBarHeight={10}
        striped
      />
    </div>
  );
};

export default WeeklyScreenTimeSection;
