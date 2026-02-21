import { useState } from "react";
import { DatePicker, DatePickerContent, DatePickerTrigger } from "@recap/ui";

import { DATE_FORMAT } from "@/const/date-format.const";
import { formatDate } from "@/utils/date";

const DateRangePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <div className="flex w-full items-center justify-center bg-gray-75 py-2">
      <DatePicker size="sm" value={selectedDate} onSelect={setSelectedDate}>
        <DatePickerTrigger>
          <button
            type="button"
            className="text-subtitle-2-rg text-gray-900 cursor-pointer"
          >
            {selectedDate
              ? formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD)
              : "날짜 선택"}
          </button>
        </DatePickerTrigger>
        <DatePickerContent align="center" />
      </DatePicker>
    </div>
  );
};

export default DateRangePicker;
