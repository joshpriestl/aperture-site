import Link from "next/link";

export default function BlueprintBookingPage() {
  const calcomUrl = process.env.NEXT_PUBLIC_CALCOM_BLUEPRINT_URL;

  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto max-w-[960px]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE BLUEPRINT
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <h1 className="font-display text-[clamp(38px,6vw,68px)] font-normal leading-[1.04]">
              Book your Blueprint review.
            </h1>
            <p className="mt-6 text-[16px] leading-8 text-ink-soft">
              Choose a time for the Aperture team to review your Blueprint with you. The call is 60 minutes and should be booked at least three business days out.
            </p>
            <Link
              className="mt-8 inline-flex rounded-full border border-hairline px-6 py-3 text-[13px] text-ink-soft transition-colors hover:text-ink"
              href="/start"
            >
              Back to Audit
            </Link>
          </div>

          <div className="min-h-[680px] rounded-[24px] bg-base p-3 shadow-[8px_8px_20px_#c4c9cc,-8px_-8px_20px_#ffffff]">
            {calcomUrl ? (
              <iframe
                className="h-[680px] w-full rounded-[18px] bg-card"
                src={calcomUrl}
                title="Book Aperture Blueprint"
              />
            ) : (
              <div className="flex min-h-[640px] flex-col justify-center rounded-[18px] bg-card px-8 text-center ring-1 ring-hairline">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  Booking not configured
                </p>
                <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-7 text-ink-soft">
                  Add `NEXT_PUBLIC_CALCOM_BLUEPRINT_URL` to show the booking calendar here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
