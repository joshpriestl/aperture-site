import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase";

// ── Practice area UUIDs ────────────────────────────────────────────────────────

const PA = {
  strategy:   "5c9ac703-af9c-4109-b19f-13ad4f13f377",
  revenue:    "d468f278-79c0-4178-8d74-1ebc88f11b43",
  marketing:  "a0195e0e-a0bb-4c67-9f43-25b4d34418cb",
  brand:      "4a892784-84cd-4547-9e52-d5ccb895d904",
  operations: "68d7af8a-872c-473c-b6ec-ed8a71fef683",
  ai:         "ab5c041a-7dbb-4dd2-a474-a49652916883",
  data:       "29d92313-f013-4a09-aa14-5edba23472c6",
  people:     "b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2",
  tech:       "e049373e-b848-4ea2-a1f3-234af414d5c3",
  cx:         "cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e",
} as const;

// ── Band midpoint maps ─────────────────────────────────────────────────────────

const REVENUE_MID: Record<string, number> = {
  "Below $500K":  250_000,
  "$500K to $1M": 750_000,
  "$1M to $3M":   2_000_000,
  "$3M to $10M":  6_500_000,
  "$10M to $25M": 17_500_000,
  "Above $25M":   35_000_000,
};

const HEADCOUNT_MID: Record<string, number> = {
  "1 to 5":     3,
  "6 to 15":    10,
  "16 to 50":   33,
  "51 to 100":  75,
  "101 to 250": 175,
  "Above 250":  350,
};

const GROSS_MARGIN_MID: Record<string, number> = {
  under_20:    0.10,
  "20_to_40":  0.30,
  "40_to_60":  0.50,
  "60_to_80":  0.70,
  over_80:     0.875,
};

const CAC_MID: Record<string, number> = {
  under_100:       50,
  "100_to_500":    300,
  "500_to_2000":   1_250,
  "2000_to_10000": 6_000,
  over_10000:      15_000,
};

const LTV_MID: Record<string, number> = {
  under_1000:       500,
  "1000_to_10000":  5_500,
  "10000_to_100000": 55_000,
  "100000_to_1m":   550_000,
  over_1m:          1_500_000,
};

const SKIPPED = new Set(["not_sure", "rather_not_say"]);

// ── Gap band labels ────────────────────────────────────────────────────────────

const GAP_LABELS: Record<string, string> = {
  critical:   "Critical",
  vulnerable: "Vulnerable",
  capable:    "Capable",
  strong:     "Strong",
};

// ── Types ──────────────────────────────────────────────────────────────────────

type ScoreRow = {
  practice_area_id: string;
  score: number | null;
  gap_band: string | null;
  practice_areas: { id: string; name: string; display_order: number } | { id: string; name: string; display_order: number }[] | null;
};

type Finding = {
  practice_area_id: string;
  trigger_question_id: string | null;
  trigger_condition: string | null;
  gap_band: string | null;
  severity: string;
  finding_text: string;
};

type AnswerQuestion = {
  format: string;
  is_inverted: boolean;
  practice_area_id: string;
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)         return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

function getPracticeArea(row: ScoreRow) {
  if (!row.practice_areas) return null;
  return Array.isArray(row.practice_areas) ? row.practice_areas[0] : row.practice_areas;
}

function getAnswerQuestion(
  questions: AnswerQuestion | AnswerQuestion[] | null,
) {
  if (!questions) return null;
  return Array.isArray(questions) ? questions[0] : questions;
}

