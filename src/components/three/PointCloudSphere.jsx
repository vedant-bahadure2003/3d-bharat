import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random number generator for consistent results
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Pre-calculate particle data outside component
const PARTICLE_COUNT = 2000;
const RADIUS = 2.5;

const createParticleData = () => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
    const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
    const noiseRadius = RADIUS + (seededRandom(i * 1.5) - 0.5) * 0.5;

    positions[i * 3] = noiseRadius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = noiseRadius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = noiseRadius * Math.cos(phi);

    const brightness = 0.5 + seededRandom(i * 2.7) * 0.5;
    colors[i * 3] = brightness;
    colors[i * 3 + 1] = brightness;
    colors[i * 3 + 2] = brightness;
  }

  const linePositions = [];
  const connectionDistance = 0.8;

  for (let i = 0; i < PARTICLE_COUNT; i += 10) {
    for (let j = i + 1; j < Math.min(i + 50, PARTICLE_COUNT); j += 5) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < connectionDistance) {
        linePositions.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }
  }

  return { positions, colors, linePositions: new Float32Array(linePositions) };
};

// Create data once at module level
const particleData = createParticleData();

const PointCloudSphere = ({ mouse }) => {
  const groupRef = useRef();
  const { gl } = useThree();

  // Force WebGL context to be active
  useEffect(() => {
    gl.setAnimationLoop(() => {});
    return () => gl.setAnimationLoop(null);
  }, [gl]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const targetRotationX = (mouse?.y || 0) * 0.3;
    const targetRotationY = (mouse?.x || 0) * 0.3;

    groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotationY + time * 0.1 - groupRef.current.rotation.y) * 0.05;

    const scale = 1 + Math.sin(time * 0.5) * 0.03;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {/* Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={particleData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={particleData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.linePositions.length / 3}
            array={particleData.linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default PointCloudSphere;
