"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Petrona } from "next/font/google";
import {
  ArrowRight,
  Check,
  Globe2,
  Mail,
  MessageCircle,
  MousePointerClick,
  Search,
  ShoppingBag,
  Sparkles,
  Target
} from "lucide-react";

const petrona = Petrona({
  subsets: ["latin"],
  weight: "100",
  style: "italic",
  display: "swap"
});

const contact = {
  email: "bilalasif1024@gmail.com",
  whatsapp: "https://wa.me/92307998854?text=Hi%20Bilal%2C%20I%20want%20to%20grow%20my%20business%20online.",
  instagram: "https://www.instagram.com/bilal.asif__/",
  linkedin: "https://www.linkedin.com/in/bilal-asif/"
};

const navItems = ["Services", "Projects", "Packages", "Process"];

const services = [
  {
    icon: Globe2,
    title: "Business Websites",
    description:
      "Fast, mobile-first websites for restaurants, food brands, local shops and service businesses that need trust, calls and orders."
  },
  {
    icon: Search,
    title: "Local SEO",
    description:
      "Google-friendly pages, keywords, location content and technical SEO so customers can find your business before competitors."
  },
  {
    icon: Target,
    title: "Google and Meta Ads",
    description:
      "Campaign structure, landing pages and keyword strategy for paid traffic that is built around real leads, not vanity clicks."
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Launch",
    description:
      "Product pages, checkout flow, store structure and conversion copy for businesses ready to sell online in the USA or Europe."
  }
];

const tools = [
  {
    name: "Next.js",
    logo: "https://cdn.simpleicons.org/nextdotjs/111111",
    tone: "bg-white"
  },
  {
    name: "React",
    logo: "https://cdn.simpleicons.org/react/61DAFB",
    tone: "bg-white"
  },
  {
    name: "Node.js",
    logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    tone: "bg-white"
  },
  {
    name: "Express.js",
    logo: "https://cdn.simpleicons.org/express/111111",
    tone: "bg-white"
  },
  {
    name: "MongoDB",
    logo: "https://cdn.simpleicons.org/mongodb/47A248",
    tone: "bg-white"
  },
  {
    name: "JavaScript",
    logo: "https://cdn.simpleicons.org/javascript/F7DF1E",
    tone: "bg-white"
  },
  {
    name: "TypeScript",
    logo: "https://cdn.simpleicons.org/typescript/3178C6",
    tone: "bg-white"
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    tone: "bg-sky-50"
  },
  {
    name: "HTML5",
    logo: "https://cdn.simpleicons.org/html5/E34F26",
    tone: "bg-white"
  },
  {
    name: "CSS3",
    logo: "https://cdn.simpleicons.org/css/663399",
    tone: "bg-white"
  },
  {
    name: "Framer Motion",
    logo: "https://cdn.simpleicons.org/framer/0055FF",
    tone: "bg-blue-50"
  },
  {
    name: "shadcn/ui",
    logo: "https://cdn.simpleicons.org/shadcnui/111111",
    tone: "bg-white"
  },
  {
    name: "Google Ads",
    logo: "https://cdn.simpleicons.org/googleads/4285F4",
    tone: "bg-white"
  },
  {
    name: "Meta Ads",
    logo: "https://cdn.simpleicons.org/meta/0467DF",
    tone: "bg-blue-50"
  },
  {
    name: "Search Console",
    logo: "https://cdn.simpleicons.org/googlesearchconsole/458CF5",
    tone: "bg-white"
  },
  {
    name: "Vercel",
    logo: "https://cdn.simpleicons.org/vercel/111111",
    tone: "bg-white"
  },
  {
    name: "GitHub",
    logo: "https://cdn.simpleicons.org/github/111111",
    tone: "bg-white"
  }
];

