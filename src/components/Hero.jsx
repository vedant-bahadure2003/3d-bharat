import { useState, useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import PointCloudSphere from "./three/PointCloudSphere";
import { useTheme } from "../context/ThemeContext";

const videos = ["/video/header-video1.mp4", "/video/header-video2.mp4"];

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const rafRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Throttle mouse updates using requestAnimationFrame
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        });
        rafRef.current = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Handle video end - switch to next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  // Play the current video and pause the other
  useEffect(() => {
    if (currentVideoIndex === 0) {
      if (video1Ref.current) {
        video1Ref.current.currentTime = 0;
        video1Ref.current.play().catch(() => {});
      }
      if (video2Ref.current) {
        video2Ref.current.pause();
      }
    } else {
      if (video2Ref.current) {
        video2Ref.current.currentTime = 0;
        video2Ref.current.play().catch(() => {});
      }
      if (video1Ref.current) {
        video1Ref.current.pause();
      }
    }
  }, [currentVideoIndex]);

  // Preload video 2 on mount
  useEffect(() => {
    if (video2Ref.current) {
      video2Ref.current.load();
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-200 dark:bg-black transition-colors duration-300"
    >
      {/* Video Background - Dual video crossfade for smooth transitions */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* Video 1 */}
        <video
          ref={video1Ref}
          src={videos[0]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: currentVideoIndex === 0 ? 1 : 0 }}
        />
        {/* Video 2 */}
        <video
          ref={video2Ref}
          src={videos[1]}
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: currentVideoIndex === 1 ? 1 : 0 }}
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />
      </div>

      {/* Three.js Canvas - pointer-events-none allows scrolling through */}
      <div className="absolute inset-0 z-5 pointer-events-none mt-3">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }} 
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          {/* <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <PointCloudSphere mouse={mouse} isDark={isDark} />
          </Suspense> */}
        </Canvas>
      </div>

      {/* Gradient overlays - dark for video readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm">
            <span className="text-white text-sm font-medium tracking-wide">
              To Achieve
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Precise Work</span>
            <span className="block text-white drop-shadow-lg">
              Progress Monitoring
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide"
        >
          A unified digital platform for planning, measurement, execution, and
          periodic monitoring of all construction projects across India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#features"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Platform
          </motion.a>
          <motion.a
            href="#challenges"
            className="px-8 py-4 border border-white/50 text-white rounded-xl font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
