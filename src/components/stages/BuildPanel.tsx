import { buildItems } from "@/lib/content";

const statusClass = {
  green: "text-[#476b4f]",
  amber: "text-[#80602d]",
  neutral: "text-ink-muted",
};

export function BuildPanel() {
  return (
    <div className="w-full rounded-[14px] bg-card p-5 shadow-panel ring-1 ring-white/70 sm:p-6">
      <p className="border-b border-hairline pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        BUILD - SYSTEMS IN MOTION
      </p>
      <div className="grid gap-3 pt-5 sm:grid-cols-2">
        {buildItems.map((item) => (
          <div key={item.title} className="min-h-[94px] rounded-[10px] bg-surface p-4 ring-1 ring-hairline">
            <p className={`font-mono text-[10px] font-medium uppercase tracking-[0.16em] ${statusClass[item.tone]}`}>
              {item.status}
            </p>
            <p className="mt-5 text-[12px] leading-5 text-ink">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
