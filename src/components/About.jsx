import { motion } from "framer-motion";
import { Construction, Landmark, Building2, Train } from "lucide-react";

const About = () => {
  const useCases = [
    {
      icon: Construction,
      title: "Road Construction",
      description:
        "Track earthwork, material filling, and surface progress with precision point-cloud analysis.",
    },
    {
      icon: Landmark,
      title: "Bridge & Flyovers",
      description:
        "Monitor structural progress, pier construction, and deck laying across all stages.",
    },
    {
      icon: Building2,
      title: "Building Projects",
      description:
        "Floor-by-floor progress tracking with accurate measurement and deviation detection.",
    },
    {
      icon: Train,
      title: "Railway Infrastructure",
      description:
        "Track laying, station construction, and platform development monitoring.",
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
      className="section bg-stone-100 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-200 dark:from-black via-stone-100 dark:via-[#0a0a0a] to-stone-50 dark:to-[#111111] transition-colors duration-300" />

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
              Our Approach
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              What is <span className="text-gradient">3D Bharat</span>?
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300"
            >
              <p>
                3D Bharat is a{" "}
                <span className="text-gray-900 dark:text-white font-medium transition-colors duration-300">
                  unified digital platform
                </span>{" "}
                designed for planning, measurement, execution, and periodic
                monitoring of all construction projects.
              </p>
              <p>
                By combining{" "}
                <span className="text-gray-900 dark:text-white font-medium transition-colors duration-300">
                  3D digital design, tablet-based field data, and drone imagery
                </span>
                , we provide a complete picture of project progress that
                traditional methods cannot match.
              </p>
            </motion.div>

            {/* Features list */}
            <motion.ul variants={itemVariants} className="mt-8 space-y-3">
              {[
                "Single reference point for all project data",
                "Same-day visibility of actual work progress",
                "Visual and independent confirmation via drones",
                "Role-based access for all stakeholders",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full transition-colors duration-300" />
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
                  className="glass-theme p-5 rounded-xl card-hover group"
                  whileHover={{ scale: 1.02 }}
                >
                  <useCase.icon className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 tracking-wide transition-colors duration-300 text-sm">
                    {useCase.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {useCase.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Construction Monitoring Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/40">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/road-construction-monitoring.png"
                  alt="Road Construction Monitoring - Engineer using tablet for real-time progress tracking"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-theme backdrop-blur-md bg-white/10 dark:bg-black/30 px-4 py-3 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-white text-sm font-medium">Live Progress Monitoring</span>
                    </div>
                    <p className="text-white/70 text-xs mt-1">Real-time construction tracking with tablet-based field data</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -right-4 top-8 glass-theme backdrop-blur-md bg-white/80 dark:bg-black/50 px-4 py-3 rounded-xl shadow-lg border border-white/20 dark:border-white/10"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy Rate</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -left-4 bottom-24 glass-theme backdrop-blur-md bg-white/80 dark:bg-black/50 px-4 py-3 rounded-xl shadow-lg border border-white/20 dark:border-white/10"
            >
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">24/7</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Monitoring</div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />
            <div className="absolute -z-10 top-0 right-0 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
