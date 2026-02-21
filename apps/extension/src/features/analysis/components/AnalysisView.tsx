import Divider from "@/components/Divider";
import CategoryAnalysisSection from "@/features/analysis/components/category-analysis/CategoryAnalysisSection";
import TodayTimeThiefSection from "@/features/analysis/components/TodayTimeThiefSection";
import WeeklyScreenTimeSection from "@/features/analysis/components/WeeklyScreenTimeSection";

const AnalysisView = () => {
  return (
    <>
      <WeeklyScreenTimeSection />
      <Divider />
      <CategoryAnalysisSection />
      <Divider />
      <TodayTimeThiefSection />
    </>
  );
};

export default AnalysisView;
