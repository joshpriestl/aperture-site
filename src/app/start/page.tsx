import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto flex min-h-[72vh] max-w-[820px] flex-col justify-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE AUDIT
        </p>
        <h1 className="mt-7 font-display text-[clamp(44px,7vw,88px)] font-normal leading-[1.02]">
          Start the free Audit.
        </h1>
        <p className="mt-6 max-w-[600px] text-[16px] leading-7 text-ink-soft">
          49 questions. 15 minutes. A score across ten practice areas, a cost of inaction estimate and three priority levers.
        </p>
        <Link
          href="/start/details"
          className="mt-10 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
        >
          Continue
        </Link>
      </section>
    </main>
  );
}

