"use client";

import { useLocale } from "@recap/i18n";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@recap/ui";
import { useQueryClient } from "@tanstack/react-query";

import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";
import AutoRenewIcon from "@/shared/assets/icons/auto-renew.svg";
import { NAVIGATION_TAB } from "@/shared/config";
import { RoundButton } from "@/shared/ui";
import { useGnbRoute } from "@/widgets/layout/model/use-gnb-route";
import { useRefreshTooltip } from "@/widgets/layout/model/use-refresh-tooltip";

const QUERY_KEY_BY_TAB = {
  [NAVIGATION_TAB.AI_RECAP]: AI_RECAP_KEYS.all,
  [NAVIGATION_TAB.ANALYSIS]: ANALYSIS_KEYS.all,
} as const;

const RefreshButton = () => {
  const { tab } = useGnbRoute();
  const { t } = useLocale("landing");
  const queryClient = useQueryClient();
  const { open } = useRefreshTooltip({ duration: 4000 });

  const handleRefresh = () => {
    const queryKey = QUERY_KEY_BY_TAB[tab as keyof typeof QUERY_KEY_BY_TAB];

    if (!queryKey) return;

    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <RoundButton
            className="group"
            aria-label={t("refresh")}
            onClick={handleRefresh}
          >
            <div className="flex items-center gap-1 py-1.5 pr-1 pl-2.5">
              <AutoRenewIcon />
              <p className="text-subtitle-2-rg text-gray-900">{t("refresh")}</p>
            </div>
          </RoundButton>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={4}
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
