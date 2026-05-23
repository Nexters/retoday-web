import type { RecapData } from "@recap/api";
import { useQuery } from "@recap/react-query";

import { recapAPIService } from "@/features/ai-recap/api";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";

const useGetAiRecap = (date: string) => {
  return useQuery<RecapData>({
    queryKey: AI_RECAP_KEYS.detail(["ai-recap", date]),
    queryFn: async () => {
      const envelope = await recapAPIService.getRecap({ date });
      return envelope.data;
    },
  });
};

export { useGetAiRecap };
