import { blueprintItems } from "@/lib/content";
import { PanelFrame } from "@/components/stages/PanelFrame";

export function BlueprintPanel() {
  return (
    <PanelFrame title="Blueprint - implementation sequence">
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
    </PanelFrame>
  );
}
