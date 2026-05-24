import * as React from "react";

import { cn } from "./utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    { className, orientation = "horizontal", role = "separator", ...props },
    ref,
  ) => (
    <div
      ref={ref}
      role={role}
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
      data-orientation={orientation}
      className={cn(
        "shrink-0 bg-gray-200",
        orientation === "horizontal"
          ? "h-px min-w-0 w-full"
          : "h-14 w-px self-center",
        className,
      )}
      {...props}
    />
  ),
);
Divider.displayName = "Divider";

export { Divider };
