import { useState, useRef, useEffect, memo, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Download,
  Monitor,
  HardDrive,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Play,
  ExternalLink,
  Shield,
  Box,
  Route,
  Landmark,
  Ruler,
  Info,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Floating 3D Geometric Shapes (CSS-only perf)
   ───────────────────────────────────────────── */
const FloatingShape = memo(({ size, x, y, delay, duration, shape, color }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{
      y: [0, -20, 0],
      rotateX: [0, 360],
      rotateY: [0, 180],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div
      className={`w-full h-full ${shape === "cube" ? "rounded-lg" : shape === "diamond" ? "rotate-45 rounded-sm" : "rounded-full"}`}
      style={{
        background: color,
        boxShadow: `0 0 40px ${color}`,
        opacity: 0.15,
        transformStyle: "preserve-3d",
      }}
    />
  </motion.div>
));
FloatingShape.displayName = "FloatingShape";

/* ─────────────────────────────────────────────
   Grid Background with subtle animation
   ───────────────────────────────────────────── */
const GridBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Radial glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(74,72,201,0.08) 0%, transparent 70%)",
      }}
    />
  </div>
));
GridBackground.displayName = "GridBackground";

/* ─────────────────────────────────────────────
   3D Tilt Card wrapper
   ───────────────────────────────────────────── */
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   HEADER SECTION
   ───────────────────────────────────────────── */
const DashboardHeader = memo(() => {
  const shapes = useMemo(
    () => [
      {
        size: 60,
        x: 10,
        y: 20,
        delay: 0,
        duration: 6,
        shape: "cube",
        color: "rgba(74,72,201,0.5)",
      },
      {
        size: 40,
        x: 80,
        y: 30,
        delay: 1,
        duration: 8,
        shape: "diamond",
        color: "rgba(59,130,246,0.5)",
      },
      {
        size: 50,
        x: 60,
        y: 70,
        delay: 2,
        duration: 7,
        shape: "sphere",
        color: "rgba(139,92,246,0.4)",
      },
      {
        size: 35,
        x: 25,
        y: 75,
        delay: 1.5,
        duration: 9,
        shape: "cube",
        color: "rgba(6,182,212,0.4)",
      },
      {
        size: 45,
        x: 90,
        y: 60,
        delay: 0.5,
        duration: 7.5,
        shape: "diamond",
        color: "rgba(74,72,201,0.3)",
      },
    ],
    [],
  );

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <GridBackground />
      {/* Floating shapes */}
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "linear-gradient(135deg, #4A48C9, #3b82f6)" }}
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-10 right-0 bottom-0"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)" }}
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300 tracking-wide">
              3D Bharat Software Suite
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-heading">
            Software{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo/40 via-blue-400 to-cyan-400">
              Dashboard
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Download specialized monitoring software for Road, Bridge &amp;
            Measurement projects. Read the system requirements below before
            installation.
          </p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-gray-500 mx-auto" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade — tall multi-stop for a smooth dissolve */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none dark:hidden"
        style={{
          background:
            "linear-gradient(to top, #f5f5f4 0%, rgba(245,245,244,0.85) 25%, rgba(245,245,244,0.5) 55%, rgba(245,245,244,0.15) 80%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none hidden dark:block"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 80%, transparent 100%)",
        }}
      />
    </section>
  );
});
DashboardHeader.displayName = "DashboardHeader";

/* ─────────────────────────────────────────────
   SYSTEM REQUIREMENTS / INSTRUCTIONS
   ───────────────────────────────────────────── */
const requirements = [
  {
    icon: Monitor,
    title: "Display",
    detail:
      "Minimum 1920×1080 resolution, dedicated GPU recommended (NVIDIA/AMD with 2GB+ VRAM)",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Cpu,
    title: "Processor",
    detail:
      "Intel i5 (8th Gen+) or AMD Ryzen 5 equivalent, 64-bit architecture required",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: HardDrive,
    title: "Storage & RAM",
    detail:
      "Minimum 8 GB RAM (16 GB recommended), 5 GB free disk space, SSD preferred",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Operating System",
    detail: "Windows 10/11 (64-bit). macOS and Linux support coming soon",
    color: "from-orange-500 to-amber-500",
  },
];

