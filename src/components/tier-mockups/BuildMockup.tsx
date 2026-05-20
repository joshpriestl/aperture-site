"use client";

import { motion } from "framer-motion";
import { StatusPill, TierCard } from "./TierMockupShell";

const systems = [
  ["Lead routing workflow", "New enquiries routed to CRM and Slack"],
  ["Founder dashboard", "Pipeline, conversion and follow-up visibility"],
  ["AI intake agent", "Client context captured before handoff"],
  ["Weekly reporting cadence", "Scorecard delivered every Monday"],
] as const;

export function BuildMockup() {
  return (
    <div className="w-full">
      <TierCard>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">This is where systems are installed</p>
        <div className="mt-4 divide-y divide-hairline">
          {systems.map(([system, detail], index) => (
            <motion.div
              key={system}
              className="flex items-center justify-between gap-4 py-4"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.12 }}
            >
              <div className="flex items-start gap-3">
                <motion.span
                  className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface font-mono text-[10px] text-ink-muted ring-1 ring-hairline"
                  whileInView={{ backgroundColor: "#14181c", color: "#ffffff" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + index * 0.16 }}
                >
                  ✓
                </motion.span>
                <div>
                  <p className="text-[13px] text-ink">{system}</p>
                  <p className="mt-1 text-[11px] leading-5 text-ink-soft">{detail}</p>
                </div>
              </div>
              <StatusPill from="Pending" to="Live" delay={0.5 + index * 0.18} />
            </motion.div>
          ))}
        </div>
      </TierCard>

      <div className="mt-4 rounded-[14px] bg-white/84 p-5 ring-1 ring-white/80 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Installed operating route</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-4">
          {["Lead captured", "CRM updated", "Agent briefed", "Report logged"].map((node, index) => (
            <motion.div
              key={node}
              className="rounded-[10px] bg-card p-3 text-center text-[11px] leading-4 text-ink ring-1 ring-hairline"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.16 }}
            >
              {node}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