const liveReferences = [
  {
    title: "Aesop",
    category: "Premium skincare ecommerce",
    url: "https://www.aesop.com/",
    note: "Reference for calm luxury product pages, strong typography and premium brand trust."
  },
  {
    title: "Sweetgreen",
    category: "Restaurant and food ordering",
    url: "https://www.sweetgreen.com/",
    note: "Reference for clean restaurant storytelling, menu flow and order-focused calls to action."
  },
  {
    title: "Floyd's 99 Barbershop",
    category: "Barber booking website",
    url: "https://www.floydsbarbershop.com/",
    note: "Reference for local service booking, location pages and customer conversion flow."
  },
  {
    title: "Dominique Ansel",
    category: "Bakery and luxury food brand",
    url: "https://www.dominiqueansel.com/",
    note: "Reference for premium food photography, product desirability and brand presentation."
  }
];

const showcaseCards = [
  {
    title: "Cocoa Crafted",
    eyebrow: "Chocolate Website",
    metric: "Online sweets",
    description: "A warm ecommerce experience crafted to turn chocolate lovers into loyal customers.",
    textTone: "dark",
    color: "bg-[#3a1d14] text-white",
    background: "linear-gradient(135deg, #2a1712 0%, #6f3b25 48%, #f3c37a 100%)",
    accent: "#f3c37a",
    image: "/portfolio-cards/light/cocoa-crafted-mixed.jpg"
  },
  {
    title: "Blade & Brush",
    eyebrow: "Barber Booking",
    metric: "More bookings",
    description: "A premium booking website designed for effortless appointments and local discovery.",
    textTone: "light",
    color: "bg-ink text-white",
    background: "linear-gradient(135deg, #111111 0%, #373737 55%, #d7b98c 100%)",
    accent: "#d7b98c",
    image: "/portfolio-cards/light/blade-brush-mixed.jpg"
  },
  {
    title: "Spice Table",
    eyebrow: "Restaurant Site",
    metric: "Table orders",
    description: "A vibrant restaurant website built to make every dish irresistible and easy to order.",
    textTone: "dark",
    color: "bg-coral text-white",
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
    color: "bg-cobalt text-white",
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
    color: "bg-mint text-ink",
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
    color: "bg-butter text-ink",
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
    color: "bg-mint text-ink",
    background: "linear-gradient(135deg, #f8ffff 0%, #8ad9c0 48%, #3024f5 100%)",
    accent: "#3024f5",
    image: "/portfolio-cards/light/glow-dental-mixed.jpg"
  },
  {
    title: "Urban Auto",
    eyebrow: "Auto Service",
    metric: "More calls",
    description: "A sharp automotive website engineered to generate service calls and qualified leads.",
    textTone: "light",
    color: "bg-ink text-white",
    background: "linear-gradient(135deg, #0f0f0f 0%, #424242 46%, #ef624f 100%)",
    accent: "#ef624f",
    image: "/portfolio-cards/light/urban-auto-mixed.jpg"
  },
  {
    title: "Paw Palace",
    eyebrow: "Pet Care Booking",
    metric: "New clients",
    description: "A friendly pet care experience that makes trusted grooming simple to discover and book.",
    textTone: "dark",
    color: "bg-butter text-ink",
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
    color: "bg-[#3a1d14] text-white",
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
    color: "bg-cobalt text-white",
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
    color: "bg-mint text-ink",
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

const process = [
  "Understand your business, market and best customers",
  "Plan the offer, keywords, website pages and calls to action",
  "Design and build a fast website that works on every device",
  "Launch with SEO foundations, tracking-ready structure and growth next steps"
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

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" as const }
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";
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
    }, phraseDuration * introPhrases.length + 1250);

    return () => {
      phraseTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(finalTextTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = "";
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
      <div className={text.startsWith("HI,") ? "text-3xl font-black tracking-[-0.04em] sm:text-5xl lg:text-7xl" : "text-xl font-black tracking-[-0.01em] sm:text-3xl lg:text-4xl"}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className={text.startsWith("HI,") ? "intro-final-line inline-block min-w-[12ch] leading-none" : "inline-block min-w-[8ch] leading-tight"}
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
}

function startDragScroll(event: PointerEvent<HTMLDivElement>) {
  const slider = event.currentTarget;
  slider.dataset.dragging = "true";
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
  slider.scrollLeft = scrollLeft - (event.clientX - startX);
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-ink/70">
      <Sparkles className="h-3.5 w-3.5 text-coral" />
      {children}
    </div>
  );
}

function ContactButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${compact ? "sm:justify-start" : "justify-center"}`}>
      <a
        href={contact.whatsapp}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-cobalt focus:outline-none focus:ring-4 focus:ring-cobalt/20"
        aria-label="Contact Bilal Asif on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        Start on WhatsApp
      </a>
      <a
        href={`mailto:${contact.email}?subject=Business%20growth%20project%20with%20Bilal`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-black text-ink shadow-card transition hover:-translate-y-0.5 hover:border-ink/25 focus:outline-none focus:ring-4 focus:ring-mint/30"
        aria-label="Email Bilal Asif"
      >
        <Mail className="h-4 w-4" />
        Email my project
      </a>
    </div>
  );
}

function FastHeroMockup({ card }: { card: (typeof showcaseCards)[number] }) {
  if ("image" in card && card.image) {
    const useDarkText = card.textTone === "dark";

    return (
      <div className={`group relative h-full w-full overflow-hidden ${useDarkText ? "bg-white text-ink" : "bg-ink text-white"}`}>
        <img
          src={card.image}
          alt={`${card.title} ${card.eyebrow} poster visual`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/32 via-transparent to-black/38" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
          <div>
            <h3 className="hero-card-title font-serif text-2xl font-normal leading-[0.94] text-white sm:text-3xl lg:text-[2.2rem]">
              {card.title}
            </h3>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="mb-2 block h-px w-10 bg-white shadow-[0_1px_3px_#000] sm:w-12" />
              <p className="hero-card-copy text-[8px] font-black uppercase tracking-[0.16em] text-white sm:text-[9px] lg:text-[10px]">
                {card.eyebrow}
              </p>
            </div>
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#c98270] text-white sm:h-9 sm:w-9"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>
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
          <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
            {card.eyebrow}
          </p>
          <h3 className="mt-2 max-w-[12rem] text-2xl font-black leading-none tracking-[-0.04em] sm:text-3xl">
            {card.title}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: card.accent }} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-2xl bg-white/18"
                style={item === 1 ? { backgroundColor: card.accent } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroScrollerRef = useRef<HTMLDivElement>(null);
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
    <main className="relative min-h-screen bg-white text-ink">
      <IntroSplash />
      <div className="noise" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="relative z-10 bg-white">
        <header className="sticky top-4 z-40 px-4 py-4 sm:px-6 lg:px-12">
          <nav
            className="relative mx-auto flex max-w-7xl items-center justify-end gap-5"
            aria-label="Main navigation"
          >
            <div className="hidden items-center gap-9 text-sm font-bold text-ink lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:opacity-60">
                  {item}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-black text-white transition hover:bg-cobalt"
            >
              Contact
            </a>
          </nav>
        </header>

        <section
          id="about"
          className="relative isolate -mt-24 min-h-[620px] overflow-hidden bg-white px-5 pt-[136px] sm:min-h-[660px] sm:px-8 sm:pt-[152px] lg:min-h-[680px] lg:px-12"
        >
          <motion.div {...fadeUp} className="relative mx-auto min-h-[580px] max-w-7xl sm:min-h-[600px] lg:min-h-[630px]">
            <h2
              className={`${petrona.className} pointer-events-none absolute inset-x-0 top-10 z-20 flex items-center justify-between pl-[19%] pr-[13%] text-6xl italic leading-none text-ink sm:top-8 sm:pl-[21%] sm:pr-[15%] sm:text-8xl lg:pl-[23%] lg:pr-[17%] lg:text-[9rem]`}
            >
              <span>Hey,</span>
              <span>there</span>
            </h2>

            <img
              src="/bilal-asif-portrait-3.png"
              alt="Bilal Asif, freelance website designer and digital growth partner"
              className="absolute bottom-6 left-1/2 z-10 w-[440px] max-w-[100vw] -translate-x-1/2 object-contain mix-blend-multiply sm:bottom-4 sm:w-[560px] lg:bottom-2 lg:w-[620px]"
              loading="lazy"
            />

            <div className="absolute inset-x-0 bottom-0 z-20 h-52 bg-gradient-to-b from-transparent via-white/80 to-white" />

            <div className="absolute bottom-4 left-0 z-30 sm:bottom-6 lg:bottom-8">
              <p
                className={`${petrona.className} whitespace-nowrap text-4xl italic leading-[0.9] tracking-tight text-ink sm:text-6xl lg:text-7xl`}
              >
                I am
              </p>
              <p
                className={`${petrona.className} whitespace-nowrap text-4xl italic leading-[0.9] tracking-tight text-ink sm:text-6xl lg:text-7xl`}
              >
                Bilal Asif
              </p>
            </div>
          </motion.div>
        </section>

        <section className="relative overflow-x-hidden px-5 pb-10 pt-10 sm:px-8 sm:pb-16 sm:pt-16 lg:px-12">
          <motion.div {...fadeUp} className="mx-auto max-w-6xl text-center">
            <h1
              className={`${petrona.className} mx-auto max-w-5xl text-5xl italic leading-[0.9] tracking-[-0.04em] text-ink sm:text-6xl md:text-7xl lg:text-8xl`}
            >
              Scale your business online with me.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink/68 sm:text-xl sm:leading-8">
              Websites, SEO, ecommerce and ads for restaurants, food brands, local shops and service businesses that want more calls, orders, bookings and sales.
            </p>
            <div className="mt-7">
              <ContactButtons />
            </div>
          </motion.div>

          <motion.h2
            id="projects"
            {...fadeUp}
            className="mt-12 scroll-mt-28 text-center text-3xl font-black leading-none tracking-[-0.035em] text-ink sm:mt-16 sm:text-5xl"
          >
            My Projects
          </motion.h2>

          <motion.div
            ref={heroScrollerRef}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="manual-hero-scroll relative -mx-5 mt-2 h-[370px] cursor-grab select-none overflow-x-auto overflow-y-visible py-8 active:cursor-grabbing sm:-mx-8 sm:h-[455px] sm:py-10 lg:-mx-12 lg:h-[530px] lg:py-12"
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
                    className={`hero-card relative h-[255px] w-[176px] shrink-0 overflow-hidden rounded-[1.4rem] sm:h-[325px] sm:w-[218px] lg:h-[380px] lg:w-[258px] ${item.hide}`}
                    style={{
                      "--card-y": `${item.top}px`,
                      "--card-rotate": `${item.rotate}deg`,
                      "--card-scale": item.scale,
                      "--card-z": item.z
                    } as CSSProperties}
                  >
                    <FastHeroMockup card={showcaseCards[item.cardIndex]} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section className="bg-white py-10">
          <div className="marquee overflow-hidden py-2">
            <div className="marquee-track hover:[animation-play-state:paused] flex w-max gap-6 px-5">
              {[...tools, ...tools].map((tool, index) => (
                <div
                  key={`${tool.name}-${index}`}
                  className="logo-wave group grid h-28 w-32 place-items-center transition duration-300 hover:-translate-y-1 hover:rotate-[-1deg]"
                  style={{ animationDelay: `${(index % tools.length) * 0.16}s` }}
                  title={tool.name}
                  aria-label={tool.name}
                >
                  <div className="grid h-24 w-24 place-items-center transition duration-300 group-hover:scale-110">
                    <img
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="h-16 w-16 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-3xl">
              <SectionLabel>Services</SectionLabel>
              <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                Everything a small business needs to get found, trusted and chosen.
              </h2>
            </motion.div>
            <div className="mt-7 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                    className="rounded-[1.6rem] border border-ink/8 bg-white p-6 shadow-card"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-ink/5 bg-white">
                      <Icon className="h-5 w-5 text-cobalt" />
                    </div>
                    <h3 className="mt-7 text-2xl font-black tracking-[-0.02em]">{service.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-ink/62">{service.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-ink px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...fadeUp}>
              <SectionLabel>Why it works</SectionLabel>
              <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                Your website should not just sit there. It should sell your business.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                A beautiful site is only the start. The real value is in clear offers, search-friendly pages, persuasive copy and traffic channels that bring people who are ready to buy.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["More calls", "Make it easy for visitors to contact you from mobile, email or WhatsApp."],
                ["More orders", "Create a clear path from menu, product or service page to checkout or inquiry."],
                ["More trust", "Show your offer, quality, reviews and process in a polished first impression."],
                ["More visibility", "Use SEO keywords and ad-ready landing pages to reach high-intent customers."]
              ].map(([title, text], index) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-6"
                >
                  <Check className="h-6 w-6 text-mint" />
                  <h3 className="mt-6 text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <SectionLabel>Live References</SectionLabel>
                <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                  Real websites I study for premium business inspiration.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-ink/58">
                These are public websites for style reference only. They show the level of polish, trust and conversion flow I can design toward.
              </p>
            </motion.div>

            <div className="mt-7 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4">
              {liveReferences.map((reference, index) => (
                <motion.a
                  key={reference.title}
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                  className="group rounded-[1.5rem] border border-ink/8 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-ink/18"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cobalt">{reference.category}</p>
                  <h3 className="mt-4 text-2xl font-black tracking-[-0.025em]">{reference.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/62">{reference.note}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-ink">
                    Visit website
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="packages" className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-3xl">
              <SectionLabel>Packages</SectionLabel>
              <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                No fixed prices. Just the right package for your next stage.
              </h2>
            </motion.div>
            <div className="mt-7 grid gap-5 sm:mt-10 lg:grid-cols-3">
              {packages.map((item, index) => (
                <motion.article
                  key={item.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.07 }}
                  className={`rounded-[1.8rem] border p-7 shadow-card ${
                    index === 1 ? "border-ink bg-ink text-white" : "border-ink/8 bg-white"
                  }`}
                >
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${index === 1 ? "text-white/65" : "text-ink/62"}`}>
                    {item.bestFor}
                  </p>
                  <div className="my-7 rounded-2xl border border-ink/5 bg-white px-4 py-3 text-center text-sm font-black text-ink">
                    Contact for a custom package
                  </div>
                  <ul className="space-y-3">
                    {item.includes.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm font-bold">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${index === 1 ? "text-mint" : "text-coral"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div {...fadeUp}>
              <SectionLabel>Process</SectionLabel>
              <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                Simple, clear and focused on growth from day one.
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/62">
                I keep the process friendly and practical, so business owners know exactly what is being built and why it matters.
              </p>
            </motion.div>
            <div className="space-y-4">
              {process.map((step, index) => (
                <motion.div
                  key={step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                  className="flex gap-5 rounded-[1.5rem] border border-ink/8 bg-white p-5 shadow-card"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black">Step {index + 1}</h3>
                    <p className="mt-1 text-sm leading-7 text-ink/62">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-3xl">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                Questions business owners usually ask before starting.
              </h2>
            </motion.div>
            <div className="mt-7 grid gap-4 sm:mt-10 lg:grid-cols-2">
              {faqs.map((faq, index) => (
                <motion.article
                  key={faq.question}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.05 }}
                  className="rounded-[1.5rem] border border-ink/8 bg-white p-6 shadow-card"
                >
                  <h3 className="text-xl font-black tracking-[-0.015em]">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/62">{faq.answer}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <motion.div
            {...fadeUp}
            className="mx-auto max-w-7xl rounded-[2rem] bg-ink p-7 text-white shadow-soft sm:p-10 lg:p-14"
          >
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/70">
                <MousePointerClick className="h-3.5 w-3.5 text-mint" />
                Ready to grow?
              </div>
              <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
                Tell me what you sell. I will help you turn it into a stronger online business.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
                Send your business type, current website if you have one and the result you want next: more calls, more orders, better Google ranking or ecommerce sales.
              </p>
              <div className="mt-8">
                <ContactButtons compact />
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-ink/5 px-5 py-8 text-sm font-bold text-ink/50 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Bilal Asif. Websites, SEO and ads for business growth.</p>
            <p>Built for Vercel, Next.js and fast SEO performance.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
