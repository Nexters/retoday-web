import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";

import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";
import RefreshSvg from "@/shared/assets/icons/refresh.svg?react";
import { NAVIGATION_TAB } from "@/shared/config";
import { DatePicker } from "@/shared/ui";
import { useDateSelectorStore } from "@/widgets/date-selector/model";
import { useTabNavigationStore } from "@/widgets/tab-navigation/model";

const QUERY_KEY_BY_TAB = {
  [NAVIGATION_TAB.AI_RECAP]: AI_RECAP_KEYS.all,
  [NAVIGATION_TAB.ANALYSIS]: ANALYSIS_KEYS.all,
} as const;

const DateSelector = () => {
  const { t } = useLocale("landing");
  const queryClient = useQueryClient();
  const activeTab = useTabNavigationStore((state) => state.activeTab);

  const selectedDate = useDateSelectorStore((state) => state.selectedDate);
  const setSelectedDate = useDateSelectorStore(
    (state) => state.setSelectedDate,
  );

  const handleRefresh = () => {
    const queryKey =
      QUERY_KEY_BY_TAB[activeTab as keyof typeof QUERY_KEY_BY_TAB];

    if (!queryKey) return;

    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <div className="relative flex w-full items-center justify-center bg-gray-75 pb-2 pt-3 border-b border-gray-200">
      <button
        type="button"
        className="absolute inset-y-0 left-0 flex items-center justify-center px-2.5 cursor-pointer border-r border-gray-200"
        aria-label={t("refresh")}
        onClick={handleRefresh}
      >
        <RefreshSvg />
      </button>
      <DatePicker
        value={selectedDate ?? new Date()}
        onChange={(date) => setSelectedDate(date ?? new Date())}
      />
    </div>
  );
};

export default DateSelector;
