import { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll.ts';
import { portfolioContent, ProjectItem } from './content.ts';
import { Preloader } from './components/Preloader.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Work } from './components/Work.tsx';
import { Awards } from './components/Awards.tsx';
import { BeforeAfter } from './components/BeforeAfter.tsx';
import { About } from './components/About.tsx';
import { Timeline } from './components/Timeline.tsx';
import { Services } from './components/Services.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { LightboxModal } from './components/LightboxModal.tsx';

export function App() {
  // Initialize Lenis Smooth Scroll
  useSmoothScroll();

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const { personal } = portfolioContent;

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-[#F4F4F5] overflow-x-hidden selection:bg-[#E11D2E] selection:text-white">
      {/* 1. Cinematic Film Grain Noise Overlay (4% opacity) */}
      <div className="film-grain" aria-hidden="true" />

      {/* 2. Top Red Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 3. Custom Dual-Ring Red Cursor */}
      <CustomCursor />

      {/* 4. Preloader (Curtain wipe intro) */}
      {!preloaderDone && (
        <Preloader
          onComplete={() => setPreloaderDone(true)}
          name={personal.name.toUpperCase()}
          role={personal.role.toUpperCase()}
        />
      )}

      {/* 5. Sticky Blurred Glass Navbar */}
      <Navbar firstName={personal.firstName.toUpperCase()} />

      {/* 6. Page Structure in Requested Sequence */}
      <main id="main-content">
        {/* A. Hero Section */}
        <Hero />

        {/* B. Work That Speaks (Selected Work) */}
        <Work onSelectProject={(project) => setActiveModalProject(project)} />

        {/* C. The Recognition (Awards & Honors) */}
        <Awards />

        {/* D. From Raw to Real (Before / After Comparison) */}
        <BeforeAfter />

        {/* E. About — Not just visuals, but storytelling */}
        <About />

        {/* F. Experience Timeline */}
        <Timeline />

        {/* G. Services */}
        <Services />

        {/* H. Testimonials */}
        <Testimonials />

        {/* I. Let's Work Together (Contact) */}
        <Contact onOpenShowreel={(reelItem) => setActiveModalProject(reelItem)} />
      </main>

      {/* J. Footer */}
      <Footer />

      {/* 7. Lightbox Modal for Projects & Showreel */}
      <LightboxModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}

export default App;
