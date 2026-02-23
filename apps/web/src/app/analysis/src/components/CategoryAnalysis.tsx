"use client";

import { useMemo, useState } from "react";
import { Badge, cn } from "@recap/ui";
import { useQuery } from "@tanstack/react-query";

import BubbleCloudFalling, {
  type BubbleDatum,
} from "@/app/analysis/src/components/BubbleCloud";
import { analysisAPIService } from "@/app/analysis/src/service";

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

const formatMinutesFromSeconds = (seconds: number) => {
  const minutes = Math.max(0, Math.round(seconds / 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h <= 0) return `${m}분`;
  if (m <= 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

const pickTopCategory = (list: CategoryItem[]) => {
  if (list.length === 0) return null;
  return [...list].sort(
    (a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0),
  )[0]!;
};

const CategoryAnalysis = ({ date }: { date: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryAnalysis", date],
    queryFn: () => analysisAPIService.getCategoryAnalysis({ date }),
  });

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
      duration: formatMinutesFromSeconds(served.top.stayDuration),
    };
  }, [isLoading, served.top]);

  const isSingle = listRows.length === 1;

  return (
    <div className="flex rounded-[1.25rem] bg-white">
      <div className="w-full p-10">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          카테고리별 분석
        </h2>

        <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
          <span className="text-blue-400">{headerText.category}</span>에{" "}
          <span className="text-blue-400">{headerText.duration}</span>{" "}
          몰두했어요
        </h3>

        <BubbleCloudFalling data={bubbleData} />

        <div className="mt-9 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          <Badge
            variant={selectedCategory === "__ALL__" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory("__ALL__")}
          >
            전체
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

        <div className="mt-5 grid grid-cols-2 gap-x-8">
          {isEmpty ? (
            <div className="text-body-1 text-gray-500">
              분석 데이터가 없어요
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
                    isSingle && "col-span-2",
                    hasItemBelow && "border-b border-gray-200",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-4.5 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                      {idx + 1}
                    </div>

                    <p className="text-subtitle-1-sb text-gray-900">
                      {row.categoryName}
                    </p>
                    <p className="text-subtitle-2-rg text-gray-800">
                      {formatMinutesFromSeconds(row.stayDuration)}
                    </p>
                  </div>

                  <div className="flex items-center">
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
        <img
          src={faviconUrl}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-5 w-5 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
    </div>
  );
}
