import { buyerFit } from "@/lib/content";

export function BuyerFit() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-site gap-10 border-y border-hairline py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-16">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">{buyerFit.eyebrow}</p>
          <h2 className="mt-7 max-w-[620px] font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {buyerFit.headline}
          </h2>
          <p className="mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">{buyerFit.body}</p>
        </div>
        <div className="grid content-start gap-3 sm:grid-cols-2">
          {buyerFit.examples.map((example) => (
            <div key={example} className="rounded-[12px] bg-card px-4 py-4 text-[14px] leading-5 text-ink ring-1 ring-hairline">
              {example}
            </div>
          ))}
          <div className="rounded-[12px] bg-ink px-4 py-4 text-[14px] leading-6 text-card sm:col-span-2">
            {buyerFit.notFor}
          </div>
        </div>
      </div>
    </section>
  );
}
