"use client";

import type { AnalysisCategoryData } from "@recap/api";
import { Trans, useLocale } from "@recap/i18n";
import { CardDescription, CardHeader, CardTitle } from "@recap/ui";

import { CATEGORY_LABEL } from "@/features/analysis/config/category.const";
import { formatSecondsToMinutes } from "@/shared/lib/date/format-date";

type CategoryHeaderProps = {
  categories: AnalysisCategoryData["categoryAnalyses"];
};

const CategoryHeader = ({ categories }: CategoryHeaderProps) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");

  const topCategory = categories?.[0];

  return (
    <CardHeader className="gap-0 p-0">
      <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
        {t("category.title")}
      </CardTitle>

      <CardDescription className="text-title-1 m-0 mt-2 text-gray-900">
        <Trans
          ns="analysis"
          i18nKey="category.shoppingFocusSummary"
          values={{
            category: topCategory?.category
              ? t(CATEGORY_LABEL[topCategory.category])
              : "-",
            time_spent: topCategory
              ? formatSecondsToMinutes(topCategory.stayDuration, tc)
              : "-",
          }}
          components={{
            category: <span className="text-blue-400" />,
            time: <span className="text-blue-400" />,
          }}
        />
      </CardDescription>
    </CardHeader>
  );
};

export default CategoryHeader;
