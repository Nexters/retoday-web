import { AiRecapContent } from "@/features/ai-recap/ui";
import DateSelector from "@/widgets/date-selector/ui/DateSelector";

const AiRecapScreen = () => {
  return (
    <>
      <DateSelector />

      <AiRecapContent />
    </>
  );
};

export default AiRecapScreen;
