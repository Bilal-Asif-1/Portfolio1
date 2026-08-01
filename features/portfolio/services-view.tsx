"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { EASE, MOTION, Reveal } from "@/components/motion";
import { SERVICES } from "@/features/portfolio/data";
import type { Service } from "@/features/portfolio/types";

function ServiceRow({
  service,
  index,
  open,
  onToggle
}: {
  service: Service;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal delay={index * 0.035} y={16} blur={0}>
      <article
        data-focus-target
        data-focus-expand
        className={`overflow-hidden border-b transition-colors duration-[320ms] ${
          open ? "border-black/10 bg-white" : "border-white/15 bg-black"
        }`}
      >
        <button
          type="button"
          data-service-open={open ? "true" : "false"}
          className={`service-row group grid min-h-[152px] w-full grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-3 px-5 py-5 text-left transition-colors duration-[180ms] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60 sm:min-h-[124px] sm:grid-cols-[2.5rem_minmax(0,1fr)_minmax(16rem,0.72fr)_2.25rem] sm:gap-6 sm:px-8 sm:py-5 lg:min-h-[112px] lg:gap-7 lg:px-12 ${
            open ? "bg-white" : ""
          }`}
          aria-expanded={open}
          aria-controls={`service-details-${index}`}
          onClick={onToggle}
        >
          <span
            className={`service-row-number text-xs font-medium tabular-nums transition-colors duration-[180ms] group-hover:text-black/55 sm:text-sm ${
              open ? "text-black/55" : "text-white/60"
            }`}
          >
            0{index + 1}
          </span>
          <h2
            className={`service-row-heading font-sans text-[clamp(1.25rem,6vw,1.75rem)] font-extrabold leading-[1.02] tracking-normal transition-colors duration-[180ms] group-hover:text-black sm:text-2xl lg:text-3xl ${
              open ? "text-black" : "text-white"
            }`}
          >
            {service.title}
          </h2>
          <p
            className={`service-row-description col-span-2 col-start-2 row-start-2 max-w-lg text-[13px] leading-5 transition-colors duration-[180ms] group-hover:text-black/65 sm:col-span-1 sm:col-start-auto sm:row-start-auto sm:text-sm sm:leading-6 lg:text-base lg:leading-7 ${
              open ? "text-black/65" : "text-white/60"
            }`}
          >
            {service.description}
          </p>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: MOTION.duration.fast, ease: EASE }}
            className={`service-row-arrow col-start-3 row-start-1 grid h-8 w-8 place-items-center rounded-full border transition-colors duration-[180ms] group-hover:border-black/25 group-hover:text-black sm:col-start-auto sm:row-start-auto sm:h-9 sm:w-9 ${
              open ? "border-black/25 text-black" : "border-white/25 text-white"
            }`}
            aria-hidden="true"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.span>
        </button>

        <motion.div
          id={`service-details-${index}`}
          role="button"
          tabIndex={open ? 0 : -1}
          aria-label={`Close ${service.title} details`}
          aria-hidden={!open}
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: MOTION.duration.base, ease: EASE }}
          className="cursor-pointer overflow-hidden bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/40"
          onClick={onToggle}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onToggle();
            }
          }}
        >
          <div className="pb-9 pl-[3.25rem] pr-5 sm:pb-10 sm:pl-[6.5rem] sm:pr-8 lg:pl-[6.5rem] lg:pr-12">
            <div className="grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-3 sm:gap-8 lg:gap-12">
              {service.details.map((detail) => (
                <p
                  key={detail}
                  className="relative pl-4 text-sm leading-6 text-black/60 before:absolute before:left-0 before:top-[0.65rem] before:h-1 before:w-1 before:rounded-full before:bg-black/45 sm:leading-7"
                >
                  {detail}
                </p>
              ))}
            </div>
            {service.relatedCaseStudies?.length ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/50">
                  Related case studies
                </span>
                {service.relatedCaseStudies.map((caseStudy) => (
                  <Link
                    key={caseStudy.slug}
                    href={`/projects/${caseStudy.slug}`}
                    className="rounded-full border border-black/15 px-3 py-1.5 text-[11px] font-semibold text-black/70 transition-colors duration-[240ms] hover:border-black hover:bg-black hover:text-white"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {caseStudy.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </motion.div>
      </article>
    </Reveal>
  );
}

export function ServicesView() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex min-h-[100svh] flex-col bg-black pt-20 text-white sm:pt-24">
      <section className="flex-1">
        <div className="grid gap-7 border-b border-white/15 px-5 pb-8 pt-4 sm:grid-cols-[1fr_auto] sm:items-end sm:px-8 sm:pb-10 sm:pt-8 lg:px-12">
          <Reveal y={22} blur={2}>
            <p className="font-jetbrains mb-5 text-[10px] font-medium uppercase text-white/60 sm:text-xs">
              What I Do
            </p>
            <h1 className="font-sans text-5xl font-extrabold leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl">
              Services
            </h1>
          </Reveal>
          <Reveal delay={0.1} y={14} blur={1}>
            <p className="max-w-sm text-sm leading-7 text-white/60 sm:text-right sm:text-base">
              Eight focused ways I help small businesses turn attention into
              measurable growth.
            </p>
          </Reveal>
        </div>

        <div>
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.title}
              service={service}
              index={index}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
