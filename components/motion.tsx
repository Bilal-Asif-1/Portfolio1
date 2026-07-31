"use client";

import { useEffect, useRef } from "react";
import type { ComponentProps, ReactNode } from "react";
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
    let visible = false;

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

    const startRendering = () => {
      if (frame || !visible) return;
      previousFrameTime = performance.now();
      frame = window.requestAnimationFrame(renderCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!initialized) {
        cursorX = mouseX;
        cursorY = mouseY;
        initialized = true;
      }
      visible = true;
      cursor.classList.add("is-visible");
      setInteractiveState(
        Boolean((event.target as Element | null)?.closest?.(CURSOR_INTERACTIVE_SELECTOR))
      );
      startRendering();
    };

    const hideCursor = () => {
      visible = false;
      cursor.classList.remove("is-visible");
      setInteractiveState(false);
      window.cancelAnimationFrame(frame);
      frame = 0;
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
      const stillMoving =
        Math.abs(mouseX - cursorX) > 0.05 ||
        Math.abs(mouseY - cursorY) > 0.05 ||
        Math.abs(dotTargetX - dotX) > 0.05 ||
        Math.abs(dotTargetY - dotY) > 0.05;
      frame = stillMoving && visible ? window.requestAnimationFrame(renderCursor) : 0;
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    window.addEventListener("scroll", updateInteractiveAtPointer, { passive: true });
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
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
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

    let scrollIdleTimer = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let hasPointerPosition = false;
    let forcedServiceRow: HTMLElement | null = null;

    const clearForcedServiceHover = () => {
      forcedServiceRow?.classList.remove("service-row--cursor-active");
      forcedServiceRow = null;
    };

    const restoreServiceHover = () => {
      document.body.classList.remove("scroll-input-active");
      if (!hasPointerPosition) return;
      forcedServiceRow =
        document
          .elementFromPoint(pointerX, pointerY)
          ?.closest<HTMLElement>(
            '.service-row[data-service-open="false"]'
          ) ?? null;
      forcedServiceRow?.classList.add("service-row--cursor-active");
    };

    const markScrollActive = () => {
      clearForcedServiceHover();
      document.body.classList.add("scroll-input-active");
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(restoreServiceHover, 24);
    };

    const trackPointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      hasPointerPosition = true;
      if (!document.body.classList.contains("scroll-input-active")) {
        clearForcedServiceHover();
      }
    };

    const removeVirtualScrollListener = lenis.on(
      "virtual-scroll",
      markScrollActive
    );
    window.addEventListener("pointermove", trackPointer, { passive: true });

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
      lenis.scrollTo(target as HTMLElement, { offset: -88, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.clearTimeout(scrollIdleTimer);
      document.removeEventListener("click", onClick);
      removeVirtualScrollListener();
      window.removeEventListener("pointermove", trackPointer);
      document.body.classList.remove("scroll-input-active");
      clearForcedServiceHover();
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}

const FOCUS_ITEM_SELECTOR =
  '[data-focus-target], [data-focus-on-click], [data-project-trigger], [data-timeline-item], .service-row, article, section';
const FOCUS_CONTROL_SELECTOR =
  'a, button, [role="button"], summary, input, textarea, select, [tabindex]:not([tabindex="-1"])';

function getFocusTarget(origin: Element) {
  if (origin.closest('[data-focus-on-click="false"], [data-dialog-close]')) {
    return null;
  }

  if (origin.closest('[role="dialog"], [aria-modal="true"], [data-intro-splash]')) {
    return null;
  }

  const control = origin.closest<HTMLElement>(FOCUS_CONTROL_SELECTOR);
  if (control?.closest('[data-focus-navigation]')) return null;

  const link = control?.closest<HTMLAnchorElement>('a[href]');
  if (link && !link.getAttribute('href')?.startsWith('#')) return null;

  return (
    origin.closest<HTMLElement>(FOCUS_ITEM_SELECTOR) ??
    control ??
    null
  );
}

function scrollElementIntoFocus(element: HTMLElement) {
  if (!element.isConnected) return;
  const navbar = document.querySelector<HTMLElement>('[data-focus-navigation]');
  const navbarBottom = Math.max(16, navbar?.getBoundingClientRect().bottom ?? 0);
  const viewportBottom = window.innerHeight - 20;
  const availableHeight = Math.max(1, viewportBottom - navbarBottom);
  const bounds = element.getBoundingClientRect();
  const isFullyVisible =
    bounds.top >= navbarBottom && bounds.bottom <= viewportBottom;

  if (isFullyVisible || bounds.height <= 0) return;

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const targetTop =
    bounds.height <= availableHeight
      ? navbarBottom + (availableHeight - bounds.height) / 2
      : navbarBottom + 20;
  const destination = Math.min(
    maxScroll,
    Math.max(0, window.scrollY + bounds.top - targetTop)
  );

  if (Math.abs(destination - window.scrollY) < 2) return;

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const lenis = getLenis();
  if (lenis && !reduceMotion) {
    lenis.scrollTo(destination, { duration: 0.72, force: true });
    return;
  }

  window.scrollTo({
    top: destination,
    behavior: reduceMotion ? 'auto' : 'smooth'
  });
}

export function FocusOnClick() {
  useEffect(() => {
    let frame = 0;
    let resizeTimer = 0;
    let stopObservingTimer = 0;
    let observer: ResizeObserver | null = null;

    const clearPendingFocus = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(stopObservingTimer);
      observer?.disconnect();
      observer = null;
    };

    const focusTarget = (target: HTMLElement) => {
      clearPendingFocus();
      frame = window.requestAnimationFrame(() => scrollElementIntoFocus(target));

      // A short-lived observer lets expanding accordions and responsive cards
      // settle before one final alignment, without persistent per-item work.
      if (!('ResizeObserver' in window)) return;
      observer = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          frame = window.requestAnimationFrame(() =>
            scrollElementIntoFocus(target)
          );
        }, 90);
      });
      observer.observe(target);
      stopObservingTimer = window.setTimeout(() => {
        observer?.disconnect();
        observer = null;
      }, 700);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const target = getFocusTarget(origin);
      if (!target) return;

      focusTarget(target);
    };

    document.addEventListener('click', handleClick);
    return () => {
      clearPendingFocus();
      document.removeEventListener('click', handleClick);
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
      className="fixed inset-x-0 top-0 z-[60] hidden h-0.5 origin-left bg-black md:block"
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
  once = true,
  viewportMargin
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Entrance blur in pixels; settles to 0 as the element reveals. */
  blur?: number;
  once?: boolean;
  viewportMargin?: NonNullable<
    ComponentProps<typeof motion.div>["viewport"]
  >["margin"];
}) {
  return (
    <motion.div
      className={clsx("scroll-reveal-filter", className)}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: viewportMargin ?? "-8% 0px -10%" }}
      transition={{ duration: 0.82, ease: EASE, delay }}
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
