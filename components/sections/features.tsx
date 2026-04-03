const PILLAR = {
  body:   { color: "#4ECDC4", rgba: "rgba(78,205,196,",   glow: "glow-body" },
  mind:   { color: "#8B5CF6", rgba: "rgba(139,92,246,",   glow: "glow-mind" },
  wealth: { color: "#60A5FA", rgba: "rgba(96,165,250,",   glow: "glow-wealth" },
  soul:   { color: "#F472B6", rgba: "rgba(244,114,182,",  glow: "glow-soul" },
};

function TargetIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="1.8" />
      <circle cx="14" cy="14" r="6"  stroke={color} strokeWidth="1.8" />
      <circle cx="14" cy="14" r="2"  fill={color} />
    </svg>
  );
}

function LightningIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M16 3L6 16h8l-2 9 12-13h-8l2-9z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="1.8" />
      <path d="M9 14l3.5 3.5L19 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="22" height="19" rx="3" stroke={color} strokeWidth="1.8" />
      <path d="M3 12h22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 3v4M19 3v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="8" y="16" width="3" height="3" rx="0.5" fill={color} opacity="0.6" />
      <rect x="13" y="16" width="3" height="3" rx="0.5" fill={color} opacity="0.6" />
      <rect x="18" y="16" width="3" height="3" rx="0.5" fill={color} opacity="0.6" />
    </svg>
  );
}

const features = [
  {
    pillar: "body" as const,
    Icon: TargetIcon,
    title: "Deep Focus Mode",
    description: "Block out noise and dedicate your session to the one pillar that's falling behind. No context switching.",
  },
  {
    pillar: "mind" as const,
    Icon: LightningIcon,
    title: "AI Conductor",
    description: "Not a chatbot. A quiet intelligence that reads your patterns and nudges you before neglect becomes damage.",
  },
  {
    pillar: "wealth" as const,
    Icon: CheckCircleIcon,
    title: "Daily Check-ins",
    description: "60 seconds. Rate, reflect, move. Small friction, big signal over time.",
  },
  {
    pillar: "soul" as const,
    Icon: CalendarIcon,
    title: "Habit Tracker",
    description: "Attach recurring actions to each pillar. The system knows when you've been consistent — and when you haven't.",
  },
];

export default function Features() {
  return (
    <section style={{ backgroundColor: "#0B0B12" }} className="w-full py-[120px] px-6">
      <div className="mx-auto max-w-[960px]">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#4ECDC4" }}>
          Features
        </p>

        <h2
          className="text-5xl sm:text-[56px] font-bold leading-tight text-white mb-16"
          style={{ letterSpacing: "-0.02em" }}
        >
          Built for consistency,<br className="hidden sm:block" /> not motivation.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ pillar, Icon, title, description }) => {
            const { color, rgba, glow } = PILLAR[pillar];
            return (
              <div
                key={title}
                className={`pillar-card ${glow} rounded-2xl border p-8 flex flex-col gap-5`}
                style={{
                  background: `linear-gradient(135deg, ${rgba}0.04) 0%, #11111C 100%)`,
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                {/* Icon with colored ambient glow */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${rgba}0.10)`,
                    border: `1px solid ${rgba}0.20)`,
                    boxShadow: `0 0 16px ${rgba}0.12)`,
                  }}
                >
                  <Icon color={color} />
                </div>

                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full opacity-0 transition-opacity duration-300"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />

                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                  <p style={{ color: "rgba(240,240,255,0.45)" }} className="text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
