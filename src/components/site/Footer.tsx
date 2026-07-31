import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Wordmark } from "@/components/ui/Brand";
import { frameworks, products, site, socials } from "@/lib/site";

const columns = [
  {
    title: "Products",
    links: [
      ...products.map((p) => ({
        label: p.name,
        href: `/products#${p.slug}`,
      })),
      { label: "All products", href: "/products" },
      { label: "Sectors", href: "/sectors" },
      { label: "Compliance posture", href: "/sectors#frameworks" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Company Brain", href: "/solutions#company-brain" },
      { label: "Local-first interconnect", href: "/solutions#local-first" },
      { label: "Data-backed pipelines", href: "/solutions#data-pipelines" },
      { label: "Deployment topologies", href: "/solutions#deployment" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Research", href: "/research" },
      { label: "Engagement model", href: "/#process" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="reverse-zone relative mt-10 overflow-hidden border-t border-line">
      {/* Horizon glow along the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 0%, var(--c-glow-soft), transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:py-20">
          <div>
            <Link href="/" className="inline-block">
              <Wordmark className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-muted">
              Compliance-native AI systems for regulated work. Aeronive EXIM is
              in production for import and export compliance; the platform
              underneath it is what the next products are built from.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="decoration-line-strong mt-6 inline-block font-mono text-[12.5px] text-gold-text underline underline-offset-4 transition-colors hover:text-ink"
            >
              {site.email}
            </a>

            {socials.some((s) => s.href) && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {socials
                  .filter((s) => s.href)
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[11.5px] tracking-[0.06em] text-ghost transition-colors hover:text-ink"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label-mono">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-muted transition-colors duration-300 hover:text-ink"
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
          <p className="font-mono text-[11.5px] tracking-[0.06em] text-ghost">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {frameworks.slice(0, 5).map((f) => (
              <li
                key={f}
                className="font-mono text-[11px] tracking-[0.08em] text-ghost"
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
