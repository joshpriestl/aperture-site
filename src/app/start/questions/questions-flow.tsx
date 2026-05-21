"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Assessment,
  Answer,
  FINANCIAL_QUESTIONS,
  FinancialKey,
  FinancialQuestion,
  Question,
  QuestionScreen,
} from "@/lib/audit";
import { createSupabaseClient } from "@/lib/supabase";

type QuestionsFlowProps = {
  assessment: Assessment;
  answers: Answer[];
  screens: QuestionScreen[];
};

type FlatQuestion = {
  areaName: string;
  areaOrder: number;
  question: Question;
  questionOrder: number;
};

type AnswerMap = Record<string, Pick<Answer, "answer_value" | "raw_response">>;
type SaveState = Record<string, "saving" | "saved" | "error">;
type FinancialMap = Record<FinancialKey, string>;

export function QuestionsFlow({
  assessment,
  answers,
  screens,
}: QuestionsFlowProps) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseClient(), []);

  const flatQuestions = useMemo<FlatQuestion[]>(() => {
    return screens.flatMap((screen) =>
      screen.questions.map((question, index) => ({
        areaName: screen.practiceArea.name,
        areaOrder: screen.practiceArea.display_order,
        question,
        questionOrder: index + 1,
      })),
    );
  }, [screens]);

  const initialAnswers = useMemo(() => {
    return answers.reduce<AnswerMap>((map, answer) => {
      map[answer.question_id] = {
        answer_value: answer.answer_value,
        raw_response: answer.raw_response,
      };
      return map;
    }, {});
  }, [answers]);

  const [answerMap, setAnswerMap] = useState<AnswerMap>(initialAnswers);
  const [saveState, setSaveState] = useState<SaveState>({});
  const [financials, setFinancials] = useState<FinancialMap>({
    gross_margin_band: assessment.gross_margin_band ?? "",
    cac_band: assessment.cac_band ?? "",
    ltv_band: assessment.ltv_band ?? "",
  });
  const [financialSaveState, setFinancialSaveState] = useState<
    Record<FinancialKey, "idle" | "saved" | "error">
  >({
    gross_margin_band: "idle",
    cac_band: "idle",
    ltv_band: "idle",
  });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const totalSteps = flatQuestions.length + FINANCIAL_QUESTIONS.length;

  const resumeStep = useMemo(() => {
    const firstUnansweredQuestion = flatQuestions.findIndex(
      (item) => !initialAnswers[item.question.id],
    );

    if (firstUnansweredQuestion !== -1) {
      return firstUnansweredQuestion;
    }

    const firstMissingFinancial = FINANCIAL_QUESTIONS.findIndex(
      (question) => !assessment[question.key],
    );

    return firstMissingFinancial === -1
      ? Math.max(0, totalSteps - 1)
      : flatQuestions.length + firstMissingFinancial;
  }, [assessment, flatQuestions, initialAnswers, totalSteps]);

  const [stepIndex, setStepIndex] = useState(resumeStep);
  const activeQuestion = flatQuestions[stepIndex];
  const financialIndex = stepIndex - flatQuestions.length;
  const activeFinancial =
    financialIndex >= 0 ? FINANCIAL_QUESTIONS[financialIndex] : null;
  const currentStepNumber = stepIndex + 1;
  const progressPercent = totalSteps
    ? Math.round((currentStepNumber / totalSteps) * 100)
    : 0;

  const canContinue = activeQuestion
    ? Boolean(answerMap[activeQuestion.question.id])
    : activeFinancial
      ? Boolean(financials[activeFinancial.key])
      : false;

  async function saveAnswer(question: Question, rawResponse: string) {
    const answerValue =
      question.format === "yes_no"
        ? rawResponse === "yes"
          ? 100
          : 0
        : Number(rawResponse);

    setAnswerMap((current) => ({
      ...current,
      [question.id]: {
        answer_value: answerValue,
        raw_response: rawResponse,
      },
    }));
    setSaveState((current) => ({ ...current, [question.id]: "saving" }));

    const payload = {
      assessment_id: assessment.id,
      question_id: question.id,
      answer_value: answerValue,
      raw_response: rawResponse,
    };

    const upsertResult = await supabase
      .from("answers")
      .upsert(payload, { onConflict: "assessment_id,question_id" });

    if (!upsertResult.error) {
      setSaveState((current) => ({ ...current, [question.id]: "saved" }));
      return true;
    }

    const { data: existing } = await supabase
      .from("answers")
      .select("id")
      .eq("assessment_id", assessment.id)
      .eq("question_id", question.id)
      .maybeSingle<{ id: string }>();

    const fallbackResult = existing
      ? await supabase.from("answers").update(payload).eq("id", existing.id)
      : await supabase.from("answers").insert(payload);

    const didSave = !fallbackResult.error;

    setSaveState((current) => ({
      ...current,
      [question.id]: didSave ? "saved" : "error",
    }));

    return didSave;
  }

  async function saveFinancial(key: FinancialKey, value: string) {
    setFinancials((current) => ({ ...current, [key]: value }));
    setFinancialSaveState((current) => ({ ...current, [key]: "idle" }));

    const { error } = await supabase
      .from("assessments")
      .update({ [key]: value })
      .eq("id", assessment.id);

    setFinancialSaveState((current) => ({
      ...current,
      [key]: error ? "error" : "saved",
    }));

    return !error;
  }

  async function triggerScoring() {
    const configuredRpc = process.env.NEXT_PUBLIC_SUPABASE_SCORING_RPC;
    const rpcCandidates = [
      configuredRpc,
      "compute_assessment_scores",
      "score_assessment",
      "calculate_assessment_scores",
      "compute_scores",
    ].filter(Boolean) as string[];

    for (const rpcName of rpcCandidates) {
      const result = await supabase.rpc(rpcName, {
        p_assessment_id: assessment.id,
      });

      if (!result.error) {
        return;
      }
    }

    const configuredEdgeFunction =
      process.env.NEXT_PUBLIC_SUPABASE_SCORING_EDGE_FUNCTION;
    const edgeCandidates = [
      configuredEdgeFunction,
      "score-assessment",
      "compute-scores",
      "calculate-scores",
    ].filter(Boolean) as string[];

    for (const functionName of edgeCandidates) {
      const result = await supabase.functions.invoke(functionName, {
        body: { assessment_id: assessment.id },
      });

      if (!result.error) {
        return;
      }
    }

    throw new Error("Scoring function was not found or did not return cleanly.");
  }

  async function submitAssessment() {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const { error: assessmentError } = await supabase
      .from("assessments")
      .update({
        ...financials,
        completed_at: new Date().toISOString(),
      })
      .eq("id", assessment.id);

    if (assessmentError) {
      setSubmitError("The final answers could not be saved. Retry submit.");
      setIsSubmitting(false);
      return;
    }

    try {
      await triggerScoring();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Scoring failed. Retry submit.",
      );
      setIsSubmitting(false);
      return;
    }

    const { count, error: scoreError } = await supabase
      .from("assessment_scores")
      .select("id", { count: "exact", head: true })
      .eq("assessment_id", assessment.id);

    if (scoreError || count !== 10) {
      setSubmitError("Scoring did not return 10 practice area rows. Retry submit.");
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch("/api/sheets/sync", {
        body: JSON.stringify({ assessment_id: assessment.id }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    } catch {
      // CRM sync is non-blocking; the report should still load.
    }

    router.push(`/start/report/${assessment.id}`);
  }

  function next() {
    if (!canContinue) {
      return;
    }

    if (stepIndex === totalSteps - 1) {
      void submitAssessment();
      return;
    }

    setStepIndex((current) => Math.min(totalSteps - 1, current + 1));
  }

  function back() {
    setStepIndex((current) => Math.max(0, current - 1));
  }

  async function answerAndAdvance(question: Question, rawResponse: string) {
    if (isAdvancing) {
      return;
    }

    setIsAdvancing(true);
    const didSave = await saveAnswer(question, rawResponse);

    if (didSave) {
      setStepIndex((current) => Math.min(totalSteps - 1, current + 1));
    }

    setIsAdvancing(false);
  }

  async function selectFinancialAndAdvance(key: FinancialKey, value: string) {
    if (isAdvancing) {
      return;
    }

    setIsAdvancing(true);
    const didSave = await saveFinancial(key, value);

    if (didSave && stepIndex < totalSteps - 1) {
      setStepIndex((current) => Math.min(totalSteps - 1, current + 1));
    }

    setIsAdvancing(false);
  }

  return (
    <main className="min-h-screen bg-base px-4 py-4 text-ink sm:px-6 lg:py-6">
      <section className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[760px] flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            Aperture Audit
          </p>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            {String(currentStepNumber).padStart(2, "0")} / {totalSteps}
          </p>
        </div>

        <div className="mt-6 h-px bg-hairline">
          <div
            className="h-px bg-ink transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {activeQuestion ? (
          <QuestionStep
            answer={answerMap[activeQuestion.question.id]?.raw_response}
            canGoBack={stepIndex > 0}
            isAdvancing={isAdvancing}
            item={activeQuestion}
            onAnswer={(rawResponse) =>
              void answerAndAdvance(activeQuestion.question, rawResponse)
            }
            onBack={back}
            onNext={next}
            saveState={saveState[activeQuestion.question.id]}
            stepNumber={currentStepNumber}
            totalSteps={totalSteps}
          />
        ) : activeFinancial ? (
          <FinancialStep
            financials={financials}
            financialSaveState={financialSaveState}
            isAdvancing={isAdvancing}
            isLast={stepIndex === totalSteps - 1}
            isSubmitting={isSubmitting}
            onBack={back}
            onNext={next}
            onSelect={selectFinancialAndAdvance}
            question={activeFinancial}
            stepNumber={currentStepNumber}
            submitError={submitError}
            totalSteps={totalSteps}
          />
        ) : (
          <EmptyState />
        )}
      </section>
    </main>
  );
}

