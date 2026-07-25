import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/site/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { Lock, Shield, Trail } from "@/components/ui/Icons";
import { faqs, process, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a technical briefing with Aeronive Labs — scoped against your data estate, your sector, and the regimes you answer to.",
};

const assurances = [
  {
    icon: Lock,
    title: "No production access",
    body: "Assessment runs against schemas, samples, and documentation you control.",
  },
  {
    icon: Shield,
    title: "NDA before detail",
    body: "We sign yours. Technical discussion of your estate happens under it.",
  },
  {
    icon: Trail,
    title: "Engineers, not sales",
    body: "The first call is with the people who would build the system.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a technical briefing."
        lead="Tell us what you are trying to build and which regime governs it. We will come back with a view on feasibility, the deployment topology it implies, and what a first production use case would take."
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
            <Reveal>
              <ContactForm />
            </Reveal>

            <div className="flex flex-col gap-4">
              <Reveal delay={0.08}>
                <div className="card p-6">
                  <span className="label-mono">Direct</span>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-3 block font-mono text-[13.5px] break-all text-ink underline decoration-white/20 underline-offset-4 transition-colors hover:text-brand-text"
                  >
                    {site.email}
                  </a>
                  <p className="mt-4 text-[12.5px] leading-relaxed text-faint">
                    For procurement, security questionnaires, or an existing
                    engagement, email is usually faster.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="card flex flex-col gap-5 p-6">
                  {assurances.map(({ icon: Icon, title, body }) => (
                    <div key={title} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10">
                        <Icon className="h-4 w-4 text-brand-text" />
                      </span>
                      <div>
                        <h3 className="text-[13.5px] font-medium text-ink">
                          {title}
                        </h3>
                        <p className="mt-1 text-[12px] leading-relaxed text-faint">
                          {body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="card p-6">
                  <span className="label-mono">What happens next</span>
                  <ol className="mt-5 flex flex-col gap-4">
                    {process.map((p) => (
                      <li key={p.step} className="flex items-start gap-3">
                        <span className="mt-px font-mono text-[10px] text-brand">
                          {p.step}
                        </span>
                        <div>
                          <span className="text-[13px] text-body">
                            {p.title}
                          </span>
                          <p className="mt-0.5 text-[11.5px] leading-relaxed text-ghost">
                            {p.body.split(".")[0]}.
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= FAQ ================= */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <div>
                <span className="label-mono">Common questions</span>
                <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] font-medium text-gradient">
                  Asked before every engagement.
                </h2>
              </div>
            </Reveal>

            <div className="flex flex-col">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.06}>
                  <details className="group border-b border-line py-6 first:border-t first:border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                      <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-white">
                        {f.q}
                      </h3>
                      <span className="relative mt-1.5 h-3 w-3 shrink-0">
                        <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-muted" />
                        <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-muted transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                      </span>
                    </summary>
                    <p className="mt-4 max-w-[70ch] text-[13.5px] leading-[1.75] text-muted">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
