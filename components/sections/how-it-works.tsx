"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    label: "Rate your pillars",
    desc: "Score each area 1–4 in under 2 minutes",
  },
  {
    num: "02",
    label: "Get your priority",
    desc: "The AI Conductor identifies your biggest gap",
  },
  {
    num: "03",
    label: "Take one action",
    desc: "One focused task. Repeated daily. That's the system.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
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
    <section ref={sectionRef} style={{ backgroundColor: "#080F0A" }}>
      <div
        className="mx-auto px-6"
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
            textAlign: "center",
            opacity: triggered ? 1 : 0,
            transform: triggered ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          HOW IT WORKS
        </p>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "16px 0 0",
            letterSpacing: "-0.02em",
            textAlign: "center",
            opacity: triggered ? 1 : 0,
            transform: triggered ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 100ms, transform 0.6s ease 100ms",
          }}
        >
          Three steps. One clear day.
        </h2>

        {/* Steps */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ gap: "32px", maxWidth: "900px", margin: "56px auto 0", position: "relative" }}
        >
          {/* Dividers */}
          <div aria-hidden className="hidden sm:block" style={{ position: "absolute", left: "calc(33.333% - 0.5px)", top: 0, bottom: 0, width: "1px", backgroundColor: "#1A3A28" }} />
          <div aria-hidden className="hidden sm:block" style={{ position: "absolute", left: "calc(66.666% - 0.5px)", top: 0, bottom: 0, width: "1px", backgroundColor: "#1A3A28" }} />

          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                padding: "0 24px",
                opacity: triggered ? 1 : 0,
                transform: triggered ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${200 + i * 150}ms, transform 0.6s ease ${200 + i * 150}ms`,
              }}
            >
              <p style={{ color: "#4ADE80", fontSize: "30px", fontWeight: 700, margin: "0 0 16px" }}>
                {step.num}
              </p>
              <p style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", margin: "0 0 8px" }}>
                {step.label}
              </p>
              <p style={{ fontSize: "15px", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
