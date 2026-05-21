import { DetailsForm } from "./details-form";

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-base px-5 py-12 text-ink sm:px-8">
      <section className="mx-auto max-w-[920px]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE AUDIT
        </p>
        <h1 className="mt-6 max-w-[760px] font-display text-[clamp(44px,8vw,88px)] font-normal leading-[1.02]">
          First, your details.
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-ink-soft">
          This creates your assessment and keeps the report tied to the right business.
        </p>
        <DetailsForm />
      </section>
    </main>
  );
}
