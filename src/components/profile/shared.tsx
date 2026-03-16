'use client'
import React from 'react'
import {
  FilmIcon, GamepadIcon, BookIcon, VinylIcon, PersonIcon,
  StarFilledIcon, StarIcon,
} from '@/components/icons'

export const MEDIA_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  film: FilmIcon, game: GamepadIcon, book: BookIcon,
  album: VinylIcon, artist: PersonIcon,
}

export const MEDIA_COLORS: Record<string, string> = {
  film: 'text-accent-pink', game: 'text-accent-yellow',
  book: 'text-accent-mint', album: 'text-accent-blue',
  artist: 'text-accent-pink', list: 'text-accent-mint',
  social: 'text-accent-blue',
}

export const MEDIA_BG: Record<string, string> = {
  film: 'bg-accent-pink/10', game: 'bg-accent-yellow/10',
  book: 'bg-accent-mint/10', album: 'bg-accent-blue/10',
  artist: 'bg-accent-pink/10',
}

export function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5'
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        i <= Math.floor(rating)
          ? <StarFilledIcon key={i} className={`${cls} text-accent-yellow`} />
          : rating % 1 >= 0.5 && i === Math.ceil(rating)
            ? <StarFilledIcon key={i} className={`${cls} text-accent-yellow opacity-60`} />
            : <StarIcon key={i} className={`${cls} text-border`} />
      ))}
    </span>
  )
}

export function MediaCard({ title, subtitle, rating, type }: { title: string; subtitle?: string; rating: number; type: string }) {
  const Icon = MEDIA_ICONS[type] || FilmIcon
  const color = MEDIA_COLORS[type] || 'text-accent-pink'
  return (
    <div className="retro-card retro-card-hover p-3 flex flex-col gap-2">
      <div className="w-full aspect-[2/3] bg-bg-secondary rounded-xl flex items-center justify-center border border-border">
        <Icon className={`w-8 h-8 ${color} opacity-60`} />
      </div>
      <div>
        <p className="font-hand font-bold text-sm text-txt-primary leading-tight line-clamp-2">{title}</p>
        {subtitle && <p className="font-mono text-xs text-txt-secondary mt-0.5">{subtitle}</p>}
        {rating > 0 && <div className="mt-1"><Stars rating={rating} /></div>}
      </div>
    </div>
  )
}

export function SectionHeader({ title, icon: Icon, action }: { title: string; icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-accent-pink" />}
        <p className="section-label mb-0">{title}</p>
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ icon: Icon, message }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; message: string }) {
  return (
    <div className="retro-card p-8 text-center">
      <Icon className="w-8 h-8 text-txt-secondary/40 mx-auto mb-3" />
      <p className="font-hand text-txt-secondary">{message}</p>
    </div>
  )
}

export function FilterChips({ filters, active, onChange }: { filters: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {filters.map(f => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`filter-chip ${active === f.id ? 'active' : ''}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

export function StatBlock({ label, value, color, icon: Icon }: { label: string; value: string | number; color: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) {
  return (
    <div className="retro-card p-4 text-center">
      <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
      <p className={`font-mono text-xl font-bold ${color}`}>{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <p className="font-hand text-xs text-txt-secondary">{label}</p>
    </div>
  )
}

export function ToggleSwitch({ active, onChange, label }: { active: boolean; onChange: () => void; label: string }) {
  return (
    <div className="setting-row">
      <span className="font-hand text-sm text-txt-primary">{label}</span>
      <button onClick={onChange} className={`toggle-track ${active ? 'active' : ''}`} aria-label={label}>
        <span className="toggle-thumb" />
      </button>
    </div>
  )
}
