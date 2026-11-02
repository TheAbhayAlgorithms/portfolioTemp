import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target has special interactive states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      setIsPointer(!!interactive);

      // Check if target is a project card or video element with data-cursor="PLAY"
      const playTarget = target.closest('[data-cursor="PLAY"]');
      if (playTarget) {
        setCursorText('PLAY');
      } else {
        const customTarget = target.closest('[data-cursor]');
        if (customTarget) {
          setCursorText(customTarget.getAttribute('data-cursor') || '');
        } else {
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring / Play Bubble */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center font-mono font-bold tracking-wider select-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 80 : isPointer ? 52 : 36,
          height: cursorText ? 80 : isPointer ? 52 : 36,
          backgroundColor: cursorText ? '#E11D2E' : isPointer ? 'rgba(225, 29, 46, 0.15)' : 'transparent',
          borderColor: cursorText ? '#FF2D3F' : isPointer ? '#FF2D3F' : 'rgba(255, 255, 255, 0.35)',
          borderWidth: cursorText ? 0 : 1.5,
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.15 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-white text-xs font-bold tracking-widest flex items-center gap-1"
          >
            ▶ {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Red Core Dot */}
      {!cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#E11D2E] shadow-[0_0_8px_#E11D2E]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: isPointer ? 8 : 5,
            height: isPointer ? 8 : 5,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 450 }}
        />
      )}
    </>
  );
};

