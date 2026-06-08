import { AnalysisAPIService } from "@recap/api";

import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || "", {
    apiBaseURL: "v1",
  }),
);