function QuestionStep({
  answer,
  canGoBack,
  isAdvancing,
  item,
  onAnswer,
  onBack,
  onNext,
  saveState,
  stepNumber,
  totalSteps,
}: {
  answer?: string;
  canGoBack: boolean;
  isAdvancing: boolean;
  item: FlatQuestion;
  onAnswer: (rawResponse: string) => void;
  onBack: () => void;
  onNext: () => void;
  saveState?: "saving" | "saved" | "error";
  stepNumber: number;
  totalSteps: number;
}) {
  return (
    <div className="flex flex-1 flex-col py-5 sm:py-7">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
        {String(item.areaOrder).padStart(2, "0")} / {item.areaName}
      </p>
      <h1 className="mt-4 max-w-[720px] font-display text-[clamp(26px,4.6vw,46px)] font-normal leading-[1.08]">
        {item.question.question_text}
      </h1>

      <div className="mt-6 rounded-[16px] bg-card p-3 ring-1 ring-hairline sm:p-4">
        {item.question.format === "yes_no" ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {["yes", "no"].map((option) => (
              <button
                className={choiceClass(answer === option)}
                disabled={isAdvancing}
                key={option}
                onClick={() => onAnswer(option)}
                type="button"
              >
                {option === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-5 gap-2">
              {["1", "2", "3", "4", "5"].map((option) => (
                <button
                  className={choiceClass(answer === option)}
                  disabled={isAdvancing}
                  key={option}
                  onClick={() => onAnswer(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-between gap-4 text-[11px] text-ink-muted">
              <span>Strongly disagree</span>
              <span>Strongly agree</span>
            </div>
          </div>
        )}
      </div>

      <StepFooter
        canContinue={Boolean(answer)}
        canGoBack={canGoBack}
        isLast={stepNumber === totalSteps}
        isSubmitting={isAdvancing}
        onBack={onBack}
        onNext={onNext}
        saveState={saveState}
        showContinue={Boolean(answer)}
      />
    </div>
  );
}

function FinancialStep({
  financials,
  financialSaveState,
  isAdvancing,
  isLast,
  isSubmitting,
  onBack,
  onNext,
  onSelect,
  question,
  stepNumber,
  submitError,
  totalSteps,
}: {
  financials: FinancialMap;
  financialSaveState: Record<FinancialKey, "idle" | "saved" | "error">;
  isAdvancing: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSelect: (key: FinancialKey, value: string) => void;
  question: FinancialQuestion;
  stepNumber: number;
  submitError: string;
  totalSteps: number;
}) {
  const selected = financials[question.key];
  const saveState = financialSaveState[question.key];

  return (
    <div className="flex flex-1 flex-col py-5 sm:py-7">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
        Financial context / {question.code}
      </p>
      <h1 className="mt-4 max-w-[720px] font-display text-[clamp(26px,4.6vw,46px)] font-normal leading-[1.08]">
        {question.title}
      </h1>
      <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-ink-soft">
        Three final inputs help size the cost of operational drag.
      </p>

      <div className="mt-5 grid gap-2 rounded-[16px] bg-card p-3 ring-1 ring-hairline sm:p-4">
        {question.options.map((option) => (
          <button
            className={[
              "min-h-[50px] rounded-[11px] px-3 py-2 text-left transition disabled:cursor-wait disabled:opacity-70",
              selected === option.value
                ? "bg-ink text-card"
                : "bg-base text-ink ring-1 ring-hairline hover:bg-surface",
            ].join(" ")}
            disabled={isAdvancing || isSubmitting}
            key={option.value}
            onClick={() => void onSelect(question.key, option.value)}
            type="button"
          >
            <span className="block text-[13px] font-medium">{option.label}</span>
            <span
              className={[
                "mt-0.5 block text-[11px] leading-4",
                selected === option.value ? "text-card/72" : "text-ink-muted",
              ].join(" ")}
            >
              {option.guidance}
            </span>
          </button>
        ))}
      </div>

      {submitError ? (
        <p className="mt-4 rounded-[12px] bg-[#f3dddd] px-4 py-3 text-[13px] text-[#7f2626]">
          {submitError}
        </p>
      ) : null}

      <StepFooter
        canContinue={Boolean(selected)}
        canGoBack={true}
        isLast={isLast || stepNumber === totalSteps}
        isSubmitting={isSubmitting || isAdvancing}
        onBack={onBack}
        onNext={onNext}
        saveState={saveState === "idle" ? undefined : saveState}
        showContinue={Boolean(selected)}
      />
    </div>
  );
}

function StepFooter({
  canContinue,
  canGoBack,
  isLast,
  isSubmitting,
  onBack,
  onNext,
  saveState,
  showContinue,
}: {
  canContinue: boolean;
  canGoBack: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  saveState?: "saving" | "saved" | "error";
  showContinue: boolean;
}) {
  return (
    <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-h-5 text-[12px] text-ink-muted">
        {saveState === "error" ? (
          <span className="text-[#9c2f2f]">Could not save. Retry this answer.</span>
        ) : saveState === "saving" ? (
          "Saving"
        ) : saveState === "saved" ? (
          "Saved"
        ) : null}
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="inline-flex h-10 items-center justify-center rounded-full border border-hairline px-5 text-[12px] text-ink-soft transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-35"
          disabled={!canGoBack || isSubmitting}
          onClick={onBack}
          type="button"
        >
          Back
        </button>
        {showContinue ? (
          <button
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink px-6 text-[12px] text-card transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
            disabled={!canContinue || isSubmitting}
            onClick={onNext}
            type="button"
          >
            {isSubmitting ? "Saving" : isLast ? "Submit" : "Next"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-20 rounded-[18px] bg-card p-8 ring-1 ring-hairline">
      <h1 className="font-display text-4xl font-normal">Questions not found.</h1>
      <p className="mt-4 text-ink-soft">
        Check that question version 2 is seeded in Supabase.
      </p>
    </div>
  );
}

function choiceClass(selected: boolean) {
  return [
    "min-h-[52px] rounded-[11px] px-3 text-[14px] font-medium transition disabled:cursor-wait disabled:opacity-70",
    selected
      ? "bg-ink text-card"
      : "bg-base text-ink ring-1 ring-hairline hover:bg-surface",
  ].join(" ");
}
