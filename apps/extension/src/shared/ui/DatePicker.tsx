import { useLocale } from "@recap/i18n";
import {
  DatePicker as DatePickerComponent,
  DatePickerContent,
  DatePickerTrigger,
} from "@recap/ui";
import { formatDate } from "@recap/utils";

import { DATE_FORMAT } from "@/shared/config/date-format.const";

type DateRangePickerProps = {
  value: Date;
  onChange: (date: Date | undefined) => void;
};
const DatePicker = ({ value, onChange }: DateRangePickerProps) => {
  const { t } = useLocale("landing");

  return (
    <div className="flex w-full items-center justify-center bg-gray-75 py-2">
      <DatePickerComponent size="sm" value={value} onSelect={onChange}>
        <DatePickerTrigger>
          <button
            type="button"
            className="text-subtitle-2-rg text-gray-900 cursor-pointer"
          >
            {value
              ? formatDate(value, DATE_FORMAT.YYYY_MM_DD)
              : t("datePicker.placeholder")}
          </button>
        </DatePickerTrigger>
        <DatePickerContent align="center" />
      </DatePickerComponent>
    </div>
  );
};

export default DatePicker;
