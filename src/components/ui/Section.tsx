import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="h-1.5 w-1.5 rounded-full bg-aqua-400 pulse-dot" />
      {children}
    </span>
  );
}

/**
 * Centred section header. `lead` sits under the title at a wider measure.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  const isCentre = align === "center";
  return (
    <div
      className={
        isCentre ? "flex flex-col items-center text-center" : "flex flex-col"
      }
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-medium text-gradient">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-fog-300 ${
              isCentre ? "mx-auto" : ""
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Full-bleed hairline that fades at both ends. */
export function Divider({ className = "" }: { className?: string }) {
  return <div className={`rule-fade ${className}`} />;
}
