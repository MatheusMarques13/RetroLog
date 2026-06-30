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
        'surface-warm': '#FFF9F0',
        dark: '#1E1A2E',             // Study Hub dark base
        'dark-soft': '#2A2435',
        'dark-border': '#3D3548',
        // ── ink & text ──
        'txt-primary': '#2C2722',    // warm ink (Connect the Notes)
        'txt-secondary': '#6E6A7E',
        'txt-muted': '#9A95A8',
        'txt-inverse': '#FFFDF8',
        // ── lines & borders ──
        border: '#E7E2F0',
        'border-warm': '#E7DDCA',
        'border-ink': '#2C2722',
        // ── accents (Study Hub) ──
        'accent-pink': '#FF6B9D',
        'accent-pink-deep': '#FF4F88',
        'accent-pink-soft': '#FFE4EE',
        'accent-blue': '#7EC8F5',
        'accent-blue-deep': '#4A9BC7',
        'accent-blue-soft': '#E3F2FD',
        'accent-lav': '#9A82D0',
        'accent-lav-deep': '#7C3AED',
        'accent-lav-soft': '#EDE7F6',
        'accent-mint': '#5FB98C',
        'accent-mint-deep': '#3AA37C',
        'accent-mint-soft': '#D6F5E3',
        'accent-yellow': '#F5C518',
        'accent-yellow-soft': '#FFF6C4',
        'accent-peach': '#C4663C',
        'accent-peach-soft': '#FFE5D9',
        // ── post-it note fills ──
        'note-yellow': '#FFF6C4',
        'note-pink': '#FFE4EE',
        'note-mint': '#D6F5E3',
        'note-peach': '#FFE5D9',
        'note-sky': '#E0F2FE',
        'note-lilac': '#EDE7F6',
      },
      fontFamily: {
        // Connect the Notes cohesion — a single typeface across the whole app.
        // Legacy keys (pixel/hand) are kept so existing markup resolves to IBM Plex Mono.
        sans: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        body: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        display: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        hand: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
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
      backgroundImage: {
        'paper-lines': 'repeating-linear-gradient(180deg, transparent, transparent 31px, #E7E2F0 31px, #E7E2F0 32px)',
      },
    },
  },
  plugins: [],
}
export default config
