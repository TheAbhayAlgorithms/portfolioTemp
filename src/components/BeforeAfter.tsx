import React, { useState, useRef, useCallback } from 'react';
import { Sliders } from 'lucide-react';
import { portfolioContent } from '../content.ts';

export const BeforeAfter: React.FC = () => {
  const { beforeAfterComparisons, processSteps } = portfolioContent;
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeComparison = beforeAfterComparisons[activeTabIdx];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="relative py-28 bg-[#0A0A0B] border-b border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E11D2E]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 03 / BEFORE & AFTER */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            03 / CONCEPT TO CODE
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Section Heading & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div data-build="heading">
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase font-black text-white">
              FROM CONCEPT<span className="text-[#E11D2E]">.</span> TO CODE<span className="text-[#E11D2E]">.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-2 font-normal">
              Slide to explore the engineering craft: wireframes to reactive UI, raw sensor inputs to real-time AI computer vision models.
            </p>
          </div>

          {/* Switchable Tabs (3 Examples) */}
          <div data-build="repeated" className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121214] border border-white/10 rounded-sm">
            {beforeAfterComparisons.map((item, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTabIdx(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#E11D2E] text-white shadow-[0_0_15px_rgba(225,29,46,0.4)] font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{item.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content: Interactive Slider + Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Before / After Comparison Slider */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div
              data-build="card"
              className="w-full"
            >
              <div
                ref={containerRef}
                onMouseDown={(e) => {
                  setIsDragging(true);
                  handleMove(e.clientX);
                }}
                onMouseUp={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-[16/9] bg-black rounded-sm overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
                {/* FINAL Image (Full width background) */}
                <img
                  src={activeComparison.finalImage}
                  alt="Final graded VFX frame"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                />

                {/* RAW Image (Clipped from left using sliderPosition %) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeComparison.rawImage}
                    alt="Raw unedited cinema frame"
                    className="absolute inset-0 w-full h-full object-cover max-w-none select-none pointer-events-none"
                    style={{
                      width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      height: '100%'
                    }}
                    loading="lazy"
                  />

                  {/* RAW Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1 border border-white/15 font-mono text-xs font-bold text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-zinc-400" />
                    <span>{activeComparison.rawLabel}</span>
                  </div>
                </div>

                {/* FINAL Badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#0A0A0B]/85 backdrop-blur-md px-3 py-1 border border-[#E11D2E]/40 font-mono text-xs font-bold text-white shadow-[0_0_15px_rgba(225,29,46,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-pulse" />
                  <span className="text-[#FF2D3F]">{activeComparison.finalLabel}</span>
                </div>

                {/* Vertical Divider Line with Glow */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_#E11D2E] z-30"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Center Drag Handle Bubble */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E11D2E] text-white flex items-center justify-center border-2 border-white shadow-[0_0_20px_#FF2D3F]">
                    <div className="flex items-center gap-1 font-mono text-xs font-black select-none">
                      <span>‹</span>
                      <span>›</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Instructions Prompt */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 font-mono text-[11px] text-zinc-400 flex items-center gap-2">
                  <span>◀ DRAG TO COMPARE ▶</span>
                </div>
              </div>
            </div>

            {/* Technical Metadata Specs Strip */}
            <div data-build="card" className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#121214] p-4 border border-white/10 rounded-sm font-mono text-xs">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">TECH STACK</span>
                <span className="text-white font-medium">{activeComparison.specs.camera}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">RUNTIME ENGINE</span>
                <span className="text-white font-medium">{activeComparison.specs.codec}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">UI &amp; SHADERS</span>
                <span className="text-[#FF2D3F] font-medium">{activeComparison.specs.colorSpace}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">PERFORMANCE</span>
                <span className="text-white font-medium">{activeComparison.specs.resolution}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Process Paragraph & 4-Step Mini Process List */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-heading text-3xl uppercase tracking-wide text-white mb-3">
                {activeComparison.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                {activeComparison.description}
              </p>
            </div>

            {/* 4-Step Mini Process List */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E11D2E] font-bold block">
                // 4-STAGE ARCHITECTURE PIPELINE
              </span>

              <div className="space-y-3">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    data-build="repeated"
                    className="p-4 bg-[#121214] border border-white/10 hover:border-white/20 transition-all rounded-sm"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs font-bold text-[#E11D2E]">
                        {step.step}
                      </span>
                      <span className="font-mono text-xs uppercase font-semibold text-white tracking-wider">
                        {step.name}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-normal pl-7">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
