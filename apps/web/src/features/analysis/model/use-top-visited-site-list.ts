import { useSuspenseQuery } from "@tanstack/react-query";

import { frequentlyVisitedSitesQueryOptions } from "@/features/analysis/api/analysis-query.client";
import { CURRENT_LOCATION } from "@/shared/config/location";

const useTopVisitedSiteList = (date: string) => {
  const { data } = useSuspenseQuery(
    frequentlyVisitedSitesQueryOptions({
      date,
      limit: 10,
      timeZone: CURRENT_LOCATION,
    }),
  );

  return [...(data?.websiteAnalyses ?? [])]
    .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
    .slice(0, 10);
};

export { useTopVisitedSiteList };
