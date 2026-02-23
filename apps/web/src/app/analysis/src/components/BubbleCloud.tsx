"use client";

import { useMemo, useRef } from "react";
import { cn } from "@recap/ui";

export type BubbleDatum = {
  id: string;
  title?: string;
  subtitle?: string;
  radius: number;
  mass: number;
  tone?: "primary" | "muted" | "tiny";
};

type BubbleBody = BubbleDatum & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pinned: boolean;
  sleeping: boolean;
  sleepFrames: number;
};

type Props = {
  data?: BubbleDatum[];
};

const BubbleCloudFalling = ({ data: propData }: Props) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bubbleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // const rafRef = useRef<number | null>(null);

  const bodiesRef = useRef<BubbleBody[]>([]);
  const draggingRef = useRef<{
    id: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    lastX: number;
    lastY: number;
    lastT: number;
  } | null>(null);

  // ✅ prop이 없으면 기존 더미 사용
  const data = useMemo<BubbleDatum[]>(
    () =>
      propData ?? [
        {
          id: "b1",
          title: "쇼핑",
          subtitle: "35%",
          radius: 112,
          mass: 2.3,
          tone: "primary",
        },
        {
          id: "b2",
          title: "쇼핑",
          subtitle: "20%",
          radius: 96,
          mass: 1.9,
          tone: "primary",
        },
        {
          id: "b3",
          title: "키워드",
          subtitle: "3시간",
          radius: 82,
          mass: 1.5,
          tone: "primary",
        },
        {
          id: "b4",
          title: "키워드",
          subtitle: "3시간",
          radius: 72,
          mass: 1.2,
          tone: "muted",
        },
        {
          id: "b5",
          title: "키워드",
          subtitle: "3시간",
          radius: 78,
          mass: 1.3,
          tone: "muted",
        },
        { id: "s1", radius: 28, mass: 0.55, tone: "tiny" },
        { id: "s2", radius: 20, mass: 0.45, tone: "tiny" },
        { id: "s3", radius: 32, mass: 0.6, tone: "tiny" },
      ],
    [propData],
  );

  // ---- 이하 너 코드 그대로 (생략 없이 유지 가능) ----
  // useEffect(() => {
  //   const wrap = wrapRef.current;
  //   if (!wrap) return;

  //   const rect = wrap.getBoundingClientRect();
  //   const W = rect.width;

  //   const initialBodies: BubbleBody[] = data.map((b, i) => {
  //     const col = i % 5;
  //     const x = ((col + 1) / 6) * W + (Math.random() * 30 - 15);
  //     const y = -80 - i * 55 + (Math.random() * 20 - 10);
  //     return {
  //       ...b,
  //       x,
  //       y,
  //       vx: (Math.random() - 0.5) * 0.6,
  //       vy: 0,
  //       pinned: false,
  //       sleeping: false,
  //       sleepFrames: 0,
  //     };
  //   });

  //   bodiesRef.current = initialBodies;

  //   const gravity = 0.00155;
  //   const airDamping = 0.992;
  //   const floorFriction = 0.88;
  //   const restitution = 0.18;
  //   const wallRestitution = 0.22;

  //   const sleepVel = 0.02;
  //   const sleepFramesNeed = 40;

  //   let last = performance.now();

  //   const tick = (now: number) => {
  //     const dt = Math.min(32, now - last);
  //     last = now;

  //     const el = wrapRef.current;
  //     if (!el) return;

  //     const r = el.getBoundingClientRect();
  //     const W = r.width;
  //     const H = r.height;

  //     const list = bodiesRef.current;

  //     for (const b of list) {
  //       if (b.pinned) continue;

  //       if (b.sleeping) {
  //         if (b.x - b.radius < 0 || b.x + b.radius > W || b.y + b.radius > H) {
  //           b.sleeping = false;
  //           b.sleepFrames = 0;
  //         } else {
  //           continue;
  //         }
  //       }

  //       b.vy += gravity * dt;

  //       b.vx *= airDamping;
  //       b.vy *= airDamping;

  //       b.x += b.vx * dt;
  //       b.y += b.vy * dt;
  //     }

  //     for (const b of list) {
  //       const rad = b.radius;

  //       if (b.x - rad < 0) {
  //         b.x = rad;
  //         b.vx = Math.abs(b.vx) * wallRestitution;
  //       } else if (b.x + rad > W) {
  //         b.x = W - rad;
  //         b.vx = -Math.abs(b.vx) * wallRestitution;
  //       }

  //       if (b.y - rad < 0) {
  //         b.y = rad;
  //         b.vy = Math.abs(b.vy) * wallRestitution;
  //       }

  //       if (b.y + rad > H) {
  //         b.y = H - rad;
  //         b.vy = -Math.abs(b.vy) * restitution;
  //         b.vx *= floorFriction;
  //         if (Math.abs(b.vy) < 0.02) b.vy = 0;
  //       }
  //     }

  //     for (let i = 0; i < list.length; i++) {
  //       for (let j = i + 1; j < list.length; j++) {
  //         const a = list[i];
  //         const b = list[j];

  //         const dx = b.x - a.x;
  //         const dy = b.y - a.y;
  //         const dist2 = dx * dx + dy * dy;
  //         const minDist = a.radius + b.radius;

  //         if (dist2 === 0) continue;
  //         if (dist2 < minDist * minDist) {
  //           const dist = Math.sqrt(dist2);
  //           const nx = dx / dist;
  //           const ny = dy / dist;

  //           const overlap = minDist - dist;

  //           a.sleeping = false;
  //           b.sleeping = false;
  //           a.sleepFrames = 0;
  //           b.sleepFrames = 0;

  //           const totalMass = a.mass + b.mass;
  //           const aMove = (b.mass / totalMass) * overlap;
  //           const bMove = (a.mass / totalMass) * overlap;

  //           if (!a.pinned) {
  //             a.x -= nx * aMove;
  //             a.y -= ny * aMove;
  //           }
  //           if (!b.pinned) {
  //             b.x += nx * bMove;
  //             b.y += ny * bMove;
  //           }

  //           const rvx = b.vx - a.vx;
  //           const rvy = b.vy - a.vy;
  //           const velAlongNormal = rvx * nx + rvy * ny;

  //           if (velAlongNormal > 0) continue;

  //           const e = restitution;
  //           const jImpulse =
  //             (-(1 + e) * velAlongNormal) / (1 / a.mass + 1 / b.mass);

  //           const ix = jImpulse * nx;
  //           const iy = jImpulse * ny;

  //           if (!a.pinned) {
  //             a.vx -= (1 / a.mass) * ix;
  //             a.vy -= (1 / a.mass) * iy;
  //           }
  //           if (!b.pinned) {
  //             b.vx += (1 / b.mass) * ix;
  //             b.vy += (1 / b.mass) * iy;
  //           }

  //           const tangentX = -ny;
  //           const tangentY = nx;
  //           const vt = rvx * tangentX + rvy * tangentY;
  //           const friction = 0.03;
  //           const fImpulse = -vt * friction;

  //           if (!a.pinned) {
  //             a.vx -= (1 / a.mass) * fImpulse * tangentX;
  //             a.vy -= (1 / a.mass) * fImpulse * tangentY;
  //           }
  //           if (!b.pinned) {
  //             b.vx += (1 / b.mass) * fImpulse * tangentX;
  //             b.vy += (1 / b.mass) * fImpulse * tangentY;
  //           }
  //         }
  //       }
  //     }

  //     for (const b of list) {
  //       if (b.pinned) continue;

  //       const speed = Math.hypot(b.vx, b.vy);
  //       const onFloor = b.y + b.radius >= H - 0.5;

  //       if (onFloor && speed < sleepVel) {
  //         b.sleepFrames += 1;
  //         if (b.sleepFrames >= sleepFramesNeed) {
  //           b.sleeping = true;
  //           b.vx = 0;
  //           b.vy = 0;
  //         }
  //       } else {
  //         b.sleepFrames = 0;
  //       }
  //     }

  //     for (const b of list) {
  //       const node = bubbleRefs.current[b.id];
  //       if (!node) continue;
  //       node.style.transform = `translate3d(${b.x - b.radius}px, ${
  //         b.y - b.radius
  //       }px, 0)`;
  //     }

  //     rafRef.current = requestAnimationFrame(tick);
  //   };

  //   rafRef.current = requestAnimationFrame(tick);

  //   return () => {
  //     if (rafRef.current) cancelAnimationFrame(rafRef.current);
  //   };
  // }, [data]);

  const onPointerDown = (id: string) => (e: React.PointerEvent) => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const b = bodiesRef.current.find((x) => x.id === id);
    if (!b) return;

    draggingRef.current = {
      id,
      pointerId: e.pointerId,
      offsetX: px - b.x,
      offsetY: py - b.y,
      lastX: px,
      lastY: py,
      lastT: performance.now(),
    };

    b.pinned = true;
    b.sleeping = false;
    b.sleepFrames = 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = draggingRef.current;
    const wrap = wrapRef.current;
    if (!d || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const b = bodiesRef.current.find((x) => x.id === d.id);
    if (!b) return;

    b.x = px - d.offsetX;
    b.y = py - d.offsetY;

    d.lastX = px;
    d.lastY = py;
  };

  const onPointerUp = () => {
    const d = draggingRef.current;
    if (!d) return;

    const b = bodiesRef.current.find((x) => x.id === d.id);
    if (b) {
      b.pinned = false;
      b.sleeping = false;
      b.sleepFrames = 0;

      b.vx += (Math.random() - 0.5) * 0.15;
      b.vy += (Math.random() - 0.5) * 0.15;
    }

    draggingRef.current = null;
  };

  return (
    <div className="mt-9 w-full">
      <div
        ref={wrapRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          "relative w-full overflow-hidden rounded-[36px] border border-white/60",
          "bg-[#EAFBFF] shadow-[0_10px_40px_rgba(0,0,0,0.06)]",
          "h-105",
        )}
      >
        {data.map((b) => {
          const isTiny = b.tone === "tiny";
          const isMuted = b.tone === "muted";

          return (
            <div
              key={b.id}
              ref={(node) => {
                bubbleRefs.current[b.id] = node;
              }}
              onPointerDown={onPointerDown(b.id)}
              className={cn(
                "absolute top-0 left-0 touch-none will-change-transform select-none",
                "flex items-center justify-center rounded-full text-center",
                "border border-white/70",
                isTiny
                  ? "shadow-[0_6px_14px_rgba(0,0,0,0.08)]"
                  : "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
                isMuted
                  ? "bg-white/70 text-gray-700"
                  : "bg-linear-to-b from-[#C8F4FF] to-[#26DFFF] text-gray-900",
              )}
              style={{ width: b.radius * 2, height: b.radius * 2 }}
            >
              {!isTiny && (
                <div className="absolute inset-2.5 rounded-full bg-white/20 blur-[1px]" />
              )}

              {isTiny ? (
                <div className="h-full w-full rounded-full bg-white/25" />
              ) : (
                <div className="relative z-1 flex flex-col items-center">
                  {b.title && (
                    <div className="text-[28px] font-extrabold tracking-tight">
                      {b.title}
                    </div>
                  )}
                  {b.subtitle && (
                    <div className="mt-1 text-[22px] font-semibold opacity-90">
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

export default BubbleCloudFalling;
