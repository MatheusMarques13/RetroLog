import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FFFDF8',
          secondary: '#F5F0E8',
        },
        surface: '#FFF9F0',
        border: '#E5E0DA',
        text: {
          primary: '#1F1A17',
          secondary: '#6E6258',
        },
        accent: {
          pink: '#FF6B9D',
          yellow: '#FFD93D',
          mint: '#6BCB77',
          blue: '#7BD3EA',
        },
        dark: '#171717',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        kalam: ['Kalam', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        retro: '4px 4px 0 #1F1A17',
        'retro-lg': '6px 6px 0 #1F1A17',
        'retro-xl': '8px 8px 0 #1F1A17',
        soft: '0 2px 12px rgba(0,0,0,0.06)',
        'soft-lg': '0 4px 24px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        retro: '12px',
        card: '16px',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
        marquee: 'marquee 20s linear infinite',
        wiggle: 'wiggle 0.5s ease infinite',
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
