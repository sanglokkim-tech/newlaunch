const steps = [
  {
    num: "01",
    label: "Rate your pillars",
    desc: "Score each area 1–4 in under 2 minutes",
  },
  {
    num: "02",
    label: "Get your priority",
    desc: "The AI Conductor identifies your biggest gap",
  },
  {
    num: "03",
    label: "Take one action",
    desc: "One focused task. Repeated daily. That's the system.",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div
        className="mx-auto px-6"
        style={{
          maxWidth: "1100px",
          paddingTop: "120px",
          paddingBottom: "120px",
        }}
      >
        {/* Label */}
        <p
          style={{
            color: "#1D9E75",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            margin: 0,
            textAlign: "center",
          }}
        >
          HOW IT WORKS
        </p>

        {/* Heading */}
        <h2
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "#111827",
            margin: "16px 0 0",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Three steps. One clear day.
        </h2>

        {/* Steps */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{
            gap: "32px",
            maxWidth: "900px",
            margin: "56px auto 0",
            position: "relative",
          }}
        >
          {/* Vertical dividers (desktop only) */}
          <div
            aria-hidden
            className="hidden sm:block"
            style={{
              position: "absolute",
              left: "calc(33.333% - 0.5px)",
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "#E5E7EB",
            }}
          />
          <div
            aria-hidden
            className="hidden sm:block"
            style={{
              position: "absolute",
              left: "calc(66.666% - 0.5px)",
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "#E5E7EB",
            }}
          />

          {steps.map((step) => (
            <div key={step.num} style={{ padding: "0 24px" }}>
              <p
                style={{
                  color: "#1D9E75",
                  fontSize: "30px",
                  fontWeight: 700,
                  margin: "0 0 16px",
                }}
              >
                {step.num}
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#111827",
                  margin: "0 0 8px",
                }}
              >
                {step.label}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6B7280",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
