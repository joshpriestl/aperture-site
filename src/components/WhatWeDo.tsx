import { whatWeDo } from "@/lib/content";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site border-y border-hairline py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
              {whatWeDo.eyebrow}
            </p>
            <h2 className="mt-7 max-w-[620px] font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
              {whatWeDo.headline}
            </h2>
            <p className="mt-7 max-w-[520px] text-[16px] leading-7 text-ink-soft">
              {whatWeDo.body}
            </p>
          </div>

          <div className="relative grid gap-3">
            <div className="absolute left-6 top-8 hidden h-[calc(100%-64px)] w-px bg-hairline sm:block" />
            {whatWeDo.steps.map((step, index) => (
              <article
                key={step.name}
                className="relative rounded-[18px] bg-card p-5 shadow-[0_18px_50px_rgba(20,24,28,0.045)] ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-0.5 sm:grid sm:grid-cols-[80px_1fr] sm:gap-5 sm:p-6"
              >
                <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-card sm:mb-0">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink">
                    {step.name}
                  </h3>
                  <p className="mt-3 text-[16px] leading-7 text-ink-soft">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
