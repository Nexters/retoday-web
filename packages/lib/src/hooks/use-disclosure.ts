"use client";

import { useCallback, useState } from "react";

export interface UseDisclosureOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseDisclosureHandlers {
  set: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers];

const useDisclosure = (
  initialState = false,
  options: UseDisclosureOptions = {},
): UseDisclosureReturnValue => {
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened((current) => {
      if (!current) {
        options.onOpen?.();
        return true;
      }

      return current;
    });
  }, [options.onOpen]);

  const close = useCallback(() => {
    setOpened((current) => {
      if (current) {
        options.onClose?.();
        return false;
      }

      return current;
    });
  }, [options.onClose]);

  const toggle = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    opened ? close() : open();
  }, [opened, open, close]);

  return [
    opened,
    {
      set: setOpened,
      open,
      close,
      toggle,
    },
  ];
};

export { useDisclosure };
