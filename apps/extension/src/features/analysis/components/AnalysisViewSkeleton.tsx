import Divider from "@/components/Divider";
import CategoryAnalysisSectionSkeleton from "@/features/analysis/components/CategoryAnalysisSectionSkeleton";
import TodayTimeThiefSectionSkeleton from "@/features/analysis/components/TodayTimeThiefSectionSkeleton";
import WeeklyScreenTimeSectionSkeleton from "@/features/analysis/components/WeeklyScreenTimeSectionSkeleton";

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
