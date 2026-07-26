import { useState } from "react";
import { APIError } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button, Input, useToast } from "@recap/ui";

import { USER_KEYS } from "@/features/setting/api/query-keys";
import { usePostExcludeDomain } from "@/features/setting/api/user-query";
import DomainItem from "@/features/setting/ui/DomainItem";
import { domainStore } from "@/shared/lib/domain-store";

type UntrackedDomainSettingProps = {
  domains: string[];
};

const UntrackedDomainSetting = ({ domains }: UntrackedDomainSettingProps) => {
  const { t } = useLocale("settings");
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [domainValue, setDomainValue] = useState("");
  const { mutate } = usePostExcludeDomain({
    onSuccess: () => {
      showToast({
        type: "success",
        message: t("untrackedDomains.addSuccess"),
      });
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.details(),
      });
    },
    onError: (error) => {
      const message =
        error instanceof APIError &&
        error.code === "EXCLUDED_DOMAIN_ALREADY_EXISTS"
          ? error.message
          : t("error.network");

      showToast({
        type: "error",
        message,
      });
    },
  });

  const handleAddDomain = () => {
    const trimmed = domainValue.trim();
    if (!trimmed) return;

    mutate(
      { domain: trimmed },
      {
        onSuccess: () => {
          domainStore.addExcludedDomain(trimmed);
          setDomainValue("");
        },
      },
    );
  };

  return (
    <div className="pt-8 pb-6 px-5">
      <h2 className="text-headline-sb text-gray-900">
        {t("untrackedDomains.title")}
      </h2>
      <p className="text-subtitle-2-rg text-gray-800 mt-1">
        {t("untrackedDomains.description")}
      </p>

      <div className="mt-4 flex flex-col gap-1">
        {domains.map((domain) => (
          <DomainItem key={domain} domain={domain} />
        ))}
      </div>
      <Input
        className="mt-4"
        value={domainValue}
        onChange={(e) => setDomainValue(e.target.value)}
        placeholder={t("untrackedDomains.domainInputPlaceholder")}
      />
      <Button
        disabled={!domainValue.trim().length}
        className="mt-2"
        variant="secondary"
        onClick={handleAddDomain}
      >
        {t("untrackedDomains.add")}
      </Button>
    </div>
  );
};

export default UntrackedDomainSetting;
