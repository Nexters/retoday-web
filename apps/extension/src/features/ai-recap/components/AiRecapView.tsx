import { Divider } from "@/components";
import { DATE_FORMAT } from "@/const";
import { useGetAiRecap } from "@/entities/ai-recap/queries/ai-recap-query";
import AiRecapEmptyView from "@/features/ai-recap/components/AiRecapEmptyView";
import AiRecapViewSkeleton from "@/features/ai-recap/components/AiRecapViewSkeleton";
import TodayRecapDetail from "@/features/ai-recap/components/TodayRecapDetail";
import TodayRecapSection from "@/features/ai-recap/components/TodayRecapSection";
import TodayTopicsSection from "@/features/ai-recap/components/TodayTopicsSection";
import { useSettingStore } from "@/stores";
import { formatDate } from "@/utils/date";

const AiRecapView = () => {
  const selectedDate = useSettingStore((state) => state.selectedDate);
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
      <TodayRecapSection {...data} />
      <TodayRecapDetail sections={data?.sections ?? []} />
      <Divider />
      <TodayTopicsSection topics={data?.topics ?? []} />
    </>
  );
};

export default AiRecapView;
