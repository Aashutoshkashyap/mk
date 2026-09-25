import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardHat } from "lucide-react";

interface SmoothPreloaderProps {
  onComplete?: () => void;
}

const SmoothPreloader = ({ onComplete }: SmoothPreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    const hasLoaded = sessionStorage.getItem("mk_preloader_shown");
    if (hasLoaded) {
      setIsLoaded(true);
      if (onComplete) onComplete();
      return;
    }

    const duration = 1200; // 1.2s smooth reveal
    const interval = 20; // 50 updates per second
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            sessionStorage.setItem("mk_preloader_shown", "true");
            if (onComplete) onComplete();
          }, 250);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -25,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 text-white select-none pointer-events-auto"
        >
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 rounded-full bg-primary/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Logo Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-red-700 text-white flex items-center justify-center font-black text-2xl shadow-2xl shadow-primary/40 border border-white/20 mb-6"
            >
              MK
            </motion.div>

            {/* Brand Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-xl font-extrabold tracking-tight text-white"
            >
              MK Engineering & Construction
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1"
            >
              Engineering Nepal's Infrastructure
            </motion.p>

            {/* Smooth Progress Bar & Percentage Counter */}
            <div className="w-64 mt-8">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                  <HardHat size={13} className="text-primary" /> Loading Assets
                </span>
                <span className="text-primary">{Math.round(progress)}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-red-600 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 mt-5">
              Class-A Licensed Contractor · Government of Nepal
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmoothPreloader;
