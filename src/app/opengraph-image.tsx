import { ImageResponse } from "next/og";

/**
 * Link preview card. Rendered by satori, so this is flexbox-only — no grid, no
 * CSS variables, and the palette is repeated here as literals rather than
 * pulled from the token layer.
 */

export const alt =
  "Aeronive Labs — compliance-native AI. Aeronive EXIM is in production for import and export compliance.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04050a",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 50% 120%, rgba(18,180,114,0.28), transparent 70%)",
          padding: "72px 80px",
          color: "#eef2ff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#12b472",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#9aa4bd",
            }}
          >
            Aeronive Labs
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Frontier AI, governed by design.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.45,
              color: "#9aa4bd",
              maxWidth: 880,
            }}
          >
            Aeronive EXIM is in production for import and export compliance —
            every flag traced to the provision behind it.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            color: "#5c6479",
          }}
        >
          <div style={{ display: "flex" }}>On-premise</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Private VPC</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Air-gapped</div>
        </div>
      </div>
    ),
    size,
  );
}
