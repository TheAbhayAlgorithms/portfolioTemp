import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type BuildActionType =
  | 'drawFrame'
  | 'placeText'
  | 'dropImage'
  | 'dragMove'
  | 'resize'
  | 'colorFill'
  | 'drawLine'
  | 'duplicate'
  | 'nameTag';

export type GhostCursorName = 'Aria' | 'Dev' | 'Maya' | 'Kai' | 'Sam';

export interface GhostCursorState {
  name: GhostCursorName;
  color: string;
  x: number; // percentage or px
  y: number;
  isClicking: boolean;
  actionLabel?: string;
  visible: boolean;
}

export interface ActiveBuildStep {
  id: string;
  action: BuildActionType;
  cursor: GhostCursorName;
  elementId: string;
  label: string;
  dimensions?: { width: number; height: number };
  tag?: string;
  typedText?: string;
}

interface BuildSequenceContextType {
  isBuilding: boolean;
  isCompleted: boolean;
  progress: number;
  currentStep: ActiveBuildStep | null;
  builtElements: Set<string>;
  isElementBuilt: (id: string) => boolean;
  ghostCursors: Record<GhostCursorName, GhostCursorState>;
  snapGuides: { x?: number; y?: number; spacing?: string } | null;
  activeDimensions: { width: number; height: number; x: number; y: number } | null;
  skipBuild: () => void;
  replayBuild: () => void;
  registerBuildTrigger: (sectionId: string) => void;
  activeSection: string;
}

const BuildSequenceContext = createContext<BuildSequenceContextType | null>(null);

const SESSION_KEY = 'portfolio_build_completed_v2';

const INITIAL_CURSORS: Record<GhostCursorName, GhostCursorState> = {
  Aria: { name: 'Aria', color: '#00E5FF', x: 20, y: 30, isClicking: false, visible: true },
  Dev: { name: 'Dev', color: '#FF3B81', x: 75, y: 25, isClicking: false, visible: true },
  Maya: { name: 'Maya', color: '#FF8A00', x: 80, y: 15, isClicking: false, visible: true },
  Kai: { name: 'Kai', color: '#A855F7', x: 30, y: 60, isClicking: false, visible: true },
  Sam: { name: 'Sam', color: '#FFFFFF', x: 50, y: 40, isClicking: false, visible: true },
};

