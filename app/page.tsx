"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { Petrona } from "next/font/google";
import { ArrowDown, ArrowRight, Check, Mail, MessageCircle, Plus, X } from "lucide-react";
import {
  EASE,
  getLenis,
  Magnetic,
  Reveal,
  ScrollProgress,
  SmoothScroll,
  TextReveal,
  Tilt
} from "@/components/motion";

const petrona = Petrona({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
  style: "italic",
  display: "swap"
});

const serifAccent = `${petrona.className} italic font-normal`;
const serifDisplay = `${petrona.className} italic font-thin`;

const toSegments = (text: string) => text.split(" ").map((word) => ({ text: word }));

const contact = {
  email: "bilalasif1024@gmail.com",
  whatsapp: "https://wa.me/92307998854?text=Hi%20Bilal%2C%20I%20want%20to%20grow%20my%20business%20online.",
  instagram: "https://www.instagram.com/bilal.asif__/",
  linkedin: "https://www.linkedin.com/in/bilal-asif/"
};

const navItems = ["Services", "Projects", "Packages", "Process"];

const services = [
  {
    logos: [
      { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/111111" },
      { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" }
    ],
    title: "Business Websites",
    description:
      "Fast, mobile-first websites for restaurants, food brands, local shops and service businesses that need trust, calls and orders."
  },
  {
    logos: [
      { name: "Google Search Console", src: "https://cdn.simpleicons.org/googlesearchconsole/458CF5" },
      { name: "Google Analytics", src: "https://cdn.simpleicons.org/googleanalytics/E37400" }
    ],
    title: "Local SEO",
    description:
      "Google-friendly pages, keywords, location content and technical SEO so customers can find your business before competitors."
  },
  {
    logos: [
      { name: "Google Ads", src: "https://cdn.simpleicons.org/googleads/4285F4" },
      { name: "Meta", src: "https://cdn.simpleicons.org/meta/0866FF" }
    ],
    title: "Google and Meta Ads",
    description:
      "Campaign structure, landing pages and keyword strategy for paid traffic that is built around real leads, not vanity clicks."
  },
  {
    logos: [
      { name: "Shopify", src: "https://cdn.simpleicons.org/shopify/7AB55C" },
      { name: "WooCommerce", src: "https://cdn.simpleicons.org/woocommerce/96588A" }
    ],
    title: "Ecommerce Launch",
    description:
      "Product pages, checkout flow, store structure and conversion copy for businesses ready to sell online in the USA or Europe."
  }
];

const tools = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/111111" },
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Express.js", logo: "https://cdn.simpleicons.org/express/111111" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "HTML5", logo: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS3", logo: "https://cdn.simpleicons.org/css/663399" },
  { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "shadcn/ui", logo: "https://cdn.simpleicons.org/shadcnui/111111" },
  { name: "Google Ads", logo: "https://cdn.simpleicons.org/googleads/4285F4" },
  { name: "Meta Ads", logo: "https://cdn.simpleicons.org/meta/0467DF" },
  { name: "Search Console", logo: "https://cdn.simpleicons.org/googlesearchconsole/458CF5" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/111111" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/111111" }
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

const heroCards = [
  { cardIndex: 3, rotate: 0, top: 74, scale: 0.92, z: 2, hide: "hidden lg:block" },
  { cardIndex: 8, rotate: 0, top: 74, scale: 0.92, z: 2, hide: "hidden md:block" },
  { cardIndex: 0, rotate: 0, top: 74, scale: 0.92, z: 2, hide: "" },
  { cardIndex: 1, rotate: 0, top: 74, scale: 0.92, z: 2, hide: "" },
  { cardIndex: 2, rotate: 0, top: 74, scale: 0.92, z: 2, hide: "" },
  { cardIndex: 4, rotate: 0, top: 74, scale: 0.92, z: 2, hide: "hidden md:block" },
  { cardIndex: 7, rotate: 0, top: 74, scale: 0.92, z: 2, hide: "hidden lg:block" }
];

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
    question: "Do you build websites for restaurants and food businesses?",
    answer:
      "Yes. I create restaurant websites, food brand landing pages, menu pages, booking sections and order-focused layouts built to help customers take action quickly."
  },
  {
    question: "Can you help my business rank on Google?",
    answer:
      "I can build the SEO foundation with keyword research, page structure, headings, metadata, local content and technical improvements that make your site easier for Google and customers to understand."
  },
  {
    question: "Do you work with clients in the USA and Europe?",
    answer:
      "Yes. The portfolio is focused on USA and European small businesses, especially restaurants, local shops, ecommerce stores and service providers."
  },
  {
    question: "Do you show prices on the website?",
    answer:
      "No fixed prices are listed because every business needs a different mix of website, SEO, ecommerce and ads support. Message me and I can suggest the right package."
  }
];

