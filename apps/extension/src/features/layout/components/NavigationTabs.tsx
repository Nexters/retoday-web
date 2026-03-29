import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/components";
import { GNB_TABS } from "@/const";

type NavigationTabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

function NavigationTabs({
  defaultValue,
  value,
  onValueChange,
}: NavigationTabsProps) {
  return (
    <GnbTabs
      defaultValue={defaultValue}
      value={value}
      className="border-b border-gray-200 w-full"
      onValueChange={onValueChange}
    >
      <GnbTabsList>
        {GNB_TABS.map(({ label, value }) => (
          <GnbTabsTrigger className="cursor-pointer" key={value} value={value}>
            {label}
          </GnbTabsTrigger>
        ))}
      </GnbTabsList>
    </GnbTabs>
  );
}

export default NavigationTabs;
