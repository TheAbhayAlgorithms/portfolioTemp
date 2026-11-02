/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        surface: '#121214',
        'surface-elevated': '#18181B',
        'border-custom': 'rgba(255, 255, 255, 0.08)',
        'border-custom-bright': 'rgba(255, 255, 255, 0.16)',
        'text-main': '#F4F4F5',
        'text-muted': '#8B8B93',
        'accent-red': '#E11D2E',
        'accent-glow': '#FF2D3F',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        anton: ['"Anton"', 'sans-serif'],
        body: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        script: ['"Caveat"', '"Kaushan Script"', 'cursive'],
      },
      boxShadow: {
        'red-glow': '0 0 25px -4px rgba(225, 29, 46, 0.45)',
        'red-glow-lg': '0 0 45px -4px rgba(225, 29, 46, 0.65)',
        'red-glow-subtle': '0 0 15px rgba(225, 29, 46, 0.25)',
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at center, transparent 0%, rgba(10,10,11,0.85) 100%)',
        'red-radial-glow': 'radial-gradient(circle at center, rgba(225,29,46,0.3) 0%, transparent 70%)',
      },
      animation: {
        'marquee-slow': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}

