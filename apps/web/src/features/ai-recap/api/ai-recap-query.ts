import { useQuery } from "@recap/react-query";

import { recapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
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
    queryFn: async () => {
      const envelope = await recapAPIService.getRecap({ date });
      return envelope.data;
    },
    enabled: options.enabled,
    select: (data) =>
      data && hasRecapContent(data) ? normalizeRecap(data, date) : null,
  });

  return {
    ...query,
    hasRecap: Boolean(query.data),
  };
};
