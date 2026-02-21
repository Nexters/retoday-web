import Divider from "@/components/Divider";
import TodayRecapDetail from "@/features/ai-recap/components/TodayRecapDetail";
import TodayRecapSection from "@/features/ai-recap/components/TodayRecapSection";
import TodayTopicsSection from "@/features/ai-recap/components/TodayTopicsSection";

const AiRecapView = () => {
  return (
    <>
      <TodayRecapSection />
      <TodayRecapDetail />
      <Divider />
      <TodayTopicsSection />
    </>
  );
};

export default AiRecapView;
