import Divider from "@/components/Divider";
import CategoryAnalysisSection from "@/features/analysis/components/category-analysis/CategoryAnalysisSection";
import TodayTimeThiefSection from "@/features/analysis/components/TodayTimeThiefSection";
import WeeklyScreenTimeSection from "@/features/analysis/components/WeeklyScreenTimeSection";

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
