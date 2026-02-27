import { AnalysisAPIService } from "@/entities/analysis/api/analysis.api";
import { createAuthedRestAPI } from "@/lib/create-authed-rest";

export const analysisAPIService = new AnalysisAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || ""),
);
