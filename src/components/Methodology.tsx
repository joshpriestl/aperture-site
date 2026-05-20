import { methodology } from "@/lib/content";

export function Methodology() {
  return (
    <section id="methodology" className="bg-surface px-5 py-16 text-center sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          {methodology.eyebrow}
        </p>
        <p className="mt-8 font-display text-[clamp(24px,2.5vw,36px)] leading-[1.22] tracking-[-0.012em] text-ink">
          {methodology.body}
        </p>
        <p className="mt-7 font-display text-[18px] italic leading-[1.4] tracking-[-0.01em] text-ink-soft">
          {methodology.closing}
        </p>
      </div>
    </section>
  );
}
