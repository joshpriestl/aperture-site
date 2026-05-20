import type { ReactNode } from "react";

export function WhatWeDo({ children }: { children: ReactNode }) {
  return (
    <section id="what-we-do" className="pt-4">
      <div className="px-5 pb-8 text-center sm:px-8 sm:pb-10">
        <div className="mx-auto max-w-[760px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            WHAT WE DO
          </p>
          <h2 className="mt-7 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.022em] text-ink">
            Audit, sequence, build and operate.
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-7 text-ink-soft">
            Aperture turns operational ambiguity into a score, a plan, installed systems and an ongoing operating rhythm.
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}
