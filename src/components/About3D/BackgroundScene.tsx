'use client';

import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Skill Node Data ─────────────────────────────────────────────────────────────
const SKILL_NODES = [
  { id: 'genai',      label: 'Generative AI',    color: '#a78bfa', position: [ 2.2,  1.4,  0.5] as [number,number,number] },
  { id: 'rag',        label: 'RAG',               color: '#38bdf8', position: [-2.4,  1.0, -0.3] as [number,number,number] },
  { id: 'fullstack',  label: 'Full Stack',         color: '#34d399', position: [ 0.2, -2.0,  1.0] as [number,number,number] },
  { id: 'cloud',      label: 'Cloud Computing',    color: '#fb923c', position: [-1.8, -1.5,  0.4] as [number,number,number] },
  { id: 'research',   label: 'Research & Eng.',    color: '#f472b6', position: [ 2.0, -0.6, -1.2] as [number,number,number] },
  { id: 'advocacy',   label: 'Dev Advocacy',       color: '#facc15', position: [-0.4,  2.2, -1.0] as [number,number,number] },
  { id: 'opensource', label: 'Open Source',         color: '#4ade80', position: [ 0.8,  0.6,  2.0] as [number,number,number] },
];

const PARTICLE_COUNT = 200;

// ─── Ambient particle cloud ───────────────────────────────────────────────────────
function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.5 + Math.random() * 3.0;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3]     = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, velocities };
  }, []);

  useFrame(() => {
    const pos = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        if (Math.abs(pos[idx]) > 4.8) velocities[idx] *= -1;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  });

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.03,
    color: '#7c3aed',
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  }), []);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// ─── Skill-to-skill connection lines ─────────────────────────────────────────────
function ConnectionLines({ hoveredId }: { hoveredId: string | null }) {
  const linesRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const pts: number[] = [];
    const cols: number[] = [];
    for (let a = 0; a < SKILL_NODES.length; a++) {
      for (let b = a + 1; b < SKILL_NODES.length; b++) {
        const pa = SKILL_NODES[a].position;
        const pb = SKILL_NODES[b].position;
        const dist = Math.hypot(pa[0]-pb[0], pa[1]-pb[1], pa[2]-pb[2]);
        if (dist < 4.0) {
          pts.push(...pa, ...pb);
          const ca = new THREE.Color(SKILL_NODES[a].color);
          const cb = new THREE.Color(SKILL_NODES[b].color);
          cols.push(ca.r, ca.g, ca.b, cb.r, cb.g, cb.b);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(cols), 3));
    return geo;
  }, []);

  const material = useMemo(() => new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.28,
  }), []);

  useFrame(() => {
    const target = hoveredId ? 0.7 : 0.28;
    material.opacity += (target - material.opacity) * 0.06;
  });

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
}

// ─── Radial synapse lines from center to each orb ────────────────────────────────
function SynapseLines({ activeId }: { activeId: string | null }) {
  const materials = useMemo(() =>
    SKILL_NODES.map(n => new THREE.LineBasicMaterial({
      color: new THREE.Color(n.color),
      transparent: true,
      opacity: 0.35,
    })), []);

  const geometries = useMemo(() =>
    SKILL_NODES.map(n => {
      const pts = [new THREE.Vector3(0,0,0), new THREE.Vector3(...n.position)];
      return new THREE.BufferGeometry().setFromPoints(pts);
    }), []);

  useFrame(() => {
    materials.forEach((mat, i) => {
      const node = SKILL_NODES[i];
      const isActive = !activeId || activeId === node.id;
      const target = isActive ? 0.55 : 0.1;
      mat.opacity += (target - mat.opacity) * 0.07;
    });
  });

  return (
    <group>
      {SKILL_NODES.map((node, i) => (
        <primitive key={node.id} object={new THREE.Line(geometries[i], materials[i])} />
      ))}
    </group>
  );
}

