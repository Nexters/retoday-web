import type { RestAPIProtocol } from "@recap/api";

import type { AiRecapResponse } from "@/entities/ai-recap/model/ai-recap.type";

export class AiRecapAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getAiRecap(date: string) {
    return this.fetch.get<AiRecapResponse>({
      url: `recaps?date=${date}`,
    });
  }
}
