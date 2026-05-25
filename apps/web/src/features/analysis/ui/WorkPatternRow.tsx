import type { WorkPatternDayType } from "@recap/api";
import { Item, ItemContent, Progress } from "@recap/ui";
import { ItemMedia } from "@recap/ui";

import AfterNoonIcon from "@/shared/assets/icons/afternoon.svg";
import EveningIcon from "@/shared/assets/icons/evening.svg";
import MorningIcon from "@/shared/assets/icons/morning.svg";
import NightIcon from "@/shared/assets/icons/night.svg";

const WORK_PATTERN_ICONS: Record<
  WorkPatternDayType,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  MORNING: MorningIcon,
  DAYTIME: AfterNoonIcon,
  EVENING: EveningIcon,
  DAWN: NightIcon,
};

const WorkPatternRow = ({
  pattern,
  ratio,
}: {
  pattern: WorkPatternDayType;
  ratio: number;
}) => {
  const PatternIcon = WORK_PATTERN_ICONS[pattern];

  const clamped = Number.isFinite(ratio) ? Math.max(0, Math.min(1, ratio)) : 0;
  const pct = Math.round(clamped * 100);

  return (
    <Item className="flex-nowrap items-center gap-5 rounded-none border-0 bg-transparent p-0 shadow-none">
      <ItemMedia variant="icon" className="size-7 [&_svg]:size-7">
        <PatternIcon />
      </ItemMedia>

      <ItemContent className="min-w-0 flex-1 flex-row">
        <Progress value={pct} className="w-full" />
      </ItemContent>
    </Item>
  );
};

export default WorkPatternRow;
