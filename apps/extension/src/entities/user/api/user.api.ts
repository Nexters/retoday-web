import type { RestAPIProtocol } from "@recap/api";

import type { UserProfileResponse } from "@/entities/user/model/user.type";

export class UserAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getUserProfile() {
    return this.fetch.get<UserProfileResponse>({
      url: "users/me/profiles",
    });
  }

  postExcludeDomain(data: { domain: string }) {
    return this.fetch.post({
      url: "users/me/excluded-domains",
      data,
    });
  }
}
