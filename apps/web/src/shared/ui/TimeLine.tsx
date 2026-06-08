"use client";

import { useMemo } from "react";
import { cn } from "@recap/ui";

import TimeLineBackgroundImg from "@/shared/assets/img/timeline-bg.png";
import { useCustomScrollbar } from "@/shared/lib/use-custom-scrollbar";

export type TimelineDatum = {
  id: string;
  title: string;
  startedAt: string;
  endedAt: string;
  durationLabel: string;
};

type TimeLineProps = {
  data?: TimelineDatum[];
  emptyMessage?: string;
  className?: string;
};

const TimeLine = ({
  data: propData,
  emptyMessage,
  className,
}: TimeLineProps) => {
  const data = useMemo(() => propData ?? [], [propData]);
  const isEmpty = data.length === 0;

  const {
    scrollerRef,
    trackRef,
    thumbStyle,
    onThumbPointerDown,
    onThumbPointerMove,
    onThumbPointerUp,
    onTrackPointerDown,
  } = useCustomScrollbar({
    padding: 4,
    thumbWidthSize: 13,
    thumbHeightSize: 90,
  });

  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${TimeLineBackgroundImg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <div className={cn("relative mr-4 w-full min-w-0", className)}>
      <div
        ref={trackRef}
        className="absolute top-0 right-0 z-20 h-full w-3 rounded-full bg-gray-200"
        onPointerDown={onTrackPointerDown}
      >
        <div
          className="absolute left-1/2 rounded-full bg-white shadow-sm"
          style={thumbStyle}
          onPointerDown={onThumbPointerDown}
          onPointerMove={onThumbPointerMove}
          onPointerUp={onThumbPointerUp}
          onPointerCancel={onThumbPointerUp}
        />
      </div>

      <div
        className="relative mr-6 overflow-hidden rounded-[1.25rem] px-6"
        style={bgStyle}
      >
        <div className="pointer-events-none absolute top-0 bottom-0 left-11 w-0.5 bg-white" />

        <div
          ref={scrollerRef}
          className="h-96 overflow-y-auto overscroll-contain py-6"
          style={{ scrollbarWidth: "none" }}
        >
          {isEmpty ? (
            <div className="text-body-1 text-gray-500">{emptyMessage}</div>
          ) : (
            <div className="relative ml-3.25 space-y-4">
              {data.map((item) => (
                <div key={item.id} className="flex items-center gap-9">
                  <div className="relative flex items-center">
                    <div
                      className="size-4 rounded-full border border-white"
                      style={bgStyle}
                    />
                  </div>

                  <div className="bg-gray-75 flex w-full items-center justify-between rounded-xl p-4">
                    <p className="text-headline-md text-gray-900">
                      {item.title}
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-body-1 text-gray-500">
                        {item.durationLabel}
                      </p>

                      <div className="size-1 rounded-full bg-gray-200" />

                      <p className="text-body-1 text-gray-500">
                        {`${item.startedAt} - ${item.endedAt}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
