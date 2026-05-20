"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type MockupShellProps = {
  children: ReactNode;
  tone?: "audit" | "blueprint" | "build" | "engine";
};

const toneClass = {
  audit: "from-[var(--audit-bg-a)] via-[var(--audit-bg-b)] to-[var(--surface)]",
  blueprint: "from-[var(--bp-bg-a)] via-[var(--bp-bg-b)] to-[var(--surface)]",
  build: "from-[var(--bd-bg-a)] via-[var(--bd-bg-b)] to-[var(--surface)]",
  engine: "from-[var(--en-bg-a)] via-[var(--en-bg-b)] to-[var(--surface)]",
};

export function MockupShell({ children, tone = "audit" }: MockupShellProps) {
  return (
    <div className={`relative overflow-hidden rounded-[22px] bg-gradient-to-br ${toneClass[tone]} p-5 shadow-panel sm:p-8`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.62),transparent_30%),radial-gradient(circle_at_12%_86%,rgba(255,255,255,0.34),transparent_36%)]" />
      <motion.div
        className="relative overflow-hidden rounded-[16px] bg-white/88 shadow-panel ring-1 ring-white/80 backdrop-blur"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ProgressBar({ delay = 0, width = "100%" }: { delay?: number; width?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-hairline">
      <motion.div
        className="h-full rounded-full bg-ink"
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

