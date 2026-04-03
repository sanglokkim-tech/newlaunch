const STEP_COLORS = [
  { color: "#4ECDC4", glowClass: "glow-body",   rgba: "rgba(78,205,196," },
  { color: "#8B5CF6", glowClass: "glow-mind",   rgba: "rgba(139,92,246," },
  { color: "#60A5FA", glowClass: "glow-wealth", rgba: "rgba(96,165,250," },
];

function GridIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="10" height="10" rx="2" stroke={color} strokeWidth="1.8" />
      <rect x="18" y="4" width="10" height="10" rx="2" stroke={color} strokeWidth="1.8" />
      <rect x="4" y="18" width="10" height="10" rx="2" stroke={color} strokeWidth="1.8" />
      <rect x="18" y="18" width="10" height="10" rx="2" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function ListCheckIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 10l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 11h11" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 19l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 20h11" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polyline points="4,24 12,16 19,20 28,8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="22,8 28,8 28,14" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const steps = [
  {
    number: "01",
    title: "Rate your pillars",
    description: "Score Body, Mind, Wealth, and Soul 1–4. Honest, fast, weekly.",
    Icon: GridIcon,
  },
  {
    number: "02",
    title: "Get your action list",
    description: "lifeOS surfaces the one pillar that needs attention most and gives you specific, achievable actions for it.",
    Icon: ListCheckIcon,
  },
  {
    number: "03",
    title: "Track and adjust",
    description: "Check in daily. Watch your pillars rise together. The system adapts as your life does.",
    Icon: TrendIcon,
  },
];

export default function HowItWorks() {
  return (
    <section style={{ backgroundColor: "#11111C" }} className="w-full py-[120px] px-6">
      <div className="mx-auto max-w-[960px]">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-center" style={{ color: "#4ECDC4" }}>
          How it works
        </p>

        <h2
          className="text-5xl sm:text-[56px] font-bold leading-tight text-white mb-16 text-center"
          style={{ letterSpacing: "-0.02em" }}
        >
          Three steps. One system.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div
            className="hidden sm:block absolute top-[52px] left-[calc(33.333%+12px)] right-[calc(33.333%+12px)] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, rgba(78,205,196,0.2), rgba(139,92,246,0.2), rgba(96,165,250,0.2))" }}
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const { color, glowClass, rgba } = STEP_COLORS[i];
            return (
              <div
                key={step.number}
                className={`pillar-card ${glowClass} relative rounded-2xl border px-6 py-8 overflow-hidden flex flex-col gap-5`}
                style={{ background: "#16162A", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span
                  className="absolute -top-3 -right-2 text-8xl font-black leading-none select-none pointer-events-none"
                  style={{ color: `${rgba}0.05)` }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <p className="text-5xl font-black leading-none" style={{ color: `${rgba}0.3)` }}>
                  {step.number}
                </p>

                <div><step.Icon color={color} /></div>

                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p style={{ color: "rgba(240,240,255,0.45)" }} className="text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
