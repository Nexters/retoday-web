import {
  CategoryAnalysisSection,
  TodayTimeThiefSection,
  WeeklyScreenTimeSection,
} from "@/features/analysis/ui";
import { Divider } from "@/shared/ui";
import { ScrollPanel } from "@/shared/ui/ScrollPanel";
import { SidePanelHeader } from "@/widgets/layout/ui";

const AnalysisScreen = () => {
  return (
    <ScrollPanel>
      <ScrollPanel.Header>
        <SidePanelHeader />
      </ScrollPanel.Header>

      <ScrollPanel.Body>
        <WeeklyScreenTimeSection />
        <Divider />
        <CategoryAnalysisSection />
        <Divider />
        <TodayTimeThiefSection />
      </ScrollPanel.Body>
    </ScrollPanel>
  );
};

export default AnalysisScreen;
