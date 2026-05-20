import { buildItems } from "@/lib/content";
import { PanelFrame } from "@/components/stages/PanelFrame";

const statusClass = {
  green: "text-[#476b4f]",
  amber: "text-[#80602d]",
  neutral: "text-ink-muted",
};

export function BuildPanel() {
  return (
    <PanelFrame title="Build - systems in motion">
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
    </PanelFrame>
  );
}
