import { AiRecapContent } from "@/features/ai-recap/ui";
import { ScrollPanel } from "@/shared/ui/ScrollPanel";
import { SidePanelHeader } from "@/widgets/layout/ui";

const AiRecapScreen = () => {
  return (
    <ScrollPanel>
      <ScrollPanel.Header>
        <SidePanelHeader />
      </ScrollPanel.Header>

      <ScrollPanel.Body>
        <AiRecapContent />
      </ScrollPanel.Body>
    </ScrollPanel>
  );
};

export default AiRecapScreen;
