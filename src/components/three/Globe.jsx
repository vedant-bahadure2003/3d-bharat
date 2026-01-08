import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeGlobe from "three-globe";
import * as THREE from "three";

// GeoJSON for countries - we'll fetch this
const COUNTRIES_URL =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

// Indian cities data (constant, no need to recreate)
const INDIAN_CITIES = [
  { name: "New Delhi", lat: 28.6139, lng: 77.209, size: 0.8 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, size: 0.7 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, size: 0.5 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, size: 0.6 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, size: 0.6 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867, size: 0.5 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, size: 0.4 },
  { name: "Pune", lat: 18.5204, lng: 73.8567, size: 0.4 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, size: 0.4 },
];

// Configure globe with countries data - highlight India
const configureGlobe = (globe, countriesData) => {
  if (!globe || !countriesData) return;

  // Add polygons for all countries with India highlighted
  globe
    .polygonsData(
      countriesData.features.filter((d) => d.properties.ISO_A2 !== "AQ")
    )
    .polygonAltitude((d) => (d.properties.ADMIN === "India" ? 0.02 : 0.006))
    .polygonCapColor((d) =>
      d.properties.ADMIN === "India" ? "#ff6b35" : "rgba(100, 100, 100, 0.3)"
    )
    .polygonSideColor((d) =>
      d.properties.ADMIN === "India" ? "#ff8c5a" : "rgba(80, 80, 80, 0.2)"
    )
    .polygonStrokeColor((d) =>
      d.properties.ADMIN === "India" ? "#ffaa80" : "#444444"
    );

  globe
    .pointsData(INDIAN_CITIES)
    .pointAltitude(0.03)
    .pointColor(() => "#ffffff")
    .pointRadius("size")
    .pointResolution(12);

  globe
    .ringsData(INDIAN_CITIES)
    .ringColor(() => "#ff6b35")
    .ringMaxRadius(3)
    .ringPropagationSpeed(2)
    .ringRepeatPeriod(1500);

  const arcsData = INDIAN_CITIES.slice(1).map((city) => ({
    startLat: 28.6139,
    startLng: 77.209,
    endLat: city.lat,
    endLng: city.lng,
    color: ["#ff6b35", "#ffaa80"],
  }));

  globe
    .arcsData(arcsData)
    .arcColor("color")
    .arcAltitude(0.1)
    .arcStroke(0.5)
    .arcDashLength(0.5)
    .arcDashGap(0.2)
    .arcDashAnimateTime(2000);
};

const Globe = () => {
  const globeRef = useRef();
  const groupRef = useRef();

  // Create globe instance once with useMemo (safe for rendering)
  const globeInstance = useMemo(() => {
    const globe = new ThreeGlobe({ animateIn: false })
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor("#3a8ee6")
      .atmosphereAltitude(0.15);

    const globeMaterial = globe.globeMaterial();
    globeMaterial.bumpScale = 0.5;
    globeMaterial.emissive = new THREE.Color("#112244");
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.9;

    return globe;
  }, []);

  // Fetch countries data and configure globe
  useEffect(() => {
    let isMounted = true;

    fetch(COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          configureGlobe(globeInstance, data);
        }
      })
      .catch((err) => console.error("Error loading countries data:", err));

    return () => {
      isMounted = false;
      if (globeInstance) {
        globeInstance.clear();
      }
    };
  }, [globeInstance]);

  // Animation frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Initial rotation to show India
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -Math.PI * 0.43;
    }
  }, []);

  return (
    <group ref={groupRef} scale={[0.02, 0.02, 0.02]}>
      <primitive object={globeInstance} ref={globeRef} />

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[100, 50, 100]}
        intensity={1}
        color="#ffffff"
      />
      <directionalLight
        position={[-100, -50, -100]}
        intensity={0.3}
        color="#4a90d9"
      />
      <pointLight position={[200, 100, 200]} intensity={0.5} color="#ff6b35" />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={150}
        maxDistance={400}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
      />
    </group>
  );
};

export default Globe;
