"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  MotionConfig,
  useAnimationFrame,
  useInView,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { Petrona } from "next/font/google";
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
  getLenis,
  Magnetic,
  MOTION,
  Reveal,
  ScrollProgress,
  SmoothScroll
} from "@/components/motion";

const petrona = Petrona({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
  style: "italic",
  variable: "--font-petrona",
  display: "swap"
});

const serifDisplay = `${petrona.className} italic font-thin`;

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.029 6.988 2.895a9.825 9.825 0 0 1 2.895 6.993c-.003 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.481-8.413Z" />
    </svg>
  );
}

const contact = {
  email: "bilalasif1024@gmail.com",
  whatsapp: "https://wa.me/92307998854?text=Hi%20Bilal%2C%20I%20want%20to%20grow%20my%20business%20online.",
  instagram: "https://www.instagram.com/bilal.asif__/",
  linkedin: "https://www.linkedin.com/in/bilal-asif/"
};

// Match the navigation order to the actual vertical order of page sections.
const navItems = ["Packages", "Projects", "Services", "Process"];

const services = [
  {
    title: "Website Development",
    description:
      "Fast, responsive, SEO-friendly websites engineered to turn visitors into customers."
  },
  {
    title: "Mobile App Development",
    description:
      "FlutterFlow-powered Android and iOS applications designed to scale with your business."
  },
  {
    title: "SEO Services",
    description:
      "Improve search rankings, increase visibility and generate qualified leads."
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across Google, Facebook, Instagram, LinkedIn and YouTube."
  },
  {
    title: "Paid Advertising",
    description:
      "Google Ads and Meta Ads management focused relentlessly on return on investment."
  },
  {
    title: "Email Marketing & Automation",
    description:
      "Email automation, customer journeys, lead nurturing and CRM integration."
  },
  {
    title: "Branding & Strategy",
    description:
      "Brand identity, positioning, digital strategy and practical growth planning."
  },
  {
    title: "UI/UX Design",
    description:
      "Clear, intuitive interfaces that make websites and digital products easier to use and convert."
  }
];

const projectMetrics = [
  { value: "10+", label: "Projects delivered" },
  { value: "95+", label: "Avg. Lighthouse score" },
  { value: "4.9/5", label: "Client satisfaction" },
  { value: "3yrs", label: "Digital growth experience" }
];

