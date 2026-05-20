"use client";

import { motion } from "framer-motion";
import { MockupShell } from "./MockupShell";

const tasks = ["Lead qualification", "Proposal draft", "Client intake", "Weekly report"];

function LoadingDots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1 w-1 rounded-full bg-current"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16 }}
        />
      ))}
    </span>
  );
}

export function AgentWorkflowMockup() {
  return (
    <MockupShell tone="build">
      <div className="grid gap-5 p-5 sm:grid-cols-[0.82fr_1.18fr] sm:p-6">
        <div className="rounded-[14px] bg-surface p-5 ring-1 ring-hairline">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Active agent</p>
          <motion.div
            className="mt-6 rounded-[14px] bg-card p-5 ring-1 ring-hairline"
            animate={{ boxShadow: ["0 0 0 rgba(20,24,28,0)", "0 18px 42px rgba(20,24,28,0.12)", "0 0 0 rgba(20,24,28,0)"] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            <p className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">Proposal drafting agent</p>
            <p className="mt-3 text-[13px] leading-6 text-ink-soft">Reading CRM context, prior proposals and service scope.</p>
            <div className="mt-5 rounded-full bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-card">
              Processing <LoadingDots />
            </div>
          </motion.div>
        </div>
        <div className="rounded-[14px] bg-card p-4 ring-1 ring-hairline">
          <p className="px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Agent queue</p>
          <div className="mt-3 divide-y divide-hairline">
            {tasks.map((task, index) => (
              <motion.div
                key={task}
                className="flex items-center justify-between gap-4 py-4"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.16 }}
              >
                <div>
                  <p className="text-[13px] text-ink">{task}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">workflow task</p>
                </div>
                <motion.span
                  className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ring-1 ring-hairline"
                  initial={{ backgroundColor: "#f5f7f9", color: "#8896a3" }}
                  whileInView={{ backgroundColor: "#14181c", color: "#ffffff" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.22, duration: 0.28 }}
                >
                  Complete
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

