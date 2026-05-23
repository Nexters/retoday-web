"use client";

import { useState } from "react";
import { catchAPIError } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { cn } from "@recap/ui";

import { useAuth } from "@/entities/auth/ui";
import { userAPIService } from "@/features/settings/api";
import { USER_KEYS } from "@/features/settings/api/query-keys";

type ExcludedDomainSectionProps = {
  disabled?: boolean;
  domains: string[];
};

const ExcludedDomainSection = ({
  disabled = false,
  domains,
}: ExcludedDomainSectionProps) => {
  const { t } = useLocale("settings");
  const [domain, setDomain] = useState("");

  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const refetchProfile = async () => {
    refreshAuth();
    await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
    await queryClient.invalidateQueries({ queryKey: USER_KEYS.details() });
  };

  const handleAddDomain = async (domain: string) => {
    try {
      await userAPIService.addExcludedDomain({ domain });
      await refetchProfile();
    } catch (err) {
      catchAPIError(err);
    }
  };

  const handleDeleteDomain = async (domain: string) => {
    try {
      await userAPIService.deleteExcludedDomain({ domain });
      await refetchProfile();
    } catch (err) {
      catchAPIError(err);
    }
  };

  const handleAdd = async () => {
    if (!domain) return;
    await handleAddDomain(domain);
    setDomain("");
  };

  return (
    <div
      className={cn(
        "rounded-[1.25rem] bg-white px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <h2 className="text-heading-rg text-gray-800">
        {t("untrackedDomains.title")}
      </h2>

      <p className="text-body-1 mt-2 text-gray-900">
        {t("untrackedDomains.description")}
      </p>

      <div className="mt-6 space-y-1">
        {domains.map((excludedDomain, index) => (
          <div
            className="bg-gray-75 flex items-center justify-between rounded-full px-4 py-2"
            key={index}
          >
            <p className="text-body-1 text-gray-500">{excludedDomain}</p>

            <button
              className="text-body-1 text-[#ff4242]"
              onClick={() => handleDeleteDomain(excludedDomain)}
            >
              {t("untrackedDomains.delete")}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-4">
        <input
          className="text-body-2 w-full rounded-xl border border-solid border-gray-200 px-3 py-4 text-gray-900 placeholder:text-gray-500"
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder={t("untrackedDomains.domainInputPlaceholder")}
          disabled={disabled}
        />

        <button
          className={cn(
            "text-subtitle-1-md rounded-xl px-6 py-4 whitespace-nowrap text-gray-100",
            domain.length === 0 ? "bg-gray-500" : "bg-gray-800",
          )}
          onClick={handleAdd}
          disabled={disabled}
        >
          {t("untrackedDomains.add")}
        </button>
      </div>
    </div>
  );
};

export default ExcludedDomainSection;