const showcaseCards = [
  {
    title: "Cocoa Crafted",
    eyebrow: "Chocolate Website",
    metric: "Online sweets",
    description: "A warm ecommerce experience crafted to turn chocolate lovers into loyal customers.",
    textTone: "dark",
    background: "linear-gradient(135deg, #2a1712 0%, #6f3b25 48%, #f3c37a 100%)",
    accent: "#f3c37a",
    image: "/portfolio-cards/light/cocoa-crafted-mixed.jpg"
  },
  {
    title: "Aqua Gallery",
    eyebrow: "Aquarium Website",
    metric: "Visitor journeys",
    description: "A bright aquarium experience designed around discovery, calm and effortless visits.",
    textTone: "dark",
    background: "linear-gradient(135deg, #ffffff 0%, #dff8f6 55%, #8ad9c0 100%)",
    accent: "#4eb9b2",
    image: "/portfolio-cards/light/aqua-gallery-v2.jpg"
  },
  {
    title: "Spice Table",
    eyebrow: "Restaurant Site",
    metric: "Table orders",
    description: "A vibrant restaurant website built to make every dish irresistible and easy to order.",
    textTone: "dark",
    background: "linear-gradient(135deg, #b63225 0%, #ef624f 50%, #ffd86b 100%)",
    accent: "#ffd86b",
    image: "/portfolio-cards/light/spice-table-mixed.jpg"
  },
  {
    title: "Pulse Fit",
    eyebrow: "Fitness Landing",
    metric: "New members",
    description: "A focused fitness landing page that turns motivation into memberships and enquiries.",
    textTone: "dark",
    background: "linear-gradient(135deg, #101537 0%, #3024f5 55%, #8ad9c0 100%)",
    accent: "#8ad9c0",
    image: "/portfolio-cards/light/pulse-fit-mixed.jpg"
  },
  {
    title: "Nest Realty",
    eyebrow: "Real Estate Leads",
    metric: "Buyer leads",
    description: "A polished property experience that helps serious buyers find their perfect home.",
    textTone: "dark",
    background: "linear-gradient(135deg, #f7fbf8 0%, #8ad9c0 45%, #173f35 100%)",
    accent: "#173f35",
    image: "/portfolio-cards/light/nest-realty-mixed.jpg"
  },
  {
    title: "Mode Market",
    eyebrow: "Fashion Ecommerce",
    metric: "Store sales",
    description: "A clean fashion storefront made for smooth browsing, stronger trust and more sales.",
    textTone: "dark",
    background: "linear-gradient(135deg, #f8f8f8 0%, #f4d84e 48%, #111111 100%)",
    accent: "#111111",
    image: "/portfolio-cards/light/mode-market-mixed.jpg"
  },
  {
    title: "Glow Dental",
    eyebrow: "Clinic Website",
    metric: "Patient leads",
    description: "A calm clinic website that builds patient confidence before their first appointment.",
    textTone: "dark",
    background: "linear-gradient(135deg, #f8ffff 0%, #8ad9c0 48%, #3024f5 100%)",
    accent: "#3024f5",
    image: "/portfolio-cards/light/glow-dental-mixed.jpg"
  },
  {
    title: "Azure Coast",
    eyebrow: "Ocean Retreat",
    metric: "Luxury stays",
    description: "An airy coastal experience created to turn peaceful escapes into premium bookings.",
    textTone: "dark",
    background: "linear-gradient(135deg, #ffffff 0%, #eaf7ff 55%, #9fdcf2 100%)",
    accent: "#74c4df",
    image: "/portfolio-cards/light/azure-coast-v2.jpg"
  },
  {
    title: "Paw Palace",
    eyebrow: "Pet Care Booking",
    metric: "New clients",
    description: "A friendly pet care experience that makes trusted grooming simple to discover and book.",
    textTone: "dark",
    background: "linear-gradient(135deg, #fff8e1 0%, #f4d84e 44%, #8ad9c0 100%)",
    accent: "#8ad9c0",
    image: "/portfolio-cards/light/paw-palace-mixed.jpg"
  },
  {
    title: "Cafe Noir",
    eyebrow: "Coffee Shop Site",
    metric: "Daily orders",
    description: "An inviting cafe website that brings the atmosphere online and encourages daily orders.",
    textTone: "dark",
    background: "linear-gradient(135deg, #1a100d 0%, #5b3426 52%, #f4d84e 100%)",
    accent: "#f4d84e",
    image: "/portfolio-cards/light/cafe-noir-mixed.jpg"
  },
  {
    title: "EduPro",
    eyebrow: "Course Landing",
    metric: "Enrollments",
    description: "A clear course platform that helps learners understand the value and enroll faster.",
    textTone: "dark",
    background: "linear-gradient(135deg, #eff2ff 0%, #3024f5 48%, #111111 100%)",
    accent: "#111111",
    image: "/portfolio-cards/light/edupro-mixed.jpg"
  },
  {
    title: "FreshFold",
    eyebrow: "Laundry Service",
    metric: "Pickup leads",
    description: "A fresh local service website designed for quick pickup requests and repeat customers.",
    textTone: "dark",
    background: "linear-gradient(135deg, #ffffff 0%, #8ad9c0 50%, #173f35 100%)",
    accent: "#173f35",
    image: "/portfolio-cards/light/freshfold-mixed.jpg"
  }
];

const heroCards = [3, 8, 0, 1, 2, 4, 7] as const;

const projectDetails: Record<
  string,
  {
    problem: string;
    requirements: string;
    solution: string;
    result: string;
  }
