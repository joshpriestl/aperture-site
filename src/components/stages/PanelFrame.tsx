import type { ReactNode } from "react";

type PanelFrameProps = {
  title: string;
  children: ReactNode;
};

export function PanelFrame({ title, children }: PanelFrameProps) {
  return (
    <div className="w-full overflow-hidden rounded-[14px] bg-card shadow-panel ring-1 ring-hairline">
      <div className="flex h-8 items-center gap-2 border-b border-hairline bg-surface px-4">
        <span className="h-2 w-2 rounded-full bg-[#e76f61]" />
        <span className="h-2 w-2 rounded-full bg-[#d6a23a]" />
        <span className="h-2 w-2 rounded-full bg-[#6b9f75]" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">{title}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
