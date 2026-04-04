"use client";
import { useEffect, useRef, useState } from "react";

const PHASES = [
  { label: "Struggling", score: 22, pillars: [15, 10, 8,  25], color: "#D4537E" },
  { label: "Building",   score: 64, pillars: [70, 60, 42, 85], color: "#2E7DD4" },
  { label: "Thriving",   score: 88, pillars: [90, 85, 80, 92], color: "#24A066" },
];

const PILLARS = [
  { name: "Physical",  color: "#24A066" },
  { name: "Mental",    color: "#5E59CC" },
  { name: "Financial", color: "#2E7DD4" },
  { name: "Social",    color: "#D4537E" },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

export default function LifeScoreWidget() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const [progress,  setProgress] = useState(0);
  const [showHint,  setShowHint] = useState(true);
  const hintCleared = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect  = wrapperRef.current.getBoundingClientRect();
      const total = wrapperRef.current.offsetHeight - window.innerHeight;
      const p     = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
      if (!hintCleared.current && p > 0.03) { hintCleared.current = true; setShowHint(false); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phasePos   = progress * 2;
  const fromIdx    = Math.min(Math.floor(phasePos), 1);
  const toIdx      = Math.min(fromIdx + 1, 2);
  const t          = easeInOut(phasePos - fromIdx);
  const score      = Math.round(lerp(PHASES[fromIdx].score, PHASES[toIdx].score, t));
  const pillarVals = PILLARS.map((_, i) => Math.round(lerp(PHASES[fromIdx].pillars[i], PHASES[toIdx].pillars[i], t)));
  const phaseLabel = PHASES[progress < 0.25 ? 0 : progress < 0.75 ? 1 : 2];
  const barColor   = phaseLabel.color;

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "280vh" }}>
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#080F0A" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 50%, ${phaseLabel.color}0F 0%, transparent 70%)`,
            transition: "background 1.2s ease",
          }}
        />

        <div className="relative w-full max-w-[480px] px-6 flex flex-col gap-4">

          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.30)" }}>
              Life Score
            </p>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
              style={{
                color:      phaseLabel.color,
                background: `${phaseLabel.color}1A`,
                border:     `1px solid ${phaseLabel.color}50`,
                transition: "all 0.6s ease",
              }}
            >
              {phaseLabel.label}
            </span>
          </div>

          {/* Score number */}
          <div className="flex items-baseline gap-3">
            <span
              className="font-black leading-none tracking-tighter text-white"
              style={{ fontSize: "clamp(72px,14vw,96px)", fontVariantNumeric: "tabular-nums" }}
            >
              {score}
            </span>
            <span className="text-3xl font-bold" style={{ color: "rgba(255,255,255,0.20)" }}>
              / 100
            </span>
          </div>

          {/* Score track */}
          <div className="rounded-full overflow-hidden" style={{ height: 6, background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width:      `${score}%`,
                background: `linear-gradient(90deg, ${barColor}BB, ${barColor})`,
                boxShadow:  `0 0 12px ${barColor}66`,
                transition: "width 0.12s ease, background 0.6s ease, box-shadow 0.6s ease",
              }}
            />
          </div>

          {/* Pillar rows — matching screenshot style */}
          <div className="flex flex-col gap-2 mt-2">
            {PILLARS.map((pillar, i) => {
              const val = pillarVals[i];
              return (
                <div
                  key={pillar.name}
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "#0D2B1F",
                    border:     "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[15px] font-semibold" style={{ color: "rgba(255,255,255,0.70)" }}>
                      {pillar.name}
                    </span>
                    <span className="text-[15px] font-bold tabular-nums" style={{ color: pillar.color }}>
                      {val}%
                    </span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width:           `${val}%`,
                        backgroundColor: pillar.color,
                        transition:      "width 0.12s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <div
            className="flex flex-col items-center gap-2 mt-1"
            style={{ opacity: showHint ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: "none" }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
              Scroll to progress
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
              style={{ color: "rgba(255,255,255,0.15)", animation: "lsw-bob 1.8s ease-in-out infinite" }}>
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lsw-bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </div>
  );
}
