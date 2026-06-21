import * as React from "react";

import { cn } from "./utils/cn";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    data-slot="alert"
    className={cn(
      "flex flex-col gap-2 rounded-[12px] border-0 bg-gray-100 p-4",
      className,
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn(
      "flex items-start gap-2 text-body-3 text-gray-900 [&_svg]:mt-1 [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription };
