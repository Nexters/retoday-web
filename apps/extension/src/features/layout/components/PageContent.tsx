import type { PropsWithChildren } from "react";
import { cn } from "@recap/ui";

const PageContent = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("pt-24 pb-[7rem] w-full flex-1 ", className)}>
      {children}
    </div>
  );
};
export default PageContent;
