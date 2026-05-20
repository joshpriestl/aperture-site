import type { ReactNode } from "react";
import type { Stage as StageContent } from "@/lib/content";

const gradientClass = {
  audit: "from-[var(--audit-bg-a)] to-[var(--audit-bg-b)]",
  blueprint: "from-[var(--bp-bg-a)] to-[var(--bp-bg-b)]",
  build: "from-[var(--bd-bg-a)] to-[var(--bd-bg-b)]",
  engine: "from-[var(--en-bg-a)] to-[var(--en-bg-b)]",
};

const chipStyle = {
  audit: "bg-[var(--audit-chip-bg)] text-[var(--audit-chip-tx)]",
  blueprint: "bg-[var(--bp-chip-bg)] text-[var(--bp-chip-tx)]",
  build: "bg-[var(--bd-chip-bg)] text-[var(--bd-chip-tx)]",
  engine: "bg-[var(--en-chip-bg)] text-[var(--en-chip-tx)]",
};

type StageProps = {
  stage: StageContent;
  children: ReactNode;
};

export function Stage({ stage, children }: StageProps) {
  const visual = (
    <div
      className={`flex min-h-[420px] items-center rounded-[22px] bg-gradient-to-br ${gradientClass[stage.key]} p-6 shadow-panel sm:min-h-[480px] sm:p-14`}
    >
      {children}
    </div>
  );

  const text = (
    <article className="flex min-h-[420px] flex-col justify-center rounded-[22px] bg-surface p-8 ring-1 ring-hairline sm:min-h-[480px] sm:p-14">
      <p
        className={`w-fit rounded-full px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${chipStyle[stage.key]}`}
      >
        {stage.chip}
      </p>
      <h2 className="mt-8 max-w-[520px] font-display text-[clamp(28px,3vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
        {stage.headline}
      </h2>
      <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-ink-soft">{stage.body}</p>
    </article>
  );

  return (
    <section className="px-5 py-8 sm:px-8 sm:py-10">
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
