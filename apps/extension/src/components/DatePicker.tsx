import {
  DatePicker as DatePickerComponent,
  DatePickerContent,
  DatePickerTrigger,
} from "@recap/ui";

import { DATE_FORMAT } from "@/const/date-format.const";
import { formatDate } from "@/utils/date";

type DateRangePickerProps = {
  value: Date;
  onChange: (date: Date | undefined) => void;
};
const DatePicker = ({ value, onChange }: DateRangePickerProps) => {
  return (
    <div className="flex w-full items-center justify-center bg-gray-75 py-2">
      <DatePickerComponent size="sm" value={value} onSelect={onChange}>
        <DatePickerTrigger>
          <button
            type="button"
            className="text-subtitle-2-rg text-gray-900 cursor-pointer"
          >
            {value ? formatDate(value, DATE_FORMAT.YYYY_MM_DD) : "날짜 선택"}
          </button>
        </DatePickerTrigger>
        <DatePickerContent align="center" />
      </DatePickerComponent>
    </div>
  );
};

export default DatePicker;
