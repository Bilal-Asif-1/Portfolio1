"use client";

import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent,
  ReactNode
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  MotionConfig,
  useInView,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  Plus,
  X
} from "lucide-react";
import {
  EASE,
  FloatingScrollbar,
  getLenis,
  Magnetic,
  MOTION,
  Reveal,
  ScrollProgress,
  SmoothCursor,
  SmoothScroll
} from "@/components/motion";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons";
import {
  APPROACH_STEPS,
  CONTACT,
  FAQS,
  FEATURED_PROJECTS,
  NAV_ITEMS,
  PACKAGES,
  PROFESSIONAL_SERVICE_SCHEMA,
  PROJECT_DETAILS,
  PROJECT_METRICS,
  SERVICES
} from "@/features/portfolio/data";
import type { Project, Service } from "@/features/portfolio/types";
import { IntroSplash } from "@/features/intro/intro-splash";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

const serifDisplay = "font-petrona italic font-thin";

function useMotionValueSpring(initial: number) {
  const value = useMotionValue(initial);
  const spring = useSpring(value, MOTION.spring.subtle);
  return {
    set: (next: number) => value.set(next),
    spring
  };
}

function wrapCarouselDistance(value: number, total: number) {
  return ((value + total / 2) % total + total) % total - total / 2;
}

function StackedProjectCard({
  cardIndex,
  index,
  total,
  rotation,
  didDrag,
  onCenter,
  onOpen
}: {
  cardIndex: number;
  index: number;
  total: number;
  rotation: MotionValue<number>;
  didDrag: { current: boolean };
  onCenter: (index: number) => void;
  onOpen: (card: Project) => void;
}) {
  const position = useTransform(rotation, (value) =>
    wrapCarouselDistance(index - value, total)
  );
  const distance = useTransform(position, (value) => Math.abs(value));
  const x = useTransform(
    position,
    (value) => `calc(${value} * var(--stacked-carousel-step))`
  );
  const y = useTransform(distance, [0, 1, 2, 3, 5], [0, 18, 32, 58, 74]);
  const scale = useTransform(distance, [0, 1, 2, 3, 5], [1.08, 1, 0.97, 0.94, 0.92]);
  const opacity = useTransform(distance, [0, 3.5, 5, 6], [1, 1, 0.7, 0]);
  const zIndex = useTransform(distance, (value) => Math.round(1000 - value * 100));
  const visibility = useTransform(distance, (value) =>
    value < 6 ? "visible" : "hidden"
  );
  const pointerEvents = useTransform(distance, (value) =>
    value < 4.5 ? "auto" : "none"
  );

  return (
    <motion.div
      className="stacked-project-card absolute left-1/2 top-8 h-[255px] w-[176px] overflow-hidden rounded-card sm:top-10 sm:h-[325px] sm:w-[218px] lg:top-12 lg:h-[380px] lg:w-[258px]"
      style={{ x, y, scale, opacity, zIndex, visibility, pointerEvents }}
      onClick={() => {
        if (!didDrag.current) onCenter(index);
      }}
    >
      <FastHeroMockup card={FEATURED_PROJECTS[cardIndex]} onOpen={onOpen} />
    </motion.div>
  );
}

