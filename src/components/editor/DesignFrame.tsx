import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBuildSequence } from './BuildSequenceContext.tsx';

export interface DesignFrameProps {
  children?: React.ReactNode;
  tag: 'Logo' | 'Image' | 'Heading' | 'Video' | 'Button' | 'Card' | 'Frame' | 'Slider' | 'Badge' | 'Timeline' | string;
  defaultVisible?: boolean;
  alwaysVisible?: boolean;
  className?: string;
  color?: string; // default #2F6BFF
  buildId?: string; // ID used by Live Build Sequence
  dimensions?: string; // e.g. "720 × 480"
}

export const DesignFrame: React.FC<DesignFrameProps> = ({
  children,
  tag,
  defaultVisible = false,
  alwaysVisible = false,
  className = '',
  color = '#2F6BFF',
  buildId,
  dimensions,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isBuilding, isCompleted, isElementBuilt } = useBuildSequence();

  const isBuilt = !buildId || isCompleted || isElementBuilt(buildId);

  // Frame is visible when hovering or if permanently set, or during its construction
  const isFrameVisible = (alwaysVisible || defaultVisible || isHovered) && isBuilt;

  return (
    <motion.div
      className={`relative group/frame ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-editor-tag={tag}
      data-build={buildId}
      initial={buildId && isBuilding && !isCompleted ? { opacity: 0, scale: 0.95 } : false}
      animate={
        isBuilt
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.95, pointerEvents: 'none' }
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}

      {/* 8-Handle Design Editor Selection Frame */}
      {isFrameVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
          style={{
            border: `1px solid ${color}`,
            boxShadow: `0 0 12px ${color}33`,
          }}
        >
          {/* 4 Corner Handles (6x6px white squares with 1px border) */}
          <div
            className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />
          <div
            className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />
          <div
            className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />
          <div
            className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />

          {/* 4 Edge-Midpoint Handles */}
          <div
            className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />
          <div
            className="absolute -bottom-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />
          <div
            className="absolute top-1/2 -left-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />
          <div
            className="absolute top-1/2 -right-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white rounded-[1px] shadow-xs"
            style={{ border: `1px solid ${color}` }}
          />

          {/* Dimension Badge at Top-Left */}
          {dimensions && (
            <div className="absolute -top-[21px] left-0 px-1.5 py-0.5 rounded-xs font-mono text-[9px] font-semibold text-[#2F6BFF] bg-[#0A0A0B]/95 border border-white/20 tracking-wider shadow-sm select-none pointer-events-none">
              <span>{dimensions}</span>
            </div>
          )}

          {/* Name Tag under bottom-right with 10px white text */}
          <div
            className="absolute -bottom-[21px] right-0 px-1.5 py-0.5 rounded-sm font-mono text-[10px] font-semibold text-white tracking-wider uppercase select-none shadow-sm whitespace-nowrap flex items-center gap-1 leading-none"
            style={{ backgroundColor: color }}
          >
            <span>{tag}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