// ─── Central nucleus ──────────────────────────────────────────────────────────────
function CentralNucleus() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const core  = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.y = t * 0.45;
    if (ring2.current) { ring2.current.rotation.x = t * 0.35; ring2.current.rotation.z = t * 0.22; }
    if (ring3.current) ring3.current.rotation.z = -t * 0.28;
    if (core.current)  core.current.scale.setScalar(1 + Math.sin(t * 1.3) * 0.04);
  });

  return (
    <group ref={core} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={3.5} roughness={0} metalness={1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.58, 16, 16]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[0.68, 0.022, 8, 64]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.65} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[0.85, 0.015, 8, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[1.0, 0.010, 8, 64]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

// ─── Individual Skill Orb ─────────────────────────────────────────────────────────
function SkillOrb({
  node,
  isHovered,
  isSelected,
  onHover,
  onLeave,
  onClick,
}: {
  node: typeof SKILL_NODES[0];
  isHovered: boolean;
  isSelected: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const groupRef  = useRef<THREE.Group>(null!);
  const innerRef  = useRef<THREE.Mesh>(null!);
  const glowRef   = useRef<THREE.Mesh>(null!);
  const ringRef   = useRef<THREE.Mesh>(null!);
  const basePos   = useMemo(() => new THREE.Vector3(...node.position), [node.position]);
  const clock     = useRef(Math.random() * 100);

  const nodeColor = useMemo(() => new THREE.Color(node.color), [node.color]);

  // core material
  const innerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: nodeColor,
    emissive: nodeColor,
    emissiveIntensity: 1.4,
    roughness: 0.05,
    metalness: 0.7,
    transparent: true,
    opacity: 0.55,
  }), [nodeColor]);

  // glow halo material
  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: nodeColor,
    transparent: true,
    opacity: 0.18,
  }), [nodeColor]);

  // ring material
  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: nodeColor,
    transparent: true,
    opacity: 0.4,
  }), [nodeColor]);

  useFrame((state) => {
    clock.current += 0.016;
    const t = clock.current;

    const floatY = Math.sin(t * 0.55) * 0.18;
    const floatX = Math.cos(t * 0.38) * 0.10;
    const targetPos = basePos.clone().add(new THREE.Vector3(floatX, floatY, 0));
    groupRef.current.position.lerp(targetPos, 0.05);

    // Scale
    const targetScale = isHovered ? 1.35 : isSelected ? 1.18 : 1.0;
    const currentScale = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(currentScale + (targetScale - currentScale) * 0.1);

    // Glow pulse
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      glowRef.current.scale.setScalar(pulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = isHovered ? 0.5 : isSelected ? 0.35 : 0.18;
    }

    // Inner rotation
    if (innerRef.current) {
      innerRef.current.rotation.y += 0.012;
      innerRef.current.rotation.z += 0.006;
      (innerRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = isHovered ? 3 : isSelected ? 2 : 1.4;
      (innerRef.current.material as THREE.MeshStandardMaterial).opacity = isHovered ? 0.95 : isSelected ? 0.8 : 0.55;
    }

    // Ring
    if (ringRef.current) {
      ringRef.current.rotation.z += isHovered ? 0.04 : 0.012;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.6;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = isHovered ? 0.9 : isSelected ? 0.65 : 0.35;
    }
  });

  const SIZE = 0.28;

  return (
    <group
      ref={groupRef}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; onHover(); }}
      onPointerOut={() => { document.body.style.cursor = 'default'; onLeave(); }}
    >
      {/* Glow halo */}
      <mesh ref={glowRef} material={glowMat}>
        <sphereGeometry args={[SIZE + 0.14, 16, 16]} />
      </mesh>

      {/* Core orb */}
      <mesh ref={innerRef} material={innerMat}>
        <sphereGeometry args={[SIZE, 24, 24]} />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef} material={ringMat}>
        <torusGeometry args={[SIZE + 0.1, 0.018, 8, 48]} />
      </mesh>

      {/* HTML label */}
      {(isHovered || isSelected) && (
        <Html
          distanceFactor={8}
          position={[0, SIZE + 0.28, 0]}
          center
          zIndexRange={[100, 999]}
        >
          <div
            style={{
              background: 'rgba(2,2,14,0.85)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${node.color}55`,
              borderRadius: '10px',
              padding: '5px 13px',
              whiteSpace: 'nowrap',
              boxShadow: `0 0 22px ${node.color}33`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <span style={{
              color: node.color,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'system-ui, sans-serif',
            }}>
              {node.label}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── Camera rig (mouse parallax) ─────────────────────────────────────────────────
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{x:number;y:number}> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.3 - camera.position.x) * 0.045;
    camera.position.y += (-mouse.current.y * 1.1 - camera.position.y) * 0.045;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Full scene ───────────────────────────────────────────────────────────────────
function NeuralScene({ onNodeClick }: { onNodeClick: (id: string) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const handleClick = useCallback((id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
    onNodeClick(id);
  }, [onNodeClick]);

  // expose mouse ref for CameraRig
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = document.getElementById('about-canvas-container');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <CameraRig mouse={mouse} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={5} color="#8b5cf6" distance={9} />
      <pointLight position={[4, 4, 5]} intensity={1.8} color="#38bdf8" distance={12} />
      <pointLight position={[-4, -4, -5]} intensity={1.2} color="#f472b6" distance={12} />

      <ParticleCloud />
      <SynapseLines activeId={hoveredId ?? selectedId} />
      <ConnectionLines hoveredId={hoveredId} />
      <CentralNucleus />

      {SKILL_NODES.map((node) => (
        <SkillOrb
          key={node.id}
          node={node}
          isHovered={hoveredId === node.id}
          isSelected={selectedId === node.id}
          onHover={() => setHoveredId(node.id)}
          onLeave={() => setHoveredId(null)}
          onClick={() => handleClick(node.id)}
        />
      ))}
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────────
interface BackgroundSceneProps {
  onNodeClick: (nodeId: string) => void;
}

export default function BackgroundScene({ onNodeClick }: BackgroundSceneProps) {
  return (
    <div
      id="about-canvas-container"
      className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
    >
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <NeuralScene onNodeClick={onNodeClick} />
      </Canvas>
    </div>
  );
}
