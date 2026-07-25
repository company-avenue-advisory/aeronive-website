import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/ui/Icons";
import { frameworks, sectors, site } from "@/lib/site";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "Company Brain", href: "/solutions#company-brain" },
      { label: "Local-first interconnect", href: "/solutions#local-first" },
      { label: "Data-backed pipelines", href: "/solutions#data-pipelines" },
      { label: "Deployment topologies", href: "/solutions#deployment" },
    ],
  },
  {
    title: "Sectors",
    links: sectors.slice(0, 4).map((s) => ({
      label: s.name,
      href: `/sectors#${s.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Compliance posture", href: "/sectors#frameworks" },
      { label: "Engagement model", href: "/#process" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/[0.07]">
      {/* Horizon glow along the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(77,124,255,0.16), transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:py-20">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-[15px] font-medium tracking-[-0.02em] text-fog-50">
                Aeronive<span className="text-fog-400"> Labs</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-fog-400">
              Compliance-native AI systems for regulated sectors. Built to run
              inside your perimeter and stand up to an audit.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block font-mono text-[12.5px] text-fog-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-beam-300"
            >
              {site.email}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label-mono">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-fog-400 transition-colors duration-300 hover:text-fog-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-fade" />

        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11.5px] tracking-[0.06em] text-fog-600">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {frameworks.slice(0, 5).map((f) => (
              <li
                key={f}
                className="font-mono text-[11px] tracking-[0.08em] text-fog-600"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
