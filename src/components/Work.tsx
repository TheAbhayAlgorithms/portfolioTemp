import React, { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { portfolioContent, ProjectItem } from '../content.ts';

interface WorkProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  const { projects, clients } = portfolioContent;
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const filters = ['All', 'Frontend', 'AI / ML', 'Full Stack'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="relative py-28 bg-[#0A0A0B] border-b border-white/5">
      {/* Background Section Ambient Light */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#E11D2E]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 01 / WORK */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            01 / WORK THAT SPEAKS
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Section Heading & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div data-build="heading">
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase font-black text-white">
              WORK THAT SPEAKS<span className="text-[#E11D2E]">.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-3 font-normal">
              A curated selection of modern frontend web applications, machine learning systems, interactive UI experiments, and algorithmic tools.
            </p>
          </div>

          {/* Filter Pills */}
          <div data-build="repeated" className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-[#E11D2E] text-white border-[#FF2D3F] shadow-[0_0_15px_rgba(225,29,46,0.4)]'
                      : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento / Masonry Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            const isLarge = index === 0 || index === 3 || index === 6;
            const colSpan = isLarge ? 'lg:col-span-8' : 'lg:col-span-4';
            const isHovered = hoveredProjectId === project.id;

            return (
              <div
                key={project.id}
                data-build="repeated"
                className={`${colSpan} group relative bg-[#121214] border border-white/10 hover:border-[#E11D2E]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer rounded-sm hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(225,29,46,0.18)]`}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
              >
                {/* Thumbnail / Looping Video Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/60">
                  {/* Fallback Still Image */}
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isHovered && project.previewVideoUrl ? 'opacity-0' : 'opacity-100'
                    }`}
                    loading="lazy"
                  />

                  {/* Muted Looping Video Preview on Hover */}
                  {project.previewVideoUrl && (
                    <video
                      src={project.previewVideoUrl}
                      muted
                      loop
                      playsInline
                      autoPlay={isHovered}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
                      }`}
                    />
                  )}

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Left: Number Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#0A0A0B]/80 backdrop-blur-md px-3 py-1 border border-white/10 font-mono text-xs font-bold text-white">
                    <span className="text-[#E11D2E]">{project.number}</span>
                    <span className="text-zinc-500">/</span>
                    <span className="text-zinc-400">{project.category}</span>
                  </div>

                  {/* Top Right: Year & Duration */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-[#0A0A0B]/80 backdrop-blur-md px-2.5 py-1 border border-white/10 font-mono text-[11px] text-zinc-300">
                    <span>{project.year}</span>
                  </div>

                  {/* Center Hover Play Icon Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-[#E11D2E] text-white flex items-center justify-center shadow-[0_0_25px_#FF2D3F] transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 ml-1 fill-white" />
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="p-6 flex flex-col justify-between flex-grow border-t border-white/5">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-heading text-3xl sm:text-4xl uppercase tracking-wide text-white group-hover:text-zinc-100 transition-colors">
                        {project.title}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#E11D2E] text-zinc-400 group-hover:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Tools pill tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Red bottom accent border highlight */}
                <div className="h-[2px] w-0 group-hover:w-full bg-[#E11D2E] transition-all duration-500 shadow-[0_0_8px_#E11D2E]" />
              </div>
            );
          })}
        </div>

        {/* Client / Brand Logo Strip Marquee */}
        <div data-build="repeated" className="mt-24 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              TRUSTED BY DIRECTORS &amp; STUDIOS
            </span>
            <span className="font-mono text-xs text-[#E11D2E]">CLIENT ROSTER //</span>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            <div className="flex w-max animate-marquee-slow items-center whitespace-nowrap">
              {[...clients, ...clients, ...clients].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="mx-8 sm:mx-14 group flex flex-col items-center cursor-default select-none"
                >
                  <div className="flex flex-col items-center px-3 py-1">
                    <span className="font-heading text-3xl sm:text-5xl uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors duration-300">
                      {client.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 group-hover:text-[#E11D2E] transition-colors duration-300">
                      {client.tagline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
