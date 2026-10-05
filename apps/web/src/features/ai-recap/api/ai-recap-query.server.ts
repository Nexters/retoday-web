import type { Envelope, GetRecapQueryType, RecapData } from "@recap/api";
import { RecapAPIService } from "@recap/api";
import { type FetchQueryOptions, queryOptions } from "@tanstack/react-query";

import { createServerAuthedRestAPI } from "@/entities/auth/lib/create-server-authed-rest";

import { AI_RECAP_KEYS } from "./query-keys";

type AiRecapResponse = Envelope<RecapData | null>;
type AiRecapQueryKey = ReturnType<typeof AI_RECAP_KEYS.detail>;

const serverRecapAPIService = new RecapAPIService(
  createServerAuthedRestAPI(undefined, { apiBaseURL: "v1" }),
);

export const serverAiRecapQueryOptions = (
  query: GetRecapQueryType,
): FetchQueryOptions<
  AiRecapResponse,
  Error,
  AiRecapResponse,
  AiRecapQueryKey
> =>
  queryOptions<AiRecapResponse, Error, AiRecapResponse, AiRecapQueryKey>({
    queryKey: AI_RECAP_KEYS.detail([query.date, query.timeZone]),
    queryFn: () => serverRecapAPIService.getRecap(query),
    retry: false,
  });
