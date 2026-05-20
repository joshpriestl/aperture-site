import { BenchmarkIntelligence } from "@/components/BenchmarkIntelligence";
import { BuyerFit } from "@/components/BuyerFit";
import { ExampleOutputs } from "@/components/ExampleOutputs";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { Methodology } from "@/components/Methodology";
import { Nav } from "@/components/Nav";
import { OperatingSignals } from "@/components/OperatingSignals";
import { PracticeAreas } from "@/components/PracticeAreas";
import { WhatApertureBuilds } from "@/components/WhatApertureBuilds";
import { WhatWeDo } from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <WhatApertureBuilds />
        <ExampleOutputs />
        <BenchmarkIntelligence />
        <PracticeAreas />
        <Methodology />
        <BuyerFit />
        <OperatingSignals />
        <Founder />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
