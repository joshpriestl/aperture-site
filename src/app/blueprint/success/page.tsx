import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase";

type Props = {
  searchParams: {
    session_id?: string;
  };
};

type BlueprintAssessment = {
  id: string;
  paid: boolean;
};

export default async function BlueprintSuccessPage({ searchParams }: Props) {
  let blueprintAssessment: BlueprintAssessment | null = null;

  if (searchParams.session_id) {
    try {
      const supabase = createSupabaseClient();
      const { data } = await supabase
        .from("blueprint_assessments")
        .select("id, paid")
        .eq("stripe_checkout_session_id", searchParams.session_id)
        .maybeSingle<BlueprintAssessment>();

      blueprintAssessment = data ?? null;
    } catch {
      blueprintAssessment = null;
    }
  }

  const isConfirmed = Boolean(blueprintAssessment?.paid);

  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto flex min-h-[72vh] max-w-[720px] flex-col justify-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE BLUEPRINT
        </p>
        <h1 className="mt-7 font-display text-[clamp(42px,7vw,78px)] font-normal leading-[1.02]">
          {isConfirmed ? "Payment confirmed." : "Checkout complete."}
        </h1>
        <p className="mt-6 max-w-[580px] text-[16px] leading-7 text-ink-soft">
          {isConfirmed
            ? "Your Blueprint is active. The next step is the deeper question flow for the three areas your Audit surfaced as priorities."
            : "Stripe has returned you to Aperture. We are waiting for the payment confirmation webhook before activating your Blueprint."}
        </p>
        {searchParams.session_id ? (
          <p className="mt-6 font-mono text-[11px] text-ink-muted">
            Stripe session {searchParams.session_id}
          </p>
        ) : null}
        {isConfirmed ? (
          <Link
            className="mt-10 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
            href="/blueprint/booking"
          >
            Book review call
          </Link>
        ) : null}
      </section>
    </main>
  );
}
