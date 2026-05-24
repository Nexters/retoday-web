import type { AnalysisCategoryData } from "@recap/api";

import type { BubbleDatum } from "@/shared/ui/BubbleCloud";

const TINY_BUBBLES: BubbleDatum[] = [
  { id: "tiny-1", radius: 28, mass: 0.55, tone: "tiny" },
  { id: "tiny-2", radius: 22, mass: 0.45, tone: "tiny" },
  { id: "tiny-3", radius: 32, mass: 0.6, tone: "tiny" },
];

export const toCategoryBubbleData = (
  categories: AnalysisCategoryData["categoryAnalyses"],
): BubbleDatum[] => {
  const top = categories.slice(0, 5);
  const total = categories.reduce((acc, c) => acc + (c.stayDuration ?? 0), 0);

  const bubbles = top.map((category, idx) => {
    const ratio = total > 0 ? category.stayDuration / total : 0;
    const pct = Math.round(ratio * 100);

    return {
      id: `cat-${idx}-${category.categoryName}`,
      title: category.categoryName,
      subtitle: `${pct}%`,
      radius: 70 + Math.round(ratio * 60),
      mass: 1.1 + ratio * 1.4,
      tone: idx < 2 ? ("primary" as const) : ("muted" as const),
    };
  });

  return [...bubbles, ...TINY_BUBBLES];
};
