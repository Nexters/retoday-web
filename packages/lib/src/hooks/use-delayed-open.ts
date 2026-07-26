"use client";

import { useCallback, useEffect, useRef } from "react";

import { useDisclosure } from "./use-disclosure";

export type UseDelayedOpenOptions = {
  /** 열린 뒤 자동으로 닫히기까지 시간(ms) */
  duration?: number;
  /** duration이 끝나 자동으로 닫힐 때 */
  onAutoClose?: () => void;
};

export type UseDelayedOpenReturn = {
  open: boolean;
  /** 열고 `duration` 후 자동 close */
  start: () => void;
  close: () => void;
};

const DEFAULT_DURATION_MS = 2000;

/**
 * `start()` 호출 시 열고, `duration` 동안만 유지한 뒤 닫는다.
 * localStorage / auth 와 무관한 순수 지연 제어 훅.
 */
const useDelayedOpen = (
  options: UseDelayedOpenOptions = {},
): UseDelayedOpenReturn => {
  const { duration = DEFAULT_DURATION_MS, onAutoClose } = options;
  const [open, { open: show, close }] = useDisclosure(false);
  const timerRef = useRef<number | null>(null);
  const onAutoCloseRef = useRef(onAutoClose);
  onAutoCloseRef.current = onAutoClose;

  const clearTimer = useCallback(() => {
    if (timerRef.current == null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const start = useCallback(() => {
    clearTimer();
    show();
    timerRef.current = window.setTimeout(() => {
      close();
      timerRef.current = null;
      onAutoCloseRef.current?.();
    }, duration);
  }, [clearTimer, show, close, duration]);

  const closeAndClear = useCallback(() => {
    clearTimer();
    close();
  }, [clearTimer, close]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    open,
    start,
    close: closeAndClear,
  };
};

export { useDelayedOpen };
