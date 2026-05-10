export const formatQueryDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const parseQueryDate = (v: string | null): Date | null => {
  if (!v) return null;

  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;

  const y = Number(m[1]);
  const mo = Number(m[2]);
  const da = Number(m[3]);
  const dt = new Date(y, mo - 1, da);

  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== da)
    return null;

  return dt;
};
