import { NextResponse } from "next/server";

/**
 * Contact submissions.
 *
 * Delivery is intentionally pluggable: set CONTACT_WEBHOOK_URL to any endpoint
 * that accepts a JSON POST (Slack, Zapier, a CRM intake, your own handler) and
 * submissions forward there. Until that is configured the route reports
 * `unconfigured` so the UI can fall back to a direct mailto rather than
 * pretending the message was delivered.
 */

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  sector?: unknown;
  deployment?: unknown;
  message?: unknown;
  /** Honeypot — must stay empty. */
  website?: unknown;
};

const MAX = { name: 120, email: 200, organization: 160, message: 5000 };

function asString(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Bots fill every field they find
  if (asString(body.website, 100) !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const data = {
    name: asString(body.name, MAX.name),
    email: asString(body.email, MAX.email),
    organization: asString(body.organization, MAX.organization),
    sector: asString(body.sector, 80),
    deployment: asString(body.deployment, 80),
    message: asString(body.message, MAX.message),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Required";
  if (!data.email) errors.email = "Required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email";
  if (!data.message) errors.message = "Required";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      "[contact] CONTACT_WEBHOOK_URL is not set — submission was not delivered.",
      { email: data.email, organization: data.organization },
    );
    return NextResponse.json(
      { ok: false, error: "unconfigured" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "aeronivelabs.com/contact",
        receivedAt: new Date().toISOString(),
        ...data,
      }),
    });

    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
