import { useMemo } from "react";

import { useSettingStore } from "@/app/store/model";
import { useGetAnalysisCategoryAnalysis } from "@/features/analysis/api/analysis-query";
import BubbleRanking from "@/features/analysis/ui/category-analysis/BubbleRanking";
import CategoryAnalysisItem from "@/features/analysis/ui/category-analysis/CategoryAnalysisItem";
import CategoryTitle from "@/features/analysis/ui/category-analysis/CategoryTitle";
import CategoryAnalysisSectionSkeleton from "@/features/analysis/ui/CategoryAnalysisSectionSkeleton";
import { DATE_FORMAT } from "@/shared/config/date-format.const";
import { formatDate, formatDuration } from "@/shared/lib/date/date";
import Divider from "@/shared/ui/Divider";

const CategoryAnalysisSection = () => {
  const selectedDate = useSettingStore((state) => state.selectedDate);
  const { data, isLoading } = useGetAnalysisCategoryAnalysis(
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
  );

  const sortedCategoryAnalyses = useMemo(() => {
    return [...(data?.categoryAnalyses ?? [])]
      .sort((a, b) => b.stayDuration - a.stayDuration)
      .map((item) => ({
        label: item.categoryName,
        description: formatDuration(item.stayDuration),
      }));
  }, [data]);

  if (isLoading) {
    return <CategoryAnalysisSectionSkeleton />;
  }
  return (
    <div className="bg-white pt-8 px-5 pb-11">
      <CategoryTitle
        categoryName={sortedCategoryAnalyses?.[0]?.label ?? "-"}
        time={sortedCategoryAnalyses?.[0]?.description ?? "-"}
      />

      <div className="mt-6">
        <BubbleRanking items={sortedCategoryAnalyses} height={230} />
      </div>

      <div className="mt-4">
        {data?.categoryAnalyses.map((item, idx) => (
          <>
            <CategoryAnalysisItem key={idx} count={idx + 1} {...item} />
            {idx !== data?.categoryAnalyses.length - 1 && (
              <Divider className="h-0.5" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoryAnalysisSection;
