import { NextResponse } from "next/server";
import { CONTACT_COLLECTION, getDb } from "@/lib/mongodb";

/**
 * Contact submissions.
 *
 * Two independent sinks, both optional:
 *  - MONGODB_URI       persists the submission to Atlas (the system of record)
 *  - CONTACT_WEBHOOK_URL forwards it to Slack, Zapier, a CRM intake, anything
 *                      that accepts a JSON POST
 *
 * A submission counts as delivered if *either* sink accepted it, so a webhook
 * outage cannot lose a lead that is already stored. With neither configured
 * the route reports `unconfigured` and the UI falls back to a direct mailto
 * rather than pretending the message was delivered.
 */

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  /** Which product or engagement the enquiry is about. */
  interest?: unknown;
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
    interest: asString(body.interest, 120),
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

  const dbPromise = getDb();
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!dbPromise && !webhook) {
    console.warn(
      "[contact] neither MONGODB_URI nor CONTACT_WEBHOOK_URL is set — " +
        "submission was not delivered.",
      { email: data.email, organization: data.organization },
    );
    return NextResponse.json(
      { ok: false, error: "unconfigured" },
      { status: 503 },
    );
  }

  const submission = {
    ...data,
    source: "aeronive.com/contact",
    createdAt: new Date(),
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
  };

  let stored = false;
  if (dbPromise) {
    try {
      const db = await dbPromise;
      await db.collection(CONTACT_COLLECTION).insertOne({ ...submission });
      stored = true;
    } catch (err) {
      console.error("[contact] could not write to MongoDB", err);
    }
  }

  let forwarded = false;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...submission,
          createdAt: submission.createdAt.toISOString(),
        }),
      });

      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      forwarded = true;
    } catch (err) {
      console.error("[contact] webhook delivery failed", err);
    }
  }

  if (!stored && !forwarded) {
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
