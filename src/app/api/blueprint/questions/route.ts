import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type SubmittedAnswer = {
  answerValue?: unknown;
  practiceAreaId?: unknown;
  questionKey?: unknown;
  questionLabel?: unknown;
};

type ValidSubmittedAnswer = {
  answerValue: string;
  practiceAreaId: string;
  questionKey: string;
  questionLabel: string;
};

type BlueprintAssessment = {
  id: string;
  paid: boolean;
};

function isSubmittedAnswer(answer: SubmittedAnswer): answer is ValidSubmittedAnswer {
  return (
    typeof answer.answerValue === "string" &&
    answer.answerValue.trim().length > 0 &&
    typeof answer.practiceAreaId === "string" &&
    answer.practiceAreaId.length > 0 &&
    typeof answer.questionKey === "string" &&
    answer.questionKey.length > 0 &&
    typeof answer.questionLabel === "string" &&
    answer.questionLabel.length > 0
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const blueprintAssessmentId = body?.blueprintAssessmentId;
  const answers = body?.answers;

  if (
    typeof blueprintAssessmentId !== "string" ||
    !Array.isArray(answers) ||
    answers.length !== 9 ||
    !answers.every(isSubmittedAnswer)
  ) {
    return NextResponse.json(
      { error: "Blueprint answer payload is invalid" },
      { status: 400 },
    );
  }

  const validAnswers = answers as ValidSubmittedAnswer[];

  let supabase;

  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Supabase admin client is not configured",
      },
      { status: 500 },
    );
  }

  const { data: blueprintAssessment, error: blueprintError } = await supabase
    .from("blueprint_assessments")
    .select("id, paid")
    .eq("id", blueprintAssessmentId)
    .maybeSingle<BlueprintAssessment>();

  if (blueprintError || !blueprintAssessment) {
    return NextResponse.json(
      { error: "Blueprint assessment could not be found" },
      { status: 404 },
    );
  }

  if (!blueprintAssessment.paid) {
    return NextResponse.json(
      { error: "Blueprint payment has not been confirmed" },
      { status: 402 },
    );
  }

  const rows = validAnswers.map((answer) => ({
    answer_value: { text: answer.answerValue.trim() },
    blueprint_assessment_id: blueprintAssessment.id,
    practice_area_id: answer.practiceAreaId,
    question_key: answer.questionKey,
    question_label: answer.questionLabel,
  }));

  const { error: answersError } = await supabase
    .from("blueprint_answers")
    .upsert(rows, {
      onConflict: "blueprint_assessment_id,question_key",
    });

  if (answersError) {
    console.error("Blueprint answers save failed", answersError);

    return NextResponse.json(
      {
        error: "Blueprint answers could not be saved",
        detail:
          process.env.NODE_ENV === "development"
            ? answersError.message
            : undefined,
      },
      { status: 500 },
    );
  }

  const { error: updateError } = await supabase
    .from("blueprint_assessments")
    .update({ questions_complete: true })
    .eq("id", blueprintAssessment.id);

  if (updateError) {
    console.error("Blueprint completion save failed", updateError);

    return NextResponse.json(
      {
        error: "Blueprint completion could not be saved",
        detail:
          process.env.NODE_ENV === "development"
            ? updateError.message
            : undefined,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
