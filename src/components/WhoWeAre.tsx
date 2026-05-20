import { whoWeAre } from "@/lib/content";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            {whoWeAre.eyebrow}
          </p>
          <h2 className="mt-7 max-w-[620px] font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            {whoWeAre.headline}
          </h2>
        </div>
        <div className="rounded-[22px] bg-card p-7 shadow-panel ring-1 ring-hairline sm:p-9">
          {whoWeAre.body.map((paragraph) => (
            <p key={paragraph} className="mb-5 max-w-[680px] text-[17px] leading-8 text-ink-soft last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
