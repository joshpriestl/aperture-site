import Link from "next/link";
import { whatApertureBuilds } from "@/lib/content";

function MiniStatusCard({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-6 rounded-[14px] bg-surface p-4 ring-1 ring-hairline">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-[10px] bg-card px-3 py-2 ring-1 ring-hairline">
            <span className="h-2 w-2 rounded-full bg-ink/70" />
            <span className="text-[12px] leading-5 text-ink-soft">{item}</span>
            <span className="ml-auto font-mono text-[9px] text-ink-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhatApertureBuilds() {
  return (
    <section id="what-aperture-builds" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            {whatApertureBuilds.eyebrow}
          </p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {whatApertureBuilds.headline}
          </h2>
          <p className="mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">
            {whatApertureBuilds.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {whatApertureBuilds.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[22px] bg-card p-6 ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-0.5 sm:p-7"
            >
              <h3 className="font-display text-[28px] font-normal leading-tight tracking-[-0.018em] text-ink">
                {section.title}
              </h3>
              <p className="mt-4 max-w-[440px] text-[15px] leading-7 text-ink-soft">{section.body}</p>
              <MiniStatusCard items={section.visual} />
            </article>
          ))}
        </div>

        <Link
          href="/audit"
          className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
        >
          {whatApertureBuilds.cta} <span className="ml-2" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
