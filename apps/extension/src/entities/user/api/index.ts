import { UserAPIService } from "@/entities/user/api/user.api";
import { createAuthedRestAPI } from "@/lib/create-authed-rest";

export const userAPIService = new UserAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || ""),
);
