import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";

type Props = {
  searchParams: {
    assessment_id?: string;
  };
};

type AssessmentRow = {
  id: string;
  completed_at: string | null;
  people:
    | { email: string | null; first_name: string | null }
    | { email: string | null; first_name: string | null }[]
    | null;
};

function getPerson(
  people: AssessmentRow["people"],
) {
  if (!people) return null;
  return Array.isArray(people) ? people[0] : people;
}

export default async function BlueprintCheckoutPage({ searchParams }: Props) {
  const assessmentId = searchParams.assessment_id;

  if (!assessmentId) {
    notFound();
  }

  const supabase = createSupabaseClient();
  const { data: assessment } = await supabase
    .from("assessments")
    .select("id, completed_at, people(email, first_name)")
    .eq("id", assessmentId)
    .maybeSingle<AssessmentRow>();

  if (!assessment) {
    notFound();
  }

  const person = getPerson(assessment.people);
  const checkoutReady = Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_ID &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto flex min-h-[72vh] max-w-[760px] flex-col justify-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE BLUEPRINT
        </p>
        <h1 className="mt-7 font-display text-[clamp(42px,7vw,78px)] font-normal leading-[1.02]">
          Turn the audit into a plan.
        </h1>
        <p className="mt-6 max-w-[600px] text-[16px] leading-7 text-ink-soft">
          Aperture Blueprint is a four-hour working session with the Aperture team. We turn your audit findings into a sequenced 90-day roadmap and a working document for your team.
        </p>
        <div className="mt-9 rounded-[24px] bg-base px-6 py-6 shadow-[8px_8px_20px_#c4c9cc,-8px_-8px_20px_#ffffff] sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                Founder pricing
              </p>
              <p className="mt-2 font-display text-[44px] leading-none text-ink">
                $199
              </p>
            </div>
            <form action="/api/blueprint/checkout" method="post">
              <input name="assessment_id" type="hidden" value={assessment.id} />
              <button
                className="rounded-full bg-ink px-7 py-3.5 text-[14px] font-medium text-card transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!checkoutReady}
                type="submit"
              >
                Continue to checkout
              </button>
            </form>
          </div>
          {!checkoutReady ? (
            <p className="mt-5 text-[13px] leading-6 text-ink-muted">
              Checkout is waiting on Stripe and Supabase server environment variables.
            </p>
          ) : null}
          {person?.email ? (
            <p className="mt-5 text-[13px] leading-6 text-ink-muted">
              Checkout will use {person.email}.
            </p>
          ) : null}
        </div>
        <Link
          className="mt-8 text-[13px] text-ink-muted underline underline-offset-4"
          href={`/start/report/${assessment.id}`}
        >
          Back to report
        </Link>
      </section>
    </main>
  );
}
