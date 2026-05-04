import {
  CategoryAnalysisSection,
  TodayTimeThiefSection,
  WeeklyScreenTimeSection,
} from "@/features/analysis/ui";
import { Divider } from "@/shared/ui";
import DateSelector from "@/widgets/date-selector/ui/DateSelector";

const AnalysisScreen = () => {
  return (
    <>
      <DateSelector />
      <WeeklyScreenTimeSection />
      <Divider />
      <CategoryAnalysisSection />
      <Divider />
      <TodayTimeThiefSection />
    </>
  );
};

export default AnalysisScreen;
