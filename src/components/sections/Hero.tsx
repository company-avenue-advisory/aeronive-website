import Link from "next/link";
import SceneMount from "@/components/three/SceneMount";
import ConsoleMockup from "@/components/site/ConsoleMockup";
import Reveal from "@/components/ui/Reveal";
import ScrollParallax from "@/components/ui/ScrollParallax";
import { Container } from "@/components/ui/Section";
import { ArrowRight, chipIcons } from "@/components/ui/Icons";
import { chips } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-24 sm:pb-32">
      {/* 3D environment */}
      <SceneMount variant="hero" className="absolute inset-0 -z-10 h-[130vh]" />

      {/* Engineering grid, and a fade that hands off to the page below */}
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10 h-[130vh]" />

      {/* Scrim: guarantees headline contrast over the brightest part of the
          rift. Wider and stronger on narrow screens, where the beam covers a
          much larger share of the column. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[100vh] bg-[radial-gradient(ellipse_85%_32%_at_50%_44%,rgba(4,5,10,0.78),rgba(4,5,10,0.34)_58%,transparent_82%)] sm:bg-[radial-gradient(ellipse_52%_26%_at_50%_40%,rgba(4,5,10,0.55),rgba(4,5,10,0.22)_60%,transparent_80%)]"
        style={{ zIndex: -5 }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-[95vh] -z-10 h-[45vh] bg-gradient-to-b from-transparent to-ink-950" />

      <Container className="relative">
        <div className="flex flex-col items-center pt-[168px] text-center sm:pt-[196px]">
          {/* Ticked eyebrow capsule */}
          <Reveal y={12}>
            <div className="flex items-center gap-3">
              <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-white/25 sm:block" />
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua-400 pulse-dot" />
                Compliance-native AI infrastructure
              </span>
              <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-white/25 sm:block" />
            </div>
          </Reveal>

          <Reveal delay={0.08} y={20}>
            <h1 className="mt-8 max-w-[16ch] text-[clamp(2.2rem,7.2vw,5.4rem)] leading-[1.02] font-medium sm:leading-[0.98]">
              <span className="text-gradient">Frontier AI,</span>
              <br />
              <span className="text-gradient-beam">governed by design.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[62ch] text-[15px] leading-relaxed text-fog-300 sm:text-[16.5px]">
              Aeronive Labs builds compliance-native AI for regulated sectors —
              private Company Brains, local-first interconnects, and data-backed
              pipelines that run inside your perimeter and hold up under audit.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
                Book a technical briefing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/solutions" className="btn btn-ghost w-full sm:w-auto">
                Explore the platform
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-fog-400 uppercase">
              On-premise · Private VPC · Air-gapped
            </p>
          </Reveal>
        </div>

        {/* Product visual */}
        <ScrollParallax className="mt-16 sm:mt-20">
          <ConsoleMockup />
        </ScrollParallax>

        {/* Capability rail beneath the console, as in the reference comps */}
        <Reveal delay={0.1}>
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-3 lg:grid-cols-6">
            {chips.map((chip) => {
              const Icon = chipIcons[chip.icon];
              return (
                <li
                  key={chip.label}
                  className="flex items-center gap-2.5 bg-ink-950/85 px-4 py-4 transition-colors duration-400 hover:bg-ink-900"
                >
                  <Icon className="h-4 w-4 shrink-0 text-beam-400" />
                  <span className="text-[12.5px] leading-tight text-fog-300">
                    {chip.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
