import { cn } from "@recap/ui";

/**
 * BubbleRanking
 * - items는 1등~5등 순서로 전달
 * - 배치는 이미지처럼: 아래(2등,1등) / 위(5등,3등,4등)
 * - 각 원의 크기는 rank별 기본값 또는 item.size로 개별 조정 가능
 */

export type BubbleItem = {
  label: string;
  description?: string;
  /** px 단위 (number) 또는 CSS 길이 문자열 ("120px", "clamp(80px, 12vw, 160px)") */
  size?: number | string;
  /** 색상 톤: "blue" | "gray" | 사용자 커스텀 */
  tone?: "blue" | "gray" | "custom";
  /** tone이 custom일 때 사용 */
  custom?: {
    bg?: string; // background
    border?: string; // border color
    text?: string; // text color
  };
};

export type BubbleRankingProps = {
  /** 1등~5등 순서로 5개 */
  items: [BubbleItem, BubbleItem, BubbleItem, BubbleItem, BubbleItem];
  /** 컨테이너 높이(기본 160). width는 부모를 따름 */
  height?: number;
  /** 배치 미세 조정 (퍼센트) */
  layout?: Partial<Record<1 | 2 | 3 | 4 | 5, { x: number; y: number }>>;
  className?: string;
};

const DEFAULT_LAYOUT: Record<1 | 2 | 3 | 4 | 5, { x: number; y: number }> = {
  2: { x: 32, y: 70 },
  1: { x: 66, y: 70 },
  5: { x: 18, y: 30 },
  3: { x: 45, y: 24 },
  4: { x: 72, y: 30 },
};

const DEFAULT_SIZE: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "clamp(110px, 18vw, 180px)",
  2: "clamp(100px, 16vw, 170px)",
  3: "clamp(90px, 14vw, 150px)",
  4: "clamp(80px, 12vw, 130px)",
  5: "clamp(70px, 10vw, 120px)",
};

function toCssSize(v: BubbleItem["size"], fallback: string) {
  if (typeof v === "number") return `${v}px`;
  if (typeof v === "string" && v.trim().length) return v;
  return fallback;
}

function bubbleTone(item: BubbleItem, rank: 1 | 2 | 3 | 4 | 5) {
  if (item.tone === "custom" && item.custom) {
    return {
      bg: item.custom.bg ?? "linear-gradient(to bottom, #C8F4FF, #26DFFF)",
      border: item.custom.border ?? "rgba(255, 255, 255, 0.7)",
      text: item.custom.text ?? "#111827",
      shadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
      isCustom: true,
    };
  }

  if (item.tone === "gray") {
    if (rank === 5) {
      return {
        bg: "bg-gray-300/90",
        border: "border-white/70",
        text: "text-gray-700",
        shadow: "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
        isCustom: false,
      };
    }

    return {
      bg: "bg-gray-100/80",
      border: "border-white/70",
      text: "text-gray-700",
      shadow: "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
      isCustom: false,
    };
  }

  if (rank === 2) {
    return {
      bg: "bg-linear-to-b from-[#B0E8FF] to-[#1FC8FF]",
      border: "border-white/70",
      text: "text-gray-900",
      shadow: "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
      isCustom: false,
    };
  }

  if (rank === 3) {
    return {
      bg: "bg-linear-to-b from-[#E0F7FF] to-[#4DE5FF]",
      border: "border-white/70",
      text: "text-gray-900",
      shadow: "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
      isCustom: false,
    };
  }

  return {
    bg: "bg-linear-to-b from-[#C8F4FF] to-[#26DFFF]",
    border: "border-white/70",
    text: "text-gray-900",
    shadow: "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
    isCustom: false,
  };
}

