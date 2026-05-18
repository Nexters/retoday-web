"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Trans, useLocale } from "@recap/i18n";
import { Badge, cn } from "@recap/ui";

import { useGetAnalysisCategoryAnalysis } from "@/features/analysis/api/analysis-query";
import BubbleCloudFalling, {
  type BubbleDatum,
} from "@/features/analysis/ui/BubbleCloud";
import { formatSecondsToMinutes } from "@/shared/lib/date/format-date";

type CategoryWebsite = {
  domain: string;
  faviconUrl: string | null;
  stayDuration: number;
};

type CategoryItem = {
  categoryName: string;
  stayDuration: number;
  websiteAnalyses: CategoryWebsite[];
};

const COLS = 2;

const pickTopCategory = (list: CategoryItem[]) => {
  if (list.length === 0) return null;
  return [...list].sort(
    (a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0),
  )[0]!;
};

const CategoryAnalysis = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");

  const { data, isLoading } = useGetAnalysisCategoryAnalysis(date);

  const served = useMemo(() => {
    const categories: CategoryItem[] = data?.data?.categoryAnalyses ?? [];
    const sorted = [...categories].sort(
      (a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0),
    );

    const total = sorted.reduce((acc, c) => acc + (c.stayDuration ?? 0), 0);
    const top = pickTopCategory(sorted);

    return { categories: sorted, total, top };
  }, [data]);

  const [selectedCategory, setSelectedCategory] = useState<string>("__ALL__");

  const activeCategory = useMemo(() => {
    if (selectedCategory === "__ALL__") return null;
    return (
      served.categories.find((c) => c.categoryName === selectedCategory) ?? null
    );
  }, [selectedCategory, served.categories]);

  const listRows = useMemo(() => {
    const base = activeCategory ? [activeCategory] : served.categories;
    return base;
  }, [activeCategory, served.categories]);

  const bubbleData = useMemo<BubbleDatum[]>(() => {
    const top = served.categories.slice(0, 5);
    const total = served.total || 0;

    const bubbles: BubbleDatum[] = top.map((c, idx) => {
      const ratio = total > 0 ? c.stayDuration / total : 0;
      const pct = Math.round(ratio * 100);

      const radius = 70 + Math.round(ratio * 60);
      const mass = 1.1 + ratio * 1.4;

      return {
        id: `cat-${idx}-${c.categoryName}`,
        title: c.categoryName,
        subtitle: `${pct}%`,
        radius,
        mass,
        tone: idx < 2 ? "primary" : "muted",
      };
    });

    bubbles.push(
      { id: "tiny-1", radius: 28, mass: 0.55, tone: "tiny" },
      { id: "tiny-2", radius: 22, mass: 0.45, tone: "tiny" },
      { id: "tiny-3", radius: 32, mass: 0.6, tone: "tiny" },
    );

    return bubbles;
  }, [served.categories, served.total]);

  const isEmpty = !isLoading && served.categories.length === 0;

  const headerText = useMemo(() => {
    if (isLoading) return { category: "-", duration: "-" };
    if (!served.top) return { category: "-", duration: "-" };

    return {
      category: served.top.categoryName,
      duration: formatSecondsToMinutes(served.top.stayDuration, tc),
    };
  }, [isLoading, served.top, tc]);

  const isSingle = listRows.length === 1;

  return (
    <div className="flex rounded-[1.25rem] bg-white">
      <div className="w-full p-5 md:p-6 xl:p-10">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          {t("category.title")}
        </h2>

        <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
          <Trans
            ns="analysis"
            i18nKey="category.shoppingFocusSummary"
            values={{
              category: headerText.category,
              time_spent: headerText.duration,
            }}
            components={{
              category: <span className="text-blue-400" />,
              time: <span className="text-blue-400" />,
            }}
          />
        </h3>

        <BubbleCloudFalling data={bubbleData} />

        <div className="mt-9 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          <Badge
            variant={selectedCategory === "__ALL__" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory("__ALL__")}
          >
            {t("category.filterAll")}
          </Badge>

          {served.categories.map((c) => (
            <Badge
              key={c.categoryName}
              variant={
                selectedCategory === c.categoryName ? "default" : "secondary"
              }
              className="cursor-pointer"
              onClick={() => setSelectedCategory(c.categoryName)}
            >
              {c.categoryName}
            </Badge>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-8 md:grid-cols-2">
          {isEmpty ? (
            <div className="text-body-1 text-gray-500">
              {t("category.emptyState")}
            </div>
          ) : (
            listRows.map((row, idx) => {
              const hasItemBelow = idx + COLS < listRows.length;

              const topSites = [...(row.websiteAnalyses ?? [])]
                .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
                .slice(0, 5);

              return (
                <div
                  key={`${row.categoryName}-${idx}`}
                  className={cn(
                    "flex items-center justify-between py-4",
                    isSingle && "md:col-span-2",
                    hasItemBelow && "border-b border-gray-200",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex size-4.5 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                      {idx + 1}
                    </div>

                    <p className="text-subtitle-1-sb truncate text-gray-900">
                      {row.categoryName}
                    </p>
                    <p className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
                      {formatSecondsToMinutes(row.stayDuration, tc)}
                    </p>
                  </div>

                  <div className="ml-2 flex shrink-0 items-center">
                    {topSites.map((site, sIdx) => (
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
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;

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
