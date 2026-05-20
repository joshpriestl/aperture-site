import { engineMetrics } from "@/lib/content";
import { PanelFrame } from "@/components/stages/PanelFrame";

export function EnginePanel() {
  return (
    <PanelFrame title="Engine - benchmark intelligence">
      <div className="pt-4">
        {engineMetrics.map((metric) => (
          <div key={metric.label} className="flex items-start justify-between gap-4 border-b border-hairline py-5 last:border-0">
            <span className="text-[14px] leading-5 text-ink-soft">{metric.label}</span>
            <span className="text-right font-display text-[18px] leading-5 tracking-[-0.01em] text-ink">{metric.value}</span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}
