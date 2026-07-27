"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  EASE,
  FloatingScrollbar,
  getLenis,
  MOTION,
  ScrollProgress,
  SmoothCursor,
  SmoothScroll
} from "@/components/motion";
import {
  ExperienceLink,
  PORTFOLIO_NAVIGATE_EVENT,
  type PortfolioNavigateDetail
} from "@/components/experience-link";
import { StackedPage } from "@/components/stacked-page";
import { HomeIntro } from "@/features/portfolio/home-intro";
import {
  PROFESSIONAL_SERVICE_SCHEMA,
  SITE_NAV_ITEMS
} from "@/features/portfolio/data";

const GrowthView = dynamic(() =>
  import("@/features/portfolio/growth-view").then((module) => module.GrowthView)
);
const ProjectsView = dynamic(() =>
  import("@/features/portfolio/projects-view").then(
    (module) => module.ProjectsView
  )
);
const ServicesView = dynamic(() =>
  import("@/features/portfolio/services-view").then(
    (module) => module.ServicesView
  )
);
const PackagesView = dynamic(() =>
  import("@/features/portfolio/packages-view").then(
    (module) => module.PackagesView
  )
);
const ProcessView = dynamic(() =>
  import("@/features/portfolio/process-view").then(
    (module) => module.ProcessView
  )
);
const FaqView = dynamic(() =>
  import("@/features/portfolio/faq-view").then((module) => module.FaqView)
);
const ContactView = dynamic(() =>
  import("@/features/portfolio/contact-view").then(
    (module) => module.ContactView
  )
);

const PORTFOLIO_PATHS = [
  "/",
  "/growth",
  "/projects",
  "/services",
  "/packages",
  "/process",
  "/faq",
  "/contact"
] as const;

const PAGE_TITLES: Record<(typeof PORTFOLIO_PATHS)[number], string> = {
  "/": "Bilal Asif | Digital Growth Partner",
  "/growth": "Grow Your Business Online | Bilal Asif",
  "/projects": "Selected Work | Bilal Asif",
  "/services": "Digital Growth Services | Bilal Asif",
  "/packages": "Service Packages | Bilal Asif",
  "/process": "My Growth Process | Bilal Asif",
  "/faq": "Frequently Asked Questions | Bilal Asif",
  "/contact": "Start a Project | Bilal Asif"
};

const DARK_PATHS = new Set<(typeof PORTFOLIO_PATHS)[number]>([
  "/services",
  "/faq",
  "/contact"
]);

function isPortfolioPath(path: string): path is (typeof PORTFOLIO_PATHS)[number] {
  return PORTFOLIO_PATHS.includes(
    path as (typeof PORTFOLIO_PATHS)[number]
  );
}

function getTrack(path: string) {
  return document.querySelector<HTMLElement>(
    `[data-portfolio-track="${path}"]`
  );
}

function DeferredScene({
  path,
  activePath,
  children
}: {
  path: (typeof PORTFOLIO_PATHS)[number];
  activePath: (typeof PORTFOLIO_PATHS)[number];
  children: React.ReactNode;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(path === activePath);
  const ready = nearViewport || path === activePath;

  useEffect(() => {
    if (ready || !sceneRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "75% 0px" }
    );
    observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={sceneRef} className={ready ? undefined : "min-h-[100svh]"}>
      {ready ? children : null}
    </div>
  );
}

function PackagesOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.section
      role="region"
      aria-label="Service packages"
      className="fixed inset-0 z-40 overflow-y-auto bg-white text-ink md:overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: MOTION.duration.fast, ease: EASE }}
    >
      <button
        autoFocus
        type="button"
        onClick={onClose}
        aria-label="Close packages"
        className="absolute right-4 top-16 z-10 grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white text-ink transition-colors duration-[240ms] hover:bg-ink hover:text-white sm:right-6 md:top-5"
      >
        <X className="h-4 w-4" />
      </button>
      <motion.div
        className="min-h-full md:h-full"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: MOTION.duration.base, ease: EASE }}
      >
        <PackagesView />
      </motion.div>
    </motion.section>
  );
}

