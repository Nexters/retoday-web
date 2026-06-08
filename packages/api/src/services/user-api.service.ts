import { GetUserProfileSchema } from "../domains/user/user-profile.schema";
import type { RestAPIProtocol } from "../rest/types";

export class UserAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getUserProfile() {
    return this.fetch.get({
      url: "users/me/profiles",
      validate: GetUserProfileSchema.parse,
    });
  }

  addExcludedDomain(data: { domain: string }) {
    return this.fetch.post({
      url: "users/me/excluded-domains",
      data,
    });
  }

  deleteExcludedDomain(data: { domain: string }) {
    return this.fetch.delete({
      url: "users/me/excluded-domains",
      data,
    });
  }
}
