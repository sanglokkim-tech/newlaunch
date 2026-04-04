"use client";

import { LifeOSHero } from "@/components/ui/lifeos-cinematic-hero";
import ScrollNarrative from "@/components/sections/scroll-narrative";
import HowItWorks from "@/components/sections/how-it-works";
import Pillars from "@/components/sections/pillars";
import Waitlist from "@/components/sections/waitlist";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#F4F5F7" }}>
      <div id="top">
        <LifeOSHero />
      </div>
      <ScrollNarrative />
      <HowItWorks />
      <Pillars />
      <Waitlist />
      <Footer />
    </main>
  );
}
