"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    name: "Physical",
    color: "#1D9E75",
    pct: 70,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Mental",
    color: "#7C3AED",
    pct: 60,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),
  },
  {
    name: "Financial",
    color: "#2563EB",
    pct: 42,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    name: "Social",
    color: "#E11D48",
    pct: 85,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function PillarShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#080F0A" }}>
      <div
        className="mx-auto px-6 text-center"
        style={{ maxWidth: "1100px", paddingTop: "100px", paddingBottom: "100px" }}
      >
        {/* Label */}
        <p
          style={{
            color: "#4ADE80",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            margin: 0,
          }}
        >
          YOUR PILLARS
        </p>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "16px 0 0",
            letterSpacing: "-0.02em",
          }}
        >
          See where you actually stand.
        </h2>

        {/* Subtext */}
        <p style={{ fontSize: "16px", color: "#9CA3AF", margin: "12px 0 0" }}>
          Four areas. Honest scores. One clear priority.
        </p>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            maxWidth: "680px",
            margin: "48px auto 0",
          }}
          className="grid-cols-1 sm:grid-cols-2"
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.name}
              style={{
                backgroundColor: "#0D2B1F",
                border: "1px solid #1A3A28",
                borderRadius: "12px",
                padding: "20px 24px",
                textAlign: "left",
                opacity: triggered ? 1 : 0.15,
                filter: triggered ? "blur(0px)" : "blur(4px)",
                transition: `opacity 0.6s ease ${i * 150}ms, filter 0.6s ease ${i * 150}ms`,
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: pillar.color }}>{pillar.icon}</span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#9CA3AF" }}>
                  {pillar.name}
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: "6px",
                  borderRadius: "999px",
                  backgroundColor: "#1A3A28",
                  overflow: "hidden",
                  marginTop: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "999px",
                    backgroundColor: pillar.color,
                    width: triggered ? `${pillar.pct}%` : "0%",
                    transition: `width 0.8s ease ${i * 150}ms`,
                  }}
                />
              </div>

              {/* Percentage */}
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: pillar.color,
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pillar.pct}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
