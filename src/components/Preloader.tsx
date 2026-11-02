import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
  name?: string;
  role?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  name = "ALEX MERCER",
  role = "VIDEO EDITOR & VFX ARTIST"
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1400; // ~1.4 seconds cinematic load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 600); // Wait for curtain wipe transition
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A0A0B] text-white px-6"
        >
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#E11D2E]/10 blur-[120px] pointer-events-none" />

          {/* Center Brand Name & Frame */}
          <div className="relative z-10 flex flex-col items-center max-w-md w-full">
            {/* Top Film Slate Indicator */}
            <div className="flex items-center justify-between w-full mb-6 font-mono text-[10px] text-zinc-500 uppercase tracking-widest border-b border-white/10 pb-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-ping" />
                REC 00:01:24:08
              </span>
              <span>4K RAW • 24.00 FPS</span>
            </div>

            {/* Main Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-4xl sm:text-6xl tracking-wider text-center font-bold text-white mb-2"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#E11D2E] font-medium uppercase mb-8"
            >
              {role}
            </motion.p>

            {/* Red Linear Progress Bar */}
            <div className="w-full bg-zinc-900 border border-white/10 h-[3px] rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E11D2E] via-[#FF2D3F] to-[#E11D2E] shadow-[0_0_12px_#E11D2E]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Percentage & Status */}
            <div className="flex items-center justify-between w-full font-mono text-xs text-zinc-400">
              <span className="tracking-widest">INITIALIZING REEL</span>
              <span className="text-[#FF2D3F] font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
