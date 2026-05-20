const modules = [
  {
    title: "AUDIT",
    body: "Find operational bottlenecks",
  },
  {
    title: "BLUEPRINT",
    body: "Generate a sequenced plan",
  },
  {
    title: "BUILD",
    body: "Install systems and workflows",
  },
  {
    title: "ENGINE",
    body: "Monitor and optimise continuously",
  },
] as const;

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            WHAT WE DO
          </p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            Audit, sequence, build and operate.
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">
            Aperture moves from diagnosis to installed operating rhythm in four clear stages.
          </p>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-[1080px] gap-4 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-1/2 hidden h-px bg-hairline lg:block" />
          {modules.map((module, index) => (
            <article
              key={module.title}
              className="relative rounded-[28px] bg-card p-7 text-ink shadow-[0_18px_48px_rgba(20,24,28,0.06)] ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-1"
            >
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-ink">{module.title}</p>
              <p className="mt-8 min-h-[72px] font-display text-[clamp(25px,2.4vw,34px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
                {module.body}
              </p>
              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] text-ink-muted">0{index + 1}</span>
                <span className="h-2 w-2 rounded-full bg-ink" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
