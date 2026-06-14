'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BACKGROUND_PARTICLE_COUNT = 1000; // slightly more particles for denser starfield
const NEURAL_NODE_COUNT = 45;

// ─── Ambient Particle Cloud with Z-Stretch ───────────────────────────────────
function AmbientParticles({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { geometry, velocities, sparsePositions, gatheredPositions } = useMemo(() => {
    const sparse = new Float32Array(BACKGROUND_PARTICLE_COUNT * 3);
    const gathered = new Float32Array(BACKGROUND_PARTICLE_COUNT * 3);
    const velocities = new Float32Array(BACKGROUND_PARTICLE_COUNT * 3);

    for (let i = 0; i < BACKGROUND_PARTICLE_COUNT; i++) {
      sparse[i * 3] = (Math.random() - 0.5) * 25;
      sparse[i * 3 + 1] = (Math.random() - 0.5) * 25;
      sparse[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 6.0;
      gathered[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      gathered[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      // Stretch Z coordinates to create a tunnel/depth warp effect
      gathered[i * 3 + 2] = r * Math.cos(phi) * 1.8;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sparse), 3));
    return { geometry: geo, velocities, sparsePositions: sparse, gatheredPositions: gathered };
  }, []);

  useFrame((state) => {
    const posAttr = geometry.attributes.position;
    const pos = posAttr.array as Float32Array;
    const s = scrollProgress.current;

    const assemblyFactor = THREE.MathUtils.clamp(s / 0.25, 0, 1);
    
    // Expand the radial spread of stars slightly as scroll progresses
    const spreadScale = 1.0 + s * 0.25;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < BACKGROUND_PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const tx = THREE.MathUtils.lerp(sparsePositions[idx], gatheredPositions[idx], assemblyFactor) * spreadScale;
      const ty = THREE.MathUtils.lerp(sparsePositions[idx + 1], gatheredPositions[idx + 1], assemblyFactor) * spreadScale;
      const tz = THREE.MathUtils.lerp(sparsePositions[idx + 2], gatheredPositions[idx + 2], assemblyFactor);

      const driftX = Math.sin(time * 0.2 + i) * 0.02 + velocities[idx];
      const driftY = Math.cos(time * 0.15 + i) * 0.02 + velocities[idx + 1];
      const driftZ = velocities[idx + 2];

      pos[idx] = THREE.MathUtils.lerp(pos[idx], tx + driftX, 0.08);
      pos[idx + 1] = THREE.MathUtils.lerp(pos[idx + 1], ty + driftY, 0.08);
      pos[idx + 2] = THREE.MathUtils.lerp(pos[idx + 2], tz + driftZ, 0.08);
    }
    posAttr.needsUpdate = true;
  });

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.04,
    color: '#00f0ff', // Cyan stars
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  }), []);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// ─── Neural Connection Network ─────────────────────────────────────────────
function NeuralNetwork({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const lineSegmentsRef = useRef<THREE.LineSegments>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const { nodePositions, geometryPoints, geometryLines } = useMemo(() => {
    const posArray = new Float32Array(NEURAL_NODE_COUNT * 3);
    for (let i = 0; i < NEURAL_NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.5 + Math.random() * 4.5;
      posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = r * Math.cos(phi) * 1.5;
    }

    const geoPoints = new THREE.BufferGeometry();
    geoPoints.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const lineIndices: number[] = [];
    for (let i = 0; i < NEURAL_NODE_COUNT; i++) {
      for (let j = i + 1; j < NEURAL_NODE_COUNT; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 3.2) {
          lineIndices.push(i, j);
        }
      }
    }

    const geoLines = new THREE.BufferGeometry();
    geoLines.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geoLines.setIndex(lineIndices);

    return { nodePositions: posArray, geometryPoints: geoPoints, geometryLines: geoLines };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posPoints = geometryPoints.attributes.position.array as Float32Array;
    const s = scrollProgress.current;

    const connectionOpacity = THREE.MathUtils.clamp((s - 0.1) / 0.4, 0, 1) * 0.15;
    if (lineSegmentsRef.current) {
      (lineSegmentsRef.current.material as THREE.LineBasicMaterial).opacity = connectionOpacity;
    }

    for (let i = 0; i < NEURAL_NODE_COUNT; i++) {
      const idx = i * 3;
      posPoints[idx + 1] += Math.sin(time * 0.4 + i) * 0.002;
    }
    geometryPoints.attributes.position.needsUpdate = true;
    if (geometryLines.attributes.position) {
      geometryLines.attributes.position.needsUpdate = true;
    }
  });

  const pointMat = useMemo(() => new THREE.PointsMaterial({
    size: 0.065,
    color: '#a855f7', // Purple nodes
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  }), []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#3b82f6', // Indigo lines
    transparent: true,
    opacity: 0.15,
  }), []);

  return (
    <group>
      <points ref={pointsRef} geometry={geometryPoints} material={pointMat} />
      <lineSegments ref={lineSegmentsRef} geometry={geometryLines} material={lineMat} />
    </group>
  );
}

// ─── Camera Rig (3D Scroll Warp Fly-Through) ─────────────────────────────────
function CameraRig({
  mouse,
  scrollProgress,
  isMobile,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const s = scrollProgress.current;
    
    // Decreasing targetZ as scroll progress increases makes the camera fly
    // straight through the particle field, creating the 3D warp speed/depth effect.
    const startZ = isMobile ? 8.2 : 6.8;
    const travelDistance = isMobile ? 11.5 : 10.5;
    const targetZ = startZ - s * travelDistance;

    // Mouse parallax shifts the viewpoint angle
    const targetX = mouse.current.x * 1.5;
    const targetY = -mouse.current.y * 1.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Full Scene Assembler ───────────────────────────────────────────────────
interface NeuralSceneProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
}

function NeuralScene({ mouse, scrollProgress }: NeuralSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#3b82f6" distance={8} />
      <pointLight position={[5, 5, 3]} intensity={1.5} color="#a855f7" distance={10} />
      <pointLight position={[-5, -5, -3]} intensity={1.2} color="#00f0ff" distance={10} />

      <CameraRig mouse={mouse} scrollProgress={scrollProgress} isMobile={isMobile} />
      <AmbientParticles scrollProgress={scrollProgress} />
      <NeuralNetwork scrollProgress={scrollProgress} />
    </>
  );
}

// ─── BackgroundScene Main Wrapper ───────────────────────────────────────────
interface BackgroundSceneProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
}

export default function BackgroundScene({ mouse, scrollProgress }: BackgroundSceneProps) {
  return (
    <div
      id="about-canvas-container"
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 7.0], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <NeuralScene mouse={mouse} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
