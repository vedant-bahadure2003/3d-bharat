import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Construction, Landmark } from "lucide-react";
import Globe from "./three/Globe";

const About = () => {
  const useCases = [
    {
      icon: Construction,
      title: "Road Construction Monitoring",
      description:
        "Measure material filling, detect deviations, and track progress with precision point-cloud analysis.",
    },
    {
      icon: Landmark,
      title: "Bridge & Platform Measurement",
      description:
        "Accurate structural inspection and dimension tracking for infrastructure projects.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      id="about"
      className="section bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#111111]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 block"
            >
              About the Platform
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              What is <span className="text-gradient">3D Bharat</span>?
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-gray-400 leading-relaxed"
            >
              <p>
                3D Bharat transforms aerial drone imagery into precise{" "}
                <span className="text-white">.PLY point-cloud files</span>,
                enabling seamless 3D visualization directly in your browser.
              </p>
              <p>
                Our platform empowers engineers and project managers with
                powerful tools for{" "}
                <span className="text-white">progress monitoring</span>,
                including target setting, comparative analysis, and precise
                measurement capabilities.
              </p>
            </motion.div>

            {/* Features list */}
            <motion.ul variants={itemVariants} className="mt-8 space-y-3">
              {[
                "Convert drone photos to point-cloud format",
                "Interactive 3D browser visualization",
                "Progress tracking with target comparison",
                "Precise measurement tools",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  {feature}
                </li>
              ))}
            </motion.ul>

            {/* Use Case Cards */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid sm:grid-cols-2 gap-4"
            >
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  className="glass p-6 rounded-xl card-hover group"
                  whileHover={{ scale: 1.02 }}
                >
                  <useCase.icon className="w-8 h-8 text-gray-400 mb-4 group-hover:text-white transition-colors" />
                  <h3 className="font-semibold text-white mb-2 tracking-wide">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {useCase.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="h-[400px] md:h-[500px] lg:h-[600px] relative"
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <Globe />
              </Suspense>
            </Canvas>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
