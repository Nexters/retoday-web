import { useState } from "react";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button, Input } from "@recap/ui";

import { USER_KEYS } from "@/features/setting/api/query-key.const";
import {
  useGetUserProfile,
  usePostExcludeDomain,
} from "@/features/setting/api/user-query";
import DomainItem from "@/features/setting/ui/DomainItem";
import { domainStore } from "@/shared/lib/domain-store";

const UntrackedDomainSetting = () => {
  const { t } = useLocale("settings");
  const { data: userProfile } = useGetUserProfile();
  const queryClient = useQueryClient();
  const [doaminValue, setDoaminValue] = useState<string>("");
  const { mutate } = usePostExcludeDomain({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.detail(["user-profile"]),
      });
    },
  });

  const handleAddDomain = () => {
    mutate(
      { domain: doaminValue.trim() },
      {
        onSuccess: () => {
          domainStore.addExcludedDomain(doaminValue.trim());
          setDoaminValue("");
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
        {userProfile?.excludedDomains.map((domain) => (
          <DomainItem key={domain} domain={domain} />
        ))}
      </div>
      <Input
        className="mt-4"
        value={doaminValue}
        onChange={(e) => setDoaminValue(e.target.value)}
        placeholder={t("untrackedDomains.domainInputPlaceholder")}
      />
      <Button
        disabled={!doaminValue.trim().length}
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
