import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@recap/ui";

type BubbleTone = "primary" | "muted" | "tiny";

type BubbleDesignDatum = {
  id: string;
  title?: string;
  subtitle?: string;

  /** 디자인 기준(px) 값들 */
  radius: number;
  x: number; // center x (design px)
  y: number; // center y (design px)

  tone?: BubbleTone;
};

type BubbleCloudProps = {
  data: BubbleDesignDatum[];
};

const BubbleCloud = ({ data }: BubbleCloudProps) => {
  // ✅ 너가 현재 잡아둔 좌표들이 "이 기준 사이즈에서의 px" 라고 가정
  // (원본 코드 x/y 값이 이 크기에서 예쁘게 보이도록 맞춰진 값)
  const BASE_W = 520;
  const BASE_H = 280;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setSize({ w: cr.width, h: cr.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ✅ 스케일: 가로/세로 중 더 "작게" 맞춰서 전체 레이아웃이 잘리지 않게
  const scale =
    size.w > 0 && size.h > 0 ? Math.min(size.w / BASE_W, size.h / BASE_H) : 1;

  // 버블들이 실제로 차지하는 영역 계산
  const bubbleBounds = useMemo(() => {
    if (data.length === 0 || scale === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    data.forEach((b) => {
      const r = b.radius * scale;
      const x = b.x * scale;
      const y = b.y * scale;

      minX = Math.min(minX, x - r);
      minY = Math.min(minY, y - r);
      maxX = Math.max(maxX, x + r);
      maxY = Math.max(maxY, y + r);
    });

    // 여유 공간 추가 (padding)
    const padding = 20 * scale;
    return {
      minX: Math.max(0, minX - padding),
      minY: Math.max(0, minY - padding),
      maxX: Math.min(size.w, maxX + padding),
      maxY: Math.min(size.h, maxY + padding),
    };
  }, [data, scale, size.w, size.h]);

  const bgHeight = bubbleBounds.maxY - bubbleBounds.minY;

  return (
    <div className="mt-9 w-full">
      <div ref={wrapRef} className={"relative w-full overflow-hidden h-44"}>
        {/* 배경색을 버블 영역에만 적용 */}
        <div
          className="absolute w-full rounded-xl bg-[#EAFBFF]"
          style={{
            left: `${bubbleBounds.minX}px`,
            top: `${bubbleBounds.minY}px`,
            height: `${bgHeight}px`,
          }}
        />
        {data.map((b) => {
          const isTiny = b.tone === "tiny";
          const isMuted = b.tone === "muted";

          // ✅ 현재 컨테이너에 맞춘 반응형 값들
          const r = b.radius * scale;
          const x = b.x * scale;
          const y = b.y * scale;

          return (
            <div
              key={b.id}
              className={cn(
                "absolute w-full top-0 left-0 select-none",
                "flex items-center justify-center rounded-full text-center",
                "border border-white/70",
                isTiny
                  ? "shadow-[0_6px_14px_rgba(0,0,0,0.08)]"
                  : "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
                isMuted
                  ? "bg-white/70 text-gray-700"
                  : "bg-linear-to-b from-[#C8F4FF] to-[#26DFFF] text-gray-900",
              )}
              style={{
                width: r * 2,
                height: r * 2,
                transform: `translate3d(${x - r}px, ${y - r}px, 0)`,
              }}
            >
              {!isTiny && (
                <div
                  className="absolute rounded-full bg-white/20 blur-[1px]"
                  style={{ inset: Math.max(6, 10 * scale) }}
                />
              )}

              {isTiny ? (
                <div className="h-full w-full rounded-full bg-white/25" />
              ) : (
                <div className="relative z-1 flex flex-col items-center">
                  {b.title && (
                    <div
                      className="font-extrabold tracking-tight"
                      style={{
                        fontSize: b.radius >= 90 ? 28 * scale : 20 * scale,
                        lineHeight: 1.05,
                      }}
                    >
                      {b.title}
                    </div>
                  )}
                  {b.subtitle && (
                    <div
                      className="mt-1 font-semibold opacity-90"
                      style={{
                        fontSize: b.radius >= 90 ? 22 * scale : 16 * scale,
                        lineHeight: 1.1,
                      }}
                    >
                      {b.subtitle}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BubbleCloud;
