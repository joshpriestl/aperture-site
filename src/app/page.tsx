import { CaseStudies } from "@/components/CaseStudies";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { OperatingSignals } from "@/components/OperatingSignals";
import { WhatApertureBuilds } from "@/components/WhatApertureBuilds";
import { WhatWeDo } from "@/components/WhatWeDo";
import { WhoWeAre } from "@/components/WhoWeAre";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <WhatApertureBuilds />
        <WhoWeAre />
        <OperatingSignals />
        <CaseStudies />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
