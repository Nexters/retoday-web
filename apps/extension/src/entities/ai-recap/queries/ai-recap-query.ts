import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { aiRecapAPIService } from "@/entities/ai-recap/api";
import type { AiRecapResponse } from "@/entities/ai-recap/model/ai-recap.type";
import { AI_RECAP_KEYS } from "@/entities/ai-recap/queries/query-key.const";

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
