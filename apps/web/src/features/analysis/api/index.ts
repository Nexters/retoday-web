import { AnalysisAPIService } from "@/features/analysis/api/analysis-api.service";
import { createAuthedRestAPI } from "@/features/settings/lib/create-authed-rest";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
