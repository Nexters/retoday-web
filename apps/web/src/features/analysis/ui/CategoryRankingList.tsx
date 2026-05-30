"use client";

import { useMemo } from "react";
import Image from "next/image";
import type { AnalysisCategoryData } from "@recap/api";
import { useLocale } from "@recap/i18n";
import {
  cn,
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@recap/ui";

import { CATEGORY_LABEL } from "@/features/analysis/config/category.const";
import { ALL_CATEGORIES_TOGGLE_VALUE } from "@/features/analysis/ui/CategoryAnalysis";
import { formatSecondsToMinutes } from "@/shared/lib/date/format-date";

type CategoryRankingListProps = {
  selectedCategory: string | null;
  categories: AnalysisCategoryData["categoryAnalyses"];
};

const CategoryRankingList = ({
  selectedCategory,
  categories,
}: CategoryRankingListProps) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");

  const categoryList = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES_TOGGLE_VALUE)
      return categories.slice(0, 5);
    return [categories.find((c) => c.category === selectedCategory)];
  }, [selectedCategory, categories]);

  const isEmpty = categories.length === 0;
  const isSingle = categories.length === 1;

  return (
    <ItemGroup
      className={
        isEmpty ? "mt-5" : "mt-5 grid grid-cols-1 gap-x-8 md:grid-cols-2"
      }
      role={isEmpty ? undefined : "list"}
    >
      {isEmpty ? (
        <div className="text-body-1 text-gray-500">
          {t("category.emptyState")}
        </div>
      ) : (
        categoryList?.map((categoryItem, idx) => (
          <Item
            key={categoryItem?.category}
            role="listitem"
            className={cn(
              "min-w-0 flex-nowrap items-center justify-between gap-2 rounded-none border-0 bg-transparent p-0 py-4 shadow-none",
              isSingle && "md:col-span-2",
              "border-b border-gray-200",
            )}
          >
            <ItemContent className="min-w-0 flex-1 flex-row flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                {idx + 1}
              </span>

              <ItemTitle className="text-subtitle-1-sb truncate text-gray-900">
                {categoryItem ? t(CATEGORY_LABEL[categoryItem.category]) : "-"}
              </ItemTitle>
              <span className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
                {categoryItem?.stayDuration
                  ? formatSecondsToMinutes(categoryItem?.stayDuration, tc)
                  : "-"}
              </span>
            </ItemContent>

            <ItemActions className="ml-2 shrink-0 gap-0">
              {categoryItem?.websiteAnalyses.map((site, sIdx) => (
                <div
                  key={`${site.domain}-${sIdx}`}
                  className={cn(sIdx !== 0 && "-ml-1")}
                >
                  <SiteFaviconPill
                    domain={site.domain}
                    faviconUrl={site.faviconUrl}
                  />
                </div>
              ))}
            </ItemActions>
          </Item>
        ))
      )}
    </ItemGroup>
  );
};

export default CategoryRankingList;

function SiteFaviconPill({
  domain,
  faviconUrl,
}: {
  domain: string;
  faviconUrl: string | null;
}) {
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white ring-2 ring-white"
      title={domain}
    >
      {faviconUrl ? (
        <Image
          src={faviconUrl}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-5 w-5 object-contain"
        />
      ) : null}
    </div>
  );
}
