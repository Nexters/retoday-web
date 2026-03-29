import { DatePicker, GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/components";
import Header from "@/components/Header";
import { GNB_TABS, NAVIGATION_TAB } from "@/const";
import { useSettingStore } from "@/stores";

function PageHeader() {
  const activeTab = useSettingStore((state) => state.activeTab);
  const selectedDate = useSettingStore((state) => state.selectedDate);
  const setSelectedDate = useSettingStore((state) => state.setSelectedDate);
  const setActiveTab = useSettingStore((state) => state.setActiveTab);

  return (
    <Header>
      <GnbTabs
        value={activeTab}
        className="border-b border-gray-200 w-full"
        onValueChange={setActiveTab}
      >
        <GnbTabsList>
          {GNB_TABS.map(({ label, value }) => (
            <GnbTabsTrigger
              className="cursor-pointer"
              key={value}
              value={value}
            >
              {label}
            </GnbTabsTrigger>
          ))}
        </GnbTabsList>
      </GnbTabs>

      {activeTab !== NAVIGATION_TAB.SETTINGS && (
        <DatePicker
          value={selectedDate ?? new Date()}
          onChange={(date) => setSelectedDate(date ?? new Date())}
        />
      )}
    </Header>
  );
}

export default PageHeader;
