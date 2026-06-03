/** Same shape as `BubbleDatum` in app UI, defined here to avoid a UI dependency. */
export type CategoryBubbleDatum = {
  id: string;
  title?: string;
  subtitle?: string;
  radius: number;
  mass: number;
  tone?: "primary" | "muted" | "tiny";
};

export type CategoryBubbleTranslateFn = (
  key: string,
  options?: Record<string, unknown>,
) => string;
