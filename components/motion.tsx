"use client";

import { Fragment, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import clsx from "clsx";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const MOTION = {
  duration: {
    instant: 0.16,
    fast: 0.24,
    base: 0.42,
    reveal: 0.68,
    slow: 0.9
  },
  spring: {
    interactive: { stiffness: 320, damping: 28, mass: 0.55 },
    subtle: { stiffness: 220, damping: 26, mass: 0.65 }
  }
} as const;

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

const CURSOR_INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, input, textarea, select, .service-row';

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;
    document.body.classList.add("has-smooth-cursor");

    let frame = 0;
    let initialized = false;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let previousFrameTime = performance.now();
    let hoveringInteractive = false;

    const setInteractiveState = (interactive: boolean) => {
      if (interactive === hoveringInteractive) return;
      hoveringInteractive = interactive;
      cursor.classList.toggle("is-hovering", interactive);
    };

    const updateInteractiveAtPointer = () => {
      if (!initialized) return;
      const target = document.elementFromPoint(mouseX, mouseY);
      setInteractiveState(Boolean(target?.closest(CURSOR_INTERACTIVE_SELECTOR)));
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!initialized) {
        cursorX = mouseX;
        cursorY = mouseY;
        initialized = true;
      }
      cursor.classList.add("is-visible");
      setInteractiveState(
        Boolean((event.target as Element | null)?.closest?.(CURSOR_INTERACTIVE_SELECTOR))
      );
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible");
      setInteractiveState(false);
    };

    const renderCursor = (time: number) => {
      const frameDelta = Math.min(32, Math.max(1, time - previousFrameTime));
      previousFrameTime = time;
      const cursorFollow = 1 - Math.pow(1 - 0.24, frameDelta / 16.667);
      const dotFollow = 1 - Math.pow(1 - 0.48, frameDelta / 16.667);
      cursorX += (mouseX - cursorX) * cursorFollow;
      cursorY += (mouseY - cursorY) * cursorFollow;
      const dotLimit = hoveringInteractive ? 32 : 18;
      const dotTargetX = Math.max(
        -dotLimit,
        Math.min(dotLimit, (mouseX - cursorX) * 0.65)
      );
      const dotTargetY = Math.max(
        -dotLimit,
        Math.min(dotLimit, (mouseY - cursorY) * 0.65)
      );
      dotX += (dotTargetX - dotX) * dotFollow;
      dotY += (dotTargetY - dotY) * dotFollow;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      frame = window.requestAnimationFrame(renderCursor);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    window.addEventListener("scroll", updateInteractiveAtPointer, { passive: true });
    frame = window.requestAnimationFrame(renderCursor);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      window.removeEventListener("scroll", updateInteractiveAtPointer);
      document.body.classList.remove("has-smooth-cursor");
    };
  }, []);

  return (
    <div ref={cursorRef} className="smooth-cursor" aria-hidden="true">
      <span ref={dotRef} className="smooth-cursor-dot" />
    </div>
  );
}

