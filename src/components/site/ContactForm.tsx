"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { sectors, site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "unconfigured" | "error";

const deployments = [
  "Private VPC",
  "On-premise",
  "Air-gapped",
  "Not decided yet",
];

const interests = [
  "A platform deployment (custom build)",
  "A scoped assessment first",
  "Something else",
];

const fieldClass =
  "w-full rounded-xl border border-line-strong bg-veil px-4 py-3 text-[14px] text-ink placeholder:text-ghost outline-none transition-all duration-300 focus:border-brand/50 focus:bg-veil-strong focus:ring-2 focus:ring-brand/15";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }

      // No delivery endpoint configured — hand the user a working mailto
      setDraft(
        `Name: ${payload.name ?? ""}\nOrganization: ${payload.organization ?? ""}\nInterest: ${payload.interest ?? ""}\nSector: ${payload.sector ?? ""}\nDeployment: ${payload.deployment ?? ""}\n\n${payload.message ?? ""}`,
      );
      setStatus(json.error === "unconfigured" ? "unconfigured" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ok/25 bg-ok/10">
          <Check className="h-6 w-6 text-ok" />
        </span>
        <h3 className="mt-7 text-[22px] font-medium tracking-[-0.02em] text-ink">
          Request received.
        </h3>
        <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-muted">
          We read every briefing request ourselves. Expect a reply within two
          business days, usually with a few questions about your data estate
          before we schedule anything.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-8"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Jordan Ellis"
            className={fieldClass}
          />
        </Field>

        <Field label="Work email" error={errors.email}>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jordan@organization.com"
            className={fieldClass}
          />
        </Field>

        <Field label="Organization" error={errors.organization}>
          <input
            name="organization"
            autoComplete="organization"
            placeholder="Organization name"
            className={fieldClass}
          />
        </Field>

        <Field label="Sector">
          <select
            name="sector"
            defaultValue=""
            className={`${fieldClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%237b849c' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 1.5 6 6.5l5-5'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Select a sector
            </option>
            {sectors.map((s) => (
              <option key={s.slug} value={s.name} className="bg-raised">
                {s.name}
              </option>
            ))}
            <option value="Other" className="bg-raised">
              Other
            </option>
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="What are you interested in?">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, i) => (
                <label key={interest} className="cursor-pointer">
                  <input
                    type="radio"
                    name="interest"
                    value={interest}
                    defaultChecked={i === 0}
                    className="peer sr-only"
                  />
                  <span className="block rounded-full border border-line-strong bg-veil px-4 py-2 text-[12.5px] text-muted transition-all duration-300 peer-checked:border-brand/45 peer-checked:bg-brand/12 peer-checked:text-brand-text hover:border-line-strong">
                    {interest}
                  </span>
                </label>
              ))}
            </div>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Preferred deployment">
            <div className="flex flex-wrap gap-2">
              {deployments.map((d, i) => (
                <label key={d} className="cursor-pointer">
                  <input
                    type="radio"
                    name="deployment"
                    value={d}
                    defaultChecked={i === deployments.length - 1}
                    className="peer sr-only"
                  />
                  <span className="block rounded-full border border-line-strong bg-veil px-4 py-2 text-[12.5px] text-muted transition-all duration-300 peer-checked:border-brand/45 peer-checked:bg-brand/12 peer-checked:text-brand-text hover:border-line-strong">
                    {d}
                  </span>
                </label>
              ))}
            </div>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="What are you trying to build?" error={errors.message}>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="The systems involved, the regime you operate under, and what a successful first use case would look like."
              className={`${fieldClass} resize-none`}
            />
          </Field>
        </div>
      </div>

      {(status === "unconfigured" || status === "error") && (
        <div className="mt-6 rounded-xl border border-warn/25 bg-warn/[0.07] p-4">
          <p className="text-[12.5px] leading-relaxed text-warn/90">
            {status === "unconfigured"
              ? "This form has no delivery endpoint configured yet, so nothing was sent."
              : "Something went wrong sending that."}{" "}
            Email us directly and we will pick it up:
          </p>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              "Technical briefing request",
            )}&body=${encodeURIComponent(draft)}`}
            className="btn btn-ghost mt-4 h-10 text-[13px]"
          >
            Open email draft
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[38ch] text-[11.5px] leading-relaxed text-ghost">
          We do not request access to production data at this stage.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Request a briefing"}
          {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-mono mb-2.5 block">{label}</span>
      {children}
      {error && (
        <span className="mt-2 block text-[11.5px] text-red-400">{error}</span>
      )}
    </label>
  );
}
