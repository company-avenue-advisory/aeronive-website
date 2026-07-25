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
            <stop offset="0%" stopColor="#4d7cff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#5fe3f0" stopOpacity="0.55" />
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
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.12)"
            />
            <rect
              x={x - 14}
              y={20}
              width={20}
              height={2}
              rx={1}
              fill="rgba(255,255,255,0.28)"
            />
            <rect
              x={x - 14}
              y={26}
              width={28 - i * 3}
              height={2}
              rx={1}
              fill="rgba(255,255,255,0.14)"
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
        <circle cx="160" cy="92" r="13" fill="rgba(77,124,255,0.16)" />
        <circle
          cx="160"
          cy="92"
          r="13"
          stroke="rgba(122,162,255,0.6)"
          strokeWidth="1"
        />
        <circle cx="160" cy="92" r="4" fill="#a3bcff" />

        {/* Cited output */}
        <path d="M160 105 V119" stroke="rgba(122,162,255,0.5)" strokeWidth="1" />
        <rect
          x="96"
          y="119"
          width="128"
          height="20"
          rx="6"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(122,162,255,0.28)"
        />
        <rect
          x="106"
          y="127"
          width="60"
          height="3"
          rx="1.5"
          fill="rgba(221,227,242,0.5)"
        />
        {[176, 189, 202].map((x) => (
          <rect
            key={x}
            x={x}
            y={124}
            width={9}
            height={9}
            rx={2}
            fill="rgba(77,124,255,0.35)"
            stroke="rgba(122,162,255,0.5)"
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
          <div className="absolute inset-0 border-t border-dashed border-white/20" />
          <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 rounded-full border border-amber-400/25 bg-ink-950 px-2 py-0.5 font-mono text-[8.5px] tracking-[0.08em] text-amber-300/90">
            LINK DOWN
          </span>
        </div>
        <SiteBox label="SITE B" status="offline" />
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5">
        <div className="font-mono text-[9px] tracking-[0.1em] text-fog-600">
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
                    ? "linear-gradient(180deg,rgba(122,162,255,0.55),rgba(47,91,240,0.3))"
                    : "rgba(255,255,255,0.07)",
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Check className="h-3 w-3 text-emerald-400" />
          <span className="font-mono text-[9.5px] text-fog-500">
            deterministic replay on reconnect
          </span>
        </div>
      </div>
    </div>
  );
}

function SiteBox({ label, status }: { label: string; status: "online" | "offline" }) {
  return (
    <div className="rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 py-2">
      <div className="font-mono text-[9px] tracking-[0.1em] text-fog-400">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <span
          className={`h-1 w-1 rounded-full ${
            status === "online" ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
        <span className="font-mono text-[8.5px] text-fog-600">
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
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-beam-400/25 bg-beam-500/12 font-mono text-[9px] text-beam-300">
                {i + 1}
              </div>
              <span className="font-mono text-[9px] text-fog-500">{s}</span>
            </div>
            {i < stages.length - 1 && (
              <div className="mx-1 h-px flex-1 bg-gradient-to-r from-beam-500/40 to-beam-500/10" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["lineage:full", "sha256 pinned", "v4 · reproducible"].map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-fog-500"
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
      <div className="rounded-lg border border-white/[0.07] bg-ink-925/70 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.1em] text-fog-600">
            policy.v12.yaml
          </span>
          <span className="font-mono text-[9px] text-emerald-400/80">signed</span>
        </div>
        {lines.map((l) => (
          <div key={l.k} className="flex items-center gap-2 py-[3px]">
            <span className="font-mono text-[10px] text-fog-500">{l.k}</span>
            <span className="font-mono text-[10px] text-beam-300">{l.v}</span>
            {l.ok && <Check className="ml-auto h-2.5 w-2.5 text-emerald-400/70" />}
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
                  ? "linear-gradient(180deg,#f59e0b,rgba(245,158,11,0.25))"
                  : "linear-gradient(180deg,rgba(122,162,255,0.6),rgba(47,91,240,0.18))",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-fog-600">
        <span>drift monitor · 30d</span>
        <span className="text-amber-300/90">1 flagged → re-eval</span>
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
          className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 transition-colors duration-400 hover:border-beam-400/25"
        >
          <Icon className="h-4 w-4 text-beam-400" />
          <div className="mt-4">
            <div className="text-[11.5px] text-fog-200">{label}</div>
            <div className="mt-0.5 font-mono text-[9px] text-fog-600">{note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
