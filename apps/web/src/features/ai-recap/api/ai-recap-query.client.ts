import type { Envelope, GetRecapQueryType, RecapData } from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";
import { queryOptions } from "@tanstack/react-query";

import { recapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";

type AiRecapResponse = Envelope<RecapData | null>;
type AiRecapQueryKey = ReturnType<typeof AI_RECAP_KEYS.detail>;

type UseGetAiRecapOptions<TData = AiRecapResponse> = Omit<
  UseQueryOptions<AiRecapResponse, Error, TData, AiRecapQueryKey>,
  "queryKey" | "queryFn" | "retry"
>;

const aiRecapQueryOptions = (query: GetRecapQueryType) =>
  queryOptions<AiRecapResponse, Error, AiRecapResponse, AiRecapQueryKey>({
    queryKey: AI_RECAP_KEYS.detail([query.date, query.timeZone]),
    queryFn: () => recapAPIService.getRecap(query),
    retry: false,
  });

const useGetAiRecap = <TData = AiRecapResponse>(
  query: GetRecapQueryType,
  options: UseGetAiRecapOptions<TData> = {},
) => {
  return useQuery<AiRecapResponse, Error, TData, AiRecapQueryKey>({
    ...(aiRecapQueryOptions(query) as UseQueryOptions<
      AiRecapResponse,
      Error,
      TData,
      AiRecapQueryKey
    >),
    ...options,
  });
};

export { aiRecapQueryOptions, useGetAiRecap };
