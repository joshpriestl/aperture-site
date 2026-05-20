import { AuditJourney } from "@/components/AuditJourney";
import { BenchmarkIntelligence } from "@/components/BenchmarkIntelligence";
import { BuyerFit } from "@/components/BuyerFit";
import { ExampleOutputs } from "@/components/ExampleOutputs";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
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
        {stages.map((stage) => (
          <Stage key={stage.key} stage={stage}>
            {panels[stage.key]}
          </Stage>
        ))}
        <AuditJourney />
        <WhatApertureBuilds />
        <ExampleOutputs />
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
