import { AiRecapAPIService } from "@/features/ai-recap/api/ai-recap.api";
import { createAuthedRestAPI } from "@/shared/lib/create-authed-rest";

export const aiRecapAPIService = new AiRecapAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || ""),
);