function InfiniteStackedCarousel({
  onOpen,
  reducedMotion
}: {
  onOpen: (card: Project) => void;
  reducedMotion: boolean;
}) {
  // Two sequences leave a full invisible card-width buffer at the wrap point,
  // so the loop stays seamless without rendering a third off-screen set.
  const carouselCards = [...FEATURED_PROJECTS, ...FEATURED_PROJECTS];
  const rotation = useMotionValue(FEATURED_PROJECTS.length + 3);
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { amount: 0.3 });
  const wasOutsideViewport = useRef(true);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartRotation = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const releaseVelocity = useRef(0);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const gestureAxis = useRef<"pending" | "horizontal" | "vertical">("pending");
  const rotationAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const wheelTarget = useRef(rotation.get());
  const lastWheelTime = useRef(0);

  const stopRotationAnimation = () => {
    rotationAnimation.current?.stop();
    rotationAnimation.current = null;
  };

  const centerCard = (index: number) => {
    stopRotationAnimation();
    const current = rotation.get();
    const delta = wrapCarouselDistance(index - current, carouselCards.length);
    if (reducedMotion) {
      rotation.set(current + delta);
      return;
    }
    rotationAnimation.current = animate(rotation, current + delta, {
      type: "spring",
      ...MOTION.spring.subtle,
      restDelta: 0.0005,
      restSpeed: 0.0005,
      onComplete: () => {
        rotationAnimation.current = null;
      }
    });
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (didDrag.current && !reducedMotion) {
      const velocity = releaseVelocity.current;
      rotationAnimation.current = animate(
        rotation,
        rotation.get() + velocity * 0.18,
        {
          type: "spring",
          velocity,
          stiffness: 105,
          damping: 19,
          mass: 0.78,
          restDelta: 0.0005,
          restSpeed: 0.0005,
          onComplete: () => {
            rotationAnimation.current = null;
          }
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      stopRotationAnimation();
    };
  }, []);

  useEffect(() => {
    if (!isInView) {
      wasOutsideViewport.current = true;
      return;
    }
    if (!wasOutsideViewport.current || reducedMotion || dragging.current) return;

    wasOutsideViewport.current = false;
    stopRotationAnimation();
    const current = rotation.get();
    rotationAnimation.current = animate(rotation, current + 0.18, {
      duration: 0.86,
      ease: EASE,
      onComplete: () => {
        rotationAnimation.current = null;
      }
    });
  }, [isInView, reducedMotion, rotation]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event: WheelEvent) => {
      const isHorizontalGesture =
        event.shiftKey ||
        (Math.abs(event.deltaX) > 4 &&
          Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.25);
      if (!isHorizontalGesture) return;

      const delta = event.shiftKey ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 0.1) return;

      event.preventDefault();
      event.stopPropagation();

      const now = performance.now();
      if (now - lastWheelTime.current > 160) wheelTarget.current = rotation.get();
      lastWheelTime.current = now;
      wheelTarget.current += Math.max(-180, Math.min(180, delta)) / 340;
      stopRotationAnimation();

      if (reducedMotion) {
        rotation.set(wheelTarget.current);
        return;
      }

      rotationAnimation.current = animate(rotation, wheelTarget.current, {
        type: "spring",
        stiffness: 190,
        damping: 28,
        mass: 0.62,
        restDelta: 0.0005,
        restSpeed: 0.0005,
        onComplete: () => {
          rotationAnimation.current = null;
        }
      });
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [reducedMotion, rotation]);

  return (
    <motion.div
      ref={stageRef}
      initial={{ opacity: 0, y: 24, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: MOTION.duration.reveal, ease: EASE }}
      className="stacked-carousel project-deck-sticky scroll-reveal-filter relative -mx-5 mt-6 h-[370px] cursor-grab select-none overflow-hidden active:cursor-grabbing sm:-mx-8 sm:mt-8 sm:h-[455px] lg:-mx-12 lg:h-[530px]"
      role="region"
      aria-label="Featured projects carousel. Drag or scroll horizontally to browse."
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("[data-project-trigger]")) return;
        stopRotationAnimation();
        dragging.current = true;
        didDrag.current = false;
        gestureAxis.current = "pending";
        dragStartX.current = event.clientX;
        dragStartY.current = event.clientY;
        dragStartRotation.current = rotation.get();
        lastPointerX.current = event.clientX;
        lastPointerTime.current = performance.now();
        releaseVelocity.current = 0;
      }}
      onPointerMove={(event) => {
        if (!dragging.current) return;
        const distanceX = event.clientX - dragStartX.current;
        const distanceY = event.clientY - dragStartY.current;

        if (gestureAxis.current === "pending") {
          if (
            Math.abs(distanceY) > 6 &&
            Math.abs(distanceY) > Math.abs(distanceX) * 1.15
          ) {
            gestureAxis.current = "vertical";
            dragging.current = false;
            return;
          }

          if (
            Math.abs(distanceX) > 6 &&
            Math.abs(distanceX) > Math.abs(distanceY) * 1.15
          ) {
            gestureAxis.current = "horizontal";
            didDrag.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
          } else {
            return;
          }
        }

        if (gestureAxis.current !== "horizontal") return;
        event.preventDefault();

        const cardTravel = Math.max(210, Math.min(window.innerWidth * 0.24, 390));
        rotation.set(dragStartRotation.current - distanceX / cardTravel);

        const now = performance.now();
        const elapsed = Math.max(8, now - lastPointerTime.current);
        releaseVelocity.current =
          (-(event.clientX - lastPointerX.current) / cardTravel / elapsed) * 1000;
        lastPointerX.current = event.clientX;
        lastPointerTime.current = now;
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <div className="absolute inset-0">
        {carouselCards.map((card, index) => (
          <StackedProjectCard
            key={`${card.title}-${index}`}
            cardIndex={index % FEATURED_PROJECTS.length}
            index={index}
            total={carouselCards.length}
            rotation={rotation}
            didDrag={didDrag}
            onCenter={centerCard}
            onOpen={onOpen}
          />
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-2 left-1/2 z-[220] -translate-x-1/2 whitespace-nowrap font-jetbrains text-[9px] uppercase tracking-[0.2em] text-ink/35 sm:bottom-4 sm:text-[10px]">
        Drag or scroll sideways
      </p>
    </motion.div>
  );
}

function SectionLabel({
  children,
  tone = "light"
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
        tone === "dark" ? "text-white/45" : "text-ink/45"
      }`}
    >
      <span className={`h-px w-8 ${tone === "dark" ? "bg-white/25" : "bg-ink/20"}`} aria-hidden="true" />
      {children}
    </div>
  );
}

function AnimatedMetricValue({ value, delay = 0 }: { value: string; delay?: number }) {
  const valueRef = useRef<HTMLElement>(null);
  const inView = useInView(valueRef, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = valueRef.current;
    if (!inView || !element) return;
    if (reducedMotion) {
      element.textContent = value;
      return;
    }

    const numberMatch = value.match(/\d+(?:\.\d+)?/);
    if (!numberMatch) {
      element.textContent = value;
      return;
    }

    const target = Number(numberMatch[0]);
    const prefix = value.slice(0, numberMatch.index);
    const suffix = value.slice((numberMatch.index ?? 0) + numberMatch[0].length);
    const hasDecimal = !Number.isInteger(target);
    const controls = animate(0, target, {
      duration: 1.35,
      delay,
      ease: EASE,
      onUpdate: (latest) => {
        const formatted = hasDecimal ? latest.toFixed(1) : Math.round(latest).toString();
        element.textContent = `${prefix}${formatted}${suffix}`;
      }
    });

    return () => controls.stop();
  }, [delay, inView, reducedMotion, value]);

  return (
    <dd
      ref={valueRef}
      className="metric-value order-1 text-[clamp(1.4rem,7vw,2.25rem)] font-extrabold leading-none tracking-normal text-black sm:text-5xl lg:text-6xl"
    >
      0
    </dd>
  );
}

function StackedScene({
  children,
  className,
  id,
  layer,
  long = false,
  liftIn = false,
  overlapNext = false,
  linearExitFade = false,
  pinAtEnd = false,
  pullFromBottom = false,
  deferExitOnMobile = false
}: {
  children: ReactNode;
  className: string;
  id?: string;
  layer: number;
  long?: boolean;
  liftIn?: boolean;
  overlapNext?: boolean;
  linearExitFade?: boolean;
  pinAtEnd?: boolean;
  pullFromBottom?: boolean;
  deferExitOnMobile?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const [pinContentHeight, setPinContentHeight] = useState(0);
  const [pinViewportHeight, setPinViewportHeight] = useState(0);
  const [pinViewportWidth, setPinViewportWidth] = useState(0);
  const [mobileExitAtContentEnd, setMobileExitAtContentEnd] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress: entryProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "start start"]
  });
  const { scrollYProgress: exitProgress } = useScroll({
    target: trackRef,
    offset:
      long || mobileExitAtContentEnd
        ? ["end end", "end start"]
        : ["start start", "center start"]
  });
  const { scrollYProgress: pinProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });
  const pinTravel = Math.max(0, pinContentHeight - pinViewportHeight);
  const pinHold = pinAtEnd ? pinViewportHeight * 0.12 : 0;
  const pinExitDrift = pinAtEnd ? pinViewportHeight : 0;
  const pinScrollRange = pinContentHeight + pinHold;
  const pinCompletion =
    pinTravel > 0 && pinScrollRange > 0 ? pinTravel / pinScrollRange : 1;
  const pinFadeStart =
    pinScrollRange > 0
      ? Math.min((pinTravel + pinHold) / pinScrollRange, 0.999)
      : 0.999;
  const entryY = useTransform(
    entryProgress,
    [0, 0.45, 1],
    reducedMotion ? [0, 0, 0] : [88, 24, 0]
  );
  const pullDistance = pinViewportWidth >= 768 ? pinViewportHeight * 0.66 : 0;
  const bottomPullY = useTransform(
    entryProgress,
    [0, 0.25, 1],
    reducedMotion ? [0, 0, 0] : [pullDistance, pullDistance, 0]
  );
  const exitOpacity = useTransform(
    exitProgress,
    linearExitFade ? [0, 1] : [0, 0.15, 0.3, 0.6, 1],
    reducedMotion || pinAtEnd
      ? linearExitFade
        ? [1, 1]
        : [1, 1, 1, 1, 1]
      : linearExitFade
        ? [1, 0]
        : [1, 0.92, 0.3, 0, 0]
  );
  const pinnedExitOpacity = useTransform(
    pinProgress,
    [pinFadeStart, 1],
    reducedMotion ? [1, 1] : [1, 0]
  );
  const pinY = useTransform(
    pinProgress,
    pinCompletion < pinFadeStart
      ? [0, pinCompletion, pinFadeStart, 1]
      : [0, 1],
    pinCompletion < pinFadeStart
      ? [0, -pinTravel, -pinTravel, -pinTravel - pinExitDrift]
      : [0, -pinTravel]
  );

  useEffect(() => {
    if (!deferExitOnMobile) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateExitTiming = () => setMobileExitAtContentEnd(mobileQuery.matches);
    updateExitTiming();
    mobileQuery.addEventListener("change", updateExitTiming);

    return () => mobileQuery.removeEventListener("change", updateExitTiming);
  }, [deferExitOnMobile]);

  useEffect(() => {
    if (!pinAtEnd || !pinContentRef.current) return;

    const updateHeight = () => {
      setPinViewportHeight(window.innerHeight);
      setPinViewportWidth(window.innerWidth);
      if (sceneRef.current) setPinContentHeight(sceneRef.current.scrollHeight);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(pinContentRef.current);
    if (sceneRef.current) observer.observe(sceneRef.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [pinAtEnd]);

  const pinHeightStyle = pinAtEnd && pinContentHeight
    ? ({
        "--pin-scene-height": `${pinContentHeight}px`,
        "--pin-hold-height": `${pinHold}px`
      } as CSSProperties)
    : {};
  const trackStyle = {
    "--scene-layer": layer,
    ...pinHeightStyle
  } as CSSProperties;

  const settleFadedScene = (event: ReactMouseEvent<HTMLElement>) => {
    const activeOpacity = pinAtEnd ? pinnedExitOpacity.get() : exitOpacity.get();
    if (activeOpacity >= 0.96 || activeOpacity <= 0.02 || !trackRef.current) return;

    const trackBounds = trackRef.current.getBoundingClientRect();
    const trackTop = trackBounds.top + window.scrollY;
    const trackHeight = trackBounds.height;
    let settlePosition: number;

    if (pinAtEnd) {
      const scrollableRange = Math.max(0, trackHeight - window.innerHeight);
      settlePosition = trackTop + pinFadeStart * scrollableRange - 2;
    } else if (long || mobileExitAtContentEnd) {
      settlePosition = trackTop + trackHeight - window.innerHeight;
    } else {
      settlePosition = trackTop;
    }

    settlePosition = Math.max(0, settlePosition);
    if (settlePosition >= window.scrollY - 2) return;

    event.preventDefault();
    event.stopPropagation();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(settlePosition, {
        duration: 0.82,
        force: true
      });
    } else {
      window.scrollTo({
        top: settlePosition,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    }
  };

  return (
    <div
      ref={trackRef}
      className={`stacked-scene-track ${long ? "stacked-scene-track--long" : ""} ${
        overlapNext ? "stacked-scene-track--overlap-next" : ""
      } ${
        pinAtEnd ? "stacked-scene-track--pin-end" : ""
      }`}
      style={trackStyle}
    >
      <motion.section
        ref={sceneRef}
        id={id}
        onClickCapture={settleFadedScene}
        className={`stacked-scene ${pinAtEnd ? "stacked-scene--pin-viewport" : ""} ${className}`}
        style={{
          opacity: pinAtEnd && linearExitFade ? pinnedExitOpacity : exitOpacity,
          y: pullFromBottom ? bottomPullY : liftIn ? entryY : 0,
          ...pinHeightStyle
        }}
      >
        {pinAtEnd ? (
          <motion.div ref={pinContentRef} className="stacked-scene-pin-content" style={{ y: pinY }}>
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.section>
    </div>
  );
}

function FastHeroMockup({
  card,
  onOpen
}: {
  card: Project;
  onOpen: (card: Project) => void;
}) {
  return (
      <div className="group relative h-full w-full overflow-hidden bg-white text-ink">
        <Image
          src={card.image}
          alt={`${card.title} ${card.eyebrow} poster visual`}
          fill
          sizes="(min-width: 1024px) 258px, (min-width: 640px) 218px, 176px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
          <h3
            className="project-card-heading max-w-[85%] font-sans text-[1.15rem] font-medium not-italic leading-none tracking-[-0.01em] text-white sm:text-[1.35rem]"
          >
            {card.title}
          </h3>
          <button
            type="button"
            data-project-trigger="true"
            className="group/btn pointer-events-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/85 bg-transparent py-1.5 pl-3.5 pr-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-[320ms] hover:bg-white hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Open ${card.title} project details`}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onOpen(card);
            }}
          >
            <span>Details</span>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/85 bg-transparent text-white transition-colors duration-[320ms] group-hover/btn:border-ink group-hover/btn:bg-ink group-hover/btn:text-white">
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-[320ms] ease-out-expo group-hover/btn:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>
  );
}

