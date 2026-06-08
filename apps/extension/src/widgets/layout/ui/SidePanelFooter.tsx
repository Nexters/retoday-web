import { useLocale } from "@recap/i18n";
import { formatDate } from "@recap/lib";
import { Button } from "@recap/ui";
import browser from "webextension-polyfill";

import { DATE_FORMAT, GNB_TABS, RETODAY_BASE_URL } from "@/shared/config";
import { Icon } from "@/shared/ui";
import { useDateSelectorStore } from "@/widgets/date-selector/model";
import { useTabNavigationStore } from "@/widgets/tab-navigation/model";

const SidePanelFooter = () => {
  const activeTab = useTabNavigationStore((state) => state.activeTab);
  const selectedDate = useDateSelectorStore((state) => state.selectedDate);
  const { t } = useLocale("landing");

  const handleOpenDashboard = () => {
    const path = GNB_TABS.find((tab) => tab.value === activeTab)?.path;
    browser.tabs.create({
      url: `${RETODAY_BASE_URL}${path}?date=${formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH)}`,
    });
  };

  return (
    <footer className="flex flex-col gap-2 items-center justify-center fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pt-2 px-5 pb-6 shadow-lg">
      <Button
        className="flex items-center justify-center gap-2"
        onClick={handleOpenDashboard}
      >
        {t("landing.checkInDashboard")}
        <Icon name="arrow-right" className="size-4" />
      </Button>
      <span className="text-caption-1 text-gray-500">
        {t("landing.dashboardDescription")}
      </span>
    </footer>
  );
};

export default SidePanelFooter;
