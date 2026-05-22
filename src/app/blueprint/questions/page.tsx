import Link from "next/link";
import { redirect } from "next/navigation";
import { getBlueprintQuestionsForArea } from "@/lib/blueprint";
import { createSupabaseClient } from "@/lib/supabase";
import { BlueprintQuestionsFlow } from "./questions-flow";

type Props = {
  searchParams: {
    blueprint_id?: string;
  };
};

type BlueprintAssessment = {
  id: string;
  assessment_id: string;
  paid: boolean;
  questions_complete: boolean;
};

type ScoreRow = {
  practice_area_id: string;
  score: number | null;
  gap_band: string | null;
  practice_areas:
    | { id: string; name: string; display_order: number }
    | { id: string; name: string; display_order: number }[]
    | null;
};

type BlueprintAnswer = {
  question_key: string;
  answer_value: unknown;
};

function getPracticeArea(row: ScoreRow) {
  if (!row.practice_areas) return null;
  return Array.isArray(row.practice_areas)
    ? row.practice_areas[0]
    : row.practice_areas;
}

export default async function BlueprintQuestionsPage({ searchParams }: Props) {
  const blueprintId = searchParams.blueprint_id;

  if (!blueprintId) {
    redirect("/start");
  }

  let supabase;

  try {
    supabase = createSupabaseClient();
  } catch {
    return <SupabaseMissingState />;
  }

  const { data: blueprintAssessment, error: blueprintError } = await supabase
    .from("blueprint_assessments")
    .select("id, assessment_id, paid, questions_complete")
    .eq("id", blueprintId)
    .maybeSingle<BlueprintAssessment>();

  if (blueprintError || !blueprintAssessment) {
    return <UnavailableState title="Blueprint not found." />;
  }

  if (!blueprintAssessment.paid) {
    return (
      <UnavailableState
        ctaHref="/start"
        ctaLabel="Back to Audit"
        title="Payment confirmation is still pending."
      />
    );
  }

  if (blueprintAssessment.questions_complete) {
    redirect("/blueprint/booking");
  }

  const { data: scores, error: scoresError } = await supabase
    .from("assessment_scores")
    .select("practice_area_id, score, gap_band, practice_areas(id, name, display_order)")
    .eq("assessment_id", blueprintAssessment.assessment_id)
    .order("score", { ascending: true })
    .returns<ScoreRow[]>();

  if (scoresError || !scores || scores.length === 0) {
    return (
      <UnavailableState
        title="Blueprint priorities are not available."
        body="Return to the Audit report and confirm the assessment has been scored."
      />
    );
  }

  const priorityAreas = scores.slice(0, 3).map((score) => {
    const practiceArea = getPracticeArea(score);
    const name = practiceArea?.name ?? score.practice_area_id;

    return {
      gapBand: score.gap_band,
      id: score.practice_area_id,
      name,
      questions: getBlueprintQuestionsForArea(name),
      score: score.score,
    };
  });

  const { data: existingAnswers } = await supabase
    .from("blueprint_answers")
    .select("question_key, answer_value")
    .eq("blueprint_assessment_id", blueprintAssessment.id)
    .returns<BlueprintAnswer[]>();

  return (
    <BlueprintQuestionsFlow
      areas={priorityAreas}
      blueprintAssessmentId={blueprintAssessment.id}
      existingAnswers={existingAnswers ?? []}
    />
  );
}

function SupabaseMissingState() {
  return (
    <UnavailableState
      body="Add the public Supabase URL and anon key in Vercel before running the Blueprint question flow."
      title="Supabase is not configured."
    />
  );
}

function UnavailableState({
  body,
  ctaHref,
  ctaLabel,
  title,
}: {
  body?: string;
  ctaHref?: string;
  ctaLabel?: string;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto max-w-[720px]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE BLUEPRINT
        </p>
        <h1 className="mt-6 font-display text-5xl font-normal">{title}</h1>
        {body ? (
          <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-ink-soft">
            {body}
          </p>
        ) : null}
        {ctaHref && ctaLabel ? (
          <Link
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity hover:opacity-85"
            href={ctaHref}
          >
            {ctaLabel}
          </Link>
        ) : null}
      </section>
    </main>
  );
}
