import { Button } from "@recap/ui";
import browser from "webextension-polyfill";

import Icon from "@/components/Icon";
import { RETODAY_BASE_URL } from "@/const/retoday.const";

const Footer = () => {
  const handleOpenDashboard = () => {
    browser.tabs.create({
      url: RETODAY_BASE_URL,
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
