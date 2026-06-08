import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";

import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";
import RefreshSvg from "@/shared/assets/icons/refresh.svg?react";
import { NAVIGATION_TAB } from "@/shared/config";
import { useTabNavigationStore } from "@/widgets/tab-navigation/model";

const QUERY_KEY_BY_TAB = {
  [NAVIGATION_TAB.AI_RECAP]: AI_RECAP_KEYS.all,
  [NAVIGATION_TAB.ANALYSIS]: ANALYSIS_KEYS.all,
} as const;

const RefreshButton = () => {
  const { t } = useLocale("landing");
  const activeTab = useTabNavigationStore((state) => state.activeTab);
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    const queryKey =
      QUERY_KEY_BY_TAB[activeTab as keyof typeof QUERY_KEY_BY_TAB];

    if (!queryKey) return;

    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <button
      type="button"
      className="absolute inset-y-0 left-0 flex items-center justify-center px-2.5 cursor-pointer border-r border-gray-200"
      aria-label={t("refresh")}
      onClick={handleRefresh}
    >
      <RefreshSvg />
    </button>
  );
};

export default RefreshButton;
