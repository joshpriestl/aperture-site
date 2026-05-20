import Link from "next/link";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="px-5 pb-[120px] pt-24 text-center sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-site">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          {hero.eyebrow}
        </p>
        <h1 className="mx-auto mt-8 max-w-[720px] font-display text-[clamp(44px,6vw,88px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
          {hero.headline}
        </h1>
        <p className="mx-auto mt-7 max-w-[520px] text-[16px] leading-7 text-ink-soft">
          {hero.subhead}
        </p>
        <Link
          href="/audit"
          className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
        >
          {hero.cta} ↗
        </Link>
      </div>
    </section>
  );
}
