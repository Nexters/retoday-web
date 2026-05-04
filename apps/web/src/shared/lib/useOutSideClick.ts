import { type RefObject, useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean,
  onOutside: () => void,
) => {
  useEffect(() => {
    if (!enabled) return;

    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const el = ref.current;

      if (!el) return;

      if (e.target instanceof Node && !el.contains(e.target)) {
        onOutside();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [ref, enabled, onOutside]);
};