const instructions = [
  "Ensure your system meets all the minimum requirements listed above.",
  "Temporarily disable antivirus software during installation if prompted.",
  "Run the installer as Administrator for proper permissions.",
  "After installation, restart your computer before first launch.",
  "Keep a stable internet connection for license activation.",
  "For any issues, contact our support team via the Contact section.",
];

const InstructionsSection = memo(() => {
  const [expandedReq, setExpandedReq] = useState(null);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-stone-100 dark:bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading mb-4">
            Before You Download
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Review the system requirements and installation instructions to
            ensure a smooth setup.
          </p>
        </motion.div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {requirements.map((req, idx) => (
            <motion.div
              key={req.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <TiltCard>
                <div
                  className="group relative p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    setExpandedReq(expandedReq === idx ? null : idx)
                  }
                  style={{ perspective: "1000px" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${req.color} flex items-center justify-center shadow-lg`}
                    >
                      <req.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {req.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {req.detail}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1 ${expandedReq === idx ? "rotate-180" : ""}`}
                    />
                  </div>
                  {expandedReq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5"
                    >
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          Verified — Your experience will be optimal with these
                          specs.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Installation Instructions */}
        <motion.div
          className="relative p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Installation Instructions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instructions.map((inst, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-sm font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {inst}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
InstructionsSection.displayName = "InstructionsSection";

/* ─────────────────────────────────────────────
   SOFTWARE DOWNLOAD CARDS
   ───────────────────────────────────────────── */
const softwareItems = [
  {
    id: "road",
    title: "Road Monitoring",
    subtitle: "Construction & Maintenance",
    description:
      "Advanced 3D road monitoring software for tracking construction progress, pothole detection, road width & length analysis, and street infrastructure measurement.",
    icon: Route,
    gradient: "from-blue-600 to-cyan-500",
    glowColor: "rgba(59,130,246,0.15)",
    features: [
      "Pothole Detection",
      "Road Width & Length",
      "Street Light Measurement",
      "Progress Tracking",
    ],
    version: "v2.4.1",
    size: "285 MB",
    image: "/images/road-construction-monitoring.png",
  },
  {
    id: "bridge",
    title: "Bridge Monitoring",
    subtitle: "Structural Analysis",
    description:
      "Comprehensive bridge health monitoring with pillar measurements, span analysis, height/width tracking, and structural integrity assessment using 3D point clouds.",
    icon: Landmark,
    gradient: "from-violet-600 to-purple-500",
    glowColor: "rgba(139,92,246,0.15)",
    features: [
      "Height & Width Analysis",
      "Pillar Measurements",
      "Span Calculation",
      "Structural Reports",
    ],
    version: "v2.4.1",
    size: "310 MB",
    image: "/images/bridge.jpg",
  },
  {
    id: "measurement",
    title: "3D Measurement Suite",
    subtitle: "Universal Precision Tools",
    description:
      "All-in-one measurement toolkit for railways, roads, and bridges. Supports catenary measurements, platform analysis, OHE pole calculations, and volume computation.",
    icon: Ruler,
    gradient: "from-emerald-600 to-teal-500",
    glowColor: "rgba(16,185,129,0.15)",
    features: [
      "Railway Measurements",
      "Volume Computation",
      "Area Calculation",
      "Multi-structure Support",
    ],
    version: "v2.4.1",
    size: "340 MB",
    image: "/images/point-cloud-img.png",
  },
];

const SoftwareCard = memo(({ item, index }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Simulated download — replace with actual URL
    setTimeout(() => {
      setDownloading(false);
      alert(
        `Download link for "${item.title}" will be available soon. Stay tuned!`,
      );
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <TiltCard className="h-full">
        <div
          className="group relative h-full rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] overflow-hidden hover:border-gray-300 dark:hover:border-white/10 transition-all duration-500"
          style={{
            boxShadow: `0 0 0 0 ${item.glowColor}`,
            transition: "box-shadow 0.5s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = `0 20px 60px -10px ${item.glowColor}`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 0 0 ${item.glowColor}`)
          }
        >
          {/* Top gradient accent */}
          <div className={`h-1.5 bg-gradient-to-r ${item.gradient}`} />

          {/* Card image */}
          <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900/50">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent" />

            {/* Version badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium text-white">
              {item.version}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 tracking-wide uppercase">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.features.map((feat) => (
                <span
                  key={feat}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5"
                >
                  {feat}
                </span>
              ))}
            </div>

            {/* Download section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <HardDrive className="w-3.5 h-3.5" />
                <span>{item.size}</span>
              </div>
              <motion.button
                onClick={handleDownload}
                disabled={downloading}
                className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${item.gradient} shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-60`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {downloading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Preparing…
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
});
SoftwareCard.displayName = "SoftwareCard";

const SoftwareSection = memo(() => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-gray-950/50">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
          <Box className="w-4 h-4" />
          Available Software
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading mb-4">
          Choose Your Software
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Select and download the software tailored to your project type. Each
          tool is optimized for precision 3D monitoring.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {softwareItems.map((item, idx) => (
          <SoftwareCard key={item.id} item={item} index={idx} />
        ))}
      </div>
    </div>
  </section>
));
SoftwareSection.displayName = "SoftwareSection";

/* ─────────────────────────────────────────────
   VIDEO TUTORIALS SECTION
   ───────────────────────────────────────────── */
const tutorials = [
  {
    title: "Getting Started with Road Monitoring",
    description:
      "Learn how to set up your first road construction monitoring project using 3D point cloud data.",
    duration: "12:45",
    thumbnail: "/images/road-construction-monitoring.png",
    category: "Road",
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Bridge Structural Analysis Guide",
    description:
      "Complete walkthrough of bridge health monitoring features including pillar and span measurements.",
    duration: "18:30",
    thumbnail: "/images/bridge.jpg",
    category: "Bridge",
    color: "from-violet-600 to-purple-500",
  },
  {
    title: "3D Measurement Fundamentals",
    description:
      "Master the universal measurement toolkit — from railway catenary to volume computation and area analysis.",
    duration: "22:15",
    thumbnail: "/images/point-cloud-img.png",
    category: "Measurement",
    color: "from-emerald-600 to-teal-500",
  },
];

const VideoTutorialCard = memo(({ tutorial, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={tutorial.thumbnail}
            alt={tutorial.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

          {/* Play button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          >
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${tutorial.color} flex items-center justify-center shadow-2xl`}
            >
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          </motion.div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-medium text-white">
            {tutorial.duration}
          </div>

          {/* Category badge */}
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${tutorial.color} text-xs font-semibold text-white shadow-lg`}
          >
            {tutorial.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {tutorial.title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {tutorial.description}
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-500 dark:text-indigo-400 group-hover:gap-2.5 transition-all">
            Watch Tutorial <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});
VideoTutorialCard.displayName = "VideoTutorialCard";

const VideoTutorialsSection = memo(() => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-100 dark:bg-black">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
          <Play className="w-4 h-4" />
          Video Tutorials
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading mb-4">
          Learn How To Use
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Step-by-step video guides to help you get the most out of each
          software tool.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial, idx) => (
          <VideoTutorialCard
            key={tutorial.title}
            tutorial={tutorial}
            index={idx}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-gray-400">
          More tutorials coming soon.{" "}
          <a
            href="/#enquiry"
            className="text-indigo-500 hover:text-indigo-400 font-medium underline underline-offset-4"
          >
            Request a topic
          </a>
        </p>
      </motion.div>
    </div>
  </section>
));
VideoTutorialsSection.displayName = "VideoTutorialsSection";

/* ─────────────────────────────────────────────
   QUICK HELP BANNER
   ───────────────────────────────────────────── */
const HelpBanner = memo(() => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-gray-950/50">
    <motion.div
      className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="relative z-10 p-10 md:p-14 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Need Help Getting Started?
        </h3>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto">
          Our support team is ready to assist you with installation, setup, and
          training.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.a
            href="/#enquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-blue-50 transition-colors shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Info className="w-4 h-4" />
            Contact Support
          </motion.a>
          <motion.a
            href="/#about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  </section>
));
HelpBanner.displayName = "HelpBanner";

/* ─────────────────────────────────────────────
   MAIN DASHBOARD COMPONENT
   ───────────────────────────────────────────── */
const EducationDashboard = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-stone-100 dark:bg-black min-h-screen">
      <DashboardHeader />
      <InstructionsSection />
      <SoftwareSection />
      <VideoTutorialsSection />
      <HelpBanner />
    </div>
  );
};

export default EducationDashboard;
