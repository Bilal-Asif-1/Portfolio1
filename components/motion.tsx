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
  useSpring
} from "framer-motion";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
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
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    lenisInstance = lenis;

    let frame = 0;
    let inputIdleTimer = 0;
    let inputActive = false;
    let hasPointerPosition = false;
    let activeServiceRow: HTMLElement | null = null;
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

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

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
      lenis.scrollTo(target as HTMLElement, { offset: -104, duration: 1.3 });
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

    const onLenisScroll = () => updateHoverAtPointer();

    const trackPointer = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      hasPointerPosition = true;
      updateHoverAtPointer();
    };

    const removeVirtualScrollListener = lenis.on("virtual-scroll", onVirtualScroll);
    const removeScrollListener = lenis.on("scroll", onLenisScroll);
    window.addEventListener("mousemove", trackPointer);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(inputIdleTimer);
      document.removeEventListener("click", onClick);
      removeVirtualScrollListener();
      removeScrollListener();
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
    stiffness: 180,
    damping: 32,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-ink"
      style={{ scaleX }}
    />
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  blur = 6,
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
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
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
      className={clsx("block", className)}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
        : {
            whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
            viewport: { once, margin: "-12%" }
          })}
      transition={{ duration: 0.8, ease: EASE, delay }}
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
  max = 7
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20, mass: 0.5 });
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
  strength = 0.22
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });
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
