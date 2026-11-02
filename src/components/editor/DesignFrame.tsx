import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface DesignFrameProps {
  children?: React.ReactNode;
  tag: 'Logo' | 'Image' | 'Heading' | 'Video' | 'Button' | 'Card' | 'Frame' | 'Slider' | 'Badge' | 'Timeline' | string;
  defaultVisible?: boolean;
  alwaysVisible?: boolean;
  className?: string;
  color?: string; // default #2F6BFF
}

export const DesignFrame: React.FC<DesignFrameProps> = ({
  children,
  tag,
  defaultVisible = false,
  alwaysVisible = false,
  className = '',
  color = '#2F6BFF',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isVisible = alwaysVisible || defaultVisible || isHovered;

  return (
    <div
      className={`relative group/frame ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-editor-tag={tag}
    >
      {children}

      {/* 8-Handle Design Editor Selection Frame */}
      <motion.div
        initial={alwaysVisible || defaultVisible ? { opacity: 0, scale: 0.96 } : false}
        whileInView={alwaysVisible || defaultVisible ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true, margin: '-20px' }}
        animate={
          alwaysVisible || defaultVisible
            ? { opacity: 1, scale: 1 }
            : { opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.98 }
        }
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          border: `1px solid ${color}`,
          boxShadow: isVisible ? `0 0 12px ${color}33` : 'none',
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

        {/* Name Tag under bottom-right with 10px white text */}
        <div
          className="absolute -bottom-[21px] right-0 px-1.5 py-0.5 rounded-sm font-mono text-[10px] font-semibold text-white tracking-wider uppercase select-none shadow-sm whitespace-nowrap flex items-center gap-1 leading-none"
          style={{ backgroundColor: color }}
        >
          <span>{tag}</span>
        </div>
      </motion.div>
    </div>
  );
};

