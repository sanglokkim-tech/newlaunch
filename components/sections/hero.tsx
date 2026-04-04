"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RATE_LIMIT_MS = 60_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RING_CIRC = 2 * Math.PI * 45; // 282.74

const PILLARS = [
  { name: "Physical", color: "#1D9E75", score: 3, pct: 75 },
  { name: "Mental",   color: "#7C3AED", score: 2, pct: 50 },
  { name: "Financial",color: "#2563EB", score: 2, pct: 50 },
  { name: "Social",   color: "#E11D48", score: 4, pct: 100 },
];

interface PhoneProps {
  ringRef: React.RefObject<SVGCircleElement | null>;
}

function PhoneMockup({ ringRef }: PhoneProps) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Floating badge — top-left */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: -8,
          transform: "translateX(-100%)",
          background: "#0D2B1F",
          border: "1px solid #1A3A28",
          borderRadius: 10,
          padding: "7px 10px",
          whiteSpace: "nowrap",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ADE80",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 10, fontWeight: 600, color: "#4ADE80" }}>
            Deep Focus
          </span>
        </div>
        <p style={{ fontSize: 9, color: "#9CA3AF", margin: "2px 0 0" }}>
          Mode active
        </p>
      </div>

      {/* Floating badge — bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          right: -8,
          transform: "translateX(100%)",
          background: "#0D2B1F",
          border: "1px solid #1A3A28",
          borderRadius: 10,
          padding: "7px 10px",
          whiteSpace: "nowrap",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 12 }}>🔥</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#F59E0B" }}>
            14-Day Streak
          </span>
        </div>
        <p style={{ fontSize: 9, color: "#9CA3AF", margin: "2px 0 0" }}>
          Consistent check-ins
        </p>
      </div>

      {/* Phone frame */}
      <div
        style={{
          width: 248,
          height: 504,
          background: "#030A06",
          borderRadius: 42,
          border: "2px solid #1A3A28",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(74,222,128,0.06)",
          flexShrink: 0,
        }}
      >
        {/* Hardware buttons */}
        <div
          style={{
            position: "absolute",
            right: -3,
            top: 108,
            width: 3,
            height: 54,
            background: "#1A2A1A",
            borderRadius: "0 3px 3px 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 88,
            width: 3,
            height: 32,
            background: "#1A2A1A",
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 132,
            width: 3,
            height: 32,
            background: "#1A2A1A",
            borderRadius: "3px 0 0 3px",
          }}
        />

        {/* Screen glare */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
            zIndex: 20,
            pointerEvents: "none",
            borderRadius: 40,
          }}
        />

        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 88,
            height: 26,
            background: "#000",
            borderRadius: 20,
            zIndex: 15,
          }}
        />

        {/* Screen content */}
        <div
          style={{
            padding: "48px 13px 13px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 9,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 8,
                  color: "#4ADE80",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  margin: 0,
                }}
              >
                Today&apos;s Focus
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  margin: "2px 0 0",
                }}
              >
                Life Check-in
              </p>
            </div>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#1A3A28",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, color: "#4ADE80" }}>
                S
              </span>
            </div>
          </div>

          {/* Score ring */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#1A3A28"
                  strokeWidth="7"
                />
                <circle
                  ref={ringRef}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRC}
                  strokeDashoffset={RING_CIRC}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  2.5
                </p>
                <p style={{ fontSize: 8, color: "#9CA3AF", margin: "2px 0 0" }}>
                  / 4
                </p>
              </div>
            </div>
          </div>

          {/* Pillar bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {PILLARS.map((p) => (
              <div key={p.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}
                >
                  <span style={{ fontSize: 8, color: "#9CA3AF", fontWeight: 500 }}>
                    {p.name}
                  </span>
                  <span style={{ fontSize: 8, color: p.color, fontWeight: 600 }}>
                    {p.score}/4
                  </span>
                </div>
                <div
                  style={{
                    height: 3,
                    borderRadius: 999,
                    background: "#1A3A28",
                  }}
                >
                  <div
                    style={{
                      width: `${p.pct}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: p.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AI Conductor card */}
          <div
            style={{
              background: "#0D2B1F",
              border: "1px solid #1A3A28",
              borderRadius: 10,
              padding: "8px 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="#4ADE80"
              >
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: "#4ADE80",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                AI Conductor
              </span>
            </div>
            <p
              style={{
                fontSize: 8.5,
                color: "#9CA3AF",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Relationships neglected 5 days. One intentional action today
              balances your week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);

  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lastSubmit = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const tagline = taglineRef.current;
      const interior = interiorRef.current;
      const cta = ctaRef.current;
      if (!card || !tagline || !interior || !cta) return;

      // Initial state via GSAP
      gsap.set(card, {
        y: "110vh",
        borderRadius: 24,
        xPercent: -50,
        left: "50%",
        width: "85vw",
        height: "72vh",
      });
      gsap.set(interior, { opacity: 0 });
      gsap.set(cta, { opacity: 0, display: "none" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (ringRef.current) {
              if (p >= 0.35 && p <= 0.65) {
                const rp = Math.min((p - 0.35) / 0.3, 1);
                ringRef.current.style.strokeDashoffset = String(
                  RING_CIRC * (1 - rp * 0.625)
                );
              } else if (p < 0.35) {
                ringRef.current.style.strokeDashoffset = String(RING_CIRC);
              } else {
                ringRef.current.style.strokeDashoffset = String(
                  RING_CIRC * 0.375
                );
              }
            }
          },
        },
      });

      tl
        // Phase 1: tagline fades, card rises (0→2.5)
        .to(tagline, { opacity: 0, y: -64, scale: 1.06, duration: 2, ease: "power2.in" }, 0)
        .to(card, { y: "22vh", duration: 2.5, ease: "power2.out" }, 0.3)
        // Phase 2: card expands to full screen (2.5→5)
        .to(
          card,
          {
            y: 0,
            left: 0,
            xPercent: 0,
            width: "100%",
            height: "100%",
            borderRadius: 0,
            duration: 2.5,
            ease: "power2.inOut",
          },
          2.5
        )
        // Phase 3: interior fades in (4.5→6)
        .to(interior, { opacity: 1, duration: 1.5, ease: "power2.out" }, 4.5)
        // Hold 6–7 (ring animates via onUpdate)
        // Phase 4: interior out, CTA in (7→8)
        .to(interior, { opacity: 0, duration: 1 }, 7)
        .set(cta, { display: "flex" }, 7)
        .to(cta, { opacity: 1, duration: 1 }, 7)
        // Phase 5: card exits (8.5→10)
        .to(card, { y: "-110vh", duration: 1.5, ease: "power2.in" }, 8.5);

      // Mouse parallax on interior
      const onMouse = (e: MouseEvent) => {
        const xRot = ((e.clientY / window.innerHeight) - 0.5) * 24;
        const yRot = ((e.clientX / window.innerWidth) - 0.5) * 24;
        gsap.to(interior, {
          rotateX: -xRot,
          rotateY: yRot,
          transformPerspective: 1200,
          ease: "power2.out",
          duration: 0.8,
          overwrite: "auto",
        });
      };
      window.addEventListener("mousemove", onMouse);
      return () => window.removeEventListener("mousemove", onMouse);
    }, sectionRef);

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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        background: "#080F0A",
        overflow: "hidden",
      }}
    >
      {/* Initial tagline */}
      <div
        ref={taglineRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          pointerEvents: "none",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            margin: 0,
          }}
          className="text-[40px] sm:text-[64px]"
        >
          <span style={{ color: "#FFFFFF", display: "block" }}>
            Stop consuming self-help.
          </span>
          <span style={{ color: "#4ADE80", display: "block" }}>
            Start using it.
          </span>
        </h1>
      </div>

      {/* Expanding card */}
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          top: 0,
          background: "#0D2B1F",
          border: "1px solid #1A3A28",
          overflow: "hidden",
          zIndex: 2,
          willChange: "transform, width, height, border-radius",
        }}
      >
        {/* Interior — 3-column layout */}
        <div
          ref={interiorRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr 0.65fr",
            transformStyle: "preserve-3d",
          }}
          className="hidden sm:grid"
        >
          {/* Left column */}
          <div
            style={{
              padding: "40px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRight: "1px solid #1A3A28",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#4ADE80",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                margin: 0,
              }}
            >
              THE OPERATING SYSTEM FOR YOUR LIFE
            </p>
            <h2
              style={{
                fontSize: "clamp(22px, 2.2vw, 34px)",
                fontWeight: 700,
                color: "#fff",
                margin: "16px 0 12px",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Your priorities,
              <br />
              finally clear.
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#9CA3AF",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              lifeOS gives you a universal system to balance and prioritise
              every area of your life — Physical, Mental, Capital, and Social —
              so you always know exactly what to focus on next.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginTop: 24,
              }}
            >
              {["4 Pillars", "AI Insights", "Deep Focus"].map((tag) => (
                <div
                  key={tag}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#4ADE80",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Centre column — phone */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 24px",
              borderRight: "1px solid #1A3A28",
              overflow: "visible",
            }}
          >
            <PhoneMockup ringRef={ringRef} />
          </div>

          {/* Right column — wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 20px",
            }}
          >
            <p
              style={{
                fontSize: "clamp(44px, 4.5vw, 76px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                margin: 0,
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              <span style={{ color: "#fff" }}>Life</span>
              <span style={{ color: "#4ADE80" }}>OS</span>
            </p>
          </div>
        </div>

        {/* CTA — shown when card retreats */}
        <div
          ref={ctaRef}
          style={{
            position: "absolute",
            inset: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            textAlign: "center",
            display: "none",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Get early access.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#9CA3AF",
              margin: "16px 0 0",
              maxWidth: 440,
            }}
          >
            Join the waitlist. Be among the first 200 to shape what lifeOS
            becomes.
          </p>

          {submitted ? (
            <p
              style={{
                marginTop: 32,
                fontSize: 15,
                color: "#4ADE80",
                fontWeight: 500,
              }}
            >
              You&apos;re on the list. We&apos;ll be in touch!
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                style={{ marginTop: 32, width: "100%", maxWidth: 420 }}
                className="flex flex-col sm:flex-row gap-3 mx-auto"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  style={{
                    flex: 1,
                    background: "#1A1D27",
                    border: `1px solid ${error ? "#E11D48" : "#2D3748"}`,
                    borderRadius: 8,
                    padding: "10px 16px",
                    fontSize: 14,
                    color: "#fff",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-dark"
                >
                  {loading ? "Joining…" : "Join the waitlist →"}
                </button>
              </form>
              {error && (
                <p
                  style={{ fontSize: 12, color: "#E11D48", marginTop: 8 }}
                >
                  {error}
                </p>
              )}
            </>
          )}

          <p style={{ fontSize: 12, color: "#374151", marginTop: 16 }}>
            No spam. Launch notification only.
          </p>
        </div>
      </div>
    </section>
  );
}
