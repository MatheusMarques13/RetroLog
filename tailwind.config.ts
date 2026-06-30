import type { Config } from 'tailwindcss'

/**
 * RetroLog — "mynd" design system
 * Typography & cohesion: Connect the Notes (IBM Plex Mono everywhere, hairline borders, 12px radius)
 * Colour & harmony: Study Hub (pastel post-it palette on warm paper, light + dark surfaces)
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── paper & surfaces ──
        'bg-primary': '#FFFDF8',     // warm cream paper
        'bg-secondary': '#F2EEF7',   // whisper-lavender sunken
        surface: '#FFFFFF',
        dark: '#1E1A2E',             // dark branding panels
        // ── ink & text ──
        'txt-primary': '#2C2722',    // warm ink
        'txt-secondary': '#6E6A7E',
        'txt-muted': '#9A95A8',
        // ── lines & borders ──
        border: '#E7E2F0',
        'border-ink': '#2C2722',
        // ── accents: pink + pastel blue (yellow reserved for ratings) ──
        'accent-pink': '#FF6B9D',
        'accent-pink-deep': '#FF4F88',
        'accent-pink-soft': '#FFE4EE',
        'accent-blue': '#7EC8F5',
        'accent-blue-deep': '#4A9BC7',
        'accent-blue-soft': '#E3F2FD',
        'accent-yellow': '#F5C518',
        'accent-yellow-soft': '#FFF6C4',
      },
      fontFamily: {
        // Readable body — DM Sans (Study Hub). Signature accents — IBM Plex Mono
        // (Connect the Notes), used for labels, numbers and metadata.
        // Legacy keys (hand/display) map to DM Sans; pixel maps to mono.
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        hand: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        pixel: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // soft, low elevation (Connect the Notes) — names kept for backward compat
        retro: '0 1px 2px rgba(44,39,34,0.05), 0 6px 18px rgba(44,39,34,0.07)',
        'retro-lg': '0 2px 6px rgba(44,39,34,0.06), 0 14px 34px rgba(44,39,34,0.10)',
        soft: '0 1px 3px rgba(44,39,34,0.04), 0 4px 14px rgba(44,39,34,0.05)',
        sticker: '2px 2px 0 rgba(44,39,34,0.12)',          // subtle post-it tactility
        'sticker-lg': '3px 3px 0 rgba(44,39,34,0.14)',
        glow: '0 0 24px rgba(255,107,157,0.22)',
      },
      borderRadius: {
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '22px',
      },
    },
  },
  plugins: [],
}
export default config
