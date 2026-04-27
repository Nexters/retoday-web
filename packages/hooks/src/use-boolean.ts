import { useCallback, useState } from "react";

type UseBooleanReturn = {
  value: boolean;
  setValue: (next: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setInternalValue] = useState(initialValue);

  const setValue = useCallback((next: boolean) => {
    setInternalValue(next);
  }, []);

  const setTrue = useCallback(() => {
    setInternalValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setInternalValue(false);
  }, []);

  const toggle = useCallback(() => {
    setInternalValue((prev) => !prev);
  }, []);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
};

export { useBoolean };
export type { UseBooleanReturn };
