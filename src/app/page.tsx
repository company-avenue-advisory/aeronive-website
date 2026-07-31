import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CTA from "@/components/sections/CTA";
import FrameworkMarquee from "@/components/site/FrameworkMarquee";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ArrowRight, Check } from "@/components/ui/Icons";
import {
  AssuranceVisual,
  CompanyBrainVisual,
  LocalFirstVisual,
  PipelineVisual,
  PolicyVisual,
  SovereignVisual,
} from "@/components/sections/CapabilityVisuals";
import {
  capabilities,
  evidence,
  metrics,
  metricsNote,
  process,
  products,
  roadmapNote,
  sectors,
} from "@/lib/site";

const visuals = {
  "company-brain": CompanyBrainVisual,
  "local-first": LocalFirstVisual,
  "data-pipelines": PipelineVisual,
  "policy-engine": PolicyVisual,
  assurance: AssuranceVisual,
  sovereign: SovereignVisual,
} as const;

/** Bento column spans, keyed to the capability order in lib/site. */
const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12",
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ================= Regimes rail ================= */}
      <section className="py-14">
        <Container>
          <Reveal>
            <p className="text-center font-mono text-[11px] tracking-[0.16em] text-ghost uppercase">
              Built against the regimes that bind you
            </p>
          </Reveal>
        </Container>
        <Reveal delay={0.08}>
          <div className="mt-9">
            <FrameworkMarquee />
          </div>
        </Reveal>
      </section>

      {/* ================= Products ================= */}
      <section id="products" className="relative py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Shipping today"
            title={
              <>
                One product in production.
                <br />
                Not a roadmap.
              </>
            }
            lead="The honest answer to “what do you sell, and to whom?” — a compliance system doing real work on real consignments, built on the platform below it."
          />

          <div className="mt-16 flex flex-col gap-4">
            {products.map((product) => (
              <Reveal key={product.slug}>
                <Link
                  href={`/products#${product.slug}`}
                  className="card card-hover group grid gap-10 p-7 sm:p-9 lg:grid-cols-[1.1fr_0.9fr]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-ok/25 bg-ok/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-ok uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-ok pulse-dot" />
                        {product.status}
                      </span>
                      <span className="font-mono text-[10.5px] tracking-[0.1em] text-ghost uppercase">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="mt-6 flex items-center gap-3 text-[26px] font-medium tracking-[-0.02em] text-ink">
                      {product.name}
                      <ArrowRight className="h-4 w-4 shrink-0 text-ghost transition-all duration-400 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </h3>
                    <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.75] text-body">
                      {product.summary}
                    </p>
                    <p className="mt-5 text-[12.5px] leading-relaxed text-faint">
                      For {product.who.toLowerCase()}.
                    </p>
                  </div>

                  <div className="border-t border-line pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                    <span className="label-mono">What it checks</span>
                    <ul className="mt-5 flex flex-col gap-3">
                      {product.points.slice(0, 4).map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand" />
                          <span className="text-[13px] leading-relaxed text-muted">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={0.08}>
              <div className="flex flex-col items-start justify-between gap-5 rounded-[18px] border border-dashed border-line-strong px-7 py-6 sm:flex-row sm:items-center">
                <p className="max-w-[62ch] text-[13px] leading-relaxed text-muted">
                  <span className="text-ink">{roadmapNote.title}</span> Further
                  products are in development against the same governed core.
                </p>
                <Link href="/products" className="btn btn-ghost group shrink-0">
                  All products
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= Capabilities bento ================= */}
      <section id="capabilities" className="relative py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="The platform underneath"
            title={
              <>
                Less pilot theatre.
                <br />
                Systems that survive contact.
              </>
            }
            lead="Six building blocks that EXIM is assembled from, and that every product after it will use — composed against your data estate, your regulator, and your network reality, not a reference architecture."
          />

          <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {capabilities.map((cap, i) => {
              const Visual = visuals[cap.slug as keyof typeof visuals];
              const isFullWidth = spans[i] === "lg:col-span-12";

              return (
                <Reveal
                  key={cap.slug}
                  delay={Math.min(i, 3) * 0.07}
                  className={spans[i]}
                >
                  <article
                    className={`card card-hover group flex h-full flex-col overflow-hidden p-6 sm:p-7 ${
                      isFullWidth ? "gap-8 lg:flex-row lg:items-center" : ""
                    }`}
                  >
                    <div className={isFullWidth ? "lg:max-w-[46%]" : ""}>
                      <h3 className="text-[19px] font-medium tracking-[-0.02em] text-ink">
                        {cap.title}
                      </h3>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-body">
                        {cap.blurb}
                      </p>
                      <p className="mt-3 text-[13px] leading-relaxed text-faint">
                        {cap.detail}
                      </p>
                    </div>

                    <div
                      className={
                        isFullWidth
                          ? "min-w-0 flex-1"
                          : "mt-7 min-h-[150px] w-full flex-1 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                      }
                    >
                      <Visual />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= Metrics ================= */}
      <section className="relative py-10">
        <Container>
          <div className="rule-fade" />
          <div className="grid grid-cols-2 gap-y-12 py-16 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="px-2 text-center lg:px-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-[clamp(2.4rem,5vw,3.6rem)] leading-none font-medium text-gradient">
                      {m.value}
                    </span>
                    {m.unit && (
                      <span className="font-mono text-[13px] text-brand">
                        {m.unit}
                      </span>
                    )}
                  </div>
                  <p className="mx-auto mt-4 max-w-[26ch] text-[12.5px] leading-relaxed text-muted">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="rule-fade" />
          <Reveal>
            <p className="mx-auto mt-6 max-w-[62ch] text-center text-[12px] leading-relaxed text-ghost">
              {metricsNote}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ================= Evidence ================= */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                align="left"
                eyebrow="Where we are"
                title={
                  <>
                    What is true today,
                    <br />
                    including the gaps.
                  </>
                }
                lead="We are early. Overstating that is the fastest way to lose a technical conversation, so here is the ground we actually stand on."
              />
            </div>
            <Reveal delay={0.1}>
              <Link href="/about" className="btn btn-ghost group shrink-0">
                About the team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {evidence.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <article className="card flex h-full flex-col p-6">
                  <span className="label-mono">{item.label}</span>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= Sectors ================= */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                align="left"
                eyebrow="Where this goes next"
                title={
                  <>
                    Regulated sectors,
                    <br />
                    on their own terms.
                  </>
                }
                lead="Trade compliance is where the platform went to work first. These are the sectors it is architected for next — each one carries its own regime, its own evidentiary standard, and its own definition of an unacceptable failure. Listed as direction, not as a client list."
              />
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/sectors"
                className="btn btn-ghost group shrink-0"
              >
                All sectors
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i, 3) * 0.07}>
                <Link
                  href={`/sectors#${s.slug}`}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[16.5px] font-medium tracking-[-0.02em] text-ink">
                      {s.name}
                    </h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ghost transition-all duration-400 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </div>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">
                    {s.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {s.regimes.map((r) => (
                      <li
                        key={r}
                        className="rounded-md border border-line-strong bg-veil px-2 py-1 font-mono text-[9.5px] tracking-[0.04em] text-faint"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= Process ================= */}
      <section id="process" className="relative py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Engagement model"
            title="Four phases, no theatre."
            lead="We scope against your regulatory surface before we write integration code, and we hand over something your team can defend without us in the room."
          />

          <div className="relative mt-16">
            {/* Connecting rail */}
            <div className="pointer-events-none absolute top-[26px] right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block" />

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {process.map((p, i) => (
                <Reveal key={p.step} delay={i * 0.09}>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-line-strong bg-raised font-mono text-[13px] text-brand-text">
                        {p.step}
                      </span>
                      <h3 className="text-[17px] font-medium tracking-[-0.02em] text-ink lg:hidden">
                        {p.title}
                      </h3>
                    </div>
                    <h3 className="mt-6 hidden text-[17px] font-medium tracking-[-0.02em] text-ink lg:block">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <CTA
        title="Start with the product that already runs."
        lead="If you move cargo, the fastest conversation is about EXIM and a real consignment. If you are here for the platform, a technical briefing covers your data estate, the regimes that apply, and what a first use case would take. No slideware."
        primary={{ label: "Book a technical briefing", href: "/contact" }}
        secondary={{ label: "See Aeronive EXIM", href: "/products#exim" }}
      />
    </>
  );
}
