import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuildSequence, GhostCursorName } from './BuildSequenceContext.tsx';
import { FastForward, Layers } from 'lucide-react';

export const BuildLayer: React.FC = () => {
  const {
    isBuilding,
    isCompleted,
    progress,
    ghostCursors,
    snapGuides,
    skipBuild,
  } = useBuildSequence();

  if (isCompleted || !isBuilding) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden select-none">
      {/* 1. Canvas Dot Grid (Figma style) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Top Figma Document Header Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 h-10 bg-[#121214]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 sm:px-6 pointer-events-auto z-50 text-xs font-mono"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white tracking-wider">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#2F6BFF] inline-block" />
            <span>ALEX_MERCER_PORTFOLIO.FIG</span>
          </div>
          <span className="text-zinc-600">/</span>
          <span className="text-[#00E5FF] hidden sm:inline flex items-center gap-1 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            LIVE MULTIPLAYER SESSION
          </span>
        </div>

        {/* Collaborators Avatar Stack */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5 items-center">
            {(['Aria', 'Dev', 'Maya', 'Kai', 'Sam'] as GhostCursorName[]).map((name) => {
              const c = ghostCursors[name];
              return (
                <div
                  key={name}
                  title={`${name} (Collaborator)`}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-black border border-[#121214] shadow-xs"
                  style={{ backgroundColor: c.color }}
                >
                  {name[0]}
                </div>
              );
            })}
          </div>
          <span className="text-zinc-400 text-[10px] hidden md:inline">5 designing</span>
        </div>
      </motion.div>

      {/* 3. Floating Mini Layers Panel (Top Left) */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -30, opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute top-14 left-4 w-44 bg-[#121214]/85 backdrop-blur-md border border-white/10 rounded-sm p-3 font-mono text-[11px] text-zinc-400 hidden lg:block shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      >
        <div className="flex items-center justify-between text-zinc-300 font-bold mb-2 pb-1.5 border-b border-white/5 uppercase text-[10px] tracking-wider">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#2F6BFF]" /> LAYERS
          </span>
          <span className="text-[#2F6BFF] text-[9px]">ACTIVE</span>
        </div>
        <div className="space-y-1.5">
          <div className={`flex items-center gap-1.5 ${progress >= 15 ? 'text-white' : 'text-zinc-600'}`}>
            <span>#</span> <span>Navbar_Header</span>
          </div>
          <div className={`flex items-center gap-1.5 ${progress >= 30 ? 'text-white' : 'text-zinc-600'}`}>
            <span>↳</span> <span>Hero_Headline</span>
          </div>
          <div className={`flex items-center gap-1.5 ${progress >= 45 ? 'text-white' : 'text-zinc-600'}`}>
            <span>↳</span> <span>Cutout_Portrait</span>
          </div>
          <div className={`flex items-center gap-1.5 ${progress >= 65 ? 'text-white' : 'text-zinc-600'}`}>
            <span>↳</span> <span>Selected_Works</span>
          </div>
          <div className={`flex items-center gap-1.5 ${progress >= 85 ? 'text-white' : 'text-zinc-600'}`}>
            <span>↳</span> <span>Recognition_Grid</span>
          </div>
        </div>
      </motion.div>

      {/* 4. Pink Smart Alignment Snap Guides */}
      <AnimatePresence>
        {snapGuides && (
          <>
            {snapGuides.x && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 bottom-0 w-[1px] bg-pink-500/80 pointer-events-none z-30"
                style={{ left: `${snapGuides.x}%` }}
              >
                {snapGuides.spacing && (
                  <div className="absolute top-1/2 left-2 px-1.5 py-0.5 bg-pink-500 text-white font-mono text-[9px] rounded-xs font-bold">
                    {snapGuides.spacing}
                  </div>
                )}
              </motion.div>
            )}
            {snapGuides.y && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 right-0 h-[1px] bg-pink-500/80 pointer-events-none z-30"
                style={{ top: `${snapGuides.y}%` }}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* 5. The 5 Ghost Cursors with Dynamic Organic Movement */}
      {(['Aria', 'Dev', 'Maya', 'Kai', 'Sam'] as GhostCursorName[]).map((name) => {
        const cursor = ghostCursors[name];
        if (!cursor.visible) return null;

        return (
          <motion.div
            key={name}
            className="absolute pointer-events-none z-40 transition-all duration-300"
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
            }}
          >
            <div className="relative">
              {/* SVG Arrow */}
              <motion.div
                animate={cursor.isClicking ? { scale: 0.82 } : { scale: 1 }}
                transition={{ duration: 0.12 }}
                className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                    fill={cursor.color}
                    stroke="#0A0A0B"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Name Chip */}
              <div
                className="absolute left-3.5 top-3.5 px-1.5 py-0.5 rounded-sm font-mono text-[10px] font-bold text-white shadow-md border border-black/30 whitespace-nowrap flex items-center gap-1 select-none"
                style={{ backgroundColor: cursor.color, color: name === 'Sam' ? '#000000' : '#FFFFFF' }}
              >
                <span>{name}</span>
              </div>

              {/* Action pill floating underneath */}
              {cursor.actionLabel && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-4 top-8 px-2 py-0.5 bg-[#0A0A0B]/90 border border-white/20 text-white font-mono text-[9px] rounded-sm whitespace-nowrap shadow-lg flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cursor.color }} />
                  <span>{cursor.actionLabel}</span>
                </motion.div>
              )}

              {/* Click Ripple Effect */}
              {cursor.isClicking && (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0.9 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 pointer-events-none"
                  style={{ borderColor: cursor.color }}
                />
              )}
            </div>
          </motion.div>
        );
      })}

      {/* 6. Bottom Build Progress Indicator */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-50 bg-[#121214]/90 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center gap-3 font-mono text-xs text-white font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-ping" />
          <span>BUILDING CANVAS IN REAL-TIME</span>
          <span className="text-[#FF2D3F] font-bold">{progress}%</span>
        </div>

        {/* Linear progress bar */}
        <div className="w-48 sm:w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#E11D2E] via-[#FF2D3F] to-[#00E5FF]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* 7. Bottom-Right "Skip intro ⏭" Button */}
      <div className="absolute bottom-6 right-6 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={skipBuild}
          className="group flex items-center gap-2 px-4 py-2 bg-[#121214]/90 hover:bg-[#E11D2E] border border-white/15 hover:border-[#FF2D3F] text-zinc-300 hover:text-white rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.7)] active:scale-95 cursor-pointer"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
