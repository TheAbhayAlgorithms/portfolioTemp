import React from 'react';
import { portfolioContent } from '../content.ts';

export const Awards: React.FC = () => {
  const { awards } = portfolioContent;

  return (
    <section id="awards" className="relative py-28 bg-[#0A0A0B] border-b border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[#E11D2E]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 02 / RECOGNITION */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            02 / THE RECOGNITION
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading + Big Red "10" Laurel Badge */}
          <div className="lg:col-span-5 flex flex-col justify-between sticky top-28">
            <div data-build="heading">
              <h2 className="font-heading text-5xl sm:text-7xl lg:text-7xl tracking-tight uppercase font-black text-white leading-[0.92] mb-6">
                THE WORK. <br />
                <span className="text-[#E11D2E]">THE RECOGNITION.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-10 max-w-md font-normal">
                Film festival trophies, jury honors, and editorial accolades accumulated across a decade of cutting narrative and commercial projects.
              </p>
            </div>

            {/* Big Red "10" inside Laurel-leaf icons */}
            <div data-build="badge" className="max-w-sm">
              <div className="relative p-8 rounded-xl bg-[#121214] border border-white/10 w-full flex flex-col items-center justify-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                {/* Corner crosshairs */}
                <span className="absolute top-2 left-2 font-mono text-[10px] text-zinc-600">+</span>
                <span className="absolute top-2 right-2 font-mono text-[10px] text-zinc-600">+</span>
                <span className="absolute bottom-2 left-2 font-mono text-[10px] text-zinc-600">+</span>
                <span className="absolute bottom-2 right-2 font-mono text-[10px] text-[#E11D2E]">+</span>

                {/* Laurel Leaves SVG Illustration */}
                <div className="flex items-center justify-center gap-4 mb-2">
                  {/* Left Laurel */}
                  <svg className="w-12 h-20 text-[#E11D2E]/80" viewBox="0 0 50 100" fill="currentColor">
                    <path d="M45,95 C20,80 10,50 15,10 C18,25 28,38 35,45 C28,55 22,70 45,95 Z" opacity="0.4" />
                    <ellipse cx="28" cy="20" rx="6" ry="12" transform="rotate(-30 28 20)" />
                    <ellipse cx="20" cy="40" rx="6" ry="12" transform="rotate(-40 20 40)" />
                    <ellipse cx="18" cy="62" rx="6" ry="12" transform="rotate(-50 18 62)" />
                    <ellipse cx="25" cy="82" rx="5" ry="10" transform="rotate(-60 25 82)" />
                  </svg>

                  {/* Big Red "10" Number */}
                  <span className="font-heading text-7xl sm:text-8xl font-black text-[#E11D2E] tracking-tight leading-none drop-shadow-[0_0_25px_rgba(225,29,46,0.6)]">
                    10
                  </span>

                  {/* Right Laurel */}
                  <svg className="w-12 h-20 text-[#E11D2E]/80 transform -scale-x-100" viewBox="0 0 50 100" fill="currentColor">
                    <path d="M45,95 C20,80 10,50 15,10 C18,25 28,38 35,45 C28,55 22,70 45,95 Z" opacity="0.4" />
                    <ellipse cx="28" cy="20" rx="6" ry="12" transform="rotate(-30 28 20)" />
                    <ellipse cx="20" cy="40" rx="6" ry="12" transform="rotate(-40 20 40)" />
                    <ellipse cx="18" cy="62" rx="6" ry="12" transform="rotate(-50 18 62)" />
                    <ellipse cx="25" cy="82" rx="5" ry="10" transform="rotate(-60 25 82)" />
                  </svg>
                </div>

                <div className="font-mono text-xs uppercase tracking-[0.25em] text-white font-bold mb-1">
                  AWARDS &amp; HONORS
                </div>
                <div className="font-mono text-[11px] text-zinc-500 uppercase">
                  International &amp; Regional Laurels
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean List of 10 Awards */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {awards.map((award, index) => (
              <div
                key={award.id}
                data-build="repeated"
                className="group py-5 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.03] transition-all duration-300 relative"
              >
                {/* Left accent bar on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#E11D2E] transition-all duration-300 shadow-[0_0_10px_#E11D2E]" />

                {/* Award Title & Laurels */}
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-zinc-600 group-hover:text-[#E11D2E] transition-colors w-6">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </span>

                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-white group-hover:text-[#FF2D3F] transition-colors">
                      {award.title}
                    </h3>
                    <p className="font-mono text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {award.event}
                    </p>
                  </div>
                </div>

                {/* Right Badge & Year */}
                <div className="flex items-center justify-between sm:justify-end gap-4 ml-10 sm:ml-0">
                  {award.badge && (
                    <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 group-hover:border-[#E11D2E]/40 group-hover:text-white transition-colors">
                      {award.badge}
                    </span>
                  )}
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">
                    {award.year}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
