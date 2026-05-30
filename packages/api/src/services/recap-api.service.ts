import type { DateQueryType } from "../domains/analysis/enum.schema";
import { GetRecapResponseSchema } from "../domains/recap/generate-recap.schema";
import type { RestAPIProtocol } from "../rest/types";

export class RecapAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getRecap(query?: DateQueryType) {
    return this.fetch.get({
      url: "users/me/recaps",
      query: {
        ...query,
      },
      validate: GetRecapResponseSchema.parse,
    });
  }
}