function computeCOI(
  revenueBand: string | null,
  headcountBand: string | null,
  grossMarginBand: string | null,
  cacBand: string | null,
  ltvBand: string | null,
  scoreMap: Record<string, number>,
): { low: number; high: number; tier: 1 | 2 | 3 } {
  const grossSkipped = !grossMarginBand || SKIPPED.has(grossMarginBand);
  const cacSkipped   = !cacBand         || SKIPPED.has(cacBand);
  const ltvSkipped   = !ltvBand         || SKIPPED.has(ltvBand);
  const tier: 1 | 2 | 3 =
    grossSkipped && cacSkipped && ltvSkipped ? 3 :
    grossSkipped || cacSkipped || ltvSkipped ? 2 : 1;

  const rev = REVENUE_MID[revenueBand ?? ""]   ?? 750_000;
  const hc  = HEADCOUNT_MID[headcountBand ?? ""] ?? 10;
  const gm  = GROSS_MARGIN_MID[grossMarginBand ?? ""] ?? 0.40;
  const cac = CAC_MID[cacBand ?? ""]           ?? 1_250;
  const ltv = LTV_MID[ltvBand ?? ""]           ?? 5_500;

  const newCusts = Math.max(10, Math.round(rev / ltv));
  const gap = (id: string) => (100 - (scoreMap[id] ?? 50)) / 100;

  const base =
    gap(PA.revenue)    * ((rev * 0.15) + (ltv * newCusts * 0.10))                             * 1.0 +
    gap(PA.marketing)  * ((cac * newCusts * 0.40) + (rev * 0.05))                             * 0.9 +
    gap(PA.brand)      * ((cac * newCusts * 0.20) + (rev * 0.04))                             * 0.6 +
    gap(PA.operations) * ((rev * (1 - gm) * 0.20) + (rev * 0.05))                            * 0.8 +
    gap(PA.ai)         * ((rev * 0.06) + (hc * 50_000 * 0.10) + (rev * (1 - gm) * 0.08))    * 0.7 +
    gap(PA.people)     * ((hc * 50_000 * 0.20) + (rev * 0.03))                               * 0.8 +
    gap(PA.tech)       * ((rev * (1 - gm) * 0.08) + (hc * 50_000 * 0.05))                   * 0.6 +
    gap(PA.cx)         * ((ltv * newCusts * 0.15) + (rev * 0.04))                            * 0.9;

  const stratAmp = 1 + ((100 - (scoreMap[PA.strategy] ?? 50)) / 100 * 0.15);
  const dataAmp  = 1 + ((100 - (scoreMap[PA.data]     ?? 50)) / 100 * 0.12);
  const mid = base * stratAmp * dataAmp;

  let low  = mid * 0.75;
  let high = mid * 1.25;

  const cap = rev * 0.50;
  if (high > cap) {
    const ratio = cap / high;
    high = cap;
    low  = low * ratio;
  }

  return { low: Math.round(low), high: Math.round(high), tier };
}

const SEV: Record<string, number> = { high: 0, medium: 1, low: 2 };

function selectFindings(
  all: Finding[],
  areaId: string,
  gapBand: string | null,
  fired: Map<string, string>,
  max = 4,
): Finding[] {
  const area = all.filter(f => f.practice_area_id === areaId);

  const questionTied = area.filter(f =>
    f.trigger_question_id !== null &&
    fired.get(f.trigger_question_id) === f.trigger_condition,
  );

  const bandBased = area.filter(f =>
    f.trigger_question_id === null && f.gap_band === gapBand,
  );

  const seen = new Set<string>();
  const combined: Finding[] = [];
  for (const f of [...questionTied, ...bandBased]) {
    if (combined.length >= max) break;
    const key = f.finding_text;
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(f);
    }
  }

  return combined.sort((a, b) => (SEV[a.severity] ?? 2) - (SEV[b.severity] ?? 2));
}

// ── Page ───────────────────────────────────────────────────────────────────────

type Props = { params: { id: string } };

