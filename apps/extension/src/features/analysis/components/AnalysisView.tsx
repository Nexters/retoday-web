import { Divider } from "@/components";
import CategoryAnalysisSection from "@/features/analysis/components/category-analysis/CategoryAnalysisSection";

import TodayTimeThiefSection from "./TodayTimeThiefSection";
import WeeklyScreenTimeSection from "./WeeklyScreenTimeSection";

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
