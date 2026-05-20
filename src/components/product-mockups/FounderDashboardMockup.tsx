"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { MockupShell, ProgressBar } from "./MockupShell";

function CountMetric({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => `${prefix}${Math.round(latest).toLocaleString()}${suffix}`);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1.25, delay: 0.25, ease: "easeOut" });
    return controls.stop;
  }, [motionValue, value]);

  return <motion.span>{rounded}</motion.span>;
}

const metrics = [
  { label: "Pipeline value", value: 428, prefix: "$", suffix: "k" },
  { label: "Proposal conversion", value: 38, suffix: "%" },
  { label: "Overdue follow-ups", value: 9 },
];

export function FounderDashboardMockup() {
  return (
    <MockupShell tone="blueprint">
      <div className="p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.12 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">{metric.label}</p>
              <p className="mt-5 font-display text-[32px] leading-none tracking-[-0.03em] text-ink">
                <CountMetric value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[14px] bg-card p-5 ring-1 ring-hairline">
            <div className="relative h-44 border-b border-l border-hairline">
              <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 320 160" preserveAspectRatio="none">
                <motion.path
                  d="M0 124 C44 104 62 96 96 96 C134 96 142 72 176 72 C220 72 226 44 260 44 C286 44 302 34 320 28"
                  fill="none"
                  stroke="#14181c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.35, delay: 0.3, ease: "easeOut" }}
                />
              </svg>
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Pipeline movement</p>
          </div>
          <div className="rounded-[14px] bg-ink p-5 text-card">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Weekly AI summary</p>
            <p className="mt-4 text-[13px] leading-6">
              Conversion improved after proposal follow-up cadence. Delivery capacity is the next constraint.
            </p>
            <div className="mt-5 space-y-3">
              <ProgressBar delay={0.2} width="84%" />
              <ProgressBar delay={0.35} width="62%" />
              <ProgressBar delay={0.5} width="72%" />
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

