import { auditJourney } from "@/lib/content";

export function AuditJourney() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site rounded-[22px] bg-card p-6 ring-1 ring-hairline sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">{auditJourney.eyebrow}</p>
            <h2 className="mt-7 font-display text-[clamp(34px,4vw,56px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
              {auditJourney.headline}
            </h2>
            <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-ink-soft">{auditJourney.body}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {auditJourney.steps.map((step, index) => (
              <article key={step.label} className="relative rounded-[14px] bg-surface p-5 ring-1 ring-hairline">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">0{index + 1}</p>
                <h3 className="mt-10 font-display text-[26px] font-normal tracking-[-0.018em] text-ink">{step.label}</h3>
                <p className="mt-3 text-[13px] leading-6 text-ink-soft">{step.detail}</p>
                {index < auditJourney.steps.length - 1 ? (
                  <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-hairline md:block" />
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
