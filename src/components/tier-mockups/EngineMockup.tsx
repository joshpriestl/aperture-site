"use client";

import { motion } from "framer-motion";
import { CountUp, StatusPill, TierCard } from "./TierMockupShell";

const tasks = ["Follow-up gap detected", "Proposal lag flagged", "Capacity constraint reviewed"];

export function EngineMockup() {
  return (
    <div className="w-full">
      <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
        <TierCard>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Monthly rhythm</p>
          <p className="mt-5 font-display text-[30px] leading-tight tracking-[-0.02em] text-ink">Weekly reports, alerts and optimisation queue.</p>
          <motion.div
            className="mt-6 rounded-[12px] bg-ink p-4 text-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Weekly summary</p>
            <p className="mt-3 text-[12px] leading-5">Pipeline velocity improved. Delivery capacity requires action.</p>
          </motion.div>
        </TierCard>

        <TierCard>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Benchmark comparison</p>
          <p className="mt-5 font-display text-[48px] leading-none tracking-[-0.03em] text-ink">
            +<CountUp value={18} delay={0.35} />%
          </p>
          <p className="mt-3 text-[13px] leading-6 text-ink-soft">Above comparable firms on operating cadence.</p>
          <motion.div
            className="mt-5 h-2 rounded-full bg-[var(--en-chip-bg)]"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </TierCard>
      </div>

      <div className="mt-4 rounded-[14px] bg-white/82 p-5 ring-1 ring-white/80 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Optimisation queue</p>
        <div className="mt-3 divide-y divide-hairline">
          {tasks.map((task, index) => (
            <motion.div
              key={task}
              className="flex items-center justify-between gap-4 py-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.16 }}
            >
              <span className="text-[13px] text-ink">{task}</span>
              <StatusPill from="Detected" to="Actioned" delay={0.55 + index * 0.22} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

