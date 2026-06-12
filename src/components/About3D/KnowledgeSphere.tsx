'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// Interface for node definitions
interface TechNode {
  id: string;
  name: string;
  desc: string;
  pos: [number, number, number];
}

const techNodes: TechNode[] = [
  {
    id: 'genai',
    name: 'Generative AI',
    desc: 'Building intelligent applications powered by modern AI systems, LLMs, and agentic workflows.',
    pos: [2.2, 1.2, 0.8],
  },
  {
    id: 'rag',
    name: 'Retrieval-Augmented Generation (RAG)',
    desc: 'Integrating Large Language Models with vector databases and custom knowledge bases for context-aware retrieval.',
    pos: [-2.0, 1.5, -1.0],
  },
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    desc: 'Creating modern, responsive, and secure web applications from databases and APIs to frontend user interfaces.',
    pos: [-2.3, -1.0, 1.2],
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    desc: 'Designing scalable architectures, microservices, and serverless applications in AWS/Google Cloud environments.',
    pos: [1.8, -1.8, -1.0],
  },
  {
    id: 'research',
    name: 'Research & Engineering',
    desc: 'Analyzing advanced deep learning algorithms, performance latencies, and publishing engineering insights.',
    pos: [1.0, 2.2, -1.2],
  },
  {
    id: 'advocacy',
    name: 'Developer Advocacy',
    desc: 'Connecting developers, presenting technical workshops, and mentoring communities globally.',
    pos: [-1.2, -2.0, -1.5],
  },
  {
    id: 'opensource',
    name: 'Open Source',
    desc: 'Contributing to repositories, building developer tools, and leading public collaborative repositories.',
    pos: [0.0, -0.5, 2.5],
  },
];

// Predefined connections between adjacent nodes to form a neural mesh network
const meshConnections = [
  { from: 'genai', to: 'rag' },
  { from: 'genai', to: 'research' },
  { from: 'genai', to: 'opensource' },
  { from: 'rag', to: 'research' },
  { from: 'rag', to: 'fullstack' },
  { from: 'fullstack', to: 'cloud' },
  { from: 'fullstack', to: 'opensource' },
  { from: 'cloud', to: 'opensource' },
  { from: 'cloud', to: 'advocacy' },
  { from: 'opensource', to: 'advocacy' },
];

interface KnowledgeSphereProps {
  onNodeClick: (nodeId: string) => void;
}

// 1. Point Light component that dynamically follows the 3D screen position of the mouse cursor
function DynamicMouseLight() {
  const { mouse, viewport } = useThree();
  const lightRef = useRef<THREE.PointLight | null>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    // Project mouse coordinates to 3D space relative to viewport
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 3);
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={20}
      color="#3b82f6"
      distance={10}
      decay={1.6}
    />
  );
}

