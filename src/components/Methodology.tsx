import { methodology } from "@/lib/content";

export function Methodology() {
  return (
    <section className="bg-surface px-5 py-16 text-center sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[760px]">
        <blockquote className="font-display text-[clamp(24px,2.5vw,36px)] italic leading-[1.22] tracking-[-0.012em] text-ink">
          {methodology.quote}
        </blockquote>
        <p className="mt-9 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          {methodology.citation}
        </p>
      </div>
    </section>
  );
}
