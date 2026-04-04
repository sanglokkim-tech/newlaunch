const STEPS = [
  {
    number: "01", color: "#1D9E75",
    title: "Rate your pillars",
    description: "Score Physical, Mental, Financial, and Social 1–4. Honest, fast, weekly.",
    icon: (c: string) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6" />
        <rect x="12" y="2" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6" />
        <rect x="2" y="12" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6" />
        <rect x="12" y="12" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    number: "02", color: "#7C3AED",
    title: "Get your action list",
    description: "lifeOS surfaces the one pillar that needs attention most and gives you specific, achievable actions for it.",
    icon: (c: string) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 6l2 2 4-4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 7h6" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3 13l2 2 4-4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 14h6" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03", color: "#2563EB",
    title: "Track and adjust",
    description: "Check in daily. Watch your pillars rise together. The system adapts as your life does.",
    icon: (c: string) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polyline points="2,15 7,9 11,12 18,4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="13,4 18,4 18,9"        stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section style={{ backgroundColor: "#F4F5F7" }} className="w-full py-[80px] px-6">
      <div className="mx-auto max-w-[1280px]">
        <p className="section-label mb-5">How it works</p>

        <h2
          className="font-semibold mb-14"
          style={{ fontSize: 32, color: "#111827", letterSpacing: "-0.01em" }}
        >
          Three steps. One system.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STEPS.map((step) => (
            <div key={step.number} className="app-card px-6 py-6 flex flex-col gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}
              >
                {step.icon(step.color)}
              </div>
              <div>
                <p className="text-[11px] font-600 uppercase tracking-[0.1em] mb-1.5" style={{ color: step.color }}>
                  Step {step.number}
                </p>
                <h3 className="font-semibold mb-1.5" style={{ fontSize: 15, color: "#111827" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
