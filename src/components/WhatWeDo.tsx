"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AuditMockup, BlueprintMockup, BuildMockup, EngineMockup } from "@/components/tier-mockups";
import { stages, type StageKey } from "@/lib/content";

const moduleCopy: Record<
  StageKey,
  {
    collapsed: string;
    systemLabel: string;
    flow: string[];
    detail: string;
  }
> = {
  audit: {
    collapsed: "Diagnose operational bottlenecks",
    systemLabel: "Diagnostic system",
    flow: ["Questions", "Scoring", "Priority levers", "Cost range"],
    detail:
      "The Audit converts scattered operational symptoms into scored practice areas, weak-point identification and a commercial cost range.",
  },
  blueprint: {
    collapsed: "Generate sequenced transformation plan",
    systemLabel: "Planning system",
    flow: ["Levers", "Assessment", "Sequence", "Review"],
    detail:
      "Blueprint goes deeper on the lowest-scoring levers and turns the diagnosis into an implementation sequence.",
  },
  build: {
    collapsed: "Install workflows, dashboards and agents",
    systemLabel: "Implementation system",
    flow: ["Route", "Install", "Connect", "Go live"],
    detail:
      "Build installs the workflows, routing, dashboards, agents and reporting cadence that make the plan operational.",
  },
  engine: {
    collapsed: "Monitor and improve operations continuously",
    systemLabel: "Operating system",
    flow: ["Monitor", "Detect", "Recommend", "Action", "Report"],
    detail:
      "Engine keeps the installed systems running, identifies operational drift and moves improvements into cadence.",
  },
};

const mockups: Record<StageKey, JSX.Element> = {
  audit: <AuditMockup />,
  blueprint: <BlueprintMockup />,
  build: <BuildMockup />,
  engine: <EngineMockup />,
};

export function WhatWeDo() {
  const [activeKey, setActiveKey] = useState<StageKey | null>(null);
  const activeStage = stages.find((stage) => stage.key === activeKey);

  return (
    <section id="what-we-do" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            WHAT WE DO
          </p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            Audit, sequence, build and operate.
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">
            Four operating modules. Calm on the surface, deep when opened.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => {
            const isActive = activeKey === stage.key;
            const isDimmed = activeKey !== null && !isActive;

            return (
              <motion.button
                key={stage.key}
                type="button"
                onClick={() => setActiveKey(isActive ? null : stage.key)}
                className={`group flex min-h-[260px] cursor-pointer flex-col justify-between rounded-[18px] bg-card p-6 text-left ring-1 ring-hairline transition-colors duration-150 hover:bg-surface ${
                  isDimmed ? "opacity-45" : "opacity-100"
                }`}
                layout
                whileHover={{ y: -4 }}
                transition={{ duration: 0.18 }}
                aria-expanded={isActive}
              >
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                    {stage.name}
                  </p>
                  <h3 className="mt-6 font-display text-[30px] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
                    {moduleCopy[stage.key].collapsed}
                  </h3>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                    {isActive ? "Close System" : "View System"}
                  </span>
                  <span className="h-px flex-1 bg-hairline transition-colors duration-150 group-hover:bg-ink" />
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeStage ? (
            <motion.article
              key={activeStage.key}
              className="mt-5 overflow-hidden rounded-[22px] bg-card p-5 shadow-panel ring-1 ring-hairline sm:p-8"
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                    {moduleCopy[activeStage.key].systemLabel}
                  </p>
                  <h3 className="mt-6 font-display text-[clamp(32px,3.8vw,56px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
                    {activeStage.headline}
                  </h3>
                  <p className="mt-6 text-[16px] leading-7 text-ink-soft">{moduleCopy[activeStage.key].detail}</p>
                  <div className="mt-8 grid gap-2">
                    {moduleCopy[activeStage.key].flow.map((step, index) => (
                      <motion.div
                        key={step}
                        className="flex items-center gap-3 rounded-[12px] bg-surface p-3 ring-1 ring-hairline"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.06 }}
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card font-mono text-[10px] text-ink-muted ring-1 ring-hairline">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] text-ink">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>{mockups[activeStage.key]}</div>
              </div>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
