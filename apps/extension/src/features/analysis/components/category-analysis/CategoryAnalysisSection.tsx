import Divider from "@/components/Divider";
import { DATE_FORMAT } from "@/const/date-format.const";
import { useGetAnalysisCategoryAnalysis } from "@/entities/analysis/queries/analysis-query";
import CategoryAnalysisItem from "@/features/analysis/components/category-analysis/CategoryAnalysisItem";
import CategoryTitle from "@/features/analysis/components/category-analysis/CategoryTitle";
import { formatDate } from "@/utils/date";

const CategoryAnalysisSection = ({ selectedDate }: { selectedDate: Date }) => {
  const { data } = useGetAnalysisCategoryAnalysis(
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
  );

  return (
    <div className="bg-white pt-8 px-5 pb-11">
      <CategoryTitle />

      <div className="mt-6 bg-blue-50 rounded-xl p-5">bouble chart</div>

      <div className="mt-4">
        {data?.categoryAnalyses.map((item, idx) => (
          <>
            <CategoryAnalysisItem key={idx} count={idx + 1} {...item} />
            <Divider className="h-0.5" />
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoryAnalysisSection;
