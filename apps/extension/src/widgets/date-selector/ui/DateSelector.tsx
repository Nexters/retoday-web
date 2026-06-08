import { useLocale } from "@recap/i18n";

import RefreshSvg from "@/shared/assets/icons/refresh.svg?react";
import { DatePicker } from "@/shared/ui";
import { useDateSelectorStore } from "@/widgets/date-selector/model";

const DateSelector = () => {
  const { t } = useLocale("landing");

  const selectedDate = useDateSelectorStore((state) => state.selectedDate);
  const setSelectedDate = useDateSelectorStore(
    (state) => state.setSelectedDate,
  );

  return (
    <div className="relative flex w-full items-center justify-center bg-gray-75 pb-2 pt-3 border-b border-gray-200">
      <button
        type="button"
        className="absolute inset-y-0 left-0 flex items-center justify-center px-2.5 cursor-pointer border-r border-gray-200"
        aria-label={t("refresh")}
      >
        <RefreshSvg />
      </button>
      <DatePicker
        value={selectedDate ?? new Date()}
        onChange={(date) => setSelectedDate(date ?? new Date())}
      />
    </div>
  );
};

export default DateSelector;
