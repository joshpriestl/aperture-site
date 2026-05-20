"use client";

import { motion } from "framer-motion";
import { MockupShell, ProgressBar } from "./MockupShell";

const states = [
  ["Pipeline review", "12 active opportunities", "Current"],
  ["Follow-up queue", "9 overdue actions", "Attention"],
  ["Proposal cadence", "3 drafts awaiting review", "Review"],
  ["Delivery capacity", "Strategy team near limit", "Watch"],
] as const;

const sequence = ["Capture", "Review", "Assign", "Follow up", "Report"];

export function FounderDashboardMockup() {
  return (
    <MockupShell tone="blueprint">
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[14px] bg-card p-5 ring-1 ring-hairline">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Founder operating board</p>
          <div className="mt-4 space-y-3">
            {states.map(([label, detail, status], index) => (
              <motion.div
                key={label}
                className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: index * 0.12 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] text-ink">{label}</p>
                    <p className="mt-1 text-[11px] leading-5 text-ink-soft">{detail}</p>
                  </div>
                  <span className="rounded-full bg-card px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted ring-1 ring-hairline">
                    {status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] bg-white/88 p-5 ring-1 ring-white/80 backdrop-blur">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Operating route</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-5">
            {sequence.map((step, index) => (
              <motion.div
                key={step}
                className="rounded-[10px] bg-surface p-3 text-center ring-1 ring-hairline"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <p className="font-mono text-[10px] text-ink-muted">0{index + 1}</p>
                <p className="mt-2 text-[11px] text-ink">{step}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 rounded-[12px] bg-ink p-4 text-card">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Weekly summary</p>
            <p className="mt-3 text-[12px] leading-5">Three overdue follow-ups and one delivery constraint moved into the review cadence.</p>
            <div className="mt-4">
              <ProgressBar delay={0.45} width="100%" />
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

