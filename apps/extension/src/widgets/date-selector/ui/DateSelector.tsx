import { DatePicker } from "@/shared/ui";
import { useDateSelectorStore } from "@/widgets/date-selector/model";

const DateSelector = () => {
  const selectedDate = useDateSelectorStore((state) => state.selectedDate);
  const setSelectedDate = useDateSelectorStore(
    (state) => state.setSelectedDate,
  );

  return (
    <DatePicker
      value={selectedDate ?? new Date()}
      onChange={(date) => setSelectedDate(date ?? new Date())}
    />
  );
};

export default DateSelector;
