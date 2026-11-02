import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { GhostCursors } from './GhostCursors.tsx';
import { EditorToolbar } from './EditorToolbar.tsx';
import { BuildLayer } from './BuildLayer.tsx';
import { useBuildSequence } from './BuildSequenceContext.tsx';

interface HoverBox {
  x: number;
  y: number;
  width: number;
  height: number;
  tag: string;
}

export const EditorOverlay: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [hoverBox, setHoverBox] = useState<HoverBox | null>(null);
  const [hoverText, setHoverText] = useState<string>('');
  const [isMouseDown, setIsMouseDown] = useState(false);

  const { isBuilding, isCompleted } = useBuildSequence();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Infer tag for design frame based on element
  const getElementTag = (el: HTMLElement): string | null => {
    // 1. Explicit data-editor-tag attribute
    const explicitTag = el.closest('[data-editor-tag]')?.getAttribute('data-editor-tag');
    if (explicitTag) return explicitTag;

    // 2. Play video target
    if (el.closest('[data-cursor="PLAY"]')) return 'Video';

    // 3. Logo
    if (el.closest('a[href="#hero"]') && el.closest('header')) return 'Logo';

    // 4. Buttons and links
    if (el.closest('button') || el.closest('a')) return 'Button';

    // 5. Headings
    if (el.closest('h1, h2, h3, h4')) return 'Heading';

    // 6. Media
    if (el.closest('img')) return 'Image';
    if (el.closest('video, iframe')) return 'Video';

    // 7. Inputs
    if (el.closest('input, textarea, select')) return 'Input';

    // 8. Cards and sections
    if (el.closest('.group')) return 'Card';

    return null;
  };

  useEffect(() => {
    // Touch detection
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isCursorVisible) setIsCursorVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setHoverBox(null);
        setHoverText('');
        return;
      }

      // Check if hovering over editor toolbar or skip button - ignore frame
      if (
        target.closest('aside[aria-label="Design Editor Toolbar"]') ||
        target.closest('button[onClick*="skipBuild"]') ||
        target.closest('nav')
      ) {
        setHoverBox(null);
        setHoverText('');
        return;
      }

      const tag = getElementTag(target);
      if (tag) {
        // Find the bounding container
        const boundingTarget =
          target.closest('[data-editor-tag]') ||
          target.closest('[data-cursor="PLAY"]') ||
          target.closest('button, a, h1, h2, h3, img, input, textarea, select, .group') ||
          target;

        const rect = (boundingTarget as HTMLElement).getBoundingClientRect();
        // Ignore giant full-page containers
        if (rect.width > 20 && rect.height > 10 && rect.width < window.innerWidth * 0.98) {
          setHoverBox({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
            tag,
          });
          setHoverText(tag);
        } else {
          setHoverBox(null);
          setHoverText('');
        }
      } else {
        setHoverBox(null);
        setHoverText('');
      }
    };

    const handleScroll = () => {
      setHoverBox(null);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsCursorVisible(false);
    const handleMouseEnter = () => setIsCursorVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isCursorVisible]);

  if (isTouch) {
    return isBuilding ? <BuildLayer /> : null;
  }

  return (
    <div className="relative pointer-events-none z-40">
      {/* 1. Live Figma-Style Build Layer during construction */}
      {isBuilding && !isCompleted && <BuildLayer />}

      {/* 2. Idle Ghost Collaborator Cursors once site is built */}
      {isCompleted && <GhostCursors />}

      {/* 3. Dynamic Hover Selection Frame that locks onto whatever the visitor hovers */}
      <AnimatePresence>
        {hoverBox && (
          <motion.div
            key="hover-selection-frame"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: hoverBox.x,
              y: hoverBox.y,
              width: hoverBox.width,
              height: hoverBox.height,
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 32,
              mass: 0.1,
            }}
            className="fixed top-0 left-0 pointer-events-none z-[9990] border border-[#2F6BFF] shadow-[0_0_12px_rgba(47,107,255,0.35)]"
          >
            {/* 4 Corner Square Handles */}
            <div className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />

            {/* 4 Edge-Midpoint Handles */}
            <div className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute -bottom-[3.5px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute top-1/2 -left-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />
            <div className="absolute top-1/2 -right-[3.5px] -translate-y-1/2 w-[7px] h-[7px] bg-white border border-[#2F6BFF] rounded-[1px] shadow-xs" />

            {/* Blue Name Tag under bottom-right (#2F6BFF) with 10px white text */}
            <div className="absolute -bottom-[21px] right-0 bg-[#2F6BFF] text-white font-mono text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm shadow-md whitespace-nowrap leading-none select-none">
              <span>{hoverBox.tag}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Real Mouse Pointer: Crisp Red Arrow + "You" Name Chip */}
      {isCursorVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: smoothX,
            y: smoothY,
          }}
        >
          <div className="relative">
            {/* Crisp Red Arrow Pointer */}
            <motion.div
              animate={isMouseDown ? { scale: 0.88 } : { scale: 1 }}
              transition={{ duration: 0.1 }}
              className="drop-shadow-[0_2px_8px_rgba(225,29,46,0.6)]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                  fill="#E11D2E"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Red "You" Name Chip */}
            <div className="absolute left-3.5 top-3.5 px-2 py-0.5 bg-[#E11D2E] text-white font-mono text-[10px] font-bold rounded shadow-[0_2px_8px_rgba(225,29,46,0.5)] border border-white/20 whitespace-nowrap flex items-center gap-1 select-none">
              <span>You</span>
              {hoverText && (
                <span className="opacity-80 font-normal text-[9px] uppercase">
                  [{hoverText}]
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* 5. Floating Editor Toolbar at Bottom Center */}
      <div className="pointer-events-auto">
        <EditorToolbar />
      </div>
    </div>
  );
};
