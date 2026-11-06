import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, MousePointer, Square, Type, PenTool, Play } from 'lucide-react';
import { useLiveBuild } from './LiveBuildEngine.tsx';

export const BuildLayer: React.FC = () => {
  const {
    isBuilding,
    totalElements,
    builtCount,
    skipBuild,
    replayBuild,
    isCompleted,
    cursors,
    snapGuides,
    visitorHoverBox,
    buildPhase,
    circleCenter,
    circleRadius,
  } = useLiveBuild();

  // Real visitor cursor position
  const [visitorPos, setVisitorPos] = useState({ x: -100, y: -100 });
  const [isVisitorVisible, setIsVisitorVisible] = useState(false);
  const [isVisitorClicking, setIsVisitorClicking] = useState(false);

  useEffect(() => {
    // Touch detection - hide custom visitor pointer on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setVisitorPos({ x: e.clientX, y: e.clientY });
      if (!isVisitorVisible) setIsVisitorVisible(true);
    };

    const handleMouseDown = () => setIsVisitorClicking(true);
    const handleMouseUp = () => setIsVisitorClicking(false);
    const handleMouseLeave = () => setIsVisitorVisible(false);
    const handleMouseEnter = () => setIsVisitorVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisitorVisible]);

  const remaining = Math.max(0, totalElements - builtCount);
  const progressPercent = totalElements > 0 ? Math.min(100, Math.round((builtCount / totalElements) * 100)) : 100;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden select-none">
      {/* 1. Canvas Dot Grid (Figma style) - only shown while building */}
      {!isCompleted && isBuilding && (
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* 2. Pink Smart Alignment Snap Guides */}
      <AnimatePresence>
        {snapGuides && snapGuides.map((guide, idx) => (
          <React.Fragment key={idx}>
            {guide.x !== undefined && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 bottom-0 w-[1px] bg-[#FF3B81] pointer-events-none z-30"
                style={{ left: guide.x }}
              >
                {guide.label && (
                  <div className="absolute top-1/2 left-2 px-1.5 py-0.5 bg-[#FF3B81] text-white font-mono text-[9px] rounded-xs font-bold whitespace-nowrap shadow-md">
                    {guide.label}
                  </div>
                )}
              </motion.div>
            )}
            {guide.y !== undefined && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 right-0 h-[1px] bg-[#FF3B81] pointer-events-none z-30"
                style={{ top: guide.y }}
              />
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>

      {/* 3. Active Dragging Selection Frames for Each Building Cursor */}
      {cursors.map((c) => {
        if (!c.activeFrame) return null;
        const f = c.activeFrame;
        return (
          <div
            key={`frame-${c.id}`}
            className="fixed pointer-events-none z-30"
            style={{
              left: f.x,
              top: f.y,
              width: f.w,
              height: f.h,
              border: '1px solid #2F6BFF',
              boxShadow: '0 0 14px rgba(47, 107, 255, 0.4)',
              opacity: f.opacity,
            }}
          >
            {/* 4 Corner Square Handles */}
            <div className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />

            {/* 4 Edge-Midpoint Handles */}
            <div className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute top-1/2 -left-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute top-1/2 -right-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />

            {/* Size Badge at Top Left */}
            <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-[#2F6BFF] text-white font-mono text-[9px] font-bold rounded-xs shadow-md whitespace-nowrap leading-none select-none">
              {f.sizeText}
            </div>

            {/* Blue Name Tag under bottom-right (#2F6BFF) with white 10px text */}
            <div className="absolute -bottom-6 right-0 bg-[#2F6BFF] text-white font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-md whitespace-nowrap leading-none select-none">
              {f.tag}
            </div>
          </div>
        );
      })}

      {/* 4. Real Visitor Figma-style Hover Frame on Built Elements */}
      <AnimatePresence>
        {visitorHoverBox && (
          <motion.div
            key="visitor-hover-frame"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: visitorHoverBox.x,
              y: visitorHoverBox.y,
              width: visitorHoverBox.w,
              height: visitorHoverBox.h,
            }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.08 }}
            className="fixed top-0 left-0 pointer-events-none z-[9990] border border-[#2F6BFF] shadow-[0_0_12px_rgba(47,107,255,0.4)]"
          >
            {/* 4 Corner Square Handles */}
            <div className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />

            {/* 4 Edge-Midpoint Handles */}
            <div className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute top-1/2 -left-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute top-1/2 -right-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />

            {/* Blue Name Tag under bottom-right */}
            <div className="absolute -bottom-[22px] right-0 bg-[#2F6BFF] text-white font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-md whitespace-nowrap leading-none select-none">
              {visitorHoverBox.tag}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4.5. Circle Huddle Indicator at Webpage Start */}
      <AnimatePresence>
        {(buildPhase === 'circle' || buildPhase === 'spreading') && !isCompleted && (
          <motion.div
            key="circle-huddle-indicator"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: buildPhase === 'spreading' ? 0 : 1,
              scale: buildPhase === 'spreading' ? 1.4 : 1,
            }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed pointer-events-none z-30 flex items-center justify-center"
            style={{
              left: circleCenter.x,
              top: circleCenter.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Dashed Orbit Ring */}
            <svg
              className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none"
              style={{
                width: circleRadius * 2,
                height: circleRadius * 2,
                left: '50%',
                top: '50%',
              }}
            >
              <circle
                cx={circleRadius}
                cy={circleRadius}
                r={circleRadius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="1.5"
                strokeDasharray="5 7"
              />
              <circle
                cx={circleRadius}
                cy={circleRadius}
                r={circleRadius * 0.44}
                fill="rgba(225, 29, 46, 0.05)"
                stroke="rgba(225, 29, 46, 0.4)"
                strokeWidth="1"
              />
            </svg>

            {/* Center Label Pill */}
            <div className="flex flex-col items-center justify-center text-center select-none relative z-10">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#121214]/90 border border-white/20 rounded-full backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E] animate-ping" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-200 font-bold">
                  Live Canvas Sync
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400 mt-1 uppercase tracking-widest font-medium">
                5 Editors In Huddle
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. The 5 Ghost Cursors: Aria, Dev, Maya, Kai, Sam */}
      {!isCompleted && cursors.map((c) => (
        <div
          key={c.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.scale})`,
            willChange: 'transform',
          }}
        >
          <div className="relative">
            {/* SVG Arrow */}
            <div
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              style={{
                transform: `rotate(${c.rotation || 0}deg)`,
                transformOrigin: '2.75px 2.75px',
                transition: 'transform 0.1s ease-out',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                  fill={c.color}
                  stroke="#0A0A0B"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Name Chip */}
            <div
              className="absolute left-3.5 top-3.5 px-1.5 py-0.5 rounded-sm font-mono text-[10px] font-bold shadow-md border border-black/30 whitespace-nowrap flex items-center gap-1 select-none"
              style={{
                backgroundColor: c.color,
                color: c.name === 'Sam' ? '#000000' : '#FFFFFF',
              }}
            >
              <span>{c.name}</span>
            </div>

            {/* Action text pill */}
            {c.actionText && (
              <div className="absolute left-4 top-8 px-2 py-0.5 bg-[#0A0A0B]/95 border border-white/20 text-white font-mono text-[9px] rounded-sm whitespace-nowrap shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span>{c.actionText}</span>
              </div>
            )}

            {/* Click Ripple Effect */}
            {c.isClicking && (
              <div
                className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 animate-ping pointer-events-none"
                style={{ borderColor: c.color }}
              />
            )}
          </div>
        </div>
      ))}

      {/* 6. Real Visitor Cursor: Red Arrow + "You" */}
      {isVisitorVisible && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: visitorPos.x,
            top: visitorPos.y,
            transform: isVisitorClicking ? 'scale(0.88)' : 'scale(1)',
            transition: 'transform 0.1s ease',
          }}
        >
          <div className="relative">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_8px_rgba(225,29,46,0.6)]"
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill="#E11D2E"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute left-3.5 top-3.5 px-2 py-0.5 bg-[#E11D2E] text-white font-mono text-[10px] font-bold rounded shadow-[0_2px_8px_rgba(225,29,46,0.5)] border border-white/20 whitespace-nowrap flex items-center gap-1 select-none">
              <span>You</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. Floating Editor Toolbar (Center Bottom) */}
      <aside
        aria-label="Design Editor Toolbar"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto z-40 bg-[#121214]/90 backdrop-blur-xl border border-white/10 px-2.5 py-1.5 rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.8)] hidden sm:flex items-center gap-1 select-none"
      >
        <button
          type="button"
          title="Move Tool (V)"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/15 transition-colors"
        >
          <MousePointer className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          title="Frame Tool (F)"
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Square className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          title="Text Tool (T)"
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Type className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          title="Pen Tool (P)"
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <PenTool className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-4 bg-white/15 mx-1" />
        <button
          type="button"
          onClick={replayBuild}
          title="Replay Build Sequence (Present Mode)"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#E11D2E] hover:bg-[#E11D2E]/10 transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-[#E11D2E]" />
        </button>
      </aside>

      {/* 8. Bottom Build Progress Pill + Skip Button */}
      {!isCompleted && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 bg-[#121214]/95 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-3 font-mono text-xs text-white font-semibold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-ping" />
            <span>
              {buildPhase === 'circle'
                ? 'Syncing 5 editors in huddle…'
                : buildPhase === 'spreading'
                ? 'Editors spreading to layout…'
                : `Building… ${remaining} elements remaining`}
            </span>
            <span className="text-[#FF2D3F] font-bold">
              {buildPhase === 'circle' || buildPhase === 'spreading' ? '0%' : `${progressPercent}%`}
            </span>
          </div>

          <div className="w-24 sm:w-36 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E11D2E] via-[#FF2D3F] to-[#00E5FF] transition-all duration-300"
              style={{
                width: buildPhase === 'circle' || buildPhase === 'spreading' ? '8%' : `${progressPercent}%`,
              }}
            />
          </div>

          <div className="pointer-events-auto border-l border-white/10 pl-3">
            <button
              type="button"
              onClick={skipBuild}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-[#E11D2E] text-zinc-300 hover:text-white text-[11px] font-mono uppercase tracking-wider rounded-full transition-colors active:scale-95 cursor-pointer"
            >
              <span>Skip</span>
              <FastForward className="w-3 h-3" />
              <span className="text-zinc-500 hover:text-zinc-300 text-[9px]">[Esc]</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
