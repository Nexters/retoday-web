import { cn } from "./cn";

export type GridColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridTemplateColsBreakpoints {
  base?: GridColumnCount;
  sm?: GridColumnCount;
  md?: GridColumnCount;
  lg?: GridColumnCount;
  xl?: GridColumnCount;
}

const BP_PREFIX = {
  base: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
} as const;

function colsSegment(bp: keyof typeof BP_PREFIX, n: GridColumnCount): string {
  return `${BP_PREFIX[bp]}grid-cols-${n}`;
}

export function gridTemplateColsClass(
  cols: GridColumnCount | GridTemplateColsBreakpoints | undefined,
): string {
  if (cols === undefined) {
    return colsSegment("base", 1);
  }
  if (typeof cols === "number") {
    return colsSegment("base", cols);
  }
  return cn(
    colsSegment("base", cols.base ?? 1),
    cols.sm !== undefined && colsSegment("sm", cols.sm),
    cols.md !== undefined && colsSegment("md", cols.md),
    cols.lg !== undefined && colsSegment("lg", cols.lg),
    cols.xl !== undefined && colsSegment("xl", cols.xl),
  );
}
