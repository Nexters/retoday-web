"use client";

import * as React from "react";
import { cn } from "@recap/ui";

type RoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const RoundButton = React.forwardRef<HTMLButtonElement, RoundButtonProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "bg-gray-75 cursor-pointer rounded-full border border-solid border-gray-200 p-2 shadow-[inset_4px_5px_9.5px_0_#9CA5AF33] transition hover:bg-gray-100",
        className,
      )}
      {...props}
    />
  ),
);
RoundButton.displayName = "RoundButton";

export default RoundButton;
