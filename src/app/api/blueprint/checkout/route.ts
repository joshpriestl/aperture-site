import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createStripeCheckoutSession } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type AssessmentRow = {
  id: string;
  organisation_id: string | null;
  person_id: string | null;
  people:
    | { email: string | null }
    | { email: string | null }[]
    | null;
};

function getPersonEmail(people: AssessmentRow["people"]) {
  if (!people) return null;
  const person = Array.isArray(people) ? people[0] : people;
  return person?.email ?? null;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const assessmentId = formData.get("assessment_id");

  if (typeof assessmentId !== "string" || !assessmentId) {
    return NextResponse.json(
      { error: "Missing assessment_id" },
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
    .select("id, organisation_id, person_id, people(email)")
    .eq("id", assessmentId)
    .maybeSingle<AssessmentRow>();

  if (assessmentError || !assessment) {
    return NextResponse.json(
      { error: "Assessment could not be found" },
      { status: 404 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  try {
    const session = await createStripeCheckoutSession({
      assessmentId: assessment.id,
      baseUrl,
      customerEmail: getPersonEmail(assessment.people),
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 502 },
      );
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Stripe checkout session could not be created",
      },
      { status: 500 },
    );
  }
}
