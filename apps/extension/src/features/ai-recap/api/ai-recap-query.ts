import type { GetRecapQueryType, RecapData } from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { recapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";

type AiRecapQueryData = RecapData | null;

type UseGetAiRecapOptions<TData = AiRecapQueryData> = Omit<
  UseQueryOptions<AiRecapQueryData, Error, TData>,
  "queryKey" | "queryFn"
>;

export const useGetAiRecap = <TData = AiRecapQueryData>(
  query: GetRecapQueryType,
  options: UseGetAiRecapOptions<TData> = {},
) => {
  return useQuery<AiRecapQueryData, Error, TData>({
    ...options,
    queryKey: AI_RECAP_KEYS.detail([query.date, query.timeZone]),
    queryFn: async () => {
      const envelope = await recapAPIService.getRecap(query);
      return envelope.data;
    },
  });
};
