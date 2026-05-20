const outputs = [
  {
    title: "Blueprint page preview",
    label: "Sequenced plan",
    rows: ["Priority levers", "Cost of inaction", "Recommended sequence"],
  },
  {
    title: "Workflow map",
    label: "Installed route",
    rows: ["New lead", "AI qualification", "CRM update"],
  },
  {
    title: "Agent queue",
    label: "Operational agents",
    rows: ["Lead qualification", "Client intake", "Weekly report"],
  },
  {
    title: "Weekly operating summary",
    label: "Cadence artefact",
    rows: ["Alerts detected", "Actions assigned", "Next cadence"],
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
            Plans, maps, queues and summaries a founder can actually run.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {outputs.map((output) => (
            <article key={output.title} className="rounded-[18px] bg-card p-5 ring-1 ring-hairline">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">{output.label}</p>
              <h3 className="mt-5 font-display text-[25px] font-normal leading-tight tracking-[-0.02em] text-ink">
                {output.title}
              </h3>
              <div className="mt-6 space-y-2">
                {output.rows.map((row) => (
                  <div key={row} className="rounded-[10px] bg-surface px-3 py-3 text-[12px] text-ink ring-1 ring-hairline">
                    {row}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
