"use client";

import { motion } from "framer-motion";
import { CountUp, LoadingBar, TierCard } from "./TierMockupShell";

const practiceAreas = [
  ["Strategy", 54],
  ["Revenue and Pipeline", 31],
  ["Marketing", 68],
  ["Operations", 47],
  ["AI and Automation", 22],
  ["Data and Reporting", 42],
  ["People and Culture", 58],
  ["Technology and Systems", 49],
  ["Customer Experience", 63],
  ["Brand and Communications", 71],
] as const;

const weakestAreas = new Set(["AI and Automation", "Revenue and Pipeline", "Data and Reporting"]);

export function AuditMockup() {
  return (
    <div className="w-full">
      <TierCard>
        <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">This is the diagnostic</p>
            <p className="mt-3 text-[13px] leading-6 text-ink-soft">49 questions across ten practice areas.</p>
            <div className="mt-4">
              <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                <span>Question progress</span>
                <span>49 / 49</span>
              </div>
              <LoadingBar width="100%" delay={0.15} />
            </div>
          </div>
          <div className="rounded-[12px] bg-surface p-4 text-right ring-1 ring-hairline">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">Aperture Score</p>
            <p className="mt-4 font-display text-[44px] leading-none tracking-[-0.03em] text-ink">
              <CountUp value={46} suffix="/100" delay={0.3} />
            </p>
            <p className="mt-3 text-[12px] leading-5 text-ink-soft">Calculated from scored responses.</p>
          </div>
        </div>
      </TierCard>

      <div className="mt-4 rounded-[14px] bg-white/84 p-4 ring-1 ring-white/80 backdrop-blur">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Practice area scores</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">weakest areas highlighted</p>
        </div>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          {practiceAreas.map(([area, score], index) => (
            <motion.div
              key={area}
              className={`rounded-[10px] p-3 ring-1 ${
                weakestAreas.has(area)
                  ? "bg-[var(--en-chip-bg)] text-[var(--en-chip-tx)] ring-[var(--en-chip-bg)]"
                  : "bg-card text-ink ring-hairline"
              }`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="mb-2 flex items-center justify-between gap-3 text-[12px]">
                <span>{area}</span>
                <span className="font-mono text-[10px]">{score}</span>
              </div>
              <LoadingBar width={`${score}%`} delay={0.2 + index * 0.04} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-4 rounded-[14px] bg-ink p-5 text-card shadow-panel"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.65 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Cost of inaction range</p>
        <p className="mt-3 font-display text-[28px] leading-none tracking-[-0.02em]">
          $<CountUp value={184} delay={0.85} />k - $<CountUp value={312} delay={0.9} />k
        </p>
      </motion.div>
    </div>
  );
}

