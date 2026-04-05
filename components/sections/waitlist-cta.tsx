"use client";

import { useEffect, useRef, useState } from "react";

const RATE_LIMIT_MS = 60_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function WaitlistCTA() {
  const barRef = useRef<HTMLDivElement>(null);
  const [barTriggered, setBarTriggered] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lastSubmit = useRef(0);

  useEffect(() => {
    const node = barRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
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
    <section id="waitlist" style={{ backgroundColor: "#080F0A" }}>
      <div
        className="mx-auto px-6 text-center"
        style={{ maxWidth: "1100px", paddingTop: "100px", paddingBottom: "100px" }}
      >
        {/* Label */}
        <p style={{ color: "#4ADE80", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
          EARLY ACCESS
        </p>

        {/* Heading */}
        <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#FFFFFF", margin: "16px 0 0", letterSpacing: "-0.02em" }}>
          Get in before it fills.
        </h2>

        {/* Spot count */}
        <p style={{ color: "#4ADE80", fontSize: "13px", fontWeight: 500, margin: "12px 0 0" }}>
          47 of 200 spots claimed
        </p>

        {/* Progress bar */}
        <div
          ref={barRef}
          style={{ maxWidth: "320px", margin: "16px auto 0", height: "6px", borderRadius: "999px", backgroundColor: "#1A3A28", overflow: "hidden" }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "999px",
              backgroundColor: "#4ADE80",
              width: barTriggered ? "23.5%" : "0%",
              transition: "width 1s ease",
            }}
          />
        </div>

        {/* Form */}
        {submitted ? (
          <p style={{ marginTop: "32px", fontSize: "15px", color: "#4ADE80", fontWeight: 500 }}>
            You&apos;re on the list. We&apos;ll be in touch!
          </p>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              style={{ marginTop: "32px" }}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${error ? "#E11D48" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#fff",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(180deg, #1A3A28 0%, #0D1F16 100%)",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "1px solid rgba(74,222,128,0.2)",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s ease, transform 0.15s ease",
                }}
              >
                {loading ? "Joining…" : "Claim your spot →"}
              </button>
            </form>
            {error && <p style={{ fontSize: "12px", color: "#E11D48", marginTop: "8px" }}>{error}</p>}
          </>
        )}

        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", marginTop: "16px" }}>
          No spam. Launch notification only.
        </p>
      </div>
    </section>
  );
}
