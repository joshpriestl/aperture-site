"use client";

import { motion } from "framer-motion";
import { LoadingBar, StatusPill, TierCard } from "./TierMockupShell";

const levers = ["Pipeline visibility", "Reporting cadence", "AI workflow design"];
const docs = ["Assessment notes", "Recommended sequence", "Build scope"];

export function BlueprintMockup() {
  return (
    <div className="w-full">
      <div className="grid gap-3 sm:grid-cols-3">
        {levers.map((lever, index) => (
          <motion.div
            key={lever}
            className="rounded-[12px] bg-white/86 p-4 ring-1 ring-white/80 backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.16 }}
          >
            <p className="font-mono text-[10px] text-ink-muted">0{index + 1}</p>
            <p className="mt-5 text-[13px] leading-5 text-ink">{lever}</p>
          </motion.div>
        ))}
      </div>

      <TierCard className="mt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Blueprint generator</p>
            <p className="mt-3 text-[13px] leading-6 text-ink-soft">Deeper assessment and sequenced plan in progress.</p>
          </div>
          <StatusPill from="Drafting" to="Founder review" delay={1.1} />
        </div>
        <div className="mt-5 space-y-4">
          {docs.map((doc, index) => (
            <div key={doc}>
              <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                <span>{doc}</span>
                <span>loading</span>
              </div>
              <LoadingBar width={`${68 + index * 10}%`} delay={0.25 + index * 0.18} />
            </div>
          ))}
        </div>
      </TierCard>

      <motion.div
        className="mt-4 rounded-[14px] bg-ink p-5 text-card shadow-panel"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.8 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">Founder review queue</p>
        <p className="mt-3 text-[13px] leading-6">Priority sequence ready for commercial approval.</p>
      </motion.div>
    </div>
  );
}

