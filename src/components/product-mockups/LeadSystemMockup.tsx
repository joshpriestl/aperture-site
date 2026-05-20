"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { MockupShell, ProgressBar } from "./MockupShell";

const rows = [
  ["Inbound enquiry", "CFO-led advisory firm, 38 staff"],
  ["AI qualification", "High fit. Operational drag visible."],
  ["CRM update", "HubSpot stage moved to Audit invite"],
  ["Slack alert", "Founder notified with summary"],
];

export function LeadSystemMockup() {
  const score = useMotionValue(0);
  const rounded = useTransform(score, (value) => `${Math.round(value)}%`);

  useEffect(() => {
    const controls = animate(score, 87, { duration: 1.4, delay: 0.45, ease: "easeOut" });
    return controls.stop;
  }, [score]);

  return (
    <MockupShell tone="audit">
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_0.72fr] sm:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Lead system</p>
          <div className="mt-4 space-y-3">
            {rows.map(([label, detail], index) => (
              <motion.div
                key={label}
                className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.16 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{label}</p>
                    <p className="mt-2 text-[13px] leading-5 text-ink">{detail}</p>
                  </div>
                  <span className="rounded-full bg-card px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted ring-1 ring-hairline">
                    live
                  </span>
                </div>
                <div className="mt-4">
                  <ProgressBar delay={index * 0.14 + 0.2} width={`${58 + index * 11}%`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[14px] bg-card p-5 ring-1 ring-hairline">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Qualification score</p>
            <motion.p className="mt-6 font-display text-[56px] leading-none tracking-[-0.03em] text-ink">
              {rounded}
            </motion.p>
            <p className="mt-3 text-[13px] leading-6 text-ink-soft">Ready for Audit invitation and founder review.</p>
          </div>
          <motion.div
            className="mt-8 rounded-[12px] bg-ink p-4 text-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.95, duration: 0.4 }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Slack alert</p>
            <p className="mt-3 text-[12px] leading-5">High-fit lead routed. Follow-up sequence queued.</p>
          </motion.div>
        </div>
      </div>
    </MockupShell>
  );
}

