import * as React from "react";
import { cn } from "@recap/ui";

import ArrowDownSvg from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowRightSvg from "@/shared/assets/icons/arrow-right.svg?react";
import ArrowUpSvg from "@/shared/assets/icons/arrow-up.svg?react";
import ClockSvg from "@/shared/assets/icons/clock.svg?react";
import EmailSvg from "@/shared/assets/icons/email.svg?react";
import FigmaSvg from "@/shared/assets/icons/figma.svg?react";
import GoogleSvg from "@/shared/assets/icons/google.svg?react";

export type IconName =
  | "arrow-up"
  | "arrow-down"
  | "figma"
  | "arrow-right"
  | "google"
  | "clock"
  | "email";

const iconRegistry: Record<
  IconName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  "arrow-up": ArrowUpSvg,
  "arrow-down": ArrowDownSvg,
  figma: FigmaSvg,
  "arrow-right": ArrowRightSvg,
  google: GoogleSvg,
  clock: ClockSvg,
  email: EmailSvg,
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  return <IconComponent className={cn(className)} {...props} />;
};

export default Icon;
