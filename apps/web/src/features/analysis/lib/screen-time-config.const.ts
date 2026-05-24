import type { StaticImageData } from "next/image";
import type { ScreenTimePeriodType } from "@recap/api";

import EmptyDayChartImg from "@/shared/assets/img/empty-day-chart.png";
import EmptyWeekChartImg from "@/shared/assets/img/empty-week-chart.png";

const SCREEN_TIME_MODE_CONFIG: Record<
  ScreenTimePeriodType,
  {
    emptySrc: StaticImageData;
    titleKey: string;
    emptyAltKey: string;
  }
> = {
  WEEKLY: {
    emptySrc: EmptyWeekChartImg,
    titleKey: "screenTime.weeklyAverageTitle",
    emptyAltKey: "screenTime.emptyWeeklyChartAlt",
  },
  DAILY: {
    emptySrc: EmptyDayChartImg,
    titleKey: "screenTime.title",
    emptyAltKey: "screenTime.emptyDailyChartAlt",
  },
};

const SCREEN_TIME_PERIOD_LIST: ReadonlyArray<{
  value: ScreenTimePeriodType;
  labelKey: "screenTime.buttonToday" | "screenTime.buttonWeekly";
}> = [
  { value: "DAILY", labelKey: "screenTime.buttonToday" },
  { value: "WEEKLY", labelKey: "screenTime.buttonWeekly" },
];

export { SCREEN_TIME_MODE_CONFIG, SCREEN_TIME_PERIOD_LIST };
