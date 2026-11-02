import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export type BuildType =
  | 'heading'
  | 'text'
  | 'paragraph'
  | 'image'
  | 'video'
  | 'card'
  | 'button'
  | 'line'
  | 'repeated'
  | 'big-text'
  | 'badge'
  | 'form-field'
  | string;

export interface GhostCursor {
  id: string;
  name: 'Aria' | 'Dev' | 'Maya' | 'Kai' | 'Sam';
  color: string;
  x: number;
  y: number;
  busy: boolean;
  scale: number;
  isClicking: boolean;
  actionText?: string;
  targetRect?: DOMRect | null;
  activeFrame?: {
    x: number;
    y: number;
    w: number;
    h: number;
    tag: string;
    sizeText: string;
    opacity: number;
  } | null;
}

export interface SnapGuide {
  x?: number;
  y?: number;
  label?: string;
}

interface LiveBuildContextType {
  isBuilding: boolean;
  totalElements: number;
  builtCount: number;
  skipBuild: () => void;
  replayBuild: () => void;
  isCompleted: boolean;
  cursors: GhostCursor[];
  snapGuides: SnapGuide[];
  visitorHoverBox: { x: number; y: number; w: number; h: number; tag: string } | null;
  theme: 'dark' | 'light';
  toggleTheme: (origin?: { x: number; y: number }) => void;
  themeRipple: { id: number; x: number; y: number; targetTheme: 'dark' | 'light' } | null;
}

const LiveBuildContext = createContext<LiveBuildContextType | null>(null);

const SESSION_KEY = 'portfolio_live_build_completed_v4';

