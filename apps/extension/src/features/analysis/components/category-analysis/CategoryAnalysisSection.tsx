import { useMemo } from "react";

import Divider from "@/components/Divider";
import { DATE_FORMAT } from "@/const/date-format.const";
import { useGetAnalysisCategoryAnalysis } from "@/entities/analysis/queries/analysis-query";
import BubbleCloud from "@/features/analysis/components/category-analysis/BubbleCloud";
import CategoryAnalysisItem from "@/features/analysis/components/category-analysis/CategoryAnalysisItem";
import CategoryTitle from "@/features/analysis/components/category-analysis/CategoryTitle";
import { formatDate } from "@/utils/date";

const CategoryAnalysisSection = ({ selectedDate }: { selectedDate: Date }) => {
  const { data } = useGetAnalysisCategoryAnalysis(
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
  );

  const sortedCategoryAnalyses = useMemo(() => {
    return [...(data?.categoryAnalyses ?? [])].sort(
      (a, b) => b.stayDuration - a.stayDuration,
    );
  }, [data]);

  const [maxStayDurationCategory] = sortedCategoryAnalyses;

  // 더미 데이터
  const bubbleData = useMemo(
    () => [
      // 큰 버블(아래) 2개 - 간격 넓히기
      {
        id: "bigLeft",
        title: "쇼핑",
        subtitle: "3시간",
        radius: 92,
        tone: "primary" as const,
        x: 150,
        y: 175,
      },
      {
        id: "bigRight",
        title: "쇼핑",
        subtitle: "3시간",
        radius: 104,
        tone: "primary" as const,
        x: 360,
        y: 178,
      },

      // 위쪽 키워드 3개 - 간격 넓히기
      {
        id: "kw1",
        title: "키워드",
        subtitle: "3시간",
        radius: 56,
        tone: "muted" as const,
        x: 100,
        y: 70,
      },
      {
        id: "kw2",
        title: "키워드",
        subtitle: "3시간",
        radius: 62,
        tone: "muted" as const,
        x: 250,
        y: 60,
      },
      {
        id: "kw3",
        title: "키워드",
        subtitle: "3시간",
        radius: 58,
        tone: "muted" as const,
        x: 400,
        y: 68,
      },

      // 작은 점 버블들 - 간격 조정
      { id: "s1", radius: 12, tone: "tiny" as const, x: 60, y: 130 },
      { id: "s2", radius: 10, tone: "tiny" as const, x: 280, y: 100 },
      { id: "s3", radius: 14, tone: "tiny" as const, x: 450, y: 120 },
      { id: "s4", radius: 16, tone: "tiny" as const, x: 480, y: 165 },
      { id: "s5", radius: 10, tone: "tiny" as const, x: 220, y: 220 },
    ],
    [],
  );

  return (
    <div className="bg-white pt-8 px-5 pb-11">
      <CategoryTitle
        categoryName={maxStayDurationCategory?.categoryName ?? ""}
        stayDuration={maxStayDurationCategory?.stayDuration ?? 0}
      />

      <div className="mt-6">
        <BubbleCloud data={bubbleData} />
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
