import { useLocale } from "@recap/i18n";
import { dayjs, formatDate } from "@recap/lib";
import {
  cn,
  DatePicker as DatePickerComponent,
  DatePickerContent,
  DatePickerTrigger,
} from "@recap/ui";

import Arrow2LeftSvg from "@/shared/assets/icons/arrow2-left.svg?react";
import Arrow2RightSvg from "@/shared/assets/icons/arrow2-right.svg?react";
import { DATE_FORMAT } from "@/shared/config/date-format.const";

type DateRangePickerProps = {
  value: Date;
  onChange: (date: Date | undefined) => void;
};

const DatePicker = ({ value, onChange }: DateRangePickerProps) => {
  const { t } = useLocale("landing");
  const today = dayjs().startOf("day");
  const selectedDate = dayjs(value).startOf("day");
  const canGoNext = selectedDate.isBefore(today);

  const handlePrevDay = () => {
    onChange(selectedDate.subtract(1, "day").toDate());
  };

  const handleNextDay = () => {
    if (!canGoNext) return;
    onChange(selectedDate.add(1, "day").toDate());
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        className="cursor-pointer mb-0.5"
        aria-label="이전 날"
        onClick={handlePrevDay}
      >
        <Arrow2LeftSvg className="size-6 [&_path]:fill-gray-900" />
      </button>

      <DatePickerComponent
        size="sm"
        value={value}
        onSelect={onChange}
        toDate={today.toDate()}
      >
        <DatePickerTrigger>
          <button
            type="button"
            className="text-subtitle-2-rg cursor-pointer text-gray-900"
          >
            {value
              ? formatDate(value, DATE_FORMAT.YYYY_MM_DD)
              : t("datePicker.placeholder")}
          </button>
        </DatePickerTrigger>
        <DatePickerContent align="center" />
      </DatePickerComponent>

      <button
        type="button"
        className={cn(
          "mb-0.5",
          canGoNext ? "cursor-pointer" : "cursor-default",
        )}
        aria-label="다음 날"
        disabled={!canGoNext}
        onClick={handleNextDay}
      >
        <Arrow2RightSvg
          className={cn(
            "size-6",
            canGoNext ? "[&_path]:fill-gray-900" : "[&_path]:fill-gray-300",
          )}
        />
      </button>
    </div>
  );
};

export default DatePicker;
