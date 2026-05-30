"use client";

import { useLocale } from "@recap/i18n";

import AutoRenewIcon from "@/shared/assets/icons/auto-renew.svg";
import { RoundButton } from "@/shared/ui";

const RefreshButton = () => {
  const { t } = useLocale("landing");

  const handleRefresh = () => {};

  return (
    <RoundButton
      className="group"
      aria-haspopup="dialog"
      onClick={handleRefresh}
    >
      <div className="flex items-center gap-1 py-1.5 pr-1 pl-2.5">
        <AutoRenewIcon />
        <p className="text-subtitle-2-rg text-gray-900">{t("refresh")}</p>
      </div>
    </RoundButton>
  );
};

export default RefreshButton;
