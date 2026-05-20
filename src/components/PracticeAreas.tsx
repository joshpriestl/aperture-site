import { practiceAreas } from "@/lib/content";

export function PracticeAreas() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            {practiceAreas.eyebrow}
          </p>
          <h2 className="mt-7 max-w-[520px] font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em]">
            {practiceAreas.headline}
          </h2>
          <p className="mt-7 max-w-[470px] text-[16px] leading-7 text-ink-soft">{practiceAreas.body}</p>
        </div>
        <div className="border-t border-hairline">
          {practiceAreas.items.map((item) => (
            <div
              key={item.number}
              className="grid grid-cols-[42px_1fr] gap-x-4 gap-y-2 border-b border-hairline py-5 transition-colors duration-150 hover:bg-surface sm:grid-cols-[52px_1fr_150px]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                {item.number}
              </span>
              <span className="font-display text-[19px] leading-tight tracking-[-0.01em] text-ink">
                {item.name}
              </span>
              <span className="col-start-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted sm:col-start-auto sm:text-right">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
