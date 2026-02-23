import type { RestAPIProtocol } from "@recap/api";

import type { GoogleOAuthLoginDTO } from "@/app/settings/src/service/schema/google-oauth-login.schema";

export class AuthAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  googleOauthLogin(data: GoogleOAuthLoginDTO) {
    return this.fetch.post({
      url: "login",
      data,
    });
  }

  logout() {
    return this.fetch.post({
      url: "auth/logout",
    });
  }
}
