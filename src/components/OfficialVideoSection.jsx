import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from "lucide-react";

const OfficialVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const videoUrl = "https://3dbharat.com/storage/videos/3D_Bharat.mp4";

  // Auto-hide controls after 3 seconds of no interaction
  useEffect(() => {
    let timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  // Handle progress bar update
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress || 0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 dark:from-black dark:via-zinc-950 dark:to-black transition-colors duration-300"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 dark:from-red-500/10 dark:to-pink-500/10 blur-3xl"
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-500/20 dark:border-amber-500/30 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Official Presentation
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gray-800 dark:text-white">Discover </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
                3D Bharat
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience India's most advanced infrastructure monitoring platform through our official showcase video
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative group max-w-5xl mx-auto"
            onMouseEnter={() => setShowControls(true)}
            onMouseMove={() => setShowControls(true)}
          >
            {/* Glow Effect Behind Video */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Video Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50 border border-gray-200/50 dark:border-white/10 bg-black">
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-500/50 rounded-tl-2xl z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-orange-500/50 rounded-tr-2xl z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-orange-500/50 rounded-bl-2xl z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-red-500/50 rounded-br-2xl z-20 pointer-events-none" />

              {/* Video Element */}
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Play Button Overlay (when paused) */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePlay}
                        className="relative group/btn"
                      >
                        {/* Pulsing ring */}
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-ping opacity-30" />
                        {/* Button */}
                        <span className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-2xl shadow-orange-500/40">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Controls Overlay */}
                <AnimatePresence>
                  {showControls && isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col justify-end"
                    >
                      {/* Gradient overlay for controls visibility */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

                      {/* Controls Bar */}
                      <div className="relative z-10 px-4 pb-4">
                        {/* Progress Bar */}
                        <div
                          className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer group/progress overflow-hidden"
                          onClick={handleProgressClick}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full relative"
                            style={{ width: `${progress}%` }}
                          >
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
                          </motion.div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={togglePlay}
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                            >
                              {isPlaying ? (
                                <Pause className="w-5 h-5 text-white" />
                              ) : (
                                <Play className="w-5 h-5 text-white ml-0.5" />
                              )}
                            </button>
                            <button
                              onClick={toggleMute}
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                            >
                              {isMuted ? (
                                <VolumeX className="w-5 h-5 text-white" />
                              ) : (
                                <Volume2 className="w-5 h-5 text-white" />
                              )}
                            </button>
                          </div>

                          <button
                            onClick={toggleFullscreen}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                          >
                            <Maximize2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3D Bharat Branding */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                      3D BHARAT
                    </span>
                  </div>
                </div>

                {/* Official Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm shadow-lg">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Official Video
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Infrastructure Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">3D Visualization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Precision Measurement</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <video
              src={videoUrl}
              autoPlay
              loop
              playsInline
              controls
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfficialVideoSection;
