import type { RestAPIProtocol } from "@recap/api";

import { GetUserProfileSchema } from "@/app/settings/src/service/schema/get-user-profile.schema";

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
}
