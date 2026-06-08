import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const itemVariants = cva("group/item flex w-full flex-wrap items-center", {
  variants: {
    variant: {
      default: "",
      outline: "",
      muted: "",
    },
    size: {
      default: "gap-4 p-4",
      sm: "gap-2.5 px-4 py-3",
      xs: "gap-2 px-3 py-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",
        icon: "size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 shrink-0 overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ItemProps = Omit<React.ComponentPropsWithoutRef<"div">, "size"> &
  VariantProps<typeof itemVariants> & {
    asChild?: boolean;
  };

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-slot="item"
        data-variant={variant}
        data-size={size}
        className={cn(itemVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Item.displayName = "Item";

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-group"
    className={cn("flex w-full min-w-0 flex-col", className)}
    {...props}
  />
));
ItemGroup.displayName = "ItemGroup";

export interface ItemMediaProps
  extends
    React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof itemMediaVariants> {}

const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  ),
);
ItemMedia.displayName = "ItemMedia";

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-content"
    className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
    {...props}
  />
));
ItemContent.displayName = "ItemContent";

const ItemTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-title"
    className={cn("break-words text-subtitle-1-md text-gray-800", className)}
    {...props}
  />
));
ItemTitle.displayName = "ItemTitle";

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="item-description"
    className={cn("min-w-0", className)}
    {...props}
  />
));
ItemDescription.displayName = "ItemDescription";

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-actions"
    className={cn("flex shrink-0 flex-wrap items-center gap-2", className)}
    {...props}
  />
));
ItemActions.displayName = "ItemActions";

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  itemMediaVariants,
  ItemTitle,
  itemVariants,
};
