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
/* UI icons                                                            */
/*                                                                     */
/* The brand mark and lockup live in ./Brand.                          */
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

export const Sun = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 3.2v1.9M12 18.9v1.9M20.8 12h-1.9M5.1 12H3.2M18.2 5.8l-1.35 1.35M7.15 16.85 5.8 18.2M18.2 18.2l-1.35-1.35M7.15 7.15 5.8 5.8" />
  </svg>
);

export const Moon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
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

/* ------------------------------------------------------------------ */
/* Brand marks                                                         */
/*                                                                     */
/* Third-party logos are solid glyphs rather than strokes, so they use */
/* their own base. Paths are the official marks — do not redraw them.  */
/* ------------------------------------------------------------------ */

const brandBase = {
  fill: "currentColor",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const LinkedIn = (p: IconProps) => (
  <svg {...brandBase} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const GitHub = (p: IconProps) => (
  <svg {...brandBase} {...p}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.26.8-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .31.2.68.82.57A12 12 0 0 0 12 .3Z" />
  </svg>
);

export const XMark = (p: IconProps) => (
  <svg {...brandBase} {...p}>
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...brandBase} {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38A5.89 5.89 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.89 5.89 0 0 0 2.13 1.38c.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.89 5.89 0 0 0 2.13-1.38 5.89 5.89 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.89 5.89 0 0 0-1.38-2.13A5.89 5.89 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
);

/** Icon lookup for team-member and social links. */
export const brandIcons = {
  linkedin: LinkedIn,
  github: GitHub,
  x: XMark,
  instagram: Instagram,
} as const;

export type BrandIconName = keyof typeof brandIcons;
