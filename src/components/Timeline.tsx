import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { portfolioContent } from '../content.ts';

export const Timeline: React.FC = () => {
  const { experience } = portfolioContent;
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll drawing effect for vertical red line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const playheadTop = useTransform(scaleY, [0, 1], ['0%', '100%']);

  return (
    <section id="timeline" ref={sectionRef} className="relative py-28 bg-[#0A0A0B] border-b border-white/5 overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E11D2E]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Label: 05 / CAREER PATH */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            05 / EXPERIENCE TIMELINE
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Section Heading */}
        <div data-build="heading" className="mb-20">
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase font-black text-white">
            CAREER &amp; MILESTONES<span className="text-[#E11D2E]">.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-3 font-normal">
            A decade of evolution across commercial agencies, boutique VFX facilities, independent cinema, and freelance direction.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Static Center Line (Desktop center, mobile left) */}
          <div data-build="line" className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-white/10" />

          {/* Animated Glowing Red Line that draws as you scroll */}
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] h-full origin-top bg-gradient-to-b from-[#E11D2E] via-[#FF2D3F] to-[#E11D2E] shadow-[0_0_12px_#E11D2E] z-10"
          />

          {/* Timeline Playhead: Video-Editor CTI with red triangle top handle following scroll */}
          <motion.div
            style={{ top: playheadTop }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 pointer-events-none z-30 flex flex-col items-center -translate-y-4"
          >
            {/* Timecode Badge above scrubber */}
            <div className="mb-0.5 px-2 py-0.5 bg-[#E11D2E] text-white font-mono text-[9px] font-bold tracking-widest rounded-sm shadow-[0_0_10px_rgba(225,29,46,0.6)] uppercase whitespace-nowrap flex items-center gap-1 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>00:02:14:08 • PLAYHEAD</span>
            </div>

            {/* Red Inverted Triangle Scrubber Head */}
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_6px_rgba(225,29,46,0.8)]"
            >
              <path d="M0 0H16L8 12L0 0Z" fill="#E11D2E" />
            </svg>
          </motion.div>

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Left Column (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12 md:text-left'}`}>
                    <div
                      data-build="repeated"
                      className="p-6 bg-[#121214] border border-white/10 hover:border-[#E11D2E]/40 transition-all rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.6)] group"
                    >
                      {/* Period Badge */}
                      <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="font-mono text-xs uppercase px-2.5 py-0.5 bg-[#E11D2E]/10 border border-[#E11D2E]/30 text-[#FF2D3F] font-bold">
                          {item.period}
                        </span>
                        <span className="font-mono text-[11px] text-zinc-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {item.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wide text-white group-hover:text-zinc-100 transition-colors">
                        {item.role}
                      </h3>
                      <div className="font-mono text-xs text-[#E11D2E] font-semibold uppercase tracking-wider mb-4">
                        {item.company}
                      </div>

                      {/* 2-Bullet Description */}
                      <ul className={`space-y-2 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            {!isEven && <span className="text-[#E11D2E] font-bold">›</span>}
                            <span>{bullet}</span>
                            {isEven && <span className="text-[#E11D2E] font-bold hidden md:inline">‹</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Node Marker (Red Glowing Dot) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A0A0B] border-2 border-white/20 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                    <div className="w-3 h-3 rounded-full bg-[#E11D2E] shadow-[0_0_10px_#FF2D3F]" />
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Layout */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'order-2 pl-12' : 'pr-12'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
