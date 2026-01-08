import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import {
  Layers,
  Box,
  Ruler,
  GitMerge,
  Calendar,
  Users,
  Tablet,
  Globe,
  BarChart3,
  Shield,
} from "lucide-react";
import DataFlow from "./three/DataFlow";
import MergerVisualization from "./three/MergerVisualization";
import { useTheme } from "../context/ThemeContext";

const Features = () => {
  const { isDark } = useTheme();

  const designLayers = [
    {
      icon: Layers,
      title: "Primary Frame Layer",
      description:
        "The main structural layout defining the core framework of your construction project.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Box,
      title: "Material Layer",
      description:
        "Detailed materials and construction components mapped to each structural element.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Ruler,
      title: "Measurement Layer",
      description:
        "Precise rules for quantity calculation and progress measurement standards.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const workflowFeatures = [
    {
      icon: Calendar,
      title: "Planning & Work Targets",
      description:
        "Chainage-wise work targets are defined with clear timelines. Contractors are assigned tasks, and drone monitoring is planned in advance.",
    },
    {
      icon: Tablet,
      title: "Tablet-Based Field Entry",
      description:
        "Engineers record work execution using tablets. fortnightly, monthly, or quarterly. Reports are generated automatically.",
    },
    {
      icon: Globe,
      title: "Web-Based Drone Upload",
      description:
        "Drone teams upload panoramic images and 3D point cloud data through a web interface, providing visual confirmation of progress.",
    },
    {
      icon: BarChart3,
      title: "Periodic Web Monitoring",
      description:
        "Authorities view targets versus progress, access dashboards on web or tablet, and monitor multiple projects without site visits.",
    },
    {
      icon: Users,
      title: "Multi-User Management",
      description:
        "Role-based access for all stakeholders ensures accurate measurement, clear planning, and daily accountability.",
    },
    {
      icon: Shield,
      title: "Data Security",
      description:
        "Enterprise-grade security with encrypted data transmission and secure storage for all project information.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="features"
      className="section bg-stone-50 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 dark:from-black via-stone-50 dark:via-[#0a0a0a] to-stone-100 dark:to-[#111111] transition-colors duration-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 block"
          >
            Design & Measurement Framework
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Three-Layer <span className="text-gradient">Digital Design</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
          >
            Every project begins with a structured 3D digital design that
            becomes the single reference point for planning, execution, and
            monitoring.
          </motion.p>
        </motion.div>

        {/* Design Framework - 3 Layers with 3D Visualization */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
          {/* Left - 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="h-[400px] md:h-[450px] relative order-2 lg:order-1"
          >
            <Canvas
              camera={{ position: [0, 2, 6], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <DataFlow isDark={isDark} />
              </Suspense>
            </Canvas>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-500/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Right - Layer Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6 order-1 lg:order-2"
          >
            {designLayers.map((layer, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-theme p-6 rounded-xl card-hover group relative overflow-hidden"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${layer.color}`}
                />
                <div className="flex items-start gap-4 pl-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-200/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gray-300/50 dark:group-hover:bg-white/10 transition-colors flex-shrink-0">
                    <layer.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 tracking-wide transition-colors duration-300">
                      {layer.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Merger Layer Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-4"
            >
              <GitMerge className="w-6 h-6 text-gray-500" />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Visualization
              </span>
            </motion.div>
            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              The <span className="text-gradient">Merger Layer</span>
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 transition-colors duration-300"
            >
              Multiple Design layers are merged into a single visual view,
              making project status easy to understand at a glance.
            </motion.p>
            <motion.ul variants={itemVariants} className="space-y-3">
              {[
                "Real-time data synchronization",
                "Unified visual dashboard",
                "Cross-reference verification",
                "Automated discrepancy detection",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right - 3D Merger Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="h-[400px] md:h-[450px] relative"
          >
            <Canvas
              camera={{ position: [0, 1, 5], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <MergerVisualization isDark={isDark} />
              </Suspense>
            </Canvas>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Workflow Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 block"
          >
            Complete Workflow
          </motion.span>
          <motion.h3
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
          >
            End-to-End <span className="text-gradient">Project Management</span>
          </motion.h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workflowFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-theme p-8 rounded-2xl card-hover group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 h-14 mb-6 rounded-xl bg-gray-200/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gray-300/50 dark:group-hover:bg-white/10 transition-colors">
                <feature.icon className="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 tracking-wide transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
