"use client";
import { useState, type FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    await fetch("https://formspree.io/f/mykbwkza", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  }

  return (
    <section id="waitlist" style={{ backgroundColor: "#0F1117" }} className="w-full py-[80px] px-6">
      <div className="mx-auto max-w-[580px] flex flex-col items-center text-center">

        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{ background: "rgba(0,201,167,0.10)", border: "1px solid rgba(0,201,167,0.25)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#00C9A7" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#00C9A7", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Early access — 200 spots
          </span>
        </div>

        <h2
          className="font-bold text-white mb-4"
          style={{ fontSize: "clamp(36px,5vw,56px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          Join the waitlist.
        </h2>

        <p className="mb-10" style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.6, maxWidth: 380 }}>
          Be among the first 200. No spam. Launch notification only.
        </p>

        {submitted ? (
          <p style={{ fontSize: 15, fontWeight: 600, color: "#00C9A7" }}>
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 15,
                color: "#fff",
                minWidth: 0,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "rgba(0,201,167,0.5)"; }}
              onBlur={e  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Join the waitlist →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
