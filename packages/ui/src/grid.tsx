import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "./utils/cn";
import {
  GAP_SEMANTIC,
  GAP_X_SEMANTIC,
  GAP_Y_SEMANTIC,
  type GapSize,
} from "./utils/gap-scale";
import {
  type GridColumnCount,
  type GridTemplateColsBreakpoints,
  gridTemplateColsClass,
} from "./utils/grid-template-cols";

const gridVariants = cva("grid", {
  variants: {
    gap: GAP_SEMANTIC,
    columnGap: GAP_X_SEMANTIC,
    rowGap: GAP_Y_SEMANTIC,
  },
  defaultVariants: {
    gap: "none",
    columnGap: "none",
    rowGap: "none",
  },
});

export type GridCols = GridColumnCount | GridTemplateColsBreakpoints;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  columnGap?: GapSize;
  gap?: GapSize;
  rowGap?: GapSize;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, columnGap, rowGap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        gridVariants({
          gap: gap ?? "none",
          columnGap: columnGap ?? "none",
          rowGap: rowGap ?? "none",
        }),
        gridTemplateColsClass(cols),
        className,
      )}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";

export { Grid, gridVariants };
