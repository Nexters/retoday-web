import { AnalysisAPIService } from "@/features/analysis/api/analysis.api";
import { createAuthedRestAPI } from "@/shared/lib/create-authed-rest";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || ""),
);
