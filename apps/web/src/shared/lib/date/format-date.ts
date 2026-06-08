import { dayjs, formatDuration } from "@recap/lib";

/**
 * 초 단위 길이를 분으로 환산한 뒤 반올림합니다.
 * 비유효·비양수 값은 0으로 처리합니다.
 */
export function secondsToMinute(seconds: number): number {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return 0;
  }
  const minutes = dayjs.duration(seconds, "seconds").asMinutes();
  return Math.round(minutes);
}

/**
 * 초 단위 길이를 가장 가까운 정수 분으로 반올림한 뒤 {@link formatDuration}과 동일한 규칙으로 문자열로 표시합니다.
 */
export function formatSecondsToMinutes(
  seconds: number,
  t: (key: string, options?: Record<string, unknown>) => string,
): string {
  if (seconds <= 0 || Number.isNaN(seconds)) {
    return formatDuration(0, t);
  }
  const totalMinutes = Math.round(seconds / 60);
  return formatDuration(totalMinutes * 60, t);
}
