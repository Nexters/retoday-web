import { useSettingStore } from "@/app/store/model/setting.store";
import {
  CategoryAnalysisSection,
  TodayTimeThiefSection,
  WeeklyScreenTimeSection,
} from "@/features/analysis/ui";
import { Content, DatePicker, Divider } from "@/shared/ui";

const AnalysisScreen = () => {
  const selectedDate = useSettingStore((state) => state.selectedDate);
  const setSelectedDate = useSettingStore((state) => state.setSelectedDate);
  return (
    <>
      <DatePicker
        value={selectedDate ?? new Date()}
        onChange={(date) => setSelectedDate(date ?? new Date())}
      />
      <Content>
        <WeeklyScreenTimeSection />
        <Divider />
        <CategoryAnalysisSection />
        <Divider />
        <TodayTimeThiefSection />
      </Content>
    </>
  );
};

export default AnalysisScreen;
