# Cinematic Video Editor & VFX Artist Portfolio

A dark, high-contrast, editorial, agency-grade personal portfolio website crafted for a **Video Editor & VFX Artist**. Built with **Vite, React, TypeScript, Tailwind CSS, Framer Motion, Lenis, and GSAP**.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🎨 Design System & Philosophy

- **Mood:** Dark, cinematic, editorial, high-contrast ("Film studio meets modern agency").
- **Colors:**
  - Background: `#0A0A0B`
  - Surface: `#121214`
  - Border: `rgba(255, 255, 255, 0.08)`
  - Text Primary: `#F4F4F5`
  - Text Muted: `#8B8B93`
  - Accent Red: `#E11D2E` (Glow Variant: `#FF2D3F`)
- **Typography:**
  - Headings: *Bebas Neue* & *Anton* (heavy condensed uppercase, tight tracking)
  - Body: *Space Grotesk* & *Inter*
  - Section labels & technical meters: *JetBrains Mono*
  - Accent Greeting: *Caveat* script in red
- **Atmospheric Details:**
  - 4% opacity SVG fractal film grain overlay
  - Crosshair `+` corner marks and cinema camera HUD indicators
  - Dual-ring custom cursor with `PLAY` state on media elements
  - Smooth Lenis inertial scrolling with ScrollTrigger synchronization
  - 3px glowing red scroll progress indicator at the viewport top

---

## 📝 How to Edit All Content (ONE Editable File)

All personal details, projects, awards, timeline items, services, quotes, and media URLs are centralized in:

📂 **`src/content.ts`** *(also accessible via `content.js`)*

### 1. Personal Details
Open `src/content.ts` and update the `personal` block:
```typescript
personal: {
  name: "Your Name",             // Displayed in Hero, Navbar, Footer
  firstName: "YourFirstName",
  lastName: "YourLastName",
  role: "Video Editor & VFX Artist",
  email: "your.email@example.com",
  phone: "+1 234 567 890",
  location: "Los Angeles, CA (Remote / Worldwide)",
  tagline: "I turn raw footage into stories people feel.",
  shortIntro: "...",
  heroPortrait: "/assets/hero-portrait.png", // Path to your transparent cutout PNG
  cvDownloadUrl: "/assets/your-resume.pdf",
  showreelVideoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1",
}
```

### 2. Projects (8 Slots)
Each project in `projects: [...]` contains:
- `title`: Project title
- `category`: `'Commercial' | 'Short Film' | 'Music Video' | 'VFX'`
- `year`: Production year
- `client`: Client or studio name
- `duration`: e.g. `'03:45'`
- `thumbnailUrl`: Path to thumbnail image (e.g. `/assets/projects/project-1.jpg`)
- `previewVideoUrl`: Short looping preview video on card hover (`.mp4` / `.webm`)
- `videoType`: `'youtube' | 'vimeo' | 'mp4'`
- `videoEmbedUrl`: Full embed link that launches in the Lightbox modal
- `tools`: Array of tools used, e.g. `["Premiere Pro", "DaVinci Resolve", "Nuke"]`

### 3. Before / After Sliders
Customize or add comparison tabs in `beforeAfterComparisons`:
- `rawImage`: Flat log / green screen stage frame (`/assets/before-after/cyberpunk-raw.jpg`)
- `finalImage`: Graded / VFX composited frame (`/assets/before-after/cyberpunk-final.jpg`)
- `specs`: Camera, capture codec, color space, and resolution

### 4. Experience Timeline & Awards
Edit the `experience` array (companies, dates, 2-bullet descriptions) and `awards` array (10 awards with title, festival name, year, and badge).

---

## 📁 Public Assets Replacement Guide (`/public/assets/`)

Replace placeholder files in `/public/assets/` with your real production media:

```
public/assets/
├── hero-portrait.png         <-- Transparent PNG cutout of you (man in suit / director pose)
├── og-image.jpg              <-- 1200x630 social share preview for Twitter/LinkedIn
├── before-after/
│   ├── cyberpunk-raw.jpg     <-- Flat camera raw / S-Log / LogC frame (1200x675)
│   ├── cyberpunk-final.jpg   <-- Final graded ACES cinema frame (1200x675)
│   ├── scifi-raw.jpg         <-- VFX raw stage / green screen frame
│   ├── scifi-final.jpg       <-- Final CGI composite frame
│   ├── carchase-raw.jpg      <-- Neutral daylight camera frame
│   └── carchase-final.jpg    <-- Final stylized color grade
└── projects/
    ├── project-1.jpg         <-- Neon Nights thumbnail (1200x750)
    ├── project-2.jpg         <-- Ascend Commercial thumbnail
    ├── project-3.jpg         <-- Echoes of Rain Short Film thumbnail
    ├── project-4.jpg         <-- Skyline Rush VFX Breakdown thumbnail
    ├── project-5.jpg         <-- Pulse Music Video thumbnail
    ├── project-6.jpg         <-- Iron Veil Trailer thumbnail
    ├── project-7.jpg         <-- Drift Commercial thumbnail
    ├── project-8.jpg         <-- Afterglow Documentary thumbnail
    └── sample-preview.webm   <-- Lightweight looping hover preview clip
```

> **Tip for Hero Portrait:** Export a transparent PNG cutout with your subject centered and framed from the chest or waist up. A high-contrast side-lit or rim-lit photo works best with the background red glow.

---

## 🚀 Deployment

### Deploy to Vercel
1. Push your repository to GitHub / GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### Deploy to Netlify
1. Go to [Netlify](https://netlify.com) and choose **"Import an existing project"**.
2. Connect your Git provider.
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy Site**.

---

## 🛠 Tech Stack Details

- **React 19 + TypeScript + Vite 6**
- **Tailwind CSS 3.4**
- **Framer Motion 12** (Masked reveals, layout transitions, spring physics)
- **Lenis 1.1** (Inertial smooth scrolling)
- **GSAP 3.12 + ScrollTrigger** (Dynamic ticker & counter animations)
- **Lucide React** (Crisp vector icons)

