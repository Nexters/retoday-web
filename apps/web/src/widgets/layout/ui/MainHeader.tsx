import DateSelector from "./DateSelector";
import RefreshButton from "./RefreshButton";
import TabNavigation from "./TabNavigation";

const MainHeader = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
      <TabNavigation />
      <div className="ml-auto flex items-center gap-2">
        <RefreshButton />
        <DateSelector />
      </div>
    </div>
  );
};

export default MainHeader;
