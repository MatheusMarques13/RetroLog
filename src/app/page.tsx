import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 relative">
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />
      <h1 className="font-pixel text-4xl md:text-6xl text-accent-pink" style={{textShadow:'4px 4px 0 #FFD93D'}}>
        RetroLog
      </h1>
      <p className="font-hand text-xl text-txt-secondary text-center max-w-lg">
        Your complete archive of taste across cinema, games, books, albums, and artists.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/auth" className="retro-btn-pink text-base">Get Started</Link>
        <Link href="/profile/retromatheus" className="retro-btn-ghost text-base">View Demo Profile</Link>
      </div>
    </main>
  )
}
