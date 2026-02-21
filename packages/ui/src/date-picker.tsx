"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";

import { cn } from "./utils/cn";
import {
  addMonths,
  formatMonthLabel,
  formatYYYYMMDD,
  getCalendarGrid,
  isSameDay,
  isSameMonth,
  startOfMonth,
} from "./utils/date";

type DatePickerSize = "sm" | "md";

const datePickerTriggerVariants = cva(
  "bg-gray-75 rounded-full border border-solid border-gray-200 shadow-[inset_4px_5px_9.5px_0_#9CA5AF33] transition hover:bg-gray-100",
  {
    variants: {
      size: {
        sm: "p-1.5",
        md: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const datePickerTriggerInnerVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      sm: "py-1 pr-0.5 pl-2",
      md: "py-1.5 pr-1 pl-2.5",
    },
    defaultVariants: {
      size: "md",
    },
  },
});

const datePickerTriggerTextVariants = cva("text-gray-900", {
  variants: {
    size: {
      sm: "text-body-3",
      md: "text-subtitle-2-rg",
    },
    defaultVariants: {
      size: "md",
    },
  },
});

const datePickerContentVariants = cva(
  "z-50 rounded-2xl border border-gray-200 bg-white shadow-gnb data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      size: {
        sm: "w-72",
        md: "w-82",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const datePickerHeaderVariants = cva("flex items-center justify-between", {
  variants: {
    size: {
      sm: "px-3 pt-3 pb-2",
      md: "px-4 pt-4 pb-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const datePickerHeaderLabelVariants = cva("text-gray-500", {
  variants: {
    size: {
      sm: "text-caption-2",
      md: "text-caption-1",
    },
    defaultVariants: {
      size: "md",
    },
  },
});

const datePickerHeaderMonthVariants = cva("text-gray-900", {
  variants: {
    size: {
      sm: "text-subtitle-2-sb",
      md: "text-subtitle-1-sb",
    },
    defaultVariants: {
      size: "md",
    },
  },
});

const datePickerNavButtonVariants = cva(
  "bg-gray-75 grid place-items-center rounded-full border border-gray-200 text-gray-800 transition hover:bg-gray-100",
  {
    variants: {
      size: {
        sm: "size-7",
        md: "size-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const datePickerCalendarContainerVariants = cva("", {
  variants: {
    size: {
      sm: "px-3",
      md: "px-4",
    },
    defaultVariants: {
      size: "md",
    },
  },
});

const datePickerWeekdayVariants = cva(
  "grid grid-cols-7 gap-1 text-center text-gray-500",
  {
    variants: {
      size: {
        sm: "text-caption-2 pb-1.5",
        md: "text-caption-1 pb-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const datePickerGridVariants = cva("grid grid-cols-7 gap-1", {
  variants: {
    size: {
      sm: "pb-2",
      md: "pb-3",
    },
    defaultVariants: {
      size: "md",
    },
  },
});

const datePickerDayButtonVariants = cva("w-full rounded-xl transition", {
  variants: {
    size: {
      sm: "text-caption-1 h-8",
      md: "text-body-3 h-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const datePickerFooterVariants = cva(
  "flex items-center justify-between border-t border-gray-200",
  {
    variants: {
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const datePickerFooterButtonVariants = cva(
  "text-gray-800 underline-offset-4 hover:underline",
  {
    variants: {
      size: {
        sm: "text-caption-1",
        md: "text-body-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const datePickerCloseButtonVariants = cva(
  "rounded-full bg-gray-900 text-white transition hover:opacity-90",
  {
    variants: {
      size: {
        sm: "text-caption-1 px-3 py-1.5",
        md: "text-label-2 px-4 py-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type DatePickerContextValue = {
  selected: Date | undefined;
  viewMonth: Date;
  setViewMonth: React.Dispatch<React.SetStateAction<Date>>;
  handleSelect: (date: Date) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleToday: () => void;
  isDateDisabled: (date: Date) => boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size: DatePickerSize;
};

const DatePickerContext = React.createContext<
  DatePickerContextValue | undefined
>(undefined);

const useDatePickerContext = () => {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      "DatePicker components must be used within a DatePicker component",
    );
  }
  return context;
};

export type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onSelect?: (date: Date | undefined) => void;
  fromDate?: Date;
  toDate?: Date;
  size?: DatePickerSize;
  className?: string;
  children: React.ReactNode;
};

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onSelect,
      fromDate,
      toDate,
      size = "md",
      className,
      children,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(
      defaultValue,
    );

    const selected = value ?? internalValue;
    const [viewMonth, setViewMonth] = React.useState(() =>
      selected ? startOfMonth(selected) : startOfMonth(new Date()),
    );

    const handleSelect = React.useCallback(
      (date: Date) => {
        if (value === undefined) {
          setInternalValue(date);
        }
        onSelect?.(date);
        setOpen(false);
      },
      [value, onSelect],
    );

    const handlePrevMonth = React.useCallback(() => {
      setViewMonth((m) => addMonths(m, -1));
    }, []);

    const handleNextMonth = React.useCallback(() => {
      setViewMonth((m) => addMonths(m, 1));
    }, []);

    const handleToday = React.useCallback(() => {
      const today = new Date();
      handleSelect(today);
    }, [handleSelect]);

    React.useEffect(() => {
      if (selected) {
        const nextMonth = startOfMonth(selected);
        setViewMonth((prev) =>
          isSameMonth(prev, nextMonth) ? prev : nextMonth,
        );
      }
    }, [selected]);

    const isDateDisabled = React.useCallback(
      (date: Date) => {
        if (fromDate && date < fromDate) return true;
        if (toDate && date > toDate) return true;
        return false;
      },
      [fromDate, toDate],
    );

    const contextValue: DatePickerContextValue = {
      selected,
      viewMonth,
      setViewMonth,
      handleSelect,
      handlePrevMonth,
      handleNextMonth,
      handleToday,
      isDateDisabled,
      open,
      setOpen,
      size,
    };

    return (
      <DatePickerContext.Provider value={contextValue}>
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <div ref={ref} className={cn("relative", className)}>
            {children}
          </div>
        </PopoverPrimitive.Root>
      </DatePickerContext.Provider>
    );
  },
);

DatePicker.displayName = "DatePicker";

export type DatePickerTriggerProps = {
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
};

const DatePickerTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  DatePickerTriggerProps
>(({ placeholder = "날짜 선택", className, children, ...props }, ref) => {
  const { selected, open, size } = useDatePickerContext();

  if (children) {
    return (
      <PopoverPrimitive.Trigger ref={ref} asChild {...props}>
        {children}
      </PopoverPrimitive.Trigger>
    );
  }

  return (
    <PopoverPrimitive.Trigger ref={ref} asChild {...props}>
      <button
        type="button"
        className={cn(datePickerTriggerVariants({ size }), className)}
      >
        <div className={datePickerTriggerInnerVariants({ size })}>
          <p className={datePickerTriggerTextVariants({ size })}>
            {selected ? formatYYYYMMDD(selected) : placeholder}
          </p>
          <span className={cn("transition-transform", open && "rotate-180")}>
            <svg
              width={size === "md" ? "16" : "14"}
              height={size === "md" ? "16" : "14"}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>
    </PopoverPrimitive.Trigger>
  );
});

DatePickerTrigger.displayName = "DatePickerTrigger";

export type DatePickerContentProps = {
  className?: string;
  align?: "start" | "center" | "end";
};

const DatePickerContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  DatePickerContentProps
>(({ className, align = "center", ...props }, ref) => {
  const {
    selected,
    viewMonth,
    handleSelect,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    isDateDisabled,
    size,
  } = useDatePickerContext();

  const grid = React.useMemo(() => getCalendarGrid(viewMonth), [viewMonth]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        className={cn(datePickerContentVariants({ size }), className)}
        align={align}
        sideOffset={8}
        {...props}
      >
        <div className={datePickerHeaderVariants({ size })}>
          <div className="flex flex-col">
            <p className={datePickerHeaderLabelVariants({ size })}>날짜 선택</p>
            <p className={datePickerHeaderMonthVariants({ size })}>
              {formatMonthLabel(viewMonth)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className={datePickerNavButtonVariants({ size })}
              aria-label="이전 달"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className={datePickerNavButtonVariants({ size })}
              aria-label="다음 달"
            >
              ›
            </button>
          </div>
        </div>

        <div className={datePickerCalendarContainerVariants({ size })}>
          <div className={datePickerWeekdayVariants({ size })}>
            <span>일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span>토</span>
          </div>

          <div className={datePickerGridVariants({ size })}>
            {grid.map(({ date, inMonth }, idx) => {
              const selectedDay = selected ? isSameDay(date, selected) : false;
              const disabled = !inMonth || isDateDisabled(date);

              return (
                <button
                  key={`${date.toISOString()}-${idx}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    if (disabled) return;
                    handleSelect(date);
                  }}
                  className={cn(
                    datePickerDayButtonVariants({ size }),
                    disabled
                      ? "cursor-not-allowed text-gray-300"
                      : "text-gray-900 hover:bg-blue-50",
                    selectedDay &&
                      "bg-blue-200 text-gray-900 shadow-[inset_0_0_0_2px_#25DEFF]",
                  )}
                  aria-pressed={selectedDay}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className={datePickerFooterVariants({ size })}>
          <button
            type="button"
            onClick={handleToday}
            className={datePickerFooterButtonVariants({ size })}
          >
            오늘
          </button>

          <PopoverPrimitive.Close asChild>
            <button
              type="button"
              className={datePickerCloseButtonVariants({ size })}
            >
              닫기
            </button>
          </PopoverPrimitive.Close>
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

DatePickerContent.displayName = "DatePickerContent";

export { DatePicker, DatePickerContent, DatePickerTrigger };
