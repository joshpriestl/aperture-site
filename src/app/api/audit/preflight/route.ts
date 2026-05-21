import { NextResponse } from "next/server";
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

  return NextResponse.json({
    ok: checks.every((check) => check.ok),
    checks,
  });
}
