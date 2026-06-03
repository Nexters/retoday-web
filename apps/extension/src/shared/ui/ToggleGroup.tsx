import * as React from "react";
import {
  cn,
  ToggleGroup as BaseToggleGroup,
  ToggleGroupItem as BaseToggleGroupItem,
} from "@recap/ui";

type ToggleGroupPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof BaseToggleGroup
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
    <BaseToggleGroup
      className={cn(className)}
      {...(props as ToggleGroupPrimitiveProps)}
    />
  );
}
ToggleGroup.displayName = "ToggleGroup";

type ToggleGroupItemProps = React.ComponentPropsWithoutRef<
  typeof BaseToggleGroupItem
>;
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof BaseToggleGroupItem>,
  ToggleGroupItemProps
>(({ className, ...props }, ref) => (
  <BaseToggleGroupItem
    ref={ref}
    className={cn(
      "text-gray-500 border border-solid border-gray-200 bg-gray-200 text-subtitle-2-rg py-1 px-3",
      "data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:text-subtitle-2-sb",
      className,
    )}
    {...props}
  />
));
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
