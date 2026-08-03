"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { ExperienceLink } from "@/components/experience-link";
import portraitImage from "@/public/bilal-asif-portrait-2026-v5.webp";

export function HomeIntro({
  isPrimaryHeading = true
}: {
  isPrimaryHeading?: boolean;
}) {
  const portraitRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-transparent px-5 pt-20 sm:px-8 sm:pt-24 lg:px-12">
      <div
        className="relative mx-auto min-h-[calc(100svh-5rem)] max-w-7xl sm:min-h-[calc(100svh-6rem)]"
        onMouseMove={(event) => {
          if (
            !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            return;
          }
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
          portraitRef.current?.style.setProperty(
            "transform",
            `translate3d(${x}px, ${y}px, 0)`
          );
        }}
        onMouseLeave={() => {
          portraitRef.current?.style.removeProperty("transform");
        }}
      >
        <p className="intro-hey-light pointer-events-none absolute inset-x-[-0.9rem] top-[clamp(9.5rem,26svh,19rem)] z-30 flex items-center justify-between overflow-visible px-[clamp(0.25rem,4vw,4rem)] text-[clamp(4rem,19vw,6.2rem)] leading-none text-ink sm:inset-x-0 sm:top-[13%] sm:justify-center sm:gap-[clamp(10rem,24vw,22rem)] sm:px-0 sm:text-[clamp(6rem,13vw,8.5rem)] lg:text-[9rem]">
          <span>Hey,</span>
          <span>there</span>
        </p>

        <div className="absolute bottom-0 left-1/2 z-20 w-[min(145vw,650px,calc(100svh-5.5rem))] -translate-x-1/2 sm:w-[min(84vw,760px,calc(100svh-5.5rem))] lg:w-[min(700px,70vw,calc(100svh-5.5rem))]">
          <div ref={portraitRef} className="portrait-motion">
            <Image
              src={portraitImage}
              alt="Bilal Asif, freelance website designer and digital growth partner"
              priority
              fetchPriority="high"
              placeholder="blur"
              quality={85}
              sizes="(min-width: 1024px) min(700px, 70vw), (min-width: 640px) min(84vw, 760px), min(145vw, 650px)"
              className="portrait-image w-full object-contain"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-0 z-30 sm:bottom-6 lg:bottom-8">
          <NameHeading
            isPrimaryHeading={isPrimaryHeading}
            className="intro-name-optical whitespace-nowrap text-[clamp(2.1rem,10vw,3rem)] leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            <span className="block">I am</span>
            <span className="block">Bilal Asif</span>
          </NameHeading>
        </div>

        <ExperienceLink
          href="/growth"
          aria-label="Continue to Grow Your Business Online"
          className="absolute bottom-5 right-0 z-30 flex items-center gap-2 text-ink/60 transition-colors duration-[240ms] hover:text-ink sm:bottom-7 lg:bottom-9"
        >
          <span className="hidden font-jetbrains text-[9px] font-medium uppercase tracking-[0.2em] sm:inline">
            Explore the portfolio
          </span>
          <span className="intro-explore-arrow grid h-8 w-8 place-items-center rounded-full border border-ink/20">
            <ArrowDown className="h-3.5 w-3.5" />
          </span>
        </ExperienceLink>
      </div>
    </section>
  );
}

function NameHeading({
  isPrimaryHeading,
  className,
  children
}: {
  isPrimaryHeading: boolean;
  className: string;
  children: ReactNode;
}) {
  if (isPrimaryHeading) return <h1 className={className}>{children}</h1>;
  return <p className={className}>{children}</p>;
}
