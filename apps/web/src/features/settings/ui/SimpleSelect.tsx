"use client";

import * as React from "react";
import { cn } from "@recap/ui";

type Option = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type SimpleSelectProps = {
  value: string;
  onValueChange: (next: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  maxMenuHeight?: number;
};

export function SimpleSelect({
  value,
  onValueChange,
  options,
  placeholder,
  disabled,
  className,
  contentClassName,
  maxMenuHeight = 300,
}: SimpleSelectProps) {
  const [open, setOpen] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const selected = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target as Node)) return;
      setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const onPick = (next: Option) => {
    if (next.disabled) return;
    onValueChange(next.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className="relative inline-block" onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (disabled) return;
          setOpen((v) => !v);
        }}
        className={cn(
          "text-body-2 flex h-10 w-full items-center justify-between rounded-lg border border-solid border-gray-200 bg-white py-1.75 pr-3 pl-4 text-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <span className={cn(!selected && "text-gray-400")}>
          {selected ? selected.label : (placeholder ?? "선택")}
        </span>

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={cn("opacity-50 transition", open && "rotate-180")}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12.525 14.475L16.15 10.85C16.2 10.8 16.2375 10.7458 16.2625 10.6875C16.2875 10.6292 16.3 10.5667 16.3 10.5C16.3 10.3667 16.2542 10.25 16.1625 10.15C16.0709 10.05 15.95 10 15.8 10L8.20005 10C8.05005 10 7.92921 10.05 7.83755 10.15C7.74588 10.25 7.70005 10.3667 7.70005 10.5C7.70005 10.5333 7.75005 10.65 7.85005 10.85L11.475 14.475C11.5584 14.5583 11.6417 14.6167 11.725 14.65C11.8084 14.6833 11.9 14.7 12 14.7C12.1 14.7 12.1917 14.6833 12.275 14.65C12.3584 14.6167 12.4417 14.5583 12.525 14.475Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-solid border-gray-200 bg-white shadow-md",
            contentClassName,
          )}
          style={{ maxHeight: maxMenuHeight }}
        >
          <div className="max-h-[inherit] overflow-y-auto p-1">
            {options.map((opt) => {
              const isSelected = opt.value === value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => onPick(opt)}
                  className={cn(
                    "text-body-2 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition outline-none",
                    opt.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-100",
                  )}
                >
                  <span>{opt.label}</span>

                  {isSelected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
