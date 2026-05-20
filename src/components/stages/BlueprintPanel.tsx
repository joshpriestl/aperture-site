import { blueprintItems } from "@/lib/content";

export function BlueprintPanel() {
  return (
    <div className="w-full rounded-[14px] bg-card p-5 shadow-panel ring-1 ring-white/70 sm:p-6">
      <p className="border-b border-hairline pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        BLUEPRINT - IMPLEMENTATION SEQUENCE
      </p>
      <div className="pt-3">
        {blueprintItems.map((item, index) => (
          <div
            key={item.title}
            className={`grid grid-cols-[34px_1fr] gap-4 border-b border-hairline py-4 last:border-0 ${
              index === 3 ? "opacity-45" : ""
            }`}
          >
            <span className="font-mono text-[12px] text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-[14px] leading-5 text-ink">{item.title}</p>
              {item.detail ? <p className="mt-1 text-[12px] leading-5 text-ink-soft">{item.detail}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
