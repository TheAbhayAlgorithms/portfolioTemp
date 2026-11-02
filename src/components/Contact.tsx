import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Play, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { portfolioContent, ProjectItem } from '../content.ts';
import { MagneticButton } from './MagneticButton.tsx';

interface ContactProps {
  onOpenShowreel: (reelItem: ProjectItem) => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenShowreel }) => {
  const { personal, contact } = portfolioContent;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: contact.projectTypes[0],
    budget: contact.budgetRanges[1],
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Please provide a message (min 10 characters)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: contact.projectTypes[0],
        budget: contact.budgetRanges[1],
        message: '',
      });
    }, 1000);
  };

  const handleLaunchShowreel = () => {
    const showreelProject: ProjectItem = {
      id: 'showreel-featured',
      number: '00',
      title: 'Interactive Frontend & AI Showcase',
      category: 'Frontend',
      year: '2025',
      client: 'Abhay Raj Singh Showcase',
      duration: 'Live Demo',
      description: 'Featured interactive experience demonstrating responsive React architecture, intelligent ML integrations, and fluid 60fps animations.',
      thumbnailUrl: '/assets/before-after/cyberpunk-final.jpg',
      videoType: 'youtube',
      videoEmbedUrl: personal.showreelVideoUrl,
      tools: ['React', 'TypeScript', 'Next.js', 'Python', 'Tailwind CSS']
    };
    onOpenShowreel(showreelProject);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0A0A0B] border-b border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E11D2E]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 08 / CONTACT */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#E11D2E] tracking-[0.25em] font-semibold">
            08 / GET IN TOUCH
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Big Heading: LET'S WORK TOGETHER. */}
        <div data-build="heading" className="mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-9xl tracking-tight uppercase font-black text-white leading-[0.88]">
            LET'S WORK <br />
            <span className="text-[#E11D2E]">TOGETHER.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-4 font-normal leading-relaxed">
            {contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Details, Status Badge, Social Links */}
          <div className="lg:col-span-5 space-y-10">
            {/* Availability Badge: Pulsing Green/Red */}
            <div data-build="card" className="inline-flex items-center gap-3 px-4 py-2 bg-[#121214] border border-white/10 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF2D3F]" />
              </span>
              <span className="font-mono text-xs text-white font-medium">
                ● Available for freelance worldwide
              </span>
            </div>

            {/* Direct Contact Links */}
            <div data-build="card" className="space-y-6">
              <div className="group">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${personal.email}`}
                  className="font-heading text-2xl sm:text-3xl text-white group-hover:text-[#FF2D3F] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 text-[#E11D2E]" />
                  <span>{personal.email}</span>
                </a>
              </div>

              <div className="group">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  DIRECT PHONE / WHATSAPP
                </span>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="font-heading text-2xl sm:text-3xl text-white group-hover:text-[#FF2D3F] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#E11D2E]" />
                  <span>{personal.phone}</span>
                </a>
              </div>

              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  LOCATION &amp; TIMEPATH
                </span>
                <div className="font-heading text-xl sm:text-2xl text-zinc-300 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-zinc-500" />
                  <span>{personal.location}</span>
                </div>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div data-build="repeated" className="pt-6 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-4">
                // SOCIAL PLATFORMS
              </span>
              <div className="flex flex-wrap gap-3">
                {personal.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#121214] border border-white/10 hover:border-[#E11D2E]/60 text-zinc-300 hover:text-white font-mono text-xs rounded transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{social.name}</span>
                    <ArrowRight className="w-3 h-3 text-[#E11D2E] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Framed Showreel Tile + Working Contact Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Framed Showreel/Video Tile */}
            <div
              data-build="video"
              onClick={handleLaunchShowreel}
              className="group relative w-full aspect-[21/9] bg-[#121214] border border-white/15 hover:border-[#E11D2E] rounded-sm overflow-hidden cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-500"
            >
              {/* Thumbnail background */}
              <img
                src="/assets/before-after/cyberpunk-final.jpg"
                alt="Showreel background preview"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

              {/* Tile Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#FF2D3F] uppercase tracking-[0.25em] font-bold block mb-1">
                    {contact.showreelTile.tag} • {contact.showreelTile.duration}
                  </span>
                  <h3 className="font-heading text-3xl sm:text-5xl uppercase tracking-wider text-white">
                    {contact.showreelTile.title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    {contact.showreelTile.subtext}
                  </p>
                </div>

                {/* Big Red Play Button */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E11D2E] text-white flex items-center justify-center shadow-[0_0_25px_#FF2D3F] group-hover:scale-110 transition-transform flex-shrink-0">
                  <Play className="w-6 h-6 ml-1 fill-white" />
                </div>
              </div>
            </div>

            {/* Working Contact Form */}
            <div data-build="card" className="bg-[#121214] border border-white/10 p-6 sm:p-8 rounded-sm">
              <h3 className="font-heading text-2xl uppercase tracking-wide text-white mb-6 flex items-center justify-between">
                <span>PROJECT INQUIRY FORM</span>
                <span className="font-mono text-xs text-zinc-500">24H RESPONSE</span>
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center bg-black/40 border border-[#E11D2E]/40 rounded flex flex-col items-center justify-center space-y-3"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#E11D2E] animate-bounce" />
                    <h4 className="font-heading text-2xl uppercase text-white">
                      TRANSMISSION RECEIVED
                    </h4>
                    <p className="text-zinc-400 text-sm max-w-sm font-normal">
                      Thank you for reaching out. Your message has landed with Abhay. Expect a response within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-6 py-2 font-mono text-xs text-zinc-300 hover:text-white border border-white/10 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div data-build="form-field">
                        <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Elena Fisher"
                          className="w-full bg-[#0A0A0B] border border-white/10 focus:border-[#E11D2E] px-4 py-3 text-sm text-white focus:outline-none transition-colors rounded-none"
                        />
                        {formErrors.name && (
                          <span className="font-mono text-[11px] text-[#FF2D3F] mt-1 block">
                            {formErrors.name}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div data-build="form-field">
                        <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@production.com"
                          className="w-full bg-[#0A0A0B] border border-white/10 focus:border-[#E11D2E] px-4 py-3 text-sm text-white focus:outline-none transition-colors rounded-none"
                        />
                        {formErrors.email && (
                          <span className="font-mono text-[11px] text-[#FF2D3F] mt-1 block">
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Project Type Dropdown */}
                      <div data-build="form-field">
                        <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                          PROJECT TYPE
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full bg-[#0A0A0B] border border-white/10 focus:border-[#E11D2E] px-4 py-3 text-sm text-white focus:outline-none transition-colors rounded-none appearance-none cursor-pointer"
                        >
                          {contact.projectTypes.map((type) => (
                            <option key={type} value={type} className="bg-[#121214] text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Budget Dropdown */}
                      <div data-build="form-field">
                        <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                          ESTIMATED BUDGET
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full bg-[#0A0A0B] border border-white/10 focus:border-[#E11D2E] px-4 py-3 text-sm text-white focus:outline-none transition-colors rounded-none appearance-none cursor-pointer"
                        >
                          {contact.budgetRanges.map((range) => (
                            <option key={range} value={range} className="bg-[#121214] text-white">
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div data-build="form-field">
                      <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                        PROJECT BRIEF / TIMELINE / SCOPE *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your film, deadline, deliverables, and vision..."
                        className="w-full bg-[#0A0A0B] border border-white/10 focus:border-[#E11D2E] px-4 py-3 text-sm text-white focus:outline-none transition-colors rounded-none resize-none"
                      />
                      {formErrors.message && (
                        <span className="font-mono text-[11px] text-[#FF2D3F] mt-1 block">
                          {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div data-build="button">
                      <MagneticButton className="w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-[#E11D2E] hover:bg-[#FF2D3F] disabled:opacity-50 text-white font-mono text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(225,29,46,0.4)] hover:shadow-[0_0_30px_rgba(225,29,46,0.6)] transition-all duration-300 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span>TRANSMITTING BRIEF...</span>
                          ) : (
                            <>
                              <span>SEND TRANSMISSION</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
