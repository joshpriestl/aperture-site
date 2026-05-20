import Link from "next/link";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto flex min-h-[70vh] max-w-site flex-col items-center justify-center text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE AUDIT
        </p>
        <h1 className="mt-8 max-w-[680px] font-display text-[clamp(44px,6vw,84px)] font-normal leading-[1.04] tracking-[-0.02em]">
          Audit coming shortly.
        </h1>
        <p className="mt-7 max-w-[520px] text-[16px] leading-7 text-ink-soft">
          The diagnostic funnel is being prepared for integration. Return to the Aperture homepage for now.
        </p>
        <Link
          href="/"
          className="mt-10 rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
