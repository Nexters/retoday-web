import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { recapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";

type AiRecapQueryData = Awaited<
  ReturnType<typeof recapAPIService.getRecap>
>["data"];

type UseGetAiRecapOptions<TData = AiRecapQueryData> = Omit<
  UseQueryOptions<AiRecapQueryData, Error, TData>,
  "queryKey" | "queryFn"
>;

export const useGetAiRecap = <TData = AiRecapQueryData>(
  date: string,
  options: UseGetAiRecapOptions<TData> = {},
) => {
  return useQuery<AiRecapQueryData, Error, TData>({
    ...options,
    queryKey: AI_RECAP_KEYS.detail(["ai-recap", date]),
    queryFn: async () => {
      const envelope = await recapAPIService.getRecap({ date });
      return envelope.data;
    },
  });
};
