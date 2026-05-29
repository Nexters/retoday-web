export const padNumber = (value: number, length = 2): string =>
  String(Math.trunc(value)).padStart(length, "0");
