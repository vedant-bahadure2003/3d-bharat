import { motion } from "framer-motion";
import { AlertTriangle, FileX, Eye, Puzzle } from "lucide-react";

const Challenges = () => {
  const challenges = [
    {
      icon: AlertTriangle,
      title: "Scattered Information",
      description:
        "Project data spread across multiple sources makes tracking daily work progress difficult and time-consuming.",
    },
    {
      icon: FileX,
      title: "Delayed Decision-Making",
      description:
        "Without real-time visibility, critical decisions are often delayed, impacting project timelines and budgets.",
    },
    {
      icon: Eye,
      title: "Limited Visibility",
      description:
        "Site visits and paper reports provide incomplete snapshots, missing crucial details for comprehensive monitoring.",
    },
    {
      icon: Puzzle,
      title: "Fragmented Tools",
      description:
        "Relying on isolated digital tools doesn't provide a complete or reliable picture of actual progress.",
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
      id="challenges"
      className="section bg-stone-200 dark:bg-black relative overflow-hidden transition-colors duration-300"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Present Challenges
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            The Problem with{" "}
            <span className="text-gradient">Traditional Monitoring</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
          >
            Across construction projects of all types, it is difficult to track
            work progress clearly and on time. Information is scattered, and
            decision-making is delayed.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-theme p-8 rounded-2xl card-hover group text-center"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-red-100/50 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-200/50 dark:group-hover:bg-red-500/20 transition-colors">
                <challenge.icon className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 tracking-wide transition-colors duration-300">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Transition text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto italic transition-colors duration-300"
          >
            "Relying only on site visits, paper reports, or isolated digital
            tools does not provide a complete or reliable picture of progress."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Challenges;
