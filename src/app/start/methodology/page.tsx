import Link from "next/link";

const scoreSteps = [
  {
    title: "Answers are normalised",
    body: "Yes and no answers become 100 or 0. Rating answers on the 1 to 5 scale become 0, 25, 50, 75 or 100. Inverted questions reverse the score where the symptom indicates drag.",
  },
  {
    title: "Each practice area is scored",
    body: "The Audit calculates a weighted average for each of the ten practice areas. Yes and no questions carry more weight because they identify whether a system exists at all.",
  },
  {
    title: "The Aperture Score is averaged",
    body: "The headline score is the average of the ten practice area scores. It is not a personality type, category or lead score. It is a practical read on operational maturity.",
  },
];

const costSteps = [
  {
    title: "Financial bands set the scale",
    body: "Revenue, team size, gross margin, customer acquisition cost and lifetime value are converted into conservative midpoints. If a financial answer is skipped, the model uses a default rather than pretending the number is exact.",
  },
  {
    title: "Gaps are priced by area",
    body: "Lower scores increase the estimated drag in areas where weak systems usually affect sales, delivery cost, customer retention, labour efficiency or technology waste.",
  },
  {
    title: "Strategy and data amplify the result",
    body: "Weak strategy and weak reporting make other gaps more expensive because teams make slower decisions and correct problems later.",
  },
  {
    title: "The range is bounded",
    body: "The final figure is shown as a low to high annual range. The high estimate is capped at 50% of the revenue midpoint so the report stays useful and defensible.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
          Aperture Methodology
        </p>
        <h1 className="mt-8 font-display text-[clamp(38px,7vw,72px)] font-normal leading-[1.04] text-ink">
          How the Audit calculates your score and cost of inaction.
        </h1>
        <p className="mt-6 max-w-[620px] text-[16px] leading-8 text-ink-soft">
          The Audit is designed to give a useful operating estimate, not an accounting opinion. It uses your answers, your financial bands and a fixed scoring model to show where operational drag is likely to be costing the business.
        </p>

        <section className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Aperture Score
          </p>
          <div className="mt-6 space-y-4">
            {scoreSteps.map((step, index) => (
              <MethodCard key={step.title} index={index + 1} {...step} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Cost of Inaction
          </p>
          <div className="mt-6 space-y-4">
            {costSteps.map((step, index) => (
              <MethodCard key={step.title} index={index + 1} {...step} />
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[24px] bg-base px-8 py-8 shadow-[8px_8px_20px_#c4c9cc,-8px_-8px_20px_#ffffff] sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            What the figure means
          </p>
          <p className="mt-5 text-[15px] leading-8 text-ink-soft">
            The estimate points to the annual value likely trapped in weak systems, delayed decisions and avoidable rework. Aperture Blueprint exists to test that estimate against your actual operating context and turn the priority gaps into a sequenced plan.
          </p>
        </section>

        <Link
          className="mt-12 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] text-card transition-opacity hover:opacity-85"
          href="/start"
        >
          Back to Audit
        </Link>
      </div>
    </main>
  );
}

function MethodCard({
  body,
  index,
  title,
}: {
  body: string;
  index: number;
  title: string;
}) {
  return (
    <article className="rounded-[18px] bg-base px-6 py-5 shadow-[inset_4px_4px_10px_#c4c9cc,inset_-4px_-4px_10px_#ffffff]">
      <div className="grid gap-4 sm:grid-cols-[42px_1fr]">
        <p className="font-mono text-[11px] text-ink-muted">
          {String(index).padStart(2, "0")}
        </p>
        <div>
          <h2 className="font-display text-[22px] font-normal leading-snug text-ink">
            {title}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-ink-soft">{body}</p>
        </div>
      </div>
    </article>
  );
}
