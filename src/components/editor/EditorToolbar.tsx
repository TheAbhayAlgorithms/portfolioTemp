import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MousePointer,
  Crop,
  Type,
  PenTool,
  Scissors,
  Hand,
  Play,
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  shortcut: string;
  icon: React.ReactNode;
}

export const EditorToolbar: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string>('select');

  const tools: ToolItem[] = [
    { id: 'select', name: 'Move / Select', shortcut: 'V', icon: <MousePointer className="w-3.5 h-3.5" /> },
    { id: 'frame', name: 'Frame / Artboard', shortcut: 'F', icon: <Crop className="w-3.5 h-3.5" /> },
    { id: 'text', name: 'Text Tool', shortcut: 'T', icon: <Type className="w-3.5 h-3.5" /> },
    { id: 'pen', name: 'Pen / Mask', shortcut: 'P', icon: <PenTool className="w-3.5 h-3.5" /> },
    { id: 'slice', name: 'Razor / Cut', shortcut: 'C', icon: <Scissors className="w-3.5 h-3.5" /> },
    { id: 'hand', name: 'Hand / Pan', shortcut: 'H', icon: <Hand className="w-3.5 h-3.5" /> },
  ];

  return (
    <motion.aside
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
      aria-label="Design Editor Toolbar"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none hidden sm:flex items-center gap-1 bg-[#121214]/90 backdrop-blur-xl border border-white/15 px-2.5 py-1.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
    >
      {/* Collaboration / Live Indicator */}
      <div className="flex items-center gap-1.5 pl-1.5 pr-2 border-r border-white/10 font-mono text-[10px] text-zinc-400">
        <span className="w-2 h-2 rounded-full bg-[#2F6BFF] shadow-[0_0_8px_#2F6BFF] animate-pulse" />
        <span className="hidden md:inline text-zinc-300 font-semibold">CANVAS</span>
      </div>

      {/* Tools Group */}
      <div className="flex items-center gap-0.5">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              title={`${tool.name} [${tool.shortcut}]`}
              className={`relative p-2 rounded-full transition-all duration-200 group flex items-center justify-center ${
                isActive
                  ? 'bg-[#2F6BFF] text-white shadow-[0_0_12px_rgba(47,107,255,0.5)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tool.icon}

              {/* Hover Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0A0A0B] border border-white/10 text-white font-mono text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {tool.name} <span className="text-[#2F6BFF]">[{tool.shortcut}]</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-[1px] h-4 bg-white/15 mx-1" />

      {/* Playhead / Preview Action */}
      <button
        onClick={() => {
          const reelEl = document.querySelector('#work');
          if (reelEl) reelEl.scrollIntoView({ behavior: 'smooth' });
        }}
        title="Play / Preview Reel [Space]"
        className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-[#E11D2E]/20 hover:border-[#E11D2E]/40 transition-colors flex items-center justify-center group relative"
      >
        <Play className="w-3.5 h-3.5 fill-current text-[#FF2D3F]" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0A0A0B] border border-white/10 text-white font-mono text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Preview Reel <span className="text-[#FF2D3F]">[Space]</span>
        </span>
      </button>

      {/* Frame Rate Indicator */}
      <div className="hidden lg:flex items-center gap-1.5 pl-2 pr-1 font-mono text-[10px] text-zinc-500 border-l border-white/10">
        <span className="text-zinc-400 font-semibold">4K</span>
        <span>•</span>
        <span className="text-[#2F6BFF]">24.0 FPS</span>
      </div>
    </motion.aside>
  );
};
