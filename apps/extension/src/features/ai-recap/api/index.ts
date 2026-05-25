import { RecapAPIService } from "@recap/api";

import { createAuthedRestAPI } from "@/shared/lib/create-authed-rest";

export const recapAPIService = new RecapAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || "", {
    apiBaseURL: "v1",
  }),
);
