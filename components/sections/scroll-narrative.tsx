"use client";
import { useEffect, useRef, useState } from "react";

// ─── Scroll breakpoints (0-1) ─────────────────────────────────────────────────
const BP = {
  line1In:    0.03,
  line1Dim:   0.16,
  line2In:    0.16,
  line2Dim:   0.29,
  line3In:    0.29,
  line3Hold:  0.40,
  scoreIn:    0.42,
  scoreEnd:   0.56,
  subtextIn:  0.58,
  subtextHold:0.65,
  card1:      0.67,
  card2:      0.75,
  card3:      0.83,
  card4:      0.91,
  ctaIn:      0.95,
};

// Clamp t between 0 and 1
function clamp(t: number) { return Math.max(0, Math.min(1, t)); }

// Map a value in [a,b] to 0-1
function norm(p: number, a: number, b: number) { return clamp((p - a) / (b - a)); }

// Score color: red → amber → teal
function scoreColor(score: number) {
  if (score < 30) {
    const t = score / 30;
    const r = Math.round(239 + (245 - 239) * t);
    const g = Math.round(68  + (158 - 68)  * t);
    const b = Math.round(68  + (11  - 68)  * t);
    return `rgb(${r},${g},${b})`;
  } else {
    const t = (score - 30) / 31;
    const r = Math.round(245 + (29  - 245) * t);
    const g = Math.round(158 + (158 - 158) * t);
    const b = Math.round(11  + (117 - 11)  * t);
    return `rgb(${r},${g},${b})`;
  }
}

const FEATURES = [
  { icon: "⚡", title: "AI Conductor",     desc: "Tells you exactly what to focus on today" },
  { icon: "🎯", title: "Deep Focus Mode",  desc: "Locks in your top priority, blocks the rest" },
  { icon: "📊", title: "Pillar Scoring",   desc: "Rates 4 life areas 1–4, finds the gap" },
  { icon: "🔔", title: "Check-in Nudges",  desc: "Daily prompts before neglect sets in" },
];

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="6" y="13" width="16" height="11" rx="2.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <path d="M9 13V10a5 5 0 0 1 10 0v3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="18.5" r="1.5" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

