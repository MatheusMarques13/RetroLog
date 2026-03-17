import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RetroLog',
  description: 'Your complete archive of taste — track films, games, books, albums, and artists.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
