import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "./utils/cn";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-lg border border-solid border-gray-200 bg-white pl-4 pr-3 py-[0.4375rem] text-body-2 text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <svg
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.956099 0.000976563L1.07915 0.0126953L1.09379 0.0146484L1.10747 0.0166016C1.13762 0.0224247 1.16642 0.0299782 1.19243 0.0380859L1.26372 0.0634766C1.27988 0.069881 1.29357 0.076536 1.30083 0.0800781C1.30387 0.0815878 1.30871 0.0845181 1.30961 0.0849609C1.31076 0.0855242 1.31143 0.0858716 1.31157 0.0859375C1.34162 0.100005 1.37351 0.115871 1.40532 0.135742L1.46001 0.172852C1.49303 0.197002 1.53785 0.230575 1.5811 0.274414L1.58012 0.275391L7.79692 6.48926L14.0157 0.271484C14.1941 0.0933067 14.4182 0.000326166 14.67 0.00195313C14.7521 0.00255891 14.8268 0.0150762 14.8916 0.03125L15.0069 0.0683594L15.0411 0.0830078C15.0844 0.102479 15.1244 0.124642 15.1612 0.148438L15.1622 0.149414C15.1762 0.158565 15.1893 0.167545 15.1954 0.171875L15.1944 0.172852C15.2259 0.195332 15.2755 0.229389 15.3223 0.276367L15.3213 0.277344C15.3432 0.299305 15.3645 0.32138 15.3838 0.344727L15.4375 0.416016C15.516 0.531085 15.5638 0.658623 15.5831 0.792969L15.5928 0.929688C15.5928 0.991148 15.5856 1.04704 15.5782 1.09082C15.5744 1.1128 15.5675 1.13936 15.5665 1.14355C15.5581 1.17924 15.5473 1.21407 15.5352 1.24707C15.5338 1.25087 15.5238 1.27998 15.5127 1.30469C15.4954 1.34331 15.4714 1.39267 15.4375 1.44238C15.4046 1.4907 15.3653 1.53796 15.3213 1.58203L8.95708 7.94922H8.95805L8.89653 8.00391C8.75027 8.13758 8.58514 8.24413 8.39946 8.31348L8.31743 8.34082C8.1989 8.37917 8.07578 8.40698 7.95024 8.41895L7.9434 8.41992H7.93657L7.81254 8.42578H7.7979C7.72591 8.42578 7.65484 8.42092 7.58696 8.41211C7.57255 8.41022 7.55933 8.40763 7.5518 8.40625C7.5428 8.4046 7.54053 8.40375 7.53813 8.40332C7.42513 8.38517 7.31005 8.35655 7.19536 8.31348C7.12918 8.28858 7.06622 8.25886 7.00688 8.22656V8.22559C6.9788 8.21038 6.94765 8.19319 6.91704 8.17383C6.91609 8.17325 6.91518 8.1731 6.91313 8.17188C6.90943 8.16964 6.90082 8.1643 6.89165 8.1582V8.15723C6.88166 8.15061 6.87133 8.14479 6.86528 8.14063L6.85454 8.13281L6.77348 8.07129L6.76469 8.06445C6.72102 8.02873 6.67914 7.98964 6.63872 7.94922L0.269575 1.58301C0.0901294 1.40355 -0.0023167 1.17828 4.41052e-05 0.924805C0.00128151 0.803184 0.0236549 0.683164 0.0713332 0.570312C0.118893 0.45813 0.188913 0.359045 0.274458 0.273438C0.316325 0.231618 0.362987 0.191169 0.414107 0.15625C0.567115 0.0519681 0.741928 0.000605977 0.926802 0L0.94145 0L0.956099 0.000976563Z"
          fill="#464D53"
        />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-xl border border-solid border-gray-200 bg-white shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "max-h-[300px] overflow-y-auto p-1",
          position === "popper" &&
            "w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-body-3 font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-body-2 outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
