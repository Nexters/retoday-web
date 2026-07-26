import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@recap/ui";

import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";
import RefreshSvg from "@/shared/assets/icons/refresh.svg?react";
import { NAVIGATION_TAB } from "@/shared/config";
import { useRefreshTooltip } from "@/widgets/layout/model/use-refresh-tooltip";
import { useTabNavigationStore } from "@/widgets/tab-navigation/model";

const QUERY_KEY_BY_TAB = {
  [NAVIGATION_TAB.AI_RECAP]: AI_RECAP_KEYS.all,
  [NAVIGATION_TAB.ANALYSIS]: ANALYSIS_KEYS.all,
} as const;

const RefreshButton = () => {
  const { t } = useLocale("landing");
  const activeTab = useTabNavigationStore((state) => state.activeTab);
  const queryClient = useQueryClient();
  const { open } = useRefreshTooltip({ duration: 4000 });

  const handleRefresh = () => {
    const queryKey =
      QUERY_KEY_BY_TAB[activeTab as keyof typeof QUERY_KEY_BY_TAB];

    if (!queryKey) return;

    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="absolute inset-y-0 left-0 flex cursor-pointer items-center justify-center border-r border-gray-200 px-2.5"
            aria-label={t("refresh")}
            onClick={handleRefresh}
          >
            <RefreshSvg />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={0}
          className="text-body-2 rounded-xl bg-gray-900 px-3 py-2 text-white shadow-none ring-0"
        >
          {t("refreshTooltip")}
          <TooltipArrow className="fill-gray-900" width={21} height={10} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RefreshButton;
