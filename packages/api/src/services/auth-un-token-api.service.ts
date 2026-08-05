import type { GoogleOAuthLoginDTO } from "../domains/auth/google-oauth-login.schema";
import type { RefreshTokensDTO } from "../domains/auth/refresh-tokens.schema";
import { RefreshTokensResponseSchema } from "../domains/auth/refresh-tokens.schema";
import type { RestAPIProtocol } from "../rest/types";

/** Auth endpoints that must not send Authorization headers. */
export class AuthUnTokenAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  googleOauthLogin(data: GoogleOAuthLoginDTO) {
    return this.fetch.post({
      url: "auth/login",
      data,
      validate: RefreshTokensResponseSchema.parse,
    });
  }

  refreshTokens(data: RefreshTokensDTO) {
    return this.fetch.post({
      url: "auth/refresh",
      data,
      validate: RefreshTokensResponseSchema.parse,
    });
  }
}
