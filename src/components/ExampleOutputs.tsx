"use client";

import { motion } from "framer-motion";

const outputs = [
  {
    title: "Blueprint page preview",
    label: "Sequenced plan",
    rows: ["Priority levers", "Cost of inaction", "Recommended sequence", "Build proposal attached"],
  },
  {
    title: "Workflow map",
    label: "Installed route",
    rows: ["New lead", "AI qualification", "CRM update", "Founder alert"],
  },
  {
    title: "Agent queue",
    label: "Operational agents",
    rows: ["Lead qualification", "Proposal drafting", "Client intake", "Weekly report"],
  },
  {
    title: "Weekly operating summary",
    label: "Cadence artefact",
    rows: ["Alerts detected", "Actions assigned", "Review queue", "Next cadence"],
  },
] as const;

export function ExampleOutputs() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            EXAMPLE OUTPUTS
          </p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            Tangible artefacts, not abstract advice.
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">
            The output is a working operating system: plans, maps, queues and summaries a founder can actually run.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {outputs.map((output, index) => (
            <motion.article
              key={output.title}
              className="rounded-[18px] bg-card p-5 ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-1"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">{output.label}</p>
              <h3 className="mt-5 font-display text-[25px] font-normal leading-tight tracking-[-0.02em] text-ink">
                {output.title}
              </h3>
              <div className="mt-6 space-y-2">
                {output.rows.map((row, rowIndex) => (
                  <motion.div
                    key={row}
                    className="rounded-[10px] bg-surface px-3 py-3 text-[12px] text-ink ring-1 ring-hairline"
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.15 + rowIndex * 0.08 }}
                  >
                    {row}
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
