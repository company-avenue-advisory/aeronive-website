import {
  Check,
  Database,
  Gauge,
  Layers,
  Lock,
  Logo,
  Network,
  Policy,
  Search,
  Server,
  Shield,
} from "@/components/ui/Icons";

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
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(77,124,255,0.28), transparent 70%)",
        }}
      />

      <div className="card grain overflow-hidden rounded-[20px] shadow-[0_50px_140px_-40px_rgba(20,50,160,0.65)]">
        {/* ---- Title bar ------------------------------------------- */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo className="h-4 w-4" />
            <span className="font-mono text-[11px] tracking-[0.06em] text-fog-400">
              company-brain
            </span>
            <span className="hidden font-mono text-[11px] text-fog-600 sm:inline">
              / procurement
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-emerald-300 sm:inline-flex">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              ON-PREM
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-fog-400">
              <Lock className="h-2.5 w-2.5" />
              NO EGRESS
            </span>
          </div>
        </div>

        <div className="flex">
          {/* ---- Left rail ----------------------------------------- */}
          <div className="hidden w-[52px] shrink-0 flex-col items-center gap-1 border-r border-white/[0.07] py-4 sm:flex">
            {railIcons.map((Icon, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  i === 0
                    ? "bg-beam-500/18 text-beam-300 ring-1 ring-beam-400/25"
                    : "text-fog-600"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
            ))}
          </div>

          {/* ---- Main column --------------------------------------- */}
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            {/* Query bar */}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-fog-500" />
              <span className="truncate text-[12.5px] text-fog-200">
                Which vendors have unresolved SOC 2 exceptions past renewal?
              </span>
              <span className="ml-auto hidden shrink-0 font-mono text-[10px] text-fog-600 md:inline">
                ⌘K
              </span>
            </div>

            {/* Answer */}
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-ink-925/60 p-4">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua-400 pulse-dot" />
                <span className="label-mono">Grounded answer</span>
              </div>
              <p className="text-[12.5px] leading-[1.75] text-fog-300">
                Four vendors carry unresolved Type II exceptions past their
                renewal date. <Cite n={1} /> Two are classified{" "}
                <span className="text-fog-100">material</span> under the
                procurement risk policy and require CISO sign-off before
                auto-renewal. <Cite n={2} /> The remaining two fall inside the
                30-day remediation window. <Cite n={3} />
                <span className="ml-0.5 inline-block h-[13px] w-[2px] translate-y-[2px] animate-pulse bg-beam-400" />
              </p>
            </div>

            {/* Policy checks */}
            <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {policyChecks.map((c) => (
                <div
                  key={c.label}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2"
                >
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="font-mono text-[9.5px] tracking-[0.1em] text-fog-600 uppercase">
                      {c.label}
                    </span>
                  </div>
                  <div className="mt-1 text-[11.5px] text-fog-200">{c.value}</div>
                </div>
              ))}
            </div>

            {/* Evaluation strip */}
            <div className="mt-3 rounded-xl border border-white/[0.07] bg-ink-925/60 p-4">
              <div className="flex items-center justify-between">
                <span className="label-mono">Eval · retrieval precision</span>
                <span className="font-mono text-[11px] text-beam-300">97.2%</span>
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
                          ? "linear-gradient(180deg,#7aa2ff,#2f5bf0)"
                          : "rgba(255,255,255,0.09)",
                      boxShadow:
                        i >= evalBars.length - 3
                          ? "0 0 14px rgba(77,124,255,0.5)"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---- Right panel: retrieval trace ---------------------- */}
          <div className="hidden w-[248px] shrink-0 border-l border-white/[0.07] p-4 lg:block">
            <div className="label-mono">Retrieval trace</div>
            <ul className="mt-4 flex flex-col gap-3.5">
              {sources.map((s, i) => (
                <li key={s.name}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-beam-400">
                      [{i + 1}]
                    </span>
                    <span className="truncate text-[11.5px] text-fog-200">
                      {s.name}
                    </span>
                  </div>
                  <div className="mt-1 pl-[22px] font-mono text-[10px] text-fog-600">
                    {s.meta}
                  </div>
                  <div className="mt-1.5 ml-[22px] h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.score}%`,
                        background:
                          "linear-gradient(90deg,#2f5bf0,#5fe3f0)",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
              <div className="label-mono">Audit record</div>
              <div className="mt-2 font-mono text-[10px] leading-relaxed text-fog-500">
                <div>trace_id 8f2c·a91e</div>
                <div>actor jdoe@corp</div>
                <div>scope procurement:read</div>
                <div className="text-emerald-400/80">signed ✓</div>
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
    <sup className="mx-0.5 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-[4px] border border-beam-400/30 bg-beam-500/15 px-1 font-mono text-[9px] text-beam-300">
      {n}
    </sup>
  );
}