function ProjectDetailModal({
  card,
  onClose
}: {
  card: Project;
  onClose: () => void;
}) {
  const dialogRef = useDialogFocus<HTMLElement>();
  const details = PROJECT_DETAILS[card.title] ?? {
    problem: `The business needed a clearer digital experience that could communicate its value and convert attention into ${card.metric.toLowerCase()}.`,
    requirements:
      "A fast mobile experience, clear information architecture, strong trust signals and an obvious next action.",
    solution:
      "A focused website concept combining premium visual direction, conversion-led content and an SEO-ready page structure.",
    result:
      "A stronger first impression, a simpler customer journey and more opportunities for qualified enquiries."
  };

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/60 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: MOTION.duration.fast, ease: EASE }}
      onClick={onClose}
    >
      <motion.article
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="relative max-h-full w-full max-w-6xl overflow-hidden rounded-panel bg-white shadow-lift"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 18 }}
        transition={{ duration: MOTION.duration.base, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          data-dialog-close
          type="button"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors duration-[320ms] hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          aria-label="Close project details"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid max-h-[calc(100svh-1.5rem)] overflow-y-auto overscroll-contain sm:max-h-[calc(100svh-3rem)] lg:max-h-[calc(100svh-5rem)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-paper sm:min-h-[380px] lg:min-h-[680px]">
            <Image
              src={card.image}
              alt={`${card.title} project visual`}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white drop-shadow-md">
              {card.eyebrow}
            </p>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              Project case study
            </p>
            <h2
              id="project-detail-title"
              className={`${serifDisplay} mt-3 text-5xl leading-[0.9] tracking-[-0.04em] text-ink sm:text-6xl`}
            >
              {card.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink/60">{card.description}</p>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {[
                ["Problem statement", details.problem],
                ["User requirements", details.requirements],
                ["Solution", details.solution],
                ["Results", details.result]
              ].map(([title, copy]) => (
                <section key={title} className="border-t border-ink/10 pt-4">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{copy}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function PackagesModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useDialogFocus<HTMLElement>();
  return (
    <motion.div
      className="fixed inset-0 z-[160] flex items-center justify-center overflow-hidden bg-ink/45 backdrop-blur-sm sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: MOTION.duration.fast, ease: EASE }}
      onClick={onClose}
    >
      <motion.section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="packages-dialog-title"
        className="relative h-full min-w-0 w-full max-w-7xl overflow-hidden bg-white shadow-lift sm:h-auto sm:max-h-[calc(100svh-2rem)] sm:rounded-panel"
        initial={{ opacity: 0, y: 54, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 38, scale: 0.99 }}
        transition={{ duration: MOTION.duration.base, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          data-dialog-close
          type="button"
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors duration-[320ms] hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 sm:right-6 sm:top-6"
          aria-label="Close packages"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="h-full min-w-0 overflow-y-auto overscroll-contain px-4 pb-8 pt-16 sm:max-h-[calc(100svh-2rem)] sm:px-8 sm:pb-10 sm:pt-20 lg:px-12">
          <div className="max-w-3xl pr-12 sm:pr-14">
            <SectionLabel>Packages</SectionLabel>
            <h2
              id="packages-dialog-title"
              className={`${serifDisplay} text-3xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl`}
            >
              No fixed prices. Just the right package for your next stage.
            </h2>
          </div>

          <div className="mt-8 grid min-w-0 gap-4 sm:mt-14 lg:grid-cols-3">
            {PACKAGES.map((item, index) => {
              const featured = index === 1;
              return (
                <article
                  key={item.title}
                  className={`flex min-w-0 h-full flex-col rounded-card border p-5 sm:p-8 ${
                    featured
                      ? "on-dark border-ink bg-ink text-white shadow-lift"
                      : "border-ink/10 bg-white text-ink"
                  }`}
                >
                  <h3 className={`${serifDisplay} break-words text-3xl tracking-[-0.02em]`}>
                    {item.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-7 ${featured ? "text-white/60" : "text-ink/60"}`}>
                    {item.bestFor}
                  </p>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className={`my-7 block rounded-xl border px-3 py-3 text-center text-sm font-semibold transition-colors duration-[320ms] sm:px-4 ${
                      featured
                        ? "border-white/15 bg-white/[0.06] text-white hover:bg-white hover:text-ink"
                        : "border-ink/10 bg-ink/[0.03] text-ink hover:bg-ink hover:text-white"
                    }`}
                  >
                    Contact for a custom package
                  </a>
                  <ul className="mt-auto space-y-3">
                    {item.includes.map((feature) => (
                      <li
                        key={feature}
                        className={`flex gap-3 text-sm font-medium ${
                          featured ? "text-white/85" : "text-ink/75"
                        }`}
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            featured ? "text-white/60" : "text-ink/50"
                          }`}
                        />
                        <span className="min-w-0">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

function FaqItem({ faq, index }: { faq: (typeof FAQS)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b border-white/15">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-6 py-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="font-sans text-xl font-bold leading-tight tracking-normal text-white sm:text-2xl">
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: MOTION.duration.fast, ease: EASE }}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/60"
            aria-hidden="true"
          >
            <Plus className="h-5 w-5" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: MOTION.duration.base, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl pb-7 text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function ServiceItem({
  service,
  index,
  open,
  onToggle,
  onHover
}: {
  service: Service;
  index: number;
  open: boolean;
  onToggle: (target: HTMLButtonElement) => void;
  onHover: (target: HTMLButtonElement) => void;
}) {
  return (
    <Reveal delay={index * 0.04} y={18} blur={0}>
      <div
        className={`overflow-hidden border-b transition-colors duration-[320ms] ${
          open ? "border-black/10 bg-white" : "border-white/15"
        }`}
      >
        <button
          type="button"
          className={`service-row group grid h-[196px] w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-5 py-5 text-left transition-colors duration-[180ms] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60 sm:h-auto sm:min-h-[156px] sm:gap-4 sm:px-8 sm:py-7 lg:min-h-[140px] lg:grid-cols-[2.5rem_minmax(0,1fr)_minmax(18rem,0.72fr)_2rem] lg:gap-8 lg:px-12 xl:min-h-[112px] ${
            open ? "bg-white" : ""
          }`}
          aria-expanded={open}
          onMouseEnter={(event) => onHover(event.currentTarget)}
          onClick={(event) => onToggle(event.currentTarget)}
        >
          <span
            className={`service-row-number text-xs font-medium tabular-nums transition-colors duration-[180ms] group-hover:text-black/55 sm:text-sm ${
              open ? "text-black/55" : "text-white/40"
            }`}
          >
            0{index + 1}
          </span>
          <h3
            className={`service-row-heading font-sans text-xl font-extrabold leading-tight tracking-normal transition-colors duration-[180ms] group-hover:text-black sm:text-3xl lg:text-4xl ${
              open ? "text-black" : "text-white"
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`service-row-description col-span-2 col-start-2 row-start-2 max-w-lg text-[13px] leading-5 transition-colors duration-[180ms] group-hover:text-black/65 sm:text-sm sm:leading-6 lg:col-span-1 lg:col-start-auto lg:row-start-auto lg:text-base lg:leading-7 ${
              open ? "text-black/65" : "text-white/50"
            }`}
          >
            {service.description}
          </p>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: MOTION.duration.fast, ease: EASE }}
            className={`service-row-arrow col-start-3 row-start-1 grid h-8 w-8 place-items-center rounded-full border transition-colors duration-[180ms] group-hover:border-black/25 group-hover:text-black lg:col-start-auto lg:row-start-auto lg:h-9 lg:w-9 ${
              open ? "border-black/25 text-black" : "border-white/25 text-white"
            }`}
            aria-hidden="true"
          >
            <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: MOTION.duration.base, ease: EASE }}
              className="overflow-hidden bg-white"
            >
              <div className="pb-8 pl-[3.25rem] pr-5 sm:pb-10 sm:pl-[5.5rem] sm:pr-8 lg:pl-[6.5rem] lg:pr-12">
                <div className="grid w-full gap-5 border-t border-black/10 pt-6 sm:grid-cols-3 sm:gap-8 lg:gap-12">
                  {service.details.map((detail) => (
                    <p
                      key={detail}
                      className="relative pl-4 text-sm leading-6 text-black/60 before:absolute before:left-0 before:top-[0.65rem] before:h-1 before:w-1 before:rounded-full before:bg-black/45 sm:leading-7"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const reducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);
  const projectHistoryEntry = useRef(false);
  const serviceAnchorFrame = useRef<number | null>(null);

  const portraitX = useMotionValueSpring(0);
  const portraitY = useMotionValueSpring(0);

  const scrollImmediatelyBy = useCallback((delta: number) => {
    if (Math.abs(delta) <= 0.25) return;

    const nextScrollTop = Math.max(0, window.scrollY + delta);
    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(nextScrollTop, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: nextScrollTop, behavior: "auto" });
    }
  }, []);

  const handleServiceToggle = useCallback(
    (index: number, target: HTMLButtonElement) => {
      if (serviceAnchorFrame.current !== null) {
        window.cancelAnimationFrame(serviceAnchorFrame.current);
        serviceAnchorFrame.current = null;
      }

      if (openServiceIndex === index) {
        setOpenServiceIndex(null);
        return;
      }

      const serviceCard = target.parentElement;
      setOpenServiceIndex(index);
      if (!serviceCard) return;

      const startedAt = window.performance.now();
      const keepExpandedCardVisible = (now: number) => {
        const bounds = serviceCard.getBoundingClientRect();
        const viewportBottom = window.innerHeight - 24;

        if (bounds.bottom > viewportBottom) {
          scrollImmediatelyBy(bounds.bottom - viewportBottom);
        }

        if (now - startedAt < 560) {
          serviceAnchorFrame.current = window.requestAnimationFrame(
            keepExpandedCardVisible
          );
        } else {
          serviceAnchorFrame.current = null;
        }
      };

      serviceAnchorFrame.current = window.requestAnimationFrame(keepExpandedCardVisible);
    },
    [openServiceIndex, scrollImmediatelyBy]
  );

  const handleServiceHover = useCallback(
    (index: number, target: HTMLButtonElement) => {
      if (openServiceIndex === null || openServiceIndex === index) return;

      if (serviceAnchorFrame.current !== null) {
        window.cancelAnimationFrame(serviceAnchorFrame.current);
      }

      const anchoredTop = target.getBoundingClientRect().top;
      const startedAt = window.performance.now();
      setOpenServiceIndex(null);

      const maintainPointerAnchor = (now: number) => {
        const topDelta = target.getBoundingClientRect().top - anchoredTop;

        scrollImmediatelyBy(topDelta);

        if (now - startedAt < 520) {
          serviceAnchorFrame.current = window.requestAnimationFrame(
            maintainPointerAnchor
          );
        } else {
          serviceAnchorFrame.current = null;
        }
      };

      serviceAnchorFrame.current = window.requestAnimationFrame(
        maintainPointerAnchor
      );
    },
    [openServiceIndex, scrollImmediatelyBy]
  );

  useEffect(
    () => () => {
      if (serviceAnchorFrame.current !== null) {
        window.cancelAnimationFrame(serviceAnchorFrame.current);
      }
    },
    []
  );

  const openProject = useCallback((card: Project) => {
    if (!projectHistoryEntry.current) {
      window.history.pushState(
        { ...(window.history.state ?? {}), portfolioProjectDetail: true },
        ""
      );
      projectHistoryEntry.current = true;
    }
    setSelectedProject(card);
  }, []);

  const closeProject = useCallback(() => {
    const ownsHistoryEntry =
      projectHistoryEntry.current && window.history.state?.portfolioProjectDetail === true;

    projectHistoryEntry.current = false;
    setSelectedProject(null);

    if (ownsHistoryEntry) window.history.back();
  }, []);

  useEffect(() => {
    const closeProjectOnBack = () => {
      if (!projectHistoryEntry.current) return;
      projectHistoryEntry.current = false;
      setSelectedProject(null);
    };

    window.addEventListener("popstate", closeProjectOnBack);
    return () => window.removeEventListener("popstate", closeProjectOnBack);
  }, []);

  useEffect(() => {
    if (!selectedProject && !packagesOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedProject) closeProject();
        setPackagesOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeProject, selectedProject, packagesOpen]);

  useEffect(() => {
    let frame = 0;
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".stacked-scene"));

    const updateNavTone = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const navLine = 36;
        const activeScene = scenes
          .filter((scene) => {
            const bounds = scene.getBoundingClientRect();
            return bounds.top <= navLine && bounds.bottom > navLine;
          })
          .filter(
            (scene) => Number.parseFloat(window.getComputedStyle(scene).opacity) > 0.12
          )
          .at(-1);

        setNavOnDark(Boolean(activeScene?.classList.contains("on-dark")));
        const activeId = activeScene?.id;
        setActiveNavItem(
          activeId && ["services", "projects", "process", "contact"].includes(activeId)
            ? activeId
            : null
        );
      });
    };

    updateNavTone();
    window.addEventListener("scroll", updateNavTone, { passive: true });
    window.addEventListener("resize", updateNavTone);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNavTone);
      window.removeEventListener("resize", updateNavTone);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen bg-white text-ink">
        <SmoothScroll />
        <SmoothCursor />
        <ScrollProgress />
        <FloatingScrollbar />
        <IntroSplash />
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal card={selectedProject} onClose={closeProject} />
          )}
          {packagesOpen && <PackagesModal onClose={() => setPackagesOpen(false)} />}
        </AnimatePresence>
        <div className="noise" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFESSIONAL_SERVICE_SCHEMA) }}
        />

        <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-4 sm:px-6">
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: MOTION.duration.reveal, ease: EASE, delay: 0.12 }}
              className={`pointer-events-auto mx-auto flex h-12 items-center justify-center gap-3 font-sans transition-colors duration-[320ms] sm:gap-8 ${
                navOnDark ? "text-white" : "text-black"
              }`}
              aria-label="Main navigation"
            >
              <div className="flex items-center justify-center gap-3 sm:gap-8">
                {[...NAV_ITEMS, "Contact"].map((item, index) => {
                  const isActive =
                    item === "Packages" ? packagesOpen : activeNavItem === item.toLowerCase();

                  return item === "Packages" ? (
                    <motion.button
                      key={item}
                      type="button"
                      aria-pressed={isActive}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: MOTION.duration.base,
                        ease: EASE,
                        delay: 0.26 + index * 0.045
                      }}
                      className="relative text-[11px] font-normal transition-opacity duration-[320ms] hover:opacity-55 sm:text-sm"
                      onClick={() => setPackagesOpen(true)}
                    >
                      {item}
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-dot"
                          className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                            navOnDark ? "bg-white" : "bg-black"
                          }`}
                        />
                      )}
                    </motion.button>
                  ) : (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      aria-current={isActive ? "page" : undefined}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: MOTION.duration.base,
                        ease: EASE,
                        delay: 0.26 + index * 0.045
                      }}
                      className="relative text-[11px] font-normal transition-opacity duration-[320ms] hover:opacity-55 sm:text-sm"
                      onClick={() => setActiveNavItem(item.toLowerCase())}
                    >
                      {item}
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-dot"
                          className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                            navOnDark ? "bg-white" : "bg-black"
                          }`}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.nav>
        </header>

        <div className="relative z-10 bg-white">
          <StackedScene
            id="about"
            layer={1}
            className="relative isolate min-h-[100svh] overflow-hidden bg-white px-5 pt-[112px] sm:px-8 sm:pt-[132px] lg:px-12 lg:pt-[152px]"
          >
            <motion.div
              className="relative mx-auto min-h-[calc(100svh-112px)] max-w-7xl sm:min-h-[calc(100svh-132px)] lg:min-h-[calc(100svh-152px)]"
              onMouseMove={(event) => {
                if (reducedMotion) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                portraitX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
                portraitY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
              }}
              onMouseLeave={() => {
                portraitX.set(0);
                portraitY.set(0);
              }}
            >
              <p
                className="intro-hey-light pointer-events-none absolute inset-x-[-0.75rem] -top-1 z-20 flex items-center justify-between text-[clamp(3.9rem,18vw,6rem)] leading-none text-ink sm:inset-x-0 sm:top-8 sm:pl-[10%] sm:pr-[7%] sm:text-[clamp(6rem,13vw,8.5rem)] lg:pl-[16%] lg:pr-[11%] lg:text-[9rem]"
              >
                <span className="inline-block">Hey,</span>
                <span className="inline-block">there</span>
              </p>

              <div className="portrait-wrap absolute bottom-7 left-1/2 z-10 w-[min(140vw,580px)] -translate-x-1/2 sm:bottom-7 sm:w-[min(115vw,760px)] lg:bottom-6 lg:w-[700px]">
                <motion.div style={{ x: portraitX.spring, y: portraitY.spring }}>
                  <Image
                    src="/bilal-asif-portrait-2026-v4.webp"
                    alt="Bilal Asif, freelance website designer and digital growth partner"
                    width={1254}
                    height={1254}
                    priority
                    sizes="(min-width: 1024px) 700px, (min-width: 640px) min(115vw, 760px), min(155vw, 660px)"
                    className="portrait-image w-full object-contain"
                  />
                </motion.div>
              </div>

              <div className="absolute bottom-4 left-0 z-30 sm:bottom-6 lg:bottom-8">
                <p className="intro-name-optical whitespace-nowrap text-[clamp(2.1rem,10vw,3rem)] leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                  I am
                </p>
                <p className="intro-name-optical whitespace-nowrap text-[clamp(2.1rem,10vw,3rem)] leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                  Bilal Asif
                </p>
              </div>

              <motion.div
                className="pointer-events-none absolute bottom-5 right-0 z-30 flex items-center gap-2 text-ink/45 sm:bottom-7 lg:bottom-9"
                animate={{ opacity: [0.42, 0.78, 0.42] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <span className="hidden font-jetbrains text-[9px] font-medium uppercase tracking-[0.2em] sm:inline">
                  Scroll down to explore
                </span>
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-8 w-8 place-items-center rounded-full border border-ink/20"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </motion.span>
              </motion.div>
            </motion.div>
          </StackedScene>

          <StackedScene
            layer={2}
            className="relative flex min-h-[100svh] items-center overflow-hidden bg-transparent px-5 py-20 text-ink sm:px-8 sm:py-24 lg:px-12"
          >
            <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: MOTION.duration.reveal, ease: EASE }}
                className="font-jetbrains mb-7 text-[10px] font-medium uppercase tracking-[0.3em] text-ink/45 sm:mb-9 sm:text-xs"
              >
                Freelance Digital Growth Partner
              </motion.p>

              <h1 className="font-sans text-5xl font-semibold leading-[0.86] tracking-normal sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem]">
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    className="block text-black"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: MOTION.duration.slow, ease: EASE, delay: 0.06 }}
                  >
                    Grow Your
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-3">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: MOTION.duration.slow, ease: EASE, delay: 0.14 }}
                  >
                    <span className="business-online-pulse">Business Online</span>
                  </motion.span>
                </span>
              </h1>

              <Reveal delay={0.3} y={22} blur={3}>
                <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">
                  I help small businesses in the USA &amp; Europe turn clicks into customers through
                  websites, e-commerce, SEO, and paid ads. Friendly, reliable, and results-driven.
                </p>
              </Reveal>

              <Reveal delay={0.42} y={20} blur={2}>
                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                  <Magnetic>
                    <a
                      href="#projects"
                      className="crystal-border inline-flex min-h-14 items-center justify-center border border-ink px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-[320ms] hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <span aria-hidden="true" className="crystal-border-orbit" />
                      View My Work
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="crystal-border crystal-border--pill group inline-flex min-h-14 items-center justify-center gap-4 rounded-full border border-ink px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70 transition-all duration-[320ms] hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <span aria-hidden="true" className="crystal-border-orbit" />
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-ink text-ink transition-colors duration-[320ms] group-hover:border-white group-hover:text-white">
                        <WhatsAppIcon className="h-4 w-4" />
                      </span>
                      Chat on WhatsApp
                    </a>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            <motion.div
              className="absolute bottom-5 left-1/2 z-10 hidden flex-col items-center gap-2 text-ink/40 sm:flex"
              style={{ x: "-50%" }}
              animate={{ y: [0, 4, 0], opacity: [0.42, 0.72, 0.42] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <span className="text-[9px] font-medium uppercase tracking-[0.28em]">
                Scroll to explore
              </span>
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.div>
          </StackedScene>

          <StackedScene
            id="projects"
            layer={3}
            long
            overlapNext
            className="min-h-[100svh] overflow-x-clip bg-transparent px-5 pb-0 pt-20 sm:px-8 sm:pt-24 lg:px-12"
          >
            <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <Reveal y={24} blur={3}>
                <p className="font-jetbrains mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-black sm:text-xs">
                  ( Selected Work )
                </p>
                <h2 className="scroll-mt-28 font-sans text-5xl font-extrabold leading-[0.86] tracking-normal text-black sm:text-7xl lg:text-8xl">
                  <span className="block">Proof, not</span>
                  <span className="block">promises</span>
                </h2>
              </Reveal>

              <Reveal delay={0.15} y={18} blur={2}>
                <a
                  href="#contact"
                  className="font-jetbrains group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-normal text-ink/55 transition-colors duration-[320ms] hover:text-ink sm:text-sm"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-[320ms] ease-out-expo group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>

            <InfiniteStackedCarousel
              onOpen={openProject}
              reducedMotion={Boolean(reducedMotion)}
            />

            <div className="relative z-[2] -mx-5 h-[190px] bg-white sm:-mx-8 sm:h-[210px] md:h-[48svh] md:bg-transparent lg:-mx-12">
              <div className="flex h-full min-h-0 items-center bg-transparent px-5 sm:px-8 md:sticky md:top-0 md:h-[24svh] md:translate-y-[12svh] lg:px-12">
                <Reveal y={18} blur={2} className="w-full">
                  <dl className="grid w-full grid-cols-4 py-5 sm:py-7 lg:py-6">
                    {PROJECT_METRICS.map((metric, index) => (
                      <div
                        key={metric.label}
                        className="flex min-w-0 flex-col items-center justify-center px-1 py-3 text-center sm:min-h-28 sm:px-4 sm:py-4 lg:min-h-36 lg:px-12"
                      >
                        <dt className="order-2 mt-2 text-center text-[7px] font-semibold uppercase leading-tight tracking-normal text-black/55 sm:text-xs lg:text-sm">
                          {metric.label}
                        </dt>
                        <AnimatedMetricValue value={metric.value} delay={index * 0.1} />
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>
          </StackedScene>

          <StackedScene
            id="services"
            layer={4}
            long
            linearExitFade
            pinAtEnd
            pullFromBottom
            className="on-dark min-h-[100svh] scroll-mt-0 bg-black pb-0 pt-16 text-white sm:pt-20"
          >
            <div className="w-full">
              <div className="grid gap-8 border-b border-white/15 px-5 pb-10 sm:grid-cols-[1fr_auto] sm:items-end sm:px-8 lg:px-12 lg:pb-12">
                <Reveal y={24} blur={3}>
                  <p className="font-jetbrains mb-6 text-[10px] font-medium uppercase tracking-normal text-white sm:text-xs">
                    What I Do
                  </p>
                  <h2 className="font-sans text-5xl font-extrabold leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl">
                    Services
                  </h2>
                </Reveal>

              </div>

              <div>
                {SERVICES.map((service, index) => (
                  <ServiceItem
                    key={service.title}
                    service={service}
                    index={index}
                    open={openServiceIndex === index}
                    onToggle={(target) => handleServiceToggle(index, target)}
                    onHover={(target) => handleServiceHover(index, target)}
                  />
                ))}
                <div className="h-24 bg-black sm:h-28" aria-hidden="true" />
              </div>
            </div>
          </StackedScene>

          <StackedScene
            id="process"
            layer={5}
            deferExitOnMobile
            className="min-h-[100svh] scroll-mt-24 overflow-hidden rounded-t-[24px] bg-white px-5 py-20 shadow-[0_-22px_60px_rgba(0,0,0,0.18)] sm:px-8 sm:py-28 lg:px-12"
          >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <Reveal y={24} blur={3}>
                  <p className="font-jetbrains mb-8 text-[10px] font-medium uppercase tracking-normal text-ink/45 sm:text-xs">
                    ( The Approach )
                  </p>
                  <h2 className="max-w-xl font-sans text-6xl font-semibold leading-[0.86] tracking-normal text-ink sm:text-7xl lg:text-[6.5rem]">
                    How I
                    <span className="block">drive</span>
                    <span className="block">growth</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12} y={18} blur={2}>
                  <p className="mt-8 max-w-lg text-base leading-8 text-ink/60 sm:text-lg">
                    A proven process that turns marketing from a cost centre into your most reliable growth
                    engine.
                  </p>
                </Reveal>
              </div>

              <div className="space-y-9 lg:pt-8">
                {APPROACH_STEPS.map((step, index) => (
                  <Reveal key={step.title} delay={index * 0.08} y={22} blur={2}>
                    <div className="grid grid-cols-[2rem_1fr] gap-4 sm:grid-cols-[2.5rem_1fr] sm:gap-6">
                      <span className="pt-1 text-sm font-medium tabular-nums text-ink/30 sm:text-base">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-sans text-2xl font-bold leading-tight tracking-normal text-ink sm:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-ink/60 sm:text-base sm:leading-8">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </StackedScene>

          <StackedScene
            layer={6}
            long
            className="on-dark min-h-[100svh] bg-black px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12"
          >
            <div className="mx-auto max-w-4xl">
              <Reveal y={24} blur={3}>
                <div className="text-center">
                  <p className="font-jetbrains text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45 sm:text-xs">
                    ( FAQ )
                  </p>
                  <h2 className="mt-8 font-sans text-6xl font-extrabold leading-[0.84] tracking-normal text-white sm:text-8xl lg:text-9xl">
                    <span className="block">Good</span>
                    <span className="block">questions</span>
                  </h2>
                </div>
              </Reveal>

              <div className="mx-auto mt-14 max-w-3xl border-t border-white/15 sm:mt-20">
                {FAQS.map((faq, index) => (
                  <FaqItem key={faq.question} faq={faq} index={index} />
                ))}
              </div>
            </div>
          </StackedScene>

          <StackedScene
            id="contact"
            layer={7}
            long
            className="on-dark min-h-[100svh] scroll-mt-24 bg-black px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12"
          >
            <div className="mx-auto flex min-h-[calc(100svh-8rem)] max-w-7xl flex-col sm:min-h-[calc(100svh-10rem)]">
              <div className="flex flex-1 flex-col items-center justify-center text-center">
              <Reveal y={20} blur={2}>
                <p className="font-jetbrains text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45 sm:text-xs">
                  Get in touch
                </p>
              </Reveal>

              <Reveal delay={0.08} y={28} blur={3}>
                <h2 className="mt-8 font-sans text-[clamp(3rem,12vw,5rem)] font-extrabold leading-[0.96] tracking-normal text-white md:text-8xl md:leading-[0.9] lg:text-9xl lg:leading-[0.84]">
                  <span className="block">Ready to</span>
                  <span className="block text-white/20">grow your</span>
                  <span className="block">business?</span>
                </h2>
              </Reveal>

              <Reveal delay={0.16} y={22} blur={2}>
                <p className="mx-auto mt-9 max-w-3xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
                  I work with small businesses across the USA and Europe. Whether you need a new
                  website, better SEO or profitable ad campaigns, let&apos;s talk.
                </p>
              </Reveal>

              <Reveal delay={0.24} y={18} blur={2}>
                <a
                  href={`mailto:${CONTACT.email}?subject=Business%20growth%20project%20with%20Bilal`}
                  className="group mt-10 inline-flex items-center gap-3 font-sans text-2xl font-extrabold tracking-normal text-white transition-colors duration-[320ms] hover:text-white/70 sm:text-4xl"
                >
                  {CONTACT.email}
                  <ArrowUpRight className="h-6 w-6 transition-transform duration-[320ms] ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-8 sm:w-8" />
                </a>
              </Reveal>

              <Reveal delay={0.32} y={18} blur={2}>
                <Magnetic>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-10 inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-white px-8 text-xs font-bold uppercase tracking-[0.2em] text-black transition-transform duration-[320ms] ease-out-expo hover:scale-[1.015] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-10"
                  >
                    <WhatsAppIcon />
                    Message on WhatsApp
                  </a>
                </Magnetic>
              </Reveal>

              <Reveal delay={0.4} y={14} blur={1}>
                <div className="mt-12 flex items-center justify-center gap-3">
                  {[
                    {
                      label: "WhatsApp",
                      href: CONTACT.whatsapp,
                      icon: <WhatsAppIcon />
                    },
                    {
                      label: "Instagram",
                      href: CONTACT.instagram,
                      icon: <InstagramIcon />
                    },
                    {
                      label: "LinkedIn",
                      href: CONTACT.linkedin,
                      icon: <LinkedInIcon />
                    },
                    {
                      label: "Email",
                      href: `mailto:${CONTACT.email}`,
                      icon: <Mail className="h-5 w-5" />
                    }
                  ].map((item) => {
                    const external = item.href.startsWith("http");
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        aria-label={item.label}
                        title={item.label}
                        className="group grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/55 transition-all duration-[320ms] hover:border-white/50 hover:bg-white hover:text-black sm:h-14 sm:w-14"
                      >
                        {item.icon}
                      </a>
                    );
                  })}
                </div>
              </Reveal>
              </div>

              <div className="mt-16 flex w-full flex-col gap-5 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                <p>{new Date().getFullYear()} Bilal Asif. All rights reserved.</p>
                <div className="flex items-center gap-8">
                  <span>Privacy</span>
                  <span>Terms</span>
                </div>
              </div>
            </div>
          </StackedScene>
        </div>
      </main>
    </MotionConfig>
  );
}
