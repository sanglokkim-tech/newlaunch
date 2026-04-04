"use client";

import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("https://formspree.io/f/xvzvolzk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      // still show success to user
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{ backgroundColor: "#F4F5F7" }}
      className="w-full text-center"
    >
      <div
        className="mx-auto px-6"
        style={{
          maxWidth: "1100px",
          paddingTop: "120px",
          paddingBottom: "120px",
        }}
      >
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 mb-8"
          style={{
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: "999px",
            padding: "6px 16px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#1D9E75",
              display: "inline-block",
              animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
            }}
          />
          <span style={{ fontSize: "12px", color: "#6B7280" }}>
            Early access · 200 spots
          </span>
        </div>

        {/* Tagline */}
        <h1
          style={{
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
          }}
          className="text-[40px] sm:text-[64px]"
        >
          <span style={{ color: "#111827", display: "block" }}>
            Stop consuming self-help.
          </span>
          <span style={{ color: "#1D9E75", display: "block" }}>
            Start using it.
          </span>
        </h1>

        {/* Body */}
        <p
          style={{
            fontSize: "17px",
            color: "#6B7280",
            maxWidth: "520px",
            margin: "24px auto 0",
            lineHeight: 1.7,
          }}
        >
          lifeOS gives you a universal system to balance and prioritise every
          area of your life — Physical, Mental, Capital, and Social — so you
          always know exactly what to focus on next.
        </p>

        {/* Email form */}
        {submitted ? (
          <p
            style={{
              marginTop: "40px",
              fontSize: "15px",
              color: "#1D9E75",
              fontWeight: 500,
            }}
          >
            You&apos;re on the list. We&apos;ll be in touch!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: "40px" }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "10px 16px",
                fontSize: "14px",
                color: "#111827",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#1D9E75",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: 500,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Joining…" : "Join waitlist"}
            </button>
          </form>
        )}

        {/* Spot count */}
        <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "12px" }}>
          47 of 200 spots claimed
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
