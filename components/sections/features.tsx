const FEATURES = [
  {
    color: "#24A066",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#24A066" strokeWidth="1.6" />
        <circle cx="11" cy="11" r="4" stroke="#24A066" strokeWidth="1.6" />
        <circle cx="11" cy="11" r="1.5" fill="#24A066" />
      </svg>
    ),
    title: "Deep Focus Mode",
    description: "Block out noise and dedicate your session to the one pillar that's falling behind. No context switching.",
  },
  {
    color: "#5E59CC",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L4 13h7l-2 7 9-10h-7l2-8z" stroke="#5E59CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI Conductor",
    description: "Not a chatbot. A quiet intelligence that reads your patterns and nudges you before neglect becomes damage.",
  },
  {
    color: "#2E7DD4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#2E7DD4" strokeWidth="1.6" />
        <path d="M7 11l3 3 5-5" stroke="#2E7DD4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Daily Check-ins",
    description: "60 seconds. Rate, reflect, move. Small friction, big signal over time.",
  },
  {
    color: "#D4537E",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="15" rx="2.5" stroke="#D4537E" strokeWidth="1.6" />
        <path d="M2 9h18" stroke="#D4537E" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 2v3M15 2v3" stroke="#D4537E" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="6" y="12" width="2.5" height="2.5" rx="0.5" fill="#D4537E" opacity="0.6" />
        <rect x="9.75" y="12" width="2.5" height="2.5" rx="0.5" fill="#D4537E" opacity="0.6" />
        <rect x="13.5" y="12" width="2.5" height="2.5" rx="0.5" fill="#D4537E" opacity="0.6" />
      </svg>
    ),
    title: "Habit Tracker",
    description: "Attach recurring actions to each pillar. The system knows when you've been consistent — and when you haven't.",
  },
];

export default function Features() {
  return (
    <section style={{ backgroundColor: "#FFFFFF" }} className="w-full py-[100px] px-6">
      <div className="mx-auto max-w-[960px]">
        <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#24A066" }}>
          Features
        </p>

        <h2
          className="text-5xl sm:text-[56px] font-bold leading-tight mb-16"
          style={{ letterSpacing: "-0.02em", color: "#1C1C2E" }}
        >
          Built for consistency,<br className="hidden sm:block" /> not motivation.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ color, icon, title, description }) => (
            <div
              key={title}
              className="app-card p-7 flex flex-col gap-5 transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
            >
              {/* Icon badge */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${color}14`, border: `1px solid ${color}28` }}
              >
                {icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "#1C1C2E" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6B80" }}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