export function PortfolioExperience() {
  const pathname = usePathname();
  const initialPath = isPortfolioPath(pathname) ? pathname : "/";
  const [activePath, setActivePath] = useState(initialPath);
  const [packagesOpen, setPackagesOpen] = useState(initialPath === "/packages");
  const navOnDark = DARK_PATHS.has(activePath);
  const activePathRef = useRef(initialPath);
  const underlyingPathRef = useRef<(typeof PORTFOLIO_PATHS)[number]>(
    initialPath === "/packages" ? "/" : initialPath
  );
  const positionedRef = useRef(false);
  const frameRef = useRef(0);

  const setCurrentPath = useCallback(
    (
      path: (typeof PORTFOLIO_PATHS)[number],
      history: "push" | "replace" | "none"
    ) => {
      activePathRef.current = path;
      if (path !== "/packages") underlyingPathRef.current = path;
      setActivePath(path);
      document.title = PAGE_TITLES[path];

      if (history === "none" || window.location.pathname === path) return;
      const state = {
        ...(window.history.state ?? {}),
        portfolioPath: path
      };
      if (history === "push") {
        window.history.pushState(state, "", path);
      } else {
        window.history.replaceState(state, "", path);
      }
    },
    []
  );

  const scrollToPath = useCallback(
    (
      path: string,
      history: "push" | "replace" | "none" = "push",
      immediate = false
    ) => {
      if (!isPortfolioPath(path)) return;
      if (path === "/packages") {
        setPackagesOpen(true);
        setCurrentPath(path, history);
        return;
      }

      const target = getTrack(path);
      if (!target) return;

      setPackagesOpen(false);
      getLenis()?.start();
      setCurrentPath(path, history);
      const top = target.getBoundingClientRect().top + window.scrollY;
      const lenis = getLenis();
      if (lenis) {
        const viewportDistance =
          Math.abs(top - window.scrollY) / Math.max(window.innerHeight, 1);
        const duration = Math.min(
          2.6,
          Math.max(1.15, 0.95 + viewportDistance * 0.16)
        );
        lenis.scrollTo(top, {
          immediate,
          duration,
          force: true
        });
      } else {
        window.scrollTo({
          top,
          behavior:
            immediate ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth"
        });
      }
    },
    [setCurrentPath]
  );

  useLayoutEffect(() => {
    if (positionedRef.current) return;
    positionedRef.current = true;
    if (initialPath === "/") {
      activePathRef.current = initialPath;
      return;
    }
    const target = getTrack(
      initialPath === "/packages" ? underlyingPathRef.current : initialPath
    );
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top);
    activePathRef.current = initialPath;
  }, [initialPath]);

  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const detail = (event as CustomEvent<PortfolioNavigateDetail>).detail;
      scrollToPath(detail.path, detail.history ?? "push");
    };
    const handlePopState = () => {
      const nextPath = window.location.pathname;
      if (
        isPortfolioPath(nextPath) &&
        nextPath !== activePathRef.current
      ) {
        scrollToPath(nextPath, "none");
      }
    };

    document.addEventListener(PORTFOLIO_NAVIGATE_EVENT, handleNavigate);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener(PORTFOLIO_NAVIGATE_EVENT, handleNavigate);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [scrollToPath]);

  useEffect(() => {
    const updateActivePanel = () => {
      frameRef.current = 0;
      if (packagesOpen) return;
      const x = Math.round(window.innerWidth / 2);
      const y = Math.round(window.innerHeight * 0.52);
      const scene = document
        .elementsFromPoint(x, y)
        .map((element) =>
          element.closest<HTMLElement>("[data-portfolio-scene]")
        )
        .find(Boolean);
      const nextPath = scene?.dataset.portfolioScene;
      if (
        nextPath &&
        isPortfolioPath(nextPath) &&
        nextPath !== activePathRef.current
      ) {
        setCurrentPath(nextPath, "replace");
      }
    };
    const requestUpdate = () => {
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(updateActivePanel);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [packagesOpen, setCurrentPath]);

  const closePackages = useCallback(() => {
    if (
      window.location.pathname === "/packages" &&
      window.history.state?.portfolioPath === "/packages"
    ) {
      window.history.back();
      return;
    }
    scrollToPath(underlyingPathRef.current, "replace");
  }, [scrollToPath]);

  return (
    <MotionConfig reducedMotion="user">
      <>
        <SmoothCursor />
        <main className="portfolio-experience relative min-h-screen overflow-x-clip bg-white text-ink">
          <SmoothScroll />
          <ScrollProgress />
          <FloatingScrollbar />
          <div className="noise" aria-hidden="true" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(PROFESSIONAL_SERVICE_SCHEMA)
            }}
          />

        <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2 pt-3 sm:px-6 sm:pt-4">
          <motion.nav
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: MOTION.duration.reveal,
              ease: EASE,
              delay: 0.08
            }}
            className={`pointer-events-auto mx-auto flex h-12 max-w-full items-center justify-center gap-[clamp(0.65rem,2.6vw,2rem)] whitespace-nowrap font-sans transition-colors duration-[320ms] ${
              navOnDark ? "text-white" : "text-black"
            }`}
            aria-label="Main navigation"
          >
            <ExperienceLink href="/" className="sr-only">
              Home
            </ExperienceLink>
            {SITE_NAV_ITEMS.map((item, index) => {
              const active = activePath === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: MOTION.duration.base,
                    ease: EASE,
                    delay: 0.18 + index * 0.035
                  }}
                >
                  <ExperienceLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="relative block text-[10px] font-normal transition-opacity duration-[240ms] hover:opacity-55 min-[390px]:text-[11px] sm:text-sm"
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="active-route-dot"
                        className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                          navOnDark ? "bg-white" : "bg-black"
                        }`}
                      />
                    )}
                  </ExperienceLink>
                </motion.div>
              );
            })}
          </motion.nav>
        </header>

        <div className="relative">
          <StackedPage path="/" tone="light" layer={1} fadeOutAt={0.72}>
            <HomeIntro />
          </StackedPage>
          <StackedPage path="/growth" tone="light" layer={2}>
            <DeferredScene path="/growth" activePath={activePath}>
              <GrowthView />
            </DeferredScene>
          </StackedPage>
          <StackedPage
            path="/projects"
            tone="light"
            layer={3}
            long
            overlapNext
          >
            <DeferredScene path="/projects" activePath={activePath}>
              <ProjectsView />
            </DeferredScene>
          </StackedPage>
          <StackedPage
            path="/services"
            tone="dark"
            layer={4}
            long
            linearExitFade
            pinAtEnd
            darkSceneBackdrop
          >
            <DeferredScene path="/services" activePath={activePath}>
              <ServicesView />
            </DeferredScene>
          </StackedPage>
          <StackedPage
            path="/process"
            tone="light"
            layer={5}
            fadeOutAt={0.8}
            darkBackdrop
            preserveSurfaceOnExit
            mobileLong
          >
            <DeferredScene path="/process" activePath={activePath}>
              <ProcessView />
            </DeferredScene>
          </StackedPage>
          <StackedPage
            path="/faq"
            tone="dark"
            layer={6}
            long
            linearExitFade
            fastEntry
            lightExitOverlay
          >
            <DeferredScene path="/faq" activePath={activePath}>
              <FaqView />
            </DeferredScene>
          </StackedPage>
          <StackedPage
            path="/contact"
            tone="dark"
            layer={7}
            long
            last
            fastEntry
          >
            <DeferredScene path="/contact" activePath={activePath}>
              <ContactView />
            </DeferredScene>
          </StackedPage>
        </div>

        <AnimatePresence>
          {packagesOpen && <PackagesOverlay onClose={closePackages} />}
        </AnimatePresence>
        </main>
      </>
    </MotionConfig>
  );
}
