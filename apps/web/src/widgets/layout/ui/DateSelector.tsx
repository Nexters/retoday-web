"use client";

import { DATE_FORMAT, formatDate } from "@recap/lib";
import { DatePicker, DatePickerContent, DatePickerTrigger } from "@recap/ui";

import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg";
import { RoundButton } from "@/shared/ui";
import { useQueryDate } from "@/widgets/layout/model/use-query-date";

const DateSelector = () => {
  const { selectedDate, onDateChange } = useQueryDate();

  return (
    <DatePicker value={selectedDate} onSelect={onDateChange}>
      <DatePickerTrigger>
        <RoundButton className="group" aria-haspopup="dialog">
          <div className="flex items-center gap-1 py-1.5 pr-1 pl-2.5">
            <p className="text-subtitle-2-rg text-gray-900">
              {formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD)}
            </p>
            <span className="transition group-data-[state=open]:rotate-180">
              <ArrowDownIcon />
            </span>
          </div>
        </RoundButton>
      </DatePickerTrigger>
      <DatePickerContent align="end" />
    </DatePicker>
  );
};

export default DateSelector;
