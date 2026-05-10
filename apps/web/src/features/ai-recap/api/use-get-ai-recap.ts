import { useQuery } from "@tanstack/react-query";

import {
  hasRecapContent,
  normalizeRecap,
} from "@/features/ai-recap/lib/recap-mapper";

import { recapAPIService } from "../api";

type UseRecapOptions = {
  enabled?: boolean;
};

export const useRecap = (date: string, options: UseRecapOptions = {}) => {
  const query = useQuery({
    queryKey: ["generateRecap", date],
    queryFn: () => recapAPIService.getRecap({ date }),
    enabled: options.enabled,
  });

  const rawRecap = query.data?.data ?? null;

  const recap =
    rawRecap && hasRecapContent(rawRecap)
      ? normalizeRecap(rawRecap, date)
      : null;

  return {
    ...query,
    recap,
    hasRecap: Boolean(recap),
  };
};
