"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { useScrolledPast } from "@/lib/client-env";
import { ArrowRight } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Brand";
import ThemeToggle from "@/components/site/ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(24);

  // Lock body scroll behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-canvas/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="transition-opacity duration-300 hover:opacity-80"
            aria-label="Aeronive Labs — home"
          >
            <Wordmark className="h-10 w-auto" title="Aeronive Labs — home" />
          </Link>

          {/* Centre pill nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <ul className="glass flex items-center gap-1 rounded-full p-1">
              {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative block rounded-full px-4 py-1.5 text-[13px] transition-colors duration-300 ${
                      isActive(item.href)
                        ? "bg-veil-strong text-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/contact"
              className="btn btn-primary hidden h-10 px-5 text-[13px] sm:inline-flex"
            >
              Book a briefing
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-x-0 top-[68px] bottom-0 z-40 origin-top border-t border-line bg-canvas/95 backdrop-blur-2xl transition-all duration-400 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="px-6 pt-6">
          <ul className="flex flex-col">
            {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-5 text-2xl tracking-[-0.02em] ${
                    isActive(item.href) ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                  <span className="label-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-8 w-full"
          >
            Book a briefing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
