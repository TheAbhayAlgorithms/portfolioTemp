import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton.tsx';

interface NavbarProps {
  firstName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ firstName = "ALEX" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Recognition', href: '#awards' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0B]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo on Left: First name in bold caps with a small red dot */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-1.5 group select-none cursor-pointer"
          >
            <span className="font-heading text-2xl sm:text-3xl tracking-widest font-black text-white group-hover:text-zinc-200 transition-colors">
              {firstName}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D2E] shadow-[0_0_8px_#FF2D3F] transition-transform duration-300 group-hover:scale-125" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors relative py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E11D2E] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Red 'Hire Me' Button with magnetic effect */}
          <div className="hidden sm:flex items-center gap-4">
            <MagneticButton href="#contact" onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <button
                type="button"
                className="relative overflow-hidden group bg-[#E11D2E] hover:bg-[#FF2D3F] text-white px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-none flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,46,0.35)] hover:shadow-[0_0_25px_rgba(225,29,46,0.6)] transition-all duration-300 active:scale-95"
              >
                <span>HIRE ME</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#E11D2E]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu with staggered link reveals */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-xl flex flex-col justify-between px-8 py-24 lg:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              <span className="font-mono text-xs text-[#E11D2E] tracking-[0.3em] uppercase">
                // NAVIGATION
              </span>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  className="font-heading text-4xl sm:text-5xl uppercase tracking-wider text-zinc-300 hover:text-[#E11D2E] transition-colors flex items-center justify-between border-b border-white/5 pb-3"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-zinc-600">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="w-full py-4 text-center bg-[#E11D2E] text-white font-mono text-sm uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(225,29,46,0.4)]"
              >
                HIRE ME NOW →
              </a>
              <div className="flex items-center justify-between text-zinc-500 font-mono text-[11px]">
                <span>Alex Mercer Portfolio</span>
                <span className="text-[#E11D2E]">Available for Work</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
