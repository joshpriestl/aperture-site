"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AuditMockup, BlueprintMockup, BuildMockup, EngineMockup } from "@/components/tier-mockups";
import { stages, type StageKey } from "@/lib/content";

const moduleCopy: Record<
  StageKey,
  {
    descriptor: string;
    systemLabel: string;
    flow: string[];
    detail: string;
  }
> = {
  audit: {
    descriptor: "Operational diagnosis and scoring",
    systemLabel: "Diagnostic layer",
    flow: ["Diagnostic flow", "Practice scoring", "Weakest levers", "Cost range"],
    detail:
      "The Audit turns scattered operational symptoms into scored practice areas, priority levers and a cost of inaction estimate.",
  },
  blueprint: {
    descriptor: "Sequenced transformation planning",
    systemLabel: "Planning layer",
    flow: ["Deeper assessment", "Prioritisation", "Roadmap", "Founder review"],
    detail:
      "Blueprint goes deeper on the weakest areas and converts the diagnosis into a sequenced implementation roadmap.",
  },
  build: {
    descriptor: "Workflow and systems installation",
    systemLabel: "Installation layer",
    flow: ["CRM workflows", "AI agents", "Dashboards", "Cadence live"],
    detail:
      "Build installs the operational infrastructure: routing, agents, dashboards, reporting cadence and alerts.",
  },
  engine: {
    descriptor: "Ongoing operational optimisation",
    systemLabel: "Operating layer",
    flow: ["Monitoring", "Alerts", "Optimisation", "Reporting rhythm"],
    detail:
      "Engine keeps the operating system alive, monitoring for drift and moving improvements into recurring cadence.",
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
            Four layers of an operating system. Compact by default, deeper when opened.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[1080px] space-y-4">
          {stages.map((stage) => {
            const isActive = activeKey === stage.key;
            const isDimmed = activeKey !== null && !isActive;

            return (
              <motion.article
                key={stage.key}
                layout
                className={`overflow-hidden rounded-[24px] bg-[#eef2f5] shadow-[10px_10px_30px_rgba(20,24,28,0.08),-10px_-10px_30px_rgba(255,255,255,0.72)] transition-opacity duration-200 ${
                  isDimmed ? "opacity-45" : "opacity-100"
                }`}
                transition={{ layout: { type: "spring", stiffness: 170, damping: 24 } }}
              >
                <button
                  type="button"
                  onClick={() => setActiveKey(isActive ? null : stage.key)}
                  className="group flex min-h-[112px] w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left sm:px-8"
                  aria-expanded={isActive}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                      {stage.name}
                    </p>
                    <p className="mt-3 font-display text-[clamp(24px,2.8vw,36px)] font-normal leading-tight tracking-[-0.02em] text-ink">
                      {moduleCopy[stage.key].descriptor}
                    </p>
                  </div>
                  <motion.span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card font-display text-[30px] leading-none text-ink shadow-[inset_0_0_0_1px_var(--hairline),0_10px_24px_rgba(20,24,28,0.08)]"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      key={`${stage.key}-expanded`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-5 sm:px-8 sm:pb-8">
                        <div className="grid gap-8 border-t border-hairline pt-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
                          <div>
                            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                              {moduleCopy[stage.key].systemLabel}
                            </p>
                            <h3 className="mt-5 font-display text-[clamp(30px,3.4vw,48px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
                              {stage.headline}
                            </h3>
                            <p className="mt-5 text-[16px] leading-7 text-ink-soft">{moduleCopy[stage.key].detail}</p>
                            <div className="mt-7 grid gap-2">
                              {moduleCopy[stage.key].flow.map((step, index) => (
                                <motion.div
                                  key={step}
                                  className="flex items-center gap-3 rounded-[14px] bg-card p-3 shadow-[inset_0_0_0_1px_var(--hairline)]"
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.25, delay: index * 0.06 }}
                                >
                                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface font-mono text-[10px] text-ink-muted ring-1 ring-hairline">
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <span className="text-[13px] text-ink">{step}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.08 }}
                          >
                            {mockups[stage.key]}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
