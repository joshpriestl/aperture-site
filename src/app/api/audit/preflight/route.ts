import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createSupabaseClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type CheckResult = {
  name: string;
  ok: boolean;
  detail: string;
};

export async function GET() {
  const checks: CheckResult[] = [];

  checks.push({
    name: "NEXT_PUBLIC_SUPABASE_URL",
    ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    detail: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Present" : "Missing",
  });

  checks.push({
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    detail: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "Missing",
  });

  checks.push({
    name: "SUPABASE_SERVICE_ROLE_KEY",
    ok: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    detail: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Present" : "Missing",
  });

  checks.push({
    name: "STRIPE_SECRET_KEY",
    ok: Boolean(process.env.STRIPE_SECRET_KEY),
    detail: process.env.STRIPE_SECRET_KEY ? "Present" : "Missing",
  });

  checks.push({
    name: "STRIPE_PRICE_ID",
    ok: Boolean(process.env.STRIPE_PRICE_ID),
    detail: process.env.STRIPE_PRICE_ID ? "Present" : "Missing",
  });

  checks.push({
    name: "STRIPE_WEBHOOK_SECRET",
    ok: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    detail: process.env.STRIPE_WEBHOOK_SECRET ? "Present" : "Missing",
  });

  checks.push({
    name: "GOOGLE_SHEETS_WEBHOOK_URL",
    ok: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL),
    detail: process.env.GOOGLE_SHEETS_WEBHOOK_URL ? "Present" : "Missing",
  });

  checks.push({
    name: "GOOGLE_SHEETS_WEBHOOK_SECRET",
    ok: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_SECRET),
    detail: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ? "Present" : "Missing",
  });

  checks.push({
    name: "ADMIN_ACCESS_TOKEN",
    ok: Boolean(process.env.ADMIN_ACCESS_TOKEN),
    detail: process.env.ADMIN_ACCESS_TOKEN ? "Present" : "Missing",
  });

  let supabase;

  try {
    supabase = createSupabaseClient();
  } catch {
    return NextResponse.json({
      ok: false,
      checks,
    });
  }

  const practiceAreas = await supabase
    .from("practice_areas")
    .select("id,name,display_order")
    .limit(12);

  checks.push({
    name: "practice_areas",
    ok: !practiceAreas.error && practiceAreas.data?.length === 10,
    detail: practiceAreas.error
      ? practiceAreas.error.message
      : `${practiceAreas.data?.length ?? 0} visible rows`,
  });

  const questions = await supabase
    .from("questions")
    .select("id,question_version,display_order")
    .eq("question_version", 2)
    .limit(45);

  checks.push({
    name: "questions version 2",
    ok: !questions.error && questions.data?.length === 40,
    detail: questions.error
      ? questions.error.message
      : `${questions.data?.length ?? 0} visible rows`,
  });

  const assessments = await supabase
    .from("assessments")
    .select("id", { count: "exact", head: true });

  checks.push({
    name: "assessments read",
    ok: !assessments.error,
    detail: assessments.error
      ? assessments.error.message
      : `${assessments.count ?? 0} visible rows`,
  });

  try {
    const admin = createSupabaseAdminClient();
    const adminAssessments = await admin
      .from("assessments")
      .select("id", { count: "exact", head: true });

    checks.push({
      name: "service role assessments read",
      ok: !adminAssessments.error,
      detail: adminAssessments.error
        ? adminAssessments.error.message
        : `${adminAssessments.count ?? 0} visible rows`,
    });
  } catch (error) {
    checks.push({
      name: "service role assessments read",
      ok: false,
      detail: error instanceof Error ? error.message : "Service role check failed",
    });
  }

  return NextResponse.json({
    ok: checks.every((check) => check.ok),
    checks,
  });
}
