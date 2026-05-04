import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { aiRecapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-key.const";
import type { AiRecapResponse } from "@/features/ai-recap/model/ai-recap.type";

const useGetAiRecap = <TData = AiRecapResponse>(
  date: string,
  options?: Omit<
    UseQueryOptions<AiRecapResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AiRecapResponse, Error, TData>({
    queryKey: AI_RECAP_KEYS.detail(["ai-recap", date]),
    queryFn: async () => {
      const response = await aiRecapAPIService.getAiRecap(date);
      return response as AiRecapResponse;
    },
    ...options,
  });
};

export { useGetAiRecap };
