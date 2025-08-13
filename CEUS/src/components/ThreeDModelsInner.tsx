'use client'
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Function to apply glass materials to GLTF models
function applyGlassMaterials(scene: THREE.Group) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      // Create glass material
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        ior: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });
      
      child.material = glassMaterial;
    }
  });
}

// Water droplet component
function WaterDroplet({ position, delay, interval }: { position: [number, number, number]; delay: number; interval: number }) {
  const dropletRef = useRef<THREE.Mesh>(null);
  const [dropped, setDropped] = useState(false);
  const [resetTime, setResetTime] = useState(0);

  useFrame((state) => {
    if (dropletRef.current) {
      const time = state.clock.elapsedTime + delay;
      
      if (time > 2) { // Start dropping after 2 seconds
        if (!dropped) {
          dropletRef.current.position.y -= 0.02;
          if (dropletRef.current.position.y < -2) {
            setDropped(true);
            setResetTime(state.clock.elapsedTime);
          }
        } else {
          // Reset droplet after interval
          if (state.clock.elapsedTime - resetTime > interval) {
            dropletRef.current.position.y = position[1];
            setDropped(false);
          }
        }
      }
    }
  });

  if (dropped) return null;

  return (
    <mesh ref={dropletRef} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial 
        color="#4a90e2" 
        transparent 
        opacity={0.8}
        metalness={0.0}
        roughness={0.0}
      />
    </mesh>
  );
}

// Fallback Burette using basic geometries
function FallbackBurette({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [dropletTime, setDropletTime] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
    setDropletTime(state.clock.elapsedTime);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Burette glass body - outer cylinder */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1} 
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Burette outline */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.102, 0.102, 1, 16]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Burette liquid - inner cylinder */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial 
          color="#4a90e2" 
          transparent 
          opacity={0.7}
          metalness={0.0}
          roughness={0.0}
        />
      </mesh>
      
      {/* Burette tip - small cone */}
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.05, 0.2, 8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Burette tip outline */}
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.052, 0.2, 8]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Burette stopcock */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.15]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Burette scale markings */}
      <mesh position={[0.11, 0.5, 0]}>
        <boxGeometry args={[0.01, 0.8, 0.01]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Water droplets */}
      {dropletTime > 2 && (
        <>
          <WaterDroplet position={[0, -0.5, 0]} delay={0} interval={1.5} />
          <WaterDroplet position={[0, -0.5, 0]} delay={0.5} interval={1.5} />
          <WaterDroplet position={[0, -0.5, 0]} delay={1} interval={1.5} />
        </>
      )}
    </group>
  );
}

// GLTF Burette Model Component
function GLTFBuretteModel({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [dropletTime, setDropletTime] = useState(0);
  const model = useGLTF('/Burette.glb');

  useEffect(() => {
    if (model && model.scene) {
      applyGlassMaterials(model.scene);
    }
  }, [model]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
    setDropletTime(state.clock.elapsedTime);
  });

  return (
    <group ref={groupRef} position={position} scale={[0.8, 0.8, 0.8]}>
      <primitive object={model.scene} />
      
      {/* Water droplets */}
      {dropletTime > 2 && (
        <>
          <WaterDroplet position={[0, -0.5, 0]} delay={0} interval={1.5} />
          <WaterDroplet position={[0, -0.5, 0]} delay={0.5} interval={1.5} />
          <WaterDroplet position={[0, -0.5, 0]} delay={1} interval={1.5} />
        </>
      )}
    </group>
  );
}

// Fallback Flask using basic geometries
function FallbackFlask({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Flask glass body - outer sphere */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Flask outline */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.402, 16, 16]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Flask liquid - inner sphere */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color="#e74c3c" 
          transparent 
          opacity={0.6}
          metalness={0.0}
          roughness={0.0}
        />
      </mesh>
      
      {/* Flask neck - cylinder */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Flask neck outline */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.102, 0.102, 0.4, 8]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Flask opening */}
      <mesh position={[0, 1.1, 0]}>
        <ringGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Flask base */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 8]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// GLTF Flask Model Component
function GLTFFlaskModel({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const model = useGLTF('/free_conical_flask__laboratory__low_poly/scene.gltf');

  useEffect(() => {
    if (model && model.scene) {
      applyGlassMaterials(model.scene);
    }
  }, [model]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[0.6, 0.6, 0.6]}>
      <primitive object={model.scene} />
    </group>
  );
}

// Main 3D Scene Component
export default function ThreeDModelsInner() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        className="hidden md:block w-full h-full" // Only show on medium screens and larger
        onCreated={() => setIsLoaded(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, 5]} intensity={0.8} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.3} />
        
        {/* Burette positioned on the left */}
        <Suspense fallback={<FallbackBurette position={[-2, 0, 0]} />}>
          <GLTFBuretteModel position={[-2, 0, 0]} />
        </Suspense>
        
        {/* Flask positioned on the right */}
        <Suspense fallback={<FallbackFlask position={[2, 0, 0]} />}>
          <GLTFFlaskModel position={[2, 0, 0]} />
        </Suspense>
      </Canvas>
      
      {/* Mobile version with smaller canvas */}
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: 'transparent' }}
        className="block md:hidden w-full h-full" // Only show on small screens
        onCreated={() => setIsLoaded(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, 5]} intensity={0.8} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.3} />
        
        {/* Burette positioned on the left */}
        <Suspense fallback={<FallbackBurette position={[-1.5, 0, 0]} />}>
          <GLTFBuretteModel position={[-1.5, 0, 0]} />
        </Suspense>
        
        {/* Flask positioned on the right */}
        <Suspense fallback={<FallbackFlask position={[1.5, 0, 0]} />}>
          <GLTFFlaskModel position={[1.5, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
