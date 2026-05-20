import Link from "next/link";
import { whatApertureBuilds } from "@/lib/content";

const examples = [
  {
    title: "Lead routing workflow",
    body: "New lead, qualification, CRM update, Slack alert and follow-up sequence.",
    status: "Live route",
  },
  {
    title: "Founder operating view",
    body: "Pipeline, follow-ups, proposal cadence and weekly operating summary.",
    status: "Review ready",
  },
  {
    title: "AI intake agent",
    body: "Client context captured, summarised and routed before handoff.",
    status: "In workflow",
  },
  {
    title: "Weekly operating summary",
    body: "Alerts, actions, review queue and next cadence in one note.",
    status: "Delivered",
  },
] as const;

export function WhatApertureBuilds() {
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

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {examples.map((example) => (
            <article
              key={example.title}
              className="rounded-[20px] bg-card p-6 ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">{example.status}</p>
                <span className="h-2 w-2 rounded-full bg-ink" />
              </div>
              <h3 className="mt-8 font-display text-[28px] font-normal leading-tight tracking-[-0.02em] text-ink">
                {example.title}
              </h3>
              <p className="mt-4 text-[14px] leading-6 text-ink-soft">{example.body}</p>
              <div className="mt-7 rounded-[12px] bg-surface p-3 ring-1 ring-hairline">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-ink" />
                  <span className="h-px flex-1 bg-hairline" />
                  <span className="h-2 w-2 rounded-full bg-ink" />
                  <span className="h-px flex-1 bg-hairline" />
                  <span className="h-2 w-2 rounded-full bg-ink" />
                </div>
              </div>
            </article>
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
