import { engineMetrics } from "@/lib/content";

export function EnginePanel() {
  return (
    <div className="w-full rounded-[14px] bg-card p-5 shadow-panel ring-1 ring-white/70 sm:p-6">
      <p className="border-b border-hairline pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        ENGINE - BENCHMARK INTELLIGENCE
      </p>
      <div className="pt-4">
        {engineMetrics.map((metric) => (
          <div key={metric.label} className="flex items-start justify-between gap-4 border-b border-hairline py-5 last:border-0">
            <span className="text-[14px] leading-5 text-ink-soft">{metric.label}</span>
            <span className="text-right font-display text-[18px] leading-5 tracking-[-0.01em] text-ink">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
