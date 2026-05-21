import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type AssessmentRow = {
  id: string;
  completed_at: string | null;
  gross_margin_band: string | null;
  cac_band: string | null;
  ltv_band: string | null;
  organisations:
    | {
        name: string;
        industry: string | null;
        revenue_band: string | null;
        headcount_band: string | null;
      }
    | {
        name: string;
        industry: string | null;
        revenue_band: string | null;
        headcount_band: string | null;
      }[]
    | null;
  people:
    | {
        first_name: string | null;
        last_name: string | null;
        email: string | null;
        role: string | null;
      }
    | {
        first_name: string | null;
        last_name: string | null;
        email: string | null;
        role: string | null;
      }[]
    | null;
};

type ScoreRow = {
  score: number | null;
  gap_band: string | null;
  practice_areas:
    | {
        key: string;
        name: string;
      }
    | {
        key: string;
        name: string;
      }[]
    | null;
};

function first<T>(value: T | T[] | null) {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

function buildScoreColumns(scores: ScoreRow[]) {
  const columns: Record<string, string | number> = {};
  let total = 0;
  let count = 0;

  for (const score of scores) {
    const practiceArea = first(score.practice_areas);

    if (!practiceArea || score.score === null) {
      continue;
    }

    columns[`score_${practiceArea.key}`] = score.score;
    columns[`gap_${practiceArea.key}`] = score.gap_band ?? "";
    total += score.score;
    count += 1;
  }

  if (count > 0) {
    columns.aperture_score_overall = Math.round(total / count);
  }

  return columns;
}

async function parsePayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => null);
    return {
      adminToken: body?.admin_token,
      assessmentId: body?.assessment_id,
      isManual: false,
    };
  }

  const formData = await request.formData();
  return {
    adminToken: formData.get("admin_token"),
    assessmentId: formData.get("assessment_id"),
    isManual: true,
  };
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      skipped: true,
      reason: "Google Sheets webhook is not configured",
    });
  }

  const { adminToken, assessmentId, isManual } = await parsePayload(request);

  if (
    isManual &&
    (!process.env.ADMIN_ACCESS_TOKEN || adminToken !== process.env.ADMIN_ACCESS_TOKEN)
  ) {
    return NextResponse.json(
      { error: "Admin token is invalid" },
      { status: 403 },
    );
  }

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
    .select(
      "id, completed_at, gross_margin_band, cac_band, ltv_band, organisations(name, industry, revenue_band, headcount_band), people(first_name, last_name, email, role)",
    )
    .eq("id", assessmentId)
    .maybeSingle<AssessmentRow>();

  if (assessmentError || !assessment) {
    return NextResponse.json(
      { error: "Assessment could not be found" },
      { status: 404 },
    );
  }

  const { data: scores, error: scoresError } = await supabase
    .from("assessment_scores")
    .select("score, gap_band, practice_areas(key, name)")
    .eq("assessment_id", assessment.id)
    .returns<ScoreRow[]>();

  if (scoresError || !scores || scores.length !== 10) {
    return NextResponse.json(
      { error: "Assessment scores are not ready" },
      { status: 409 },
    );
  }

  const organisation = first(assessment.organisations);
  const person = first(assessment.people);
  const row = {
    synced_at: new Date().toISOString(),
    assessment_id: assessment.id,
    completed_at: assessment.completed_at ?? "",
    organisation_name: organisation?.name ?? "",
    industry: organisation?.industry ?? "",
    revenue_band: organisation?.revenue_band ?? "",
    headcount_band: organisation?.headcount_band ?? "",
    first_name: person?.first_name ?? "",
    last_name: person?.last_name ?? "",
    email: person?.email ?? "",
    role: person?.role ?? "",
    gross_margin_band: assessment.gross_margin_band ?? "",
    cac_band: assessment.cac_band ?? "",
    ltv_band: assessment.ltv_band ?? "",
    ...buildScoreColumns(scores),
  };

  const response = await fetch(webhookUrl, {
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
      row,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: await response.text() },
      { status: 502 },
    );
  }

  if (!isManual) {
    return NextResponse.json({ synced: true });
  }

  return new NextResponse(
    "<!doctype html><title>Synced</title><body style=\"font-family: sans-serif; padding: 40px;\">Synced to Google Sheets.</body>",
    {
      headers: { "Content-Type": "text/html" },
    },
  );
}
