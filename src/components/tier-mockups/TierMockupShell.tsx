"use client";

import type { ReactNode } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
};

export function CountUp({ value, prefix = "", suffix = "", delay = 0.2 }: CountUpProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => `${prefix}${Math.round(latest).toLocaleString()}${suffix}`);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1.25, delay, ease: "easeOut" });
    return controls.stop;
  }, [delay, motionValue, value]);

  return <motion.span>{rounded}</motion.span>;
}

export function TierCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`rounded-[14px] bg-white/88 p-4 shadow-[0_18px_48px_rgba(20,24,28,0.08)] ring-1 ring-white/80 backdrop-blur ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function LoadingBar({ width = "100%", delay = 0 }: { width?: string; delay?: number }) {
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

export function StatusPill({
  from = "Pending",
  to = "Live",
  delay = 0.6,
}: {
  from?: string;
  to?: string;
  delay?: number;
}) {
  const complete = useMotionValue(0);
  const label = useTransform(complete, (latest) => (latest > 0.5 ? to : from));

  useEffect(() => {
    const controls = animate(complete, 1, { duration: 0.25, delay });
    return controls.stop;
  }, [complete, delay]);

  return (
    <motion.span
      className="rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ring-1 ring-hairline"
      initial={{ backgroundColor: "#f5f7f9", color: "#8896a3" }}
      whileInView={{ backgroundColor: "#14181c", color: "#ffffff" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.25 }}
    >
      {label}
    </motion.span>
  );
}

