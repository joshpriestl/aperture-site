import Link from "next/link";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="px-5 pb-20 pt-24 sm:px-8 sm:pb-[112px] sm:pt-28">
      <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            {hero.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[780px] font-display text-[clamp(46px,6vw,86px)] font-normal leading-[1.03] tracking-[-0.022em] text-ink">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-[560px] text-[17px] leading-8 text-ink-soft">
            {hero.subhead}
          </p>
          <Link
            href="/audit"
            className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
          >
            {hero.cta} <span className="ml-2" aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="rounded-[28px] bg-gradient-to-br from-[var(--audit-bg-b)] via-surface to-[var(--bp-bg-b)] p-5 shadow-panel ring-1 ring-hairline">
          <div className="rounded-[20px] bg-card p-5 ring-1 ring-hairline">
            <div className="mb-6 flex items-center gap-2 border-b border-hairline pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#df6f68]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#c99a36]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#6f9b73]" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Operating view
              </span>
            </div>
            <div className="space-y-3">
              {["Bottlenecks identified", "Plan sequenced", "Systems installed"].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-[14px] bg-surface px-4 py-4 ring-1 ring-hairline"
                >
                  <span className="text-[14px] text-ink">{item}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