> = {
  "Cocoa Crafted": {
    problem:
      "The chocolate brand needed to feel premium online while making gifting and product discovery simple.",
    requirements:
      "A mobile-first store, clear gift categories, delivery information and product pages that build trust.",
    solution:
      "An editorial ecommerce experience with collection-led navigation, product storytelling and strong purchase calls to action.",
    result:
      "A clearer path from discovery to checkout, stronger premium positioning and better repeat-order potential."
  },
  "Aqua Gallery": {
    problem:
      "Visitors needed an easier way to discover exhibits, plan a visit and understand the aquarium experience.",
    requirements:
      "Simple visit planning, exhibit highlights, ticket calls to action and a calm visual experience across devices.",
    solution:
      "A bright content system that prioritizes key attractions, visit information and conversion-focused ticket journeys.",
    result:
      "Faster access to essential information, stronger visitor confidence and a smoother route to ticket booking."
  },
  "Spice Table": {
    problem:
      "The restaurant needed its food quality and atmosphere to translate online without slowing down ordering.",
    requirements:
      "A visual menu, location details, mobile ordering, reservations and search-friendly restaurant pages.",
    solution:
      "A vibrant restaurant experience with dish-led storytelling and direct paths to orders and table bookings.",
    result:
      "More appetizing product discovery, fewer steps to order and stronger local search visibility."
  },
  "Pulse Fit": {
    problem:
      "Potential members were interested but lacked a clear reason and simple next step to join the fitness program.",
    requirements:
      "Clear membership value, class information, trainer trust signals and an easy mobile enquiry flow.",
    solution:
      "A focused landing experience that connects fitness goals with programs, proof and high-intent membership calls to action.",
    result:
      "A more persuasive membership journey with clearer choices and stronger enquiry potential."
  },
  "Nest Realty": {
    problem:
      "Property buyers needed a polished way to explore listings and contact the right agent without friction.",
    requirements:
      "Searchable properties, clear location context, agent credibility and fast lead capture on mobile.",
    solution:
      "A clean property experience with focused listing content, lifestyle imagery and strategically placed enquiry actions.",
    result:
      "Higher-quality buyer journeys, stronger agent trust and easier conversion from browsing to enquiry."
  },
  "Azure Coast": {
    problem:
      "The retreat needed to communicate its premium atmosphere while making availability and booking feel effortless.",
    requirements:
      "Immersive accommodation pages, amenities, location context, availability prompts and mobile-first booking.",
    solution:
      "An airy hospitality experience combining editorial imagery with concise information and clear booking pathways.",
    result:
      "Stronger luxury positioning, better-informed guests and a shorter path from inspiration to reservation."
  },
  "Paw Palace": {
    problem:
      "Pet owners needed reassurance, transparent service choices and a convenient way to request grooming appointments.",
    requirements:
      "Service details, trust signals, pet-friendly branding, location information and quick appointment requests.",
    solution:
      "A warm booking experience that presents services clearly and keeps the appointment action visible throughout.",
    result:
      "Greater customer confidence, easier service selection and more direct booking opportunities."
  }
};

const packages = [
  {
    title: "Starter Website",
    bestFor: "For a new business that needs to look professional online.",
    includes: ["Responsive website", "Contact buttons", "Basic on-page SEO", "Vercel deploy support"]
  },
  {
    title: "Business Growth",
    bestFor: "For local businesses that want more calls, bookings and leads.",
    includes: ["Website or landing page", "Keyword research", "Local SEO structure", "Google and Meta ad plan"]
  },
  {
    title: "Ecommerce Launch",
    bestFor: "For shops, food brands and product businesses ready to sell online.",
    includes: ["Storefront design", "Product page copy", "Conversion sections", "SEO-ready collections"]
  }
];

