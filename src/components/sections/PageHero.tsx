import type { ReactNode } from "react";
import SceneMount from "@/components/three/SceneMount";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";

export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16">
      <SceneMount variant="ambient" className="absolute inset-0 -z-10 h-[80vh]" />
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10 h-[80vh]" />
      <div className="pointer-events-none absolute inset-x-0 top-[52vh] -z-10 h-[30vh] bg-gradient-to-b from-transparent to-ink-950" />

      <Container>
        <div className="flex flex-col items-center pt-[160px] text-center sm:pt-[188px]">
          <Reveal y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08} y={20}>
            <h1 className="mt-8 max-w-[17ch] text-[clamp(2.3rem,5.6vw,4.2rem)] leading-[1.02] font-medium text-gradient">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[60ch] text-[15px] leading-relaxed text-fog-300 sm:text-[16px]">
              {lead}
            </p>
          </Reveal>

          {children && (
            <Reveal delay={0.24}>
              <div className="mt-10">{children}</div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
