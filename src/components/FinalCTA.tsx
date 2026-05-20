import Link from "next/link";
import { finalCta } from "@/lib/content";

export function FinalCTA() {
  return (
    <section id="contact" className="px-5 py-20 text-center sm:px-8 sm:py-[120px]">
      <div className="mx-auto max-w-[760px] border-t border-hairline pt-16">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          {finalCta.eyebrow}
        </p>
        <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
          {finalCta.headline}
        </h2>
        <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">{finalCta.body}</p>
        <Link
          href="/audit"
          className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
        >
          {finalCta.cta} <span className="ml-2" aria-hidden="true">&rarr;</span>
        </Link>
        <a
          href={`mailto:${finalCta.email}`}
          className="mt-6 block font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors duration-150 hover:text-ink"
        >
          {finalCta.email}
        </a>
      </div>
    </section>
  );
}
