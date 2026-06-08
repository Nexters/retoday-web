import type { PropsWithChildren } from "react";
import { cn } from "@recap/ui";

const SidePanelLayout = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <main
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col pt-12 pb-[7rem]",
        className,
      )}
    >
      {children}
    </main>
  );
};

export default SidePanelLayout;
