"use client";
import { useState, type ReactElement } from "react";

const P_COLOR = {
  physical:  "#1D9E75",
  mental:    "#7C3AED",
  financial: "#2563EB",
  social:    "#E11D48",
};

const PILLARS = [
  {
    id: "physical",  label: "Physical",  score: 72, status: "Growing",
    color: P_COLOR.physical,
    subs: [
      { name: "Sleep",             score: 68 },
      { name: "Diet",              score: 74 },
      { name: "Hydration",         score: 80 },
      { name: "Physical activity", score: 82 },
      { name: "Hygiene",           score: 90 },
    ],
  },
  {
    id: "mental",    label: "Mental",    score: 61, status: "Building",
    color: P_COLOR.mental,
    subs: [
      { name: "Composure",       score: 58 },
      { name: "Self awareness",  score: 65 },
      { name: "Perspective",     score: 70 },
      { name: "Challenge",       score: 55 },
      { name: "Hobbies & rest",  score: 48 },
    ],
  },
  {
    id: "financial", label: "Financial", score: 79, status: "Building",
    color: P_COLOR.financial,
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
    id: "social",    label: "Social",    score: 55, status: "Struggling",
    color: P_COLOR.social,
    subs: [
      { name: "Social skills", score: 62 },
      { name: "Intimacy",      score: 48 },
      { name: "Family",        score: 70 },
      { name: "Friendships",   score: 52 },
      { name: "Community",     score: 40 },
    ],
  },
];

const AVG = Math.round(PILLARS.reduce((a, p) => a + p.score, 0) / PILLARS.length);

