import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";
import { GAP_SEMANTIC, type GapSize } from "./utils/gap-scale";

const stackVariants = cva("flex flex-col", {
  variants: {
    align: {
      stretch: "items-stretch",
      center: "items-center",
      "flex-start": "items-start",
      "flex-end": "items-end",
    },
    justify: {
      "flex-start": "justify-start",
      center: "justify-center",
      "flex-end": "justify-end",
      "space-between": "justify-between",
      "space-around": "justify-around",
    },
    gap: GAP_SEMANTIC,
  },
  defaultVariants: {
    align: "stretch",
    justify: "flex-start",
    gap: "md",
  },
});

export interface StackProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "size"
> {
  align?: VariantProps<typeof stackVariants>["align"];
  justify?: VariantProps<typeof stackVariants>["justify"];
  gap?: GapSize;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, align, justify, gap, ...props }, ref) => {
    const gapStep = gap ?? "md";

    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({ align, justify, gap: gapStep }),
          className,
        )}
        {...props}
      />
    );
  },
);
Stack.displayName = "Stack";

export { Stack, stackVariants };
