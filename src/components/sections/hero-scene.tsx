"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A network of six hubs (data, systems, models, agents, automation, action) with satellite
// nodes and links, drifting slowly and tilting toward the cursor. Pulses travel along links
// to suggest data moving through a system. Everything is instanced: three draw calls for
// the geometry plus one for the faint wireframe shell.

type Props = {
  dark: boolean;
  active: boolean;
  onReady?: () => void;
};

const HUB_COUNT = 6;
const SATELLITES_PER_HUB = 6;
const PULSE_COUNT = 9;

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(2026);
  const nodes: THREE.Vector3[] = [];
  const edges: [number, number][] = [];

  for (let h = 0; h < HUB_COUNT; h++) {
    const angle = (h / HUB_COUNT) * Math.PI * 2;
    nodes.push(new THREE.Vector3(Math.cos(angle) * 1.5, Math.sin(angle * 2) * 0.22, Math.sin(angle) * 1.5));
  }
  for (let h = 0; h < HUB_COUNT; h++) {
    let previous = -1;
    for (let s = 0; s < SATELLITES_PER_HUB; s++) {
      const direction = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
      const distance = 0.42 + rand() * 0.48;
      const index = nodes.push(nodes[h].clone().addScaledVector(direction, distance)) - 1;
      edges.push([h, index]);
      if (previous >= 0 && rand() < 0.35) edges.push([previous, index]);
      previous = index;
    }
    edges.push([h, (h + 1) % HUB_COUNT]);
  }
  for (let i = 0; i < 6; i++) {
    const a = Math.floor(rand() * nodes.length);
    const b = Math.floor(rand() * nodes.length);
    if (a !== b) edges.push([a, b]);
  }
  return { nodes, edges };
}

const palettes = {
  light: {
    hub: "#0b3f75",
    satellite: ["#1e78be", "#2a9bd8", "#1567a8"],
    line: "#0b3f75",
    lineOpacity: 0.22,
    pulse: "#53c6f2",
    shell: "#0b3f75",
    shellOpacity: 0.06,
  },
  dark: {
    hub: "#a9e4fa",
    satellite: ["#4fb3e8", "#7fd6f7", "#3aa0de"],
    line: "#4fb3e8",
    lineOpacity: 0.3,
    pulse: "#ffffff",
    shell: "#7fd6f7",
    shellOpacity: 0.07,
  },
};

function Network({ dark, active }: { dark: boolean; active: boolean }) {
  const palette = dark ? palettes.dark : palettes.light;
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const hubMesh = useRef<THREE.InstancedMesh>(null);
  const satelliteMesh = useRef<THREE.InstancedMesh>(null);
  const pulseMesh = useRef<THREE.InstancedMesh>(null);

  const { nodes, edges, linePositions } = useMemo(() => {
    const graph = buildGraph();
    const positions = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], i) => {
      positions.set([graph.nodes[a].x, graph.nodes[a].y, graph.nodes[a].z], i * 6);
      positions.set([graph.nodes[b].x, graph.nodes[b].y, graph.nodes[b].z], i * 6 + 3);
    });
    return { ...graph, linePositions: positions };
  }, []);

  const pulses = useMemo(() => {
    const rand = mulberry32(99);
    return Array.from({ length: PULSE_COUNT }, () => ({
      edge: Math.floor(rand() * edges.length),
      t: rand(),
      speed: 0.28 + rand() * 0.32,
    }));
  }, [edges.length]);

  const scratch = useMemo(
    () => ({ matrix: new THREE.Matrix4(), position: new THREE.Vector3(), color: new THREE.Color() }),
    []
  );

  useLayoutEffect(() => {
    const { matrix, color } = scratch;
    if (hubMesh.current) {
      for (let i = 0; i < HUB_COUNT; i++) {
        matrix.makeTranslation(nodes[i].x, nodes[i].y, nodes[i].z);
        hubMesh.current.setMatrixAt(i, matrix);
        hubMesh.current.setColorAt(i, color.set(palette.hub));
      }
      hubMesh.current.instanceMatrix.needsUpdate = true;
      if (hubMesh.current.instanceColor) hubMesh.current.instanceColor.needsUpdate = true;
    }
    if (satelliteMesh.current) {
      for (let i = HUB_COUNT; i < nodes.length; i++) {
        const j = i - HUB_COUNT;
        matrix.makeTranslation(nodes[i].x, nodes[i].y, nodes[i].z);
        satelliteMesh.current.setMatrixAt(j, matrix);
        satelliteMesh.current.setColorAt(j, color.set(palette.satellite[j % palette.satellite.length]));
      }
      satelliteMesh.current.instanceMatrix.needsUpdate = true;
      if (satelliteMesh.current.instanceColor) satelliteMesh.current.instanceColor.needsUpdate = true;
    }
  }, [nodes, palette, scratch]);

  useFrame((state, delta) => {
    if (!active) return;
    const step = Math.min(delta, 0.05);
    if (group.current) {
      group.current.rotation.y += step * 0.09;
      const targetX = 0.18 + state.pointer.y * -0.14;
      const targetZ = state.pointer.x * 0.1;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (shell.current) {
      shell.current.rotation.y -= step * 0.03;
      shell.current.rotation.x += step * 0.015;
    }
    if (pulseMesh.current) {
      const { matrix, position } = scratch;
      pulses.forEach((pulse, i) => {
        pulse.t += step * pulse.speed;
        if (pulse.t >= 1) {
          pulse.t = 0;
          // Continue from the node we just reached where possible, so pulses trace paths.
          const reached = edges[pulse.edge][1];
          const candidates = edges.map((e, idx) => (e[0] === reached ? idx : -1)).filter((idx) => idx >= 0);
          pulse.edge = candidates.length
            ? candidates[Math.floor(Math.random() * candidates.length)]
            : Math.floor(Math.random() * edges.length);
        }
        const [a, b] = edges[pulse.edge];
        position.lerpVectors(nodes[a], nodes[b], pulse.t);
        matrix.makeTranslation(position.x, position.y, position.z);
        pulseMesh.current!.setMatrixAt(i, matrix);
      });
      pulseMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} rotation={[0.18, 0, 0]}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.55, 1]} />
        <meshBasicMaterial wireframe transparent opacity={palette.shellOpacity} color={palette.shell} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial transparent opacity={palette.lineOpacity} color={palette.line} />
      </lineSegments>
      <instancedMesh ref={hubMesh} args={[undefined, undefined, HUB_COUNT]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial roughness={0.35} metalness={0.1} />
      </instancedMesh>
      <instancedMesh ref={satelliteMesh} args={[undefined, undefined, nodes.length - HUB_COUNT]}>
        <sphereGeometry args={[0.048, 16, 16]} />
        <meshStandardMaterial roughness={0.45} metalness={0.05} />
      </instancedMesh>
      <instancedMesh ref={pulseMesh} args={[undefined, undefined, PULSE_COUNT]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={palette.pulse} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export default function HeroScene({ dark, active, onReady }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "never"}
      onCreated={() => onReady?.()}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={dark ? 0.9 : 1.1} />
      <directionalLight position={[3, 4, 5]} intensity={dark ? 1.1 : 1.3} />
      <pointLight position={[-4, -2, 3]} intensity={dark ? 0.8 : 0.5} color={dark ? "#7fd6f7" : "#2a9bd8"} />
      <Network dark={dark} active={active} />
    </Canvas>
  );
}
