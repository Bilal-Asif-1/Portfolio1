import { Check } from "lucide-react";
import { CONTACT, PACKAGES } from "@/features/portfolio/data";
import { SectionLabel } from "@/features/portfolio/page-primitives";
import { Reveal } from "@/components/motion";
import { LeadLink } from "@/components/lead-link";

export function PackagesView() {
  return (
    <div className="min-h-[100svh] overflow-visible bg-transparent pt-20 md:h-[100svh] md:overflow-hidden md:pt-24">
      <section className="px-4 pb-12 pt-3 sm:px-6 md:h-full md:min-h-0 md:px-8 md:py-5 lg:px-12 lg:py-7">
        <div className="mx-auto grid max-w-7xl gap-10 md:h-full md:min-h-0 md:grid-rows-[auto_minmax(0,1fr)] md:gap-0">
          <Reveal y={22} blur={2}>
            <div className="max-w-4xl md:pb-5">
              <SectionLabel>Packages</SectionLabel>
              <h1 className="mt-8 max-w-xl font-sans text-[clamp(1.6rem,8vw,2rem)] font-light not-italic leading-[1.08] tracking-normal text-ink md:mt-3 md:max-w-4xl md:text-5xl lg:text-6xl">
                No fixed prices. Just the right package for your next stage.
              </h1>
              <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-ink/60 md:block lg:text-base lg:leading-7">
                Each package is shaped around your goals, timeline and current
                business stage, so you only pay for work that moves the project
                forward.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:min-h-0 md:grid-cols-3 md:grid-rows-1 md:gap-3 lg:gap-5">
            {PACKAGES.map((item, index) => {
              const featured = index === 1;
              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.08}
                  y={22}
                  blur={2}
                  className="h-full"
                >
                  <article
                    className={`flex h-full min-h-0 min-w-0 flex-col rounded-[2rem] border p-6 md:rounded-card md:p-4 lg:p-6 ${
                      featured
                        ? "on-dark border-ink bg-ink text-white shadow-lift"
                        : "border-ink/10 bg-white text-ink"
                    }`}
                  >
                    <p
                      className={`hidden text-[10px] font-semibold uppercase tracking-[0.2em] md:block ${
                        featured ? "text-white/60" : "text-ink/60"
                      }`}
                    >
                      0{index + 1}
                    </p>
                    <h2 className="break-words font-sans text-[2rem] font-light not-italic leading-none tracking-normal md:mt-2 md:text-2xl lg:mt-3 lg:text-3xl">
                      {item.title}
                    </h2>
                    <p
                      className={`mt-5 text-[15px] leading-7 md:mt-2 md:text-xs md:leading-5 lg:text-sm ${
                        featured ? "text-white/60" : "text-ink/60"
                      }`}
                    >
                      {item.bestFor}
                    </p>
                    <LeadLink
                      href={CONTACT.whatsapp}
                      leadSource="whatsapp"
                      target="_blank"
                      rel="noreferrer"
                      className={`my-7 block rounded-2xl border px-4 py-4 text-center text-sm font-semibold transition-colors duration-[320ms] md:my-3 md:rounded-lg md:px-3 md:py-2 md:text-xs lg:rounded-xl lg:px-4 lg:py-2.5 lg:text-sm ${
                        featured
                          ? "border-white/15 bg-white/[0.06] text-white hover:bg-white hover:text-ink"
                          : "border-ink/10 bg-ink/[0.03] text-ink hover:bg-ink hover:text-white"
                      }`}
                    >
                      Contact for a custom package
                    </LeadLink>
                    <ul className="mt-auto grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-3 md:gap-y-2 lg:gap-x-4">
                      {item.includes.map((feature) => (
                        <li
                          key={feature}
                          className={`flex gap-4 text-[15px] font-medium leading-5 md:gap-2 md:text-[11px] md:leading-4 lg:gap-3 lg:text-sm ${
                            featured ? "text-white/85" : "text-ink/75"
                          }`}
                        >
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 md:mt-px md:h-3 md:w-3 lg:mt-0.5 lg:h-4 lg:w-4 ${
                              featured ? "text-white/60" : "text-ink/60"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