const approachSteps = [
  {
    title: "Strategy first",
    description:
      "We start with your business goals, not a template. Every decision traces back to a number that matters."
  },
  {
    title: "Designed to convert",
    description:
      "Beautiful is table stakes. We engineer experiences that turn attention into action and visitors into customers."
  },
  {
    title: "Built to last",
    description:
      "Fast, accessible, maintainable code on modern frameworks, so your investment keeps performing for years."
  },
  {
    title: "Optimised forever",
    description:
      "Launch is the starting line. We test, measure and refine so your results compound month over month."
  }
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most business websites take around 2–6 weeks, while ecommerce stores and larger digital products may take longer. You will receive a clear timeline once the scope, content and required features are confirmed."
  },
  {
    question: "Can you help my business rank on Google?",
    answer:
      "I can build the SEO foundation with keyword research, page structure, headings, metadata, local content and technical improvements that make your site easier for Google and customers to understand."
  },
  {
    question: "Can I mix services across plans?",
    answer:
      "Yes. Packages are flexible, so we can combine the website, SEO, advertising, ecommerce or automation work that best matches your goals and current stage."
  },
  {
    question: "Who owns the work you produce?",
    answer:
      "You own the approved final website, design assets and project files after the agreed payment is complete. Third-party tools, fonts and licensed assets remain subject to their own terms."
  }
];

function useMotionValueSpring(initial: number) {
  const value = useMotionValue(initial);
  const spring = useSpring(value, MOTION.spring.subtle);
  return {
    set: (next: number) => value.set(next),
    spring
  };
}

const introCooldownMs = 20 * 60 * 1000;
const introPhrases = [
  "比拉勒·阿西夫",
  "बिलाल आसिफ़",
  "ビラル・アシフ",
  "Билал Асиф",
  "بلال آصف"
];

function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [text, setText] = useState(introPhrases[0]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    try {
      const lastShownAt = Number(window.localStorage.getItem("introLastShownAt") ?? 0);
      const shouldShow = !lastShownAt || Date.now() - lastShownAt > introCooldownMs;

      if (!shouldShow) return;

      window.localStorage.setItem("introLastShownAt", String(Date.now()));
    } catch {
      // If storage is blocked, still show the intro on a fresh page load.
    }

    setText(introPhrases[0]);
    setExiting(false);
    setVisible(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const phraseDuration = 500;

    const phraseTimers = introPhrases.slice(1).map((phrase, index) =>
      window.setTimeout(() => setText(phrase), phraseDuration * (index + 1))
    );

    const exitTimer = window.setTimeout(
      () => setExiting(true),
      phraseDuration * introPhrases.length
    );
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      getLenis()?.start();
    }, phraseDuration * introPhrases.length + 250);

    return () => {
      phraseTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-white px-6 text-center text-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: MOTION.duration.fast, ease: EASE }}
    >
      <div
        className={
          text.startsWith("HI,")
            ? `${serifDisplay} text-3xl tracking-[-0.02em] sm:text-5xl lg:text-6xl`
            : "text-xl font-medium tracking-[-0.01em] sm:text-3xl lg:text-4xl"
        }
      >
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.instant, ease: EASE }}
          className={
            text.startsWith("HI,")
              ? "inline-block min-w-[12ch] leading-none"
              : "inline-block min-w-[8ch] leading-tight"
          }
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
}

function wrapCarouselDistance(value: number, total: number) {
  return ((value + total / 2) % total + total) % total - total / 2;
}

