import type { RestAPIProtocol } from "@recap/api";

import { GetRecapResponseSchema } from "@/features/ai-recap/model/generate-recap.schema";
import type { DateQueryType } from "@/features/analysis/model/enum.schema";

export class RecapAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getRecap(query?: DateQueryType) {
    return this.fetch.get({
      url: "recaps",
      query: {
        ...query,
      },
      validate: GetRecapResponseSchema.parse,
    });
  }
}
