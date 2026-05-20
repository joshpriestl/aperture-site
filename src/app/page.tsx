import { Fragment } from "react";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Methodology } from "@/components/Methodology";
import { Nav } from "@/components/Nav";
import { PracticeAreas } from "@/components/PracticeAreas";
import { Stage } from "@/components/Stage";
import { AuditPanel } from "@/components/stages/AuditPanel";
import { BlueprintPanel } from "@/components/stages/BlueprintPanel";
import { BuildPanel } from "@/components/stages/BuildPanel";
import { EnginePanel } from "@/components/stages/EnginePanel";
import { WhatApertureBuilds } from "@/components/WhatApertureBuilds";
import { PanelMap, stages } from "@/lib/content";

const panels: PanelMap = {
  audit: <AuditPanel />,
  blueprint: <BlueprintPanel />,
  build: <BuildPanel />,
  engine: <EnginePanel />,
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {stages.map((stage) => (
          <Fragment key={stage.key}>
            <Stage stage={stage}>{panels[stage.key]}</Stage>
            {stage.key === "build" ? <WhatApertureBuilds /> : null}
          </Fragment>
        ))}
        <PracticeAreas />
        <Methodology />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
