import { AnalysisAPIService } from "@recap/api";

import { createAuthedRestAPI } from "@/shared/lib/create-authed-rest";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || "", {
    apiBaseURL: "v1",
  }),
);
