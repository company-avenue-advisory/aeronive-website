import {
  Check,
  Database,
  Gauge,
  Layers,
  Lock,
  Network,
  Policy,
  Search,
  Server,
  Shield,
} from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Brand";

/**
 * A representative Company Brain console. Static markup — this is a product
 * illustration, not a live interface.
 */

const railIcons = [Network, Database, Policy, Layers, Gauge, Server, Shield];

const sources = [
  { name: "Vendor_MSA_2024.pdf", meta: "§4.2 · p.17", score: 96 },
  { name: "SOC2_Type_II_Q3.pdf", meta: "Exceptions · p.4", score: 91 },
  { name: "risk_register.sql", meta: "vendor_findings", score: 84 },
  { name: "Procurement wiki", meta: "Escalation policy", score: 72 },
];

const policyChecks = [
  { label: "Access", value: "Enforced", ok: true },
  { label: "PII redaction", value: "3 spans", ok: true },
  { label: "Jurisdiction", value: "EU-West", ok: true },
  { label: "Egress", value: "Blocked", ok: true },
];

const evalBars = [38, 52, 46, 68, 61, 79, 72, 88, 84, 94, 89, 97];

export default function ConsoleMockup() {
  return (
    <div className="relative">
      {/* Beam glow pooling under the console */}
      <div
        className="pointer-events-none absolute -inset-x-20 -top-10 bottom-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, var(--c-glow), transparent 70%)",
        }}
      />

      <div className="card grain overflow-hidden rounded-[20px] shadow-[0_50px_140px_-40px_var(--c-shadow)]">
        {/* ---- Title bar ------------------------------------------- */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo className="h-4 w-auto" />
            <span className="font-mono text-[11px] tracking-[0.06em] text-muted">
              company-brain
            </span>
            <span className="hidden font-mono text-[11px] text-ghost sm:inline">
              / procurement
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-ok/25 bg-ok/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-ok sm:inline-flex">
              <span className="h-1 w-1 rounded-full bg-ok" />
              ON-PREM
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-veil px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-muted">
              <Lock className="h-2.5 w-2.5" />
              NO EGRESS
            </span>
          </div>
        </div>

        <div className="flex">
          {/* ---- Left rail ----------------------------------------- */}
          <div className="hidden w-[52px] shrink-0 flex-col items-center gap-1 border-r border-line py-4 sm:flex">
            {railIcons.map((Icon, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  i === 0
                    ? "bg-brand/18 text-brand-text ring-1 ring-brand/25"
                    : "text-ghost"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
            ))}
          </div>

          {/* ---- Main column --------------------------------------- */}
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            {/* Query bar */}
            <div className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-veil px-3.5 py-2.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-faint" />
              <span className="truncate text-[12.5px] text-body">
                Which vendors have unresolved SOC 2 exceptions past renewal?
              </span>
              <span className="ml-auto hidden shrink-0 font-mono text-[10px] text-ghost md:inline">
                ⌘K
              </span>
            </div>

            {/* Answer */}
            <div className="mt-4 rounded-xl border border-line bg-sunken/60 p-4">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand pulse-dot" />
                <span className="label-mono">Grounded answer</span>
              </div>
              <p className="text-[12.5px] leading-[1.75] text-body">
                Four vendors carry unresolved Type II exceptions past their
                renewal date. <Cite n={1} /> Two are classified{" "}
                <span className="text-ink">material</span> under the
                procurement risk policy and require CISO sign-off before
                auto-renewal. <Cite n={2} /> The remaining two fall inside the
                30-day remediation window. <Cite n={3} />
                <span className="ml-0.5 inline-block h-[13px] w-[2px] translate-y-[2px] animate-pulse bg-brand" />
              </p>
            </div>

            {/* Policy checks */}
            <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {policyChecks.map((c) => (
                <div
                  key={c.label}
                  className="rounded-lg border border-line bg-veil px-3 py-2"
                >
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-ok" />
                    <span className="font-mono text-[9.5px] tracking-[0.1em] text-ghost uppercase">
                      {c.label}
                    </span>
                  </div>
                  <div className="mt-1 text-[11.5px] text-body">{c.value}</div>
                </div>
              ))}
            </div>

            {/* Evaluation strip */}
            <div className="mt-3 rounded-xl border border-line bg-sunken/60 p-4">
              <div className="flex items-center justify-between">
                <span className="label-mono">Eval · retrieval precision</span>
                <span className="font-mono text-[11px] text-brand-text">97.2%</span>
              </div>
              <div className="mt-3 flex h-14 items-end gap-[5px]">
                {evalBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[2px]"
                    style={{
                      height: `${h}%`,
                      background:
                        i >= evalBars.length - 3
                          ? "linear-gradient(180deg,var(--c-brand-text),var(--c-brand))"
                          : "var(--c-line-strong)",
                      boxShadow:
                        i >= evalBars.length - 3
                          ? "0 0 14px var(--c-glow)"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---- Right panel: retrieval trace ---------------------- */}
          <div className="hidden w-[248px] shrink-0 border-l border-line p-4 lg:block">
            <div className="label-mono">Retrieval trace</div>
            <ul className="mt-4 flex flex-col gap-3.5">
              {sources.map((s, i) => (
                <li key={s.name}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-brand">
                      [{i + 1}]
                    </span>
                    <span className="truncate text-[11.5px] text-body">
                      {s.name}
                    </span>
                  </div>
                  <div className="mt-1 pl-[22px] font-mono text-[10px] text-ghost">
                    {s.meta}
                  </div>
                  <div className="mt-1.5 ml-[22px] h-[3px] overflow-hidden rounded-full bg-veil-strong">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.score}%`,
                        background:
                          "linear-gradient(90deg,var(--c-brand),var(--c-info))",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-line bg-veil p-3">
              <div className="label-mono">Audit record</div>
              <div className="mt-2 font-mono text-[10px] leading-relaxed text-faint">
                <div>trace_id 8f2c·a91e</div>
                <div>actor jdoe@corp</div>
                <div>scope procurement:read</div>
                <div className="text-ok/80">signed ✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <sup className="mx-0.5 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-[4px] border border-brand/30 bg-brand/15 px-1 font-mono text-[9px] text-brand-text">
      {n}
    </sup>
  );
}
