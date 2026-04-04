const STATS = [
  { stat: "1 in 3",    label: "people feel chronically out of balance",  color: "#24A066" },
  { stat: "68%",       label: "say work crowds out what matters most",    color: "#5E59CC" },
  { stat: "4 pillars", label: "where neglect silently compounds",         color: "#2E7DD4" },
];

export default function Problem() {
  return (
    <section style={{ backgroundColor: "#F5F5F7" }} className="w-full py-[100px] px-6">
      <div className="mx-auto max-w-[960px]">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#24A066" }}>
          The problem
        </p>

        <h2
          className="text-5xl sm:text-[56px] font-bold leading-tight mb-8"
          style={{ letterSpacing: "-0.02em", color: "#1C1C2E" }}
        >
          Most people are busy,<br className="hidden sm:block" /> not balanced.
        </h2>

        <div className="max-w-[680px] space-y-4 mb-14">
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B80" }}>
            You over-invest in what feels urgent and let everything else decay.
            Not because you&apos;re lazy — because nothing tells you what&apos;s actually falling behind.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B80" }}>
            Work gets 80% of your energy. Relationships run on fumes. Health is
            maintenance-mode at best. You feel productive but not whole.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATS.map(({ stat, label, color }) => (
            <div
              key={stat}
              className="app-card px-7 py-7 transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
            >
              <p className="text-4xl font-black mb-2" style={{ color }}>{stat}</p>
              <p className="text-sm leading-snug" style={{ color: "#6B6B80" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
