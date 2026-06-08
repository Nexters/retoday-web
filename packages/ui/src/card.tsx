import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const cardVariants = cva(
  "flex min-w-0 flex-col rounded-[1.25rem] bg-white text-gray-900",
  {
    variants: {
      variant: {
        default: "shadow-none",
        bordered: "ring-1 ring-inset ring-gray-100 shadow-none",
        elevated:
          "border border-transparent shadow-[0_1px_3px_rgb(15_23_42/0.06)] shadow-gray-900/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type CardProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
  };

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-slot="card"
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export type CardHeaderProps = React.ComponentPropsWithoutRef<"div">;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("flex shrink-0 flex-col gap-1.5 px-6 pt-6", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export type CardTitleProps = React.ComponentPropsWithoutRef<"div">;

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn("break-words text-heading-rg text-gray-800", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = React.ComponentPropsWithoutRef<"p">;

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="card-description"
    className={cn("text-body-2 m-0 min-w-0 text-gray-600", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export type CardActionProps = React.ComponentPropsWithoutRef<"div">;

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-end gap-2 self-start",
        className,
      )}
      {...props}
    />
  ),
);
CardAction.displayName = "CardAction";

export type CardContentProps = React.ComponentPropsWithoutRef<"div">;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("min-w-0 flex-1 px-6 pb-6 pt-0", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

export type CardFooterProps = React.ComponentPropsWithoutRef<"div">;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(
        "flex shrink-0 flex-wrap items-center gap-3 px-6 pb-6 pt-0",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
