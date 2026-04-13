import { useSettingStore } from "@/app/store/model/setting.store";
import {
  CategoryAnalysisSection,
  TodayTimeThiefSection,
  WeeklyScreenTimeSection,
} from "@/features/analysis/ui";
import { DatePicker, Divider } from "@/shared/ui";

const AnalysisScreen = () => {
  const selectedDate = useSettingStore((state) => state.selectedDate);
  const setSelectedDate = useSettingStore((state) => state.setSelectedDate);
  return (
    <>
      <DatePicker
        value={selectedDate ?? new Date()}
        onChange={(date) => setSelectedDate(date ?? new Date())}
      />
      <WeeklyScreenTimeSection />
      <Divider />
      <CategoryAnalysisSection />
      <Divider />
      <TodayTimeThiefSection />
    </>
  );
};

export default AnalysisScreen;
