function GridIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.6" />
      <rect x="13" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.6" />
      <rect x="2" y="13" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function ListCheckIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 7l2.5 2.5L10 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 7h6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 14l2.5 2.5L10 11" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 14h6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <polyline points="2,17 8,11 13,14 20,5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="15,5 20,5 20,10" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STEP_COLORS = ["#24A066", "#5E59CC", "#2E7DD4"];

const steps = [
  { number: "01", title: "Rate your pillars",     description: "Score Body, Mind, Wealth, and Soul 1–4. Honest, fast, weekly.",                                                                     Icon: GridIcon },
  { number: "02", title: "Get your action list",  description: "lifeOS surfaces the one pillar that needs attention most and gives you specific, achievable actions for it.",                        Icon: ListCheckIcon },
  { number: "03", title: "Track and adjust",      description: "Check in daily. Watch your pillars rise together. The system adapts as your life does.",                                             Icon: TrendIcon },
];

export default function HowItWorks() {
  return (
    <section style={{ backgroundColor: "#FFFFFF" }} className="w-full py-[100px] px-6">
      <div className="mx-auto max-w-[960px]">
        <p className="text-xs font-semibold uppercase tracking-widest mb-5 text-center" style={{ color: "#24A066" }}>
          How it works
        </p>

        <h2
          className="text-5xl sm:text-[56px] font-bold leading-tight mb-16 text-center"
          style={{ letterSpacing: "-0.02em", color: "#1C1C2E" }}
        >
          Three steps. One system.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative">
          {/* Connector */}
          <div
            className="hidden sm:block absolute top-[52px] left-[calc(33.333%+12px)] right-[calc(33.333%+12px)] h-px pointer-events-none"
            style={{ background: "rgba(0,0,0,0.08)" }}
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const color = STEP_COLORS[i];
            return (
              <div
                key={step.number}
                className="app-card relative px-6 py-7 flex flex-col gap-5 overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.10)] transition-shadow duration-200"
              >
                {/* Ghost number */}
                <span
                  className="absolute -top-2 -right-1 text-8xl font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(0,0,0,0.04)" }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon badge */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}14`, border: `1px solid ${color}28` }}
                >
                  <step.Icon color={color} />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                    Step {step.number}
                  </p>
                  <h3 className="font-semibold text-lg mb-1.5" style={{ color: "#1C1C2E" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B6B80" }}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
