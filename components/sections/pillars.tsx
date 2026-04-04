"use client";
import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    id: "physical", label: "Physical", score: 72,
    color: "#24a066", front: "#1a6b47", top: "#24a066", right: "#0e3d28",
    subs: [
      { name: "Sleep",             score: 68 },
      { name: "Diet",              score: 74 },
      { name: "Hydration",         score: 80 },
      { name: "Physical activity", score: 82 },
      { name: "Hygiene",           score: 90 },
    ],
  },
  {
    id: "mental", label: "Mental", score: 61,
    color: "#5e59cc", front: "#3d3a8a", top: "#5e59cc", right: "#22205c",
    subs: [
      { name: "Composure",       score: 58 },
      { name: "Self awareness",  score: 65 },
      { name: "Perspective",     score: 70 },
      { name: "Challenge",       score: 55 },
      { name: "Hobbies & rest",  score: 48 },
    ],
  },
  {
    id: "financial", label: "Financial", score: 79,
    color: "#2e7dd4", front: "#1a4d8a", top: "#2e7dd4", right: "#0d2e5c",
    subs: [
      { name: "Discipline",      score: 82 },
      { name: "Productivity",    score: 85 },
      { name: "Knowledge",       score: 70 },
      { name: "Skills & income", score: 78 },
      { name: "Security",        score: 75 },
      { name: "Wealth building", score: 68 },
    ],
  },
  {
    id: "social", label: "Social", score: 55,
    color: "#d45a2e", front: "#8a3a1a", top: "#d45a2e", right: "#5c1e0d",
    subs: [
      { name: "Social skills", score: 62 },
      { name: "Intimacy",      score: 48 },
      { name: "Family",        score: 70 },
      { name: "Friendships",   score: 52 },
      { name: "Community",     score: 40 },
    ],
  },
];

// ─── SVG chart constants ─────────────────────────────────────────────────────
const SVG_W     = 720;
const SVG_H     = 460;
const BAR_W     = 88;
const BAR_DEPTH = 24;
const MIN_H     = 100;
const MAX_H     = 250;
const BASE_Y    = SVG_H - 70;   // 390
const BAR_GAP   = 24;
const SK        = 0.36;
const START_X   = Math.round((SVG_W - (PILLARS.length * BAR_W + (PILLARS.length - 1) * BAR_GAP)) / 2) + 40;

const scores = PILLARS.map((p) => p.score);
const MIN_S  = Math.min(...scores);
const MAX_S  = Math.max(...scores);

function getH(score: number) {
  return Math.round(MIN_H + ((score - MIN_S) / (MAX_S - MIN_S)) * (MAX_H - MIN_H));
}

function pts(points: [number, number][]) {
  return points.map((p) => p.join(",")).join(" ");
}

// ─── Icons ──────────────────────────────────────────────────────────────────
function HeartIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.567 3.067 2 5 2C6.19 2 7.24 2.6 8 3.5C8.76 2.6 9.81 2 11 2C12.933 2 14.5 3.567 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z"
        stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
function BrainIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 13.5C4 13.5 2 12 2 9.5C2 8.5 2.4 7.6 3 7C2.4 6.4 2 5.5 2 4.5C2 3 3.3 2 5 2C5.3 2 5.6 2.05 5.9 2.1C6.2 1.5 6.9 1 7.8 1H8.2C9.1 1 9.8 1.5 10.1 2.1C10.4 2.05 10.7 2 11 2C12.7 2 14 3 14 4.5C14 5.5 13.6 6.4 13 7C13.6 7.6 14 8.5 14 9.5C14 12 12 13.5 10 13.5H6Z"
        stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 2V13.5" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}
function TrendIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 11L6 7L9 10L14 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 4H14V7.5"      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PeopleIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.2" stroke={color} strokeWidth="1.2" />
      <path d="M1.5 13.5C1.5 11 3.5 9.5 6 9.5C8.5 9.5 10.5 11 10.5 13.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11.5" cy="5" r="1.8" stroke={color} strokeWidth="1.2" />
      <path d="M13 10C13.8 10.5 14.5 11.5 14.5 13.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  physical:  HeartIcon,
  mental:    BrainIcon,
  financial: TrendIcon,
  social:    PeopleIcon,
};

