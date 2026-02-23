"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import { useOutsideClick } from "@/hooks/useOutSideClick";
import {
  addMonths,
  formatQueryDate,
  formatYYYYMMDD,
  getCalendarGrid,
  getMonthLabel,
  isSameDay,
  isSameMonth,
  parseQueryDate,
  startOfMonth,
} from "@/lib/date";
import { buildUrl } from "@/lib/url";

export type DatePickerProps = {
  queryKey?: string;
  defaultDate?: Date;
};

const DatePicker = ({ queryKey = "date", defaultDate }: DatePickerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  const stableDefaultDate = useMemo(
    () => defaultDate ?? new Date(),
    [defaultDate],
  );

  const selected = useMemo(() => {
    const next = new URLSearchParams(queryString);
    const fromQuery = parseQueryDate(next.get(queryKey));
    return fromQuery ?? stableDefaultDate;
  }, [queryString, queryKey, stableDefaultDate]);

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(selected));

  const grid = useMemo(() => getCalendarGrid(viewMonth), [viewMonth]);

  const wrapRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapRef, open, () => setOpen(false));

  const onPick = useCallback(
    (d: Date) => {
      const next = new URLSearchParams(queryString);
      next.set(queryKey, formatQueryDate(d));

      router.push(buildUrl(pathname, next), { scroll: false });
      setOpen(false);
    },
    [pathname, queryKey, router, queryString],
  );

  const onKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  const onPrevMonth = useCallback(() => {
    setViewMonth((m) => addMonths(m, -1));
  }, []);

  const onNextMonth = useCallback(() => {
    setViewMonth((m) => addMonths(m, 1));
  }, []);

  const onToday = useCallback(() => {
    onPick(new Date());
  }, [onPick]);

  useEffect(() => {
    const nextMonth = startOfMonth(selected);
    setViewMonth((prev) => (isSameMonth(prev, nextMonth) ? prev : nextMonth));
  }, [selected]);

  useEffect(() => {
    const next = new URLSearchParams(queryString);

    if (next.get(queryKey)) return;

    next.set(queryKey, formatQueryDate(stableDefaultDate));

    router.replace(buildUrl(pathname, next), { scroll: false });
  }, [pathname, queryKey, queryString, router, stableDefaultDate]);

  return (
    <div ref={wrapRef} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-gray-75 rounded-full border border-solid border-gray-200 p-2 shadow-[inset_4px_5px_9.5px_0_#9CA5AF33] transition hover:bg-gray-100"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div className="flex items-center gap-1 py-1.5 pr-1 pl-2.5">
          <p className="text-subtitle-2-rg text-gray-900">
            {formatYYYYMMDD(selected)}
          </p>
          <span className={open ? "rotate-180 transition" : "transition"}>
            <ArrowDownIcon />
          </span>
        </div>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="날짜 선택"
          className="shadow-gnb absolute right-0 z-50 mt-2 w-82 rounded-2xl border border-gray-200 bg-white"
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex flex-col">
              <p className="text-caption-1 text-gray-500">날짜 선택</p>
              <p className="text-subtitle-1-sb text-gray-900">
                {getMonthLabel(viewMonth)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrevMonth}
                className="bg-gray-75 grid size-9 place-items-center rounded-full border border-gray-200 text-gray-800 transition hover:bg-gray-100"
                aria-label="이전 달"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNextMonth}
                className="bg-gray-75 grid size-9 place-items-center rounded-full border border-gray-200 text-gray-800 transition hover:bg-gray-100"
                aria-label="다음 달"
              >
                ›
              </button>
            </div>
          </div>

          <div className="px-4">
            <div className="text-caption-1 grid grid-cols-7 gap-1 pb-2 text-center text-gray-500">
              <span>일</span>
              <span>월</span>
              <span>화</span>
              <span>수</span>
              <span>목</span>
              <span>금</span>
              <span>토</span>
            </div>

            <div className="grid grid-cols-7 gap-1 pb-3">
              {grid.map(({ date, inMonth }, idx) => {
                const selectedDay = isSameDay(date, selected);

                return (
                  <button
                    key={`${date.toISOString()}-${idx}`}
                    type="button"
                    disabled={!inMonth}
                    onClick={() => {
                      if (!inMonth) return;
                      onPick(date);
                    }}
                    className={[
                      "text-body-3 h-10 w-full rounded-xl transition",
                      !inMonth
                        ? "cursor-not-allowed text-gray-300"
                        : "text-gray-900 hover:bg-blue-50",
                      selectedDay
                        ? "bg-blue-200 text-gray-900 shadow-[inset_0_0_0_2px_#25DEFF]"
                        : "",
                    ].join(" ")}
                    aria-pressed={selectedDay}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <button
              type="button"
              onClick={onToday}
              className="text-body-3 text-gray-800 underline-offset-4 hover:underline"
            >
              오늘
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-label-2 rounded-full bg-gray-900 px-4 py-2 text-white transition hover:opacity-90"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
