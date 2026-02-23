import { createAuthedRestAPI } from "@/app/(auth)/src/lib/create-authed-rest";
import { AnalysisAPIService } from "@/app/analysis/src/service/analysis-api.service";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
