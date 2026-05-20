import { benchmarkIntelligence } from "@/lib/content";

export function BenchmarkIntelligence() {
  return (
    <section className="bg-surface px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-site gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">{benchmarkIntelligence.eyebrow}</p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {benchmarkIntelligence.headline}
          </h2>
        </div>
        <div className="rounded-[22px] bg-card p-8 ring-1 ring-hairline sm:p-12">
          <p className="max-w-[720px] font-display text-[clamp(24px,2.6vw,36px)] font-normal leading-[1.2] tracking-[-0.018em] text-ink">
            {benchmarkIntelligence.body}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {["bottlenecks", "workflow patterns", "transformation opportunities"].map((item) => (
              <div key={item} className="rounded-[12px] bg-surface px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted ring-1 ring-hairline">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