export const LiveBuildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    try {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isMobile || isReduced) return true;
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [totalElements, setTotalElements] = useState(0);
  const [builtCount, setBuiltCount] = useState(0);
  const [snapGuides, setSnapGuides] = useState<SnapGuide[]>([]);
  const [visitorHoverBox, setVisitorHoverBox] = useState<{ x: number; y: number; w: number; h: number; tag: string } | null>(null);

  // Day / Night Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const stored = localStorage.getItem('portfolio_theme');
      if (stored === 'light' || stored === 'dark') return stored;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const [themeRipple, setThemeRipple] = useState<{ id: number; x: number; y: number; targetTheme: 'dark' | 'light' } | null>(null);

  // 5 Ghost Cursors: Aria (teal), Dev (pink), Maya (orange), Kai (purple), Sam (white in dark / dark in light)
  const cursorsRef = useRef<GhostCursor[]>([
    { id: 'c1', name: 'Aria', color: '#00E5FF', x: 120, y: 150, busy: false, scale: 1, isClicking: false },
    { id: 'c2', name: 'Dev', color: '#FF3B81', x: typeof window !== 'undefined' ? window.innerWidth - 180 : 1000, y: 220, busy: false, scale: 1, isClicking: false },
    { id: 'c3', name: 'Maya', color: '#FF8A00', x: typeof window !== 'undefined' ? window.innerWidth - 140 : 1050, y: 350, busy: false, scale: 1, isClicking: false },
    { id: 'c4', name: 'Kai', color: '#A855F7', x: 90, y: 420, busy: false, scale: 1, isClicking: false },
    { id: 'c5', name: 'Sam', color: '#FFFFFF', x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600, y: 200, busy: false, scale: 1, isClicking: false },
  ]);

  const [, setRenderTrigger] = useState(0);
  const queueRef = useRef<HTMLElement[]>([]);
  const activeBuildsRef = useRef<Set<HTMLElement>>(new Set());
  const builtElementsRef = useRef<Set<HTMLElement>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isCompletedRef = useRef(isCompleted);

  isCompletedRef.current = isCompleted;

  // Theme sync effect (document class & Sam's cursor color)
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.body.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
      document.body.classList.remove('theme-light');
    }
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch {
      // ignore
    }
    const sam = cursorsRef.current.find((c) => c.name === 'Sam');
    if (sam) {
      sam.color = theme === 'light' ? '#18181B' : '#FFFFFF';
    }
    setRenderTrigger((n) => n + 1);
  }, [theme]);

  // Reduced motion / mobile auto-complete
  useEffect(() => {
    const checkReducedOrMobile = () => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;
      if (isReduced || isMobile) {
        setIsCompleted(true);
        document.querySelectorAll('[data-build]').forEach((el) => el.classList.add('is-built'));
      }
    };
    checkReducedOrMobile();
    window.addEventListener('resize', checkReducedOrMobile);
    return () => window.removeEventListener('resize', checkReducedOrMobile);
  }, []);

  // Typewriter effect utility: character by character with blinking caret and dashed outline
  const runTypewriter = (el: HTMLElement, onDone: () => void) => {
    // Look for inner heading/text child if el is a wrapper to preserve typography classes
    const targetEl =
      el.children.length === 1 && el.firstElementChild instanceof HTMLElement
        ? (el.firstElementChild as HTMLElement)
        : el;

    const originalHTML = targetEl.innerHTML;
    const textContent = targetEl.textContent || '';
    if (!textContent.trim() || targetEl.children.length > 5) {
      onDone();
      return;
    }

    targetEl.classList.add('is-typing');

    // Split text into span characters
    const chars = textContent.split('');
    targetEl.innerHTML = '';
    const spanElements: HTMLSpanElement[] = [];

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.className = 'build-char';
      span.textContent = char;
      targetEl.appendChild(span);
      spanElements.push(span);
    });

    const caret = document.createElement('span');
    caret.className = 'build-caret';
    targetEl.appendChild(caret);

    let idx = 0;
    // Paced comfortably: 32ms - 60ms per char for smooth readable progression (~1.2s - 1.8s)
    const speed = Math.max(32, Math.min(60, 1400 / (chars.length || 1)));

    const interval = setInterval(() => {
      if (idx < spanElements.length) {
        spanElements[idx].classList.add('typed');
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (caret.parentNode) caret.parentNode.removeChild(caret);
          targetEl.innerHTML = originalHTML; // restore full HTML with formatting
          targetEl.classList.remove('is-typing');
          onDone();
        }, 240);
      }
    }, speed);
  };

  // Reusable build execution function for a specific element & cursor
  const executeBuild = useCallback((el: HTMLElement, cursor: GhostCursor) => {
    cursor.busy = true;
    activeBuildsRef.current.add(el);

    const type = (el.getAttribute('data-build') || 'card').toLowerCase();
    const tagLabel = type.charAt(0).toUpperCase() + type.slice(1);

    const initialRect = el.getBoundingClientRect();

    // Check if scrolled way past viewport -> instant complete
    if (initialRect.bottom < -120 || initialRect.top > window.innerHeight + 250) {
      el.classList.add('is-built');
      builtElementsRef.current.add(el);
      activeBuildsRef.current.delete(el);
      cursor.busy = false;
      cursor.activeFrame = null;
      cursor.actionText = undefined;
      setBuiltCount(builtElementsRef.current.size);
      return;
    }

    // Phase 1: Travel cursor to rect top-left along curved path with smooth ease
    cursor.actionText = `drawFrame ${Math.round(initialRect.width)}×${Math.round(initialRect.height)}`;

    const startX = cursor.x;
    const startY = cursor.y;
    const travelObj = { p: 0 };

    gsap.to(travelObj, {
      p: 1,
      duration: 0.82,
      ease: 'power2.inOut',
      onUpdate: () => {
        const curRect = el.getBoundingClientRect();
        // Check if leaving screen
        if (curRect.bottom < -120 || curRect.top > window.innerHeight + 250) {
          gsap.killTweensOf(travelObj);
          el.classList.add('is-built');
          builtElementsRef.current.add(el);
          activeBuildsRef.current.delete(el);
          cursor.busy = false;
          cursor.activeFrame = null;
          cursor.actionText = undefined;
          setBuiltCount(builtElementsRef.current.size);
          setRenderTrigger((n) => n + 1);
          return;
        }

        const tX = curRect.left;
        const tY = curRect.top;
        const dx = tX - startX;
        const dy = tY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Organic curved path
        const arc = Math.sin(travelObj.p * Math.PI) * Math.min(55, dist * 0.14);
        cursor.x = startX + (tX - startX) * travelObj.p - (dy / (dist || 1)) * arc;
        cursor.y = startY + (tY - startY) * travelObj.p + (dx / (dist || 1)) * arc;

        setRenderTrigger((n) => n + 1);
      },
      onComplete: () => {
        // Natural micro-pause before dragging frame
        setTimeout(() => {
          // Phase 2: Click down & start dragging frame
          cursor.isClicking = true;
          cursor.scale = 0.85;

          const snapRect = el.getBoundingClientRect();
          cursor.activeFrame = {
            x: snapRect.left,
            y: snapRect.top,
            w: 8,
            h: 8,
            tag: tagLabel,
            sizeText: '8 × 8',
            opacity: 1,
          };

          // Flash pink snap guides
          setSnapGuides([
            { x: snapRect.left, label: `${Math.round(snapRect.left)}px` },
            { y: snapRect.top, label: `${Math.round(snapRect.top)}px` },
          ]);
          setTimeout(() => setSnapGuides([]), 480);

          // Phase 3: Drag diagonally to rect bottom-right
          const dragObj = { p: 0 };

          gsap.to(dragObj, {
            p: 1,
            duration: 0.92,
            ease: 'power2.inOut',
            onUpdate: () => {
              const r = el.getBoundingClientRect();
              if (r.bottom < -120 || r.top > window.innerHeight + 250) {
                gsap.killTweensOf(dragObj);
                el.classList.add('is-built');
                builtElementsRef.current.add(el);
                activeBuildsRef.current.delete(el);
                cursor.busy = false;
                cursor.activeFrame = null;
                cursor.actionText = undefined;
                setBuiltCount(builtElementsRef.current.size);
                setRenderTrigger((n) => n + 1);
                return;
              }

              cursor.x = r.left + (r.right - r.left) * dragObj.p;
              cursor.y = r.top + (r.bottom - r.top) * dragObj.p;

              if (cursor.activeFrame) {
                cursor.activeFrame.x = r.left;
                cursor.activeFrame.y = r.top;
                cursor.activeFrame.w = Math.max(8, cursor.x - r.left);
                cursor.activeFrame.h = Math.max(8, cursor.y - r.top);
                cursor.activeFrame.sizeText = `${Math.round(cursor.activeFrame.w)} × ${Math.round(cursor.activeFrame.h)}`;
              }
              setRenderTrigger((n) => n + 1);
            },
            onComplete: () => {
              cursor.isClicking = false;
              cursor.scale = 1;

              // Phase 4: Run Content Reveal by Type
              el.classList.add('is-built');

              const finishElement = () => {
                // Fade frame handles and chip smoothly
                if (cursor.activeFrame) {
                  gsap.to(cursor.activeFrame, {
                    opacity: 0,
                    duration: 0.42,
                    ease: 'power2.out',
                    onComplete: () => {
                      cursor.activeFrame = null;
                      cursor.busy = false;
                      cursor.actionText = undefined;
                      activeBuildsRef.current.delete(el);
                      builtElementsRef.current.add(el);
                      setBuiltCount(builtElementsRef.current.size);
                      setRenderTrigger((n) => n + 1);
                    },
                  });
                } else {
                  cursor.busy = false;
                  cursor.actionText = undefined;
                  activeBuildsRef.current.delete(el);
                  builtElementsRef.current.add(el);
                  setBuiltCount(builtElementsRef.current.size);
                  setRenderTrigger((n) => n + 1);
                }
              };

              // Type-specific action execution
              if (type === 'heading' || type === 'text' || type === 'paragraph') {
                cursor.actionText = 'typing text...';
                runTypewriter(el, finishElement);
              } else if (type === 'image' || type === 'video') {
                cursor.actionText = 'dropMedia 4K';
                el.classList.add('build-image-reveal');
                setTimeout(finishElement, 900);
              } else if (type === 'button') {
                cursor.actionText = 'colorFill #E11D2E';
                el.classList.add('build-button-wipe');
                setTimeout(finishElement, 800);
              } else if (type === 'repeated') {
                cursor.actionText = 'Ctrl+D Stamp';
                el.classList.add('build-stamp');
                setTimeout(finishElement, 750);
              } else if (type === 'line') {
                cursor.actionText = 'penDrawLine';
                el.classList.add('build-line-reveal');
                setTimeout(finishElement, 800);
              } else if (type === 'big-text') {
                cursor.actionText = 'scaleTypography';
                gsap.fromTo(
                  el,
                  { opacity: 0, filter: 'blur(10px)' },
                  { opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out', onComplete: finishElement }
                );
              } else {
                cursor.actionText = `create ${tagLabel}`;
                el.classList.add('build-card-reveal');
                setTimeout(finishElement, 750);
              }
            },
          });
        }, 110);
      },
    });
  }, []);

  // Scheduler Loop: Assigns free cursors to queued elements (up to 3 parallel builds with smooth pacing)
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      if (queueRef.current.length === 0) return;

      const idleCursors = cursorsRef.current.filter((c) => !c.busy);
      if (idleCursors.length === 0) return;

      const activeCount = cursorsRef.current.filter((c) => c.busy).length;
      if (activeCount >= 3) return;

      // Pop next element from queue
      const nextEl = queueRef.current.shift();
      if (!nextEl || builtElementsRef.current.has(nextEl) || activeBuildsRef.current.has(nextEl)) {
        return;
      }

      const assignedCursor = idleCursors[0];
      executeBuild(nextEl, assignedCursor);
    }, 160);

    return () => clearInterval(interval);
  }, [executeBuild, isCompleted]);

  // Idle Cursor gentle ambient drift
  useEffect(() => {
    if (isCompleted) return;

    const driftInterval = setInterval(() => {
      cursorsRef.current.forEach((cursor) => {
        if (!cursor.busy) {
          const deltaX = (Math.random() - 0.5) * 60;
          const deltaY = (Math.random() - 0.5) * 45;
          const targetX = Math.max(40, Math.min(window.innerWidth - 60, cursor.x + deltaX));
          const targetY = Math.max(40, Math.min(window.innerHeight - 60, cursor.y + deltaY));

          gsap.to(cursor, {
            x: targetX,
            y: targetY,
            duration: 2.0,
            ease: 'sine.inOut',
            onUpdate: () => setRenderTrigger((n) => n + 1),
          });
        }
      });
    }, 2400);

    return () => clearInterval(driftInterval);
  }, [isCompleted]);

  // Fast-scroll monitoring: instantly marks off-screen elements built
  useEffect(() => {
    if (isCompleted) return;

    const handleScroll = () => {
      const unbuilt = Array.from(document.querySelectorAll<HTMLElement>('[data-build]:not(.is-built)'));
      unbuilt.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100) {
          el.classList.add('is-built');
          builtElementsRef.current.add(el);
          observerRef.current?.unobserve(el);
        }
      });
      setBuiltCount(builtElementsRef.current.size);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCompleted]);

  // IntersectionObserver: Watches all [data-build] elements on the page continuously on scroll
  useEffect(() => {
    if (isCompleted) {
      document.querySelectorAll('[data-build]').forEach((el) => el.classList.add('is-built'));
      return;
    }

    const allElements = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'));
    setTotalElements(allElements.length);

    // Sort queue top-to-bottom, left-to-right
    const sortByPosition = (els: HTMLElement[]) => {
      return els.sort((a, b) => {
        const rA = a.getBoundingClientRect();
        const rB = b.getBoundingClientRect();
        return rA.top - rB.top || rA.left - rB.left;
      });
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newlyIntersecting: HTMLElement[] = [];

        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            const rect = el.getBoundingClientRect();

            // Fast scroll handling: if far above viewport, mark built immediately with no delay
            if (rect.bottom < -100) {
              el.classList.add('is-built');
              builtElementsRef.current.add(el);
              setBuiltCount(builtElementsRef.current.size);
              observerRef.current?.unobserve(el);
              return;
            }

            if (!builtElementsRef.current.has(el) && !activeBuildsRef.current.has(el)) {
              newlyIntersecting.push(el);
              observerRef.current?.unobserve(el);
            }
          }
        });

        if (newlyIntersecting.length > 0) {
          const sorted = sortByPosition(newlyIntersecting);
          queueRef.current.push(...sorted);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -15% 0px', // Trigger when within bottom 15% of viewport
        threshold: 0,
      }
    );

    allElements.forEach((el) => {
      if (!el.classList.contains('is-built')) {
        observerRef.current?.observe(el);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isCompleted]);

  // Skip build function (shortcut Escape or button)
  const skipBuild = useCallback(() => {
    setIsCompleted(true);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // ignore
    }
    document.querySelectorAll('[data-build]').forEach((el) => {
      el.classList.add('is-built');
      el.classList.remove('is-typing');
    });
    queueRef.current = [];
    activeBuildsRef.current.clear();
    cursorsRef.current.forEach((c) => {
      c.busy = false;
      c.activeFrame = null;
      c.actionText = undefined;
    });
    setRenderTrigger((n) => n + 1);
  }, []);

  // Replay build function
  const replayBuild = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setIsCompleted(false);
    builtElementsRef.current.clear();
    activeBuildsRef.current.clear();
    queueRef.current = [];
    document.querySelectorAll('[data-build]').forEach((el) => {
      el.classList.remove('is-built');
      el.classList.remove('build-image-reveal');
      el.classList.remove('build-button-wipe');
      el.classList.remove('build-stamp');
      el.classList.remove('build-card-reveal');
      el.classList.remove('build-line-reveal');
      el.classList.remove('is-typing');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setBuiltCount(0);

    const allElements = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'));
    allElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    setRenderTrigger((n) => n + 1);
  }, []);

  // Day / Night Theme Toggle with collaborative cursor & element re-materialization animation
  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    const clickX = origin ? origin.x : window.innerWidth / 2;
    const clickY = origin ? origin.y : 60;

    // 1. Trigger radial canvas wipe ripple
    setThemeRipple({
      id: Date.now(),
      x: clickX,
      y: clickY,
      targetTheme: newTheme,
    });
    setTimeout(() => setThemeRipple(null), 900);

    // 2. Flash Figma alignment snap guides at the toggle origin
    setSnapGuides([
      { x: clickX, label: `${newTheme === 'light' ? 'Day' : 'Night'} Mode` },
      { y: clickY, label: `${Math.round(clickY)}px` },
    ]);
    setTimeout(() => setSnapGuides([]), 550);

    // 3. Collaborative Ghost Cursor zooms to toggle with action badge and click ripple
    const idleCursor = cursorsRef.current.find((c) => !c.busy) || cursorsRef.current[0];
    if (idleCursor) {
      idleCursor.busy = true;
      idleCursor.actionText = newTheme === 'light' ? 'colorFill #F8F9FA' : 'colorFill #0A0A0B';

      gsap.to(idleCursor, {
        x: clickX - 8,
        y: clickY - 8,
        duration: 0.65,
        ease: 'power2.out',
        onUpdate: () => setRenderTrigger((n) => n + 1),
        onComplete: () => {
          idleCursor.isClicking = true;
          idleCursor.scale = 0.85;
          setRenderTrigger((n) => n + 1);

          setTimeout(() => {
            idleCursor.isClicking = false;
            idleCursor.scale = 1;
            idleCursor.busy = false;
            idleCursor.actionText = undefined;
            setRenderTrigger((n) => n + 1);
          }, 600);
        },
      });
    }

    // 4. Re-materialize all built elements on screen with smooth element creation animation
    const builtElements = Array.from(document.querySelectorAll<HTMLElement>('[data-build].is-built'));
    builtElements.forEach((el) => {
      const type = (el.getAttribute('data-build') || 'card').toLowerCase();
      if (type === 'image' || type === 'video') {
        el.classList.remove('build-image-reveal');
        void el.offsetWidth;
        el.classList.add('build-image-reveal');
      } else if (type === 'button') {
        el.classList.remove('build-button-wipe');
        void el.offsetWidth;
        el.classList.add('build-button-wipe');
      } else if (type === 'repeated') {
        el.classList.remove('build-stamp');
        void el.offsetWidth;
        el.classList.add('build-stamp');
      } else if (type === 'line') {
        el.classList.remove('build-line-reveal');
        void el.offsetWidth;
        el.classList.add('build-line-reveal');
      } else {
        el.classList.remove('build-card-reveal');
        void el.offsetWidth;
        el.classList.add('build-card-reveal');
      }
    });
  }, [theme]);

  // Keyboard shortcuts: Escape to skip, D to toggle Day/Night theme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCompletedRef.current) {
        skipBuild();
      }
      if (
        (e.key === 'd' || e.key === 'D') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skipBuild, toggleTheme]);

  // Real Visitor Mouse Pointer tracking & hover selection frame
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setVisitorHoverBox(null);
        return;
      }

      const builtTarget = target.closest('[data-build].is-built') as HTMLElement | null;
      if (builtTarget) {
        const rect = builtTarget.getBoundingClientRect();
        if (rect.width > 15 && rect.height > 10 && rect.width < window.innerWidth * 0.98) {
          const type = builtTarget.getAttribute('data-build') || 'Element';
          const tag = type.charAt(0).toUpperCase() + type.slice(1);
          setVisitorHoverBox({
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height,
            tag,
          });
          return;
        }
      }
      setVisitorHoverBox(null);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <LiveBuildContext.Provider
      value={{
        isBuilding: !isCompleted && builtCount < totalElements,
        totalElements,
        builtCount,
        skipBuild,
        replayBuild,
        isCompleted,
        cursors: cursorsRef.current,
        snapGuides,
        visitorHoverBox,
        theme,
        toggleTheme,
        themeRipple,
      }}
    >
      {children}
    </LiveBuildContext.Provider>
  );
};

export const useLiveBuild = () => {
  const context = useContext(LiveBuildContext);
  if (!context) {
    throw new Error('useLiveBuild must be used within a LiveBuildProvider');
  }
  return context;
};
