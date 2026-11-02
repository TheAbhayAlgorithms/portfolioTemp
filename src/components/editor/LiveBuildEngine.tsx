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
}

const LiveBuildContext = createContext<LiveBuildContextType | null>(null);

const SESSION_KEY = 'portfolio_live_build_completed_v3';

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

  // 5 Ghost Cursors: Aria (teal), Dev (pink), Maya (orange), Kai (purple), Sam (white)
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
    const originalHTML = el.innerHTML;
    const textContent = el.textContent || '';
    if (!textContent.trim() || el.children.length > 5) {
      onDone();
      return;
    }

    el.classList.add('is-typing');

    // Split text into span characters
    const chars = textContent.split('');
    el.innerHTML = '';
    const spanElements: HTMLSpanElement[] = [];

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.className = 'build-char';
      span.textContent = char;
      el.appendChild(span);
      spanElements.push(span);
    });

    const caret = document.createElement('span');
    caret.className = 'build-caret';
    el.appendChild(caret);

    let idx = 0;
    const speed = Math.max(12, Math.min(26, 450 / (chars.length || 1)));

    const interval = setInterval(() => {
      if (idx < spanElements.length) {
        spanElements[idx].classList.add('typed');
        idx++;
      } else {
        clearInterval(interval);
        if (caret.parentNode) caret.parentNode.removeChild(caret);
        el.innerHTML = originalHTML; // restore full HTML with formatting
        el.classList.remove('is-typing');
        onDone();
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

    // Phase 1: Travel cursor to rect top-left along curved path with overshoot
    cursor.actionText = `drawFrame ${Math.round(initialRect.width)}×${Math.round(initialRect.height)}`;

    const startX = cursor.x;
    const startY = cursor.y;
    const travelObj = { p: 0 };

    gsap.to(travelObj, {
      p: 1,
      duration: 0.5,
      ease: 'power3.inOut',
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
        // Slight organic perpendicular arc
        const arc = Math.sin(travelObj.p * Math.PI) * Math.min(45, dist * 0.12);
        cursor.x = startX + (tX - startX) * travelObj.p - (dy / (dist || 1)) * arc;
        cursor.y = startY + (tY - startY) * travelObj.p + (dx / (dist || 1)) * arc;

        setRenderTrigger((n) => n + 1);
      },
      onComplete: () => {
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
        setTimeout(() => setSnapGuides([]), 280);

        // Phase 3: Drag diagonally to rect bottom-right
        const dragObj = { p: 0 };

        gsap.to(dragObj, {
          p: 1,
          duration: 0.55,
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
              // Fade frame handles and chip
              if (cursor.activeFrame) {
                gsap.to(cursor.activeFrame, {
                  opacity: 0,
                  duration: 0.2,
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
              setTimeout(finishElement, 350);
            } else if (type === 'button') {
              cursor.actionText = 'colorFill #E11D2E';
              el.classList.add('build-button-wipe');
              setTimeout(finishElement, 300);
            } else if (type === 'repeated') {
              cursor.actionText = 'Ctrl+D Stamp';
              el.classList.add('build-stamp');
              setTimeout(finishElement, 250);
            } else if (type === 'line') {
              cursor.actionText = 'Pen tool draw';
              setTimeout(finishElement, 250);
            } else if (type === 'big-text') {
              cursor.actionText = 'resize 100%';
              gsap.fromTo(el, { scale: 0.8 }, { scale: 1, duration: 0.35, ease: 'back.out(1.5)', onComplete: finishElement });
            } else {
              setTimeout(finishElement, 200);
            }
          },
        });
      },
    });
  }, []);

  // Scheduler Loop: Assigns free cursors to queued elements (up to 3 parallel builds)
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
    }, 60);

    return () => clearInterval(interval);
  }, [executeBuild, isCompleted]);

  // Idle Cursor gentle ambient drift
  useEffect(() => {
    if (isCompleted) return;

    const driftInterval = setInterval(() => {
      cursorsRef.current.forEach((cursor) => {
        if (!cursor.busy) {
          const deltaX = (Math.random() - 0.5) * 50;
          const deltaY = (Math.random() - 0.5) * 35;
          cursor.x = Math.max(40, Math.min(window.innerWidth - 60, cursor.x + deltaX));
          cursor.y = Math.max(40, Math.min(window.innerHeight - 60, cursor.y + deltaY));
        }
      });
      setRenderTrigger((n) => n + 1);
    }, 2000);

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
    document.querySelectorAll('[data-build]').forEach((el) => el.classList.add('is-built'));
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
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setBuiltCount(0);

    const allElements = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'));
    allElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    setRenderTrigger((n) => n + 1);
  }, []);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCompletedRef.current) {
        skipBuild();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skipBuild]);

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
