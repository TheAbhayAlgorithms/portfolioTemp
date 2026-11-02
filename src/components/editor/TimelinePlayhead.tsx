import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface TimelinePlayheadProps {
  scrollYProgress: MotionValue<number>;
}

export const TimelinePlayhead: React.FC<TimelinePlayheadProps> = ({ scrollYProgress }) => {
  return (
    <motion.div
      className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 pointer-events-none z-30 flex flex-col items-center"
      style={{
        top: scrollYProgress, // Passed as dynamic percentage / transform
      }}
    >
      {/* Timecode Badge above scrubber */}
      <div className="mb-0.5 px-2 py-0.5 bg-[#E11D2E] text-white font-mono text-[9px] font-bold tracking-widest rounded-sm shadow-[0_0_10px_rgba(225,29,46,0.6)] uppercase whitespace-nowrap flex items-center gap-1 border border-white/20">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        <span>00:02:14:08 • CTI</span>
      </div>

      {/* Red Inverted Triangle Scrubber Head */}
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_6px_rgba(225,29,46,0.7)]"
      >
        <path d="M0 0H16L8 12L0 0Z" fill="#E11D2E" />
      </svg>
    </motion.div>
  );
};

