"use client";

import { useCustomScrollbar } from "@/app/ai-recap/src/hooks/useCustomScrollbar";
import type { NormalizedRecap } from "@/app/ai-recap/src/types/recap";
import TimeLineBackgroundImg from "@/assets/img/timeline-bg.png";

const Timeline = ({ recap }: { recap: NormalizedRecap }) => {
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
    <div className="relative flex gap-9 rounded-[1.25rem] bg-white px-9 py-8">
      <div className="max-w-57 space-y-2">
        <p className="text-heading-rg text-gray-800">AI 타임라인</p>
        <h2 className="text-title-1 text-gray-900">
          Retoday가 요약한 오늘 하루의 흐름
        </h2>
      </div>

      <div
        ref={trackRef}
        className="absolute top-8 right-6 z-0 h-[calc(100%-4rem)] w-3 rounded-full bg-gray-200"
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
        className="relative z-10 mr-4 w-full overflow-hidden rounded-[1.25rem] px-6"
        style={bgStyle}
      >
        <div className="pointer-events-none absolute top-0 bottom-0 left-11 w-0.5 bg-white" />

        <div
          ref={scrollerRef}
          className="h-96 overflow-y-auto overscroll-contain py-6"
          style={{ scrollbarWidth: "none" }}
        >
          {recap.timelines.length === 0 ? (
            <div className="text-body-1 text-gray-500">
              타임라인 데이터가 없어요
            </div>
          ) : (
            <div className="relative ml-3.25 space-y-4">
              {recap.timelines.map((timeline, index) => {
                return (
                  <div
                    className="flex items-center gap-9"
                    key={`${timeline.title}-${index}`}
                  >
                    <div className="relative flex items-center">
                      <div
                        className="size-4 rounded-full border border-white"
                        style={bgStyle}
                      />
                    </div>

                    <div className="bg-gray-75 flex w-full items-center justify-between rounded-xl p-4">
                      <p className="text-headline-md text-gray-900">
                        {timeline.title}
                      </p>

                      <div className="flex items-center gap-2">
                        <p className="text-body-1 text-gray-500">
                          {formatDuration(timeline.durationMinutes)}
                        </p>

                        <div className="size-1 rounded-full bg-gray-200" />

                        <p className="text-body-1 text-gray-500">
                          {`${timeline.startedAt} - ${timeline.endedAt}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  if (restMinutes === 0) return `${hours}h`;
  return `${hours}h ${restMinutes}m`;
};
