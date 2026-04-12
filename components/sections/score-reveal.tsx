"use client";

import { useEffect, useRef, useState } from "react";

const TARGET = 61;

export default function ScoreReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          animateScore();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function animateScore() {
    const duration = 1400;
    const start = performance.now();

    function frame(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * TARGET);
      setScore(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setScore(TARGET);
        setDone(true);
      }
    }

    requestAnimationFrame(frame);
  }

  const scoreColor = score < 30 ? "#E24B4A" : "#F59E0B";

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Label */}
      <p
        style={{
          color: "#4DB8B0",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          margin: 0,
        }}
      >
        YOUR LIFE SCORE
      </p>

      {/* Score number */}
      <p
        style={{
          color: scoreColor,
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          margin: "16px 0 0",
          lineHeight: 1,
          transition: "color 0.3s ease",
        }}
        className="text-[80px] sm:text-[120px]"
      >
        {score}
      </p>

      {/* Subtext */}
      <div
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 0.8s ease",
          marginTop: "24px",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "#6B7280",
            maxWidth: "400px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Most people score between 55–70%.
          <br />
          Beam shows you exactly why — and what to fix first.
        </p>
      </div>
    </section>
  );
}
