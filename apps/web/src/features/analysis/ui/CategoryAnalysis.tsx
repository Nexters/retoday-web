"use client";

import { useState } from "react";
import { useLocale } from "@recap/i18n";
import { Card, CardContent } from "@recap/ui";

import { CATEGORY_LABEL } from "@/features/analysis/config/category.const";
import { useCategoryAnalysis } from "@/features/analysis/model/use-category-analysis";
import CategoryBubbleCloud from "@/features/analysis/ui/CategoryBubbleCloud";
import CategoryHeader from "@/features/analysis/ui/CategoryHeader";
import CategoryRankingList from "@/features/analysis/ui/CategoryRankingList";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui";

export const ALL_CATEGORIES_TOGGLE_VALUE = "__ALL__";

const CategoryAnalysis = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");

  const { data } = useCategoryAnalysis(date);

  const [selectedCategory, setSelectedCategory] = useState(
    ALL_CATEGORIES_TOGGLE_VALUE,
  );

  return (
    <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
      <CategoryHeader categories={data?.categories ?? []} />

      <CardContent className="p-0">
        <CategoryBubbleCloud categories={data?.categories ?? []} />

        <ToggleGroup<string>
          type="single"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mt-9 flex min-w-0 flex-wrap gap-2"
        >
          <ToggleGroupItem value={ALL_CATEGORIES_TOGGLE_VALUE}>
            {t("category.filterAll")}
          </ToggleGroupItem>

          {data?.categories.map((c) => (
            <ToggleGroupItem key={c.category} value={c.category}>
              {t(CATEGORY_LABEL[c.category])}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <CategoryRankingList
          selectedCategory={selectedCategory ?? null}
          categories={data?.categories ?? []}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryAnalysis;
