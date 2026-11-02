import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Tag } from 'lucide-react';
import { ProjectItem } from '../content.ts';

interface LightboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#121214] border border-white/15 rounded-lg overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0B]/80">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#E11D2E] font-bold">
                PROJ_{project.number}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="font-heading text-xl uppercase tracking-wider text-white">
                {project.title}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-400">
                {project.category}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Container (16:9 Aspect) */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
            {project.videoType === 'youtube' ? (
              <iframe
                src={`${project.videoEmbedUrl}&autoplay=1`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : project.videoType === 'vimeo' ? (
              <iframe
                src={project.videoEmbedUrl}
                title={project.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={project.videoEmbedUrl}
                poster={project.thumbnailUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Bottom Info Bar */}
          <div className="p-6 overflow-y-auto bg-[#121214] border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h3 className="font-heading text-2xl uppercase tracking-wide text-white">
                  {project.title} — {project.category} ({project.year})
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-1.5 mr-2">
                    <Tag className="w-3.5 h-3.5 text-[#E11D2E]" /> Stack:
                  </span>
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 text-zinc-300 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar Meta */}
              <div className="border-l border-white/10 pl-6 flex flex-col justify-between space-y-3 font-mono text-xs text-zinc-400">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CLIENT</span>
                    <span className="text-white font-semibold">{project.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">YEAR</span>
                    <span className="text-white">{project.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DURATION</span>
                    <span className="text-[#FF2D3F] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {project.duration}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-[11px] text-zinc-500">
                  Full 4K ProRes master available upon production request.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
