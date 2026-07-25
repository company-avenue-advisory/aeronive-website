"use client";

import { setTheme, useTheme } from "@/lib/client-env";
import { Moon, Sun } from "@/components/ui/Icons";

/**
 * Two-state theme switch. The icon shows the theme you would get by pressing
 * it, which is the convention users read fastest.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`glass flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:text-ink ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
