"use client";
import { useState, type FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    await fetch("https://formspree.io/f/xvzvolzk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  }

  return (
    <section
      id="waitlist"
      className="w-full py-[100px] px-6 relative overflow-hidden"
      style={{ backgroundColor: "#1C1C2E" }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 25% 60%, rgba(36,160,102,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 55% 50% at 75% 40%, rgba(94,89,204,0.08) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-[580px] flex flex-col items-center text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
          style={{ background: "rgba(36,160,102,0.12)", border: "1px solid rgba(36,160,102,0.25)", color: "#24A066" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#24A066] animate-pulse inline-block" />
          Early access — 200 spots
        </div>

        <h2
          className="text-5xl sm:text-[60px] font-bold leading-tight text-white mb-4"
          style={{ letterSpacing: "-0.025em" }}
        >
          Join the waitlist.
        </h2>

        <p className="text-lg leading-relaxed mb-10 max-w-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Be among the first 200. No spam. Launch notification only.
        </p>

        {submitted ? (
          <p className="text-lg font-semibold" style={{ color: "#24A066" }}>
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 w-full"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 rounded-xl px-5 py-3.5 text-white text-sm outline-none transition-all placeholder-white/30"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                minWidth: 0,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "rgba(36,160,102,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(36,160,102,0.10)"; }}
              onBlur={e =>  { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; e.currentTarget.style.boxShadow = "none"; }}
            />
            <button
              type="submit"
              className="rounded-xl px-7 py-3.5 font-semibold text-sm whitespace-nowrap transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "#24A066",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(36,160,102,0.35)",
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
