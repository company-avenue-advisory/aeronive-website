import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ArrowRight, brandIcons } from "@/components/ui/Icons";
import { evidence, journey, site, socials, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is building Aeronive Labs, how we got to trade and customs compliance, and where the company actually stands today.",
};

/** Marks scaffold content that must be replaced before launch. */
function TodoChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-warn/50 bg-warn/[0.08] px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] text-warn uppercase">
      To fill
    </span>
  );
}

const thesis: { title: string; body: string; todo?: boolean }[] = [
  {
    title: "Why this problem",
    body: "Compliance work in trade is knowledge work done under time pressure with a penalty attached. The expertise that prevents a query sits in a small number of experienced heads, and it does not scale, transfer, or get checked. That is a problem worth solving with software that can show its reasoning.",
  },
  {
    title: "Why now",
    body: "Two things changed at once: models became good enough to read a document set and reason about it, and the governance expectation caught up — an answer you cannot trace to a provision is worth nothing in a regulated process. Systems that can cite their source are now buildable and now required.",
  },
  {
    title: "Why us",
    body: "Our team has been working on state-of-the-art process and system design for compliance AI. We have expert and board advisors out of this industry who act as a vector into the system — the working knowledge of how the process actually runs, shaping what gets built rather than reviewing it afterwards. That is what we are building towards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A company built backwards from the interviews."
        lead="We did not pick a market and look for a problem. We went and asked the people who clear cargo what actually goes wrong, and built the first product against the answer. This page is who we are, how we got here, and what is still unproven."
      />

      {/* ================= Thesis ================= */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {thesis.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <article className="card flex h-full flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-mono">{item.title}</span>
                    {item.todo && <TodoChip />}
                  </div>
                  <p className="mt-5 text-[13.5px] leading-[1.8] text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= Team ================= */}
      <section id="team" className="scroll-mt-28 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Team"
            title="The people accountable for it."
            lead="Investors and accelerators read the team before the product. This is deliberately short and deliberately specific."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <article className="card flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[19px] font-medium tracking-[-0.02em] text-ink">
                        {member.name}
                      </h3>
                      <p className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-brand-text">
                        {member.role}
                      </p>
                    </div>
                    {member.todo && <TodoChip />}
                  </div>

                  <p className="mt-6 flex-1 text-[13.5px] leading-[1.8] text-muted">
                    {member.bio}
                  </p>

                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
                    <span className="font-mono text-[10px] tracking-[0.08em] text-ghost uppercase">
                      {member.focus}
                    </span>
                    {member.links && member.links.length > 0 && (
                      <ul className="flex shrink-0 items-center gap-2">
                        {member.links.map((link) => {
                          const Icon = brandIcons[link.icon];
                          return (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${member.name} on ${link.label}`}
                                className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-brand-text"
                              >
                                <Icon className="h-[15px] w-[15px]" />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= Journey ================= */}
      <section id="journey" className="scroll-mt-28 py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Journey"
                title="How we got here."
                lead="Short, dated, and factual. A timeline that reads as a story rather than a record is a warning sign."
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-transparent via-line-strong to-transparent" />

              <ol className="flex flex-col gap-10">
                {journey.map((entry, i) => (
                  <Reveal key={entry.title} delay={Math.min(i, 4) * 0.07}>
                    <li className="relative pl-10">
                      <span className="absolute top-[7px] left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-line-strong bg-raised">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      </span>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[11px] tracking-[0.1em] text-brand-text uppercase">
                          {entry.period}
                        </span>
                        {entry.todo && <TodoChip />}
                      </div>
                      <h3 className="mt-2.5 text-[17px] font-medium tracking-[-0.02em] text-ink">
                        {entry.title}
                      </h3>
                      <p className="mt-2.5 max-w-[58ch] text-[13.5px] leading-relaxed text-muted">
                        {entry.body}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= Standing / evidence ================= */}
      <section className="py-16 sm:py-24">
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
              <div className="relative">
                <span className="label-mono">Where the company stands</span>
                <h2 className="mt-5 max-w-[24ch] text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.1] font-medium text-gradient">
                  Including what we have not proved.
                </h2>

                <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3">
                  {evidence.map((item, i) => (
                    <Reveal key={item.label} delay={i * 0.07}>
                      <div>
                        <h3 className="text-[14.5px] font-medium text-ink">
                          {item.label}
                        </h3>
                        <p className="mt-2.5 text-[12.5px] leading-relaxed text-faint">
                          {item.body}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================= Social / contact ================= */}
      <section className="pb-8">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="card flex h-full flex-col p-7">
                <span className="label-mono">Follow the work</span>
                <ul className="mt-6 flex flex-col">
                  {socials.map((social) => {
                    const Icon = brandIcons[social.icon];
                    return (
                    <li
                      key={social.label}
                      className="flex items-center justify-between gap-4 border-b border-line py-4 first:border-t first:border-line"
                    >
                      <span className="flex items-center gap-3 text-[14px] text-ink">
                        <Icon className="h-4 w-4 text-muted" />
                        {social.label}
                      </span>
                      {social.href ? (
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted transition-colors hover:text-brand-text"
                        >
                          {social.handle}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[12px] text-ghost">
                            {social.handle}
                          </span>
                          <TodoChip />
                        </span>
                      )}
                    </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card flex h-full flex-col justify-between p-7">
                <div>
                  <span className="label-mono">Direct</span>
                  <p className="mt-5 text-[14px] leading-relaxed text-muted">
                    The fastest way to reach the people building this is email.
                    It goes to us, not to a queue.
                  </p>
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-8 block font-mono text-[14px] break-all text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand-text"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA
        title="Ask us the hard question."
        lead="The one we get asked most is what happens when the system is wrong about a classification. We have an answer, and it is architectural rather than reassuring."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "See what we shipped", href: "/products" }}
      />
    </>
  );
}
