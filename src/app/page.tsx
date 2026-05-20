import { BenchmarkIntelligence } from "@/components/BenchmarkIntelligence";
import { BuyerFit } from "@/components/BuyerFit";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { Methodology } from "@/components/Methodology";
import { Nav } from "@/components/Nav";
import { OperatingSignals } from "@/components/OperatingSignals";
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
        <BuyerFit />
        <OperatingSignals />
        <Founder />
        {stages.map((stage) => (
          <Stage key={stage.key} stage={stage}>
            {panels[stage.key]}
          </Stage>
        ))}
        <WhatApertureBuilds />
        <BenchmarkIntelligence />
        <PracticeAreas />
        <Methodology />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
