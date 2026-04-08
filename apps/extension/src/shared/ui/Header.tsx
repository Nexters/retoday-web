import type { PropsWithChildren } from "react";
import { cn } from "@recap/ui";

const Header = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("fixed top-0 z-50 left-0 right-0 bg-white", className)}>
      {children}
    </div>
  );
};

export default Header;
