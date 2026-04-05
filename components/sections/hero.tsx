"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RATE_LIMIT_MS = 60_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PILLARS = [
  { label: "Physical",  score: 3, color: "#1D9E75", pct: "75%" },
  { label: "Mental",    score: 2, color: "#7C3AED", pct: "50%" },
  { label: "Financial", score: 2, color: "#2563EB", pct: "50%" },
  { label: "Social",    score: 4, color: "#E11D48", pct: "100%" },
];

const INJECTED_STYLES = `
  .lo-film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  }
  .lo-bg-grid {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  .lo-text-3d {
    color: #FFFFFF;
    text-shadow: 0 10px 30px rgba(255,255,255,0.2), 0 2px 4px rgba(255,255,255,0.1);
  }
  .lo-text-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0px 10px 20px rgba(255,255,255,0.15)) drop-shadow(0px 2px 4px rgba(255,255,255,0.1));
  }
  .lo-text-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }
  .lo-depth-card {
    background: linear-gradient(145deg, #0D2B1F 0%, #080F0A 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(255,255,255,0.15),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.04);
  }
  .lo-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.05) 0%, transparent 40%);
    mix-blend-mode: screen;
  }
  .lo-iphone {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }
  .lo-hw-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
  }
  .lo-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 25px 50px -12px rgba(0,0,0,0.8),
      inset 0 1px 1px rgba(255,255,255,0.2),
      inset 0 -1px 1px rgba(0,0,0,0.5);
  }
  .lo-widget {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.03);
  }
  .lo-pillar-bar {
    height: 3px; border-radius: 999px;
    background: rgba(255,255,255,0.06); overflow: hidden;
  }
  .lo-pillar-fill { height: 100%; border-radius: 999px; }
  .lo-score-ring {
    transform: rotate(-90deg); transform-origin: center;
    stroke-dasharray: 251; stroke-dashoffset: 251; stroke-linecap: round;
  }
  .lo-btn-dark {
    background: linear-gradient(180deg, #1A3A28 0%, #0D1F16 100%);
    color: #FFFFFF;
    box-shadow:
      0 0 0 1px rgba(74,222,128,0.15),
      0 2px 4px rgba(0,0,0,0.6),
      0 12px 24px -4px rgba(0,0,0,0.9),
      inset 0 1px 1px rgba(255,255,255,0.1),
      inset 0 -3px 6px rgba(0,0,0,0.8);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
    border: none; cursor: pointer;
  }
  .lo-btn-dark:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #22503A 0%, #1A3A28 100%);
    box-shadow:
      0 0 0 1px rgba(74,222,128,0.25),
      0 6px 12px -2px rgba(0,0,0,0.7),
      0 20px 32px -6px rgba(0,0,0,1),
      inset 0 1px 1px rgba(255,255,255,0.15),
      inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .lo-btn-dark:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
`;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lastSubmit = useRef(0);

  // Mouse parallax + card sheen
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, {
          rotationY: xVal * 12,
          rotationX: -yVal * 12,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // GSAP ScrollTrigger cinematic sequence
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".lo-text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".lo-text-clip", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".lo-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".lo-card-left", ".lo-card-right", ".lo-mockup-wrap", ".lo-badge", ".lo-phone-widget"], { autoAlpha: 0 });
      gsap.set(".lo-cta-wrap", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Entry animation
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".lo-text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".lo-text-clip", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Hero text blurs out, card rises
        .to([".lo-hero-text", ".lo-bg-grid"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".lo-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        // Card expands full screen
        .to(".lo-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        // Mockup rises with 3D intro
        .fromTo(".lo-mockup-wrap",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8"
        )
        // Phone widgets stagger in
        .fromTo(".lo-phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 },
          "-=1.5"
        )
        // Score ring draws
        .to(".lo-score-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        // Floating badges pop in
        .fromTo(".lo-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
          "-=2.0"
        )
        // Left/right copy slides in
        .fromTo(".lo-card-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".lo-card-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        // Hold
        .to({}, { duration: 2.5 })
        // Swap to CTA
        .set(".lo-hero-text", { autoAlpha: 0 })
        .set(".lo-cta-wrap", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        // Card pulls back
        .to([".lo-mockup-wrap", ".lo-badge", ".lo-card-left", ".lo-card-right"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".lo-main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".lo-cta-wrap", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        // Card exits upward
        .to(".lo-main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (honeypot) return;

    const now = Date.now();
    if (now - lastSubmit.current < RATE_LIMIT_MS) {
      setError("Please wait before submitting again.");
      return;
    }

    const clean = email.trim().toLowerCase();
    if (!EMAIL_RE.test(clean)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    lastSubmit.current = now;

    try {
      await fetch("https://formspree.io/f/xvzvolzk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: clean }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#080F0A", perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Film grain */}
      <div className="lo-film-grain" aria-hidden="true" />

      {/* Grid background */}
      <div className="lo-bg-grid absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* ── Hero tagline ── */}
      <div className="lo-hero-text absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4">
        <h1 className="lo-text-track text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2 lo-text-3d">
          Stop consuming self-help.
        </h1>
        <h1 className="lo-text-clip text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter lo-text-silver"
          style={{ color: "#4ADE80" }}>
          Start using it.
        </h1>
      </div>

      {/* ── CTA (shown after pullback) ── */}
      <div className="lo-cta-wrap absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 pointer-events-auto">
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4ADE80", marginBottom: 16, opacity: 0.8 }}>
          Early Access · 200 spots
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight lo-text-silver" style={{ marginBottom: 24 }}>
          Get early access.
        </h2>
        <p style={{ fontSize: 18, color: "#9CA3AF", marginBottom: 40, maxWidth: 480, lineHeight: 1.7 }}>
          Join the waitlist. Be among the first 200 to shape what lifeOS becomes.
        </p>

        {submitted ? (
          <p style={{ fontSize: 15, color: "#4ADE80", fontWeight: 500 }}>
            You&apos;re on the list. We&apos;ll be in touch!
          </p>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              {/* Honeypot */}
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required
                style={{
                  padding: "14px 24px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${error ? "#E11D48" : "rgba(255,255,255,0.1)"}`,
                  color: "#fff",
                  fontSize: 15,
                  outline: "none",
                  width: 280,
                  transition: "border-color 0.2s ease",
                }}
              />
              <button type="submit" disabled={loading} className="lo-btn-dark"
                style={{ padding: "14px 28px", borderRadius: 20, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
                {loading ? "Joining…" : "Join the waitlist →"}
              </button>
            </form>
            {error && <p style={{ fontSize: 12, color: "#E11D48", marginTop: 8 }}>{error}</p>}
          </>
        )}
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 20, letterSpacing: "0.05em" }}>
          No spam. Launch notification only.
        </p>
      </div>

      {/* ── Main expanding card ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="lo-main-card lo-depth-card relative overflow-hidden flex items-center justify-center pointer-events-auto"
          style={{ width: "92vw", height: "92vh", borderRadius: 32 }}
        >
          <div className="lo-card-sheen" aria-hidden="true" />

          {/* 3-column interior */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Right: wordmark */}
            <div className="lo-card-right order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter lo-text-card-silver leading-none">
                Life<span style={{ color: "#4ADE80" }}>OS</span>
              </h2>
            </div>

            {/* Centre: phone mockup */}
            <div
              className="lo-mockup-wrap order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center scale-[0.65] md:scale-[0.85] lg:scale-100">
                <div ref={mockupRef} className="lo-iphone relative flex flex-col"
                  style={{ width: 280, height: 580, borderRadius: "3rem" }}>

                  {/* Hardware buttons */}
                  <div className="lo-hw-btn absolute" style={{ top: 120, left: -3, width: 3, height: 25, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="lo-hw-btn absolute" style={{ top: 160, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="lo-hw-btn absolute" style={{ top: 220, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="lo-hw-btn absolute" style={{ top: 170, right: -3, width: 3, height: 70, borderRadius: "0 3px 3px 0", transform: "scaleX(-1)" }} aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute text-white overflow-hidden z-10"
                    style={{ inset: 7, background: "#030A06", borderRadius: "2.5rem", boxShadow: "inset 0 0 15px rgba(0,0,0,1)" }}>

                    {/* Screen glare */}
                    <div className="absolute inset-0 z-40 pointer-events-none"
                      style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)", borderRadius: "2.5rem" }}
                      aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute z-50 flex items-center justify-end"
                      style={{ top: 5, left: "50%", transform: "translateX(-50%)", width: 100, height: 28, background: "#000", borderRadius: 999, paddingRight: 10 }}>
                      <div className="animate-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.8)" }} />
                    </div>

                    {/* App content */}
                    <div className="relative w-full h-full flex flex-col gap-3" style={{ paddingTop: 48, paddingLeft: 14, paddingRight: 14, paddingBottom: 24 }}>

                      {/* Header */}
                      <div className="lo-phone-widget flex justify-between items-center">
                        <div>
                          <span style={{ fontSize: 9, color: "rgba(74,222,128,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
                            Today&apos;s Focus
                          </span>
                          <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "2px 0 0", letterSpacing: "-0.02em" }}>
                            Life Check-in
                          </p>
                        </div>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#4ADE80" }}>
                          S
                        </div>
                      </div>

                      {/* Score ring */}
                      <div className="lo-phone-widget relative mx-auto flex items-center justify-center" style={{ width: 130, height: 130 }}>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144" aria-hidden="true">
                          <circle cx="72" cy="72" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                          <circle className="lo-score-ring" cx="72" cy="72" r="60" fill="none" stroke="#4ADE80" strokeWidth="10" />
                        </svg>
                        <div className="z-10 flex flex-col items-center">
                          <span style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>2.5</span>
                          <span style={{ fontSize: 8, color: "rgba(74,222,128,0.4)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, marginTop: 2 }}>Life Score</span>
                        </div>
                      </div>

                      {/* Pillar bars */}
                      <div className="lo-phone-widget lo-widget flex flex-col gap-2.5" style={{ borderRadius: 16, padding: "10px 12px" }}>
                        {PILLARS.map((p) => (
                          <div key={p.label}>
                            <div className="flex justify-between items-center" style={{ marginBottom: 3 }}>
                              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>{p.label}</span>
                              <span style={{ fontSize: 9, fontWeight: 700, color: p.color }}>{p.score}/4</span>
                            </div>
                            <div className="lo-pillar-bar">
                              <div className="lo-pillar-fill" style={{ width: p.pct, backgroundColor: p.color }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* AI Conductor */}
                      <div className="lo-phone-widget lo-widget flex items-start gap-2.5" style={{ borderRadius: 16, padding: "10px 12px" }}>
                        <div style={{ width: 28, height: 28, borderRadius: 10, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p style={{ fontSize: 9, color: "rgba(74,222,128,0.6)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, margin: "0 0 3px" }}>
                            AI Conductor
                          </p>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, margin: 0 }}>
                            Relationships neglected 5 days. One intentional action today balances your week.
                          </p>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute" style={{ bottom: 8, left: "50%", transform: "translateX(-50%)", width: 100, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 999 }} />
                    </div>
                  </div>
                </div>

                {/* Badge: Deep Focus */}
                <div className="lo-badge absolute z-30 flex items-center gap-3" style={{ top: 16, left: -15, borderRadius: 14, padding: "10px 14px" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🎯</div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: 0 }}>Deep Focus</p>
                    <p style={{ fontSize: 10, color: "rgba(74,222,128,0.5)", margin: 0 }}>Mode active</p>
                  </div>
                </div>

                {/* Badge: Streak */}
                <div className="lo-badge absolute z-30 flex items-center gap-3" style={{ bottom: 56, right: -15, borderRadius: 14, padding: "10px 14px" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🔥</div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: 0 }}>14-Day Streak</p>
                    <p style={{ fontSize: 10, color: "rgba(74,222,128,0.5)", margin: 0 }}>Consistent check-ins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left: copy */}
            <div className="lo-card-left order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <p className="hidden md:block" style={{ fontSize: 10, color: "rgba(74,222,128,0.7)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, margin: "0 0 12px" }}>
                The operating system for your life
              </p>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Your priorities,<br />finally clear.
              </h3>
              <p className="hidden md:block" style={{ fontSize: 14, color: "rgba(156,163,175,0.8)", lineHeight: 1.7, margin: "0 0 24px", maxWidth: 340 }}>
                <span style={{ color: "#fff", fontWeight: 600 }}>lifeOS</span> gives you a universal system to balance and prioritise every area of your life — Physical, Mental, Capital, and Social — so you always know exactly what to focus on next.
              </p>
              <div className="hidden md:flex gap-6">
                {["4 Pillars", "AI Insights", "Deep Focus"].map((tag) => (
                  <div key={tag} className="flex items-center gap-1.5">
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{tag}</span>
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
