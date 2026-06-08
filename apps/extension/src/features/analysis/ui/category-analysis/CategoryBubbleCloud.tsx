import { useMemo } from "react";
import type { CategoryAnalysisItem } from "@recap/api";
import { toCategoryBubbleRankingItems } from "@recap/features";
import { useLocale } from "@recap/i18n";

import { BubbleRanking } from "@/shared/ui";

type CategoryBubbleCloudProps = {
  categories: CategoryAnalysisItem[];
  height?: number;
};

const CategoryBubbleCloud = ({
  categories,
  height = 230,
}: CategoryBubbleCloudProps) => {
  const { t } = useLocale("analysis");
  const items = useMemo(
    () => toCategoryBubbleRankingItems(categories, t),
    [categories, t],
  );

  return <BubbleRanking items={items} height={height} />;
};

export default CategoryBubbleCloud;
