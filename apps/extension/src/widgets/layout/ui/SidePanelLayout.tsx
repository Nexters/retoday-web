import type { PropsWithChildren } from "react";
import { cn } from "@recap/ui";

const SidePanelLayout = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("pt-12 pb-[7rem] w-full flex-1 ", className)}>
      {children}
    </div>
  );
};

export default SidePanelLayout;
