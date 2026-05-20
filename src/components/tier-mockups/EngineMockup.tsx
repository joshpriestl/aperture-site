"use client";

import { motion } from "framer-motion";
import { CountUp, StatusPill, TierCard } from "./TierMockupShell";

const rhythm = ["Monitor", "Detect", "Recommend", "Action", "Report"];
const outcomes = [
  ["3 workflow alerts detected", "Detected"],
  ["2 optimisation tasks actioned", "Actioned"],
  ["Weekly summary delivered", "Delivered"],
] as const;

export function EngineMockup() {
  return (
    <div className="w-full">
      <TierCard>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">This is ongoing operating intelligence</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-5">
          {rhythm.map((step, index) => (
            <motion.div
              key={step}
              className="rounded-[10px] bg-surface p-3 text-center ring-1 ring-hairline"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.12 }}
            >
              <p className="font-mono text-[10px] text-ink-muted">0{index + 1}</p>
              <p className="mt-2 text-[11px] text-ink">{step}</p>
            </motion.div>
          ))}
        </div>
      </TierCard>

      <div className="mt-4 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="rounded-[14px] bg-ink p-5 text-card shadow-panel"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Monthly improvement summary</p>
          <p className="mt-4 text-[13px] leading-6">Pipeline response time improved. Reporting cadence stable. Capacity constraint moved to review.</p>
          <p className="mt-5 font-display text-[36px] leading-none tracking-[-0.03em]">
            +<CountUp value={18} delay={0.45} />%
          </p>
          <p className="mt-2 text-[11px] text-white/60">benchmark position improving</p>
        </motion.div>

        <div className="rounded-[14px] bg-white/84 p-5 ring-1 ring-white/80 backdrop-blur">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Operating queue</p>
          <div className="mt-3 divide-y divide-hairline">
            {outcomes.map(([item, status], index) => (
              <motion.div
                key={item}
                className="flex items-center justify-between gap-4 py-3"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.14 }}
              >
                <span className="text-[13px] leading-5 text-ink">{item}</span>
                <StatusPill from={index === 0 ? "Monitoring" : "Detected"} to={status} delay={0.5 + index * 0.2} />
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-4 h-2 rounded-full bg-[var(--en-chip-bg)]"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
