import { ArrowUpRight, Mail } from "lucide-react";
import { Magnetic, Reveal } from "@/components/motion";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon
} from "@/components/icons";
import { CONTACT } from "@/features/portfolio/data";
import { LeadLink } from "@/components/lead-link";

export function ContactView() {
  const socialLinks = [
    {
      label: "WhatsApp",
      href: CONTACT.whatsapp,
      leadSource: "whatsapp" as const,
      icon: <WhatsAppIcon />
    },
    {
      label: "Instagram",
      href: CONTACT.instagram,
      icon: <InstagramIcon />
    },
    {
      label: "LinkedIn",
      href: CONTACT.linkedin,
      icon: <LinkedInIcon />
    },
    {
      label: "GitHub",
      href: CONTACT.github,
      icon: <GitHubIcon />
    },
    {
      label: "Email",
      href: `mailto:${CONTACT.email}`,
      leadSource: "email" as const,
      icon: <Mail className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex min-h-[100svh] flex-col bg-black pt-20 text-white sm:pt-24">
      <section className="flex flex-1 items-center px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto w-full max-w-7xl text-center">
          <Reveal y={18} blur={2}>
            <p className="font-jetbrains text-[10px] font-semibold uppercase tracking-[0.34em] text-white/60 sm:text-xs">
              Get in touch
            </p>
          </Reveal>

          <Reveal delay={0.08} y={28} blur={3}>
            <h1 className="mt-8 font-sans text-[clamp(3.5rem,13vw,6rem)] font-extrabold leading-[0.9] tracking-normal text-white md:text-8xl lg:text-9xl">
              <span className="block">Ready to</span>
              <span className="block text-white/50">grow your</span>
              <span className="block">business?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} y={20} blur={2}>
            <p className="mx-auto mt-9 max-w-3xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              I work with small businesses across the USA and Europe. Whether
              you need a full-stack web application, technical SEO, web
              performance optimization or a growth-focused website, let&apos;s
              talk.
            </p>
          </Reveal>

          <Reveal delay={0.24} y={18} blur={2}>
            <LeadLink
              href={`mailto:${CONTACT.email}?subject=Business%20growth%20project%20with%20Bilal`}
              leadSource="email"
              className="group mt-10 inline-flex max-w-full items-center gap-3 break-all font-sans text-xl font-extrabold tracking-normal text-white transition-colors duration-[320ms] hover:text-white/70 sm:text-4xl"
            >
              {CONTACT.email}
              <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-[320ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-8 sm:w-8" />
            </LeadLink>
          </Reveal>

          <Reveal delay={0.32} y={18} blur={2}>
            <Magnetic>
              <LeadLink
                href={CONTACT.whatsapp}
                leadSource="whatsapp"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-white px-8 text-xs font-bold uppercase tracking-[0.2em] text-black transition-transform duration-[320ms] hover:scale-[1.015] sm:px-10"
              >
                <WhatsAppIcon />
                Message on WhatsApp
              </LeadLink>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.4} y={14} blur={1}>
            <div className="mt-12 flex items-center justify-center gap-3">
              {socialLinks.map((item) => {
                const external = item.href.startsWith("http");
                if (item.leadSource) {
                  return (
                    <LeadLink
                      key={item.label}
                      href={item.href}
                      leadSource={item.leadSource}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      aria-label={item.label}
                      title={item.label}
                      className="group grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/55 transition-colors duration-[320ms] hover:border-white/50 hover:bg-white hover:text-black sm:h-14 sm:w-14"
                    >
                      {item.icon}
                    </LeadLink>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={item.label}
                    title={item.label}
                    className="group grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/55 transition-colors duration-[320ms] hover:border-white/50 hover:bg-white hover:text-black sm:h-14 sm:w-14"
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-5 text-[10px] uppercase tracking-[0.18em] text-white/60 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p>© 2026 Bilal Asif</p>
          <p className="text-right">Full-Stack Developer and SEO Specialist</p>
        </div>
      </footer>
    </div>
  );
}
