import {
  CategoryAnalysisSection,
  TodayTimeThiefSection,
  WeeklyScreenTimeSection,
} from "@/features/analysis/ui";
import { Divider } from "@/shared/ui";
import { SidePanelHeader } from "@/widgets/layout/ui";

const AnalysisScreen = () => {
  return (
    <>
      <SidePanelHeader />
      <WeeklyScreenTimeSection />
      <Divider />
      <CategoryAnalysisSection />
      <Divider />
      <TodayTimeThiefSection />
    </>
  );
};

export default AnalysisScreen;
