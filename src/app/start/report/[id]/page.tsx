import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentScore, getScorePracticeArea } from "@/lib/audit";
import { createSupabaseClient } from "@/lib/supabase";

type ReportStubPageProps = {
  params: {
    id: string;
  };
};

export default async function ReportStubPage({ params }: ReportStubPageProps) {
  let supabase;

  try {
    supabase = createSupabaseClient();
  } catch {
    return (
      <main className="min-h-screen bg-base px-5 py-12 text-ink sm:px-8">
        <section className="mx-auto max-w-[920px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            APERTURE AUDIT REPORT
          </p>
          <h1 className="mt-6 font-display text-[clamp(44px,8vw,88px)] font-normal leading-[1.02]">
            Supabase is not configured.
          </h1>
          <p className="mt-6 max-w-[620px] text-[16px] leading-7 text-ink-soft">
            Add the public Supabase URL and anon key in Vercel before loading reports.
          </p>
        </section>
      </main>
    );
  }

  const { data: assessment } = await supabase
    .from("assessments")
    .select("id, completed_at")
    .eq("id", params.id)
    .maybeSingle<{ id: string; completed_at: string | null }>();

  if (!assessment) {
    notFound();
  }

  const { data: scores, error } = await supabase
    .from("assessment_scores")
    .select(
      "id, assessment_id, practice_area_id, score, gap_band, practice_areas(id, name, display_order)",
    )
    .eq("assessment_id", params.id)
    .order("display_order", {
      referencedTable: "practice_areas",
      ascending: true,
    })
    .returns<AssessmentScore[]>();

  return (
    <main className="min-h-screen bg-base px-5 py-12 text-ink sm:px-8">
      <section className="mx-auto max-w-[920px]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE AUDIT REPORT
        </p>
        <h1 className="mt-6 font-display text-[clamp(44px,8vw,88px)] font-normal leading-[1.02]">
          Report wiring confirmed.
        </h1>
        <p className="mt-6 max-w-[620px] text-[16px] leading-7 text-ink-soft">
          Assessment {params.id}. Session 3 replaces this stub with the full report.
        </p>

        <div className="mt-10 rounded-[28px] bg-base p-5 shadow-[8px_8px_18px_#cbd0d3,-8px_-8px_18px_#ffffff] sm:p-6">
          {error ? (
            <p className="text-[15px] text-[#9c2f2f]">
              Scores could not load. Check Supabase access and table policies.
            </p>
          ) : (
            <div className="grid gap-3">
              {(scores ?? []).map((score, index) => {
                const practiceArea = getScorePracticeArea(score);

                return (
                  <div
                    className="grid grid-cols-[52px_1fr_auto] items-center gap-4 rounded-[18px] bg-base px-4 py-4 shadow-[inset_5px_5px_12px_#cbd0d3,inset_-5px_-5px_12px_#ffffff]"
                    key={score.id ?? score.practice_area_id}
                  >
                    <span className="font-mono text-[11px] text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-ink">
                      {practiceArea?.name ?? score.practice_area_id}
                    </span>
                    <span className="font-mono text-[13px] text-ink">
                      {score.score ?? "No score"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Link
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity duration-150 hover:opacity-85"
          href="/"
        >
          Back to Aperture
        </Link>
      </section>
    </main>
  );
}
