"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RATE_LIMIT_MS = 60_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


const INJECTED_STYLES = `
  .lo-bg-grid {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  .lo-text-3d {
    color: #111827;
    text-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .lo-text-accent {
    color: #111827;
  }
  .lo-text-card-dark {
    color: #111827;
  }
  .lo-depth-card {
    background: #FFFFFF;
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.12),
      0 20px 40px -20px rgba(0,0,0,0.08);
    border: 1px solid #E5E7EB;
  }
  .lo-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(77,184,176,0.04) 0%, transparent 40%);
  }
  .lo-iphone {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.25),
      0 15px 25px -5px rgba(0,0,0,0.15);
    transform-style: preserve-3d;
  }
  .lo-hw-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
  }
  .lo-badge {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.06),
      0 8px 24px rgba(0,0,0,0.08);
  }
  .lo-widget {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.04);
  }
  .lo-pillar-bar {
    height: 3px; border-radius: 999px;
    background: rgba(255,255,255,0.1); overflow: hidden;
  }
  .lo-pillar-fill { height: 100%; border-radius: 999px; }
  .lo-score-ring {
    transform: rotate(-90deg); transform-origin: center;
    stroke-dasharray: 251; stroke-dashoffset: 251; stroke-linecap: round;
  }
  .lo-btn-primary {
    background: #4DB8B0;
    color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 8px 24px -4px rgba(77,184,176,0.3);
    transition: all 0.3s cubic-bezier(0.25,1,0.5,1);
    border: none; cursor: pointer;
  }
  .lo-btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }
  .lo-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
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
        gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
      });
    };
    window.addEventListener("mousemove", onMouse);
    return () => { window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".lo-text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".lo-text-clip", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".lo-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".lo-card-left", ".lo-card-right", ".lo-mockup-wrap", ".lo-badge"], { autoAlpha: 0 });
      gsap.set(".lo-cta-wrap", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".lo-text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".lo-text-clip", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".lo-hero-text", ".lo-bg-grid"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".lo-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".lo-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".lo-mockup-wrap",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8"
        )
        .to({}, { duration: 1.5 }, "-=1.5")
        .fromTo(".lo-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
          "-=2.0"
        )
        .fromTo(".lo-card-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".lo-card-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 1.0 })
        .set(".lo-hero-text", { autoAlpha: 0 })
        .set(".lo-cta-wrap", { autoAlpha: 1 })
        .to({}, { duration: 0.6 })
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
      await fetch("https://formspree.io/f/mykbwkza", {
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
      style={{ background: "#F4F5F7", perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Grid background */}
      <div className="lo-bg-grid absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* ── Hero tagline ── */}
      <div className="lo-hero-text absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4">
        <h1 className="lo-text-track text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2 lo-text-3d">
          Everything feels important.
        </h1>
        <h1
          className="lo-text-clip text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter"
          style={{ color: "#4DB8B0", paddingBottom: "0.2em" }}
        >
          Nothing gets done.
        </h1>
      </div>

      {/* ── CTA (shown after card pullback) ── */}
      <div className="lo-cta-wrap absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 pointer-events-auto">
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4DB8B0", marginBottom: 16 }}>
          Early Access · 200 spots
        </p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          style={{ color: "#111827", marginBottom: 24, letterSpacing: "-0.03em" }}
        >
          Get early access.
        </h2>
        <p style={{ fontSize: 18, color: "#6B7280", marginBottom: 40, maxWidth: 520, lineHeight: 1.7 }}>
          lifeOS shows you which part of your life needs attention right now — and gives you one clear action to focus on.
        </p>

        {submitted ? (
          <p style={{ fontSize: 15, color: "#4DB8B0", fontWeight: 500 }}>
            You&apos;re on the list. We&apos;ll be in touch!
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
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
                  borderRadius: 12,
                  background: "#FFFFFF",
                  border: `1px solid ${error ? "#E11D48" : "#E5E7EB"}`,
                  color: "#111827",
                  fontSize: 15,
                  outline: "none",
                  width: 280,
                  transition: "border-color 0.2s ease",
                }}
              />
              <button type="submit" disabled={loading} className="lo-btn-primary"
                style={{ padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600 }}>
                {loading ? "Joining…" : "Join the waitlist →"}
              </button>
            </form>
            {error && <p style={{ fontSize: 12, color: "#E11D48", marginTop: 8 }}>{error}</p>}
          </>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <p style={{ color: "#9CA3AF", fontSize: 12, margin: 0 }}>
            No spam. Launch notification only.
          </p>
          <a
            href="/quiz.html"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#4DB8B0",
              textDecoration: "none",
              borderBottom: "1px solid rgba(77,184,176,0.35)",
              paddingBottom: 1,
              transition: "opacity 0.15s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Not sure yet? Take the quiz →
          </a>
        </div>
      </div>

      {/* ── Main expanding card ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="lo-main-card lo-depth-card relative overflow-hidden flex items-center justify-center pointer-events-auto"
          style={{ width: "92vw", height: "92vh", borderRadius: 32, transform: "translateY(calc(100vh + 200px))" }}
        >
          <div className="lo-card-sheen" aria-hidden="true" />

          {/* 3-column interior */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Right: wordmark */}
            <div className="lo-card-right order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter lo-text-card-dark leading-none">
                Life<span style={{ color: "#4DB8B0" }}>OS</span>
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

                  <div className="lo-hw-btn absolute" style={{ top: 120, left: -3, width: 3, height: 25, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="lo-hw-btn absolute" style={{ top: 160, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="lo-hw-btn absolute" style={{ top: 220, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="lo-hw-btn absolute" style={{ top: 170, right: -3, width: 3, height: 70, borderRadius: "0 3px 3px 0", transform: "scaleX(-1)" }} aria-hidden="true" />

                  {/* Screen */}
                  <div style={{ position: "absolute", inset: 7, background: "#0a0f1e", borderRadius: "2.5rem", overflow: "hidden", color: "#fff" }}>
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "2.5rem", background: "linear-gradient(135deg,rgba(255,255,255,0.025) 0%,transparent 50%)", pointerEvents: "none", zIndex: 10 }} />
                    <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 90, height: 24, background: "#000", borderRadius: 999, zIndex: 20 }} />

                    {/* No scroll — all sections fit */}
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: 7, padding: "34px 0 10px" }}>

                      {/* ── 1. NAV BAR ── */}
                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 10px", flexShrink: 0 }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>≡</span>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginLeft: 3 }}>↩</span>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>↪</span>
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "-0.02em", color: "#FAFAFA" }}>life<span style={{ color: "#4DB8B0" }}>OS</span></span>
                        </div>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>🔔</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 2, background: "#4DB8B0", borderRadius: 8, padding: "3px 8px", marginLeft: 2 }}>
                          <span style={{ fontSize: 8, color: "#fff" }}>✦</span>
                          <span style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>AI</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1, padding: "0 11px" }}>

                      {/* ── 2. GREETING (no card, no border) ── */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: "0 0 3px", fontSize: 7.5, fontWeight: 500, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>Tuesday, April 7</p>
                          <p style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15 }}>Hey, Alex.</p>
                          <p style={{ margin: 0, fontSize: 7.5, color: "rgba(255,255,255,0.36)", lineHeight: 1.5, maxWidth: 158 }}>Close the loop on what still matters and let the rest wait.</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "3px 8px", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>✎</span>
                          <span style={{ fontSize: 7, fontWeight: 600, color: "rgba(255,255,255,0.36)" }}>Edit</span>
                        </div>
                      </div>

                      {/* ── 2. PRIORITY CARD (crimson glow only) ── */}
                      <div style={{ borderRadius: 14, border: "1px solid rgba(180,20,20,0.5)", boxShadow: "0 0 18px rgba(180,20,20,0.13)", padding: "9px 10px" }}>
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 7 }}>
                          <span style={{ fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,0.27)", textTransform: "uppercase", letterSpacing: "0.17em", flex: 1 }}>Priority</span>
                          <span style={{ fontSize: 7.5, fontWeight: 700, color: "#f87171", background: "rgba(220,38,38,0.14)", borderRadius: 5, padding: "1.5px 6px" }}>Critical · 1/4</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 2.5, background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "2.5px 6px", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.4)" }}>↗</span>
                            <span style={{ fontSize: 6.5, fontWeight: 600, color: "rgba(255,255,255,0.38)" }}>Expand Card</span>
                          </div>
                        </div>
                        {/* Teal pill */}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(16,185,129,0.1)", borderRadius: 5, padding: "1.5px 7px", marginBottom: 5, border: "1px solid rgba(16,185,129,0.18)" }}>
                          <span style={{ fontSize: 7, fontWeight: 700, color: "#10b981" }}>Physical</span>
                          <span style={{ fontSize: 7, color: "#10b981", opacity: 0.6 }}>›</span>
                        </div>
                        {/* Heading */}
                        <p style={{ margin: "0 0 7px", fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2 }}>Sleep</p>
                        {/* Why this matters */}
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 9, padding: "6px 8px", marginBottom: 5 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
                            <span style={{ fontSize: 8, color: "#4DB8B0" }}>✦</span>
                            <span style={{ fontSize: 7.5, fontWeight: 700, color: "#fff" }}>Why this matters</span>
                          </div>
                          <p style={{ margin: 0, fontSize: 7, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>Sleep is the foundation of physical and mental recovery. Poor sleep cascades into every other area of performance and health.</p>
                        </div>
                        {/* Suggested tasks inside priority */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", borderRadius: 9, padding: "6px 8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ fontSize: 8, color: "#4DB8B0" }}>✦</span>
                            <span style={{ fontSize: 7.5, fontWeight: 700, color: "#fff" }}>Suggested Tasks</span>
                          </div>
                          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.26)" }}>›</span>
                        </div>
                      </div>

                      {/* ── 3. SUGGESTED TASKS ROW (standalone) ── */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", borderRadius: 11, padding: "8px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 9.5, color: "#4DB8B0" }}>✦</span>
                          <span style={{ fontSize: 8.5, fontWeight: 700, color: "#fff" }}>Suggested Tasks</span>
                        </div>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.26)" }}>›</span>
                      </div>

                      {/* ── 4. LIFE SCORE (no card bg, no border) ── */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 9 }}>
                          <span style={{ fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.17em", flex: 1 }}>Life Score</span>
                          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                            <div style={{ width: 15, height: 15, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "flex", flexDirection: "column", gap: 2, padding: "3px 3px", justifyContent: "center" }}>
                              {[0,1,2].map(i => <div key={i} style={{ height: 1.5, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />)}
                            </div>
                            <div style={{ width: 15, height: 15, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, padding: 3 }}>
                              {[0,1,2,3].map(i => <div key={i} style={{ background: "rgba(255,255,255,0.35)", borderRadius: 1 }} />)}
                            </div>
                            <div style={{ width: 15, height: 15, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ width: 7, height: 7, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)" }} />
                            </div>
                            <div style={{ width: 15, height: 15, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8"/></svg>
                            </div>
                            <div style={{ width: 15, height: 15, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.06)", borderRadius: 7, padding: "3px 7px", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <span style={{ fontSize: 7.5, color: "#fbbf24" }}>✦</span>
                            <span style={{ fontSize: 7.5, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>Expand</span>
                          </div>
                        </div>

                        {/* Score row */}
                        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
                          <span style={{ fontSize: 30, fontWeight: 800, color: "#fbbf24", letterSpacing: "-0.04em", lineHeight: 1 }}>61</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24" }}>%</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#fbbf24", marginLeft: 3 }}>Building</span>
                        </div>

                        {/* 2×2 grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "9px 9px 8px", display: "flex", flexDirection: "column" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 7, background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            </div>
                            <p style={{ margin: "0 0 5px", fontSize: 7.5, fontWeight: 600, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Physical</p>
                            <div style={{ height: 2.5, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 5 }}>
                              <div style={{ width: "60%", height: "100%", background: "#10b981", borderRadius: 999 }} />
                            </div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#10b981", letterSpacing: "-0.02em" }}>60%</p>
                          </div>
                          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "9px 9px 8px", display: "flex", flexDirection: "column" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 7, background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                            </div>
                            <p style={{ margin: "0 0 5px", fontSize: 7.5, fontWeight: 600, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Mental</p>
                            <div style={{ height: 2.5, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 5 }}>
                              <div style={{ width: "55%", height: "100%", background: "#a78bfa", borderRadius: 999 }} />
                            </div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#a78bfa", letterSpacing: "-0.02em" }}>55%</p>
                          </div>
                          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "9px 9px 8px", display: "flex", flexDirection: "column" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 7, background: "rgba(96,165,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                            </div>
                            <p style={{ margin: "0 0 5px", fontSize: 7.5, fontWeight: 600, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Financial</p>
                            <div style={{ height: 2.5, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 5 }}>
                              <div style={{ width: "58%", height: "100%", background: "#60a5fa", borderRadius: 999 }} />
                            </div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#60a5fa", letterSpacing: "-0.02em" }}>58%</p>
                          </div>
                          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "9px 9px 8px", display: "flex", flexDirection: "column" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 7, background: "rgba(248,113,113,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <p style={{ margin: "0 0 5px", fontSize: 7.5, fontWeight: 600, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Social</p>
                            <div style={{ height: 2.5, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 5 }}>
                              <div style={{ width: "70%", height: "100%", background: "#f87171", borderRadius: 999 }} />
                            </div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#f87171", letterSpacing: "-0.02em" }}>70%</p>
                          </div>
                        </div>
                      </div>

                      {/* Home bar */}
                      <div style={{ marginTop: 6, marginLeft: "auto", marginRight: "auto", width: 70, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 999 }} />
                      </div>{/* end padded inner */}
                    </div>
                  </div>
                </div>

                {/* Badge: Deep Focus */}
                <div className="lo-badge absolute z-30 flex items-center gap-3" style={{ top: 16, left: -15, borderRadius: 14, padding: "10px 14px" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(77,184,176,0.1)", border: "1px solid rgba(77,184,176,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🎯</div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: 0 }}>Deep Focus</p>
                    <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Mode active</p>
                  </div>
                </div>

                {/* Badge: Streak */}
                <div className="lo-badge absolute z-30 flex items-center gap-3" style={{ bottom: 56, right: -15, borderRadius: 14, padding: "10px 14px" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🔥</div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: 0 }}>14-Day Streak</p>
                    <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Consistent check-ins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left: copy */}
            <div className="lo-card-left order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <p className="hidden md:block" style={{ fontSize: 10, color: "#4DB8B0", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, margin: "0 0 12px" }}>
                See clearly. Act on what matters.
              </p>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: "#111827", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Your priorities,<br />finally clear.
              </h3>
              <p className="hidden md:block" style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: "0 0 24px", maxWidth: 340 }}>
                lifeOS illuminates where you actually stand across Physical, Mental, Capital, and Social — then tells you exactly what to focus on next.
              </p>
              <div className="hidden md:flex gap-6">
                {["4 Pillars", "Beam System", "Deep Focus"].map((tag) => (
                  <div key={tag} className="flex items-center gap-1.5">
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4DB8B0", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{tag}</span>
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
