import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";
import {
  GAP_SEMANTIC,
  GAP_X_SEMANTIC,
  GAP_Y_SEMANTIC,
  type GapSize,
} from "./utils/gap-scale";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
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
    columnGap: GAP_X_SEMANTIC,
    rowGap: GAP_Y_SEMANTIC,
  },
  defaultVariants: {
    direction: "row",
    wrap: "nowrap",
    align: "stretch",
    justify: "flex-start",
    gap: "none",
    columnGap: "none",
    rowGap: "none",
  },
});

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: VariantProps<typeof flexVariants>["align"];
  columnGap?: GapSize;
  direction?: VariantProps<typeof flexVariants>["direction"];
  gap?: GapSize;
  justify?: VariantProps<typeof flexVariants>["justify"];
  rowGap?: GapSize;
  size?: GapSize;
  wrap?: VariantProps<typeof flexVariants>["wrap"];
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      align,
      columnGap,
      direction,
      gap,
      justify,
      rowGap,
      wrap,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({
            direction,
            wrap,
            align,
            justify,
            gap: gap ?? "none",
            columnGap: columnGap ?? "none",
            rowGap: rowGap ?? "none",
          }),
          className,
        )}
        {...props}
      />
    );
  },
);
Flex.displayName = "Flex";

export { Flex, flexVariants };
