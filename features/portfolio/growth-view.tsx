"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { EASE, Magnetic, MOTION, Reveal } from "@/components/motion";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT } from "@/features/portfolio/data";
import { ExperienceLink } from "@/components/experience-link";
import { LeadLink } from "@/components/lead-link";

export function GrowthView() {
  return (
    <div className="flex min-h-[100svh] flex-col bg-transparent">
      <section className="growth-hero relative flex min-h-[calc(100svh-5rem)] flex-1 items-center overflow-hidden px-5 pb-16 pt-24 text-ink sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
        <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px -10%" }}
            transition={{ duration: 0.82, ease: EASE }}
            className="growth-hero-kicker font-jetbrains mb-7 text-[10px] font-medium uppercase tracking-[0.3em] text-ink/60 sm:mb-9 sm:text-xs"
          >
            Full-Stack Development, SEO and Digital Growth
          </motion.p>

          <h1 className="growth-hero-title font-sans text-5xl font-semibold leading-[0.86] tracking-normal sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem]">
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block text-black"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px -10%" }}
                transition={{
                  duration: MOTION.duration.slow,
                  ease: EASE,
                  delay: 0.06
                }}
              >
                Build and Grow
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px -10%" }}
                transition={{
                  duration: MOTION.duration.slow,
                  ease: EASE,
                  delay: 0.14
                }}
              >
                <span className="business-online-pulse">Your Business</span>
              </motion.span>
            </span>
          </h1>

          <Reveal delay={0.3} y={22} blur={3}>
            <p className="growth-hero-copy mx-auto mt-7 max-w-3xl text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">
              From strategy, branding and full-stack website or application
              development to SEO, digital marketing, paid advertising,
              optimization and ongoing support. I help businesses launch
              stronger and keep growing after go-live.
            </p>
          </Reveal>

          <Reveal delay={0.42} y={20} blur={2}>
            <div className="growth-hero-actions mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Magnetic>
                <ExperienceLink
                  href="/projects"
                  className="growth-hero-button crystal-border inline-flex min-h-14 items-center justify-center border border-ink px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-[320ms] hover:bg-ink hover:text-white"
                >
                  <span aria-hidden="true" className="crystal-border-orbit" />
                  View My Work
                </ExperienceLink>
              </Magnetic>
              <Magnetic>
                <LeadLink
                  href={CONTACT.whatsapp}
                  leadSource="whatsapp"
                  target="_blank"
                  rel="noreferrer"
                  className="growth-hero-button crystal-border crystal-border--pill group inline-flex min-h-14 items-center justify-center gap-4 rounded-full border border-ink px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors duration-[320ms] hover:bg-ink hover:text-white"
                >
                  <span aria-hidden="true" className="crystal-border-orbit" />
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-ink text-ink transition-colors duration-[320ms] group-hover:border-white group-hover:text-white">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  Chat on WhatsApp
                </LeadLink>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <motion.div
          className="absolute bottom-5 left-1/2 z-10 hidden flex-col items-center gap-2 text-ink/60 sm:flex"
          style={{ x: "-50%" }}
          animate={{ y: [0, 4, 0], opacity: [0.42, 0.72, 0.42] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.28em]">
            Continue to selected work
          </span>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </section>
    </div>
  );
}
