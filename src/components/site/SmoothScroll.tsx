"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useCoarsePointer, usePrefersReducedMotion } from "@/lib/client-env";

/**
 * Momentum scrolling, disabled outright for reduced-motion users and on
 * coarse pointers where native scrolling already feels better.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const enabled = !reducedMotion && !coarsePointer;

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
