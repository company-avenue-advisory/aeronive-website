import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/Icons";
import { formatResearchDate, publishedResearch } from "@/lib/research";
import { site, traction } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Field notes and papers from Aeronive Labs — what we are learning from customs house agents, importers, and exporters, and how we evaluate the systems we build.",
};

export default function ResearchPage() {
  const entries = publishedResearch();

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Field notes, and the method behind the numbers."
        lead="Two kinds of writing live here: what we are learning from the people who do this work every day, and how we evaluate whether the systems we build actually hold up. Anything we measure gets published with the method beside it."
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          {entries.length === 0 ? (
            <Reveal>
              <div className="card grain relative overflow-hidden px-6 py-16 text-center sm:px-12">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 45% 90% at 50% 110%, var(--c-glow-soft), transparent 65%)",
                  }}
                />
                <div className="relative">
                  <span className="label-mono">Nothing published yet</span>
                  <h2 className="mx-auto mt-5 max-w-[26ch] text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15] font-medium text-ink">
                    The first field notes are being written up now.
                  </h2>
                  <p className="mx-auto mt-5 max-w-[56ch] text-[13.5px] leading-[1.8] text-muted">
                    They come out of recorded conversations with customs house
                    agents, importers, and exporters moving cargo through{" "}
                    {traction.corridors.join(", ")} — the same conversations
                    that decided what Aeronive EXIM checks for. We would rather
                    leave this page empty than fill it with writing we have not
                    done.
                  </p>
                  <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent("Notify me when Aeronive publishes")}`}
                      className="btn btn-primary w-full sm:w-auto"
                    >
                      Ask us to send the first one
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link
                      href="/products"
                      className="btn btn-ghost w-full sm:w-auto"
                    >
                      See what we shipped instead
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col">
              {entries.map((entry, i) => {
                const external = entry.kind === "paper" && entry.pdf;
                const href = external ? entry.pdf! : `/research/${entry.slug}`;

                return (
                  <Reveal key={entry.slug} delay={Math.min(i, 4) * 0.06}>
                    <Link
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="group block border-b border-line py-9 first:border-t first:border-line"
                    >
                      <div className="grid gap-5 lg:grid-cols-[180px_1fr_auto] lg:items-baseline lg:gap-10">
                        <div className="flex items-center gap-3">
                          <span className="rounded-md border border-line-strong bg-veil px-2 py-1 font-mono text-[9.5px] tracking-[0.1em] text-brand-text uppercase">
                            {entry.kind}
                          </span>
                          <time
                            dateTime={entry.date}
                            className="font-mono text-[11px] text-ghost"
                          >
                            {formatResearchDate(entry.date)}
                          </time>
                        </div>

                        <div className="min-w-0">
                          <h2 className="text-[19px] leading-snug font-medium tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-brand-text">
                            {entry.title}
                          </h2>
                          <p className="mt-3 max-w-[68ch] text-[13.5px] leading-relaxed text-muted">
                            {entry.summary}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-1.5">
                            {entry.tags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-md border border-line bg-veil px-2 py-1 font-mono text-[9.5px] tracking-[0.04em] text-faint"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <ArrowRight className="hidden h-4 w-4 shrink-0 text-ghost transition-all duration-400 group-hover:translate-x-0.5 group-hover:text-brand lg:block" />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <CTA
        title="Working on the same problem?"
        lead="If you clear cargo, file entries, or run compliance for an importer or exporter, we want to hear where the process actually breaks. Those conversations are what this page is made of."
        primary={{ label: "Tell us what breaks", href: "/contact" }}
        secondary={{ label: "See Aeronive EXIM", href: "/products#exim" }}
      />
    </>
  );
}
