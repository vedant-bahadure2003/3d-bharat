import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random for deterministic results
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const MergerVisualization = ({ isDark = true }) => {
  const groupRef = useRef(null);
  const sphereRef = useRef(null);
  const ringsRef = useRef([]);
  const particlesRef = useRef(null);

  // Create converging particle streams
  const { positions, colors, velocities } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = [];

    // Three streams: Design, Field, Drone data
    const streams = [
      { angle: 0, color: isDark ? [0.2, 0.8, 0.9] : [0.9, 0.3, 0.2] },
      {
        angle: (Math.PI * 2) / 3,
        color: isDark ? [0.6, 0.3, 0.9] : [0.9, 0.5, 0.1],
      },
      {
        angle: (Math.PI * 4) / 3,
        color: isDark ? [0.3, 0.9, 0.5] : [0.2, 0.6, 0.4],
      },
    ];

    for (let i = 0; i < count; i++) {
      const streamIdx = i % 3;
      const stream = streams[streamIdx];
      const progress = (i / count) * 3;

      const x = Math.cos(stream.angle) * (3 - progress * 0.8);
      const y = (seededRandom(i * 1.5) - 0.5) * 2;
      const z = Math.sin(stream.angle) * (3 - progress * 0.8);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = stream.color[0];
      colors[i * 3 + 1] = stream.color[1];
      colors[i * 3 + 2] = stream.color[2];

      velocities.push({
        speed: 0.01 + seededRandom(i * 2.3) * 0.02,
        offset: seededRandom(i * 3.7) * Math.PI * 2,
        streamAngle: stream.angle,
      });
    }

    return { positions, colors, velocities };
  }, [isDark]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.getElapsedTime();

    // Rotate slowly
    groupRef.current.rotation.y = time * 0.15;

    // Pulse the center sphere
    if (sphereRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.1;
      sphereRef.current.scale.set(scale, scale, scale);
    }

    // Rotate rings
    ringsRef.current.forEach((ring, idx) => {
      if (ring) {
        ring.rotation.z = time * (0.3 + idx * 0.1) * (idx % 2 ? 1 : -1);
      }
    });

    // Animate particles flowing to center
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < 300; i++) {
        const v = velocities[i];
        const t = (time * v.speed + v.offset) % 1;
        const radius = 3 - t * 2.5;

        posArray[i * 3] = Math.cos(v.streamAngle + time * 0.2) * radius;
        posArray[i * 3 + 1] = Math.sin(time * 2 + i) * 0.3 * (1 - t);
        posArray[i * 3 + 2] = Math.sin(v.streamAngle + time * 0.2) * radius;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central merger sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color={isDark ? "#ffffff" : "#1f2937"}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color={isDark ? "#6366f1" : "#f97316"}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbiting rings */}
      {[0, 1, 2].map((idx) => (
        <mesh
          key={idx}
          ref={(el) => (ringsRef.current[idx] = el)}
          rotation={[Math.PI / 2 + idx * 0.3, idx * 0.5, 0]}
        >
          <ringGeometry args={[0.8 + idx * 0.3, 0.85 + idx * 0.3, 64]} />
          <meshBasicMaterial
            color={
              isDark
                ? idx === 0
                  ? "#22d3ee"
                  : idx === 1
                  ? "#a855f7"
                  : "#22c55e"
                : idx === 0
                ? "#dc2626"
                : idx === 1
                ? "#ea580c"
                : "#16a34a"
            }
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Converging particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={300}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Stream labels - represented as small spheres */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
        <mesh
          key={idx}
          position={[Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color={
              isDark
                ? idx === 0
                  ? "#22d3ee"
                  : idx === 1
                  ? "#a855f7"
                  : "#22c55e"
                : idx === 0
                ? "#dc2626"
                : idx === 1
                ? "#ea580c"
                : "#16a34a"
            }
          />
        </mesh>
      ))}
    </group>
  );
};

export default MergerVisualization;
