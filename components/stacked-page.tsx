"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

export function StackedPage({
  children,
  path,
  tone,
  layer,
  long = false,
  overlapNext = false,
  linearExitFade = false,
  pinAtEnd = false,
  last = false,
  fadeOutAt = 0.6,
  fastEntry = false,
  darkBackdrop = false,
  darkSceneBackdrop = false,
  preserveSurfaceOnExit = false,
  lightExitOverlay = false,
  mobileLong = false
}: {
  children: ReactNode;
  path: string;
  tone: "light" | "dark";
  layer: number;
  long?: boolean;
  overlapNext?: boolean;
  linearExitFade?: boolean;
  pinAtEnd?: boolean;
  last?: boolean;
  fadeOutAt?: number;
  fastEntry?: boolean;
  darkBackdrop?: boolean;
  darkSceneBackdrop?: boolean;
  preserveSurfaceOnExit?: boolean;
  lightExitOverlay?: boolean;
  mobileLong?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const viewportWidthRef = useRef(0);
  const [pinContentHeight, setPinContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const reducedMotion = useReducedMotion();
  const mobileViewportActive = viewportWidth > 0 && viewportWidth < 768;
  const mobileLongActive =
    mobileLong && mobileViewportActive;

  const { scrollYProgress: entryProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "start start"]
  });
  const { scrollYProgress: exitProgress } = useScroll({
    target: trackRef,
    offset: long ? ["end end", "end start"] : ["start start", "center start"]
  });
  const { scrollYProgress: pinProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  const pinTravel = Math.max(0, pinContentHeight - viewportHeight);
  const pinHold = pinAtEnd ? viewportHeight * 0.12 : 0;
  const pinScrollRange = pinContentHeight + pinHold;
  const pinCompletion =
    pinTravel > 0 && pinScrollRange > 0 ? pinTravel / pinScrollRange : 1;
  const pinFadeStart =
    pinScrollRange > 0
      ? Math.min((pinTravel + pinHold) / pinScrollRange, 0.999)
      : 0.999;

  const lightEntryY = useTransform(
    entryProgress,
    [0, 0.45, 1],
    reducedMotion ? [0, 0, 0] : [88, 24, 0]
  );
  const darkEntryY = useTransform(
    entryProgress,
    fastEntry ? [0, 0.08, 0.55, 1] : [0, 0.22, 1],
    reducedMotion
      ? fastEntry
        ? [0, 0, 0, 0]
        : [0, 0, 0]
      : fastEntry
        ? [viewportHeight * 0.62, viewportHeight * 0.48, 0, 0]
        : [viewportHeight * 0.62, viewportHeight * 0.62, 0]
  );
  const exitOpacity = useTransform(
    exitProgress,
    linearExitFade
      ? [0, fadeOutAt, 1]
      : [0, 0.08, 0.22, fadeOutAt, 1],
    reducedMotion || last
      ? linearExitFade
        ? [1, 1, 1]
        : [1, 1, 1, 1, 1]
      : linearExitFade
        ? [1, 0, 0]
        : [1, 0.94, 0.32, 0, 0]
  );
  const exitScale = useTransform(
    exitProgress,
    [0, 0.5, 1],
    reducedMotion || last || long ? [1, 1, 1] : [1, 0.994, 0.985]
  );
  const lightExitOverlayOpacity = useTransform(
    exitProgress,
    [0, fadeOutAt, 1],
    reducedMotion ? [0, 0, 0] : [0, 1, 1]
  );
  const pinY = useTransform(
    pinProgress,
    pinCompletion < pinFadeStart
      ? [0, pinCompletion, pinFadeStart, 1]
      : [0, 1],
    pinCompletion < pinFadeStart
      ? [0, -pinTravel, -pinTravel, -pinTravel]
      : [0, -pinTravel]
  );

  useEffect(() => {
    const updateViewport = () => {
      const nextWidth = window.innerWidth;
      if (
        viewportWidthRef.current &&
        Math.abs(nextWidth - viewportWidthRef.current) < 2
      ) {
        return;
      }
      viewportWidthRef.current = nextWidth;
      setViewportWidth(nextWidth);
      setViewportHeight(window.innerHeight);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!pinAtEnd || !pinContentRef.current) return;

    const updateMeasurements = () => {
      setViewportHeight(window.innerHeight);
      if (sceneRef.current) setPinContentHeight(sceneRef.current.scrollHeight);
    };
    updateMeasurements();

    const observer = new ResizeObserver(updateMeasurements);
    observer.observe(pinContentRef.current);
    if (sceneRef.current) observer.observe(sceneRef.current);
    window.addEventListener("resize", updateMeasurements);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [pinAtEnd]);

  const pinHeightStyle =
    pinAtEnd && pinContentHeight
      ? ({
          "--pin-scene-height": `${pinContentHeight}px`,
          "--pin-hold-height": `${pinHold}px`
        } as CSSProperties)
      : {};
  const trackStyle = {
    "--scene-layer": layer,
    ...pinHeightStyle
  } as CSSProperties;

  return (
    <div
      ref={trackRef}
      data-portfolio-track={path}
      data-portfolio-tone={tone}
      className={`stacked-page-track ${
        long ? "stacked-page-track--long" : ""
      } ${overlapNext ? "stacked-page-track--overlap-next" : ""} ${
        pinAtEnd ? "stacked-page-track--pin-end" : ""
      } ${
        mobileLong ? "stacked-page-track--mobile-long" : ""
      } ${
        (last && tone === "dark") || darkBackdrop
          ? "stacked-page-track--dark-bridge"
          : ""
      } ${reducedMotion ? "stacked-page-track--reduced" : ""}`}
      style={trackStyle}
    >
      <motion.section
        ref={sceneRef}
        data-portfolio-scene={path}
        data-portfolio-tone={tone}
        className={`stacked-page-scene ${
          pinAtEnd ? "stacked-page-scene--pin-viewport" : ""
        } ${tone === "dark" ? "on-dark" : ""} ${
          darkSceneBackdrop ? "stacked-page-scene--dark-backdrop" : ""
        }`}
        style={{
          opacity: preserveSurfaceOnExit || lightExitOverlay
            ? 1
            : pinAtEnd
              ? 1
              : exitOpacity,
          // The process surface already enters through normal document flow.
          // Adding a second scroll-linked translation made its white edge
          // compete with the sticky services scene and visibly tremble.
          y:
            path === "/" || preserveSurfaceOnExit
              ? 0
              : tone === "dark"
                ? darkEntryY
                : lightEntryY,
          scale: mobileViewportActive ? 1 : exitScale,
          ...pinHeightStyle
        }}
      >
        {preserveSurfaceOnExit ? (
          <div className="relative min-h-[100svh]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-t-[16px] bg-white shadow-[0_-18px_48px_rgba(0,0,0,0.16)] sm:rounded-t-[20px]"
            />
            <motion.div
              className="relative z-[1]"
              style={{ opacity: mobileLongActive ? 1 : exitOpacity }}
            >
              {children}
            </motion.div>
          </div>
        ) : pinAtEnd ? (
          <motion.div
            ref={pinContentRef}
            className="stacked-page-pin-content"
            style={{ y: pinY }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
        {lightExitOverlay && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] bg-white"
            style={{ opacity: lightExitOverlayOpacity }}
          />
        )}
      </motion.section>
    </div>
  );
}
