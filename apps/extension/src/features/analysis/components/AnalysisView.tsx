import { Divider } from "@/components";
import CategoryAnalysisSection from "@/features/analysis/components/category-analysis/CategoryAnalysisSection";

import TodayTimeThiefSection from "./TodayTimeThiefSection";
import WeeklyScreenTimeSection from "./WeeklyScreenTimeSection";

const AnalysisView = ({ selectedDate }: { selectedDate: Date }) => {
  return (
    <>
      <WeeklyScreenTimeSection selectedDate={selectedDate} />
      <Divider />
      <CategoryAnalysisSection selectedDate={selectedDate} />
      <Divider />
      <TodayTimeThiefSection selectedDate={selectedDate} />
    </>
  );
};

export default AnalysisView;