function Bubble({
  rank,
  item,
  pos,
  size,
}: {
  rank: 1 | 2 | 3 | 4 | 5;
  item: BubbleItem;
  pos: { x: number; y: number };
  size: string;
}) {
  const tone = bubbleTone(item, rank);

  return (
    <div
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center border",
        tone.bg,
        tone.border,
        tone.shadow,
      )}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: size,
        height: size,
      }}
      aria-label={`${rank}등: ${item.label}`}
    >
      {item.tone !== "custom" && (
        <div
          className="absolute rounded-full bg-white/20 blur-[1px]"
          style={{ inset: 6 }}
        />
      )}
      <div
        className={cn("text-center leading-tight px-3 relative z-1", tone.text)}
      >
        <div
          className="font-semibold"
          style={{
            fontSize:
              rank === 1
                ? "clamp(16px, 2.2vw, 22px)"
                : rank === 2
                  ? "clamp(15px, 2.0vw, 20px)"
                  : "clamp(13px, 1.6vw, 18px)",
          }}
        >
          {item.label}
        </div>
        {item.description ? (
          <div
            className="mt-1 font-medium opacity-90"
            style={{
              fontSize:
                rank === 1
                  ? "clamp(12px, 1.6vw, 16px)"
                  : rank === 2
                    ? "clamp(11px, 1.5vw, 15px)"
                    : "clamp(10px, 1.3vw, 14px)",
            }}
          >
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function BubbleRanking({
  items,
  height = 160,
  layout,
  className = "",
}: BubbleRankingProps) {
  const [rank1, rank2, rank3, rank4, rank5] = items;

  const mergedLayout: Record<1 | 2 | 3 | 4 | 5, { x: number; y: number }> = {
    1: { ...DEFAULT_LAYOUT[1], ...(layout?.[1] ?? {}) },
    2: { ...DEFAULT_LAYOUT[2], ...(layout?.[2] ?? {}) },
    3: { ...DEFAULT_LAYOUT[3], ...(layout?.[3] ?? {}) },
    4: { ...DEFAULT_LAYOUT[4], ...(layout?.[4] ?? {}) },
    5: { ...DEFAULT_LAYOUT[5], ...(layout?.[5] ?? {}) },
  };

  const normalized: [
    BubbleItem,
    BubbleItem,
    BubbleItem,
    BubbleItem,
    BubbleItem,
  ] = [
    { tone: "blue", ...rank1 },
    { tone: "blue", ...rank2 },
    { tone: "blue", ...rank3 },
    { tone: "gray", ...rank4 },
    { tone: "gray", ...rank5 },
  ];

  const size1 = toCssSize(normalized[0].size, DEFAULT_SIZE[1]);
  const size2 = toCssSize(normalized[1].size, DEFAULT_SIZE[2]);
  const size3 = toCssSize(normalized[2].size, DEFAULT_SIZE[3]);
  const size4 = toCssSize(normalized[3].size, DEFAULT_SIZE[4]);
  const size5 = toCssSize(normalized[4].size, DEFAULT_SIZE[5]);

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <div
        className="relative w-full h-full overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(239, 250, 255, 1) 0%, rgba(231, 248, 255, 1) 100%)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            left: "10%",
            top: "62%",
            width: "clamp(14px, 2.2vw, 22px)",
            height: "clamp(14px, 2.2vw, 22px)",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(120, 210, 255, 0.35) 60%, rgba(80, 175, 235, 0.15) 100%)",
            boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: "85%",
            top: "45%",
            width: "clamp(18px, 2.8vw, 28px)",
            height: "clamp(18px, 2.8vw, 28px)",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(120, 210, 255, 0.28) 60%, rgba(80, 175, 235, 0.12) 100%)",
            boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
          }}
        />

        <Bubble
          rank={2}
          item={normalized[1]}
          pos={mergedLayout[2]}
          size={size2}
        />
        <Bubble
          rank={1}
          item={normalized[0]}
          pos={mergedLayout[1]}
          size={size1}
        />
        <Bubble
          rank={5}
          item={normalized[4]}
          pos={mergedLayout[5]}
          size={size5}
        />
        <Bubble
          rank={3}
          item={normalized[2]}
          pos={mergedLayout[3]}
          size={size3}
        />
        <Bubble
          rank={4}
          item={normalized[3]}
          pos={mergedLayout[4]}
          size={size4}
        />
      </div>
    </div>
  );
}
