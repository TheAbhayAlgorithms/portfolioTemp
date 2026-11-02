import React from 'react';
import { Film, Sparkles, Palette, Layers, ArrowUpRight, Code2, Brain } from 'lucide-react';
import { portfolioContent } from '../content.ts';

export const Services: React.FC = () => {
  const { services } = portfolioContent;

  const iconMap: { [key: string]: React.ReactNode } = {
    Code2: <Code2 className="w-8 h-8 text-[#E11D2E]" />,
    Brain: <Brain className="w-8 h-8 text-[#E11D2E]" />,
    Sparkles: <Sparkles className="w-8 h-8 text-[#E11D2E]" />,
    Layers: <Layers className="w-8 h-8 text-[#E11D2E]" />,
    Film: <Film className="w-8 h-8 text-[#E11D2E]" />,
    Palette: <Palette className="w-8 h-8 text-[#E11D2E]" />,
  };

  return (
    <section id="services" className="relative py-28 bg-[#0A0A0B] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 06 / SERVICES */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            06 / CAPABILITIES
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div data-build="heading">
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase font-black text-white">
              WHAT I BRING<span className="text-[#E11D2E]">.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-2 font-normal">
              Technical capabilities spanning modern frontend architectures, intelligent machine learning workflows, and interactive interfaces.
            </p>
          </div>
        </div>

        {/* Row of 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              data-build="repeated"
              className="group relative bg-[#121214] border border-white/10 hover:border-[#E11D2E]/60 p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(225,29,46,0.2)]"
            >
              {/* Corner crosshair */}
              <span className="absolute top-2 right-2 font-mono text-[10px] text-zinc-600 group-hover:text-[#E11D2E] transition-colors">+</span>

              <div>
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded bg-white/5 group-hover:bg-[#E11D2E]/10 border border-white/10 group-hover:border-[#E11D2E]/30 flex items-center justify-center transition-colors">
                    {iconMap[service.icon] || <Film className="w-8 h-8 text-[#E11D2E]" />}
                  </div>
                  <span className="font-mono text-sm font-bold text-zinc-600 group-hover:text-[#FF2D3F] transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wide text-white group-hover:text-zinc-100 transition-colors mb-3">
                  {service.title}
                </h3>

                {/* One line / Short description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {service.shortDesc}
                </p>
              </div>

              {/* Bottom Arrow Indicator */}
              <div className="pt-8 flex items-center justify-between border-t border-white/5 mt-6 font-mono text-[11px] text-zinc-500 group-hover:text-white transition-colors">
                <span>INQUIRE SERVICE</span>
                <ArrowUpRight className="w-4 h-4 text-[#E11D2E] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
