import { cn } from "@recap/ui";

const Divider = ({ className }: { className?: string }) => {
  return <div className={cn("h-2 w-full bg-gray-75", className)} />;
};

export default Divider;