function useMotionValueSpring(initial: number) {
  const value = useMotionValue(initial);
  const spring = useSpring(value, { stiffness: 60, damping: 18, mass: 0.6 });
  return {
    set: (next: number) => value.set(next),
    spring
  };
}

const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ease-out-expo active:scale-[0.97] focus:outline-none";

const buttonStyles = {
  primary: `${buttonBase} bg-ink text-white hover:scale-[1.02] hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2`,
  secondary: `${buttonBase} border border-ink/15 bg-white text-ink hover:scale-[1.02] hover:border-ink/40 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2`,
  primaryOnDark: `${buttonBase} bg-white text-ink hover:scale-[1.02] hover:bg-white/85 focus-visible:ring-2 focus-visible:ring-white/50`,
  secondaryOnDark: `${buttonBase} border border-white/20 bg-transparent text-white hover:scale-[1.02] hover:border-white/60 focus-visible:ring-2 focus-visible:ring-white/40`
};

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

    const finalTextTimer = window.setTimeout(() => {
      setText("HI, This is Bilal Asif");
    }, phraseDuration * introPhrases.length);

    const exitTimer = window.setTimeout(() => setExiting(true), phraseDuration * introPhrases.length + 1000);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      getLenis()?.start();
    }, phraseDuration * introPhrases.length + 1250);

    return () => {
      phraseTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(finalTextTimer);
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
      transition={{ duration: 0.22, ease: "easeOut" }}
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
          transition={{ duration: 0.16, ease: "easeOut" }}
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

function startDragScroll(event: PointerEvent<HTMLDivElement>) {
  const slider = event.currentTarget;
  const target = event.target as HTMLElement;
  if (target.closest("[data-project-trigger]")) {
    slider.dataset.dragging = "false";
    slider.dataset.didDrag = "false";
    return;
  }

  slider.dataset.dragging = "true";
  slider.dataset.didDrag = "false";
  slider.dataset.startX = String(event.clientX);
  slider.dataset.scrollLeft = String(slider.scrollLeft);
  slider.setPointerCapture(event.pointerId);
}

function dragScroll(event: PointerEvent<HTMLDivElement>) {
  const slider = event.currentTarget;
  if (slider.dataset.dragging !== "true") return;

  event.preventDefault();
  const startX = Number(slider.dataset.startX ?? 0);
  const scrollLeft = Number(slider.dataset.scrollLeft ?? 0);
  const dragDistance = event.clientX - startX;
  if (Math.abs(dragDistance) > 6) {
    slider.dataset.didDrag = "true";
  }
  slider.scrollLeft = scrollLeft - dragDistance;
}

function stopDragScroll(event: PointerEvent<HTMLDivElement>) {
  const slider = event.currentTarget;
  slider.dataset.dragging = "false";
  if (slider.hasPointerCapture(event.pointerId)) {
    slider.releasePointerCapture(event.pointerId);
  }
}

function keepInfiniteHeroScroll(slider: HTMLDivElement) {
  const segmentWidth = slider.scrollWidth / 3;
  if (!segmentWidth) return;

  if (slider.scrollLeft < segmentWidth * 0.35) {
    slider.scrollLeft += segmentWidth;
  }

  if (slider.scrollLeft > segmentWidth * 1.65) {
    slider.scrollLeft -= segmentWidth;
  }
}

function updateActiveHeroCard(slider: HTMLDivElement) {
  const cards = Array.from(slider.querySelectorAll<HTMLElement>(".hero-card")).filter(
    (card) => card.offsetWidth > 0
  );
  const viewportCenter = slider.scrollLeft + slider.clientWidth / 2;
  let activeCard: HTMLElement | undefined;
  let activeIndex = -1;
  let smallestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeCard = card;
      activeIndex = index;
    }
  });

  if (!activeCard) return;
  if (activeCard.dataset.heroCardId === slider.dataset.activeHeroCard) return;
  slider.dataset.activeHeroCard = activeCard.dataset.heroCardId ?? "";

  cards.forEach((card, index) => {
    card.classList.toggle("is-center-card", card === activeCard);
    card.classList.toggle("is-neighbor-card", index === activeIndex - 1 || index === activeIndex + 1);
    card.classList.toggle("is-outer-neighbor-card", index === activeIndex - 2 || index === activeIndex + 2);
    card.classList.toggle("is-far-neighbor-card", index === activeIndex - 3 || index === activeIndex + 3);
  });
}