function CircularProjectCard({
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
  onOpen: (card: (typeof showcaseCards)[number]) => void;
}) {
  const phase = useTransform(rotation, (value) =>
    wrapCarouselDistance(index - value, total)
  );
  const angle = useTransform(phase, (value) => (value / total) * Math.PI * 2);
  const depth = useTransform(angle, (value) => Math.cos(value));
  const x = useTransform(angle, (value) => `${Math.sin(value) * 44}vw`);
  const y = useTransform(depth, (value) => (1 - value) * 38 - 18);
  const z = useTransform(depth, (value) => (value - 1) * 180);
  const scale = useTransform(depth, [-0.3, 0, 1], [0.68, 0.8, 1.08]);
  const opacity = useTransform(depth, [-0.55, -0.22, 0.35, 1], [0, 0.36, 0.72, 1]);
  const rotate = useTransform(angle, (value) => Math.sin(value) * -5);
  const zIndex = useTransform(depth, (value) => Math.round((value + 1) * 100));
  const visibility = useTransform(depth, (value) =>
    value > -0.55 ? "visible" : "hidden"
  );
  const pointerEvents = useTransform(depth, (value) =>
    value > -0.45 ? "auto" : "none"
  );

  return (
    <motion.div
      className="circular-project-card absolute left-1/2 top-8 h-[255px] w-[176px] overflow-hidden rounded-card sm:top-10 sm:h-[325px] sm:w-[218px] lg:top-12 lg:h-[380px] lg:w-[258px]"
      style={{ x, y, z, scale, rotate, opacity, zIndex, visibility, pointerEvents }}
      onClick={() => {
        if (!didDrag.current) onCenter(index);
      }}
    >
      <FastHeroMockup card={showcaseCards[cardIndex]} onOpen={onOpen} />
    </motion.div>
  );
}

