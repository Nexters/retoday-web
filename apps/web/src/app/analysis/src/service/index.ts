import { AnalysisAPIService } from "@/app/analysis/src/service/analysis-api.service";
import { createAuthedRestAPI } from "@/app/settings/src/lib/create-authed-rest";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
