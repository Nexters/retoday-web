import { CATEGORY_LABEL_KEYS, toCategoryAnalysisState } from "@recap/features";
import { useLocale } from "@recap/i18n";
import { formatDate, formatDuration } from "@recap/lib";

import { useGetAnalysisCategory } from "@/features/analysis/api/analysis-query";
import CategoryAnalysisItem from "@/features/analysis/ui/category-analysis/CategoryAnalysisItem";
import CategoryBubbleCloud from "@/features/analysis/ui/category-analysis/CategoryBubbleCloud";
import CategoryTitle from "@/features/analysis/ui/category-analysis/CategoryTitle";
import CategoryAnalysisSectionSkeleton from "@/features/analysis/ui/CategoryAnalysisSectionSkeleton";
import { DATE_FORMAT } from "@/shared/config/date-format.const";
import { CURRENT_LOCATION } from "@/shared/config/location";
import Divider from "@/shared/ui/Divider";
import { useDateSelectorStore } from "@/widgets/date-selector/model";

const CategoryAnalysisSection = () => {
  const selectedDate = useDateSelectorStore((state) => state.selectedDate);
  const { t } = useLocale("analysis");
  const date = formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH);

  const { data, isLoading } = useGetAnalysisCategory(
    { date, timeZone: CURRENT_LOCATION },
    { select: toCategoryAnalysisState },
  );

  const categories = data?.categories ?? [];

  if (isLoading) {
    return <CategoryAnalysisSectionSkeleton />;
  }

  const topCategory = categories[0];

  return (
    <div className="bg-white pt-8 px-5 pb-11">
      <CategoryTitle
        categoryName={
          topCategory ? t(CATEGORY_LABEL_KEYS[topCategory.category]) : "-"
        }
        time={topCategory ? formatDuration(topCategory.stayDuration, t) : "-"}
      />

      <div className="mt-6">
        <CategoryBubbleCloud categories={categories} />
      </div>

      <div className="mt-4">
        {categories.map((item, idx) => (
          <div key={item.category}>
            <CategoryAnalysisItem count={idx + 1} {...item} />
            {idx !== categories.length - 1 && <Divider className="h-0.5" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAnalysisSection;
