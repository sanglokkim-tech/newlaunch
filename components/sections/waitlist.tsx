"use client";

import { useState, type FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section
      id="waitlist"
      className="w-full py-[120px] px-6 relative overflow-hidden"
      style={{ backgroundColor: "#0B0B12" }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 50%, rgba(78,205,196,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-[960px] flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#4ECDC4" }}>
          Early access — 200 spots
        </p>

        <h2
          className="text-5xl sm:text-[64px] font-bold leading-tight text-white mb-5"
          style={{ letterSpacing: "-0.02em" }}
        >
          Join the waitlist.
        </h2>

        <p style={{ color: "rgba(240,240,255,0.45)" }} className="text-lg leading-relaxed mb-12 max-w-md">
          Be among the first 200. No spam. Launch notification only.
        </p>

        {submitted ? (
          <p className="text-lg font-semibold" style={{ color: "#4ECDC4" }}>
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-xl"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-2xl px-6 py-4 text-white text-base outline-none transition-all placeholder:text-white/30"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                minWidth: 0,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(78,205,196,0.4)";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(78,205,196,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              className="rounded-2xl px-8 py-4 font-bold text-[#0B0B12] text-base whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(78,205,196,0.35)] active:translate-y-0"
              style={{
                background: "linear-gradient(180deg, #4ECDC4 0%, #2da89f 100%)",
                border: "1px solid rgba(78,205,196,0.3)",
              }}
            >
              Join the waitlist →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
