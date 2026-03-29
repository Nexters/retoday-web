import { Button } from "@recap/ui";
import browser from "webextension-polyfill";

import { Icon } from "@/components";
import { DATE_FORMAT, GNB_TABS, RETODAY_BASE_URL } from "@/const";
import { formatDate } from "@/utils/date";

const Footer = ({
  selectedDate,
  activeTab,
}: {
  selectedDate: Date;
  activeTab: string;
}) => {
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
        대시보드에서 확인하기
        <Icon name="arrow-right" className="size-4" />
      </Button>
      <span className="text-caption-1 text-gray-500">
        자세한 리캡은 대시보드에서 확인해 보세요
      </span>
    </footer>
  );
};

export default Footer;
