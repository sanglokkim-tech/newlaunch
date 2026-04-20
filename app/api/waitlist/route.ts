import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL = 254;

const ipMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW = 60_000;
const MAX_HITS = 3;

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

  const { email, website } = body as Record<string, unknown>;

  if (website) return NextResponse.json({ ok: true }); // honeypot

  if (
    typeof email !== "string" ||
    email.length > MAX_EMAIL ||
    !EMAIL_RE.test(email.trim().toLowerCase())
  ) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const id = process.env.FORMSPREE_WAITLIST;
  if (!id) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
