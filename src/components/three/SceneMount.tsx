"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useTheme, useWebGL } from "@/lib/client-env";
import type { SceneVariant } from "./Scene";

/** WebGL is client-only, and the three bundle should never block first paint. */
const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Props = {
  variant?: SceneVariant;
  className?: string;
};

/**
 * Owns the decision of whether the 3D scene runs at all:
 *  - skipped entirely when the user prefers reduced motion
 *  - skipped when the device reports no WebGL
 *  - skipped on the light theme: every layer of the scene is additively
 *    blended emitted light, which is invisible over a near-white page. The
 *    CSS backdrop below carries the hero on its own there.
 *  - paused when scrolled out of view
 */
export default function SceneMount({ variant = "hero", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  const reducedMotion = usePrefersReducedMotion();
  const hasWebGL = useWebGL();
  const theme = useTheme();
  const enabled = hasWebGL && !reducedMotion && theme === "dark";

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* Always-present fallback glow; the canvas layers over it */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "hero"
              ? "radial-gradient(ellipse 42% 55% at 50% 42%, var(--c-glow), transparent 70%), radial-gradient(ellipse 80% 40% at 50% 6%, var(--c-glow-soft), transparent 75%)"
              : "radial-gradient(ellipse 70% 60% at 50% 0%, var(--c-glow-soft), transparent 72%)",
        }}
      />
      {enabled && (
        <div className="absolute inset-0">
          <Scene variant={variant} active={active} />
        </div>
      )}
    </div>
  );
}
