import { Check, Lock, Server, Shield } from "@/components/ui/Icons";

/**
 * Small abstract diagrams for the capability bento. Deliberately schematic —
 * they explain the shape of each system rather than depict a UI.
 */

export function CompanyBrainVisual() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 320 150"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cb-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--c-brand)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--c-info)" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Heterogeneous sources */}
        {[36, 96, 160, 224, 284].map((x, i) => (
          <g key={x}>
            <rect
              x={x - 22}
              y={12}
              width={44}
              height={26}
              rx={5}
              fill="var(--c-veil)"
              stroke="var(--c-line-strong)"
            />
            <rect
              x={x - 14}
              y={20}
              width={20}
              height={2}
              rx={1}
              fill="var(--c-faint)"
            />
            <rect
              x={x - 14}
              y={26}
              width={28 - i * 3}
              height={2}
              rx={1}
              fill="var(--c-ghost)"
            />
          </g>
        ))}

        {/* Convergence into the governed index */}
        {[36, 96, 160, 224, 284].map((x) => (
          <path
            key={`p-${x}`}
            d={`M${x} 38 C ${x} 66, 160 62, 160 84`}
            stroke="url(#cb-line)"
            strokeWidth="1"
          />
        ))}

        {/* Core */}
        <circle cx="160" cy="92" r="13" fill="var(--c-brand-tint)" />
        <circle
          cx="160"
          cy="92"
          r="13"
          stroke="var(--c-brand)"
          strokeWidth="1"
        />
        <circle cx="160" cy="92" r="4" fill="var(--c-brand-text)" />

        {/* Cited output */}
        <path d="M160 105 V119" stroke="var(--c-brand-edge)" strokeWidth="1" />
        <rect
          x="96"
          y="119"
          width="128"
          height="20"
          rx="6"
          fill="var(--c-veil)"
          stroke="var(--c-brand-edge)"
        />
        <rect
          x="106"
          y="127"
          width="60"
          height="3"
          rx="1.5"
          fill="var(--c-muted)"
        />
        {[176, 189, 202].map((x) => (
          <rect
            key={x}
            x={x}
            y={124}
            width={9}
            height={9}
            rx={2}
            fill="var(--c-brand-tint)"
            stroke="var(--c-brand-edge)"
            strokeWidth="0.7"
          />
        ))}
      </svg>
    </div>
  );
}

export function LocalFirstVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3">
      <div className="flex items-center gap-3">
        <SiteBox label="SITE A" status="online" />
        <div className="relative h-px flex-1">
          <div className="absolute inset-0 border-t border-dashed border-line-strong" />
          <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 rounded-full border border-warn/25 bg-canvas px-2 py-0.5 font-mono text-[8.5px] tracking-[0.08em] text-warn/90">
            LINK DOWN
          </span>
        </div>
        <SiteBox label="SITE B" status="offline" />
      </div>

      <div className="rounded-lg border border-line bg-veil p-2.5">
        <div className="font-mono text-[9px] tracking-[0.1em] text-ghost">
          PENDING OPS · CRDT QUEUE
        </div>
        <div className="mt-2 flex gap-1">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="h-4 flex-1 rounded-[2px]"
              style={{
                background:
                  i < 9
                    ? "linear-gradient(180deg,var(--c-brand),color-mix(in srgb,var(--c-brand) 45%,transparent))"
                    : "var(--c-line-strong)",
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Check className="h-3 w-3 text-ok" />
          <span className="font-mono text-[9.5px] text-faint">
            deterministic replay on reconnect
          </span>
        </div>
      </div>
    </div>
  );
}

function SiteBox({ label, status }: { label: string; status: "online" | "offline" }) {
  return (
    <div className="rounded-lg border border-line-strong bg-veil px-2.5 py-2">
      <div className="font-mono text-[9px] tracking-[0.1em] text-muted">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <span
          className={`h-1 w-1 rounded-full ${
            status === "online" ? "bg-ok" : "bg-warn"
          }`}
        />
        <span className="font-mono text-[8.5px] text-ghost">
          {status === "online" ? "serving" : "local only"}
        </span>
      </div>
    </div>
  );
}

export function PipelineVisual() {
  const stages = ["Source", "Curate", "Label", "Eval"];
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="flex items-center">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand/25 bg-brand/12 font-mono text-[9px] text-brand-text">
                {i + 1}
              </div>
              <span className="font-mono text-[9px] text-faint">{s}</span>
            </div>
            {i < stages.length - 1 && (
              <div className="mx-1 h-px flex-1 bg-gradient-to-r from-brand/40 to-brand/10" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["lineage:full", "sha256 pinned", "v4 · reproducible"].map((t) => (
          <span
            key={t}
            className="rounded-md border border-line-strong bg-veil px-2 py-1 font-mono text-[9px] text-faint"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PolicyVisual() {
  const lines = [
    { k: "jurisdiction:", v: "eu-west-1", ok: true },
    { k: "pii.redact:", v: "[name, dob]", ok: true },
    { k: "refuse_if:", v: "tier == high", ok: true },
    { k: "escalate_to:", v: "human_review", ok: true },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="rounded-lg border border-line bg-sunken/70 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.1em] text-ghost">
            policy.v12.yaml
          </span>
          <span className="font-mono text-[9px] text-ok/80">signed</span>
        </div>
        {lines.map((l) => (
          <div key={l.k} className="flex items-center gap-2 py-[3px]">
            <span className="font-mono text-[10px] text-faint">{l.k}</span>
            <span className="font-mono text-[10px] text-brand-text">{l.v}</span>
            {l.ok && <Check className="ml-auto h-2.5 w-2.5 text-ok/70" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AssuranceVisual() {
  const bars = [42, 55, 48, 62, 58, 71, 66, 80, 76, 88];
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="flex h-16 items-end gap-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-[2px]"
            style={{
              height: `${h}%`,
              background:
                i === 5
                  ? "linear-gradient(180deg,var(--c-warn),color-mix(in srgb,var(--c-warn) 28%,transparent))"
                  : "linear-gradient(180deg,var(--c-brand),color-mix(in srgb,var(--c-brand) 30%,transparent))",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-ghost">
        <span>drift monitor · 30d</span>
        <span className="text-warn/90">1 flagged → re-eval</span>
      </div>
    </div>
  );
}

export function SovereignVisual() {
  const modes = [
    { icon: Server, label: "Private VPC", note: "your keys" },
    { icon: Shield, label: "On-premise", note: "your hardware" },
    { icon: Lock, label: "Air-gapped", note: "no network path" },
  ];
  return (
    <div className="grid h-full w-full grid-cols-3 gap-2">
      {modes.map(({ icon: Icon, label, note }) => (
        <div
          key={label}
          className="flex flex-col justify-between rounded-xl border border-line-strong bg-veil p-3 transition-colors duration-400 hover:border-brand/25"
        >
          <Icon className="h-4 w-4 text-brand" />
          <div className="mt-4">
            <div className="text-[11.5px] text-body">{label}</div>
            <div className="mt-0.5 font-mono text-[9px] text-ghost">{note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
