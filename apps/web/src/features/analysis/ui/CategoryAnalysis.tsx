"use client";

import { useState } from "react";
import { toCategoryAnalysisState } from "@recap/features";
import { useLocale } from "@recap/i18n";
import { CURRENT_TIMEZONE } from "@recap/lib";
import { Card, CardContent } from "@recap/ui";

import { useGetAnalysisCategory } from "@/features/analysis/api/analysis-query";
import { CATEGORY_LABEL } from "@/features/analysis/config/category.const";
import CategoryBubbleCloud from "@/features/analysis/ui/CategoryBubbleCloud";
import CategoryHeader from "@/features/analysis/ui/CategoryHeader";
import CategoryRankingList from "@/features/analysis/ui/CategoryRankingList";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui";

export const ALL_CATEGORIES_TOGGLE_VALUE = "__ALL__";

const CategoryAnalysis = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");

  const { data } = useGetAnalysisCategory(
    { date, timeZone: CURRENT_TIMEZONE },
    { select: toCategoryAnalysisState },
  );

  const categories = data?.categories ?? [];

  const [selectedCategory, setSelectedCategory] = useState(
    ALL_CATEGORIES_TOGGLE_VALUE,
  );

  return (
    <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
      <CategoryHeader categories={categories} />

      <CardContent className="p-0">
        <CategoryBubbleCloud categories={categories} />

        <ToggleGroup<string>
          type="single"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mt-9 flex min-w-0 flex-wrap gap-2"
        >
          <ToggleGroupItem value={ALL_CATEGORIES_TOGGLE_VALUE}>
            {t("category.filterAll")}
          </ToggleGroupItem>

          {categories.map((c) => (
            <ToggleGroupItem key={c.category} value={c.category}>
              {t(CATEGORY_LABEL[c.category])}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <CategoryRankingList
          selectedCategory={selectedCategory ?? null}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryAnalysis;
