import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "./utils/cn";

const textareaVariants = cva(
  "w-full resize-none rounded-[12px] border border-solid border-gray-200 pt-3 pl-4 text-body-2 text-gray-900 placeholder:text-body-2 placeholder:text-gray-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
);

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});
TextArea.displayName = "TextArea";

export { TextArea, textareaVariants };
