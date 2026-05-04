import { getStorage, setStorage } from "@/shared/lib/storage";

export const domainStore = {
  async getExcludedDomains(): Promise<string[]> {
    const result = await getStorage(["excludedDomains"]);
    return result.excludedDomains ?? [];
  },

  async addExcludedDomain(domain: string): Promise<void> {
    const domains = await this.getExcludedDomains();
    await this.setExcludedDomains([...domains, domain]);
  },

  async setExcludedDomains(domains: string[]): Promise<void> {
    await setStorage({
      excludedDomains: domains,
    });
  },

  async deleteExcludedDomain(domain: string): Promise<void> {
    const domains = await this.getExcludedDomains();
    await this.setExcludedDomains(domains.filter((d) => d !== domain));
  },

  async clear(): Promise<void> {
    await setStorage({
      excludedDomains: [],
    });
  },
};
