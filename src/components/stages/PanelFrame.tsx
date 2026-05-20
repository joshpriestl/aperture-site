import type { ReactNode } from "react";

type PanelFrameProps = {
  children: ReactNode;
};

export function PanelFrame({ children }: PanelFrameProps) {
  return (
    <div className="w-full overflow-hidden rounded-[14px] bg-card shadow-panel ring-1 ring-hairline">
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
