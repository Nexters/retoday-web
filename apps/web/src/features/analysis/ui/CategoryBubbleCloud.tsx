"use client";

import { useMemo } from "react";
import type { AnalysisCategoryData } from "@recap/api";

import { toCategoryBubbleData } from "@/features/analysis/model/category-bubble-data";
import BubbleCloudFalling from "@/shared/ui/BubbleCloud";

type CategoryBubbleCloudProps = {
  categories: AnalysisCategoryData["categoryAnalyses"];
};

const CategoryBubbleCloud = ({ categories }: CategoryBubbleCloudProps) => {
  const bubbleData = useMemo(
    () => toCategoryBubbleData(categories),
    [categories],
  );

  return <BubbleCloudFalling data={bubbleData} />;
};

export default CategoryBubbleCloud;
