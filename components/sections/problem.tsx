export default function Problem() {
  return (
    <section
      style={{ backgroundColor: "#0B0B12" }}
      className="w-full py-[120px] px-6"
    >
      <div className="mx-auto max-w-[960px]">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#4ECDC4" }}>
          The problem
        </p>

        <h2
          className="text-5xl sm:text-[56px] font-bold leading-tight text-white mb-8"
          style={{ letterSpacing: "-0.02em" }}
        >
          Most people are busy,<br className="hidden sm:block" /> not balanced.
        </h2>

        <div className="max-w-[680px] space-y-5 mb-16">
          <p style={{ color: "rgba(240,240,255,0.55)" }} className="text-lg leading-relaxed">
            You over-invest in what feels urgent and let everything else decay.
            Not because you&apos;re lazy — because nothing tells you what&apos;s
            actually falling behind.
          </p>
          <p style={{ color: "rgba(240,240,255,0.55)" }} className="text-lg leading-relaxed">
            Work gets 80% of your energy. Relationships run on fumes. Health is
            maintenance-mode at best. You feel productive but not whole.
          </p>
        </div>

        {/* Stat cards — one per pillar color */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { stat: "1 in 3", label: "people feel chronically out of balance", color: "#4ECDC4", glowClass: "glow-body" },
            { stat: "68%",    label: "say work crowds out what matters most",  color: "#8B5CF6", glowClass: "glow-mind" },
            { stat: "4 pillars", label: "where neglect silently compounds",    color: "#60A5FA", glowClass: "glow-wealth" },
          ].map(({ stat, label, color, glowClass }) => (
            <div
              key={stat}
              className={`pillar-card ${glowClass} rounded-2xl border px-8 py-8`}
              style={{
                background: "#11111C",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-4xl font-black mb-3" style={{ color }}>{stat}</p>
              <p style={{ color: "rgba(240,240,255,0.45)" }} className="text-sm leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