function handleHeroScroll(slider: HTMLDivElement) {
  keepInfiniteHeroScroll(slider);
  if (slider.dataset.heroFrame === "true") return;

  slider.dataset.heroFrame = "true";
  window.requestAnimationFrame(() => {
    updateActiveHeroCard(slider);
    delete slider.dataset.heroFrame;
  });
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

function StackedScene({
  children,
  className,
  id,
  layer
}: {
  children: ReactNode;
  className: string;
  id?: string;
  layer: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress: entryProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "start start"]
  });
  const { scrollYProgress: exitProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "center start"]
  });
  const entryOpacity = useTransform(
    entryProgress,
    [0, 0.2, 1],
    reducedMotion ? [1, 1, 1] : [0.08, 0.75, 1]
  );
  const exitOpacity = useTransform(
    exitProgress,
    [0, 0.15, 0.3, 0.6, 1],
    reducedMotion ? [1, 1, 1, 1, 1] : [1, 0.92, 0.3, 0, 0]
  );
  const opacity = useTransform(() => Math.min(entryOpacity.get(), exitOpacity.get()));

  return (
    <div
      ref={trackRef}
      className="stacked-scene-track"
      style={{ "--scene-layer": layer } as CSSProperties}
    >
      <motion.section
        id={id}
        className={`stacked-scene ${className}`}
        style={{ opacity }}
      >
        {children}
      </motion.section>
    </div>
  );
}

