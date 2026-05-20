"use client";

import { motion } from "framer-motion";
import { StatusPill, TierCard } from "./TierMockupShell";

const systems = ["CRM workflow", "Founder dashboard", "AI intake agent", "Reporting cadence"];

export function BuildMockup() {
  return (
    <div className="w-full">
      <TierCard>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Systems installed</p>
        <div className="mt-4 divide-y divide-hairline">
          {systems.map((system, index) => (
            <motion.div
              key={system}
              className="flex items-center justify-between gap-4 py-3"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.14 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-surface font-mono text-[10px] text-ink-muted ring-1 ring-hairline"
                  whileInView={{ backgroundColor: "#14181c", color: "#ffffff" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + index * 0.18 }}
                >
                  ✓
                </motion.span>
                <span className="text-[13px] text-ink">{system}</span>
              </div>
              <StatusPill delay={0.55 + index * 0.18} />
            </motion.div>
          ))}
        </div>
      </TierCard>

      <div className="mt-4 rounded-[14px] bg-white/82 p-5 ring-1 ring-white/80 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Workflow route</p>
        <div className="mt-6 grid grid-cols-4 items-center gap-2">
          {["Lead", "CRM", "Agent", "Report"].map((node, index) => (
            <div key={node} className="relative">
              <motion.div
                className="rounded-[10px] bg-card p-3 text-center text-[11px] text-ink ring-1 ring-hairline"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.18 }}
              >
                {node}
              </motion.div>
              {index < 3 ? (
                <motion.span
                  className="absolute left-full top-1/2 z-10 h-px bg-ink"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.45 + index * 0.2 }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

