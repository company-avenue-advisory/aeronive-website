"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The "Company Brain" motif: a governed lattice of knowledge nodes with
 * signals propagating along the edges, wrapped in counter-rotating rings.
 */

/* ------------------------------------------------------------------ */
/* Lattice geometry                                                    */
/* ------------------------------------------------------------------ */

function buildLattice(nodeCount: number, radius: number) {
  const nodes: THREE.Vector3[] = [];

  // Fibonacci sphere — even coverage without pole clustering
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    nodes.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(
        radius,
      ),
    );
  }

  // Connect each node to its k nearest neighbours, deduped
  const K = 3;
  const seen = new Set<string>();
  const edges: [number, number][] = [];

  for (let i = 0; i < nodeCount; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodeCount; j++) {
      if (i === j) continue;
      dists.push({ j, d: nodes[i].distanceToSquared(nodes[j]) });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let n = 0; n < K; n++) {
      const j = dists[n].j;
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  }

  return { nodes, edges };
}

/* ------------------------------------------------------------------ */
/* Edge shader — signal pulses travelling along connections            */
/* ------------------------------------------------------------------ */

const edgeVert = /* glsl */ `
  attribute float aProgress;
  attribute float aSeed;
  varying float vProgress;
  varying float vSeed;

  void main() {
    vProgress = aProgress;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const edgeFrag = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying float vProgress;
  varying float vSeed;

  void main() {
    // Head of the signal wraps 0 -> 1 along the segment
    float head = fract(uTime * 0.16 + vSeed);
    float d = abs(vProgress - head);
    d = min(d, 1.0 - d);
    float pulse = smoothstep(0.22, 0.0, d);

    // Only a subset of edges carry a live signal at any moment
    // ("active" is a GLSL reserved word — do not rename this back)
    float carrying = step(0.45, fract(vSeed * 7.31 + floor(uTime * 0.16 + vSeed)));
    pulse *= carrying;

    vec3 dim  = vec3(0.30, 0.42, 0.78);
    vec3 hot  = vec3(0.62, 0.90, 1.00);
    vec3 col = mix(dim, hot, pulse);

    float alpha = (0.12 + pulse * 0.78) * uOpacity;
    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/* Node shader                                                         */
/* ------------------------------------------------------------------ */

const nodeVert = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vGlow;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    float breathe = 0.6 + 0.4 * sin(uTime * 1.1 + aSeed * 6.2831);
    vGlow = breathe;

    float base = mix(1.6, 3.6, step(0.88, aSeed));
    gl_PointSize = base * uPixelRatio * (13.0 / max(-mv.z, 0.001)) * (0.75 + breathe * 0.4);
  }
`;

const nodeFrag = /* glsl */ `
  varying float vGlow;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.06, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.35;
    float alpha = (pow(core, 2.0) + halo) * vGlow;

    vec3 col = mix(vec3(0.55, 0.70, 1.0), vec3(0.85, 0.97, 1.0), core);
    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/* Core glow shader — the bright centre                                */
/* ------------------------------------------------------------------ */

const coreVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const coreFrag = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    // Inverted fresnel: brightest facing the camera, falling off at the rim
    float f = dot(normalize(vNormal), normalize(vView));
    float centre = pow(clamp(f, 0.0, 1.0), 2.2);
    float rim = pow(1.0 - clamp(f, 0.0, 1.0), 3.0);

    float breathe = 0.85 + 0.15 * sin(uTime * 0.8);
    // Kept low: the core sits directly behind the headline
    float a = (centre * 0.26 + rim * 0.20) * breathe;

    vec3 col = mix(vec3(0.35, 0.55, 1.0), vec3(0.80, 0.95, 1.0), centre);
    gl_FragColor = vec4(col * a, a);
  }
`;

/* ------------------------------------------------------------------ */

type Props = {
  radius?: number;
  nodeCount?: number;
  edgeOpacity?: number;
  position?: [number, number, number];
};

export default function NeuralCore({
  radius = 1.75,
  nodeCount = 200,
  edgeOpacity = 1,
  position = [0, 0, 0],
}: Props) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const edgeMat = useRef<THREE.ShaderMaterial>(null);
  const nodeMat = useRef<THREE.ShaderMaterial>(null);
  const coreMat = useRef<THREE.ShaderMaterial>(null);

  const { nodePositions, nodeSeeds, edgePositions, edgeProgress, edgeSeeds } =
    useMemo(() => {
      const { nodes, edges } = buildLattice(nodeCount, radius);

      const nodePositions = new Float32Array(nodes.length * 3);
      const nodeSeeds = new Float32Array(nodes.length);
      nodes.forEach((n, i) => {
        nodePositions[i * 3] = n.x;
        nodePositions[i * 3 + 1] = n.y;
        nodePositions[i * 3 + 2] = n.z;
        // Deterministic per-node seed
        nodeSeeds[i] = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
      });

      const edgePositions = new Float32Array(edges.length * 6);
      const edgeProgress = new Float32Array(edges.length * 2);
      const edgeSeeds = new Float32Array(edges.length * 2);

      edges.forEach(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        edgePositions.set([na.x, na.y, na.z, nb.x, nb.y, nb.z], i * 6);
        edgeProgress.set([0, 1], i * 2);
        const s = ((Math.sin(i * 78.233) * 43758.5453) % 1 + 1) % 1;
        edgeSeeds.set([s, s], i * 2);
      });

      return { nodePositions, nodeSeeds, edgePositions, edgeProgress, edgeSeeds };
    }, [nodeCount, radius]);

  const edgeUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uOpacity: { value: edgeOpacity } }),
    [edgeOpacity],
  );
  const nodeUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: 1 } }),
    [],
  );
  const coreUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state, delta) => {
    const t = delta;
    if (edgeMat.current) edgeMat.current.uniforms.uTime.value += t;
    if (coreMat.current) coreMat.current.uniforms.uTime.value += t;
    if (nodeMat.current) {
      nodeMat.current.uniforms.uTime.value += t;
      nodeMat.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    }

    if (group.current) {
      group.current.rotation.y += t * 0.09;
      // Gentle tilt tracking the pointer
      const targetX = -state.pointer.y * 0.22;
      const targetZ = state.pointer.x * 0.08;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
    }

    if (ringA.current) ringA.current.rotation.z += t * 0.18;
    if (ringB.current) ringB.current.rotation.z -= t * 0.11;
  });

  return (
    <group ref={group} position={position}>
      {/* Connections */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          <bufferAttribute attach="attributes-aProgress" args={[edgeProgress, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[edgeSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={edgeMat}
          uniforms={edgeUniforms}
          vertexShader={edgeVert}
          fragmentShader={edgeFrag}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Knowledge nodes */}
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[nodeSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMat}
          uniforms={nodeUniforms}
          vertexShader={nodeVert}
          fragmentShader={nodeFrag}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Bright core */}
      <mesh scale={radius * 0.3}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          ref={coreMat}
          uniforms={coreUniforms}
          vertexShader={coreVert}
          fragmentShader={coreFrag}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Counter-rotating orbital rings */}
      {/* Kept close to the lattice — wider rings sweep across the headline */}
      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[radius * 1.02, 0.004, 6, 180]} />
        <meshBasicMaterial
          color="#7aa2ff"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, Math.PI / 5, 0]}>
        <torusGeometry args={[radius * 1.16, 0.003, 6, 180]} />
        <meshBasicMaterial
          color="#5fe3f0"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
