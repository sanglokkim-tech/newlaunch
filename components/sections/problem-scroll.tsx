"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const line0Ref = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const l0 = line0Ref.current;
      const l1 = line1Ref.current;
      const l2 = line2Ref.current;
      const sub = subtextRef.current;
      const overlay = overlayRef.current;
      if (!l0 || !l1 || !l2 || !sub || !overlay) return;

      // Hide everything initially
      gsap.set([l0, l1, l2], { opacity: 0, y: 40, scale: 0.9 });
      gsap.set(sub, { opacity: 0 });
      gsap.set(overlay, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
        },
      });

      tl
        // Line 1 reveals (0→1)
        .to(l0, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, 0)
        // Line 2 reveals, line 1 dims (1→2)
        .to(l0, { opacity: 0.15, duration: 0.6 }, 1)
        .to(l1, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, 1)
        // Line 3 reveals, line 2 dims (2→3)
        .to(l1, { opacity: 0.15, duration: 0.6 }, 2)
        .to(l2, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, 2)
        // Subtext fades in (3→3.5)
        .to(sub, { opacity: 1, duration: 0.5 }, 3)
        // White overlay transitions to next section (3.6→4)
        .to(overlay, { opacity: 1, duration: 0.4 }, 3.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        background: "#F4F5F7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 16,
        }}
      >
        <p
          ref={line0Ref}
          style={{
            fontWeight: 700,
            color: "#111827",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
          className="text-[36px] sm:text-[56px]"
        >
          Same goals.
        </p>
        <p
          ref={line1Ref}
          style={{
            fontWeight: 700,
            color: "#111827",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
          className="text-[36px] sm:text-[56px]"
        >
          Same year.
        </p>
        <p
          ref={line2Ref}
          style={{
            fontWeight: 700,
            color: "#111827",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
          className="text-[36px] sm:text-[56px]"
        >
          Same result.
        </p>
        <p
          ref={subtextRef}
          style={{
            fontSize: 16,
            color: "#6B7280",
            margin: "24px 0 0",
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          The problem isn&apos;t motivation. It&apos;s knowing where to focus.
        </p>
      </div>

      {/* Transition overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#F4F5F7",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </section>
  );
}
