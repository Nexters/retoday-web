"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { analysisAPIService } from "@/app/analysis/src/service";
import type { WorkPatternDayType } from "@/app/analysis/src/service/schema/get-work-pattern.schema";
import AfterNoonIcon from "@/assets/icons/afternoon.svg";
import EveningIcon from "@/assets/icons/evening.svg";
import MorningIcon from "@/assets/icons/morning.svg";
import NightIcon from "@/assets/icons/night.svg";

type WorkPatternItem = {
  key: WorkPatternDayType;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
};

const ITEMS_META: Array<{
  key: WorkPatternDayType;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  { key: "MORNING", Icon: MorningIcon },
  { key: "DAYTIME", Icon: AfterNoonIcon },
  { key: "EVENING", Icon: EveningIcon },
  { key: "DAWN", Icon: NightIcon },
];

const WorkPattern = ({ date }: { date: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getWorkPattern", date],
    queryFn: () => analysisAPIService.getWorkPattern({ date }),
  });

  const served = useMemo(() => {
    const counts = data?.data?.counts ?? {};

    const values = Object.values(counts).filter(
      (v): v is number => typeof v === "number" && Number.isFinite(v) && v > 0,
    );

    const total = values.reduce((a, b) => a + b, 0);

    const items: WorkPatternItem[] = ITEMS_META.map(({ key, Icon }) => {
      const raw =
        (counts as Partial<Record<WorkPatternDayType, number>>)[key] ?? 0;

      const normalized = raw <= 1 ? raw : total > 0 ? raw / total : 0;

      return { key, Icon, value: normalized };
    });

    const best = items.reduce((prev, cur) =>
      cur.value > prev.value ? cur : prev,
    );

    const labelMap: Record<WorkPatternDayType, string> = {
      DAWN: "야행성 작업자",
      MORNING: "얼리버드 작업자",
      DAYTIME: "주간 작업자",
      EVENING: "저녁형 작업자",
    };

    const title = total <= 0 ? "-" : labelMap[best.key];

    return {
      isEmpty: total <= 0,
      title,
      items,
    };
  }, [data]);

  return (
    <div className="rounded-[1.25rem] bg-white p-10">
      <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
        내 작업 패턴
      </h2>

      <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
        {isLoading ? "-" : isError || served.isEmpty ? "-" : served.title}
      </h3>

      <div className="mt-8 flex flex-col gap-5">
        {served.items.map((it) => (
          <PatternRow key={it.key} Icon={it.Icon} value={it.value} />
        ))}
      </div>
    </div>
  );
};

export default WorkPattern;

const PatternRow = ({
  Icon,
  value,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
}) => {
  const clamped = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
  const pct = Math.round(clamped * 100);

  return (
    <div className="flex items-center gap-5">
      <div className="flex size-7 items-center justify-center">
        <Icon className="h-7 w-7" />
      </div>

      <div className="relative h-7 w-full overflow-hidden rounded-lg">
        <div
          className="bg-gradient-02 absolute inset-y-0 left-0"
          style={{
            width: `${pct}%`,
          }}
        />

        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: `${100 - pct}%`,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 8px)",
            backgroundColor: "rgba(234, 246, 251, 0.6)",
          }}
        />
      </div>
    </div>
  );
};
