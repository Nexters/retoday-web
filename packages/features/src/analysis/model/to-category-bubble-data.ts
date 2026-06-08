import type { CategoryAnalysisItem } from "@recap/api";

import { CATEGORY_LABEL_KEYS } from "../config/category.const";

import type {
  CategoryBubbleDatum,
  CategoryBubbleTranslateFn,
} from "./category-bubble.type";

const TINY_BUBBLES: CategoryBubbleDatum[] = [
  { id: "tiny-1", radius: 28, mass: 0.55, tone: "tiny" },
  { id: "tiny-2", radius: 22, mass: 0.45, tone: "tiny" },
  { id: "tiny-3", radius: 32, mass: 0.6, tone: "tiny" },
];

export const toCategoryBubbleData = (
  categories: CategoryAnalysisItem[],
  t: CategoryBubbleTranslateFn,
): CategoryBubbleDatum[] => {
  const top = categories.slice(0, 5);
  const total = categories.reduce(
    (acc, category) => acc + category.stayDuration,
    0,
  );

  const bubbles = top.map((category, idx) => {
    const ratio = total > 0 ? category.stayDuration / total : 0;
    const pct = Math.round(ratio * 100);

    return {
      id: `cat-${idx}-${category.category}`,
      title: t(CATEGORY_LABEL_KEYS[category.category]),
      subtitle: `${pct}%`,
      radius: 70 + Math.round(ratio * 60),
      mass: 1.1 + ratio * 1.4,
      tone: idx < 2 ? ("primary" as const) : ("muted" as const),
    };
  });

  return [...bubbles, ...TINY_BUBBLES];
};
