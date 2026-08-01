import { ArrowUpRight, Check } from "lucide-react";
import { CONTACT, PACKAGES } from "@/features/portfolio/data";
import { SectionLabel } from "@/features/portfolio/page-primitives";
import { LeadLink } from "@/components/lead-link";

export function PackagesView() {
  return (
    <div className="min-h-[100svh] bg-transparent pt-20 md:pt-4">
      <section className="px-4 pb-12 pt-3 sm:px-6 md:px-8 md:pb-5 md:pt-0 lg:px-12 lg:pb-7 lg:pt-0">
        <div className="mx-auto grid max-w-7xl gap-10 md:gap-2 lg:gap-3">
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

          <div className="grid gap-6 md:min-h-0 md:grid-cols-3 md:grid-rows-1 md:gap-3 lg:gap-5">
            {PACKAGES.map((item, index) => {
              const featured = index === 1;
              const planLabel = ["Essential", "Most selected", "Commerce"][index];

              return (
                <article
                  key={item.title}
                  data-focus-target
                  className={`group relative flex min-h-[31rem] min-w-0 flex-col overflow-hidden rounded-[2rem] border p-6 shadow-[0_18px_45px_rgba(10,10,10,0.05)] transition-transform duration-300 hover:-translate-y-1 md:min-h-[34rem] md:rounded-card md:p-4 lg:p-5 ${
                    featured
                      ? "on-dark border-ink bg-ink text-white shadow-lift"
                      : "border-ink/10 bg-[#faf9f6] text-ink hover:border-ink/25"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute -right-12 -top-12 h-36 w-36 rounded-full border md:h-28 md:w-28 lg:h-36 lg:w-36 ${
                      featured
                        ? "border-white/15 bg-white/[0.06]"
                        : "border-ink/10 bg-white"
                    }`}
                  />
                  <div className="relative flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                        featured
                          ? "border-white/20 bg-white/[0.08] text-white/75"
                          : "border-ink/15 bg-white text-ink/65"
                      }`}
                    >
                      0{index + 1} · {planLabel}
                    </span>
                    {featured ? (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                        Popular
                      </span>
                    ) : null}
                  </div>

                  <div className="relative mt-7 md:mt-4 lg:mt-5">
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        featured ? "text-white/55" : "text-ink/45"
                      }`}
                    >
                      Built for your next step
                    </p>
                    <h2 className="mt-3 break-words font-sans text-[2.45rem] font-light not-italic leading-[0.92] tracking-[-0.045em] md:text-3xl lg:text-[2.7rem]">
                      {item.title}
                    </h2>
                    <p
                      className={`mt-5 min-h-[3.5rem] text-[15px] leading-7 md:mt-3 md:min-h-[2.5rem] md:text-xs md:leading-5 lg:min-h-[3rem] lg:text-sm ${
                        featured ? "text-white/60" : "text-ink/60"
                      }`}
                    >
                      {item.bestFor}
                    </p>
                  </div>

                  <div
                    className={`relative my-6 border-t md:my-3 lg:my-4 ${
                      featured ? "border-white/15" : "border-ink/10"
                    }`}
                  />

                  <div className="relative">
                    <p
                        className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] md:mb-2 lg:mb-3 ${
                        featured ? "text-white/55" : "text-ink/45"
                      }`}
                    >
                      Included
                    </p>
                    <ul className="grid gap-y-3 md:gap-y-2 lg:gap-y-3">
                      {item.includes.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-center gap-3 text-[14px] font-medium leading-5 md:gap-2 md:text-[11px] md:leading-4 lg:gap-3 lg:text-sm ${
                            featured ? "text-white/85" : "text-ink/75"
                          }`}
                        >
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full md:h-4 md:w-4 lg:h-5 lg:w-5 ${
                              featured ? "bg-white/10" : "bg-ink/[0.06]"
                            }`}
                          >
                            <Check
                              className={`h-3 w-3 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3 ${
                                featured ? "text-white" : "text-ink"
                              }`}
                            />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <LeadLink
                    href={CONTACT.whatsapp}
                    leadSource="whatsapp"
                    target="_blank"
                    rel="noreferrer"
                      className={`relative mt-auto flex items-center justify-between rounded-2xl border px-4 py-4 text-sm font-semibold transition-colors duration-[320ms] md:mt-3 md:rounded-lg md:px-3 md:py-2 md:text-xs lg:mt-4 lg:rounded-xl lg:px-4 lg:py-2.5 lg:text-sm ${
                      featured
                        ? "border-white/15 bg-white/[0.06] text-white hover:bg-white hover:text-ink"
                        : "border-ink bg-ink text-white hover:bg-ink/80"
                    }`}
                  >
                    <span>Discuss this package</span>
                    <ArrowUpRight className="h-4 w-4 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
                  </LeadLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
