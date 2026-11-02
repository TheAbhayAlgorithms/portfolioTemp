import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Download, Film, Sparkles } from 'lucide-react';
import { portfolioContent } from '../content.ts';
import { MagneticButton } from './MagneticButton.tsx';
import { DesignFrame } from './editor/DesignFrame.tsx';
import { TextCaret } from './editor/TextCaret.tsx';
import { useBuildSequence } from './editor/BuildSequenceContext.tsx';

export const Hero: React.FC = () => {
  const { personal, softwareTicker } = portfolioContent;
  const heroRef = useRef<HTMLDivElement>(null);
  const { isElementBuilt, isBuilding, isCompleted } = useBuildSequence();

  // Mouse Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const portraitX = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);
  const portraitY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const glowX = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const glowY = useTransform(smoothMouseY, [-0.5, 0.5], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  // Animated Counter hook
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      personal.stats.forEach((stat, index) => {
        let current = 0;
        const target = stat.value;
        const step = Math.max(1, Math.floor(target / 40));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setCounts((prev) => ({ ...prev, [index.toString()]: current }));
        }, 35);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [personal.stats]);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#0A0A0B] border-b border-white/5 cinematic-grid"
    >
      {/* Background Ambience: Subtle Red Radial Glow behind subject */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#E11D2E]/25 via-[#FF2D3F]/15 to-transparent blur-[140px] pointer-events-none"
      />

      {/* Crosshair accents on corners */}
      <div className="absolute top-28 left-8 font-mono text-[10px] text-zinc-600 tracking-widest hidden md:block">
        + LOC 34.0522° N // 118.2437° W
      </div>
      <div className="absolute top-28 right-8 font-mono text-[10px] text-zinc-600 tracking-widest hidden md:block">
        PROD_REEL // V.2025.10 +
      </div>

      {/* HUGE OUTLINED BACKGROUND TEXT "PORTFOLIO" spanning width */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 transition-all duration-700 ${
          isBuilding && !isCompleted && !isElementBuilt('hero-bg-text') ? 'opacity-5 scale-90' : 'opacity-20 scale-100'
        }`}
      >
        <h2 className="font-heading text-[18vw] leading-none uppercase tracking-tighter text-stroke-white whitespace-nowrap">
          PORTFOLIO
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
          
          {/* Left Column: Greeting, Big Name, Role Tags, Intro, Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center z-20">
            {/* Script Text "Hello, I'm" in red Caveat font */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-3 mb-2 transition-all duration-500 ${
                isBuilding && !isCompleted && !isElementBuilt('hero-greeting') ? 'opacity-30 -translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            >
              <span className="font-script text-3xl sm:text-4xl text-[#FF2D3F] -rotate-2 inline-block">
                Hello, I'm
              </span>
              <span className="h-[1px] w-12 bg-[#E11D2E]/40" />
            </motion.div>

            {/* Huge Name in Big White Caps with Mask Reveal and Design Editor Selection Frame */}
            <div className="overflow-hidden mb-4">
              <DesignFrame tag="Heading" defaultVisible={true} buildId="hero-name" dimensions="840 × 120">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.88] uppercase tracking-tight font-black text-white"
                >
                  {personal.name.split(' ')[0]} <br className="hidden sm:block" />
                  <span className="text-zinc-100 hover:text-white transition-colors">
                    {personal.name.split(' ').slice(1).join(' ')}
                  </span>
                  <span className="text-[#E11D2E] inline-block ml-1">.</span>
                </motion.h1>
              </DesignFrame>
            </div>

            {/* Role Tags: EDITOR & VFX ARTIST */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex flex-wrap items-center gap-3 mb-6 transition-all duration-500 ${
                isBuilding && !isCompleted && !isElementBuilt('hero-tags') ? 'opacity-30 -translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-white font-mono text-xs sm:text-sm uppercase tracking-widest">
                <Film className="w-3.5 h-3.5 text-[#E11D2E]" />
                <span>VIDEO EDITOR</span>
              </div>
              <span className="text-zinc-600 font-mono">✕</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E11D2E]/10 border border-[#E11D2E]/30 text-[#FF2D3F] font-mono text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(225,29,46,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2D3F]" />
                <span>VFX ARTIST</span>
              </div>
            </motion.div>

            {/* Short 2-line Intro with live text editing caret */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed mb-8"
            >
              <TextCaret user="Aria" color="#00E5FF">
                Editor and VFX artist
              </TextCaret>{' '}
              with 10+ years crafting commercials, short films and music videos. I blend sharp storytelling with cinematic visuals.
            </motion.p>

            {/* Two Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* View Work (Red Filled) with Selection Frame and Build Id */}
              <DesignFrame tag="Button" buildId="hero-buttons">
                <MagneticButton href="#work" onClick={() => {
                  const el = document.querySelector('#work');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <button
                    type="button"
                    className="group relative overflow-hidden bg-[#E11D2E] hover:bg-[#FF2D3F] text-white px-8 py-4 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest flex items-center gap-3 shadow-[0_0_25px_rgba(225,29,46,0.4)] hover:shadow-[0_0_35px_rgba(225,29,46,0.7)] transition-all duration-300 active:scale-95"
                  >
                    <span>VIEW WORK</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </MagneticButton>
              </DesignFrame>

              {/* Download CV (Outline) */}
              <MagneticButton href={personal.cvDownloadUrl}>
                <button
                  type="button"
                  className="group relative overflow-hidden bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/50 text-white px-7 py-4 text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest flex items-center gap-3 transition-all duration-300 active:scale-95"
                >
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>DOWNLOAD CV</span>
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Transparent Cutout Portrait with Edge-light, Stats & Editor Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            
            {/* Cutout Portrait Container with Parallax and Design Editor Selection Frame */}
            <DesignFrame tag="Image" alwaysVisible={true} buildId="hero-portrait" dimensions="420 × 560" className="w-full max-w-[420px]">
              <motion.div
                style={{ x: portraitX, y: portraitY }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[3/4] flex items-center justify-center"
              >
                {/* Red Edge Rim Lighting Box Behind */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#E11D2E]/20 via-transparent to-transparent opacity-80 blur-xl pointer-events-none" />

                {/* Decorative Frame Outline with Crosshairs */}
                <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none">
                  <span className="absolute -top-1.5 -left-1.5 text-zinc-600 font-mono text-[10px]">+</span>
                  <span className="absolute -top-1.5 -right-1.5 text-zinc-600 font-mono text-[10px]">+</span>
                  <span className="absolute -bottom-1.5 -left-1.5 text-zinc-600 font-mono text-[10px]">+</span>
                  <span className="absolute -bottom-1.5 -right-1.5 text-[#E11D2E] font-mono text-[10px]">+</span>
                </div>

                {/* Cutout Portrait Image: placeholder transparent PNG */}
                {/* Replace public/assets/hero-portrait.png with your transparent PNG cutout */}
                <img
                  src={personal.heroPortrait}
                  alt={`${personal.name} — ${personal.role}`}
                  className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(225,29,46,0.35)] select-none pointer-events-none"
                  loading="eager"
                />

                {/* Camera Framing HUD Marker */}
                <div className="absolute bottom-6 left-6 z-20 bg-[#0A0A0B]/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded font-mono text-[10px] text-zinc-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E] animate-pulse" />
                  <span>LIVE FEED • 24.0 FPS</span>
                </div>
              </motion.div>
            </DesignFrame>

            {/* Small stats on the edge with count-up animation */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`hidden sm:flex flex-col gap-4 absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-30 bg-[#121214]/90 backdrop-blur-md border border-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500 ${
                isBuilding && !isCompleted && !isElementBuilt('hero-stats') ? 'opacity-30 translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            >
              {personal.stats.slice(0, 2).map((st, idx) => (
                <div key={st.label} className="flex flex-col border-b border-white/5 pb-2.5 last:border-b-0 last:pb-0">
                  <div className="font-heading text-3xl font-black text-white flex items-baseline">
                    <span>{counts[idx.toString()] || 0}</span>
                    <span className="text-[#E11D2E] text-2xl ml-0.5">{st.suffix}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    {st.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Marquee Strip Under Hero Scrolling Skills / Software */}
      <div
        className={`relative w-full border-t border-b border-white/10 bg-[#121214]/60 py-3.5 overflow-hidden z-20 mt-12 transition-all duration-700 ${
          isBuilding && !isCompleted && !isElementBuilt('hero-marquee') ? 'opacity-30 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex w-max animate-marquee-slow whitespace-nowrap">
          {[...softwareTicker, ...softwareTicker, ...softwareTicker].map((software, i) => (
            <div key={`${software}-${i}`} className="flex items-center mx-6">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors select-none font-semibold">
                {software}
              </span>
              <span className="text-[#E11D2E] text-xs ml-8 font-black select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

