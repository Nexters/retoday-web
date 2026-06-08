import DateSelector from "@/widgets/date-selector/ui/DateSelector";
import RefreshButton from "@/widgets/layout/ui/RefreshButton";

const SidePanelHeader = () => {
  return (
    <div className="relative flex w-full items-center justify-center bg-gray-75 pb-2 pt-3 border-b border-gray-200">
      <RefreshButton />
      <DateSelector />
    </div>
  );
};

export default SidePanelHeader;
