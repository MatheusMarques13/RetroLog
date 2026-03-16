import type { Metadata } from 'next'
import { Suspense } from 'react'
import AuthListener from '@/components/AuthListener'
import './globals.css'

export const metadata: Metadata = {
  title: 'RetroLog — Your Complete Archive of Taste',
  description: 'Track films, games, books, albums, and artists in one beautiful social platform.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative z-0 paper-grain">
        <Suspense>
          <AuthListener />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
