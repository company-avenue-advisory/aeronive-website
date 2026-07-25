"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Client-environment probes.
 *
 * These all resolve to `false` on the server and settle on the real value
 * during hydration. useSyncExternalStore is the right tool here: the value
 * lives outside React, and reading it this way avoids the cascading render
 * that a setState-in-effect would cause.
 */

const noopSubscribe = () => () => {};

/** Tracks a media query, re-rendering when it changes. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useCoarsePointer = () => useMediaQuery("(pointer: coarse)");

/* ------------------------------------------------------------------ */

// Creating a probe context is not free, and the answer never changes
let webglSupport: boolean | null = null;

function detectWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/** Whether this device can render the 3D scenes at all. */
export function useWebGL(): boolean {
  return useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
}

/* ------------------------------------------------------------------ */

/** Window scrollY past `threshold`, without a setState-in-effect. */
export function useScrolledPast(threshold: number): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
