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
  category: 'Commercial' | 'Short Film' | 'Music Video' | 'VFX';
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
    // Replace "Alex Mercer" with your real name
    name: "Alex Mercer",
    firstName: "Alex",
    lastName: "Mercer",
    role: "Video Editor & VFX Artist",
    email: "imabbhhhay@gmail.com",
    phone: "+91 98765 43210",
    location: "India (Remote / Worldwide)",
    availability: "Available for freelance & select productions",
    tagline: "I turn raw footage into stories people feel.",
    shortIntro: "Editor and VFX artist with 10+ years crafting commercials, short films and music videos. I blend sharp storytelling with cinematic visuals.",
    quoteCard: {
      quote: "A good edit is invisible. A great one is felt.",
      author: "Alex Mercer",
      role: "Editor & VFX Artist"
    },
    stats: [
      { label: "Years Experience", value: 10, suffix: "+" },
      { label: "Projects Completed", value: 150, suffix: "+" },
      { label: "Festival Awards", value: 10, suffix: "" },
      { label: "Combined Views", value: 25, suffix: "M+" },
    ],
    socials: [
      { name: "Instagram", url: "https://instagram.com", handle: "@alexmercer.edit" },
      { name: "YouTube", url: "https://youtube.com", handle: "Alex Mercer Post" },
      { name: "Vimeo", url: "https://vimeo.com", handle: "alexmercer" },
      { name: "LinkedIn", url: "https://linkedin.com", handle: "alex-mercer" },
      { name: "Behance", url: "https://behance.net", handle: "alexmercer" },
    ],
    // Portrait image in Hero (transparent cutout recommended)
    heroPortrait: "/assets/hero-portrait.png",
    cvDownloadUrl: "#", // Link to your CV/Resume PDF
    showreelVideoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=0", // Featured showreel for contact tile & hero
  },

  // -------------------------------------------------------------
  // MARQUEE SOFTWARE TICKER
  // -------------------------------------------------------------
  softwareTicker: [
    "PREMIERE PRO",
    "AFTER EFFECTS",
    "DAVINCI RESOLVE",
    "BLENDER",
    "NUKE",
    "PHOTOSHOP",
    "CINEMA 4D",
    "UNREAL ENGINE"
  ],

  // -------------------------------------------------------------
  // SELECTED WORKS (8 Projects)
  // -------------------------------------------------------------
  projects: [
    {
      id: "project-1",
      number: "01",
      title: "Neon Nights",
      category: "Music Video",
      year: "2025",
      client: "Sony Music / Orbit Sound",
      duration: "03:45",
      description: "High-tempo cyberpunk music video featuring complex rhythmic cuts, neon volumetric glow passes, and dynamic speed-ramped transitions synchronized to sub-bass transients.",
      aspectRatio: "wide",
      thumbnailUrl: "/assets/projects/project-1.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"]
    },
    {
      id: "project-2",
      number: "02",
      title: "Ascend",
      category: "Commercial",
      year: "2025",
      client: "Magna Tech Wear",
      duration: "01:00",
      description: "Futuristic apparel launch commercial combining live-action macro fabric textures with 3D wireframe simulations and cinematic sound design.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-2.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["After Effects", "Cinema 4D", "DaVinci Resolve"]
    },
    {
      id: "project-3",
      number: "03",
      title: "Echoes of Rain",
      category: "Short Film",
      year: "2024",
      client: "Apex Independent Cinema",
      duration: "14:20",
      description: "Moody psychological drama set during a storm. Precise pacing, deep shadow recovery in ACES color pipeline, and atmospheric particle rain compositing.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-3.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Premiere Pro", "DaVinci Resolve", "Nuke"]
    },
    {
      id: "project-4",
      number: "04",
      title: "Skyline Rush",
      category: "VFX",
      year: "2024",
      client: "Pixelcraft Studios",
      duration: "02:15",
      description: "Complete visual effects breakdown demonstrating camera tracking, matte painting sky replacement, photorealistic smoke simulations, and final film grain integration.",
      aspectRatio: "wide",
      thumbnailUrl: "/assets/projects/project-4.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Nuke", "Blender", "After Effects"]
    },
    {
      id: "project-5",
      number: "05",
      title: "Pulse",
      category: "Music Video",
      year: "2024",
      client: "Visionary Records",
      duration: "04:10",
      description: "Hypnotic strobe-lit electronic performance with glitch typography, thermal camera treatments, and seamless match-cuts.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-5.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Premiere Pro", "After Effects"]
    },
    {
      id: "project-6",
      number: "06",
      title: "Iron Veil",
      category: "Short Film",
      year: "2023",
      client: "Darkroom Pictures",
      duration: "01:45",
      description: "High-intensity dystopian teaser trailer. Punchy editorial syncopation, bespoke title sequence typography, and gritty 35mm film emulation.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-6.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["DaVinci Resolve", "After Effects"]
    },
    {
      id: "project-7",
      number: "07",
      title: "Drift",
      category: "Commercial",
      year: "2023",
      client: "Vertex Automotive",
      duration: "00:45",
      description: "Adrenaline-fueled sports car commercial featuring anamorphic lens flares, dynamic speed warping, asphalt particle enhancements, and golden hour grade.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-7.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Premiere Pro", "DaVinci Resolve", "Blender"]
    },
    {
      id: "project-8",
      number: "08",
      title: "Afterglow",
      category: "Commercial",
      year: "2022",
      client: "Lumen Documentary Initiative",
      duration: "08:30",
      description: "Poetic archival documentary cut balancing fragile historical 8mm film scans with crisp modern 8K cinema footage.",
      aspectRatio: "standard",
      thumbnailUrl: "/assets/projects/project-8.jpg",
      previewVideoUrl: "/assets/projects/sample-preview.webm",
      videoType: "youtube",
      videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      tools: ["Premiere Pro", "DaVinci Resolve"]
    }
  ] as ProjectItem[],

  // -------------------------------------------------------------
  // CLIENT BRANDS (Marquee Strip)
  // -------------------------------------------------------------
  clients: [
    { name: "NOVA", tagline: "Creative Studio" },
    { name: "MAGNA", tagline: "Apparel Tech" },
    { name: "RAINFALL", tagline: "Production Co." },
    { name: "ORBIT", tagline: "Sound & Music" },
    { name: "VERTEX", tagline: "Automotive" },
    { name: "PIXELCRAFT", tagline: "VFX Works" },
    { name: "LUMEN", tagline: "Media Agency" },
  ],

  // -------------------------------------------------------------
  // AWARDS & RECOGNITION (10 Awards)
  // -------------------------------------------------------------
  awards: [
    { id: "a-1", title: "1st Place", event: "National Short Film Festival", year: "2025", badge: "Winner" },
    { id: "a-2", title: "Best Editing", event: "Indie Film Awards", year: "2025", badge: "Gold Laurels" },
    { id: "a-3", title: "Best Short Film", event: "City Film Fest", year: "2024", badge: "Grand Jury" },
    { id: "a-4", title: "Best Music Video", event: "Vision Awards", year: "2024", badge: "Trophy" },
    { id: "a-5", title: "1st Place, Competency Event", event: "Regional Media Competition", year: "2023", badge: "1st Place" },
    { id: "a-6", title: "1st Place, Short Film", event: "Campus Film Fest", year: "2023", badge: "Winner" },
    { id: "a-7", title: "Best Visual Effects", event: "Indie Film Awards", year: "2022", badge: "VFX Gold" },
    { id: "a-8", title: "Finalist", event: "International Motion Awards", year: "2022", badge: "Official Selection" },
    { id: "a-9", title: "Best Creative Content", event: "Digital Creator Awards", year: "2021", badge: "Honoree" },
    { id: "a-10", title: "Best Student Film", event: "Film Academy Showcase", year: "2021", badge: "Excellence" }
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
    { step: "01", name: "Ingest & Conforming", desc: "Rigorous metadata verification, RAW sensor debayering, and ACES / Log color space alignment." },
    { step: "02", name: "Editorial & Pacing", desc: "Crafting the heartbeat of the edit. Micro-trimming frames to sync emotional beats and musical cadence." },
    { step: "03", name: "VFX & Compositing", desc: "3D camera tracking, clean plate generation, CGI multipass merging, and atmospheric volumetrics." },
    { step: "04", name: "Master Color & Sound", desc: "Precision secondary color isolation, film emulsion emulation, and Dolby-calibrated audio mastering." }
  ],

  // -------------------------------------------------------------
  // ABOUT SECTION: SKILLS, METERS, AND TOOLS
  // -------------------------------------------------------------
  about: {
    headingPart1: "NOT JUST VISUALS.",
    headingPart2: "A WAY OF STORYTELLING.",
    bioParagraphs: [
      "Every cut is a conscious decision of emotion, rhythm, and tension. For over a decade, I've lived at the intersection of cinematic storytelling and cutting-edge visual effects.",
      "From multi-million view music videos to high-stakes commercial spots and festival-winning narrative shorts, my approach treats footage not just as frames on a timeline, but as living architecture for psychological immersion.",
      "Whether collaborating on set as a VFX supervisor or locked in the edit suite fine-tuning micro-frames, my goal is always the same: make the visual craft disappear so the audience only feels the story."
    ],
    skills: [
      { name: "Video Editing & Narrative Flow", percentage: 95 },
      { name: "VFX & Node Compositing", percentage: 90 },
      { name: "Cinematic Color Grading (ACES)", percentage: 88 },
      { name: "Motion Graphics & Kinetic Type", percentage: 85 },
      { name: "Sound Design & Audio Sweetening", percentage: 75 },
      { name: "3D CGI & Particle Simulation", percentage: 70 },
    ],
    tools: [
      { name: "Premiere Pro", category: "NLE Edit" },
      { name: "After Effects", category: "Motion / VFX" },
      { name: "DaVinci Resolve", category: "Color & Fairlight" },
      { name: "Nuke", category: "Node Compositing" },
      { name: "Blender", category: "3D CGI" },
      { name: "Photoshop", category: "Matte Painting" },
      { name: "Cinema 4D", category: "3D Motion" },
      { name: "Audition / ProTools", category: "Sound Design" },
    ]
  },

  // -------------------------------------------------------------
  // VERTICAL TIMELINE (Experience)
  // -------------------------------------------------------------
  experience: [
    {
      id: "exp-1",
      period: "2023 – PRESENT",
      role: "Senior Editor & VFX Artist",
      company: "Freelance / Global Productions",
      location: "Remote / On-site",
      bullets: [
        "Leading end-to-end post-production for high-profile commercial campaigns, narrative short films, and music videos.",
        "Engineered ACES color workflows and node-based VFX composites that reduced review turnaround cycles by 35%."
      ]
    },
    {
      id: "exp-2",
      period: "2020 – 2023",
      role: "VFX Artist & Compositor",
      company: "Pixelcraft Studios",
      location: "Hybrid",
      bullets: [
        "Supervised complex sequence cleanups, green screen keying, planar tracking, and photorealistic 3D asset integration.",
        "Collaborated with directors to establish visual grammar for futuristic digital environments and action sequences."
      ]
    },
    {
      id: "exp-3",
      period: "2018 – 2020",
      role: "Video Editor",
      company: "Lumen Media",
      location: "Studio",
      bullets: [
        "Cut over 60 commercial spots, branded documentaries, and digital promotional packages for high-growth tech brands.",
        "Pioneered high-velocity editorial templates and audio-reactive pacing methodologies."
      ]
    },
    {
      id: "exp-4",
      period: "2016 – 2018",
      role: "Content Creator & Editor",
      company: "Self-employed",
      location: "Independent",
      bullets: [
        "Grew cinematic video channels to millions of aggregate views through relentless experimentation with narrative rhythm.",
        "Handled the entire production stack: lighting, cinematography, editing, color grading, and final delivery."
      ]
    },
    {
      id: "exp-5",
      period: "2012 – 2016",
      role: "B.Sc. in Animation & Multimedia",
      company: "University of Media Arts",
      location: "Academic",
      bullets: [
        "Rigorous foundation in film theory, classical cinematography, digital compositing mathematics, and narrative rhythm.",
        "Graduated with Top Honors for final senior thesis VFX short film."
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
      title: "Video Editing",
      shortDesc: "Rhythm-driven narrative cuts, seamless match-cuts, and surgical pacing designed to keep eyes locked from the first frame to the last.",
      icon: "Film"
    },
    {
      id: "srv-2",
      number: "02",
      title: "VFX & Compositing",
      shortDesc: "Photorealistic CGI integration, camera tracking, plate cleanups, digital sky replacements, and atmospheric volume effects.",
      icon: "Sparkles"
    },
    {
      id: "srv-3",
      number: "03",
      title: "Color Grading",
      shortDesc: "Mood-defining ACES color science, bespoke film stock emulation, precise secondary skin isolation, and dramatic tone curve sculpting.",
      icon: "Palette"
    },
    {
      id: "srv-4",
      number: "04",
      title: "Motion Graphics",
      shortDesc: "Futuristic UI/HUD overlays, kinetic typography, sleek title sequences, and graphic brand identities rendered in motion.",
      icon: "Layers"
    }
  ] as ServiceItem[],

  // -------------------------------------------------------------
  // TESTIMONIALS (Auto-sliding Carousel)
  // -------------------------------------------------------------
  testimonials: [
    {
      id: "test-1",
      quote: "Alex possesses a rare intuition for pacing and rhythm. He transformed our raw footage into an award-winning commercial that exceeded all stakeholder expectations.",
      name: "Marcus Vance",
      role: "Creative Director",
      company: "Nova Creative",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-2",
      quote: "The VFX work was simply pristine. Flawless tracking, photoreal compositing, and delivered ahead of our festival lock deadline. A true creative partner.",
      name: "Elena Rostova",
      role: "Director & Producer",
      company: "Apex Independent Films",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-3",
      quote: "Working with Alex felt effortless. His color grading gave our music video the exact gritty, nostalgic film look we had spent months trying to describe.",
      name: "Jordan Kael",
      role: "Recording Artist & Label Head",
      company: "Orbit Sound",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ] as TestimonialItem[],

  // -------------------------------------------------------------
  // CONTACT & FOOTER
  // -------------------------------------------------------------
  contact: {
    heading: "LET'S WORK TOGETHER.",
    subheading: "Have a project in mind, a film to cut, or a vision that needs high-end visual execution? Drop a line and let's craft something unforgettable.",
    projectTypes: [
      "Commercial / Brand Campaign",
      "Short Film / Feature Post",
      "Music Video",
      "VFX & Compositing Work",
      "Color Grading Suite",
      "Full Post-Production Package"
    ],
    budgetRanges: [
      "< $2,500",
      "$2,500 – $5,000",
      "$5,000 – $10,000",
      "$10,000+"
    ],
    showreelTile: {
      tag: "FEATURED SHOWREEL",
      title: "MAKE IT FEEL REAL.",
      duration: "02:24",
      subtext: "Click to launch director's 4K showreel"
    }
  }
};

export default portfolioContent;

