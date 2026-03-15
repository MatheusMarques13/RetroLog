# RetroLog

> Your complete archive of taste across cinema, games, books, albums, and artists.

RetroLog is a Letterboxd-inspired social platform for tracking every kind of media consumption. Think: retro analog internet meets a cozy media journal from an alternate 2002.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 + TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Auth | Supabase Auth (Google, GitHub, Apple, Magic Link) |
| Database | Supabase PostgreSQL |
| Storage | Supabase Storage |
| Deployment | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Copy env example
cp .env.local.example .env.local
# Fill in your Supabase credentials

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/              # Next.js App Router pages
    (auth)/         # Auth routes (login, signup)
    (app)/          # Protected app routes
      profile/      # User profile pages
      dashboard/    # Main dashboard
  components/       # Reusable UI components
    ui/             # Primitives (Button, Input, Card...)
    icons/          # SVG icon components
    auth/           # Auth-specific components
    profile/        # Profile-specific components
    layout/         # Layout components (Nav, Footer...)
  lib/              # Utilities and helpers
    supabase/       # Supabase client & server helpers
    hooks/          # Custom React hooks
    types/          # TypeScript type definitions
    utils/          # Utility functions
  styles/           # Global styles
  data/             # Mock data (to be replaced with Supabase)
```

## Design System

- **Background Primary**: `#FFFDF8`
- **Accent Pink**: `#FF6B9D`
- **Accent Yellow**: `#FFD93D`
- **Accent Mint**: `#6BCB77`
- **Accent Blue**: `#7BD3EA`
- **Font Pixel**: Press Start 2P
- **Font Body**: Kalam
- **Font Mono**: Space Mono

## Features

- [x] Project scaffold
- [x] Design system
- [x] Supabase schema
- [ ] Auth page (login, signup, social, magic link)
- [ ] User profile page (12 tabs)
- [ ] Media logging
- [ ] Reviews & ratings
- [ ] Lists
- [ ] Stats dashboard
- [ ] Social features

## License

MIT
