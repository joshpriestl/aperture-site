import type { ReactNode } from "react";
import type { Stage as StageContent } from "@/lib/content";

const gradientClass = {
  audit: "from-[var(--audit-bg-a)] to-[var(--audit-bg-b)]",
  blueprint: "from-[var(--bp-bg-a)] to-[var(--bp-bg-b)]",
  build: "from-[var(--bd-bg-a)] to-[var(--bd-bg-b)]",
  engine: "from-[var(--en-bg-a)] to-[var(--en-bg-b)]",
};

const chipStyle = {
  audit: "bg-[var(--audit-chip-bg)] text-[var(--audit-chip-tx)] shadow-[0_10px_24px_rgba(61,78,74,0.08)]",
  blueprint: "bg-[var(--bp-chip-bg)] text-[var(--bp-chip-tx)] shadow-[0_10px_24px_rgba(107,84,48,0.08)]",
  build: "bg-[var(--bd-chip-bg)] text-[var(--bd-chip-tx)] shadow-[0_10px_24px_rgba(66,77,42,0.08)]",
  engine: "bg-[var(--en-chip-bg)] text-[var(--en-chip-tx)] shadow-[0_10px_24px_rgba(90,46,54,0.08)]",
};

type StageProps = {
  stage: StageContent;
  children: ReactNode;
};

export function Stage({ stage, children }: StageProps) {
  const visual = (
    <div
      className={`relative flex min-h-[460px] items-center overflow-hidden rounded-[22px] bg-gradient-to-br ${gradientClass[stage.key]} p-6 shadow-panel transition-transform duration-150 hover:-translate-y-1 sm:min-h-[540px] sm:p-14`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.62),transparent_30%),radial-gradient(circle_at_12%_88%,rgba(255,255,255,0.36),transparent_34%)]" />
      <div className="relative w-full">{children}</div>
    </div>
  );

  const text = (
    <article className="flex min-h-[460px] flex-col justify-between rounded-[22px] bg-card p-8 ring-1 ring-hairline transition-transform duration-150 hover:-translate-y-1 sm:min-h-[540px] sm:p-14">
      <p
        className={`w-fit rounded-md px-3 py-2 font-mono text-[12px] font-medium tracking-[0.12em] ${chipStyle[stage.key]}`}
      >
        {stage.chip}
      </p>
      <div className="py-12 sm:py-16">
        <h2 className="max-w-[560px] font-display text-[clamp(30px,3.4vw,50px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
          {stage.headline}
        </h2>
        <p className="mt-7 max-w-[520px] text-[16px] leading-7 text-ink-soft">{stage.body}</p>
      </div>
      <div className="h-px w-20 bg-hairline" />
    </article>
  );

  return (
    <section className="px-5 py-8 sm:px-8 sm:py-11">
      <div className="mx-auto grid max-w-site gap-5 lg:grid-cols-2">
        {stage.visualSide === "left" ? (
          <>
            {visual}
            {text}
          </>
        ) : (
          <>
            {text}
            {visual}
          </>
        )}
      </div>
    </section>
  );
}
