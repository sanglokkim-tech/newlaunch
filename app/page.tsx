"use client";

import { LifeOSHero } from "@/components/ui/lifeos-cinematic-hero";
import Problem from "@/components/sections/problem";
import LifeScoreWidget from "@/components/sections/life-score-widget";
import HowItWorks from "@/components/sections/how-it-works";
import Pillars from "@/components/sections/pillars";
import Features from "@/components/sections/features";
import Waitlist from "@/components/sections/waitlist";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#F5F5F7" }}>
      <div id="top">
        <LifeOSHero />
      </div>
      <Problem />
      <LifeScoreWidget />
      <HowItWorks />
      <Pillars />
      <Features />
      <Waitlist />
      <Footer />
    </main>
  );
}
