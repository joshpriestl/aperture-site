import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import { Assessment, Question, groupQuestionsIntoScreens } from "@/lib/audit";
import { QuestionsFlow } from "./questions-flow";

type QuestionsPageProps = {
  searchParams: {
    assessment_id?: string;
  };
};

export default async function QuestionsPage({ searchParams }: QuestionsPageProps) {
  const assessmentId = searchParams.assessment_id;

  if (!assessmentId) {
    redirect("/start/details");
  }

  let supabase;

  try {
    supabase = createSupabaseClient();
  } catch {
    return <SupabaseMissingState />;
  }

  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .select("id, completed_at, gross_margin_band, cac_band, ltv_band")
    .eq("id", assessmentId)
    .maybeSingle<Assessment>();

  if (assessmentError || !assessment) {
    redirect("/start/details?error=assessment_not_found");
  }

  if (assessment.completed_at) {
    redirect(`/start/report/${assessment.id}`);
  }

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select(
      "id, practice_area_id, question_text, format, weight, is_inverted, question_version, display_order, practice_areas(id, name, display_order)",
    )
    .eq("question_version", 2)
    .order("display_order", {
      referencedTable: "practice_areas",
      ascending: true,
    })
    .order("display_order", { ascending: true })
    .returns<Question[]>();

  const { data: answers, error: answersError } = await supabase
    .from("answers")
    .select("id, assessment_id, question_id, answer_value, raw_response")
    .eq("assessment_id", assessment.id);

  if (questionsError || answersError) {
    return (
      <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
        <section className="mx-auto max-w-[720px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            APERTURE AUDIT
          </p>
          <h1 className="mt-6 font-display text-5xl font-normal">
            The question flow could not load.
          </h1>
          <p className="mt-5 text-ink-soft">
            Refresh the page. If it fails again, check Supabase access and table policies.
          </p>
        </section>
      </main>
    );
  }

  return (
    <QuestionsFlow
      assessment={assessment}
      answers={answers ?? []}
      screens={groupQuestionsIntoScreens(questions ?? [])}
    />
  );
}

function SupabaseMissingState() {
  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto max-w-[720px]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE AUDIT
        </p>
        <h1 className="mt-6 font-display text-5xl font-normal">
          Supabase is not configured.
        </h1>
        <p className="mt-5 text-ink-soft">
          Add the public Supabase URL and anon key in Vercel before running the question flow.
        </p>
      </section>
    </main>
  );
}