export const BuildSequenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isBuilding, setIsBuilding] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const [progress, setProgress] = useState<number>(0);
  const [builtElements, setBuiltElements] = useState<Set<string>>(new Set());
  const [ghostCursors, setGhostCursors] = useState<Record<GhostCursorName, GhostCursorState>>(INITIAL_CURSORS);
  const [currentStep, setCurrentStep] = useState<ActiveBuildStep | null>(null);
  const [snapGuides, setSnapGuides] = useState<{ x?: number; y?: number; spacing?: string } | null>(null);
  const [activeDimensions, setActiveDimensions] = useState<{ width: number; height: number; x: number; y: number } | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to mark an element as finished building
  const markElementBuilt = useCallback((id: string) => {
    setBuiltElements((prev) => new Set([...prev, id]));
  }, []);

  const isElementBuilt = useCallback(
    (id: string) => {
      if (isCompleted) return true;
      return builtElements.has(id);
    },
    [isCompleted, builtElements]
  );

  // Skip build function
  const skipBuild = useCallback(() => {
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    setIsBuilding(false);
    setIsCompleted(true);
    setProgress(100);
    setCurrentStep(null);
    setSnapGuides(null);
    setActiveDimensions(null);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // ignore
    }
  }, []);

  // Replay build function
  const replayBuild = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setBuiltElements(new Set());
    setIsCompleted(false);
    setIsBuilding(true);
    setProgress(0);
    setCurrentStep(null);
    setGhostCursors(INITIAL_CURSORS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update cursor position with micro-jitter
  const moveCursor = useCallback((name: GhostCursorName, x: number, y: number, actionLabel?: string, click = false) => {
    // Add subtle organic micro-jitter (±0.4%)
    const jitterX = (Math.random() - 0.5) * 0.8;
    const jitterY = (Math.random() - 0.5) * 0.8;

    setGhostCursors((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        x: Math.max(2, Math.min(98, x + jitterX)),
        y: Math.max(2, Math.min(98, y + jitterY)),
        actionLabel,
        isClicking: click,
        visible: true,
      },
    }));
  }, []);

  // Scripted Director sequence for initial load (Navbar + Hero + Top Marquee)
  useEffect(() => {
    if (isCompleted || !isBuilding) return;

    // Check if screen is mobile (<768px) or prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      // Fast path for mobile/reduced motion
      const quickTimer = setTimeout(() => {
        skipBuild();
      }, 1200);
      return () => clearTimeout(quickTimer);
    }

    // Full scripted director for desktop
    const scriptSteps = [
      // Step 1: Canvas start (0.05s)
      {
        delay: 50,
        run: () => {
          setProgress(10);
          moveCursor('Maya', 15, 6, 'drawFrame navbar');
        },
      },
      // Step 2: Navbar frame drawn (0.45s)
      {
        delay: 450,
        run: () => {
          setProgress(20);
          markElementBuilt('nav-bar');
          moveCursor('Aria', 8, 5, 'placeText logo', true);
        },
      },
      // Step 3: Logo typed & links duplicated (0.9s)
      {
        delay: 900,
        run: () => {
          setProgress(28);
          markElementBuilt('nav-logo');
          markElementBuilt('nav-links');
          markElementBuilt('nav-hire');
          moveCursor('Dev', 50, 5, 'duplicate links', false);
          moveCursor('Sam', 88, 5, 'colorFill #E11D2E', true);
        },
      },
      // Step 4: Navbar completed, Hero greeting (1.4s)
      {
        delay: 1400,
        run: () => {
          setProgress(38);
          markElementBuilt('hero-greeting');
          markElementBuilt('hero-bg-text');
          moveCursor('Aria', 25, 22, 'placeText "Hello, I\'m"', true);
        },
      },
      // Step 5: Huge "PORTFOLIO" placed & Name typed (2.0s)
      {
        delay: 2000,
        run: () => {
          setProgress(50);
          markElementBuilt('hero-name');
          moveCursor('Dev', 28, 30, 'placeText "ALEX MERCER"', true);
          moveCursor('Kai', 75, 35, 'drawFrame 420x560', false);
          setSnapGuides({ x: 28, spacing: '48px' });
        },
      },
      // Step 6: Cutout portrait dropped & red rim glow wiped (2.7s)
      {
        delay: 2700,
        run: () => {
          setProgress(65);
          setSnapGuides(null);
          markElementBuilt('hero-portrait');
          moveCursor('Sam', 75, 42, 'dropImage 4K RAW', true);
          moveCursor('Maya', 70, 38, 'colorFill red-glow', false);
        },
      },
      // Step 7: Role tags & buttons aligned (3.4s)
      {
        delay: 3400,
        run: () => {
          setProgress(78);
          markElementBuilt('hero-tags');
          markElementBuilt('hero-buttons');
          moveCursor('Dev', 24, 40, 'dragMove [EDITOR & VFX]', false);
          moveCursor('Aria', 22, 50, 'drawFrame Button', true);
          moveCursor('Kai', 35, 50, 'drawFrame Button', true);
          setSnapGuides({ x: 22, y: 50, spacing: '16px' });
        },
      },
      // Step 8: Stats stamped & Marquee line drawn (4.1s)
      {
        delay: 4100,
        run: () => {
          setProgress(88);
          setSnapGuides(null);
          markElementBuilt('hero-stats');
          markElementBuilt('hero-marquee');
          moveCursor('Sam', 85, 40, 'duplicate stats', true);
          moveCursor('Kai', 50, 62, 'drawLine software-strip', true);
        },
      },
      // Step 9: Selected Work cards & client logos stamped (4.7s)
      {
        delay: 4700,
        run: () => {
          setProgress(96);
          markElementBuilt('work-section');
          markElementBuilt('work-cards');
          markElementBuilt('work-logos');
          moveCursor('Aria', 30, 75, 'drawFrame Card 01', true);
          moveCursor('Dev', 60, 75, 'drawFrame Card 02', true);
          moveCursor('Maya', 80, 75, 'drawFrame Card 03', true);
        },
      },
      // Step 10: Finale - All cursors converge and unveil (5.4s)
      {
        delay: 5400,
        run: () => {
          setProgress(100);
          moveCursor('Aria', 50, 50, 'Finished', false);
          moveCursor('Dev', 50, 50, 'Finished', false);
          moveCursor('Maya', 50, 50, 'Finished', false);
          moveCursor('Kai', 50, 50, 'Finished', false);
          moveCursor('Sam', 50, 50, 'Finished', false);

          setTimeout(() => {
            skipBuild();
          }, 600);
        },
      },
    ];

    const timeouts = scriptSteps.map((step) =>
      setTimeout(() => {
        step.run();
      }, step.delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isBuilding, isCompleted, markElementBuilt, moveCursor, skipBuild]);

  // Viewport trigger for sections when scrolling
  const registerBuildTrigger = useCallback(
    (sectionId: string) => {
      if (isCompleted) return;
      setActiveSection(sectionId);
      markElementBuilt(sectionId);
    },
    [isCompleted, markElementBuilt]
  );

  return (
    <BuildSequenceContext.Provider
      value={{
        isBuilding,
        isCompleted,
        progress,
        currentStep,
        builtElements,
        isElementBuilt,
        ghostCursors,
        snapGuides,
        activeDimensions,
        skipBuild,
        replayBuild,
        registerBuildTrigger,
        activeSection,
      }}
    >
      {children}
    </BuildSequenceContext.Provider>
  );
};

export const useBuildSequence = (): BuildSequenceContextType => {
  const context = useContext(BuildSequenceContext);
  if (!context) {
    return {
      isBuilding: false,
      isCompleted: true,
      progress: 100,
      currentStep: null,
      builtElements: new Set(),
      isElementBuilt: () => true,
      ghostCursors: INITIAL_CURSORS,
      snapGuides: null,
      activeDimensions: null,
      skipBuild: () => {},
      replayBuild: () => {},
      registerBuildTrigger: () => {},
      activeSection: 'hero',
    };
  }
  return context;
};
