"use client";

import { useState } from "react";
import Link from "next/link";
import { AgentWorkflowMockup, FounderDashboardMockup, LeadSystemMockup } from "@/components/product-mockups";
import { whatApertureBuilds } from "@/lib/content";

const chipTone = [
  "bg-[var(--audit-chip-bg)] text-[var(--audit-chip-tx)]",
  "bg-[var(--bp-chip-bg)] text-[var(--bp-chip-tx)]",
  "bg-[var(--bd-chip-bg)] text-[var(--bd-chip-tx)]",
  "bg-[var(--en-chip-bg)] text-[var(--en-chip-tx)]",
];

function ActiveVisual({ index }: { index: number }) {
  if (index === 0) return <LeadSystemMockup />;
  if (index === 1) return <FounderDashboardMockup />;
  if (index === 2) return <AgentWorkflowMockup />;
  return <FounderDashboardMockup />;
}

export function WhatApertureBuilds() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = whatApertureBuilds.sections[activeIndex];

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="what-aperture-builds">
      <div className="mx-auto max-w-site border-y border-hairline py-14 sm:py-20">
        <div className="mx-auto max-w-[780px] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            {whatApertureBuilds.eyebrow}
          </p>
          <h2
            id="what-aperture-builds"
            className="mt-7 font-display text-[clamp(42px,5.6vw,76px)] font-normal leading-[1.02] tracking-[-0.024em] text-ink"
          >
            {whatApertureBuilds.headline}
          </h2>
          <p className="mx-auto mt-7 max-w-[590px] text-[16px] leading-7 text-ink-soft">
            {whatApertureBuilds.intro}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {whatApertureBuilds.sections.map((section, index) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer rounded-md px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-150 ${
                activeIndex === index
                  ? "bg-card text-ink shadow-[0_10px_26px_rgba(20,24,28,0.08)] ring-1 ring-hairline"
                  : "text-ink-muted hover:bg-surface hover:text-ink"
              }`}
              aria-pressed={activeIndex === index}
            >
              {section.shortLabel}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-8 rounded-[22px] bg-card p-5 shadow-panel ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-1 sm:p-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
          <div className="flex min-h-[260px] flex-col justify-between">
            <div>
              <p className={`w-fit rounded-md px-3 py-2 font-mono text-[12px] font-medium tracking-[0.12em] ${chipTone[activeIndex]}`}>
                {active.shortLabel}
              </p>
              <h3 className="mt-8 max-w-[420px] font-display text-[clamp(30px,3.2vw,48px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
                {active.title}
              </h3>
            </div>
            <p className="mt-8 max-w-[420px] text-[15px] leading-7 text-ink-soft">{active.body}</p>
          </div>
          <ActiveVisual index={activeIndex} />
        </div>

        <div className="mx-auto mt-8 grid max-w-[860px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {active.outputs.map((output) => (
            <div
              key={output}
              className="rounded-[12px] bg-card px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted ring-1 ring-hairline"
            >
              {output}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/audit"
            className="inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
          >
            {whatApertureBuilds.cta} ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
