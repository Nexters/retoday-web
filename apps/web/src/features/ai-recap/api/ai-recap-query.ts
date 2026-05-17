import { useQuery } from "@recap/react-query";

import { recapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-key.const";
import {
  hasRecapContent,
  normalizeRecap,
} from "@/features/ai-recap/lib/recap-mapper";

type UseGetAiRecapOptions = {
  enabled?: boolean;
};

export const useGetAiRecap = (
  date: string,
  options: UseGetAiRecapOptions = {},
) => {
  const query = useQuery({
    queryKey: AI_RECAP_KEYS.detail(["ai-recap", date]),
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
