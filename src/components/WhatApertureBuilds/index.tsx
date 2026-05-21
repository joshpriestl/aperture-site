"use client";

import { useState } from "react";
import Link from "next/link";
import { whatApertureBuilds } from "@/lib/content";

const visualTone = [
  "from-[var(--audit-bg-a)] via-[var(--audit-bg-b)] to-[var(--surface)]",
  "from-[var(--bp-bg-a)] via-[var(--bp-bg-b)] to-[var(--surface)]",
  "from-[var(--bd-bg-a)] via-[var(--bd-bg-b)] to-[var(--surface)]",
  "from-[var(--en-bg-a)] via-[var(--en-bg-b)] to-[var(--surface)]",
];

const chipTone = [
  "bg-[var(--audit-chip-bg)] text-[var(--audit-chip-tx)]",
  "bg-[var(--bp-chip-bg)] text-[var(--bp-chip-tx)]",
  "bg-[var(--bd-chip-bg)] text-[var(--bd-chip-tx)]",
  "bg-[var(--en-chip-bg)] text-[var(--en-chip-tx)]",
];

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-card shadow-panel ring-1 ring-hairline">
      {children}
    </div>
  );
}

function LeadSystemVisual() {
  const nodes = ["New enquiry", "AI qualification", "CRM update", "Slack alert", "Follow-up"];

  return (
    <VisualFrame>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Inbound enquiry</p>
          <p className="mt-3 text-[13px] leading-6 text-ink">
            Scaling advisory firm, 32 staff. Wants delivery capacity and pipeline visibility fixed this quarter.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-5">
          {nodes.map((node, index) => (
            <div key={node} className="rounded-[10px] bg-card p-3 text-center ring-1 ring-hairline">
              <p className="font-mono text-[10px] text-ink-muted">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-[11px] leading-4 text-ink">{node}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_0.74fr]">
          <div className="rounded-[12px] bg-card p-4 ring-1 ring-hairline">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Qualification summary</p>
            <ul className="mt-3 space-y-2 text-[12px] leading-5 text-ink-soft">
              <li>Budget signal: active</li>
              <li>Operational pain: delivery bottlenecks</li>
              <li>Recommended next step: Audit invite</li>
            </ul>
          </div>
          <div className="rounded-[12px] bg-ink p-4 text-card">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Slack alert</p>
            <p className="mt-3 text-[12px] leading-5">High-fit enquiry routed to founder. Follow-up sequence scheduled.</p>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

function DashboardVisual() {
  const metrics = [
    { label: "Pipeline value", value: "$428k" },
    { label: "Proposal conversion", value: "38%" },
    { label: "Delivery capacity", value: "72%" },
    { label: "Overdue follow-ups", value: "9" },
  ];

  return (
    <VisualFrame>
      <div className="p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">{metric.label}</p>
              <p className="mt-5 font-display text-[28px] leading-none tracking-[-0.02em] text-ink">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[12px] bg-card p-4 ring-1 ring-hairline">
            <div className="flex h-40 items-end gap-2 border-b border-l border-hairline px-2 pb-2">
              {[32, 48, 42, 64, 58, 76, 86].map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="flex-1 rounded-t-sm bg-[var(--audit-chip-bg)]"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Lead source performance</p>
          </div>
          <div className="rounded-[12px] bg-ink p-4 text-card">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Weekly summary</p>
            <p className="mt-4 text-[13px] leading-6">
              Proposal velocity improved. Delivery capacity is now the constraint. Follow-ups older than seven days need review.
            </p>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

function AgentVisual() {
  const agents = [
    ["Lead qualification agent", "running"],
    ["Proposal drafting agent", "draft ready"],
    ["Weekly reporting agent", "scheduled"],
    ["Client intake agent", "in review"],
    ["Knowledge retrieval agent", "indexed"],
  ];

  return (
    <VisualFrame>
      <div className="grid gap-4 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:p-6">
        <div className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Workflow</p>
          <div className="mt-5 space-y-3">
            {["Trigger", "Read context", "Draft output", "Route for approval"].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--bd-chip-tx)]" />
                <span className="text-[12px] text-ink-soft">{step}</span>
                <span className="ml-auto font-mono text-[10px] text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[12px] bg-card p-4 ring-1 ring-hairline">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Active agents</p>
          <div className="mt-3 divide-y divide-hairline">
            {agents.map(([agent, status]) => (
              <div key={agent} className="flex items-center justify-between gap-4 py-3">
                <p className="text-[13px] text-ink">{agent}</p>
                <span className="rounded-full bg-surface px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted ring-1 ring-hairline">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

function CadenceVisual() {
  const items = ["Weekly scorecard prepared", "Founder summary posted", "Exceptions flagged", "Monday review queued"];

  return (
    <VisualFrame>
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_0.95fr] sm:p-6">
        <div className="rounded-[12px] bg-ink p-5 text-card">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Monday operator note</p>
          <p className="mt-5 font-display text-[26px] leading-tight tracking-[-0.02em]">
            Pipeline is up. Delivery capacity is the constraint. Three overdue follow-ups need founder action.
          </p>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item} className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline">
              <p className="font-mono text-[10px] text-ink-muted">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-[13px] leading-5 text-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

function ActiveVisual({ index }: { index: number }) {
  if (index === 0) return <LeadSystemVisual />;
  if (index === 1) return <DashboardVisual />;
  if (index === 2) return <AgentVisual />;
  return <CadenceVisual />;
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
          <p className="mx-auto mt-7 max-w-[590px] text-[16px] leading-7 text-ink-soft">{whatApertureBuilds.intro}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {whatApertureBuilds.sections.map((section, index) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer rounded-md px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-150 ${
                activeIndex === index ? "bg-card text-ink shadow-[0_10px_26px_rgba(20,24,28,0.08)] ring-1 ring-hairline" : "text-ink-muted hover:bg-surface hover:text-ink"
              }`}
              aria-pressed={activeIndex === index}
            >
              {section.shortLabel}
            </button>
          ))}
        </div>

        <div className={`mt-7 overflow-hidden rounded-[22px] bg-gradient-to-br p-5 shadow-panel transition-transform duration-150 hover:-translate-y-1 sm:p-10 ${visualTone[activeIndex]}`}>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
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
        </div>

        <div className="mx-auto mt-8 grid max-w-[860px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {active.outputs.map((output) => (
            <div key={output} className="rounded-[12px] bg-card px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted ring-1 ring-hairline">
              {output}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/start"
            className="inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
          >
            {whatApertureBuilds.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
