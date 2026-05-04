import { RecapAPIService } from "@/features/ai-recap/api/recap-api.service";
import { createAuthedRestAPI } from "@/features/settings/lib/create-authed-rest";

export const recapAPIService = new RecapAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
