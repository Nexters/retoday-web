import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useRef,
} from "react";

export function useUpdateEffect(
  callback: EffectCallback,
  deps?: DependencyList,
): void {
  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    return callback();
  }, deps);
}
