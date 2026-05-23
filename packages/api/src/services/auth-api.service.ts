import type { GoogleOAuthLoginDTO } from "../domains/auth/google-oauth-login.schema";
import type { RestAPIProtocol } from "../rest/types";

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
