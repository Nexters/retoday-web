import { generateRestAPI } from "@recap/api";

import { AuthAPIService } from "@/features/settings/api/auth-api.service";
import { UserAPIService } from "@/features/settings/api/user-api.service";
import { createAuthedRestAPI } from "@/features/settings/lib/create-authed-rest";

export const authAPIService = new AuthAPIService(
  generateRestAPI(
    {
      APIbaseURL: `api/v1/auth`,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    },
  ),
);

export const authWithTokenAPIService = new AuthAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);

export const userAPIService = new UserAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
