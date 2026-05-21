import Link from "next/link";
import { finalCta } from "@/lib/content";

export function FinalCTA() {
  return (
    <section className="px-5 py-20 text-center sm:px-8 sm:py-[120px]">
      <div className="mx-auto max-w-[760px]">
        <h2 className="font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
          {finalCta.headline}
        </h2>
        <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">
          {finalCta.body}
        </p>
        <Link
          href="/start"
          className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
        >
          {finalCta.cta}
        </Link>
      </div>
    </section>
  );
}

