"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Deterministic PRNG so the field is identical across re-renders. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aSize;
  varying float vTwinkle;
  varying float vSeed;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    // Slow, desynchronised twinkle
    vTwinkle = 0.55 + 0.45 * sin(uTime * 0.7 + aSeed * 6.2831);
    vSeed = aSeed;

    // Tuned so stars land at 1-5 CSS px: any larger and they read as blobs
    gl_PointSize = aSize * uPixelRatio * (72.0 / max(-mv.z, 0.001));
  }
`;

const fragmentShader = /* glsl */ `
  varying float vTwinkle;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    // Soft core with a wide falloff halo
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 2.4) * vTwinkle;

    // A minority of stars run brand green, the rest near-white
    vec3 white = vec3(0.92, 0.95, 1.0);
    vec3 tint  = vec3(0.21, 0.85, 0.60);
    vec3 col = mix(white, tint, step(0.72, vSeed));

    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

type Props = {
  count?: number;
  radius?: number;
  /** Multiplier on the parallax response to pointer movement. */
  parallax?: number;
};

export default function Starfield({
  count = 1600,
  radius = 26,
  parallax = 1,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds, sizes } = useMemo(() => {
    const rand = mulberry32(20260725);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a shell so nothing sits on top of the camera
      const r = radius * (0.35 + 0.65 * Math.cbrt(rand()));
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flatten vertically
      positions[i * 3 + 2] = r * Math.cos(phi);

      seeds[i] = rand();
      // Mostly small, a few noticeably brighter
      sizes[i] = rand() < 0.06 ? 2.6 + rand() * 2.2 : 0.7 + rand() * 1.1;
    }

    return { positions, seeds, sizes };
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value += delta;
      material.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.012;
      // Pointer parallax, eased toward the target each frame
      const tx = state.pointer.y * 0.06 * parallax;
      const ty = state.pointer.x * 0.09 * parallax;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.03;
      group.current.position.x += (ty * 2 - group.current.position.x) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
