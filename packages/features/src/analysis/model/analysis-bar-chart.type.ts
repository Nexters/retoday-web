/** Same shape as `WeeklyBarDatum` in `@recap/ui`, defined here to avoid a UI dependency. */
export type AnalysisBarChartDatum = {
  key: string;
  label: string;
  subLabel?: string;
  totalMinutes: number;
  avgMinutes: number;
  highlightLabel?: string;
};

export type AnalysisBarChartTranslateFn = (
  key: string,
  options?: Record<string, unknown>,
) => string;
