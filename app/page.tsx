import Nav from "@/components/sections/nav";
import Hero from "@/components/sections/hero";
import ProblemScroll from "@/components/sections/problem-scroll";
import ScoreReveal from "@/components/sections/score-reveal";
import PillarShowcase from "@/components/sections/pillar-showcase";
import HowItWorks from "@/components/sections/how-it-works";
import WaitlistCTA from "@/components/sections/waitlist-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#F4F5F7" }}>
      <Nav />
      <Hero />
      <ProblemScroll />
      <ScoreReveal />
      <PillarShowcase />
      <HowItWorks />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
