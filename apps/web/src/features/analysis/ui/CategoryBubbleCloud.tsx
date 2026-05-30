"use client";

import { useMemo } from "react";
import type { AnalysisCategoryData } from "@recap/api";
import { useLocale } from "@recap/i18n";

import { toCategoryBubbleData } from "@/features/analysis/model/category-bubble-data";
import BubbleCloudFalling from "@/shared/ui/BubbleCloud";

type CategoryBubbleCloudProps = {
  categories: AnalysisCategoryData["categoryAnalyses"];
};

const CategoryBubbleCloud = ({ categories }: CategoryBubbleCloudProps) => {
  const { t } = useLocale("analysis");
  const bubbleData = useMemo(
    () => toCategoryBubbleData(categories, t),
    [categories],
  );

  return <BubbleCloudFalling data={bubbleData} />;
};

export default CategoryBubbleCloud;
