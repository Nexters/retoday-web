"use client";

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

import { useWorkPatternList } from "@/features/analysis/model/use-work-pattern-list";
import WorkPatternRow from "@/features/analysis/ui/WorkPatternRow";

const WORK_PATTERN_LABEL = {
  MORNING: "workPattern.labelMorning",
  DAYTIME: "workPattern.labelDaytime",
  EVENING: "workPattern.labelEvening",
  DAWN: "workPattern.labelDawn",
} as const satisfies Record<WorkPatternDayType, string>;

const WorkPattern = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  const { total, list, topPattern } = useWorkPatternList(date);
  const isEmpty = total <= 1;

  return (
    <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
      <CardHeader className="gap-0 p-0">
        <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
          {t("workPattern.title")}
        </CardTitle>

        <CardDescription className="text-title-1 m-0 mt-2 whitespace-nowrap text-gray-900">
          {isEmpty && topPattern?.pattern
            ? "-"
            : t(WORK_PATTERN_LABEL[topPattern?.pattern as WorkPatternDayType])}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-6 p-0 md:mt-7 xl:mt-8">
        <ItemGroup className="gap-4 md:gap-5">
          {list.map((it) => (
            <WorkPatternRow
              key={it.pattern}
              pattern={it.pattern}
              ratio={it.percentage}
            />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default WorkPattern;
