"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BlueprintQuestion } from "@/lib/blueprint";

type BlueprintArea = {
  id: string;
  name: string;
  score: number | null;
  gapBand: string | null;
  questions: BlueprintQuestion[];
};

type ExistingAnswer = {
  question_key: string;
  answer_value: unknown;
};

type BlueprintQuestionsFlowProps = {
  areas: BlueprintArea[];
  blueprintAssessmentId: string;
  existingAnswers: ExistingAnswer[];
};

type FlatQuestion = {
  area: BlueprintArea;
  question: BlueprintQuestion;
  key: string;
};

type AnswerMap = Record<string, string>;

export function BlueprintQuestionsFlow({
  areas,
  blueprintAssessmentId,
  existingAnswers,
}: BlueprintQuestionsFlowProps) {
  const router = useRouter();

  const questions = useMemo<FlatQuestion[]>(() => {
    return areas.flatMap((area) =>
      area.questions.map((question) => ({
        area,
        question,
        key: `${area.id}:${question.key}`,
      })),
    );
  }, [areas]);

  const initialAnswers = useMemo(() => {
    return existingAnswers.reduce<AnswerMap>((map, answer) => {
      if (typeof answer.answer_value === "string") {
        map[answer.question_key] = answer.answer_value;
      } else if (
        answer.answer_value &&
        typeof answer.answer_value === "object" &&
        "text" in answer.answer_value &&
        typeof answer.answer_value.text === "string"
      ) {
        map[answer.question_key] = answer.answer_value.text;
      }

      return map;
    }, {});
  }, [existingAnswers]);

  const firstMissing = questions.findIndex(
    (item) => !initialAnswers[item.key]?.trim(),
  );
  const [stepIndex, setStepIndex] = useState(
    firstMissing === -1 ? Math.max(0, questions.length - 1) : firstMissing,
  );
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const active = questions[stepIndex];
  const currentAnswer = active ? answers[active.key] ?? "" : "";
  const answeredCount = questions.filter((item) =>
    answers[item.key]?.trim(),
  ).length;
  const progressPercent = questions.length
    ? Math.round(((stepIndex + 1) / questions.length) * 100)
    : 0;
  const isLast = stepIndex === questions.length - 1;
  const canContinue = Boolean(currentAnswer.trim());
  const canSubmit =
    questions.length > 0 &&
    questions.every((item) => Boolean(answers[item.key]?.trim()));

  function updateAnswer(value: string) {
    if (!active) return;
    setAnswers((current) => ({ ...current, [active.key]: value }));
  }

  function next() {
    if (!canContinue) return;
    setStepIndex((current) => Math.min(questions.length - 1, current + 1));
  }

  function back() {
    setStepIndex((current) => Math.max(0, current - 1));
  }

  async function submit() {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    const payload = questions.map((item) => ({
      answerValue: answers[item.key].trim(),
      practiceAreaId: item.area.id,
      questionKey: item.key,
      questionLabel: item.question.label,
    }));

    const response = await fetch("/api/blueprint/questions", {
      body: JSON.stringify({
        answers: payload,
        blueprintAssessmentId,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(
        body?.error ?? "The Blueprint answers could not be saved. Retry submit.",
      );
      setIsSubmitting(false);
      return;
    }

    router.push("/blueprint/booking");
    router.refresh();
  }

  if (!active) {
    return (
      <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
        <section className="mx-auto max-w-[720px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            APERTURE BLUEPRINT
          </p>
          <h1 className="mt-6 font-display text-5xl font-normal">
            Blueprint questions are not ready.
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base px-4 py-4 text-ink sm:px-6 lg:py-6">
      <section className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[760px] flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            Aperture Blueprint
          </p>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            {String(stepIndex + 1).padStart(2, "0")} / {questions.length}
          </p>
        </div>

        <div className="mt-6 h-px bg-hairline">
          <div
            className="h-px bg-ink transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-1 flex-col py-5 sm:py-7">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {active.area.name}
            </p>
            <span className="rounded-full bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted ring-1 ring-hairline">
              Score {active.area.score ?? "N/A"}
            </span>
          </div>

          <h1 className="mt-4 max-w-[720px] font-display text-[clamp(28px,4.8vw,48px)] font-normal leading-[1.08]">
            {active.question.prompt}
          </h1>

          <div className="mt-6 rounded-[16px] bg-card p-3 ring-1 ring-hairline sm:p-4">
            <label
              className="sr-only"
              htmlFor="blueprint-answer"
            >
              {active.question.label}
            </label>
            <textarea
              className="min-h-[220px] w-full resize-none rounded-[12px] bg-base px-4 py-4 text-[15px] leading-7 text-ink shadow-[inset_4px_4px_10px_#c4c9cc,inset_-4px_-4px_10px_#ffffff] outline-none placeholder:text-ink-muted"
              id="blueprint-answer"
              onChange={(event) => updateAnswer(event.target.value)}
              placeholder={active.question.placeholder}
              value={currentAnswer}
            />
          </div>

          {error ? (
            <p className="mt-4 rounded-[12px] bg-[#f3dddd] px-4 py-3 text-[13px] text-[#7f2626]">
              {error}
            </p>
          ) : null}

          <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="min-h-5 text-[12px] text-ink-muted">
              {answeredCount} of {questions.length} answered
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="inline-flex h-10 items-center justify-center rounded-full border border-hairline px-5 text-[12px] text-ink-soft transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-35"
                disabled={stepIndex === 0 || isSubmitting}
                onClick={back}
                type="button"
              >
                Back
              </button>
              {isLast ? (
                <button
                  className="inline-flex h-10 items-center justify-center rounded-full bg-ink px-6 text-[12px] text-card transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
                  disabled={!canSubmit || isSubmitting}
                  onClick={() => void submit()}
                  type="button"
                >
                  {isSubmitting ? "Saving" : "Submit"}
                </button>
              ) : (
                <button
                  className="inline-flex h-10 items-center justify-center rounded-full bg-ink px-6 text-[12px] text-card transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
                  disabled={!canContinue || isSubmitting}
                  onClick={next}
                  type="button"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