export default async function ReportPage({ params }: Props) {
  let supabase;
  try {
    supabase = createSupabaseClient();
  } catch {
    return (
      <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
        <div className="mx-auto max-w-[760px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Aperture Audit Report
          </p>
          <h1 className="mt-6 font-display text-[40px] font-normal text-ink">
            Supabase is not configured.
          </h1>
        </div>
      </main>
    );
  }

  const { data: assessment } = await supabase
    .from("assessments")
    .select("id, completed_at, gross_margin_band, cac_band, ltv_band, organisations(revenue_band, headcount_band)")
    .eq("id", params.id)
    .maybeSingle();

  if (!assessment) notFound();

  const org = Array.isArray(assessment.organisations)
    ? assessment.organisations[0]
    : assessment.organisations as { revenue_band: string | null; headcount_band: string | null } | null;

  const { data: scores } = await supabase
    .from("assessment_scores")
    .select("practice_area_id, score, gap_band, practice_areas(id, name, display_order)")
    .eq("assessment_id", params.id)
    .order("display_order", { referencedTable: "practice_areas", ascending: true })
    .returns<ScoreRow[]>();

  if (!scores || scores.length === 0) notFound();

  // Build maps
  const scoreMap: Record<string, number> = {};
  for (const s of scores) scoreMap[s.practice_area_id] = s.score ?? 50;

  // Aperture Score
  const apertureScore = Math.round(
    scores.reduce((sum, s) => sum + (s.score ?? 0), 0) / scores.length,
  );

  // COI
  const { low: coiLow, high: coiHigh, tier: coiTier } = computeCOI(
    org?.revenue_band ?? null,
    org?.headcount_band ?? null,
    assessment.gross_margin_band,
    assessment.cac_band,
    assessment.ltv_band,
    scoreMap,
  );

  // Priority areas - 3 lowest scoring
  const priorityScores = [...scores]
    .sort((a, b) => (a.score ?? 100) - (b.score ?? 100))
    .slice(0, 3);
  const priorityAreaIds = priorityScores.map(s => s.practice_area_id);

  // Fetch answers with joined question metadata
  const { data: rawAnswers } = await supabase
    .from("answers")
    .select("question_id, answer_value, raw_response, questions(format, is_inverted, practice_area_id)")
    .eq("assessment_id", params.id);

  // Determine which questions fired a trigger condition
  const fired = new Map<string, string>();
  for (const a of rawAnswers ?? []) {
    const q = getAnswerQuestion(a.questions as AnswerQuestion | AnswerQuestion[] | null);
    if (!q || !priorityAreaIds.includes(q.practice_area_id)) continue;
    const resp = (a.raw_response ?? "").toLowerCase();
    if (q.format === "yes_no" && !q.is_inverted && resp === "no") {
      fired.set(a.question_id, "failed_yes_no");
    } else if (q.format === "yes_no" && q.is_inverted && resp === "yes") {
      fired.set(a.question_id, "inverted_failed");
    } else if (q.format === "rating_1_5" && (a.answer_value ?? 5) <= 2) {
      fired.set(a.question_id, "low_rating");
    }
  }

  // Fetch all findings - 140 rows, filter in TypeScript (avoids .in() PostgREST issue)
  const { data: allFindings } = await supabase
    .from("findings_library")
    .select("practice_area_id, trigger_question_id, trigger_condition, gap_band, severity, finding_text")
    .returns<Finding[]>();

  // Assemble priority levers with findings
  const levers = priorityScores.map(s => ({
    score: s,
    pa: getPracticeArea(s),
    findings: selectFindings(allFindings ?? [], s.practice_area_id, s.gap_band ?? null, fired),
  }));

  // COI sentence
  const areaNames = levers.map(l => l.pa?.name ?? "").filter(Boolean);
  const areasText =
    areaNames.length >= 3
      ? `${areaNames[0]}, ${areaNames[1]} and ${areaNames[2]}`
      : areaNames.join(", ");

  const coiSentences: Record<number, string> = {
    1: `Based on your revenue and the gaps in ${areasText}, you are likely losing ${fmt(coiLow)} to ${fmt(coiHigh)} per year.`,
    2: `Based on your inputs and the gaps in ${areasText}, you are likely losing ${fmt(coiLow)} to ${fmt(coiHigh)} per year. Some figures used sector defaults where you did not have the number to hand.`,
    3: `Based on your revenue and the gaps in ${areasText}, you are likely losing an estimated ${fmt(coiLow)} to ${fmt(coiHigh)} per year. Aperture Blueprint calibrates this figure against your actual business economics.`,
  };
  const coiSentence = coiSentences[coiTier];

  // Date
  const completedDate = assessment.completed_at
    ? new Date(assessment.completed_at).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <div className="mx-auto max-w-[760px]">

        {/* Report label */}
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
          Aperture Audit Report
        </p>

        {/* ── 1. Aperture Score ──────────────────────────────────────────────── */}
        <section className="mt-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Aperture Score
          </p>
          <p className="mt-2 font-display text-[clamp(88px,20vw,148px)] font-normal leading-none text-ink">
            {apertureScore}
          </p>
          <p className="mt-2 text-[13px] text-ink-muted">out of 100</p>
        </section>

        {/* ── 2. Cost of Inaction ────────────────────────────────────────────── */}
        <section className="mt-14">
          <div className="rounded-[24px] bg-base px-8 py-8 shadow-[8px_8px_20px_#c4c9cc,-8px_-8px_20px_#ffffff] sm:px-10 sm:py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Cost of Inaction
            </p>
            <p className="mt-4 font-display text-[clamp(36px,9vw,76px)] font-normal leading-none text-ink">
              {fmt(coiLow)} to {fmt(coiHigh)}
            </p>
            <p className="mt-1.5 font-mono text-[11px] text-ink-muted">per year</p>
            <p className="mt-6 max-w-[520px] text-[15px] leading-[1.75] text-ink-soft">
              {coiSentence}
            </p>
            <Link
              className="mt-5 inline-flex text-[12px] text-ink-muted underline underline-offset-2 transition-colors hover:text-ink"
              href="/start/methodology"
            >
              How this is calculated
            </Link>
          </div>
        </section>

        {/* ── 3. Heat Map ────────────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            The Ten Practice Areas
          </p>
          <div className="mt-6 space-y-2.5">
            {scores.map((s, i) => {
              const pa = getPracticeArea(s);
              return (
                <div
                  key={s.practice_area_id}
                  className="rounded-[14px] bg-base px-5 py-4 shadow-[inset_4px_4px_10px_#c4c9cc,inset_-4px_-4px_10px_#ffffff]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[11px] text-ink-muted mt-0.5 w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display text-[15px] leading-snug text-ink">
                          {pa?.name ?? s.practice_area_id}
                        </p>
                        {s.gap_band && (
                          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                            {GAP_LABELS[s.gap_band] ?? s.gap_band}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-[15px] text-ink shrink-0 mt-0.5">
                      {s.score ?? "N/A"}
                    </span>
                  </div>
                  <div className="mt-3 ml-9 h-[2px] rounded-none bg-hairline overflow-hidden">
                    <div
                      className="h-full bg-ink"
                      style={{ width: `${s.score ?? 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. Priority Levers ─────────────────────────────────────────────── */}
        <section className="mt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Priority Levers
          </p>
          <h2 className="mt-2 font-display text-[clamp(24px,5vw,34px)] font-normal leading-snug text-ink">
            The three areas costing you the most
          </h2>

          <div className="mt-10 space-y-14">
            {levers.map(({ score: s, pa, findings }) => (
              <div key={s.practice_area_id}>
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
                  <h3 className="font-display text-[clamp(19px,4vw,24px)] font-normal text-ink">
                    {pa?.name ?? s.practice_area_id}
                  </h3>
                  <div className="flex items-baseline gap-3 shrink-0">
                    <span className="font-mono text-[14px] text-ink">
                      {s.score ?? "N/A"}
                    </span>
                    {s.gap_band && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                        {GAP_LABELS[s.gap_band] ?? s.gap_band}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  {findings.length > 0 ? (
                    findings.map((f, fi) => (
                      <p key={fi} className="text-[15px] leading-[1.8] text-ink-soft">
                        {f.finding_text}
                      </p>
                    ))
                  ) : (
                    <p className="text-[15px] leading-[1.8] text-ink-soft">
                      Performance in this area is solid. The priority is maintaining the current standard as the business scales.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. What Now ────────────────────────────────────────────────────── */}
        <section className="mt-20 rounded-[24px] bg-base px-8 py-10 shadow-[8px_8px_20px_#c4c9cc,-8px_-8px_20px_#ffffff] sm:px-10 sm:py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            What Now
          </p>
          <h2 className="mt-4 font-display text-[clamp(22px,4.5vw,30px)] font-normal leading-snug text-ink">
            Turn the audit into a plan.
          </h2>
          <p className="mt-4 max-w-[500px] text-[15px] leading-[1.8] text-ink-soft">
            Aperture Blueprint is a four-hour working session with the Aperture team. We take the gaps
            the Audit surfaced, build a sequenced 90-day roadmap to close them, and produce a working
            document you can hand to your team the next day. Priced at $199.
          </p>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a
              className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 font-sans text-[14px] font-medium text-card transition-opacity hover:opacity-80"
              href={`/blueprint/checkout?assessment_id=${params.id}`}
            >
              Book Aperture Blueprint
            </a>
            <p className="text-[13px] text-ink-muted">
              Or reply to your report email with the score that surprised you most.
            </p>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <footer className="mt-16 flex items-center justify-between border-t border-hairline pt-6 pb-10">
          <p className="font-mono text-[11px] text-ink-muted">
            Aperture by Selborne King
          </p>
          {completedDate && (
            <p className="font-mono text-[11px] text-ink-muted">{completedDate}</p>
          )}
        </footer>

      </div>
    </main>
  );
}
