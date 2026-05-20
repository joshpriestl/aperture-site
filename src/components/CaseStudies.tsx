import { caseStudies } from "@/lib/content";

export function CaseStudies() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site border-t border-hairline pt-14 sm:pt-20">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            {caseStudies.eyebrow}
          </p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {caseStudies.headline}
          </h2>
          <p className="mt-7 max-w-[620px] text-[16px] leading-7 text-ink-soft">{caseStudies.body}</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies.items.map((item) => (
            <article key={item.title} className="rounded-[18px] bg-card p-6 ring-1 ring-hairline">
              <h3 className="font-display text-[24px] font-normal leading-tight tracking-[-0.018em] text-ink">
                {item.title}
              </h3>
              <p className="mt-5 text-[15px] leading-7 text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
