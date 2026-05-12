/**
 * PII 노출을 최소화하기 위한 정규화·식별자 헬퍼.
 */

export function pageLocationOriginOnly(href: string): string {
  try {
    const u = new URL(href);
    return `${u.protocol}//${u.host}/`;
  } catch {
    return "unknown";
  }
}

export function hostOnly(href: string): string {
  try {
    return new URL(href).host;
  } catch {
    return "unknown";
  }
}

export function randomClientId(): string {
  const head = Math.floor(Math.random() * 1_000_000_000)
    .toString()
    .padStart(10, "0");
  const tail = Math.floor(Date.now() / 1000);
  return `${head}.${tail}`;
}

export function newSessionId(): string {
  return Date.now().toString();
}

export function isValidMeasurementId(
  value: string | undefined,
): value is string {
  return typeof value === "string" && /^G-[A-Z0-9]+$/.test(value);
}
