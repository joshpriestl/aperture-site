import { faqs } from "@/lib/content";

export function FAQ() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-site gap-10 border-t border-hairline pt-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:pt-16">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">{faqs.eyebrow}</p>
          <h2 className="mt-7 font-display text-[clamp(34px,4vw,56px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {faqs.headline}
          </h2>
        </div>
        <div className="divide-y divide-hairline border-y border-hairline">
          {faqs.items.map((item) => (
            <article key={item.question} className="py-6">
              <h3 className="font-display text-[24px] font-normal leading-tight tracking-[-0.018em] text-ink">{item.question}</h3>
              <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-ink-soft">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
