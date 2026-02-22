import { getStorage, setStorage } from "@/utils/storage";

export const domainStore = {
  async getExcludedDomains(): Promise<string[]> {
    const result = await getStorage(["excludedDomains"]);
    return result.excludedDomains ?? [];
  },

  async setExcludedDomains(domains: string[]): Promise<void> {
    await setStorage({
      excludedDomains: domains,
    });
  },

  async clear(): Promise<void> {
    await setStorage({
      excludedDomains: [],
    });
  },
};