function ContactButtons({
  compact = false,
  tone = "light"
}: {
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const primary = tone === "dark" ? buttonStyles.primaryOnDark : buttonStyles.primary;
  const secondary = tone === "dark" ? buttonStyles.secondaryOnDark : buttonStyles.secondary;

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${compact ? "sm:justify-start" : "justify-center"}`}>
      <Magnetic>
        <a href={contact.whatsapp} className={primary} aria-label="Contact Bilal Asif on WhatsApp">
          <MessageCircle className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:scale-110" />
          Start on WhatsApp
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href={`mailto:${contact.email}?subject=Business%20growth%20project%20with%20Bilal`}
          className={secondary}
          aria-label="Email Bilal Asif"
        >
          <Mail className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:scale-110" />
          Email my project
        </a>
      </Magnetic>
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
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          loading="eager"
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
            className="group/btn pointer-events-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/80 py-1.5 pl-3.5 pr-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm transition-colors duration-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5"
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
      transition={{ duration: 0.18, ease: "easeOut" }}
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
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors duration-300 hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
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

function FaqItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b border-ink/10">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`${serifAccent} text-lg tracking-[-0.01em] text-ink sm:text-xl`}>
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/12 text-ink/60"
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-6 text-sm leading-7 text-ink/60 sm:text-base">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const heroScrollerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<(typeof showcaseCards)[number] | null>(null);

  const portraitX = useMotionValueSpring(0);
  const portraitY = useMotionValueSpring(0);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

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

  useEffect(() => {
    const slider = heroScrollerRef.current;
    if (!slider) return;

    const setMiddleSegment = () => {
      slider.scrollLeft = slider.scrollWidth / 3;
      updateActiveHeroCard(slider);
    };

    const frame = window.requestAnimationFrame(setMiddleSegment);
    window.addEventListener("resize", setMiddleSegment);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", setMiddleSegment);
    };
  }, []);

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
        </AnimatePresence>
        <div className="noise" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mx-auto flex h-14 max-w-4xl items-center justify-between rounded-full border border-ink/10 bg-white/75 pl-6 pr-2 backdrop-blur-xl"
              aria-label="Main navigation"
            >
              <a href="#about" className={`${serifAccent} text-base tracking-[-0.01em]`}>
                Bilal Asif
              </a>
              <div className="hidden items-center gap-8 md:flex">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.4 + index * 0.07 }}
                    className="link-underline text-sm font-medium text-ink/60 transition-colors duration-300 hover:text-ink"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <a
                href="#contact"
                className="inline-flex h-10 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-all duration-300 ease-out-expo hover:scale-[1.03] hover:bg-ink/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2"
              >
                Contact
              </a>
            </motion.nav>
        </header>

        <div className="relative z-10 bg-white">
          <StackedScene
            id="about"
            layer={1}
            className="relative isolate min-h-[100svh] overflow-hidden bg-white px-5 pt-[136px] sm:px-8 sm:pt-[152px] lg:px-12"
          >
            <motion.div
              className="relative mx-auto min-h-[580px] max-w-7xl sm:min-h-[600px] lg:min-h-[630px]"
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
                className={`${serifDisplay} pointer-events-none absolute inset-x-0 top-10 z-20 flex items-center justify-between pl-[19%] pr-[13%] text-6xl leading-none text-ink sm:top-8 sm:pl-[21%] sm:pr-[15%] sm:text-8xl lg:pl-[23%] lg:pr-[17%] lg:text-[9rem]`}
              >
                <span className="inline-block">Hey,</span>
                <span className="inline-block">there</span>
              </h2>

              <div className="absolute bottom-6 left-1/2 z-10 w-[440px] max-w-[100vw] -translate-x-1/2 sm:bottom-4 sm:w-[560px] lg:bottom-2 lg:w-[620px]">
                <motion.div style={{ x: portraitX.spring, y: portraitY.spring }}>
                  <img
                    src="/bilal-asif-portrait-light.webp"
                    alt="Bilal Asif, freelance website designer and digital growth partner"
                    className="w-full object-contain"
                    loading="eager"
                  />
                </motion.div>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 h-52 bg-gradient-to-b from-transparent via-white/80 to-white" />

              <div className="absolute bottom-4 left-0 z-30 sm:bottom-6 lg:bottom-8">
                <p className={`${serifDisplay} whitespace-nowrap text-4xl leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl`}>
                  I am
                </p>
                <p className={`${serifDisplay} whitespace-nowrap text-4xl leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl`}>
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
                transition={{ duration: 0.7, ease: EASE }}
                className="mb-7 text-[10px] font-medium uppercase tracking-[0.3em] text-ink/45 sm:mb-9 sm:text-xs"
              >
                Freelance Digital Growth Partner
              </motion.p>

              <h1 className="font-sans text-5xl font-semibold leading-[0.86] tracking-normal sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem]">
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    className="block text-black"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.08 }}
                  >
                    Grow Your
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-3">
                  <motion.span
                    className="block text-ink/30"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.18 }}
                  >
                    Business Online
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
                      className="inline-flex min-h-14 items-center justify-center border border-ink/25 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      View My Work
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-full border border-ink/15 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink/55 transition-all duration-300 hover:border-ink/40 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/25 text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      Chat on WhatsApp
                    </a>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            <motion.div
              className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink/40 sm:flex"
              animate={{ y: [0, 7, 0], opacity: [0.42, 0.8, 0.42] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
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
            className="min-h-[100svh] overflow-x-hidden bg-transparent px-5 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-12"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <Reveal y={24} blur={3}>
                <p className="mb-5 text-[10px] font-medium uppercase tracking-normal text-ink/45 sm:text-xs">
                  Featured Work
                </p>
                <h2 className="scroll-mt-28 font-sans text-4xl font-semibold leading-[0.95] tracking-normal text-ink sm:text-6xl lg:text-7xl">
                  <span className="block">Real results for</span>
                  <span className="block">real businesses</span>
                </h2>
              </Reveal>

              <Reveal delay={0.15} y={18} blur={2}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-normal text-ink/55 transition-colors duration-300 hover:text-ink sm:text-sm"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5" />
                </a>
              </Reveal>
            </div>

            <motion.div
              ref={heroScrollerRef}
              initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="manual-hero-scroll relative -mx-5 mt-6 h-[370px] cursor-grab select-none overflow-x-auto overflow-y-visible py-8 active:cursor-grabbing sm:-mx-8 sm:mt-8 sm:h-[455px] sm:py-10 lg:-mx-12 lg:h-[530px] lg:py-12"
              onScroll={(event) => handleHeroScroll(event.currentTarget)}
              onPointerDown={startDragScroll}
              onPointerMove={dragScroll}
              onPointerUp={stopDragScroll}
              onPointerCancel={stopDragScroll}
              onPointerLeave={stopDragScroll}
            >
              <div className="flex w-max items-start -space-x-11 px-[12vw] sm:-space-x-14 sm:px-[10vw] lg:-space-x-16 lg:px-[8vw]">
                {[...heroCards, ...heroCards, ...heroCards].map((item, index) => {
                  return (
                    <div
                      key={`${item.cardIndex}-${index}`}
                      data-hero-card-id={`${item.cardIndex}-${index}`}
                      className={`hero-card relative h-[255px] w-[176px] shrink-0 overflow-hidden rounded-card sm:h-[325px] sm:w-[218px] lg:h-[380px] lg:w-[258px] ${item.hide}`}
                      style={{
                        "--card-y": `${item.top}px`,
                        "--card-rotate": `${item.rotate}deg`,
                        "--card-scale": item.scale,
                        "--card-z": item.z
                      } as CSSProperties}
                    >
                      <FastHeroMockup
                        card={showcaseCards[item.cardIndex]}
                        onOpen={setSelectedProject}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </StackedScene>

          <StackedScene
            id="services"
            layer={4}
            className="min-h-[100svh] scroll-mt-24 bg-transparent px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
          >
            <div className="mx-auto max-w-7xl">
              <Reveal y={24} blur={3}>
                <p className="mb-5 text-[10px] font-medium uppercase tracking-normal text-ink/45 sm:text-xs">
                  What I Do
                </p>
                <h2 className="font-sans text-5xl font-semibold leading-none tracking-normal text-ink sm:text-7xl lg:text-8xl">
                  Services
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 xl:grid-cols-4">
                {services.map((service, index) => (
                  <Reveal key={service.title} delay={index * 0.07} className="h-full">
                    <Tilt className="h-full">
                    <article className="group h-full rounded-card border border-ink/10 bg-white p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 items-center gap-4">
                          {service.logos.map((logo) => (
                            <img
                              key={logo.name}
                              src={logo.src}
                              alt={`${logo.name} logo`}
                              title={logo.name}
                              className="h-8 w-8 object-contain grayscale transition-all duration-500 ease-out-expo group-hover:grayscale-0"
                              loading="lazy"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium tabular-nums text-ink/30">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className={`${serifDisplay} mt-8 text-2xl leading-tight tracking-[-0.02em] text-ink`}>
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-ink/60">{service.description}</p>
                    </article>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </div>
          </StackedScene>

          <StackedScene
            layer={5}
            className="on-dark min-h-[100svh] bg-black px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12"
          >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <Reveal>
                  <SectionLabel tone="dark">Why it works</SectionLabel>
                </Reveal>
                <h2 className={`${serifDisplay} text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl`}>
                  <TextReveal
                    segments={toSegments("Your website should not just sit there. It should sell your business.")}
                    stagger={0.025}
                  />
                </h2>
                <Reveal delay={0.15}>
                  <p className="mt-7 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
                    A beautiful site is only the start. The real value is in clear offers, search-friendly
                    pages, persuasive copy and traffic channels that bring people who are ready to buy.
                  </p>
                </Reveal>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["More calls", "Make it easy for visitors to contact you from mobile, email or WhatsApp."],
                  ["More orders", "Create a clear path from menu, product or service page to checkout or inquiry."],
                  ["More trust", "Show your offer, quality, reviews and process in a polished first impression."],
                  ["More visibility", "Use SEO keywords and ad-ready landing pages to reach high-intent customers."]
                ].map(([title, text], index) => (
                  <Reveal key={title} delay={index * 0.07} className="h-full">
                    <Tilt className="h-full">
                      <div className="h-full rounded-card border border-white/10 bg-white/[0.05] p-7 transition-colors duration-500 ease-out-expo hover:bg-white/[0.08]">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                          <Check className="h-4 w-4 text-white" />
                        </span>
                        <h3 className={`${serifDisplay} mt-6 text-2xl tracking-[-0.02em]`}>{title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                      </div>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </div>
          </StackedScene>

          <StackedScene
            id="packages"
            layer={6}
            className="min-h-[100svh] scroll-mt-24 bg-transparent px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
          >
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <Reveal>
                  <SectionLabel>Packages</SectionLabel>
                </Reveal>
                <h2 className={`${serifDisplay} text-4xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl`}>
                  <TextReveal
                    segments={toSegments("No fixed prices. Just the right package for your next stage.")}
                    stagger={0.03}
                  />
                </h2>
              </div>
              <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-3">
                {packages.map((item, index) => {
                  const featured = index === 1;
                  return (
                    <Reveal key={item.title} delay={index * 0.08} className="h-full">
                      <Tilt className="h-full">
                      <article
                        className={`h-full rounded-card border p-8 transition-all duration-500 ease-out-expo hover:-translate-y-1 ${
                          featured
                            ? "on-dark border-ink bg-ink text-white shadow-lift"
                            : "border-ink/10 bg-white hover:border-ink/25 hover:shadow-lift"
                        }`}
                      >
                        <h3 className={`${serifDisplay} text-3xl tracking-[-0.02em]`}>{item.title}</h3>
                        <p className={`mt-3 text-sm leading-7 ${featured ? "text-white/60" : "text-ink/60"}`}>
                          {item.bestFor}
                        </p>
                        <div
                          className={`my-7 rounded-xl border px-4 py-3 text-center text-sm font-medium ${
                            featured
                              ? "border-white/12 bg-white/[0.06] text-white"
                              : "border-ink/10 bg-ink/[0.03] text-ink"
                          }`}
                        >
                          Contact for a custom package
                        </div>
                        <ul className="space-y-3">
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
                      </Tilt>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </StackedScene>

          <StackedScene
            id="process"
            layer={7}
            className="min-h-[100svh] scroll-mt-24 bg-transparent px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
          >
            <div className="mx-auto grid max-w-7xl gap-10 sm:gap-14 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <Reveal>
                  <SectionLabel>Process</SectionLabel>
                </Reveal>
                <h2 className={`${serifDisplay} text-4xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl`}>
                  <TextReveal
                    segments={toSegments("Simple, clear and focused on growth from day one.")}
                    stagger={0.03}
                  />
                </h2>
                <Reveal delay={0.15}>
                  <p className="mt-7 max-w-xl text-base leading-8 text-ink/60 sm:text-lg">
                    I keep the process friendly and practical, so business owners know exactly what is being
                    built and why it matters.
                  </p>
                </Reveal>
              </div>
              <div className="border-y border-ink/10">
                {process.map((step, index) => (
                  <Reveal key={step} delay={index * 0.07}>
                    <div
                      className={`group flex items-baseline gap-6 py-7 sm:gap-10 ${
                        index > 0 ? "border-t border-ink/10" : ""
                      }`}
                    >
                      <span className="text-sm font-medium tabular-nums text-ink/30 transition-colors duration-300 group-hover:text-ink sm:text-base">
                        0{index + 1}
                      </span>
                      <p className="text-lg leading-8 text-ink/75 transition-all duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:text-ink sm:text-xl">
                        {step}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </StackedScene>

          <StackedScene
            layer={8}
            className="min-h-[100svh] bg-transparent px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <Reveal>
                  <SectionLabel>FAQ</SectionLabel>
                </Reveal>
                <h2 className={`${serifDisplay} text-4xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl`}>
                  <TextReveal
                    segments={toSegments("Questions business owners usually ask before starting.")}
                    stagger={0.03}
                  />
                </h2>
              </div>
              <div className="border-t border-ink/10">
                {faqs.map((faq, index) => (
                  <FaqItem key={faq.question} faq={faq} index={index} />
                ))}
              </div>
            </div>
          </StackedScene>

          <StackedScene
            id="contact"
            layer={9}
            className="min-h-[100svh] scroll-mt-24 bg-transparent px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
          >
            <Reveal className="mx-auto max-w-7xl">
              <div className="on-dark relative overflow-hidden rounded-panel bg-ink px-7 py-16 text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24">
                <div
                  className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[56rem] -translate-x-1/2"
                  aria-hidden="true"
                >
                  <motion.div
                    className="h-full w-full rounded-full bg-white/[0.05] blur-3xl"
                    animate={{ x: [-60, 60, -60] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="relative">
                  <SectionLabel tone="dark">Ready to grow?</SectionLabel>
                  <h2 className={`${serifDisplay} max-w-4xl text-4xl leading-[0.95] tracking-[-0.03em] sm:text-6xl`}>
                    <TextReveal
                      segments={toSegments(
                        "Tell me what you sell. I will help you turn it into a stronger online business."
                      )}
                      stagger={0.025}
                    />
                  </h2>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                    Send your business type, current website if you have one and the result you want next:
                    more calls, more orders, better Google ranking or ecommerce sales.
                  </p>
                  <div className="mt-10">
                    <ContactButtons compact tone="dark" />
                  </div>
                </div>
              </div>
            </Reveal>
          </StackedScene>

          <section className="relative z-20 bg-white py-12 sm:py-16">
            <div className="marquee overflow-hidden py-2">
              <div className="marquee-track flex w-max items-center gap-4 px-5 hover:[animation-play-state:paused]">
                {[...tools, ...tools].map((tool, index) => (
                  <motion.div
                    key={`${tool.name}-${index}`}
                    className="group grid h-24 w-28 place-items-center"
                    title={tool.name}
                    aria-label={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: EASE, delay: (index % tools.length) * 0.03 }}
                  >
                    <img
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="h-12 w-12 object-contain opacity-40 grayscale transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <footer className="relative z-20 border-t border-ink/10 bg-white px-5 py-12 sm:px-8 lg:px-12">
            <Reveal>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={`${serifAccent} text-lg text-ink`}>Bilal Asif</p>
                <p className="mt-2 text-sm text-ink/50">
                  Websites, SEO and ads for business growth.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-ink/60">
                <a
                  href={contact.linkedin}
                  className="link-underline transition-colors duration-300 hover:text-ink"
                >
                  LinkedIn
                </a>
                <a
                  href={contact.instagram}
                  className="link-underline transition-colors duration-300 hover:text-ink"
                >
                  Instagram
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-underline transition-colors duration-300 hover:text-ink"
                >
                  Email
                </a>
                <a
                  href={contact.whatsapp}
                  className="link-underline transition-colors duration-300 hover:text-ink"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Bilal Asif</p>
              <p>Built for Vercel, Next.js and fast SEO performance.</p>
            </div>
            </Reveal>
          </footer>
        </div>
      </main>
    </MotionConfig>
  );
}
