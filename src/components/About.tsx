import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Wrench } from 'lucide-react';
import { portfolioContent } from '../content.ts';

export const About: React.FC = () => {
  const { about, personal } = portfolioContent;

  return (
    <section id="about" className="relative py-28 bg-[#0A0A0B] border-b border-white/5 overflow-hidden">
      {/* Background Section Accent Light */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E11D2E]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 04 / ABOUT */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            04 / STORYTELLING &amp; CRAFT
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Section Heading: NOT JUST VISUALS. A WAY OF STORYTELLING. */}
        <div className="mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase font-black leading-[0.92]">
            <span className="text-white">{about.headingPart1} </span>
            <span className="text-[#E11D2E]">{about.headingPart2}</span>
          </h2>
        </div>

        {/* 3-Column Layout: Left (Skills), Center (Bio), Right (Tall Red Quote Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Education & Skills (Segmented skill meters) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#121214] border border-white/10 p-6 sm:p-8 rounded-sm">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E11D2E] font-bold">
                  // CORE COMPETENCIES
                </span>
                <span className="font-mono text-xs text-zinc-500">METER 0-100</span>
              </div>

              {/* Skill Meters */}
              <div className="space-y-5">
                {about.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-zinc-300 font-medium">{skill.name}</span>
                      <span className="text-[#FF2D3F] font-bold">{skill.percentage}%</span>
                    </div>

                    {/* Meter bar with segments */}
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden p-[1px] border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#E11D2E] to-[#FF2D3F] rounded-full shadow-[0_0_10px_#E11D2E]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Grid of Tools I Use */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 block mb-3 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-[#E11D2E]" /> HARDWARE &amp; NLE STACK
              </span>
              <div className="grid grid-cols-2 gap-2">
                {about.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-2 bg-white/5 border border-white/5 rounded text-left"
                  >
                    <div className="font-mono text-xs font-semibold text-white">{tool.name}</div>
                    <div className="font-mono text-[10px] text-zinc-500">{tool.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Bio Paragraphs & Narrative Background */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#121214] border border-white/10 p-6 sm:p-8 rounded-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 pb-3 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
                <span>DIRECTOR'S PERSPECTIVE</span>
              </div>

              {about.bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick credentials footer */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">DEGREE</span>
                <span className="text-white font-medium">B.Sc. Animation &amp; Multimedia</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">PIPELINE</span>
                <span className="text-[#FF2D3F] font-medium">ACES / OCIO &amp; Rec.709</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tall Red Quote Card */}
          <div className="lg:col-span-3 relative flex flex-col justify-between p-8 bg-gradient-to-b from-[#E11D2E] to-[#B01221] text-white rounded-sm shadow-[0_20px_45px_rgba(225,29,46,0.35)] overflow-hidden">
            {/* Background Giant Quote Watermark */}
            <Quote className="absolute -bottom-8 -right-8 w-44 h-44 text-black/15 pointer-events-none" />

            <div>
              {/* Quote Mark Icon */}
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-8 backdrop-blur-sm">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Quote Text */}
              <blockquote className="font-heading text-3xl sm:text-4xl uppercase leading-tight tracking-wide text-white mb-6">
                "{personal.quoteCard.quote}"
              </blockquote>
            </div>

            {/* Signature in Script Font */}
            <div className="pt-6 border-t border-white/20 relative z-10">
              <div className="font-script text-3xl sm:text-4xl text-white font-bold mb-1 -rotate-3">
                {personal.quoteCard.author}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/80">
                {personal.quoteCard.role}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
