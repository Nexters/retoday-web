import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";
import { AnalysisAPIService } from "@/features/analysis/api/analysis-api.service";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
