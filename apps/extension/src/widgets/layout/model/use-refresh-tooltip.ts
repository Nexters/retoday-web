import { useCallback, useEffect } from "react";
import { useDelayedOpen } from "@recap/lib";

import { useAuth } from "@/entities/auth/ui";
import { getInitialized, setInitialized } from "@/shared/lib/local-storage";

const DEFAULT_DURATION_MS = 2000;

type UseRefreshTooltipOptions = {
  duration?: number;
};

/**
 * 로그인 후에만 첫 1회 refresh tooltip을 delay 동안 노출.
 * - UI delay: `useDelayedOpen`
 * - 노출 여부: `getInitialized` / `setInitialized`
 */
export const useRefreshTooltip = (options: UseRefreshTooltipOptions = {}) => {
  const { duration = DEFAULT_DURATION_MS } = options;
  const { isReady, isLoggedIn } = useAuth();

  const handleAutoClose = useCallback(() => {
    setInitialized(true);
  }, []);

  const { open, start, close } = useDelayedOpen({
    duration,
    onAutoClose: handleAutoClose,
  });

  useEffect(() => {
    if (!isReady || !isLoggedIn) {
      close();
      return;
    }

    if (getInitialized()) return;

    start();

    return () => {
      close();
    };
  }, [isReady, isLoggedIn, start, close]);

  return { open };
};
