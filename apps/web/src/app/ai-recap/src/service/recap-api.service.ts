import type { RestAPIProtocol } from "@recap/api";

import { GetRecapResponseSchema } from "@/app/ai-recap/src/service/schema/generate-recap.schema";
import type { DateQueryType } from "@/app/analysis/src/service/schema/enum.schema";

export class RecapAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  generateRecap(query?: DateQueryType) {
    return this.fetch.post({
      url: "recaps/generate",
      query: {
        ...query,
      },
      validate: GetRecapResponseSchema.parse,
    });
  }
}
