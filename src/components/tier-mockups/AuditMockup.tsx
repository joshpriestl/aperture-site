"use client";

import { motion } from "framer-motion";
import { CountUp, LoadingBar, TierCard } from "./TierMockupShell";

const areas = [
  ["Pipeline", "31%"],
  ["Reporting", "42%"],
  ["AI maturity", "27%"],
  ["Operations", "54%"],
];

export function AuditMockup() {
  return (
    <div className="w-full">
      <TierCard>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Audit diagnostic</p>
            <p className="mt-3 font-display text-[30px] leading-none tracking-[-0.02em] text-ink">
              <CountUp value={49} delay={0.15} /> questions
            </p>
          </div>
          <div className="rounded-[12px] bg-surface p-3 text-right ring-1 ring-hairline">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">Aperture Score</p>
            <p className="mt-3 font-display text-[36px] leading-none tracking-[-0.03em] text-ink">
              <CountUp value={46} suffix="/100" delay={0.35} />
            </p>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            <span>Diagnostic progress</span>
            <span>complete</span>
          </div>
          <LoadingBar width="100%" delay={0.2} />
        </div>
      </TierCard>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {areas.map(([label, width], index) => (
          <motion.div
            key={label}
            className="rounded-[12px] bg-white/82 p-4 ring-1 ring-white/80 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.12 }}
          >
            <div className="mb-3 flex justify-between text-[12px] text-ink-soft">
              <span>{label}</span>
              <span>{width}</span>
            </div>
            <LoadingBar width={width} delay={0.25 + index * 0.1} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-4 rounded-[14px] bg-ink p-5 text-card shadow-panel"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.75 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Cost of inaction</p>
        <p className="mt-3 font-display text-[28px] leading-none tracking-[-0.02em]">
          $<CountUp value={184} delay={0.95} />k - $<CountUp value={312} delay={1} />k
        </p>
      </motion.div>
    </div>
  );
}

