import type { RecapData } from "@recap/api";
import { formatDate } from "@recap/lib";

import { useGetAiRecap } from "@/features/ai-recap/api/ai-recap-query";
import { hasRecapContent } from "@/features/ai-recap/lib/recap-mapper";
import {
  AiRecapEmptyView,
  AiRecapViewSkeleton,
  TodayRecapDetail,
  TodayRecapSection,
  TodayTopicsSection,
} from "@/features/ai-recap/ui";
import { DATE_FORMAT } from "@/shared/config";
import { Divider } from "@/shared/ui";
import { useDateSelectorStore } from "@/widgets/date-selector/model";

const AiRecapContent = () => {
  const selectedDate = useDateSelectorStore((state) => state.selectedDate);

  const {
    data: recap,
    isError,
    isLoading,
  } = useGetAiRecap(formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH), {
    select: (data): RecapData | null =>
      data && hasRecapContent(data) ? data : null,
    retry: false,
  });

  if (isLoading) {
    return <AiRecapViewSkeleton />;
  }
  if (isError || !recap) {
    return <AiRecapEmptyView />;
  }

  return (
    <>
      <TodayRecapSection recap={recap} />
      <TodayRecapDetail sections={recap.sections ?? []} />
      <Divider />
      <TodayTopicsSection topics={recap.topics ?? []} />
    </>
  );
};

export default AiRecapContent;
