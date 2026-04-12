// src/components/ui/lifeos-cinematic-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 48px 48px;
      background-image:
          linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 75%);
  }

  .text-3d-matte {
      color: #FFFFFF;
      text-shadow: 
          0 10px 30px rgba(255,255,255,0.20), 
          0 2px 4px rgba(255,255,255,0.10);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.40) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px rgba(255,255,255,0.15)) 
          drop-shadow(0px 2px 4px rgba(255,255,255,0.10));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #13131F 0%, #0B0B12 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.95),
          0 20px 40px -20px rgba(0, 0, 0, 0.85),
          inset 0 1px 2px rgba(255, 255, 255, 0.08),
          inset 0 -2px 4px rgba(0, 0, 0, 0.9),
          0 0 0 1px rgba(78,205,196,0.06);
      border: 1px solid rgba(255, 255, 255, 0.05);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.05) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #4ECDC4 0%, #2da89f 100%);
      color: #0B0B12;
      font-weight: 700;
      box-shadow: 0 0 0 1px rgba(78,205,196,0.3), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(78,205,196,0.25), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.15);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #5EDDD4 0%, #4ECDC4 100%);
      box-shadow: 0 0 0 1px rgba(78,205,196,0.5), 0 6px 12px -2px rgba(78,205,196,0.3), 0 20px 32px -6px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.15);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #2da89f;
      box-shadow: 0 0 0 1px rgba(78,205,196,0.2), inset 0 3px 8px rgba(0,0,0,0.2);
  }

  /* Pillar score bars */
  .pillar-bar {
      height: 3px;
      border-radius: 999px;
      background: rgba(255,255,255,0.06);
      overflow: hidden;
  }
  .pillar-bar-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.6s ease;
  }

  .score-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 251;
      stroke-dashoffset: 251;
      stroke-linecap: round;
  }
`;

export interface LifeOSHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function LifeOSHero({
  tagline1 = "Stop drifting.",
  tagline2 = "Run your life.",
  cardHeading = "Your priorities, finally clear.",
  cardDescription = (
    <>
      beam illuminates where you stand across your life pillars, identifies what's being neglected, and gives you a prioritised action list — so every day moves the needle.
    </>
  ),
  ctaHeading = "Get early access.",
  ctaDescription = "Join the waitlist. Be among the first 200 to shape what beam becomes.",
  className,
  ...props
}: LifeOSHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".score-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Pillar data for the phone UI
  const pillars = [
    { label: "Body",   score: 4, color: "#4ECDC4", pct: "100%" },
    { label: "Mind",   score: 3, color: "#8B5CF6", pct: "75%" },
    { label: "Wealth", score: 2, color: "#60A5FA", pct: "50%" },
    { label: "Soul",   score: 1, color: "#F472B6", pct: "25%" },
  ];

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#0B0B12] text-white font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* Hero Text */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* CTA */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto">
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4 opacity-80" style={{ color: "#4ECDC4" }}>Early Access — 200 spots</p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-white/50 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Email input CTA — waitlist focused */}
          <input
            type="email"
            placeholder="your@email.com"
            className="px-6 py-4 rounded-[1.25rem] bg-white/5 border border-white/10 text-white placeholder-white/30 text-base outline-none transition-colors w-72" style={{ "--tw-ring-color": "#4ECDC4" } as React.CSSProperties}
          />
          <button className="btn-modern-dark px-8 py-4 rounded-[1.25rem] text-base font-semibold tracking-tight">
            Join the waitlist →
          </button>
        </div>
        <p className="text-white/20 text-xs mt-5 tracking-wide">No spam. Launch notification only.</p>
      </div>

      {/* Main Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Right: wordmark */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0 leading-none">
                Beam
              </h2>
            </div>

            {/* Center: iPhone mockup */}
            <div className="mockup-scroll-wrapper order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md scale-x-[-1]" aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] bg-[#0B0B12] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#4ECDC4", boxShadow: "0 0 8px rgba(78,205,196,0.8)" }} />
                    </div>

                    {/* App UI */}
                    <div className="relative w-full h-full pt-12 px-4 pb-8 flex flex-col gap-3">

                      {/* Header */}
                      <div className="phone-widget flex justify-between items-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "rgba(78,205,196,0.6)" }}>Today's Focus</span>
                          <p className="text-base font-bold text-white tracking-tight">Life Check‑in</p>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.2)", color: "#4ECDC4" }}>S</div>
                      </div>

                      {/* Score ring */}
                      <div className="phone-widget relative w-36 h-36 mx-auto flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="72" cy="72" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                          <circle className="score-ring" cx="72" cy="72" r="60" fill="none" stroke="#4ECDC4" strokeWidth="10" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="text-3xl font-extrabold tracking-tighter text-white">2.5</span>
                          <span className="text-[8px] uppercase tracking-widest font-bold mt-0.5" style={{ color: "rgba(78,205,196,0.4)" }}>Life Score</span>
                        </div>
                      </div>

                      {/* Pillar bars */}
                      <div className="phone-widget widget-depth rounded-2xl p-3 flex flex-col gap-2.5">
                        {pillars.map((p) => (
                          <div key={p.label}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold">{p.label}</span>
                              <span className="text-[9px] font-bold" style={{ color: p.color }}>{p.score}/4</span>
                            </div>
                            <div className="pillar-bar">
                              <div className="pillar-bar-fill" style={{ width: p.pct, backgroundColor: p.color }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Beam System nudge */}
                      <div className="phone-widget widget-depth rounded-2xl p-3 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.2)" }}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="#4ECDC4" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "rgba(78,205,196,0.6)" }}>beam</p>
                          <p className="text-[10px] text-white/70 leading-snug">Relationships neglected 5 days. One intentional action today balances your week.</p>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/15 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Badge 1: Focus Mode */}
                <div className="floating-badge absolute top-4 left-[-15px] lg:left-[-70px] floating-ui-badge rounded-xl p-3 flex items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.2)" }}>
                    <span className="text-base" aria-hidden="true">🎯</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold tracking-tight">Deep Focus</p>
                    <p className="text-[10px]" style={{ color: "rgba(78,205,196,0.5)" }}>Mode active</p>
                  </div>
                </div>

                {/* Badge 2: Streak */}
                <div className="floating-badge absolute bottom-14 right-[-15px] lg:right-[-70px] floating-ui-badge rounded-xl p-3 flex items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
                    <span className="text-base" aria-hidden="true">🔥</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold tracking-tight">14-Day Streak</p>
                    <p className="text-[10px]" style={{ color: "rgba(78,205,196,0.5)" }}>Consistent check-ins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left: copy */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 hidden md:block" style={{ color: "rgba(78,205,196,0.7)" }}>See clearly. Act on what matters.</p>
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-emerald-100/50 text-sm lg:text-base font-normal leading-relaxed max-w-sm">
                {cardDescription}
              </p>
              <div className="hidden md:flex gap-6 mt-6">
                {["4 Pillars", "Beam System", "Deep Focus"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4ECDC4" }} />
                    <span className="text-white/40 text-xs font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
