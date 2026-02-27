import * as React from "react";
import {
  cn,
  ToggleGroup as BaseToggleGroup,
  ToggleGroupItem as BaseToggleGroupItem,
} from "@recap/ui";

type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof BaseToggleGroup>;
const ToggleGroup = ({ className, ...props }: ToggleGroupProps) => {
  return <BaseToggleGroup className={cn(className)} {...props} />;
};

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
