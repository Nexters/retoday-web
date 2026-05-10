import DateSelector from "./DateSelector";
import TabNavigation from "./TabNavigation";

const MainHeader = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
      <TabNavigation />
      <div className="ml-auto">
        <DateSelector />
      </div>
    </div>
  );
};

export default MainHeader;
