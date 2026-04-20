"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/sections/nav";
import Footer from "@/components/sections/footer";

// ── Types ──────────────────────────────────────────────────────────────────

type Category = "ux" | "feature" | "bug" | "general";

// ── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES: { id: Category; label: string; icon: string; placeholder: string }[] = [
  {
    id: "ux",
    label: "UX",
    icon: "✦",
    placeholder:
      "What felt clunky, confusing, or off? Be specific — which screen, which moment. The more detail, the faster we fix it.",
  },
  {
    id: "feature",
    label: "Feature Request",
    icon: "◈",
    placeholder:
      "What do you wish lifeOS could do? Describe the gap — what are you trying to accomplish that isn't possible yet?",
  },
  {
    id: "bug",
    label: "Bug",
    icon: "⚠",
    placeholder:
      "What broke? Tell us what you were doing, what you expected, and what actually happened. Device and browser helps too.",
  },
  {
    id: "general",
    label: "General",
    icon: "◎",
    placeholder:
      "Anything on your mind — a reaction, an observation, something that surprised you. No format required.",
  },
];


// ── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        color: "#4DB8B0",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        margin: "0 0 12px",
      }}
    >
      {children}
    </p>
  );
}


// ── Slider ─────────────────────────────────────────────────────────────────


// ── Success state ──────────────────────────────────────────────────────────

function SuccessScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 480,
        textAlign: "center",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Glow ring */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(77,184,176,0.08)",
          border: "1.5px solid rgba(77,184,176,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          boxShadow: "0 0 32px rgba(77,184,176,0.15)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4DB8B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p
        style={{
          color: "#4DB8B0",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 12,
        }}
      >
        Received
      </p>
      <h2
        style={{
          fontSize: "clamp(24px, 3vw, 34px)",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
          marginBottom: 14,
        }}
      >
        Thanks for taking the time.
      </h2>
      <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, maxWidth: 360 }}>
        Your feedback goes directly into the build queue. Every note is read — nothing is ignored.
      </p>

      <a
        href="/"
        style={{
          marginTop: 36,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          fontWeight: 500,
          color: "#4DB8B0",
          textDecoration: "none",
          borderBottom: "1px solid rgba(77,184,176,0.3)",
          paddingBottom: 2,
          transition: "opacity 0.15s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
      >
        ← Back to lifeOS
      </a>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activePlaceholder =
    category
      ? CATEGORIES.find((c) => c.id === category)!.placeholder
      : "What's on your mind? Start anywhere — there's no wrong answer.";

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 140)}px`;
  }, [text]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim().slice(0, 100) || "Anonymous",
          category,
          feedback: text.slice(0, 5000),
        }),
      });
      if (!res.ok && res.status !== 429) throw new Error("failed");
    } catch {
      // best-effort: show success even on network error
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ background: "#F4F5F7", minHeight: "100vh" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px" }}>
            <SuccessScreen />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main style={{ background: "#F4F5F7", minHeight: "100vh" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px 120px" }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 56 }}>
            <SectionLabel>Your voice</SectionLabel>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                margin: "0 0 14px",
              }}
            >
              Tell us what&apos;s working.<br />Tell us what&apos;s not.
            </h1>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>
              Honest feedback shapes what lifeOS becomes. No filters needed.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── Card 0: Name ── */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "28px 32px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                marginBottom: 16,
              }}
            >
              <SectionLabel>Who&apos;s sharing?</SectionLabel>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: "-0.01em",
                  margin: "0 0 16px",
                }}
              >
                What&apos;s your name?
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name or handle — totally optional"
                style={{
                  width: "100%",
                  background: "#FAFAFA",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "12px 16px",
                  fontSize: 14,
                  color: "#111827",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(77,184,176,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(77,184,176,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* ── Card 2: Category ── */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "28px 32px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                marginBottom: 16,
              }}
            >
              <SectionLabel>Category</SectionLabel>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: "-0.01em",
                  margin: "0 0 20px",
                }}
              >
                What kind of feedback is this?
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {CATEGORIES.map(({ id, label, icon }) => {
                  const isActive = category === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setCategory(isActive ? null : id);
                        setTimeout(() => textareaRef.current?.focus(), 100);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "13px 16px",
                        background: isActive ? "rgba(77,184,176,0.06)" : "#FAFAFA",
                        border: `1.5px solid ${isActive ? "#4DB8B0" : "#E5E7EB"}`,
                        borderRadius: 10,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.18s ease",
                        boxShadow: isActive ? "0 0 0 3px rgba(77,184,176,0.10)" : "none",
                      }}
                    >
                      <span
                        style={{
                          width: 30,
                          height: 30,
                          background: isActive ? "rgba(77,184,176,0.12)" : "#F3F4F6",
                          border: `1px solid ${isActive ? "rgba(77,184,176,0.3)" : "#E5E7EB"}`,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          color: isActive ? "#4DB8B0" : "#9CA3AF",
                          flexShrink: 0,
                          transition: "all 0.18s ease",
                        }}
                      >
                        {icon}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: isActive ? "#111827" : "#374151",
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Card 3: Deep feedback ── */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "28px 32px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                marginBottom: 16,
              }}
            >
              <SectionLabel>In your own words</SectionLabel>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: "-0.01em",
                  margin: "0 0 16px",
                }}
              >
                {category
                  ? CATEGORIES.find((c) => c.id === category)!.label
                  : "What do you want us to know?"}
              </p>

              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={activePlaceholder}
                style={{
                  width: "100%",
                  minHeight: 140,
                  background: "#FAFAFA",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "14px 16px",
                  fontSize: 14,
                  color: "#111827",
                  lineHeight: 1.7,
                  resize: "none",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  overflow: "hidden",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(77,184,176,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(77,184,176,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: text.length > 10 ? "#4DB8B0" : "#D1D5DB", transition: "color 0.2s ease" }}>
                  {text.length} characters
                </span>
              </div>
            </div>

            {/* ── Submit ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  background: "#4DB8B0",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 8px 24px rgba(77,184,176,0.22)",
                  transform: "none",
                }}
                onMouseOver={(e) => {
                  if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                }}
              >
                {loading ? "Sending…" : "Send feedback →"}
              </button>

              <p style={{ fontSize: 12, color: "#9CA3AF" }}>
                Anonymous by default. No account needed.
              </p>
            </div>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
