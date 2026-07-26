"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import ErrorIcon from "./assets/error-icon";
import SuccessIcon from "./assets/success-icon";
import { cn } from "./utils/cn";

type ToastType = "success" | "error";

type ShowToastOptions = {
  message: React.ReactNode;
  type: ToastType;
  duration?: number;
};

type ToastItem = Omit<ShowToastOptions, "duration"> & {
  id: number;
  duration: number;
};

type ToastContextValue = {
  showToast: (options: ShowToastOptions) => number;
  dismissToast: (id: number) => void;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_DURATION = 3000;

const ToastContext = React.createContext<ToastContextValue | null>(null);

function ToastIcon({ type }: { type: ToastType }) {
  const Icon = type === "success" ? SuccessIcon : ErrorIcon;

  return <Icon className="size-5 shrink-0" aria-hidden="true" />;
}

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  React.useEffect(() => {
    if (toast.duration === 0) return;

    const timeout = window.setTimeout(
      () => onDismiss(toast.id),
      toast.duration,
    );

    return () => window.clearTimeout(timeout);
  }, [onDismiss, toast.duration, toast.id]);

  return (
    <div
      role={toast.type === "error" ? "alert" : "status"}
      data-type={toast.type}
      className={cn(
        "pointer-events-auto flex max-w-full items-center gap-[12px] rounded-[16px] bg-[#292929]/50 p-[20px] text-subtitle-2-sb text-white shadow-lg",
        "animate-in fade-in-0 slide-in-from-top-2",
      )}
    >
      <ToastIcon type={toast.type} />
      <div className="min-w-0">{toast.message}</div>
    </div>
  );
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const nextId = React.useRef(0);

  const dismissToast = React.useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = React.useCallback(
    ({ message, type, duration = DEFAULT_DURATION }: ShowToastOptions) => {
      const id = nextId.current++;

      setToasts((current) => [
        ...current,
        { id, message, type, duration: Math.max(0, duration) },
      ]);

      return id;
    },
    [],
  );

  const value = React.useMemo(
    () => ({ showToast, dismissToast }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-4 top-12 z-50 flex flex-col items-center gap-2">
            {toasts.map((toast) => (
              <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

export {
  type ShowToastOptions,
  ToastProvider,
  type ToastProviderProps,
  type ToastType,
  useToast,
};
