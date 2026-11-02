import React from 'react';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { portfolioContent } from '../content.ts';
import { MagneticButton } from './MagneticButton.tsx';
import { useLiveBuild } from './editor/LiveBuildEngine.tsx';

export const Footer: React.FC = () => {
  const { personal } = portfolioContent;
  const { replayBuild } = useLiveBuild();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#0A0A0B] pt-20 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between">
        
        {/* Top Row: Navigation shortcuts & Back to Top & Replay Build */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div data-build="text" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-black text-white tracking-widest">
              {personal.name.toUpperCase()}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D2E] shadow-[0_0_8px_#FF2D3F]" />
          </div>

          <div className="flex items-center gap-3">
            {/* Replay Live Build Sequence Button */}
            <div data-build="button">
              <button
                type="button"
                onClick={replayBuild}
                title="Watch the live Figma-style collaborative build sequence again"
                className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-[#2F6BFF]/20 border border-white/10 hover:border-[#2F6BFF] text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all rounded-sm cursor-pointer shadow-xs active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#2F6BFF] transition-transform duration-500 group-hover:-rotate-180" />
                <span>REPLAY BUILD</span>
              </button>
            </div>

            <div data-build="button">
              <MagneticButton onClick={scrollToTop}>
                <button
                  type="button"
                  className="group flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E11D2E]/40 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all rounded-sm cursor-pointer"
                >
                  <span>BACK TO TOP</span>
                  <ArrowUp className="w-4 h-4 text-[#E11D2E] transition-transform duration-300 group-hover:-translate-y-1" />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Center Giant Outlined Name Typography */}
        <div data-build="big-text" className="py-12 select-none overflow-hidden text-center">
          <h2 className="font-heading text-[14vw] leading-none uppercase tracking-tight text-stroke-white opacity-20 hover:opacity-30 transition-opacity">
            {personal.name}
          </h2>
        </div>

        {/* Bottom Row: Copyright, Available status, and Credit line */}
        <div data-build="text" className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {personal.name}. All cinematic &amp; visual rights reserved.
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
            <span>EDITORIAL • VFX • COLOR GRADING SUITE</span>
          </div>

          <div className="text-zinc-600">
            Crafted for high-end cinematic vision.
          </div>
        </div>

      </div>
    </footer>
  );
};
