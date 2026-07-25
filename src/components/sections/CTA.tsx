import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/Icons";

type Props = {
  title?: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export default function CTA({
  title = "Bring frontier capability inside the perimeter.",
  lead = "A technical briefing covers your data estate, the regimes that apply, and what a first production use case would actually take. No slideware.",
  primary = { label: "Book a technical briefing", href: "/contact" },
  secondary = { label: "Read the platform detail", href: "/solutions" },
}: Props) {
  return (
    <section className="relative py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="card grain relative overflow-hidden rounded-[24px] px-6 py-20 text-center sm:px-12">
            {/* Rift glow rising from beneath the panel */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 45% 90% at 50% 110%, rgba(77,124,255,0.35), transparent 65%)",
              }}
            />
            <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />

            <div className="relative">
              <h2 className="mx-auto max-w-[18ch] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] font-medium text-gradient">
                {title}
              </h2>
              <p className="mx-auto mt-6 max-w-[54ch] text-[15px] leading-relaxed text-fog-300">
                {lead}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={primary.href} className="btn btn-primary w-full sm:w-auto">
                  {primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={secondary.href} className="btn btn-ghost w-full sm:w-auto">
                  {secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
