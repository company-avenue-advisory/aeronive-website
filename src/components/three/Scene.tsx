"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import AuroraRift from "./AuroraRift";
import NeuralCore from "./NeuralCore";
import Starfield from "./Starfield";

export type SceneVariant = "hero" | "ambient";

/**
 * Pushed back so it reads as a distant object behind the headline. On a narrow
 * viewport it shrinks further — at phone widths a full-size lattice sweeps its
 * rings straight through the copy.
 */
function HeroLattice() {
  const width = useThree((state) => state.size.width);
  const narrow = width < 700;

  return (
    <NeuralCore
      radius={narrow ? 1.1 : 1.55}
      nodeCount={narrow ? 140 : 200}
      edgeOpacity={narrow ? 0.75 : 1}
      position={[0, narrow ? -1.1 : -0.7, narrow ? -3 : -2.1]}
    />
  );
}

type Props = {
  variant?: SceneVariant;
  /** Paused when the canvas is scrolled out of view. */
  active?: boolean;
};

/**
 * Both variants share the same visual language so pages feel like one
 * environment; the ambient variant drops the lattice and dims the rift so
 * inner-page headers stay readable.
 */
export default function Scene({ variant = "hero", active = true }: Props) {
  const isHero = variant === "hero";

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, isHero ? 6 : 8], fov: 45, near: 0.1, far: 100 }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <AuroraRift
          intensity={isHero ? 1.05 : 0.5}
          beam={isHero ? 1 : 0.5}
          arcs={isHero ? 1 : 1.15}
          scale={isHero ? [34, 20] : [44, 22]}
          position={[0, isHero ? 0.2 : 0.6, -7]}
        />

        <Starfield
          count={isHero ? 1600 : 900}
          radius={isHero ? 26 : 30}
          parallax={isHero ? 1 : 0.5}
        />

        {isHero && <HeroLattice />}
      </Suspense>
    </Canvas>
  );
}
