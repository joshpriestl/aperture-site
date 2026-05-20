import { auditScores } from "@/lib/content";
import { PanelFrame } from "@/components/stages/PanelFrame";

const ringClass = {
  green: "border-[#5f876d] text-[#35513f]",
  amber: "border-[#9b7a3d] text-[#60491e]",
  red: "border-[#9a5550] text-[#64302c]",
};

export function AuditPanel() {
  return (
    <PanelFrame title="Diagnostic - operational scoring">
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
    </PanelFrame>
  );
}
