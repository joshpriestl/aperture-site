import Link from "next/link";
import { whatApertureBuilds } from "@/lib/content";

const cardAccent = [
  "bg-[var(--audit-chip-bg)] text-[var(--audit-chip-tx)]",
  "bg-[var(--bp-chip-bg)] text-[var(--bp-chip-tx)]",
  "bg-[var(--bd-chip-bg)] text-[var(--bd-chip-tx)]",
  "bg-[var(--en-chip-bg)] text-[var(--en-chip-tx)]",
];

function LeadFlowVisual({ flow }: { flow: readonly string[] }) {
  return (
    <div className="space-y-2">
      {flow.map((item, index) => (
        <div key={item} className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-[10px] text-ink-muted ring-1 ring-hairline">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 rounded-[10px] bg-surface px-3 py-2 text-[12px] leading-5 text-ink ring-1 ring-hairline">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

function MetricsVisual({
  metrics,
}: {
  metrics: readonly { label: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-[10px] bg-surface p-3 ring-1 ring-hairline">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">{metric.label}</p>
          <p className="mt-4 font-display text-[26px] leading-none tracking-[-0.02em] text-ink">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}

function AgentQueueVisual({
  agents,
}: {
  agents: readonly { label: string; status: string }[];
}) {
  return (
    <div className="space-y-2">
      {agents.map((agent) => (
        <div key={agent.label} className="flex items-center justify-between gap-3 border-b border-hairline py-2 last:border-0">
          <span className="text-[12px] leading-5 text-ink">{agent.label}</span>
          <span className="shrink-0 rounded-full bg-surface px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted ring-1 ring-hairline">
            {agent.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function SummaryVisual({ summary }: { summary: readonly string[] }) {
  return (
    <div className="space-y-3">
      <div className="rounded-[10px] bg-ink p-4 text-card">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Founder summary</p>
        <p className="mt-3 text-[13px] leading-6">Weekly operating review prepared from pipeline, delivery and follow-up data.</p>
      </div>
      {summary.map((item) => (
        <div key={item} className="rounded-[10px] bg-surface px-3 py-2 text-[12px] leading-5 text-ink-soft ring-1 ring-hairline">
          {item}
        </div>
      ))}
    </div>
  );
}

function BuildVisual({
  section,
  index,
}: {
  section: (typeof whatApertureBuilds.sections)[number];
  index: number;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-card ring-1 ring-hairline">
      <div className="flex h-8 items-center gap-2 border-b border-hairline bg-surface px-4">
        <span className="h-2 w-2 rounded-full bg-[#e76f61]" />
        <span className="h-2 w-2 rounded-full bg-[#d6a23a]" />
        <span className="h-2 w-2 rounded-full bg-[#6b9f75]" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">{section.visualTitle}</span>
      </div>
      <div className="p-4">
        {"flow" in section ? <LeadFlowVisual flow={section.flow} /> : null}
        {"metrics" in section ? <MetricsVisual metrics={section.metrics} /> : null}
        {"agents" in section ? <AgentQueueVisual agents={section.agents} /> : null}
        {"summary" in section ? <SummaryVisual summary={section.summary} /> : null}
      </div>
      <div className={`h-1 ${cardAccent[index]}`} />
    </div>
  );
}

export function WhatApertureBuilds() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="what-aperture-builds">
      <div className="mx-auto max-w-site">
        <div className="grid gap-10 border-y border-hairline py-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-16">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
              {whatApertureBuilds.eyebrow}
            </p>
            <h2
              id="what-aperture-builds"
              className="mt-7 max-w-[560px] font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink"
            >
              {whatApertureBuilds.headline}
            </h2>
            <p className="mt-7 max-w-[520px] text-[17px] leading-8 text-ink">{whatApertureBuilds.intro}</p>
            <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-ink-soft">{whatApertureBuilds.subcopy}</p>
            <Link
              href="/audit"
              className="mt-9 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
            >
              {whatApertureBuilds.cta} ↗
            </Link>
          </div>
          <div className="grid gap-5">
            {whatApertureBuilds.sections.map((section, index) => (
              <article key={section.title} className="grid gap-5 rounded-[22px] bg-card p-5 ring-1 ring-hairline lg:grid-cols-[1fr_0.95fr] lg:p-6">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className={`w-fit rounded-md px-3 py-2 font-mono text-[11px] font-medium tracking-[0.12em] ${cardAccent[index]}`}>
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-6 font-display text-[clamp(24px,2.4vw,34px)] font-normal leading-[1.1] tracking-[-0.02em] text-ink">
                      {section.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-ink-soft">{section.body}</p>
                  </div>
                  <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                    {section.outputs.map((output) => (
                      <li key={output} className="border-t border-hairline pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
                <BuildVisual section={section} index={index} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
