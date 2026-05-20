import { auditScores } from "@/lib/content";

const ringClass = {
  green: "border-[#5f876d] text-[#35513f]",
  amber: "border-[#9b7a3d] text-[#60491e]",
  red: "border-[#9a5550] text-[#64302c]",
};

export function AuditPanel() {
  return (
    <div className="w-full rounded-[14px] bg-card p-5 shadow-panel ring-1 ring-white/70 sm:p-6">
      <p className="border-b border-hairline pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        DIAGNOSTIC - OPERATIONAL SCORING
      </p>
      <div className="pt-3">
        {auditScores.map((score) => (
          <div key={score.label} className="flex items-center justify-between border-b border-hairline py-3 last:border-0">
            <span className="font-mono text-[12px] text-ink-soft">{score.label}</span>
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 bg-card font-mono text-[11px] font-medium ${ringClass[score.tone]}`}
            >
              {score.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
