"use client";

import { motion } from "framer-motion";
import { LoadingBar, StatusPill, TierCard } from "./TierMockupShell";

const levers = [
  ["AI and Automation", "22"],
  ["Revenue and Pipeline", "31"],
  ["Data and Reporting", "42"],
] as const;

const flow = ["Priority levers selected", "Deeper assessment", "Sequenced plan", "Founder review", "Blueprint ready"];

export function BlueprintMockup() {
  return (
    <div className="w-full">
      <TierCard>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">This turns the diagnosis into a plan</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {levers.map(([lever, score], index) => (
            <motion.div
              key={lever}
              className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.14 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">Selected lever</p>
              <p className="mt-3 text-[13px] leading-5 text-ink">{lever}</p>
              <p className="mt-3 font-mono text-[10px] text-ink-muted">Audit score: {score}</p>
            </motion.div>
          ))}
        </div>
      </TierCard>

      <div className="mt-4 rounded-[14px] bg-white/84 p-5 ring-1 ring-white/80 backdrop-blur">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Blueprint workflow</p>
          <StatusPill from="Drafting" to="Founder review" delay={1.1} />
        </div>
        <div className="space-y-3">
          {flow.map((step, index) => (
            <motion.div
              key={step}
              className="grid grid-cols-[34px_1fr] items-center gap-3"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.13 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-card font-mono text-[10px] text-ink-muted ring-1 ring-hairline">
                {index + 1}
              </span>
              <div className="rounded-[10px] bg-card p-3 ring-1 ring-hairline">
                <div className="mb-2 flex justify-between gap-3 text-[12px] text-ink">
                  <span>{step}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted">complete</span>
                </div>
                <LoadingBar width="100%" delay={0.25 + index * 0.1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-4 rounded-[14px] bg-ink p-5 text-card shadow-panel"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Build proposal attached</p>
        <p className="mt-3 text-[13px] leading-6">Scope, sequence and implementation estimate ready for approval.</p>
      </motion.div>
    </div>
  );
}

