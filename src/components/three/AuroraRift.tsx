"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Volumetric backdrop: a central vertical light rift crossed by two slow
 * parabolic aurora bands. Additive, so it reads as emitted light rather
 * than a painted gradient.
 *
 * Colours are hardcoded as sRGB literals: this is a raw ShaderMaterial, so
 * three's colour management never touches the output.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uBeam;   // strength of the central vertical rift
  uniform float uArcs;   // strength of the sweeping bands

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float t = uTime * 0.05;

    /* ---- central vertical rift ---------------------------------- */
    float wobble = (fbm(vec2(uv.y * 1.7, t * 3.0)) - 0.5) * 0.07;
    float x = uv.x + wobble;

    // Narrow: a wide beam washes out headline text sitting in front of it
    float halo = exp(-abs(x) * 9.5);
    float core = exp(-abs(x) * 52.0);

    // Weighted toward the top so the brightest part clears the headline
    float vFall = smoothstep(1.15, -0.25, abs(uv.y));
    float topBias = mix(0.30, 1.0, smoothstep(-0.45, 0.7, uv.y));
    halo *= vFall * topBias;
    core *= vFall * topBias;

    /* ---- sweeping aurora bands ---------------------------------- */
    float arcs = 0.0;
    for (int i = 0; i < 2; i++) {
      float fi = float(i);
      float k = 0.5 + fi * 0.4;
      float yOff = 0.4 - fi * 0.62;
      float curve = -k * uv.x * uv.x + yOff;
      float d = abs(uv.y - curve);

      float band = exp(-d * (15.0 - fi * 4.5));
      band *= 0.5 + 0.5 * fbm(vec2(uv.x * 1.9 + t * (1.2 + fi), fi * 11.0 + t * 0.8));
      band *= smoothstep(1.3, 0.3, abs(uv.x));
      arcs += band;
    }

    /* ---- composite ---------------------------------------------- */
    float energy = halo * uBeam + arcs * uArcs * 0.55;

    vec3 deep = vec3(0.18, 0.32, 0.85);  // #2e52d9-ish
    vec3 mid  = vec3(0.48, 0.64, 1.00);  // beam-400
    vec3 hot  = vec3(0.75, 0.95, 1.00);  // near-white cyan

    vec3 col = mix(deep, mid, clamp(energy * 1.6, 0.0, 1.0));
    col = mix(col, hot, clamp(core * 1.3, 0.0, 1.0));

    float a = clamp(energy + core * uBeam * 1.25, 0.0, 1.0) * uIntensity;

    gl_FragColor = vec4(col * a, a);
  }
`;

type Props = {
  intensity?: number;
  beam?: number;
  arcs?: number;
  scale?: [number, number];
  position?: [number, number, number];
};

export default function AuroraRift({
  intensity = 1,
  beam = 1,
  arcs = 1,
  scale = [30, 18],
  position = [0, 0, -6],
}: Props) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uBeam: { value: beam },
      uArcs: { value: arcs },
    }),
    [intensity, beam, arcs],
  );

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={position} frustumCulled={false}>
      <planeGeometry args={[scale[0], scale[1], 1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
