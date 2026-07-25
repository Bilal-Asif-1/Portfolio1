import { Reveal } from "@/components/motion";
import { APPROACH_STEPS } from "@/features/portfolio/data";
import { SectionLabel } from "@/features/portfolio/page-primitives";

export function ProcessView() {
  return (
    <div className="min-h-[100svh] overflow-visible rounded-t-[28px] bg-white pt-20 shadow-[0_-18px_48px_rgba(0,0,0,0.16)] sm:rounded-t-[36px] sm:pt-24 lg:h-[100svh] lg:overflow-hidden">
      <section className="flex min-h-[100svh] items-start px-5 pb-24 pt-4 sm:px-8 sm:pb-28 sm:pt-7 lg:h-full lg:min-h-0 lg:items-center lg:px-12 lg:py-8">
        <div className="mx-auto grid w-full max-w-7xl gap-20 sm:gap-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal y={24} blur={3}>
              <SectionLabel>The Approach</SectionLabel>
              <h1 className="mt-7 max-w-xl font-sans text-[clamp(3.7rem,18vw,5rem)] font-semibold leading-[0.82] tracking-normal text-ink sm:mt-8 sm:text-7xl lg:mt-5 lg:text-[clamp(4.5rem,8vw,6.5rem)] lg:leading-[0.84]">
                How I
                <span className="block">drive</span>
                <span className="block">growth</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12} y={18} blur={2}>
              <p className="mt-8 max-w-lg text-[15px] leading-7 text-ink/60 sm:mt-9 sm:text-base sm:leading-8 lg:mt-5 lg:text-lg lg:leading-7">
                A proven process that turns marketing from a cost centre into
                your most reliable growth engine.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-y-14 sm:gap-y-16 lg:gap-y-0 lg:pt-1">
            {APPROACH_STEPS.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 0.08}
                y={20}
                blur={2}
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-4 sm:grid-cols-[3rem_1fr] sm:gap-5 lg:grid-cols-[2.5rem_1fr] lg:gap-6 lg:border-t lg:border-ink/10 lg:py-5">
                  <span className="pt-1 text-sm font-medium tabular-nums text-ink/30 sm:text-base">
                    0{index + 1}
                  </span>
                  <div>
                    <h2 className="font-sans text-2xl font-bold leading-tight tracking-normal text-ink sm:text-3xl lg:text-3xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-7 text-ink/60 sm:mt-5 sm:text-base sm:leading-8 lg:mt-2 lg:leading-7">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
