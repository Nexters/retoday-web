import { useSettingStore } from "@/app/store/model";
import { useGetAiRecap } from "@/features/ai-recap/api/ai-recap-query";
import {
  AiRecapEmptyView,
  AiRecapViewSkeleton,
  TodayRecapDetail,
  TodayRecapSection,
  TodayTopicsSection,
} from "@/features/ai-recap/ui";
import { DATE_FORMAT } from "@/shared/config";
import { formatDate } from "@/shared/lib/date/date";
import { Content, DatePicker, Divider } from "@/shared/ui";

const AiRecapScreen = () => {
  const selectedDate = useSettingStore((state) => state.selectedDate);
  const setSelectedDate = useSettingStore((state) => state.setSelectedDate);
  const { data, isLoading } = useGetAiRecap(
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
  );

  if (isLoading) {
    return <AiRecapViewSkeleton />;
  }
  if (Object.keys(data ?? {}).length === 0) {
    return <AiRecapEmptyView />;
  }

  return (
    <>
      <DatePicker
        value={selectedDate ?? new Date()}
        onChange={(date) => setSelectedDate(date ?? new Date())}
      />
      <Content>
        <TodayRecapSection {...data} />
        <TodayRecapDetail sections={data?.sections ?? []} />
        <Divider />
        <TodayTopicsSection topics={data?.topics ?? []} />
      </Content>
    </>
  );
};

export default AiRecapScreen;
