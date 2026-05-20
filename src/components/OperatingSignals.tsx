import { operatingSignals } from "@/lib/content";

export function OperatingSignals() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">{operatingSignals.eyebrow}</p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {operatingSignals.headline}
          </h2>
          <p className="mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">{operatingSignals.body}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {operatingSignals.items.map((item, index) => (
            <article key={item} className="min-h-[150px] rounded-[16px] bg-card p-5 ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-1">
              <p className="font-mono text-[11px] text-ink-muted">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-8 text-[15px] leading-6 text-ink">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
