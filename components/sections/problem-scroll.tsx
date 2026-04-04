"use client";

import { useEffect, useRef, useState } from "react";

const lines = [
  { text: "Same goals.", delay: 0 },
  { text: "Same year.", delay: 350 },
  { text: "Same result.", delay: 700 },
];

export default function ProblemScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);
  const [subtextVisible, setSubtextVisible] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          lines.forEach((line, i) => {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, line.delay);
          });

          setTimeout(() => {
            setSubtextVisible(true);
          }, 1200);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Determine which line is "active" (the latest revealed one)
  const lastVisible = visible.lastIndexOf(true);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#F4F5F7", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 text-center gap-8"
    >
      <div className="flex flex-col items-center gap-4">
        {lines.map((line, i) => {
          const isRevealed = visible[i];
          const isDimmed = isRevealed && i < lastVisible;

          return (
            <p
              key={i}
              style={{
                fontWeight: 700,
                color: "#111827",
                margin: 0,
                opacity: isRevealed ? (isDimmed ? 0.15 : 1) : 0,
                transform: isRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                lineHeight: 1.1,
              }}
              className="text-[36px] sm:text-[56px]"
            >
              {line.text}
            </p>
          );
        })}
      </div>

      <p
        style={{
          fontSize: "16px",
          color: "#6B7280",
          margin: 0,
          opacity: subtextVisible ? 1 : 0,
          transition: "opacity 0.6s ease",
          maxWidth: "480px",
        }}
      >
        The problem isn&apos;t motivation. It&apos;s knowing where to focus.
      </p>
    </section>
  );
}
