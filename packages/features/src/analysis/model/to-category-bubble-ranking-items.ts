import type { CategoryAnalysisItem } from "@recap/api";

import type {
  CategoryBubbleRankingItem,
  CategoryBubbleRankingItems,
  CategoryBubbleTranslateFn,
} from "./category-bubble.type";
import { toCategoryBubbleData } from "./to-category-bubble-data";

const EMPTY_RANKING_ITEM: CategoryBubbleRankingItem = {
  label: "-",
  description: "-",
};

export const toCategoryBubbleRankingItems = (
  categories: CategoryAnalysisItem[],
  t: CategoryBubbleTranslateFn,
): CategoryBubbleRankingItems => {
  const items: CategoryBubbleRankingItem[] = toCategoryBubbleData(categories, t)
    .filter((bubble) => bubble.tone !== "tiny")
    .slice(0, 5)
    .map((bubble) => ({
      label: bubble.title ?? "-",
      description: bubble.subtitle,
    }));

  while (items.length < 5) {
    items.push(EMPTY_RANKING_ITEM);
  }

  return items as CategoryBubbleRankingItems;
};
