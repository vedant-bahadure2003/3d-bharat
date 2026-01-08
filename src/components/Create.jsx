import { motion } from "framer-motion";
import { Upload, RefreshCw, Eye, Target } from "lucide-react";

const Create = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload Drone Images",
      description:
        "Import high-resolution aerial photographs captured by drones.",
    },
    {
      icon: RefreshCw,
      title: "Convert to .PLY",
      description: "Process images into precise point-cloud data format.",
    },
    {
      icon: Eye,
      title: "Visualize Point Cloud",
      description:
        "Explore 3D models directly in your browser with full interactivity.",
    },
    {
      icon: Target,
      title: "Track Progress",
      description: "Set targets, compare timelines, and measure deviations.",
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="create"
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      {/* Fixed background with parallax effect */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 block"
          >
            Build Your Own
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Create.</span>{" "}
            <span className="text-gray-400">Visualize.</span>{" "}
            <span className="text-gray-600">Monitor.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Transform your drone imagery into powerful 3D insights. Our platform
            gives you complete control over your point-cloud pipeline.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-8 rounded-2xl card-hover group text-center"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <feature.icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#enquiry"
            variants={itemVariants}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building
          </motion.a>
          <motion.a
            href="#about"
            variants={itemVariants}
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Sample Project
          </motion.a>
        </motion.div>

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 grid grid-cols-6 gap-px">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-r border-white/10" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