export default function ScrollNarrative() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // scroll progress 0-1

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect  = wrapperRef.current.getBoundingClientRect();
      const total = wrapperRef.current.offsetHeight - window.innerHeight;
      setP(clamp(-rect.top / total));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Problem lines ──────────────────────────────────────────────────────────
  const line1Opacity = norm(p, BP.line1In, BP.line1In + 0.06) * (p < BP.line1Dim ? 1 : 0.2);
  const line1Scale   = 0.85 + 0.15 * norm(p, BP.line1In, BP.line1In + 0.06);
  const line2Opacity = norm(p, BP.line2In, BP.line2In + 0.06) * (p < BP.line2Dim ? 1 : 0.2);
  const line2Scale   = 0.85 + 0.15 * norm(p, BP.line2In, BP.line2In + 0.06);
  const line3Opacity = norm(p, BP.line3In, BP.line3In + 0.06);
  const line3Scale   = 0.85 + 0.15 * norm(p, BP.line3In, BP.line3In + 0.06);
  const problemAlpha = p < BP.scoreIn ? 1 : 1 - norm(p, BP.scoreIn, BP.scoreIn + 0.04);

  // ── Score ──────────────────────────────────────────────────────────────────
  const scoreProgress = norm(p, BP.scoreIn + 0.02, BP.scoreEnd);
  const scoreVal      = Math.round(61 * scoreProgress);
  const scoreAlpha    = norm(p, BP.scoreIn, BP.scoreIn + 0.05)
                        * (p < BP.subtextHold ? 1 : 1 - norm(p, BP.subtextHold, BP.card1));
  const subtextAlpha  = norm(p, BP.subtextIn, BP.subtextIn + 0.05)
                        * (p < BP.subtextHold ? 1 : 1 - norm(p, BP.subtextHold, BP.card1));

  // ── Cards ──────────────────────────────────────────────────────────────────
  const cardTriggers  = [BP.card1, BP.card2, BP.card3, BP.card4];
  const cardsAlpha    = norm(p, BP.card1 - 0.02, BP.card1 + 0.04);
  return (
    <div ref={wrapperRef} style={{ height: "650vh" }} className="relative">
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#080F0A" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(29,158,117,0.06) 0%, transparent 70%)`,
          }}
        />

        {/* ── SECTION 1: Problem lines ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
          style={{ opacity: problemAlpha, pointerEvents: "none", transition: "opacity 0.3s ease" }}
        >
          {[
            { text: "Same goals. Same year. Same result.", opacity: line1Opacity, scale: line1Scale },
            { text: "The problem isn't motivation.", opacity: line2Opacity, scale: line2Scale },
            { text: "It's knowing where to focus.", opacity: line3Opacity, scale: line3Scale },
          ].map(({ text, opacity, scale }) => (
            <p
              key={text}
              className="font-bold text-white leading-tight"
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                opacity,
                transform: `scale(${scale})`,
                letterSpacing: "-0.02em",
                transition: "opacity 0.1s linear, transform 0.1s linear",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* ── SECTION 2: Score reveal ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: scoreAlpha, pointerEvents: "none" }}
        >
          <p
            className="font-black leading-none mb-4"
            style={{
              fontSize: "clamp(80px, 14vw, 120px)",
              color: scoreColor(scoreVal),
              letterSpacing: "-0.04em",
              fontVariantNumeric: "tabular-nums",
              transition: "color 0.2s ease",
            }}
          >
            {scoreVal}
            <span style={{ fontSize: "0.45em", fontWeight: 700, opacity: 0.7 }}>%</span>
          </p>

          <div style={{ opacity: subtextAlpha }}>
            <p className="text-lg mb-2" style={{ color: "#6B7280" }}>
              Most people score between 55–70.
            </p>
            <p className="text-lg" style={{ color: "#6B7280" }}>
              Beam shows you exactly why — and what to do about it.
            </p>
          </div>
        </div>

        {/* ── SECTION 3: Feature unlock ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: cardsAlpha, pointerEvents: cardsAlpha > 0.1 ? "auto" : "none" }}
        >
          <div className="w-full max-w-[520px] flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((feat, i) => {
                const trigger    = cardTriggers[i];
                const unlockT    = norm(p, trigger, trigger + 0.025);
                const isUnlocked = unlockT > 0;
                const pulseEnd   = norm(p, trigger, trigger + 0.05);

                return (
                  <div
                    key={feat.title}
                    className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden"
                    style={{
                      background:   "#0D2B1F",
                      border:       `1px solid ${isUnlocked
                        ? `rgba(29,158,117,${0.15 + 0.45 * (1 - pulseEnd)})`
                        : "#1A3A28"}`,
                      opacity:      isUnlocked ? 1 : 0.4,
                      filter:       isUnlocked ? "none" : "blur(3px)",
                      boxShadow:    isUnlocked && pulseEnd < 0.9
                        ? `0 0 0 ${Math.round(3 + 12 * (1 - pulseEnd))}px rgba(29,158,117,${0.12 * (1 - pulseEnd)})`
                        : "none",
                      transform:    isUnlocked
                        ? `scale(${1 + 0.03 * Math.max(0, 1 - pulseEnd * 3)})`
                        : "scale(1)",
                      transition:   "filter 0.4s ease, opacity 0.4s ease, border-color 0.3s ease",
                    }}
                  >
                    {/* Lock overlay */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <LockIcon />
                      </div>
                    )}

                    <span style={{ fontSize: 28, lineHeight: 1 }}>{feat.icon}</span>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "#FFFFFF" }}>
                        {feat.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {feat.desc}
                      </p>
                    </div>

                    {/* Unlock tick */}
                    {isUnlocked && (
                      <div
                        className="absolute top-3 right-3"
                        style={{ opacity: Math.min(1, unlockT * 4) }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" fill="rgba(29,158,117,0.2)" stroke="#1D9E75" strokeWidth="1.2" />
                          <path d="M5 8l2 2 4-4" stroke="#1D9E75" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
