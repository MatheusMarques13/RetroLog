import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-7 p-8">
      <h1 className="wordmark text-4xl md:text-6xl">RetroLog</h1>
      <p className="text-lg text-txt-secondary text-center max-w-lg leading-relaxed">
        Your complete archive of taste across cinema, games, books, albums, and artists.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/auth" className="retro-btn-pink text-base">Get Started</Link>
        <Link href="/profile/retromatheus" className="retro-btn-ghost text-base">View Demo Profile</Link>
      </div>
    </main>
  )
}
