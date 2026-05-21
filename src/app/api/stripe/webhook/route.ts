import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { verifyStripeWebhook } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = verifyStripeWebhook(body, signature);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Stripe webhook verification failed",
      },
      { status: 400 },
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const assessmentId =
    session.metadata?.assessment_id ?? session.client_reference_id;

  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, payment_status: session.payment_status });
  }

  if (!assessmentId) {
    return NextResponse.json(
      { error: "Stripe session is missing assessment metadata" },
      { status: 400 },
    );
  }

  let supabase;

  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured" },
      { status: 500 },
    );
  }

  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .select("id, organisation_id, person_id")
    .eq("id", assessmentId)
    .maybeSingle<{
      id: string;
      organisation_id: string | null;
      person_id: string | null;
    }>();

  if (assessmentError || !assessment) {
    return NextResponse.json(
      { error: "Assessment could not be found" },
      { status: 404 },
    );
  }

  const { error: upsertError } = await supabase
    .from("blueprint_assessments")
    .upsert(
      {
        assessment_id: assessment.id,
        organisation_id: assessment.organisation_id,
        paid: true,
        paid_at: new Date().toISOString(),
        person_id: assessment.person_id,
        stripe_checkout_session_id: session.id,
        stripe_payment_id: session.payment_intent ?? null,
      },
      { onConflict: "stripe_checkout_session_id" },
    );

  if (upsertError) {
    return NextResponse.json(
      { error: upsertError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