// ─── 3-D bar chart ───────────────────────────────────────────────────────────
function PillarChart({ activeId, onToggle }: { activeId: string | null; onToggle: (id: string) => void }) {
  // Isometric grid
  const iso = (gx: number, gy: number) => ({
    x: 30 + gx * 0.62 - gy * 0.62,
    y: BASE_Y + 12 + gx * 0.28 + gy * 0.28,
  });

  const gridLines: JSX.Element[] = [];
  for (let r = 0; r <= 9; r++) {
    const a = iso(0, r * 20), b = iso(16 * 38, r * 20);
    gridLines.push(
      <line key={`hr${r}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
    );
  }
  for (let c = 0; c <= 16; c++) {
    const a = iso(c * 38, 0), b = iso(c * 38, 9 * 20);
    gridLines.push(
      <line key={`vc${c}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
    );
  }

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: "block" }}>
      {/* Grid */}
      <g>{gridLines}</g>

      {/* Floor */}
      <polygon
        points={pts([[20, BASE_Y + 18], [SVG_W - 20, BASE_Y - 52], [SVG_W - 20, BASE_Y - 32], [20, BASE_Y + 38]])}
        fill="#16161a" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
      />

      {/* Bars */}
      {PILLARS.map((p, i) => {
        const bx       = START_X + i * (BAR_W + BAR_GAP);
        const h        = getH(p.score);
        const isActive = activeId === p.id;
        const liftY    = isActive ? -16 : 0;
        const topY     = BASE_Y - h + liftY;

        const rowH = Math.floor(h / p.subs.length);
        const Icon = ICONS[p.id as keyof typeof ICONS];

        // tag dimensions
        const tagW = BAR_W + 30, tagH = 24;
        const tagX = bx - 15, tagY = topY - 42 + liftY;

        return (
          <g key={p.id} style={{ cursor: "pointer" }} onClick={() => onToggle(p.id)}>
            {/* Front face */}
            <polygon
              points={pts([[bx, topY], [bx + BAR_W, topY], [bx + BAR_W, BASE_Y + liftY], [bx, BASE_Y + liftY]])}
              fill={p.front} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"
            />
            {/* Top face */}
            <polygon
              points={pts([[bx, topY], [bx + BAR_W, topY], [bx + BAR_W + BAR_DEPTH, topY - BAR_DEPTH * SK], [bx + BAR_DEPTH, topY - BAR_DEPTH * SK]])}
              fill={p.top} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"
            />
            {/* Right face */}
            <polygon
              points={pts([[bx + BAR_W, topY], [bx + BAR_W + BAR_DEPTH, topY - BAR_DEPTH * SK], [bx + BAR_W + BAR_DEPTH, BASE_Y + liftY - BAR_DEPTH * SK], [bx + BAR_W, BASE_Y + liftY]])}
              fill={p.right} stroke="rgba(0,0,0,0.15)" strokeWidth="0.5"
            />

            {/* Active highlight outline */}
            {isActive && (
              <polygon
                points={pts([[bx, topY], [bx + BAR_W, topY], [bx + BAR_W, BASE_Y + liftY], [bx, BASE_Y + liftY]])}
                fill="none" stroke={p.top} strokeWidth="1.5" opacity="0.6"
              />
            )}

            {/* Sub-pillar row dividers & labels */}
            {p.subs.map((s, si) => {
              const ry = topY + si * rowH;
              return (
                <g key={s.name}>
                  {si > 0 && (
                    <line x1={bx} y1={ry} x2={bx + BAR_W} y2={ry}
                      stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                  )}
                  <text
                    x={bx + 6} y={ry + Math.min(rowH * 0.46, 13)}
                    fontSize="8.5" fill="rgba(255,255,255,0.65)"
                    fontFamily="sans-serif"
                  >
                    {s.name.length > 12 ? s.name.slice(0, 11) + "…" : s.name}
                  </text>
                  <text
                    x={bx + BAR_W - 5} y={ry + Math.min(rowH * 0.46, 13)}
                    fontSize="8.5" fill="rgba(255,255,255,0.9)"
                    fontFamily="sans-serif" textAnchor="end" fontWeight="500"
                  >
                    {s.score}
                  </text>
                  {rowH > 20 && (
                    <>
                      <rect x={bx + 6} y={ry + rowH * 0.62} width={BAR_W - 12} height="2" rx="1" fill="rgba(255,255,255,0.1)" />
                      <rect x={bx + 6} y={ry + rowH * 0.62} width={Math.round((BAR_W - 12) * s.score / 100)} height="2" rx="1" fill="rgba(255,255,255,0.5)" />
                    </>
                  )}
                </g>
              );
            })}

            {/* Floating label tag */}
            <rect x={tagX} y={tagY} width={tagW} height={tagH} rx="5"
              fill="rgba(14,14,16,0.92)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <text
              x={tagX + 22} y={tagY + 15.5}
              fontSize="11" fill="rgba(255,255,255,0.9)"
              fontFamily="sans-serif" fontWeight="500"
            >
              {p.label}
            </text>
            {/* Connector dashed line */}
            <line
              x1={tagX + tagW / 2} y1={tagY + tagH}
              x2={bx + BAR_W / 2}  y2={topY}
              stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="3,3"
            />

            {/* Score below bar */}
            <text
              x={bx + BAR_W / 2} y={BASE_Y + liftY + 36}
              textAnchor="middle" fontSize="22"
              fill={p.top} fontFamily="sans-serif" fontWeight="500"
            >
              {p.score}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Pillars() {
  const [activeId, setActiveId] = useState<string | null>(null);

  function togglePillar(id: string) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  const activePillar = PILLARS.find((p) => p.id === activeId) ?? null;
  const avgScore     = Math.round(PILLARS.reduce((a, p) => a + p.score, 0) / PILLARS.length);

  return (
    <section style={{ backgroundColor: "#0B0B12" }} className="w-full py-[100px] px-6">
      <div className="mx-auto max-w-[780px] flex flex-col gap-5">

        {/* Life score header */}
        <div className="flex flex-col">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] mb-0.5"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Life score
          </span>
          <div className="flex items-baseline gap-2.5">
            <span className="text-[60px] font-medium leading-none" style={{ color: "#e8a020" }}>
              {avgScore}%
            </span>
            <span className="text-[15px] font-medium" style={{ color: "#e8a020" }}>
              Building
            </span>
          </div>
        </div>

        {/* Pillar cards 2×2 */}
        <div className="grid grid-cols-2 gap-2">
          {PILLARS.map((p) => {
            const Icon = ICONS[p.id as keyof typeof ICONS];
            const isActive = activeId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => togglePillar(p.id)}
                className="text-left rounded-[10px] px-3.5 py-3 transition-all duration-150"
                style={{
                  background:   "rgba(255,255,255,0.04)",
                  border:       `0.5px solid ${isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)"}`,
                  cursor:       "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)"; }}
              >
                {/* Top row: icon + name */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon color={p.color} size={15} />
                  <span className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {p.label}
                  </span>
                </div>
                {/* Bar */}
                <div className="h-1 rounded-sm mb-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div className="h-full rounded-sm" style={{ width: `${p.score}%`, background: p.color }} />
                </div>
                {/* Score */}
                <span className="text-2xl font-medium" style={{ color: p.color }}>
                  {p.score}%
                </span>
              </button>
            );
          })}
        </div>

        {/* 3-D bar chart */}
        <div className="w-full">
          <PillarChart activeId={activeId} onToggle={togglePillar} />
        </div>

        {/* Detail panel */}
        {activePillar && (
          <div
            className="w-full rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border:     "0.5px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Panel header */}
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-[15px] font-medium" style={{ color: activePillar.color }}>
                {activePillar.label} pillar
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {activePillar.subs.length} sub-pillars · avg{" "}
                {Math.round(activePillar.subs.reduce((a, s) => a + s.score, 0) / activePillar.subs.length)}
              </span>
            </div>

            {/* Sub-pillar grid */}
            <div className="grid grid-cols-2 gap-2">
              {activePillar.subs.map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border:     "0.5px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="text-[11px] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {s.name}
                  </div>
                  <div className="text-xl font-medium" style={{ color: activePillar.color }}>
                    {s.score}
                  </div>
                  <div className="h-[3px] rounded-sm mt-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-full rounded-sm"
                      style={{ width: `${s.score}%`, background: activePillar.color }}
                    />
                  </div>
                </div>
              ))}
              {/* Pad odd count */}
              {activePillar.subs.length % 2 !== 0 && <div />}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