// ── Icons ──────────────────────────────────────────────────────────────────────
function HeartIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.567 3.067 2 5 2C6.19 2 7.24 2.6 8 3.5C8.76 2.6 9.81 2 11 2C12.933 2 14.5 3.567 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function BrainIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 13.5C4 13.5 2 12 2 9.5C2 8.5 2.4 7.6 3 7C2.4 6.4 2 5.5 2 4.5C2 3 3.3 2 5 2C5.3 2 5.6 2.05 5.9 2.1C6.2 1.5 6.9 1 7.8 1H8.2C9.1 1 9.8 1.5 10.1 2.1C10.4 2.05 10.7 2 11 2C12.7 2 14 3 14 4.5C14 5.5 13.6 6.4 13 7C13.6 7.6 14 8.5 14 9.5C14 12 12 13.5 10 13.5H6Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 2V13.5" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}
function TrendUpIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 11L6 7L9 10L14 4"  stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 4H14V7.5"       stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PeopleIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.2" stroke={color} strokeWidth="1.3" />
      <path d="M1.5 13.5C1.5 11 3.5 9.5 6 9.5C8.5 9.5 10.5 11 10.5 13.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="11.5" cy="5" r="1.8" stroke={color} strokeWidth="1.3" />
      <path d="M13 10C13.8 10.5 14.5 11.5 14.5 13.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function ChevronRight({ color = "#9CA3AF" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ListIcon({ color = "#9CA3AF" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4"    width="12" height="1.5" rx="0.75" fill={color} />
      <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill={color} />
      <rect x="2" y="10.5" width="8"  height="1.5" rx="0.75" fill={color} />
    </svg>
  );
}
function PyramidIcon({ color = "#9CA3AF" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14 13H2L8 2Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5 9h6"            stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  physical: HeartIcon, mental: BrainIcon, financial: TrendUpIcon, social: PeopleIcon,
};

// ── 3-D pyramid chart ──────────────────────────────────────────────────────────
const SVG_W = 720, SVG_H = 440, BAR_W = 88, BAR_DEPTH = 24, SK = 0.36;
const MIN_H = 100, MAX_H = 240, BASE_Y = SVG_H - 70, BAR_GAP = 24;
const START_X = Math.round((SVG_W - (PILLARS.length * BAR_W + (PILLARS.length - 1) * BAR_GAP)) / 2) + 40;
const pScores = PILLARS.map(p => p.score);
const MIN_S = Math.min(...pScores), MAX_S = Math.max(...pScores);
function getH(s: number) { return Math.round(MIN_H + ((s - MIN_S) / (MAX_S - MIN_S)) * (MAX_H - MIN_H)); }
function pts(points: [number, number][]) { return points.map(p => p.join(",")).join(" "); }

const FACES: Record<string, { front: string; top: string; right: string }> = {
  physical:  { front: "#145f47", top: "#1D9E75", right: "#0a3829" },
  mental:    { front: "#4c2194", top: "#7C3AED", right: "#2d1259" },
  financial: { front: "#153d8a", top: "#2563EB", right: "#0c2557" },
  social:    { front: "#8a1030", top: "#E11D48", right: "#570a1e" },
};

function PyramidChart({ activeId, onToggle }: { activeId: string | null; onToggle: (id: string) => void }) {
  const iso = (gx: number, gy: number) => ({ x: 30 + gx * 0.62 - gy * 0.62, y: BASE_Y + 12 + gx * 0.28 + gy * 0.28 });
  const gridLines: ReactElement[] = [];
  for (let r = 0; r <= 9; r++) {
    const a = iso(0, r * 20), b = iso(16 * 38, r * 20);
    gridLines.push(<line key={`hr${r}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />);
  }
  for (let c = 0; c <= 16; c++) {
    const a = iso(c * 38, 0), b = iso(c * 38, 9 * 20);
    gridLines.push(<line key={`vc${c}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />);
  }
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#0e0e0f" }}>
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: "block" }}>
        <g>{gridLines}</g>
        <polygon points={pts([[20,BASE_Y+18],[SVG_W-20,BASE_Y-52],[SVG_W-20,BASE_Y-32],[20,BASE_Y+38]])} fill="#16161a" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        {PILLARS.map((p, i) => {
          const f = FACES[p.id];
          const bx = START_X + i * (BAR_W + BAR_GAP);
          const h  = getH(p.score);
          const isActive = activeId === p.id;
          const liftY = isActive ? -16 : 0;
          const topY  = BASE_Y - h + liftY;
          const rowH  = Math.floor(h / p.subs.length);
          const tagW  = BAR_W + 30, tagH = 24, tagX = bx - 15, tagY = topY - 42 + liftY;
          return (
            <g key={p.id} style={{ cursor: "pointer" }} onClick={() => onToggle(p.id)}>
              <polygon points={pts([[bx,topY],[bx+BAR_W,topY],[bx+BAR_W,BASE_Y+liftY],[bx,BASE_Y+liftY]])} fill={f.front} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <polygon points={pts([[bx,topY],[bx+BAR_W,topY],[bx+BAR_W+BAR_DEPTH,topY-BAR_DEPTH*SK],[bx+BAR_DEPTH,topY-BAR_DEPTH*SK]])} fill={f.top} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              <polygon points={pts([[bx+BAR_W,topY],[bx+BAR_W+BAR_DEPTH,topY-BAR_DEPTH*SK],[bx+BAR_W+BAR_DEPTH,BASE_Y+liftY-BAR_DEPTH*SK],[bx+BAR_W,BASE_Y+liftY]])} fill={f.right} stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
              {isActive && <polygon points={pts([[bx,topY],[bx+BAR_W,topY],[bx+BAR_W,BASE_Y+liftY],[bx,BASE_Y+liftY]])} fill="none" stroke={f.top} strokeWidth="1.5" opacity="0.7" />}
              {p.subs.map((s, si) => {
                const ry = topY + si * rowH;
                return (
                  <g key={s.name}>
                    {si > 0 && <line x1={bx} y1={ry} x2={bx+BAR_W} y2={ry} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />}
                    <text x={bx+6} y={ry+Math.min(rowH*0.46,13)} fontSize="8.5" fill="rgba(255,255,255,0.65)" fontFamily="sans-serif">
                      {s.name.length > 12 ? s.name.slice(0,11)+"…" : s.name}
                    </text>
                    <text x={bx+BAR_W-5} y={ry+Math.min(rowH*0.46,13)} fontSize="8.5" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif" textAnchor="end" fontWeight="500">{s.score}</text>
                    {rowH > 20 && (<>
                      <rect x={bx+6} y={ry+rowH*0.62} width={BAR_W-12} height="2" rx="1" fill="rgba(255,255,255,0.08)" />
                      <rect x={bx+6} y={ry+rowH*0.62} width={Math.round((BAR_W-12)*s.score/100)} height="2" rx="1" fill="rgba(255,255,255,0.45)" />
                    </>)}
                  </g>
                );
              })}
              <rect x={tagX} y={tagY} width={tagW} height={tagH} rx="5" fill="rgba(14,14,16,0.92)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <text x={tagX+10} y={tagY+15.5} fontSize="11" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif" fontWeight="500">{p.label}</text>
              <line x1={tagX+tagW/2} y1={tagY+tagH} x2={bx+BAR_W/2} y2={topY} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="3,3" />
              <text x={bx+BAR_W/2} y={BASE_Y+liftY+36} textAnchor="middle" fontSize="22" fill={f.top} fontFamily="sans-serif" fontWeight="500">{p.score}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Pillars() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tab, setTab] = useState<"list" | "pyramid">("list");

  function togglePillar(id: string) { setActiveId(prev => prev === id ? null : id); }
  const activePillar = PILLARS.find(p => p.id === activeId) ?? null;

  return (
    <section style={{ backgroundColor: "#F4F5F7" }} className="w-full py-[80px] px-6">
      <div className="mx-auto max-w-[780px] flex flex-col gap-4">

        {/* ── Life Score card ── */}
        <div className="app-card p-6">
          <p className="section-label mb-2">Life Score</p>

          <div className="flex items-baseline gap-2 mb-5">
            <span className="font-bold leading-none" style={{ fontSize: 64, color: "#F59E0B", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
              {AVG}
            </span>
            <span className="font-semibold" style={{ fontSize: 18, color: "#F59E0B" }}>%</span>
            <span className="font-semibold ml-1" style={{ fontSize: 15, color: "#F59E0B" }}>Building</span>
          </div>

          {/* 2×2 pillar grid */}
          <div className="grid grid-cols-2 gap-3">
            {PILLARS.map(p => {
              const Icon = ICONS[p.id as keyof typeof ICONS];
              const isActive = activeId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => togglePillar(p.id)}
                  className="text-left rounded-xl px-4 py-4 transition-all duration-150"
                  style={{
                    background:  "#FFFFFF",
                    border:      `1px solid ${isActive ? p.color + "50" : "#E5E7EB"}`,
                    boxShadow:   isActive ? `0 0 0 3px ${p.color}14` : "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <Icon color={p.color} size={15} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{p.label}</span>
                  </div>
                  <div className="bar-track mb-3">
                    <div className="bar-fill" style={{ width: `${p.score}%`, backgroundColor: p.color }} />
                  </div>
                  <span style={{ fontSize: 28, fontWeight: 700, color: p.color }}>{p.score}%</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab toggle ── */}
        <div className="flex gap-1.5 p-1.5 rounded-xl" style={{ background: "rgba(0,0,0,0.05)" }}>
          <button className={`tab-pill${tab === "list" ? " active" : ""}`} onClick={() => setTab("list")}>
            <ListIcon color={tab === "list" ? "#111827" : "#9CA3AF"} /> List
          </button>
          <button className={`tab-pill${tab === "pyramid" ? " active" : ""}`} onClick={() => setTab("pyramid")}>
            <PyramidIcon color={tab === "pyramid" ? "#111827" : "#9CA3AF"} /> Pyramid
          </button>
        </div>

        {/* ── List view ── */}
        {tab === "list" && (
          <div className="app-card overflow-hidden">
            {PILLARS.map((p, i) => {
              const Icon = ICONS[p.id as keyof typeof ICONS];
              const isActive = activeId === p.id;
              return (
                <div key={p.id} style={{ borderTop: i > 0 ? "1px solid #E5E7EB" : "none" }}>
                  <button
                    onClick={() => togglePillar(p.id)}
                    className="w-full flex items-center gap-4 px-5 py-4 transition-colors duration-150"
                    style={{ background: isActive ? `${p.color}06` : "transparent" }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${p.color}14`, border: `1px solid ${p.color}28` }}
                    >
                      <Icon color={p.color} size={15} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 6 }}>{p.label}</p>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${p.score}%`, backgroundColor: p.color }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <div className="text-right">
                        <p style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.score}%</p>
                        <p style={{ fontSize: 11, color: "#9CA3AF" }}>{p.status}</p>
                      </div>
                      <ChevronRight color={isActive ? p.color : "#9CA3AF"} />
                    </div>
                  </button>

                  {/* Sub-pillar panel */}
                  {isActive && (
                    <div className="px-5 pb-5" style={{ borderTop: "1px solid #E5E7EB" }}>
                      <p className="section-label pt-4 pb-3">
                        Sub-pillars · avg {Math.round(p.subs.reduce((a, s) => a + s.score, 0) / p.subs.length)}
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {p.subs.map(s => (
                          <div
                            key={s.name}
                            className="rounded-xl px-3.5 py-3"
                            style={{ background: "#F4F5F7", border: "1px solid #E5E7EB" }}
                          >
                            <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>{s.name}</p>
                            <p style={{ fontSize: 22, fontWeight: 700, color: p.color, marginBottom: 8 }}>{s.score}</p>
                            <div className="bar-track">
                              <div className="bar-fill" style={{ width: `${s.score}%`, backgroundColor: p.color }} />
                            </div>
                          </div>
                        ))}
                        {p.subs.length % 2 !== 0 && <div />}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pyramid view ── */}
        {tab === "pyramid" && <PyramidChart activeId={activeId} onToggle={togglePillar} />}

      </div>
    </section>
  );
}
