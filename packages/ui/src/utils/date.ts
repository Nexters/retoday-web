export type CalendarCell = {
  date: Date;
  inMonth: boolean;
};

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const formatYYYYMMDD = (d: Date) =>
  `${d.getFullYear()}.${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}`;

export const formatMonthLabel = (d: Date) =>
  `${d.getFullYear()}.${pad2(d.getMonth() + 1)}`;

export const startOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), 1);

export const endOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0);

export const addMonths = (d: Date, delta: number) =>
  new Date(d.getFullYear(), d.getMonth() + delta, 1);

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const getCalendarGrid = (viewMonth: Date): CalendarCell[] => {
  const first = startOfMonth(viewMonth);
  const last = endOfMonth(viewMonth);

  const leading = first.getDay();
  const daysInMonth = last.getDate();

  const cells: CalendarCell[] = [];

  for (let i = 0; i < leading; i++) {
    const d = new Date(first);
    d.setDate(1 - (leading - i));
    cells.push({ date: d, inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
      inMonth: true,
    });
  }

  const trailing = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= trailing; i++) {
    const d = new Date(last);
    d.setDate(last.getDate() + i);
    cells.push({ date: d, inMonth: false });
  }

  return cells;
};
