import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const STRIPED_TRACK_STYLE: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 8px)",
  backgroundColor: "rgba(234, 246, 251, 0.6)",
};

const progressVariants = cva("relative w-full overflow-hidden rounded-lg", {
  variants: {
    size: {
      default: "h-7",
      sm: "h-4",
      lg: "h-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const progressIndicatorVariants = cva("absolute inset-y-0 left-0", {
  variants: {
    variant: {
      gradient: "bg-gradient-02",
    },
  },
  defaultVariants: {
    variant: "gradient",
  },
});

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export type ProgressProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof progressVariants> &
  VariantProps<typeof progressIndicatorVariants> & {
    value?: number;
    max?: number;
    striped?: boolean;
    indicatorClassName?: string;
    trackClassName?: string;
  };

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      variant,
      striped = true,
      indicatorClassName,
      trackClassName,
      ...props
    },
    ref,
  ) => {
    const safeValue = Number.isFinite(value) ? value : 0;
    const pct = max > 0 ? clamp((safeValue / max) * 100, 0, 100) : 0;
    const remainder = 100 - pct;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={safeValue}
        data-slot="progress"
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          data-slot="progress-indicator"
          className={cn(
            progressIndicatorVariants({ variant }),
            indicatorClassName,
          )}
          style={{ width: `${pct}%` }}
        />

        {striped && remainder > 0 && (
          <div
            data-slot="progress-track"
            className={cn("absolute inset-y-0 right-0", trackClassName)}
            style={{
              width: `${remainder}%`,
              ...STRIPED_TRACK_STYLE,
            }}
          />
        )}
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { Progress, progressIndicatorVariants, progressVariants };
