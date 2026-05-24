"use client";

import { useMemo } from "react";
import type { WorkPatternDayType } from "@recap/api";
import { useLocale } from "@recap/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ItemGroup,
} from "@recap/ui";

import { getMockWorkPatternData } from "@/features/analysis/model/mock/analysis-query-ui-mock";
import WorkPatternRow from "@/features/analysis/ui/WorkPatternRow";

type WorkPatternItem = {
  key: WorkPatternDayType;
  pattern: WorkPatternDayType;
  value: number;
};

const ITEMS_META: Array<{
  key: WorkPatternDayType;
  pattern: WorkPatternDayType;
}> = [
  { key: "MORNING", pattern: "MORNING" },
  { key: "DAYTIME", pattern: "DAYTIME" },
  { key: "EVENING", pattern: "EVENING" },
  { key: "DAWN", pattern: "DAWN" },
];

const WorkPattern = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  //const { data, isLoading, isError } = useGetWorkPattern(date);
  const data = getMockWorkPatternData(date);

  const served = useMemo(() => {
    const counts = data?.counts ?? {};

    const values = Object.values(counts).filter(
      (v): v is number => typeof v === "number" && Number.isFinite(v) && v > 0,
    );

    const total = values.reduce((a, b) => a + b, 0);

    const items: WorkPatternItem[] = ITEMS_META.map(({ key, pattern }) => {
      const raw =
        (counts as Partial<Record<WorkPatternDayType, number>>)[key] ?? 0;

      const normalized = raw <= 1 ? raw : total > 0 ? raw / total : 0;

      return { key, pattern, value: normalized };
    });

    const best = items.reduce((prev, cur) =>
      cur.value > prev.value ? cur : prev,
    );

    const labelMap: Record<WorkPatternDayType, string> = {
      DAWN: t("workPattern.labelDawn"),
      MORNING: t("workPattern.labelMorning"),
      DAYTIME: t("workPattern.labelDaytime"),
      EVENING: t("workPattern.labelEvening"),
    };

    const title = total <= 0 ? "-" : labelMap[best.key];

    return {
      isEmpty: total <= 0,
      title,
      items,
    };
  }, [data, t]);

  return (
    <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
      <CardHeader className="gap-0 p-0">
        <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
          {t("workPattern.title")}
        </CardTitle>

        <CardDescription className="text-title-1 m-0 mt-2 whitespace-nowrap text-gray-900">
          {served.isEmpty ? "-" : served.title}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-6 p-0 md:mt-7 xl:mt-8">
        <ItemGroup className="gap-4 md:gap-5">
          {served.items.map((it) => (
            <WorkPatternRow key={it.key} pattern={it.key} value={it.value} />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default WorkPattern;
