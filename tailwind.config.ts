import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFFDF8',
        'bg-secondary': '#F5F0E8',
        surface: '#FFF9F0',
        'txt-primary': '#1F1A17',
        'txt-secondary': '#6E6258',
        border: '#E5E0DA',
        dark: '#171717',
        'accent-pink': '#FF6B9D',
        'accent-yellow': '#FFD93D',
        'accent-mint': '#6BCB77',
        'accent-blue': '#7BD3EA',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        hand: ['Kalam', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        retro: '6px 6px 0 rgba(0,0,0,0.12)',
        'retro-lg': '8px 8px 0 rgba(0,0,0,0.15)',
        soft: '0 2px 16px rgba(0,0,0,0.06)',
        glow: '0 0 20px rgba(255,107,157,0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config
