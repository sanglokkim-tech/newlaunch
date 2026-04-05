"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    title: "AI Conductor",
    desc: "Tells you exactly what to focus on today",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    title: "Deep Focus Mode",
    desc: "Locks your top priority. Everything else waits.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Pillar Scoring",
    desc: "Rate 4 life areas 1–4. The gap becomes your priority.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6"  y1="20" x2="6"  y2="14" />
      </svg>
    ),
  },
  {
    title: "Check-in Nudges",
    desc: "Daily prompts before neglect sets in",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

const LOCK_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function FeatureReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [unlocked, setUnlocked] = useState(0);
  const [pulsing, setPulsing] = useState<Set<number>>(new Set());
  const triggered = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          FEATURES.forEach((_, i) => {
            setTimeout(() => {
              setUnlocked((prev) => Math.max(prev, i + 1));
              setPulsing((prev) => new Set([...prev, i]));

              setTimeout(() => {
                setPulsing((prev) => {
                  const next = new Set(prev);
                  next.delete(i);
                  return next;
                });
              }, 600);
            }, i * 400);
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#FFFFFF" }}>
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "1100px", paddingTop: "100px", paddingBottom: "100px" }}
      >
        {/* Label */}
        <p
          style={{
            color: "#1D9E75",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            margin: 0,
            textAlign: "center",
          }}
        >
          WHAT&apos;S INSIDE
        </p>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "#111827",
            margin: "16px 0 0",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Everything you need. Nothing you don&apos;t.
        </h2>

        {/* 2×2 card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            maxWidth: "720px",
            margin: "48px auto 0",
          }}
          className="grid-cols-1 sm:grid-cols-2"
        >
          {FEATURES.map((feat, i) => {
            const isUnlocked = i < unlocked;
            const isPulsing = pulsing.has(i);

            return (
              <div
                key={feat.title}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${isPulsing ? "#1D9E75" : "#E5E7EB"}`,
                  borderRadius: "12px",
                  padding: "20px 24px",
                  position: "relative",
                  opacity: isUnlocked ? 1 : 0.4,
                  filter: isUnlocked ? "blur(0px)" : "blur(6px)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  transition: "opacity 0.5s ease, filter 0.5s ease, border-color 0.3s ease",
                  overflow: "hidden",
                }}
              >
                {/* Lock overlay */}
                {!isUnlocked && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 5,
                    }}
                  >
                    {LOCK_ICON}
                  </div>
                )}

                {/* Icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "#F0FDF4",
                    border: "1px solid #D1FAE5",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1D9E75",
                    marginBottom: 14,
                    opacity: isUnlocked ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  {feat.icon}
                </div>

                {/* Title */}
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", margin: 0 }}>
                  {feat.title}
                </p>

                {/* Description */}
                <p style={{ fontSize: "13px", color: "#6B7280", margin: "6px 0 0", lineHeight: 1.6 }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
