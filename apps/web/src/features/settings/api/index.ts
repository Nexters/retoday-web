import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";
import { UserAPIService } from "@/features/settings/api/user-api.service";

export const userAPIService = new UserAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
