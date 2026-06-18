import type { Envelope, RecapData } from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";
import { queryOptions } from "@tanstack/react-query";

import { recapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";

type AiRecapResponse = Envelope<RecapData>;
type AiRecapQueryKey = ReturnType<typeof AI_RECAP_KEYS.detail>;

type UseGetAiRecapOptions<TData = AiRecapResponse> = Omit<
  UseQueryOptions<AiRecapResponse, Error, TData, AiRecapQueryKey>,
  "queryKey" | "queryFn" | "retry"
>;

const aiRecapQueryOptions = (date: string) =>
  queryOptions<AiRecapResponse, Error, AiRecapResponse, AiRecapQueryKey>({
    queryKey: AI_RECAP_KEYS.detail([date]),
    queryFn: () => recapAPIService.getRecap({ date }),
    retry: false,
  });

const useGetAiRecap = <TData = AiRecapResponse>(
  date: string,
  options: UseGetAiRecapOptions<TData> = {},
) => {
  return useQuery<AiRecapResponse, Error, TData, AiRecapQueryKey>({
    ...(aiRecapQueryOptions(date) as UseQueryOptions<
      AiRecapResponse,
      Error,
      TData,
      AiRecapQueryKey
    >),
    ...options,
  });
};

export { aiRecapQueryOptions, useGetAiRecap };
