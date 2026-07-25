import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

/* ------------------------------------------------------------------ */
/* Brand mark — a governed lattice inside a sealed boundary            */
/* ------------------------------------------------------------------ */

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aeronive-mark" x1="4" y1="2" x2="28" y2="30">
          <stop offset="0%" stopColor="#a3bcff" />
          <stop offset="55%" stopColor="#4d7cff" />
          <stop offset="100%" stopColor="#22c7dd" />
        </linearGradient>
      </defs>
      {/* Sealed hexagonal boundary */}
      <path
        d="M16 2.6 27.4 9.3v13.4L16 29.4 4.6 22.7V9.3Z"
        stroke="url(#aeronive-mark)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Internal lattice */}
      <path
        d="M16 9.4 21.6 19.6H10.4Z"
        stroke="url(#aeronive-mark)"
        strokeWidth="1.3"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="16" cy="9.4" r="1.9" fill="#a3bcff" />
      <circle cx="21.6" cy="19.6" r="1.5" fill="#4d7cff" />
      <circle cx="10.4" cy="19.6" r="1.5" fill="#22c7dd" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logo className="h-7 w-7" />
      <span className="text-[15px] font-medium tracking-[-0.02em] text-fog-50">
        Aeronive<span className="text-fog-400"> Labs</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* UI icons                                                            */
/* ------------------------------------------------------------------ */

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const Shield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 4.5 6v6c0 4.4 3.1 7.9 7.5 9 4.4-1.1 7.5-4.6 7.5-9V6Z" />
    <path d="m9 12 2.2 2.2L15.2 10" />
  </svg>
);

export const Lock = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </svg>
);

export const Trail = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 5h9M5 12h14M5 19h7" />
    <circle cx="18" cy="5" r="2" />
    <circle cx="16" cy="19" r="2" />
  </svg>
);

export const Layers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6Z" />
    <path d="m3.5 12.2 8.5 4.6 8.5-4.6" />
    <path d="m3.5 16.6 8.5 4.6 8.5-4.6" />
  </svg>
);

export const Signal = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5.5 15.5a6.5 6.5 0 0 1 0-9M18.5 6.5a6.5 6.5 0 0 1 0 9" />
    <path d="M8.6 12.6a2.5 2.5 0 0 1 0-3.4M15.4 9.2a2.5 2.5 0 0 1 0 3.4" />
    <circle cx="12" cy="11" r="1.4" />
    <path d="M12 12.4V20" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6h12M6 10h12M6 14h8" />
    <path d="m14.5 18.5 1.8 1.8 3.4-3.6" />
  </svg>
);

export const Network = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M10.5 6.9 6.4 15.9M13.5 6.9l4.1 9M7.2 18h9.6" />
  </svg>
);

export const Database = (p: IconProps) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="6" rx="7.5" ry="3" />
    <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </svg>
);

export const Policy = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3.5h8.5L19 8v12.5H6Z" />
    <path d="M14 3.5V8h5" />
    <path d="M9 13h6M9 16.5h4" />
  </svg>
);

export const Gauge = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 17a8 8 0 1 1 16 0" />
    <path d="m12 17 4-5" />
    <circle cx="12" cy="17" r="1.3" />
  </svg>
);

export const Server = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="4" width="17" height="6.5" rx="1.6" />
    <rect x="3.5" y="13.5" width="17" height="6.5" rx="1.6" />
    <path d="M7 7.2h.01M7 16.8h.01" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);

/** Icon lookup for the capability chip row. */
export const chipIcons = {
  shield: Shield,
  lock: Lock,
  trail: Trail,
  layers: Layers,
  signal: Signal,
  quote: Quote,
} as const;
