"use client";

import { useMemo } from "react";
import type { CategoryAnalysisItem } from "@recap/api";
import { toCategoryBubbleData } from "@recap/features";
import { useLocale } from "@recap/i18n";

import BubbleCloudFalling from "@/shared/ui/BubbleCloud";

type CategoryBubbleCloudProps = {
  categories: CategoryAnalysisItem[];
};

const CategoryBubbleCloud = ({ categories }: CategoryBubbleCloudProps) => {
  const { t } = useLocale("analysis");
  const bubbleData = useMemo(
    () => toCategoryBubbleData(categories, t),
    [categories, t],
  );

  return <BubbleCloudFalling data={bubbleData} />;
};

export default CategoryBubbleCloud;
