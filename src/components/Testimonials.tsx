import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioContent } from '../content.ts';

export const Testimonials: React.FC = () => {
  const { testimonials } = portfolioContent;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative py-28 bg-[#0A0A0B] border-b border-white/5 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E11D2E]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Label: 07 / WORDS */}
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            07 / DIRECTORS &amp; CLIENTS
          </span>
        </div>

        <div data-build="heading" className="text-center mb-14">
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight uppercase font-black text-white">
            TESTIMONIALS<span className="text-[#E11D2E]">.</span>
          </h2>
        </div>

        {/* Carousel Card Container */}
        <div data-build="card" className="relative bg-[#121214] border border-white/10 p-8 sm:p-14 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          {/* Subtle Quote Icon Watermark */}
          <Quote className="absolute top-6 left-6 w-16 h-16 text-white/5 pointer-events-none" />

          {/* Testimonial Content with smooth AnimatePresence transition */}
          <div className="min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between flex-grow"
              >
                {/* Quote Body */}
                <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide leading-tight text-white mb-8">
                  "{current.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    {current.avatarUrl && (
                      <img
                        src={current.avatarUrl}
                        alt={current.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#E11D2E]"
                      />
                    )}
                    <div>
                      <div className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-white">
                        {current.name}
                      </div>
                      <div className="font-mono text-xs text-zinc-400">
                        {current.role} <span className="text-[#E11D2E]">@</span> {current.company}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="hidden sm:flex text-[#E11D2E] text-xs gap-1">
                    {'★★★★★'}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: Prev / Next / Indicator Dots */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-[#E11D2E] shadow-[0_0_8px_#E11D2E]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
