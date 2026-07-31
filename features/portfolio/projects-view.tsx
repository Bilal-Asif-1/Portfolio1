"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  animate,
  motion,
  type MotionValue,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform
} from "framer-motion";
import { EASE, MOTION, Reveal } from "@/components/motion";
import {
  FEATURED_PROJECTS,
  PROJECT_METRICS
} from "@/features/portfolio/data";
import type { Project } from "@/features/portfolio/types";
import { ExperienceLink } from "@/components/experience-link";
import { trackLead } from "@/components/lead-link";

function wrapDistance(value: number, total: number) {
  return ((value + total / 2) % total + total) % total - total / 2;
}

function ProjectCard({
  cardIndex,
  index,
  total,
  rotation,
  didDrag,
  loadPriority,
  onCenter
}: {
  cardIndex: number;
  index: number;
  total: number;
  rotation: MotionValue<number>;
  didDrag: { current: boolean };
  loadPriority: "high" | "eager" | "lazy";
  onCenter: (index: number) => void;
}) {
  const position = useTransform(rotation, (value) =>
    wrapDistance(index - value, total)
  );
  const distance = useTransform(position, (value) => Math.abs(value));
  const x = useTransform(
    position,
    (value) => `calc(${value} * var(--stacked-carousel-step))`
  );
  const y = useTransform(distance, [0, 1, 2, 3, 5], [0, 18, 32, 58, 74]);
  const scale = useTransform(
    distance,
    [0, 1, 2, 3, 5],
    [1.08, 1, 0.97, 0.94, 0.92]
  );
  const opacity = useTransform(distance, [0, 3.5, 5, 6], [1, 1, 0.7, 0]);
  const zIndex = useTransform(distance, (value) =>
    Math.round(1000 - value * 100)
  );
  const visibility = useTransform(distance, (value) =>
    value < 6 ? "visible" : "hidden"
  );
  const pointerEvents = useTransform(distance, (value) =>
    value < 4.5 ? "auto" : "none"
  );

  return (
    <motion.div
      data-focus-target
      className="stacked-project-card absolute left-1/2 top-8 h-[255px] w-[176px] overflow-hidden rounded-card sm:top-10 sm:h-[325px] sm:w-[218px] lg:top-12 lg:h-[380px] lg:w-[258px]"
      style={{ x, y, scale, opacity, zIndex, visibility, pointerEvents }}
      onClick={() => {
        if (!didDrag.current) onCenter(index);
      }}
    >
      <ProjectPoster
        card={FEATURED_PROJECTS[cardIndex]}
        loadPriority={loadPriority}
      />
    </motion.div>
  );
}

