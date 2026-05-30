"use client";

import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@tanstack/react-query";

import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";
import AutoRenewIcon from "@/shared/assets/icons/auto-renew.svg";
import { NAVIGATION_TAB } from "@/shared/config";
import { RoundButton } from "@/shared/ui";
import { useGnbNavigation } from "@/widgets/layout/model/use-gnb-navigation";

const QUERY_KEY_BY_TAB = {
  [NAVIGATION_TAB.AI_RECAP]: AI_RECAP_KEYS.all,
  [NAVIGATION_TAB.ANALYSIS]: ANALYSIS_KEYS.all,
} as const;

const RefreshButton = () => {
  const { currentTab } = useGnbNavigation();
  const { t } = useLocale("landing");
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    const queryKey =
      QUERY_KEY_BY_TAB[currentTab as keyof typeof QUERY_KEY_BY_TAB];

    if (!queryKey) return;

    queryClient.invalidateQueries({ queryKey });
  };

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
