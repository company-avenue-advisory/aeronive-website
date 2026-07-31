import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/Icons";
import {
  findResearch,
  formatResearchDate,
  publishedResearch,
  type ResearchBlock,
} from "@/lib/research";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedResearch().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = findResearch(slug);

  if (!entry) return { title: "Not found" };

  return {
    title: entry.title,
    description: entry.summary,
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.summary,
      publishedTime: entry.date,
      authors: entry.authors,
    },
  };
}

export default async function ResearchEntryPage({ params }: Params) {
  const { slug } = await params;
  const entry = findResearch(slug);

  if (!entry) notFound();

  return (
    <>
      <article className="pt-[140px] sm:pt-[168px]">
        <Container>
          <Reveal y={12}>
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-ghost uppercase transition-colors hover:text-brand-text"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
              All research
            </Link>
          </Reveal>

          <header className="mt-10 max-w-[42rem]">
            <Reveal delay={0.06}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-line-strong bg-veil px-2 py-1 font-mono text-[9.5px] tracking-[0.1em] text-brand-text uppercase">
                  {entry.kind}
                </span>
                <time
                  dateTime={entry.date}
                  className="font-mono text-[11px] text-ghost"
                >
                  {formatResearchDate(entry.date)}
                </time>
                <span className="font-mono text-[11px] text-ghost">
                  {entry.authors.join(", ")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={20}>
              <h1 className="mt-7 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.06] font-medium text-gradient">
                {entry.title}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 text-[15.5px] leading-[1.75] text-body">
                {entry.summary}
              </p>
            </Reveal>

            {entry.pdf && (
              <Reveal delay={0.2}>
                <a
                  href={entry.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost mt-8"
                >
                  Read the full paper
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Reveal>
            )}
          </header>

          <div className="rule-fade mt-12" />

          <div className="max-w-[42rem] py-12">
            {entry.body?.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <div className="rule-fade" />

          <div className="flex flex-wrap items-center gap-2 py-10">
            <span className="label-mono mr-2">Tags</span>
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-line-strong bg-veil px-2.5 py-1.5 font-mono text-[10px] tracking-[0.05em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </article>

      <CTA
        title="Tell us where this is wrong."
        lead="These notes come from conversations, and conversations are how they get corrected. If you work in this process and we have read it wrong, we would rather know."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "More research", href: "/research" }}
      />
    </>
  );
}

function Block({ block }: { block: ResearchBlock }) {
  switch (block.type) {
    case "h":
      return (
        <Reveal>
          <h2 className="mt-12 text-[22px] leading-snug font-medium tracking-[-0.02em] text-ink first:mt-0">
            {block.text}
          </h2>
        </Reveal>
      );
    case "quote":
      return (
        <Reveal>
          <blockquote className="my-9 border-l-2 border-brand/40 pl-6">
            <p className="text-[16px] leading-[1.7] text-ink italic">
              “{block.text}”
            </p>
            {block.attribution && (
              <cite className="mt-3 block font-mono text-[11px] text-ghost not-italic">
                — {block.attribution}
              </cite>
            )}
          </blockquote>
        </Reveal>
      );
    case "list":
      return (
        <Reveal>
          <ul className="mt-6 flex flex-col gap-3">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                <span className="text-[14.5px] leading-[1.8] text-body">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    default:
      return (
        <Reveal>
          <p className="mt-6 text-[14.5px] leading-[1.85] text-body first:mt-0">
            {block.text}
          </p>
        </Reveal>
      );
  }
}
