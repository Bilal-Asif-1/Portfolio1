"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, getLenis, MOTION } from "@/components/motion";

const INTRO_PHRASES = [
  "比拉勒·阿西夫",
  "बिलाल आसिफ़",
  "ビラル・アシフ",
  "Билал Асиф",
  "بلال آصف"
] as const;

export function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [text, setText] = useState<(typeof INTRO_PHRASES)[number]>(INTRO_PHRASES[0]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      document.body.classList.remove("intro-pending");
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const phraseDuration = 110;
    const phraseTimers = INTRO_PHRASES.slice(1).map((phrase, index) =>
      window.setTimeout(() => setText(phrase), phraseDuration * (index + 1))
    );
    const exitTimer = window.setTimeout(
      () => setExiting(true),
      phraseDuration * INTRO_PHRASES.length
    );
    const hideTimer = window.setTimeout(() => {
      document.body.classList.remove("intro-pending");
      setVisible(false);
      document.body.style.overflow = "";
      getLenis()?.start();
    }, phraseDuration * INTRO_PHRASES.length + 120);

    return () => {
      phraseTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.classList.remove("intro-pending");
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [reducedMotion, visible]);

  if (!visible || reducedMotion) return null;

  return (
    <motion.div
      data-intro-splash="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-white px-6 text-center text-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: MOTION.duration.fast, ease: EASE }}
    >
      <motion.span
        key={text}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION.duration.instant, ease: EASE }}
        className="inline-block min-w-[8ch] text-lg font-medium leading-tight tracking-[-0.01em] sm:text-2xl lg:text-3xl"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
