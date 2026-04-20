import { NextRequest, NextResponse } from "next/server";

const MAX_NAME = 100;
const MAX_TEXT = 5000;
const VALID_CATEGORIES = new Set(["ux", "feature", "bug", "general"]);

const ipMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW = 60_000;
const MAX_HITS = 5;

function allow(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW });
    return true;
  }
  if (entry.count >= MAX_HITS) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!allow(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, category, feedback } = body as Record<string, unknown>;

  const safeName =
    typeof name === "string" ? name.trim().slice(0, MAX_NAME) : "Anonymous";

  const safeCategory =
    typeof category === "string" && VALID_CATEGORIES.has(category)
      ? category
      : null;

  const safeText =
    typeof feedback === "string" ? feedback.trim().slice(0, MAX_TEXT) : "";

  const id = process.env.FORMSPREE_FEEDBACK;
  if (!id) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: safeName || "Anonymous",
        category: safeCategory,
        feedback: safeText,
        _subject: `lifeOS feedback — ${safeName || "Anonymous"}`,
      }),
    });
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
