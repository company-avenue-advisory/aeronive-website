"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked lift used on the hero console: it settles into place as the
 * section scrolls past, rather than animating once and stopping.
 */
export default function ScrollParallax({
  children,
  className = "",
  from = 90,
  to = -40,
  scaleFrom = 0.96,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  scaleFrom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [from, 0, to]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [scaleFrom, 1]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y, scale }}>
      {children}
    </motion.div>
  );
}
