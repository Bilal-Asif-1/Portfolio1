"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  EASE,
  MOTION,
  PORTFOLIO_PAGE_CHANGE_EVENT,
  Reveal
} from "@/components/motion";
import { FAQS } from "@/features/portfolio/data";

function FaqRow({
  question,
  answer,
  index,
  open,
  onToggle
}: {
  question: string;
  answer: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal delay={index * 0.045} y={16} blur={1}>
      <div
        data-focus-target
        data-focus-expand
        className="border-b border-white/15"
      >
        <button
          type="button"
          className="flex w-full items-center justify-between gap-6 py-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/45 sm:py-8"
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          onClick={onToggle}
        >
          <span className="font-sans text-xl font-bold leading-tight tracking-normal text-white sm:text-2xl">
            {question}
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
        <motion.div
          id={`faq-answer-${index}`}
          aria-hidden={!open}
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0
          }}
          transition={{ duration: MOTION.duration.base, ease: EASE }}
          className="overflow-hidden"
        >
              <p className="max-w-3xl pb-7 text-sm leading-7 text-white/55 sm:pb-8 sm:text-base sm:leading-8">
                {answer}
              </p>
        </motion.div>
      </div>
    </Reveal>
  );
}

export function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeForAnotherPage = (event: Event) => {
      const detail = (event as CustomEvent<{ path?: string }>).detail;
      if (detail?.path && detail.path !== "/faq") setOpenIndex(null);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) setOpenIndex(null);
    });

    document.addEventListener(
      PORTFOLIO_PAGE_CHANGE_EVENT,
      closeForAnotherPage
    );
    if (viewRef.current) observer.observe(viewRef.current);

    return () => {
      observer.disconnect();
      document.removeEventListener(
        PORTFOLIO_PAGE_CHANGE_EVENT,
        closeForAnotherPage
      );
    };
  }, []);

  return (
    <div
      ref={viewRef}
      className="flex min-h-[100svh] flex-col bg-black pt-24 text-white"
    >
      <section className="flex flex-1 items-center px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto w-full max-w-4xl">
          <Reveal y={22} blur={2} viewportMargin="35% 0px 20%">
            <div className="text-center">
              <p className="font-jetbrains text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 sm:text-xs">
                ( FAQ )
              </p>
              <h1 className="mt-8 font-sans text-6xl font-extrabold leading-[0.84] tracking-normal text-white sm:text-8xl lg:text-9xl">
                <span className="block">Good</span>
                <span className="block">questions</span>
              </h1>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl border-t border-white/15 sm:mt-20">
            {FAQS.map((faq, index) => (
              <FaqRow
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
