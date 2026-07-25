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

export type Theme = "dark" | "light";

const THEME_KEY = "aeronive-theme";

/**
 * The active theme lives on `document.documentElement.dataset.theme`, written
 * by the blocking script in the document head before first paint. React reads
 * it rather than owning it — that is what keeps the no-flash guarantee.
 */
const themeListeners = new Set<() => void>();

function subscribeTheme(onChange: () => void) {
  themeListeners.add(onChange);
  return () => {
    themeListeners.delete(onChange);
  };
}

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // private mode — the choice just will not survive a reload
  }
  themeListeners.forEach((listener) => listener());
}

/** Current theme. Renders as "dark" on the server, settles on hydration. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, readTheme, () => "dark" as const);
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
