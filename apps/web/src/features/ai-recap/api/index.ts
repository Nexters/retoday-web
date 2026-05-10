import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";
import { RecapAPIService } from "@/features/ai-recap/api/recap-api.service";

export const recapAPIService = new RecapAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
