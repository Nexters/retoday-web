import * as React from "react";
import { cn, WeeklyBarChart, type WeeklyBarDatum } from "@recap/ui";

type Props = React.ComponentPropsWithoutRef<typeof WeeklyBarChart> & {
  data: WeeklyBarDatum[];
};

const ScreenTimeWeeklyBarChart = ({ className, ...props }: Props) => {
  return (
    <WeeklyBarChart
      className={className}
      {...props}
      labelClassName={cn("text-gray-500")}
      barWrapClassName={cn(
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] overflow-hidden rounded-xl transition-transform duration-150 group-hover:-translate-y-[1px]",
      )}
      barClassName={cn("bg-gradient-03")}
      tooltipContentClassName={cn(
        "rounded-xl bg-white px-4 py-3 text-sm text-gray-900 shadow-lg ring-1 ring-black/10",
      )}
    />
  );
};

export default ScreenTimeWeeklyBarChart;
