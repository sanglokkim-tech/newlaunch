"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/sections/nav";
import Footer from "@/components/sections/footer";

// ── Types ──────────────────────────────────────────────────────────────────

type Category = "ux" | "feature" | "bug" | "general";
type Rating = 1 | 2 | 3 | 4 | 5;

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
      "What do you wish beam could do? Describe the gap — what are you trying to accomplish that isn't possible yet?",
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

const RATING_CONFIG: { value: Rating; emoji: string; label: string }[] = [
  { value: 1, emoji: "😞", label: "Frustrated" },
  { value: 2, emoji: "😐", label: "Meh" },
  { value: 3, emoji: "🙂", label: "Decent" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "🤩", label: "Loving it" },
];

const SLIDER_CONFIG = [
  { id: "ease", label: "Ease of use", left: "Confusing", right: "Effortless" },
  { id: "value", label: "Value", left: "Not useful", right: "Essential" },
  { id: "design", label: "Design", left: "Cluttered", right: "Pristine" },
] as const;

type SliderId = (typeof SLIDER_CONFIG)[number]["id"];

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

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background: "#E5E7EB",
        margin: "48px 0",
      }}
    />
  );
}

// ── Slider ─────────────────────────────────────────────────────────────────

function FeedbackSlider({
  id,
  label,
  left,
  right,
  value,
  onChange,
}: {
  id: string;
  label: string;
  left: string;
  right: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - 1) / 4) * 100;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{label}</span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#4DB8B0",
            background: "rgba(77,184,176,0.08)",
            border: "1px solid rgba(77,184,176,0.2)",
            borderRadius: 6,
            padding: "2px 10px",
            minWidth: 28,
            textAlign: "center",
            transition: "all 0.2s ease",
          }}
        >
          {value}
        </span>
      </div>

      <div style={{ position: "relative", height: 36, display: "flex", alignItems: "center" }}>
        {/* Track */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 6,
            background: "#E5E7EB",
            borderRadius: 999,
          }}
        />
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: 6,
            background: "#4DB8B0",
            borderRadius: 999,
            transition: "width 0.15s ease",
          }}
        />
        {/* Input */}
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            opacity: 0,
            cursor: "pointer",
            height: "100%",
          }}
        />
        {/* Thumb visual */}
        <div
          style={{
            position: "absolute",
            left: `calc(${pct}% - 10px)`,
            width: 20,
            height: 20,
            background: "#FFFFFF",
            border: "2px solid #4DB8B0",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(77,184,176,0.3)",
            transition: "left 0.15s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{left}</span>
        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{right}</span>
      </div>
    </div>
  );
}

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
        ← Back to beam
      </a>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function FeedbackPage() {
  const [rating, setRating] = useState<Rating | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [text, setText] = useState("");
  const [sliders, setSliders] = useState<Record<SliderId, number>>({
    ease: 3,
    value: 3,
    design: 3,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<Rating | null>(null);

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
    if (!rating) return;
    setLoading(true);

    // Fire-and-forget — replace with your endpoint
    try {
      await fetch("https://formspree.io/f/mykbwkza", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          rating,
          category,
          feedback: text,
          sliders,
          _subject: `beam feedback — ${RATING_CONFIG[rating - 1].label}`,
        }),
      });
    } catch {
      // submit anyway
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
              Honest feedback shapes what beam becomes. No filters needed.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── Card 1: Quick rating ── */}
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
              <SectionLabel>Quick pulse</SectionLabel>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: "-0.01em",
                  margin: "0 0 24px",
                }}
              >
                How&apos;s beam feeling today?
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {RATING_CONFIG.map(({ value, emoji, label }) => {
                  const isActive = rating === value;
                  const isHovered = hoveredRating === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(null)}
                      style={{
                        flex: "1 1 0",
                        minWidth: 72,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        padding: "14px 8px",
                        background: isActive ? "rgba(77,184,176,0.06)" : "#FFFFFF",
                        border: `1.5px solid ${isActive ? "#4DB8B0" : isHovered ? "#D1D5DB" : "#E5E7EB"}`,
                        borderRadius: 12,
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                        transform: isHovered && !isActive ? "translateY(-2px)" : "none",
                        boxShadow: isActive ? "0 0 0 3px rgba(77,184,176,0.12)" : isHovered ? "0 4px 12px rgba(0,0,0,0.07)" : "none",
                      }}
                    >
                      <span style={{ fontSize: 26, lineHeight: 1, transition: "transform 0.2s ease", transform: isHovered ? "scale(1.15)" : "scale(1)" }}>
                        {emoji}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? "#4DB8B0" : "#9CA3AF" }}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
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

            {/* ── Card 4: Sliders ── */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "28px 32px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                marginBottom: 32,
              }}
            >
              <SectionLabel>Score the experience</SectionLabel>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: "-0.01em",
                  margin: "0 0 28px",
                }}
              >
                Rate the three pillars of the product.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {SLIDER_CONFIG.map(({ id, label, left, right }) => (
                  <FeedbackSlider
                    key={id}
                    id={id}
                    label={label}
                    left={left}
                    right={right}
                    value={sliders[id]}
                    onChange={(v) => setSliders((prev) => ({ ...prev, [id]: v }))}
                  />
                ))}
              </div>

              {/* Aggregate summary */}
              <div
                style={{
                  marginTop: 32,
                  padding: "14px 16px",
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
                    Overall
                  </p>
                  <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0", lineHeight: 1.5 }}>
                    Based on your three ratings
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    color: "#4DB8B0",
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {((sliders.ease + sliders.value + sliders.design) / 3).toFixed(1)}
                  </span>
                  <span style={{ fontSize: 13, color: "#9CA3AF" }}>/5</span>
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              {!rating && (
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>
                  Select a rating to submit
                </p>
              )}
              <button
                type="submit"
                disabled={!rating || loading}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  background: rating ? "#4DB8B0" : "#E5E7EB",
                  color: rating ? "#FFFFFF" : "#9CA3AF",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  cursor: rating && !loading ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                  boxShadow: rating ? "0 8px 24px rgba(77,184,176,0.22)" : "none",
                  transform: "none",
                }}
                onMouseOver={(e) => {
                  if (rating && !loading) e.currentTarget.style.transform = "translateY(-1px)";
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
