/**
 * =========================================================================
 * PORTFOLIO CONTENT CONFIGURATION
 * =========================================================================
 * You can edit all personal information, projects, awards, experience,
 * and media paths in this single file.
 */

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'Frontend' | 'AI / ML' | 'Full Stack' | 'Commercial' | 'Short Film' | 'Music Video' | 'VFX';
  year: string;
  client: string;
  duration: string;
  description: string;
  aspectRatio?: 'standard' | 'wide' | 'tall';
  thumbnailUrl: string;
  previewVideoUrl?: string;
  videoType: 'youtube' | 'vimeo' | 'mp4';
  videoEmbedUrl: string; // YouTube embed / Vimeo embed / MP4 direct URL
  tools: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  event: string;
  year: string;
  badge?: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  bullets: [string, string];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

export interface BeforeAfterItem {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  rawLabel: string;
  finalLabel: string;
  rawImage: string;
  finalImage: string;
  specs: {
    camera: string;
    codec: string;
    colorSpace: string;
    resolution: string;
  };
}

export const portfolioContent = {
  // -------------------------------------------------------------
  // PERSONAL DETAILS
  // -------------------------------------------------------------
  personal: {
    name: "Abhay Raj Singh",
    firstName: "Abhay",
    lastName: "Singh",
    role: "MCA Student & Frontend Developer | AI/ML",
    email: "imabbhhhay@gmail.com",
    phone: "+91 98765 43210",
    location: "India (Remote / Hybrid)",
    availability: "Available for Frontend & AI/ML opportunities",
    tagline: "Bridging reactive web interfaces with intelligent AI/ML systems.",
    shortIntro: "MCA student and passionate frontend developer leaning towards machine learning and artificial intelligence. I build high-performance web applications, interactive interfaces, and intelligent digital products.",
    quoteCard: {
      quote: "Code is the architecture. Intelligence is the craft.",
      author: "Abhay Raj Singh",
      role: "MCA Student & Frontend Developer"
    },
    stats: [
      { label: "Frontend Projects", value: 20, suffix: "+" },
      { label: "MCA Scholar", value: 2026, suffix: "" },
      { label: "Core Tech Stack", value: 12, suffix: "+" },
      { label: "AI/ML Models & Demos", value: 8, suffix: "+" },
    ],
    socials: [
      { name: "GitHub", url: "https://github.com", handle: "abhayrajsingh" },
      { name: "LinkedIn", url: "https://linkedin.com", handle: "abhay-raj-singh" },
      { name: "LeetCode", url: "https://leetcode.com", handle: "abhayrajsingh" },
      { name: "Twitter / X", url: "https://x.com", handle: "@abhayraj" },
      { name: "Instagram", url: "https://instagram.com", handle: "@abhayrajsingh" },
    ],
    // Portrait image in Hero (transparent cutout recommended)
    heroPortrait: "/assets/hero-portrait.png",
    cvDownloadUrl: "#", // Link to your CV/Resume PDF
    showreelVideoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=0", // Featured showcase for contact tile & hero
  },

  // -------------------------------------------------------------
  // MARQUEE SOFTWARE TICKER
  // -------------------------------------------------------------
  softwareTicker: [
    "REACT.JS",
    "TYPESCRIPT",
    "NEXT.JS",
    "TAILWIND CSS",
    "PYTHON",
    "PYTORCH",
    "TENSORFLOW",
    "SCIKIT-LEARN",
    "FASTAPI",
    "NODE.JS",
    "GSAP",
    "GIT & GITHUB"
  ],

  // -------------------------------------------------------------
  // SELECTED WORKS (8 Projects)
  // -------------------------------------------------------------
  projects: [
    {
      id: "project-1",
      number: "01",
      title: "NeuralCanvas AI",
      category: "AI / ML",
      year: "2025",
      client: "Generative Media Lab",
      duration: "Live Demo",
      description: "Interactive generative AI interface enabling real-time neural style transfer, dynamic canvas diffusion, and GPU-accelerated image synthesis with sub-second feedback.",
      aspectRatio: "wide",
      thumbnailUrl: "/assets/projects/project-1.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["React", "Python", "PyTorch", "FastAPI"]
    },
    {
      id: "project-2",
      number: "02",
      title: "Nexus Analytics OS",
      category: "Frontend",
      year: "2025",
      client: "FinTech Enterprise",
      duration: "Dashboard",
      description: "Ultra-low latency financial analytics platform featuring WebSocket streaming charts, customizable modular grid layouts, and silky smooth GSAP micro-interactions.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-2.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"]
    },
    {
      id: "project-3",
      number: "03",
      title: "VisionLens AI",
      category: "AI / ML",
      year: "2024",
      client: "Computer Vision Initiative",
      duration: "Web App",
      description: "Browser-native real-time object detection and spatial hand tracking powered by lightweight TensorFlow.js models and WebAssembly inference acceleration.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-3.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["TensorFlow.js", "React", "TypeScript", "Python"]
    },
    {
      id: "project-4",
      number: "04",
      title: "Hyperion Interface OS",
      category: "Frontend",
      year: "2024",
      client: "Developer Portfolio",
      duration: "Interactive",
      description: "Figma-inspired collaborative live build engine featuring ghost cursors, real-time typing simulations, selection frames, and hardware-accelerated animations.",
      aspectRatio: "wide",
      thumbnailUrl: "/assets/projects/project-4.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["React", "TypeScript", "GSAP", "Tailwind CSS"]
    },
    {
      id: "project-5",
      number: "05",
      title: "Aura Commerce",
      category: "Frontend",
      year: "2024",
      client: "Luxury Goods Concept",
      duration: "E-Commerce",
      description: "High-performance headless e-commerce store with predictive search, dynamic cart drawer, optimistic UI updates, and Lighthouse 100 benchmark scores.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-5.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS"]
    },
    {
      id: "project-6",
      number: "06",
      title: "AlgoViz Interactive",
      category: "Full Stack",
      year: "2023",
      client: "MCA Academic Project",
      duration: "Educational",
      description: "Comprehensive algorithm visualizer bringing graph traversals, Dijkstra pathfinding, and dynamic programming to life with interactive step controls.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-6.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["React", "TypeScript", "HTML5 Canvas", "Algorithms"]
    },
    {
      id: "project-7",
      number: "07",
      title: "Sentinel NLP Engine",
      category: "AI / ML",
      year: "2023",
      client: "Research Showcase",
      duration: "ML Model",
      description: "Deep learning sentiment analysis and document intelligence pipeline leveraging fine-tuned transformer architectures and FastAPI microservices.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-7.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["PyTorch", "Python", "FastAPI", "Docker"]
    },
    {
      id: "project-8",
      number: "08",
      title: "OmniChat Agent",
      category: "Full Stack",
      year: "2024",
      client: "Autonomous Systems Lab",
      duration: "AI Agent",
      description: "Context-aware conversational AI assistant capable of document Q&A, markdown streaming, and generative component rendering with multi-turn memory.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-8.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Next.js", "LangChain", "OpenAI API", "PostgreSQL"]
    }
  ] as ProjectItem[],

  // -------------------------------------------------------------
  // TECH & INNOVATION HUBS (Marquee Strip)
  // -------------------------------------------------------------
  clients: [
    { name: "NEURAL LABS", tagline: "AI Research" },
    { name: "VERCEL", tagline: "Edge Cloud" },
    { name: "HUGGING FACE", tagline: "Open ML" },
    { name: "ORBIT TECH", tagline: "Frontend OS" },
    { name: "VERTEX DATA", tagline: "Analytics Hub" },
    { name: "INNOVATEX", tagline: "Hackathon Lab" },
    { name: "ACM STUDENT", tagline: "Chapter Tech" },
  ],

  // -------------------------------------------------------------
  // AWARDS & RECOGNITION (10 Honors)
  // -------------------------------------------------------------
  awards: [
    { id: "a-1", title: "1st Place — Web Innovation Hackathon", event: "National Tech Hackathon", year: "2025", badge: "Winner" },
    { id: "a-2", title: "Best AI/ML Application", event: "Smart India Developer Challenge", year: "2025", badge: "Gold Award" },
    { id: "a-3", title: "Dean's Merit Scholar — MCA", event: "University Academic Honors", year: "2024", badge: "Top 1%" },
    { id: "a-4", title: "Best UI/UX & Frontend Architecture", event: "InnovateX Tech Fest", year: "2024", badge: "1st Place" },
    { id: "a-5", title: "Outstanding Project Award (Computer Vision)", event: "AI Summit Showcase", year: "2024", badge: "Special Jury" },
    { id: "a-6", title: "1st Place — Algorithm Coding Sprint", event: "Campus Tech Olympiad", year: "2023", badge: "Champion" },
    { id: "a-7", title: "Distinction Graduate — BCA", event: "University Convocation", year: "2024", badge: "Gold Medal" },
    { id: "a-8", title: "Finalist — National AI Buildathon", event: "Open Innovation Summit", year: "2023", badge: "Finalist" },
    { id: "a-9", title: "Open Source Contributor Recognition", event: "Global Developer Ecosystem", year: "2023", badge: "Honoree" },
    { id: "a-10", title: "Academic Excellence in Computer Science", event: "Department of Computer Applications", year: "2022", badge: "Excellence" }
  ] as AwardItem[],

  // -------------------------------------------------------------
  // FROM RAW TO REAL (Before / After Comparison Sliders)
  // -------------------------------------------------------------
  beforeAfterComparisons: [
    {
      id: "comp-1",
      tabLabel: "Cyberpunk City",
      title: "Atmospheric City Grade & Sky Composite",
      description: "Transformation from a flat, desaturated LogC capture into a rich, contrasty cyberpunk night aesthetic with bloom highlights and cyan-magenta split tones.",
      rawLabel: "RAW LOG",
      finalLabel: "ACES FINAL",
      rawImage: "/assets/before-after/cyberpunk-raw.jpg",
      finalImage: "/assets/before-after/cyberpunk-final.jpg",
      specs: {
        camera: "ARRI Alexa Mini LF",
        codec: "ProRes 4444 XQ (LogC3)",
        colorSpace: "ACEScc / Rec.709",
        resolution: "4448 x 3096 (2.39:1)"
      }
    },
    {
      id: "comp-2",
      tabLabel: "Sci-Fi Hangar",
      title: "Multi-Plate Matte & CGI Integration",
      description: "Extraction of stage elements, background sky replacement, synthetic volumetric lighting, and subtle camera sensor dirt passes.",
      rawLabel: "RAW STAGE",
      finalLabel: "VFX COMPOSITE",
      rawImage: "/assets/before-after/scifi-raw.jpg",
      finalImage: "/assets/before-after/scifi-final.jpg",
      specs: {
        camera: "RED V-Raptor 8K",
        codec: "REDCODE RAW (IPP2)",
        colorSpace: "REDWideGamutRGB",
        resolution: "8192 x 4320"
      }
    },
    {
      id: "comp-3",
      tabLabel: "Sunset Pursuit",
      title: "High-Speed Car Commercial Color Grade",
      description: "Washed-out midday daylight turned into a moody dusk pursuit scene with targeted wheel flare, road sheen enhancement, and deep shadows.",
      rawLabel: "FLAT PROFILE",
      finalLabel: "HERO GRADE",
      rawImage: "/assets/before-after/carchase-raw.jpg",
      finalImage: "/assets/before-after/carchase-final.jpg",
      specs: {
        camera: "Sony FX9",
        codec: "XAVC-I (S-Log3 / S-Gamut3.Cine)",
        colorSpace: "DaVinci Wide Gamut",
        resolution: "3840 x 2160"
      }
    }
  ] as BeforeAfterItem[],

  // 4-Step Process for Before/After
  processSteps: [
    { step: "01", name: "System Architecture", desc: "Rigorous requirement analysis, data flow modeling, and modern tech stack selection (React, TS, Python)." },
    { step: "02", name: "Frontend Engineering", desc: "Crafting modular, reusable components, reactive state stores, and fluid micro-interactions." },
    { step: "03", name: "AI/ML Integration", desc: "Model fine-tuning, inference pipeline optimization, and seamless REST/WebSocket connectivity." },
    { step: "04", name: "Optimization & Polish", desc: "Lighthouse 100 performance tuning, accessibility audits, and cross-platform responsive mastery." }
  ],

  // -------------------------------------------------------------
  // ABOUT SECTION: SKILLS, METERS, AND TOOLS
  // -------------------------------------------------------------
  about: {
    headingPart1: "FRONTEND PRECISION.",
    headingPart2: "POWERED BY INTELLIGENCE.",
    bioParagraphs: [
      "Currently pursuing my Master of Computer Applications (MCA), I build fast, interactive, and beautifully crafted frontend web applications with modern architectures.",
      "My passion lies at the intersection of reactive user interfaces and Artificial Intelligence / Machine Learning. I enjoy bridging complex algorithms, neural networks, and computer science theory into intuitive, accessible web products.",
      "From engineering responsive React & TypeScript platforms to experimenting with PyTorch models, LLMs, and real-time data pipelines, I strive to write clean, maintainable code with exceptional visual polish."
    ],
    skills: [
      { name: "Frontend Development (React, Next.js, TS)", percentage: 95 },
      { name: "Interactive UI & Web Animations (Tailwind, GSAP)", percentage: 92 },
      { name: "Python & Machine Learning Foundations", percentage: 82 },
      { name: "Data Structures & Algorithms (MCA Core)", percentage: 88 },
      { name: "AI APIs & Intelligent Integrations", percentage: 85 },
      { name: "RESTful APIs & Backend Connectivity", percentage: 80 },
    ],
    tools: [
      { name: "React / Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Language" },
      { name: "Python", category: "AI / ML" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "PyTorch / Scikit", category: "Machine Learning" },
      { name: "Node.js / FastAPI", category: "Backend / API" },
      { name: "Git / GitHub", category: "Version Control" },
      { name: "Figma", category: "UI/UX Design" },
    ]
  },

  // -------------------------------------------------------------
  // VERTICAL TIMELINE (Experience)
  // -------------------------------------------------------------
  experience: [
    {
      id: "exp-1",
      period: "2024 – PRESENT",
      role: "MCA Student & Frontend Developer",
      company: "Master of Computer Applications",
      location: "India",
      bullets: [
        "Advanced graduate coursework in Computer Science, Distributed Systems, Software Engineering, and AI/ML algorithms.",
        "Developing production-grade React & TypeScript applications and exploring generative AI & deep learning architectures."
      ]
    },
    {
      id: "exp-2",
      period: "2023 – 2024",
      role: "Frontend Developer & AI Explorer",
      company: "Independent Projects & Open Source",
      location: "Remote",
      bullets: [
        "Architected responsive, accessible web applications utilizing React, Next.js, Tailwind CSS, and state management libraries.",
        "Integrated machine learning microservices and modern LLM APIs to create smart interactive tools."
      ]
    },
    {
      id: "exp-3",
      period: "2021 – 2024",
      role: "Bachelor of Computer Applications (BCA)",
      company: "University / College",
      location: "India",
      bullets: [
        "Graduated with Distinction; strong foundation in OOP, DBMS, Data Structures, Web Development, and Applied Mathematics.",
        "Created full-stack capstone projects and led student technical initiatives and hackathon teams."
      ]
    }
  ] as TimelineItem[],

  // -------------------------------------------------------------
  // SERVICES (4 Cards)
  // -------------------------------------------------------------
  services: [
    {
      id: "srv-1",
      number: "01",
      title: "Frontend Engineering",
      shortDesc: "Pixel-perfect, high-performance web applications built with React, Next.js, and TypeScript, engineered for speed, SEO, and responsiveness.",
      icon: "Code2"
    },
    {
      id: "srv-2",
      number: "02",
      title: "AI / ML Integration",
      shortDesc: "Connecting modern frontend apps with intelligent models, Python backends, predictive algorithms, and generative AI interfaces.",
      icon: "Brain"
    },
    {
      id: "srv-3",
      number: "03",
      title: "Interactive UI & Motion",
      shortDesc: "Engaging digital experiences using GSAP, Framer Motion, and Tailwind CSS to transform static interfaces into dynamic stories.",
      icon: "Sparkles"
    },
    {
      id: "srv-4",
      number: "04",
      title: "Full-Stack API Solutions",
      shortDesc: "Robust client-server integration, clean REST/FastAPI endpoints, database design, and end-to-end type safety.",
      icon: "Layers"
    }
  ] as ServiceItem[],

  // -------------------------------------------------------------
  // TESTIMONIALS (Auto-sliding Carousel)
  // -------------------------------------------------------------
  testimonials: [
    {
      id: "test-1",
      quote: "Abhay has an exceptional knack for building clean, reactive frontends. His ability to grasp both algorithmic concepts and modern web architecture is outstanding.",
      name: "Dr. K. Sharma",
      role: "Professor & Academic Guide",
      company: "Department of Computer Applications",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-2",
      quote: "Working with Abhay on our AI-powered web platform was seamless. He delivers clean code, polished UI animations, and always thinks ahead on system scalability.",
      name: "Rohan Verma",
      role: "Lead Full-Stack Engineer",
      company: "Tech Innovators Lab",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-3",
      quote: "Abhay bridges the gap between design aesthetic, frontend engineering, and machine learning remarkably well. Highly driven and detail-oriented.",
      name: "Priya Nair",
      role: "Product Designer",
      company: "UX & Creative Collective",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ] as TestimonialItem[],

  // -------------------------------------------------------------
  // CONTACT & FOOTER
  // -------------------------------------------------------------
  contact: {
    heading: "LET'S BUILD TOGETHER.",
    subheading: "Have a frontend project, an AI/ML concept, or an innovative web application you'd like to collaborate on? Drop a message and let's create something extraordinary.",
    projectTypes: [
      "Frontend Web Application (React / Next.js)",
      "AI / Machine Learning Web Integration",
      "Interactive UI / Web Animation (GSAP)",
      "Full-Stack Web Development",
      "Internship / Full-time Opportunity",
      "Open Source Collaboration"
    ],
    budgetRanges: [
      "< $1,000",
      "$1,000 – $3,000",
      "$3,000 – $5,000",
      "Discuss Opportunity"
    ],
    showreelTile: {
      tag: "FEATURED SHOWCASE",
      title: "EXPLORE THE INTERFACE.",
      duration: "Live",
      subtext: "Click to explore featured portfolio demo"
    }
  }
};

export default portfolioContent;

