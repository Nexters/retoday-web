/** Flex / Stack 공통 간격 단계(Mantine-style) */
export const GAP_SEMANTIC = {
  none: "",
  xs: "gap-2.5",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
  xl: "gap-8",
} as const;

export const GAP_X_SEMANTIC = {
  none: "",
  xs: "gap-x-2.5",
  sm: "gap-x-3",
  md: "gap-x-4",
  lg: "gap-x-5",
  xl: "gap-x-8",
} as const;

export const GAP_Y_SEMANTIC = {
  none: "",
  xs: "gap-y-2.5",
  sm: "gap-y-3",
  md: "gap-y-4",
  lg: "gap-y-5",
  xl: "gap-y-8",
} as const;

export type GapSize = keyof typeof GAP_SEMANTIC;
