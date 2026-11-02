import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GhostCursorData {
  id: string;
  name: string;
  color: string;
  waypoints: { x: number; y: number }[]; // In percentages [0-100]
}

const GHOST_USERS: GhostCursorData[] = [
  {
    id: 'aria',
    name: 'Aria',
    color: '#00E5FF', // Teal
    waypoints: [
      { x: 72, y: 18 }, // Looking at hero portrait
      { x: 65, y: 24 }, // Paused at camera tag
      { x: 30, y: 38 }, // Checking project 1
      { x: 22, y: 44 }, // Checking filter pill
      { x: 50, y: 55 }, // Examining before/after slider
      { x: 70, y: 20 },
    ],
  },
  {
    id: 'dev',
    name: 'Dev',
    color: '#FF3B81', // Pink
    waypoints: [
      { x: 25, y: 15 }, // Near hero heading
      { x: 38, y: 22 }, // At "View Work" button
      { x: 82, y: 42 }, // Looking at project 2
      { x: 74, y: 64 }, // Checking skill meters
      { x: 85, y: 68 }, // Near tall quote card
      { x: 25, y: 15 },
    ],
  },
  {
    id: 'maya',
    name: 'Maya',
    color: '#FF8A00', // Orange
    waypoints: [
      { x: 85, y: 8 },  // Near "Hire Me" button
      { x: 55, y: 32 }, // Browsing selected works
      { x: 78, y: 48 }, // Checking awards laurels
      { x: 45, y: 80 }, // Reviewing testimonials
      { x: 68, y: 90 }, // Near contact showreel
      { x: 85, y: 8 },
    ],
  },
  {
    id: 'leo',
    name: 'Leo',
    color: '#A855F7', // Purple
    waypoints: [
      { x: 48, y: 28 }, // Software marquee
      { x: 18, y: 50 }, // Looking at project 4 VFX breakdown
      { x: 35, y: 72 }, // Scrolling experience timeline
      { x: 24, y: 85 }, // Checking service card 1
      { x: 48, y: 28 },
    ],
  },
  {
    id: 'kai',
    name: 'Kai',
    color: '#38BDF8', // Sky Blue / White
    waypoints: [
      { x: 60, y: 12 }, // Hero tagline
      { x: 32, y: 58 }, // Before/After process step
      { x: 70, y: 76 }, // About bio paragraph
      { x: 80, y: 92 }, // Contact brief message box
      { x: 60, y: 12 },
    ],
  },
];

const GhostCursorItem: React.FC<{ user: GhostCursorData; reducedMotion: boolean }> = ({
  user,
  reducedMotion,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    // Cycle through waypoints with pauses and occasional clicks
    const interval = setInterval(() => {
      // Simulate click at destination
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 450);

      // Move to next waypoint
      setCurrentIdx((prev) => (prev + 1) % user.waypoints.length);
    }, 4500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [user.waypoints.length, reducedMotion]);

  const target = user.waypoints[currentIdx];

  if (reducedMotion) return null;

  return (
    <motion.div
      className="absolute pointer-events-none z-40"
      initial={{ left: `${target.x}%`, top: `${target.y}%` }}
      animate={{
        left: `${target.x}%`,
        top: `${target.y}%`,
      }}
      transition={{
        duration: 3.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="relative">
        {/* Cursor Arrow SVG */}
        <motion.div
          animate={isClicking ? { scale: 0.85 } : { scale: 1 }}
          transition={{ duration: 0.15 }}
          className="relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill={user.color}
              stroke="#0A0A0B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Tiny Name Chip */}
        <div
          className="absolute left-3 top-3 px-1.5 py-0.5 rounded-full font-mono text-[10px] font-bold text-white shadow-md border border-black/30 whitespace-nowrap select-none flex items-center gap-1"
          style={{ backgroundColor: user.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
          <span>{user.name}</span>
        </div>

        {/* Click Pulse Ripple */}
        <AnimatePresence>
          {isClicking && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 pointer-events-none"
              style={{ borderColor: user.color }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const GhostCursors: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      {GHOST_USERS.map((user) => (
        <GhostCursorItem key={user.id} user={user} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
};
