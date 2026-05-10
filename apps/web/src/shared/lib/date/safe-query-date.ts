export const formatLocalYYYYMMDD = (d: Date) => {
  const y = String(d.getFullYear());
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const isValidYYYYMMDD = (v: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;

  const parsed = new Date(`${v}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;

  const [y, m, d] = v.split("-").map(Number);
  return (
    parsed.getFullYear() === y &&
    parsed.getMonth() + 1 === m &&
    parsed.getDate() === d
  );
};

export const getSafeQueryDate = (
  queryValue: string | null | undefined,
  fallbackDate: Date = new Date(),
) => {
  const fallback = formatLocalYYYYMMDD(fallbackDate);
  if (!queryValue) return fallback;
  if (!isValidYYYYMMDD(queryValue)) return fallback;
  return queryValue;
};
