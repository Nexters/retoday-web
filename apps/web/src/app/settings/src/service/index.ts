import { generateRestAPI } from "@recap/api";

import { createAuthedRestAPI } from "@/app/settings/src/lib/create-authed-rest";
import { AuthAPIService } from "@/app/settings/src/service/auth-api.service";
import { UserAPIService } from "@/app/settings/src/service/user-api.service";

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