function ProjectPoster({
  card,
  loadPriority
}: {
  card: Project;
  loadPriority: "high" | "eager" | "lazy";
}) {
  return (
    <div className="group relative h-full w-full overflow-hidden bg-white text-ink">
      <Image
        src={card.image}
        alt={`${card.title} ${card.eyebrow} poster visual`}
        fill
        priority={loadPriority === "high"}
        loading={loadPriority === "high" ? undefined : loadPriority}
        fetchPriority={loadPriority === "high" ? "high" : "auto"}
        placeholder="blur"
        sizes="(min-width: 1024px) 258px, (min-width: 640px) 218px, 176px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
        <h2 className="project-card-heading max-w-[88%] font-sans text-[1.15rem] font-medium not-italic leading-none tracking-[-0.01em] text-white drop-shadow-sm sm:text-[1.35rem]">
          {card.title}
        </h2>
        <p className="sr-only">{card.description}</p>
        <Link
          href={`/projects/${card.slug}`}
          className="group/btn pointer-events-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/85 bg-transparent py-1.5 pl-3.5 pr-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-[320ms] hover:bg-white hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={`Open ${card.title} case study`}
          onClick={(event) => event.stopPropagation()}
        >
          <span>Details</span>
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/85 bg-transparent text-white transition-colors duration-[320ms] group-hover/btn:border-ink group-hover/btn:bg-ink group-hover/btn:text-white">
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-[320ms] group-hover/btn:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function ProjectsCarousel({
  reducedMotion
}: {
  reducedMotion: boolean;
}) {
  const carouselCards = [...FEATURED_PROJECTS, ...FEATURED_PROJECTS];
  const initialRotation = FEATURED_PROJECTS.length + 3;
  const rotation = useMotionValue(initialRotation);
  const [activeCard, setActiveCard] = useState(
    Math.round(rotation.get()) % FEATURED_PROJECTS.length
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { amount: 0.3 });
  const entered = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartRotation = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const releaseVelocity = useRef(0);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const gestureAxis = useRef<"pending" | "horizontal" | "vertical">(
    "pending"
  );
  const rotationAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const wheelTarget = useRef(rotation.get());
  const lastWheelTime = useRef(0);

  useEffect(
    () =>
      rotation.on("change", (latest) => {
        const nextIndex =
          ((Math.round(latest) % FEATURED_PROJECTS.length) +
            FEATURED_PROJECTS.length) %
          FEATURED_PROJECTS.length;
        setActiveCard(nextIndex);
      }),
    [rotation]
  );

  const stopAnimation = () => {
    rotationAnimation.current?.stop();
    rotationAnimation.current = null;
  };

  const centerCard = (index: number) => {
    stopAnimation();
    const current = rotation.get();
    const delta = wrapDistance(index - current, carouselCards.length);
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

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
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

  useEffect(() => () => stopAnimation(), []);

  useEffect(() => {
    if (!isInView || entered.current || reducedMotion || dragging.current) return;
    entered.current = true;
    stopAnimation();
    rotationAnimation.current = animate(rotation, rotation.get() + 0.28, {
      duration: 1.05,
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
      const horizontal =
        event.shiftKey ||
        (Math.abs(event.deltaX) > 4 &&
          Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.25);
      if (!horizontal) return;

      const delta = event.shiftKey ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 0.1) return;
      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelTime.current > 160) {
        wheelTarget.current = rotation.get();
      }
      lastWheelTime.current = now;
      wheelTarget.current += Math.max(-180, Math.min(180, delta)) / 340;
      stopAnimation();

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
      viewport={{ once: true, margin: "-8% 0px -10%" }}
      transition={{
        duration: 0.82,
        ease: EASE,
        delay: 0.16
      }}
      className="stacked-carousel relative -mx-5 mt-4 h-[360px] cursor-grab select-none overflow-hidden active:cursor-grabbing sm:-mx-8 sm:mt-6 sm:h-[450px] lg:-mx-12 lg:h-[510px]"
      role="region"
      aria-label="Featured projects carousel. Drag or scroll horizontally to browse."
      onPointerDown={(event) => {
        stopAnimation();
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
        const cardTravel = Math.max(
          210,
          Math.min(window.innerWidth * 0.24, 390)
        );
        rotation.set(dragStartRotation.current - distanceX / cardTravel);

        const now = performance.now();
        const elapsed = Math.max(8, now - lastPointerTime.current);
        releaseVelocity.current =
          (-(event.clientX - lastPointerX.current) /
            cardTravel /
            elapsed) *
          1000;
        lastPointerX.current = event.clientX;
        lastPointerTime.current = now;
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <div className="absolute inset-0">
        {carouselCards.map((card, index) => (
          <ProjectCard
            key={`${card.title}-${index}`}
            cardIndex={index % FEATURED_PROJECTS.length}
            index={index}
            total={carouselCards.length}
            rotation={rotation}
            didDrag={didDrag}
            loadPriority={
              index === initialRotation
                ? "high"
                : Math.abs(index - initialRotation) === 1
                  ? "eager"
                  : "lazy"
            }
            onCenter={centerCard}
          />
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-2 left-1/2 z-[220] -translate-x-1/2 whitespace-nowrap font-jetbrains text-[9px] uppercase tracking-[0.2em] text-ink/60 sm:bottom-4 sm:text-[10px]">
        Drag or scroll sideways
      </p>
      <p
        className="pointer-events-none absolute bottom-2 left-5 z-[220] font-jetbrains text-[9px] font-medium tabular-nums tracking-[0.18em] text-ink/60 sm:bottom-4 sm:left-8 sm:text-[10px] lg:left-12"
        aria-live="polite"
      >
        {String(activeCard + 1).padStart(2, "0")} /{" "}
        {String(FEATURED_PROJECTS.length).padStart(2, "0")}
      </p>
    </motion.div>
  );
}

function AnimatedMetric({
  value,
  delay
}: {
  value: string;
  delay: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
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
    const suffix = value.slice(
      (numberMatch.index ?? 0) + numberMatch[0].length
    );
    const decimal = !Number.isInteger(target);
    const controls = animate(0, target, {
      duration: 1.2,
      delay,
      ease: EASE,
      onUpdate: (latest) => {
        element.textContent = `${prefix}${
          decimal ? latest.toFixed(1) : Math.round(latest)
        }${suffix}`;
      }
    });
    return () => controls.stop();
  }, [delay, inView, reducedMotion, value]);

  return (
    <dd
      ref={ref}
      className="metric-value order-1 text-[clamp(1.5rem,7vw,2.5rem)] font-extrabold leading-none text-black sm:text-5xl lg:text-6xl"
    >
      0
    </dd>
  );
}

export function ProjectsView() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-0 bg-transparent pt-20 sm:pt-24 md:min-h-[100svh]">
        <section className="flex-1 overflow-x-clip px-5 pb-10 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <Reveal y={24} blur={3}>
              <p className="font-jetbrains mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-black sm:text-xs">
                ( Selected Work )
              </p>
              <h1 className="font-sans text-5xl font-extrabold leading-[0.86] tracking-normal text-black sm:text-7xl lg:text-8xl">
                <span className="block">Proof, not</span>
                <span className="block">promises</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12} y={18} blur={2}>
              <ExperienceLink
                href="/contact"
                onClick={() => trackLead("project_cta")}
                className="font-jetbrains group inline-flex items-center gap-4 text-xs font-semibold uppercase text-ink/60 transition-colors duration-[320ms] hover:text-ink sm:text-sm"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform duration-[320ms] group-hover:translate-x-1" />
              </ExperienceLink>
            </Reveal>
          </div>

          <ProjectsCarousel reducedMotion={Boolean(reducedMotion)} />

          <Reveal y={14} blur={1}>
            <dl className="mx-auto grid max-w-7xl grid-cols-4 py-9 sm:py-9 lg:py-10">
              {PROJECT_METRICS.map((metric, index) => (
                <div
                  key={metric.label}
                  className="flex min-w-0 flex-col items-center justify-center px-0.5 py-4 text-center sm:px-4"
                >
                  <dt className="order-2 mt-2 text-[8px] font-semibold uppercase leading-tight text-black/55 sm:text-xs lg:text-sm">
                    {metric.label}
                  </dt>
                  <AnimatedMetric value={metric.value} delay={index * 0.08} />
                </div>
              ))}
            </dl>
          </Reveal>


        </section>
    </div>
  );
}