// 2. Individual Floating Node Component with spring physics and magnetic cursor pull
function NodeMesh({
  node,
  hoveredNode,
  setHoveredNode,
  onNodeClick,
}: {
  node: TechNode;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
  onNodeClick: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const isHovered = hoveredNode === node.id;

  // Determine if a neighbor of this node is currently hovered
  const isNeighborHovered = useMemo(() => {
    if (!hoveredNode) return false;
    return meshConnections.some(
      (conn) =>
        (conn.from === node.id && conn.to === hoveredNode) ||
        (conn.to === node.id && conn.from === hoveredNode)
    );
  }, [hoveredNode, node.id]);

  // Spring & Magnetic cursor pull logic in useFrame
  useFrame(({ mouse, viewport }) => {
    if (!meshRef.current) return;

    const targetX = node.pos[0];
    const targetY = node.pos[1];
    const targetZ = node.pos[2];

    // Compute cursor 3D location in viewport coordinates
    const cursorX = (mouse.x * viewport.width) / 2;
    const cursorY = (mouse.y * viewport.height) / 2;

    const dx = cursorX - targetX;
    const dy = cursorY - targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let offsetX = 0;
    let offsetY = 0;

    // Apply gentle magnetic pull towards cursor if in range (2.5 units)
    const pullRange = 2.5;
    if (dist < pullRange) {
      const force = (1 - dist / pullRange) * 0.28; // soft pull offset factor
      offsetX = dx * force;
      offsetY = dy * force;
    }

    // Spring interpolation to smoothly position node
    meshRef.current.position.x += (targetX + offsetX - meshRef.current.position.x) * 0.1;
    meshRef.current.position.y += (targetY + offsetY - meshRef.current.position.y) * 0.1;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.1;
  });

  return (
    <group>
      {/* Node Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredNode(node.id);
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'default';
          setHoveredNode(null);
        }}
        scale={isHovered ? 1.4 : isNeighborHovered ? 1.15 : 1.0}
      >
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial
          color={isHovered ? '#60a5fa' : isNeighborHovered ? '#3b82f6' : '#2563eb'}
          emissive={isHovered ? '#60a5fa' : isNeighborHovered ? '#2563eb' : '#1d4ed8'}
          emissiveIntensity={isHovered ? 3.0 : isNeighborHovered ? 1.6 : 0.8}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* HTML Custom Tooltip */}
      {isHovered && (
        <Html
          distanceFactor={7.5}
          position={[0, 0.4, 0]}
          zIndexRange={[200, 1000]}
          center
        >
          <div className="glass px-3.5 py-2.5 rounded-xl border border-white/10 w-52 pointer-events-none select-none shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 animate-fade-in text-left">
            <h4 className="font-display font-extrabold text-[11px] text-white tracking-wider mb-1 uppercase text-gradient-primary">
              {node.name}
            </h4>
            <p className="text-muted/95 text-[9px] leading-snug font-sans">
              {node.desc}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

// 3. Network Connection Lines Component (draws glows/colors based on node hover states)
function ConnectionLines({ hoveredNode }: { hoveredNode: string | null }) {
  // Center connections lines
  const centerLines = useMemo(() => {
    return techNodes.map((node) => {
      const isHighlighted = hoveredNode === node.id;
      return {
        id: `center-${node.id}`,
        points: [[0, 0, 0] as [number, number, number], node.pos],
        color: isHighlighted ? '#60a5fa' : '#1e3a8a',
        opacity: isHighlighted ? 0.75 : 0.2,
        lineWidth: isHighlighted ? 2.2 : 0.8,
      };
    });
  }, [hoveredNode]);

  // Mesh/neighbor connection lines
  const meshLines = useMemo(() => {
    return meshConnections.map((conn, idx) => {
      const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;
      const nodeFrom = techNodes.find((n) => n.id === conn.from);
      const nodeTo = techNodes.find((n) => n.id === conn.to);
      if (!nodeFrom || !nodeTo) return null;

      return {
        id: `mesh-${idx}`,
        points: [nodeFrom.pos, nodeTo.pos],
        color: isHighlighted ? '#60a5fa' : '#0f172a',
        opacity: isHighlighted ? 0.6 : 0.12,
        lineWidth: isHighlighted ? 1.8 : 0.6,
      };
    });
  }, [hoveredNode]);

  return (
    <>
      {/* Draw center to node connection lines */}
      {centerLines.map((line) => (
        <Line
          key={line.id}
          points={line.points}
          color={line.color}
          lineWidth={line.lineWidth}
          transparent
          opacity={line.opacity}
        />
      ))}

      {/* Draw node to node mesh connection lines */}
      {meshLines.map((line) => {
        if (!line) return null;
        return (
          <Line
            key={line.id}
            points={line.points}
            color={line.color}
            lineWidth={line.lineWidth}
            transparent
            opacity={line.opacity}
          />
        );
      })}
    </>
  );
}

// 4. Inside Scene Wrapper containing mouse perspective shifts and breathe idle animation
function SceneWrapper({
  hoveredNode,
  setHoveredNode,
  onNodeClick,
}: {
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
  onNodeClick: (nodeId: string) => void;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const idleRotRef = useRef(0);
  const { mouse } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Perspective shift: rotate group toward cursor using spring physics (0.04 interpolation)
    groupRef.current.rotation.y += (mouse.x * 0.45 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-mouse.y * 0.45 - groupRef.current.rotation.x) * 0.04;

    // Idle Breathe Animation: continuous rotation & height bounce when mouse is still
    idleRotRef.current += 0.0015;
    groupRef.current.rotation.y += Math.sin(idleRotRef.current) * 0.0002;
    groupRef.current.position.y = Math.sin(idleRotRef.current * 2) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Central HTML Information Display Card */}
      <Html position={[0, 0, 0]} center distanceFactor={7.5} zIndexRange={[50, 150]}>
        <div className="glass p-5 rounded-2xl flex flex-col items-center justify-center text-center w-52 select-none border border-primary/20 shadow-2xl shadow-primary/10 transition-all duration-300">
          <h3 className="text-[11px] font-display font-extrabold text-white tracking-[0.2em] mb-1.5 uppercase text-gradient-primary">
            AKASH SATPUTE
          </h3>
          <div className="w-8 h-[2px] bg-gradient-to-r from-primary to-secondary mb-2 rounded-full" />
          <span className="text-[9px] font-bold text-white/90 tracking-widest uppercase">
            AI Engineer
          </span>
          <span className="text-[8px] text-muted tracking-wider mt-0.5 font-medium">
            Full Stack Developer
          </span>
          <span className="text-[8px] text-muted tracking-wider font-medium">
            Community Leader
          </span>
        </div>
      </Html>

      {/* Render connections */}
      <ConnectionLines hoveredNode={hoveredNode} />

      {/* Render Tech Nodes */}
      {techNodes.map((node) => (
        <NodeMesh
          key={node.id}
          node={node}
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
          onNodeClick={onNodeClick}
        />
      ))}
    </group>
  );
}

// 5. Main Canvas wrapper exported to wrapper index
export default function KnowledgeSphere({ onNodeClick }: KnowledgeSphereProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Dynamic Pointlight cursor follower */}
        <DynamicMouseLight />
        
        {/* Subtle background static light to prevent pitch-black mesh shadows */}
        <directionalLight position={[2, 4, 3]} intensity={1.5} color="#8b5cf6" />
        <directionalLight position={[-2, -4, -3]} intensity={0.5} color="#3b82f6" />

        <SceneWrapper
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
          onNodeClick={onNodeClick}
        />
      </Canvas>
    </div>
  );
}
