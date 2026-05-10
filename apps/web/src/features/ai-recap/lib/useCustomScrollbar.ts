import { useCallback, useEffect, useRef, useState } from "react";

type UseCustomScrollbarOptions = {
  padding?: number;
  thumbWidthSize?: number;
  thumbHeightSize?: number;
};

const clamp = (n: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, n));
};

export const useCustomScrollbar = (options?: UseCustomScrollbarOptions) => {
  const padding = options?.padding ?? 4;
  const thumbWidthSize = options?.thumbWidthSize ?? 16;
  const thumbHeightSize = options?.thumbHeightSize ?? 16;

  const [thumbTop, setThumbTop] = useState(padding);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingThumbTopRef = useRef<number | null>(null);

  const dragRef = useRef<{ dragging: boolean; offsetY: number }>({
    dragging: false,
    offsetY: 0,
  });

  const thumbStyle: React.CSSProperties = {
    width: thumbWidthSize,
    height: thumbHeightSize,
    transform: `translateX(-50%) translateY(${thumbTop}px)`,
    willChange: "transform",
  };

  const getRanges = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return null;

    const trackH = track.clientHeight;
    const minTop = padding;
    const maxTop = Math.max(padding, trackH - thumbHeightSize - padding);

    const maxScrollTop = Math.max(
      1,
      scroller.scrollHeight - scroller.clientHeight,
    );

    return { minTop, maxTop, maxScrollTop };
  }, [padding, thumbHeightSize]);

  const syncThumb = useCallback(() => {
    const scroller = scrollerRef.current;
    const ranges = getRanges();
    if (!scroller || !ranges) return;

    const { scrollTop } = scroller;
    const { minTop, maxTop, maxScrollTop } = ranges;

    const t = minTop + (scrollTop / maxScrollTop) * (maxTop - minTop);
    setThumbTop(clamp(t, minTop, maxTop));
  }, [getRanges]);

  const scrollToThumbTop = useCallback(
    (nextThumbTop: number, smooth?: boolean) => {
      const ranges = getRanges();
      const scroller = scrollerRef.current;
      if (!ranges || !scroller) return;

      const { minTop, maxTop, maxScrollTop } = ranges;
      const t = clamp(nextThumbTop, minTop, maxTop);

      pendingThumbTopRef.current = t;

      if (rafRef.current != null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const tt = pendingThumbTopRef.current;
        pendingThumbTopRef.current = null;
        if (tt == null) return;

        const ratio = (tt - minTop) / Math.max(1, maxTop - minTop);
        const nextScrollTop = ratio * maxScrollTop;

        if (smooth)
          scroller.scrollTo({ top: nextScrollTop, behavior: "smooth" });
        else scroller.scrollTop = nextScrollTop;
      });
    },
    [getRanges],
  );

  const onThumbPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);

      const trackTop = trackRef.current?.getBoundingClientRect().top ?? 0;

      dragRef.current.dragging = true;
      dragRef.current.offsetY = e.clientY - trackTop - thumbTop;
    },
    [thumbTop],
  );

  const onThumbPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.dragging) return;

      const trackRect = trackRef.current?.getBoundingClientRect();
      if (!trackRect) return;

      const yInTrack = e.clientY - trackRect.top;
      const nextTop = yInTrack - dragRef.current.offsetY;

      scrollToThumbTop(nextTop);
    },
    [scrollToThumbTop],
  );

  const onThumbPointerUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.target !== e.currentTarget) return;

      const trackRect = trackRef.current?.getBoundingClientRect();
      if (!trackRect) return;

      const y = e.clientY - trackRect.top;
      scrollToThumbTop(y - thumbHeightSize / 2, true);
    },
    [scrollToThumbTop, thumbHeightSize],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    syncThumb();

    const onScroll = () => syncThumb();
    scroller.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => syncThumb());
    ro.observe(scroller);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [syncThumb]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    scrollerRef,
    trackRef,
    thumbStyle,
    onThumbPointerDown,
    onThumbPointerMove,
    onThumbPointerUp,
    onTrackPointerDown,
    thumbWidthSize,
    thumbHeightSize,
  };
};
