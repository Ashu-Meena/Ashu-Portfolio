"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Torus, Icosahedron, Box, Wireframe, Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { useThemeContext } from "./theme-provider";

function CameraController() {
  const targetZ = useRef(5);
  const targetY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      // Zoom in slightly and move down as user scrolls
      targetZ.current = 5 - (scrollPercent * 3);
      targetY.current = -(scrollPercent * 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ.current, 2 * delta);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY.current, 2 * delta);
  });
  
  return null;
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    const scrollY = window.scrollY * 0.002;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + scrollY;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + scrollY;
    // Dynamic distortion based on scroll
    const material = meshRef.current.material as any;
    if (material && material.distort !== undefined) {
      material.distort = 0.4 + Math.min(window.scrollY * 0.0005, 0.4);
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1.5, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial color="var(--primary)" attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} wireframe={true} />
      </Sphere>
    </Float>
  );
}

function IronManReactor() {
  const innerRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!innerRef.current || !outerRef.current) return;
    const scrollY = window.scrollY * 0.005;
    innerRef.current.rotation.z = state.clock.getElapsedTime() * 0.5 + scrollY;
    outerRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + scrollY;
    outerRef.current.rotation.y = state.clock.getElapsedTime() * 0.2 + scrollY;
  });
  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
      <group>
        <Torus args={[1.5, 0.1, 16, 100]} ref={outerRef}>
          <meshStandardMaterial color="var(--primary)" emissive="var(--primary)" emissiveIntensity={2} wireframe />
        </Torus>
        <Torus args={[1.2, 0.2, 16, 50]} ref={innerRef}>
          <meshStandardMaterial color="var(--accent)" emissive="var(--accent)" emissiveIntensity={1.5} />
        </Torus>
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
        </Sphere>
      </group>
    </Float>
  );
}

function BatmanShape() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const scrollY = window.scrollY * 0.003;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.5 + scrollY;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2 + scrollY;
  });
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <Icosahedron args={[2, 0]} ref={ref}>
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </Icosahedron>
    </Float>
  );
}

function CyberpunkCube() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const scrollY = window.scrollY * 0.004;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.4 + scrollY;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.6 + scrollY;
  });
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <Box args={[2, 2, 2]} ref={ref}>
        <meshStandardMaterial color="var(--background)" emissive="var(--accent)" emissiveIntensity={0.5} wireframe />
      </Box>
    </Float>
  );
}

function MatrixRain() {
  const count = 1000;
  const [positions] = useState(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  });
  
  const pointsRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < count * 3; i += 3) {
      positions[i] -= 0.1;
      if (positions[i] < -10) positions[i] = 10;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* @ts-expect-error - React Three Fiber types missing args for bufferAttribute */}
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="var(--primary)" transparent opacity={0.8} />
    </points>
  );
}

function Particles() {
  const count = 500;
  const [positions] = useState(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  });

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* @ts-expect-error - React Three Fiber types missing args for bufferAttribute */}
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="var(--accent)" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function Hero3D() {
  const theme = useThemeContext();
  const themeName = theme?.name || "Space";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <CameraController />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          {themeName === "Iron Man" && <IronManReactor />}
          {themeName === "Batman" && <BatmanShape />}
          {themeName === "Cyberpunk" && <CyberpunkCube />}
          {themeName === "Matrix" && <MatrixRain />}
          {themeName === "Space" && <AnimatedSphere />}
        </PresentationControls>
        
        {themeName !== "Matrix" && <Particles />}
        {themeName !== "Matrix" && <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}
      </Canvas>
    </div>
  );
}
