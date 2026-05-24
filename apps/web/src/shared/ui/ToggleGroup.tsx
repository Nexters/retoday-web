"use client";

import * as React from "react";
import {
  cn,
  ToggleGroup as ToggleGroupPrimitive,
  ToggleGroupItem as ToggleGroupItemPrimitive,
} from "@recap/ui";

export const toggleGroupRootClassName =
  "inline-flex items-center gap-2 rounded-none border-0 bg-transparent p-0 shadow-none data-[orientation=horizontal]:rounded-none";

export const toggleGroupItemClassName = cn(
  "inline-flex shrink-0 cursor-pointer items-center rounded-2xl border-0 px-4 py-1.5 whitespace-nowrap outline-none transition-colors shadow-none ring-0 ring-offset-0",
  "data-[state=off]:bg-gray-100 data-[state=off]:text-gray-900 data-[state=off]:text-subtitle-2-rg",
  "data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=on]:text-subtitle-2-sb",
);

type ToggleGroupPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive
>;

export type ToggleGroupProps<T extends string = string> = Omit<
  ToggleGroupPrimitiveProps,
  "type" | "value" | "defaultValue" | "onValueChange"
> &
  (
    | {
        type: "single";
        value?: T;
        defaultValue?: T;
        onValueChange?: (value: T) => void;
      }
    | {
        type: "multiple";
        value?: T[];
        defaultValue?: T[];
        onValueChange?: (value: T[]) => void;
      }
  );

function ToggleGroup<T extends string = string>({
  className,
  ...props
}: ToggleGroupProps<T>) {
  return (
    <ToggleGroupPrimitive
      className={cn(toggleGroupRootClassName, className)}
      {...(props as ToggleGroupPrimitiveProps)}
    />
  );
}
ToggleGroup.displayName = "ToggleGroup";

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupItemPrimitive
>;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupItemPrimitive>,
  ToggleGroupItemProps
>(({ className, ...props }, ref) => (
  <ToggleGroupItemPrimitive
    ref={ref}
    className={cn(toggleGroupItemClassName, className)}
    {...props}
  />
));
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
