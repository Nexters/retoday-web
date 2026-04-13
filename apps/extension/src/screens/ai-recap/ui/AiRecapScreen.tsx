import { useSettingStore } from "@/app/store/model";
import { AiRecapContent } from "@/features/ai-recap/ui";
import { DatePicker } from "@/shared/ui";

const AiRecapScreen = () => {
  const selectedDate = useSettingStore((state) => state.selectedDate);
  const setSelectedDate = useSettingStore((state) => state.setSelectedDate);

  return (
    <>
      <DatePicker
        value={selectedDate ?? new Date()}
        onChange={(date) => setSelectedDate(date ?? new Date())}
      />

      <AiRecapContent />
    </>
  );
};

export default AiRecapScreen;
