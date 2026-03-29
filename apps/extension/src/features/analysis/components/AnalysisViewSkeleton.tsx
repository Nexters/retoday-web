import { Divider } from "@/components";

import CategoryAnalysisSectionSkeleton from "./CategoryAnalysisSectionSkeleton";
import TodayTimeThiefSectionSkeleton from "./TodayTimeThiefSectionSkeleton";
import WeeklyScreenTimeSectionSkeleton from "./WeeklyScreenTimeSectionSkeleton";

const AnalysisViewSkeleton = () => {
  return (
    <>
      <WeeklyScreenTimeSectionSkeleton />
      <Divider />
      <CategoryAnalysisSectionSkeleton />
      <Divider />
      <TodayTimeThiefSectionSkeleton />
    </>
  );
};

export default AnalysisViewSkeleton;