function InfiniteCircularCarousel({
  onOpen,
  reducedMotion
}: {
  onOpen: (card: (typeof showcaseCards)[number]) => void;
  reducedMotion: boolean;
}) {
  const rotation = useMotionValue(3);
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { margin: "200px 0px" });
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const releaseVelocity = useRef(0);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const autoPaused = useRef(false);
  const resumeTimer = useRef<number | null>(null);
  const rotationAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const wheelTarget = useRef(rotation.get());
  const lastWheelTime = useRef(0);

  const stopRotationAnimation = () => {
    rotationAnimation.current?.stop();
    rotationAnimation.current = null;
  };

  const pauseAuto = (resumeAfter?: number) => {
    autoPaused.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = null;
    if (resumeAfter) {
      resumeTimer.current = window.setTimeout(() => {
        autoPaused.current = false;
      }, resumeAfter);
    }
  };

  const centerCard = (index: number) => {
    pauseAuto(1800);
    stopRotationAnimation();
    const current = rotation.get();
    const delta = wrapCarouselDistance(index - current, heroCards.length);
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
    pauseAuto(1600);
  };

  useAnimationFrame((_time, delta) => {
    if (
      reducedMotion ||
      !isInView ||
      autoPaused.current ||
      dragging.current ||
      rotationAnimation.current
    ) {
      return;
    }
    rotation.set(rotation.get() + Math.min(delta, 32) * 0.00004);
  });

  useEffect(() => {
    return () => {
      stopRotationAnimation();
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <motion.div
      ref={stageRef}
      initial={{ opacity: 0, y: 24, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: MOTION.duration.reveal, ease: EASE }}
      className="circular-carousel project-deck-sticky scroll-reveal-filter relative -mx-5 mt-6 h-[370px] cursor-grab select-none overflow-hidden active:cursor-grabbing sm:-mx-8 sm:mt-8 sm:h-[455px] lg:-mx-12 lg:h-[530px]"
      role="region"
      aria-label="Featured projects circular carousel. Drag or scroll to rotate."
      onPointerEnter={() => pauseAuto()}
      onPointerLeave={() => {
        if (!dragging.current) pauseAuto(500);
      }}
      onFocus={() => pauseAuto()}
      onBlur={() => pauseAuto(900)}
      onWheel={(event) => {
        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
        if (Math.abs(delta) < 0.1) return;

        const now = performance.now();
        if (now - lastWheelTime.current > 160) wheelTarget.current = rotation.get();
        lastWheelTime.current = now;
        wheelTarget.current += Math.max(-180, Math.min(180, delta)) / 340;
        pauseAuto(1400);
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
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("[data-project-trigger]")) return;
        stopRotationAnimation();
        pauseAuto();
        dragging.current = true;
        didDrag.current = false;
        dragStartX.current = event.clientX;
        dragStartRotation.current = rotation.get();
        lastPointerX.current = event.clientX;
        lastPointerTime.current = performance.now();
        releaseVelocity.current = 0;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragging.current) return;
        const distance = event.clientX - dragStartX.current;
        if (Math.abs(distance) > 5) didDrag.current = true;
        if (didDrag.current) event.preventDefault();

        const cardTravel = Math.max(210, Math.min(window.innerWidth * 0.24, 390));
        rotation.set(dragStartRotation.current - distance / cardTravel);

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
      <div className="circular-carousel-depth absolute inset-0">
        {heroCards.map((cardIndex, index) => (
          <CircularProjectCard
            key={cardIndex}
            cardIndex={cardIndex}
            index={index}
            total={heroCards.length}
            rotation={rotation}
            didDrag={didDrag}
            onCenter={centerCard}
            onOpen={onOpen}
          />
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-2 left-1/2 z-[220] -translate-x-1/2 whitespace-nowrap font-jetbrains text-[9px] uppercase tracking-[0.2em] text-ink/35 sm:bottom-4 sm:text-[10px]">
        Drag or scroll to rotate
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
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const numberMatch = value.match(/\d+(?:\.\d+)?/);
    if (!numberMatch) {
      setDisplayValue(value);
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
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      }
    });

    return () => controls.stop();
  }, [delay, inView, reducedMotion, value]);

  return (
    <dd
      ref={valueRef}
      className="metric-value order-1 text-[clamp(1.4rem,7vw,2.25rem)] font-extrabold leading-none tracking-normal text-black sm:text-5xl lg:text-6xl"
    >
      {displayValue}
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
    [0, 0.66, 1],
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
  card: (typeof showcaseCards)[number];
  onOpen: (card: (typeof showcaseCards)[number]) => void;
}) {
  if ("image" in card && card.image) {
    const useDarkText = card.textTone === "dark";

    return (
      <div className={`group relative h-full w-full overflow-hidden ${useDarkText ? "bg-white text-ink" : "bg-ink text-white"}`}>
        <img
          src={card.image}
          alt={`${card.title} ${card.eyebrow} poster visual`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
          <h3
            className={`${serifDisplay} project-card-heading max-w-[85%] text-xl leading-none tracking-[-0.02em] text-white sm:text-2xl`}
          >
            {card.title}
          </h3>
          <button
            type="button"
            data-project-trigger="true"
            className="group/btn pointer-events-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/80 py-1.5 pl-3.5 pr-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm transition-colors duration-[320ms] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Open ${card.title} project details`}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onOpen(card);
            }}
          >
            <span>Details</span>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white">
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

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: card.background }}>
      <div className="relative flex h-full flex-col justify-between p-4 text-white sm:p-5">
        <div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
          </div>
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
            {card.eyebrow}
          </p>
          <h3 className="mt-2 max-w-[12rem] text-2xl font-semibold leading-none tracking-[-0.03em] sm:text-3xl">
            {card.title}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: card.accent }} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-xl bg-white/18"
                style={item === 1 ? { backgroundColor: card.accent } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectDetailModal({
  card,
  onClose
}: {
  card: (typeof showcaseCards)[number];
  onClose: () => void;
}) {
  const details = projectDetails[card.title] ?? {
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="relative grid max-h-full w-full max-w-6xl overflow-y-auto rounded-panel bg-white shadow-lift lg:grid-cols-[0.88fr_1.12fr]"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 18 }}
        transition={{ duration: MOTION.duration.base, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors duration-[320ms] hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          aria-label="Close project details"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative min-h-[280px] overflow-hidden bg-paper sm:min-h-[380px] lg:min-h-[680px]">
          <img
            src={card.image}
            alt={`${card.title} project visual`}
            className="absolute inset-0 h-full w-full object-cover"
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
      </motion.article>
    </motion.div>
  );
}

function PackagesModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[160] overflow-y-auto bg-ink/45 p-2 backdrop-blur-sm sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: MOTION.duration.fast, ease: EASE }}
      onClick={onClose}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="packages-dialog-title"
        className="relative mx-auto min-h-full w-full max-w-7xl overflow-hidden rounded-panel bg-white px-5 py-16 shadow-lift sm:px-8 sm:py-20 lg:px-12"
        initial={{ opacity: 0, y: 54, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 38, scale: 0.99 }}
        transition={{ duration: MOTION.duration.base, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors duration-[320ms] hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 sm:right-6 sm:top-6"
          aria-label="Close packages"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-w-3xl pr-14">
          <SectionLabel>Packages</SectionLabel>
          <h2
            id="packages-dialog-title"
            className={`${serifDisplay} text-4xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl`}
          >
            No fixed prices. Just the right package for your next stage.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-3">
          {packages.map((item, index) => {
            const featured = index === 1;
            return (
              <article
                key={item.title}
                className={`flex h-full flex-col rounded-card border p-7 sm:p-8 ${
                  featured
                    ? "on-dark border-ink bg-ink text-white shadow-lift"
                    : "border-ink/10 bg-white text-ink"
                }`}
              >
                <h3 className={`${serifDisplay} text-3xl tracking-[-0.02em]`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${featured ? "text-white/60" : "text-ink/60"}`}>
                  {item.bestFor}
                </p>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={`my-7 block rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-colors duration-[320ms] ${
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
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
}

function FaqItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

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

export default function Home() {
  const reducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<(typeof showcaseCards)[number] | null>(null);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

  const portraitX = useMotionValueSpring(0);
  const portraitY = useMotionValueSpring(0);

  useEffect(() => {
    if (!selectedProject && !packagesOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setPackagesOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject, packagesOpen]);

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Bilal Asif",
    url: "https://bilalasif.com",
    email: contact.email,
    areaServed: ["United States", "Europe"],
    sameAs: [contact.instagram, contact.linkedin],
    serviceType: [
      "Website design for small businesses",
      "SEO services for small businesses",
      "Google Ads landing pages",
      "Ecommerce website development",
      "Digital marketing for restaurants"
    ]
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen bg-white text-ink">
        <SmoothScroll />
        <ScrollProgress />
        <IntroSplash />
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal card={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
          {packagesOpen && <PackagesModal onClose={() => setPackagesOpen(false)} />}
        </AnimatePresence>
        <div className="noise" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
                {[...navItems, "Contact"].map((item, index) => {
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
                      className="link-underline relative text-[11px] font-normal transition-opacity duration-[320ms] hover:opacity-55 sm:text-sm"
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
                      className="link-underline relative text-[11px] font-normal transition-opacity duration-[320ms] hover:opacity-55 sm:text-sm"
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
              <h2
                className="intro-hey-light pointer-events-none absolute inset-x-0 top-8 z-20 flex items-center justify-between pl-[5%] pr-[3%] text-[clamp(3.9rem,18vw,6rem)] leading-none text-ink sm:top-8 sm:pl-[10%] sm:pr-[7%] sm:text-[clamp(6rem,13vw,8.5rem)] lg:pl-[16%] lg:pr-[11%] lg:text-[9rem]"
              >
                <span className="inline-block">Hey,</span>
                <span className="inline-block">there</span>
              </h2>

              <div className="absolute bottom-7 left-1/2 z-10 w-[min(150vw,620px)] -translate-x-1/2 sm:bottom-7 sm:w-[min(115vw,760px)] lg:bottom-6 lg:w-[650px]">
                <motion.div style={{ x: portraitX.spring, y: portraitY.spring }}>
                  <img
                    src="/bilal-asif-portrait-2026-v4.webp"
                    alt="Bilal Asif, freelance website designer and digital growth partner"
                    className="portrait-image w-full object-contain"
                    loading="eager"
                    decoding="async"
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
                      href={contact.whatsapp}
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
                <p className="font-jetbrains mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/55 sm:text-xs">
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

            <InfiniteCircularCarousel
              onOpen={setSelectedProject}
              reducedMotion={Boolean(reducedMotion)}
            />

            <div className="relative z-[2] -mx-5 h-[190px] bg-white sm:-mx-8 sm:h-[210px] md:h-[68svh] md:bg-transparent lg:-mx-12">
              <div className="flex h-full min-h-0 items-center bg-white px-5 sm:px-8 md:sticky md:top-0 md:h-[34svh] md:translate-y-[34svh] lg:px-12">
                <Reveal y={18} blur={2} className="w-full">
                  <dl className="grid w-full grid-cols-4 py-5 sm:py-7 lg:py-6">
                    {projectMetrics.map((metric, index) => (
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
            className="on-dark min-h-[100svh] scroll-mt-24 bg-black pb-0 pt-16 text-white sm:pt-20"
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

                <Reveal delay={0.12} y={18} blur={2}>
                  <a
                    href="#contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-medium text-white/75 transition-colors duration-[320ms] hover:border-white hover:bg-white hover:text-black"
                  >
                    All services
                  </a>
                </Reveal>
              </div>

              <div>
                {services.map((service, index) => (
                  <Reveal key={service.title} delay={index * 0.04} y={18} blur={0}>
                    <a
                      href="#contact"
                      className="service-row group grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-white/15 px-5 py-6 transition-colors duration-[180ms] hover:bg-white sm:px-8 sm:py-7 lg:grid-cols-[2.5rem_minmax(0,1fr)_minmax(18rem,0.72fr)_2rem] lg:gap-8 lg:px-12"
                    >
                      <span className="service-row-number text-xs font-medium tabular-nums text-white/40 transition-colors duration-[180ms] group-hover:text-black/55 sm:text-sm">
                        0{index + 1}
                      </span>
                      <h3 className="service-row-heading font-sans text-2xl font-extrabold leading-tight tracking-normal text-white transition-colors duration-[180ms] group-hover:text-black sm:text-3xl lg:text-4xl">
                        {service.title}
                      </h3>
                      <p className="service-row-description col-span-2 col-start-2 row-start-2 max-w-lg text-sm leading-6 text-white/50 transition-colors duration-[180ms] group-hover:text-black/65 lg:col-span-1 lg:col-start-auto lg:row-start-auto lg:text-base lg:leading-7">
                        {service.description}
                      </p>
                      <ArrowUpRight className="service-row-arrow col-start-3 row-start-1 h-5 w-5 text-white transition-all duration-[180ms] ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black lg:col-start-auto lg:row-start-auto lg:h-6 lg:w-6" />
                    </a>
                  </Reveal>
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
                    How we
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
                {approachSteps.map((step, index) => (
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
                {faqs.map((faq, index) => (
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
                  href={`mailto:${contact.email}?subject=Business%20growth%20project%20with%20Bilal`}
                  className="group mt-10 inline-flex items-center gap-3 font-sans text-2xl font-extrabold tracking-normal text-white transition-colors duration-[320ms] hover:text-white/70 sm:text-4xl"
                >
                  {contact.email}
                  <ArrowUpRight className="h-6 w-6 transition-transform duration-[320ms] ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-8 sm:w-8" />
                </a>
              </Reveal>

              <Reveal delay={0.32} y={18} blur={2}>
                <Magnetic>
                  <a
                    href={contact.whatsapp}
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
                      href: contact.whatsapp,
                      icon: <WhatsAppIcon />
                    },
                    {
                      label: "Instagram",
                      href: contact.instagram,
                      icon: (
                        <img
                          src="https://cdn.simpleicons.org/instagram/FFFFFF"
                          alt=""
                          className="h-5 w-5 group-hover:invert"
                        />
                      )
                    },
                    {
                      label: "LinkedIn",
                      href: contact.linkedin,
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-5 w-5 fill-current"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                        </svg>
                      )
                    },
                    {
                      label: "Email",
                      href: `mailto:${contact.email}`,
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
