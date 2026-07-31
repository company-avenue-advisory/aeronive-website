import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { evidence, products, roadmapNote } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Aeronive EXIM is in production for import and export compliance — classification, licensing, valuation, and document checks that cite the provision behind every flag. Built on the Aeronive governed platform.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="What we ship, and what it runs on."
        lead="One product is in production today. It is not a demo of the platform — it is a system doing compliance work on real consignments, assembled from the same governed core every product after it will use."
      >
        <Link href="#exim" className="btn btn-primary">
          See Aeronive EXIM
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      {/* ================= Product detail ================= */}
      <div className="flex flex-col gap-24 py-16 sm:gap-32 sm:py-24">
        {products.map((product) => (
          <section key={product.slug} id={product.slug} className="scroll-mt-28">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                <Reveal>
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

                    <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.06] font-medium text-gradient">
                      {product.name}
                    </h2>
                    <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.7] text-body">
                      {product.summary}
                    </p>

                    {product.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="mt-5 max-w-[58ch] text-[13.5px] leading-[1.8] text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}

                    <div className="mt-8 rounded-xl border border-line bg-veil p-4">
                      <span className="label-mono">Who it is for</span>
                      <p className="mt-2 text-[13px] leading-relaxed text-body">
                        {product.who}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="card relative overflow-hidden p-7 sm:p-9">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 60% at 50% 100%, var(--c-glow-soft), transparent 70%)",
                      }}
                    />
                    <div className="relative">
                      <span className="label-mono">What it does</span>
                      <ul className="mt-6 flex flex-col gap-4">
                        {product.points.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand" />
                            <span className="text-[13.5px] leading-relaxed text-body">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 border-t border-line pt-6">
                        <span className="label-mono">Regimes it answers to</span>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {product.regimes.map((regime) => (
                            <li
                              key={regime}
                              className="rounded-lg border border-line-strong bg-veil px-2.5 py-1.5 font-mono text-[10px] tracking-[0.05em] text-muted"
                            >
                              {regime}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        ))}
      </div>

      {/* ================= Evidence ================= */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Where we are"
            title="Stated plainly, including the gaps."
            lead="A pre-seed company that overstates its evidence gets found out in the first technical conversation. Here is what is true today."
          />

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

      {/* ================= Roadmap framing ================= */}
      <section className="pb-8">
        <Container>
          <Reveal>
            <div className="card grain relative overflow-hidden p-8 sm:p-12">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 70% at 15% 0%, var(--c-glow-soft), transparent 65%)",
                }}
              />
              <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div>
                  <span className="label-mono">What comes next</span>
                  <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.1] font-medium text-gradient">
                    {roadmapNote.title}
                  </h2>
                </div>
                <div className="flex flex-col items-start gap-6">
                  <p className="text-[14px] leading-[1.8] text-muted">
                    {roadmapNote.body}
                  </p>
                  <Link href="/solutions" className="btn btn-ghost group">
                    See the platform underneath
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTA
        title="Put it against a real consignment."
        lead="Send us a shipment profile and the regime it moves under. We will come back with what the system flags and the provision behind each flag."
        primary={{ label: "Talk to us about EXIM", href: "/contact" }}
        secondary={{ label: "Read the platform detail", href: "/solutions" }}
      />
    </>
  );
}
