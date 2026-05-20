import { exampleOutputs } from "@/lib/content";

function PreviewCard({ card, index }: { card: (typeof exampleOutputs.cards)[number]; index: number }) {
  return (
    <article className="rounded-[18px] bg-card p-5 ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-1">
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <h3 className="font-display text-[24px] font-normal leading-tight tracking-[-0.018em] text-ink">{card.title}</h3>
        <span className="font-mono text-[11px] text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="mt-5 space-y-3">
        {card.rows.map((row, rowIndex) => (
          <div key={row} className="rounded-[12px] bg-surface p-4 ring-1 ring-hairline">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{row}</p>
            <div className="mt-4 h-2 rounded-full bg-hairline">
              <div
                className="h-2 rounded-full bg-ink"
                style={{ width: `${42 + rowIndex * 13 + index * 5}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ExampleOutputs() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">{exampleOutputs.eyebrow}</p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {exampleOutputs.headline}
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">{exampleOutputs.body}</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {exampleOutputs.cards.map((card, index) => (
            <PreviewCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
