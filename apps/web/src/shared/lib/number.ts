export const clampNumber = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
};

export const safeDivide = (
  numerator: number,
  denominator: number,
  fallback = 0,
) => {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    return fallback;
  }

  if (denominator === 0) {
    return fallback;
  }

  return numerator / denominator;
};

export const roundNumber = (value: number, digits = 3) => {
  if (!Number.isFinite(value)) return 0;

  const multiplier = 10 ** digits;

  return Math.round(value * multiplier) / multiplier;
};

export const toRatio = ({
  value,
  total,
  digits = 3,
}: {
  value: number;
  total: number;
  digits?: number;
}) => {
  const ratio = safeDivide(value, total, 0);

  return roundNumber(clampNumber(ratio, 0, 1), digits);
};
