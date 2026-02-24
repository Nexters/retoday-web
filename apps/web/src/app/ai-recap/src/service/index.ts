import { RecapAPIService } from "@/app/ai-recap/src/service/recap-api.service";
import { createAuthedRestAPI } from "@/app/settings/src/lib/create-authed-rest";

export const recapAPIService = new RecapAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