export function SmoothScroll() {
  useEffect(() => {
    // Browsers restore the previous scroll position on reload. Since the
    // hero fade and every whileInView reveal are keyed off scroll position
    // at mount, loading mid-scroll left them stuck faded/hidden. Always
    // start fresh at the top so the reveal sequence is consistent.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Native scrolling is more stable on touch screens (especially iOS/iPadOS)
    // and avoids running a second momentum system over the browser's own one.
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 0.85,
      overscroll: false,
      autoRaf: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    lenisInstance = lenis;

    let inputIdleTimer = 0;
    let inputActive = false;
    let hasPointerPosition = false;
    let activeServiceRow: HTMLElement | null = null;
    let servicesInViewport = false;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const clearForcedServiceHover = () => {
      activeServiceRow?.classList.remove("service-row--cursor-active");
      activeServiceRow = null;
    };

    const updateHoverAtPointer = () => {
      if (inputActive || !hasPointerPosition) return;

      const nextServiceRow = document
        .elementFromPoint(pointerX, pointerY)
        ?.closest<HTMLElement>(".service-row") ?? null;

      if (nextServiceRow === activeServiceRow) return;
      clearForcedServiceHover();
      activeServiceRow = nextServiceRow;
      activeServiceRow?.classList.add("service-row--cursor-active");
    };

    const releaseInputHoverGate = () => {
      inputActive = false;
      document.body.classList.remove("scroll-input-active");
      updateHoverAtPointer();
    };

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      const isServicesTarget = hash === "#services";
      const scrollTarget = isServicesTarget
        ? target.closest<HTMLElement>(".stacked-scene-track") ?? target
        : target;
      if (isServicesTarget) {
        const trackTop =
          scrollTarget.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(trackTop, {
          offset: 0,
          duration: 1.3,
          force: true
        });
        return;
      }
      lenis.scrollTo(scrollTarget as HTMLElement, { offset: -104, duration: 1.3 });
    };
    document.addEventListener("click", onClick);

    const onVirtualScroll = ({ event }: { event: WheelEvent | TouchEvent }) => {
      if ("clientX" in event) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        hasPointerPosition = true;
      }

      inputActive = true;
      clearForcedServiceHover();
      document.body.classList.add("scroll-input-active");
      window.clearTimeout(inputIdleTimer);
      inputIdleTimer = window.setTimeout(releaseInputHoverGate, 48);
    };

    const onLenisScroll = () => {
      if (servicesInViewport || activeServiceRow) updateHoverAtPointer();
    };

    const trackPointer = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      hasPointerPosition = true;
      updateHoverAtPointer();
    };

    const removeVirtualScrollListener = lenis.on("virtual-scroll", onVirtualScroll);
    const removeScrollListener = lenis.on("scroll", onLenisScroll);
    const servicesSection = document.getElementById("services");
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        servicesInViewport = Boolean(entry?.isIntersecting);
        if (!servicesInViewport) clearForcedServiceHover();
      },
      { rootMargin: "20% 0px" }
    );
    if (servicesSection) servicesObserver.observe(servicesSection);
    window.addEventListener("mousemove", trackPointer);

    return () => {
      window.clearTimeout(inputIdleTimer);
      document.removeEventListener("click", onClick);
      removeVirtualScrollListener();
      removeScrollListener();
      servicesObserver.disconnect();
      window.removeEventListener("mousemove", trackPointer);
      document.body.classList.remove("scroll-input-active");
      clearForcedServiceHover();
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    ...MOTION.spring.subtle,
    restDelta: 0.001,
    restSpeed: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-ink"
      style={{ scaleX }}
    />
  );
}

export function FloatingScrollbar() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.5,
    restDelta: 0.0005,
    restSpeed: 0.0005
  });
  const thumbY = useTransform(
    smoothProgress,
    (value) =>
      `calc(${value} * (var(--floating-scroll-height) - var(--floating-thumb-height)))`
  );
  return (
    <div className="floating-scrollbar" aria-hidden="true">
      <div className="floating-scrollbar-rail" />
      <motion.div className="floating-scrollbar-thumb" style={{ y: thumbY }} />
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  blur = 2,
  once = true
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Entrance blur in pixels; settles to 0 as the element reveals. */
  blur?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={clsx("scroll-reveal-filter", className)}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -8%" }}
      transition={{ duration: MOTION.duration.reveal, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export type TextSegment = { text: string; className?: string };

export function TextReveal({
  segments,
  className,
  delay = 0,
  stagger = 0.055,
  once = true,
  immediate = false
}: {
  segments: TextSegment[];
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /**
   * Play on mount instead of on scroll into view. Use for content near the
   * viewport edge on load (e.g. hero text), where whileInView may never fire.
   */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {segments.map((segment, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <span className={segment.className}>{segment.text}</span>
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={clsx("scroll-reveal-filter block", className)}
      initial={{ opacity: 0, y: 18, filter: "blur(2px)" }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
        : {
            whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
            viewport: { once, margin: "-12%" }
          })}
      transition={{ duration: MOTION.duration.reveal, ease: EASE, delay }}
    >
      {segments.map((segment, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          <span className={segment.className}>{segment.text}</span>
        </Fragment>
      ))}
    </motion.span>
  );
}

export function Tilt({
  children,
  className,
  max = 4
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, MOTION.spring.subtle);
  const springY = useSpring(rotateY, MOTION.spring.subtle);
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 2 * max);
        rotateX.set(-py * 2 * max);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.14
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, MOTION.spring.interactive);
  const springY = useSpring(y, MOTION.spring.interactive);
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={clsx("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={clsx("inline-block", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
