import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CTA from "@/components/sections/CTA";
import FrameworkMarquee from "@/components/site/FrameworkMarquee";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/Icons";
import {
  AssuranceVisual,
  CompanyBrainVisual,
  LocalFirstVisual,
  PipelineVisual,
  PolicyVisual,
  SovereignVisual,
} from "@/components/sections/CapabilityVisuals";
import { capabilities, metrics, process, sectors } from "@/lib/site";

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

      {/* ================= Capabilities bento ================= */}
      <section id="capabilities" className="relative py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Core capabilities"
            title={
              <>
                Less pilot theatre.
                <br />
                Systems that survive contact.
              </>
            }
            lead="Six building blocks we compose into a system shaped by your data estate, your regulator, and your network reality — not by a reference architecture."
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
        </Container>
      </section>

      {/* ================= Sectors ================= */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                align="left"
                eyebrow="Where we operate"
                title={
                  <>
                    Regulated sectors,
                    <br />
                    on their own terms.
                  </>
                }
                lead="Compliance is not a horizontal layer. Each sector carries its own regime, its own evidentiary standard, and its own tolerance for failure."
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
      <CTA />
    </>
  );
}
