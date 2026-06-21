import { useSuspenseQuery } from "@tanstack/react-query";

import { useTimeZone } from "@/entities/language";
import { frequentlyVisitedSitesQueryOptions } from "@/features/analysis/api/analysis-query.client";

const useTopVisitedSiteList = (date: string) => {
  const timeZone = useTimeZone();
  const { data } = useSuspenseQuery(
    frequentlyVisitedSitesQueryOptions({
      date,
      limit: 10,
      timeZone,
    }),
  );

  return [...(data?.websiteAnalyses ?? [])]
    .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
    .slice(0, 10);
};

export { useTopVisitedSiteList };
