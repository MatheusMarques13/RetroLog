'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  FilmIcon, GamepadIcon, BookIcon, VinylIcon, PersonIcon,
  StarFilledIcon, HeartIcon, HeartFilledIcon, MessageIcon,
  BookmarkIcon, ClockIcon, CalendarIcon, ChartIcon, ListIcon, EditIcon,
  ShareIcon, MapPinIcon, GlobeIcon, LinkIcon,
  FireIcon, UserPlusIcon, GridIcon,
  RowsIcon, RepeatIcon, MailIcon,
  SparklesIcon, TargetIcon, UsersIcon,
} from '@/components/icons'
import {
  mockUser, mockFavorites, mockActivity,
  mockReviews, mockLists, mockStats, mockBacklog,
  mockDiary, mockCollection, mockRatings, mockSocial,
} from '@/data/mockProfile'
import { Stars, MediaCard, StatBlock, MEDIA_ICONS, MEDIA_COLORS, FilterChips, EmptyState } from '@/components/profile/shared'
import EditProfileModal from '@/components/profile/EditProfileModal'
import { fetchProfileByUsername, getCurrentUser, type ProfileData } from '@/lib/supabase/profile'

// ── Tab definitions ──
const TABS = [
  { id: 'overview',    label: 'Overview',    icon: GridIcon },
  { id: 'activity',    label: 'Activity',    icon: ClockIcon },
  { id: 'reviews',     label: 'Reviews',     icon: MessageIcon },
  { id: 'ratings',     label: 'Ratings',     icon: StarFilledIcon },
  { id: 'lists',       label: 'Lists',       icon: ListIcon },
  { id: 'favorites',   label: 'Favorites',   icon: HeartFilledIcon },
  { id: 'diary',       label: 'Diary',       icon: CalendarIcon },
  { id: 'collection',  label: 'Collection',  icon: BookmarkIcon },
  { id: 'backlog',     label: 'Backlog',     icon: TargetIcon },
  { id: 'stats',       label: 'Stats',       icon: ChartIcon },
  { id: 'social',      label: 'Social',      icon: UsersIcon },
  { id: 'about',       label: 'About',       icon: PersonIcon },
]

const MEDIA_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'film', label: 'Films' },
  { id: 'game', label: 'Games' },
  { id: 'book', label: 'Books' },
  { id: 'album', label: 'Albums' },
  { id: 'artist', label: 'Artists' },
]

// ══════════════════════════════════════════════════════════════
// TAB COMPONENTS
// ══════════════════════════════════════════════════════════════

function FavRow({ label, items, type, sub }: { label: string; items: any[]; type: string; sub: (x: any) => string }) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <p className="section-label mb-0">{label}</p>
        <span className="font-mono text-xs text-txt-muted">{items.length}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">
        {items.map(f => <MediaCard key={f.id} title={f.title} subtitle={sub(f)} rating={f.rating} type={type} />)}
      </div>
    </section>
  )
}

function TabOverview() {
  return (
    <div className="space-y-12 fade-in-up">
      <FavRow label="Favorite Films"  items={mockFavorites.films}  type="film"  sub={f => String(f.year)} />
      <FavRow label="Favorite Games"  items={mockFavorites.games}  type="game"  sub={f => String(f.year)} />
      <FavRow label="Favorite Albums" items={mockFavorites.albums} type="album" sub={f => f.artist} />

      {/* Recent reviews */}
      <section>
        <p className="section-label">Recent Reviews</p>
        <div className="space-y-5">
          {mockReviews.slice(0, 2).map(r => (
            <article key={r.title} className="border-b border-border pb-5 last:border-0 last:pb-0">
              <div className="flex items-center gap-2.5 mb-1.5">
                <p className="font-semibold text-txt-primary">{r.title}</p>
                <Stars rating={r.rating} />
              </div>
              <p className="text-sm text-txt-secondary leading-relaxed line-clamp-3">{r.excerpt}</p>
              <div className="flex items-center gap-4 mt-2.5 font-mono text-xs text-txt-muted">
                <span className="flex items-center gap-1"><HeartIcon className="w-3 h-3" />{r.likes}</span>
                <span className="flex items-center gap-1"><MessageIcon className="w-3 h-3" />{r.comments}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <p className="section-label">Recent Activity</p>
        <div className="divide-y divide-border">
          {mockActivity.slice(0, 8).map(act => {
            const Icon = MEDIA_ICONS[act.type] || FireIcon
            return (
              <div key={act.id} className="flex items-center gap-3 py-3">
                <Icon className="w-4 h-4 text-txt-muted flex-shrink-0" />
                <p className="flex-1 min-w-0 text-sm text-txt-primary truncate">
                  <span className="text-txt-secondary">{act.action}</span>{' '}
                  <span className="font-semibold">{act.title}</span>
                  {'artist' in act && act.artist ? <span className="text-txt-muted"> · {act.artist}</span> : null}
                </p>
                {'rating' in act && act.rating ? <Stars rating={act.rating} /> : null}
                <span className="font-mono text-xs text-txt-muted flex-shrink-0">{act.timestamp}</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function TabActivity() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? mockActivity : mockActivity.filter(a => a.type === filter)

  return (
    <div className="fade-in-up space-y-4">
      <FilterChips filters={MEDIA_FILTERS} active={filter} onChange={setFilter} />
      <div className="retro-card divide-y divide-border">
        {filtered.map(act => {
          const Icon = MEDIA_ICONS[act.type] || FireIcon
          const color = MEDIA_COLORS[act.type] || 'text-accent-pink'
          return (
            <div key={act.id} className="flex items-center gap-3 p-4 hover:bg-bg-secondary transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color.replace('text-', 'bg-')}/10`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-hand text-sm text-txt-primary">
                  <span className="text-txt-secondary capitalize">{act.action}</span>{' '}
                  <span className="font-bold">{act.title}</span>
                  {'artist' in act && act.artist ? ` -- ${act.artist}` : ''}
                </p>
                <span className="chip text-[10px] mt-1">{act.type}</span>
              </div>
              {'rating' in act && act.rating ? <Stars rating={act.rating} /> : null}
              <span className="font-mono text-xs text-txt-secondary flex-shrink-0">{act.timestamp}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TabReviews() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')
  const filtered = filter === 'all' ? mockReviews : mockReviews.filter(r => r.mediaType === filter)
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'most-liked') return b.likes - a.likes
    if (sort === 'highest-rated') return b.rating - a.rating
    return 0
  })

  return (
    <div className="fade-in-up space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <FilterChips
          filters={[{ id: 'all', label: 'All' }, { id: 'film', label: 'Films' }, { id: 'game', label: 'Games' }, { id: 'book', label: 'Books' }, { id: 'album', label: 'Albums' }]}
          active={filter} onChange={setFilter}
        />
        <select value={sort} onChange={e => setSort(e.target.value)} className="input-field w-auto py-1.5 px-3 text-xs" aria-label="Sort reviews">
          <option value="newest">Newest</option>
          <option value="most-liked">Most Liked</option>
          <option value="highest-rated">Highest Rated</option>
        </select>
      </div>

      {sorted.map(r => {
        const Icon = MEDIA_ICONS[r.mediaType] || FilmIcon
        const color = MEDIA_COLORS[r.mediaType] || 'text-accent-pink'
        return (
          <div key={r.id} className="retro-card p-5 space-y-3 retro-card-hover">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                <p className="font-hand font-bold text-txt-primary">{r.title}</p>
                <span className="font-mono text-xs text-txt-secondary">{r.year}</span>
                {r.hasSpoilers && <span className="chip chip-yellow text-[10px]">spoilers</span>}
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="font-hand text-sm text-txt-secondary leading-relaxed">{r.excerpt}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="flex items-center gap-1 font-hand text-sm text-txt-secondary hover:text-accent-pink transition-colors">
                <HeartIcon className="w-4 h-4" />{r.likes}
              </button>
              <button className="flex items-center gap-1 font-hand text-sm text-txt-secondary hover:text-accent-blue transition-colors">
                <MessageIcon className="w-4 h-4" />{r.comments}
              </button>
              <div className="flex gap-1 flex-wrap">
                {r.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              <button className="font-hand text-xs text-accent-pink hover:underline ml-auto">Read more</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TabRatings() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? mockRatings : mockRatings.filter(r => r.type === filter)

  return (
    <div className="fade-in-up space-y-6">
      <FilterChips filters={MEDIA_FILTERS.slice(0, 5)} active={filter} onChange={setFilter} />

      {/* Rating distribution */}
      <div className="retro-card p-5">
        <p className="section-label">Rating Distribution</p>
        <div className="space-y-2">
          {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((r, i) => {
            const count = mockStats.ratingDistribution[i] || 0
            const max = Math.max(...mockStats.ratingDistribution)
            return (
              <div key={r} className="flex items-center gap-3">
                <span className="font-mono text-xs text-txt-secondary w-6 text-right">{r}</span>
                <StarFilledIcon className="w-3 h-3 text-accent-yellow" />
                <div className="flex-1 h-3 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent-yellow rounded-full transition-all" style={{ width: `${(count / max) * 100}%` }} />
                </div>
                <span className="font-mono text-xs text-txt-secondary w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Average by type */}
      <div className="retro-card p-5">
        <p className="section-label">Average Rating by Type</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(mockStats.avgRating).map(([type, avg]) => {
            const Icon = MEDIA_ICONS[type] || FilmIcon
            const color = MEDIA_COLORS[type] || 'text-accent-pink'
            return (
              <div key={type} className="text-center">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                <p className={`font-mono text-xl font-bold ${color}`}>{avg}</p>
                <Stars rating={avg} />
                <p className="font-hand text-xs text-txt-secondary mt-1 capitalize">{type}s</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ratings list */}
      <div className="retro-card divide-y divide-border">
        {filtered.map(r => {
          const Icon = MEDIA_ICONS[r.type] || FilmIcon
          const color = MEDIA_COLORS[r.type] || 'text-accent-pink'
          return (
            <div key={r.id} className="flex items-center gap-3 p-4 hover:bg-bg-secondary transition-colors">
              <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="font-hand font-bold text-sm text-txt-primary">{r.title}</p>
                <span className="font-mono text-xs text-txt-secondary">{r.year}</span>
              </div>
              <Stars rating={r.rating} />
              {r.isFavorite && <HeartFilledIcon className="w-4 h-4 text-accent-pink" />}
              {r.rewatches > 0 && (
                <span className="flex items-center gap-1 font-mono text-xs text-txt-secondary">
                  <RepeatIcon className="w-3 h-3" />{r.rewatches}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TabLists() {
  return (
    <div className="fade-in-up space-y-4">
      {/* Featured lists */}
      <p className="section-label">Featured & Pinned Lists</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockLists.filter(l => l.isPinned).map(l => {
          const Icon = MEDIA_ICONS[l.mediaType] || ListIcon
          const color = MEDIA_COLORS[l.mediaType] || 'text-accent-pink'
          return (
            <div key={l.id} className="retro-card retro-card-hover p-5 space-y-2 border-accent-pink/30">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                <span className="chip chip-pink text-[10px]">pinned</span>
              </div>
              <p className="font-hand font-bold text-txt-primary">{l.title}</p>
              <p className="font-hand text-sm text-txt-secondary line-clamp-2">{l.description}</p>
              <div className="flex items-center gap-4 pt-1">
                <span className="font-mono text-xs text-txt-secondary">{l.itemCount} items</span>
                <span className="flex items-center gap-1 font-mono text-xs text-txt-secondary"><HeartIcon className="w-3 h-3" />{l.likes}</span>
                <span className="flex items-center gap-1 font-mono text-xs text-txt-secondary"><MessageIcon className="w-3 h-3" />{l.comments}</span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="section-label mt-8">All Lists</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockLists.map(l => {
          const Icon = MEDIA_ICONS[l.mediaType] || ListIcon
          const color = MEDIA_COLORS[l.mediaType] || 'text-accent-pink'
          return (
            <div key={l.id} className="retro-card retro-card-hover p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                {l.isPinned && <span className="chip chip-pink text-[10px]">pinned</span>}
              </div>
              <p className="font-hand font-bold text-txt-primary">{l.title}</p>
              <p className="font-hand text-sm text-txt-secondary line-clamp-2">{l.description}</p>
              <div className="flex items-center gap-4 pt-1">
                <span className="font-mono text-xs text-txt-secondary">{l.itemCount} items</span>
                <span className="flex items-center gap-1 font-mono text-xs text-txt-secondary"><HeartIcon className="w-3 h-3" />{l.likes}</span>
                <span className="flex items-center gap-1 font-mono text-xs text-txt-secondary"><MessageIcon className="w-3 h-3" />{l.comments}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TabFavorites() {
  return (
    <div className="fade-in-up space-y-8">
      {/* Films */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FilmIcon className="w-4 h-4 text-accent-pink" />
          <p className="section-label mb-0">Films</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {mockFavorites.films.map(f => <MediaCard key={f.id} title={f.title} subtitle={String(f.year)} rating={f.rating} type="film" />)}
        </div>
      </div>

      {/* Games */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <GamepadIcon className="w-4 h-4 text-accent-blue" />
          <p className="section-label mb-0">Games</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {mockFavorites.games.map(g => <MediaCard key={g.id} title={g.title} subtitle={String(g.year)} rating={g.rating} type="game" />)}
        </div>
      </div>

      {/* Books */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookIcon className="w-4 h-4 text-accent-blue" />
          <p className="section-label mb-0">Books</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {mockFavorites.books.map(b => <MediaCard key={b.id} title={b.title} subtitle={String(b.year)} rating={b.rating} type="book" />)}
        </div>
      </div>

      {/* Albums */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <VinylIcon className="w-4 h-4 text-accent-blue" />
          <p className="section-label mb-0">Albums</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {mockFavorites.albums.map(a => <MediaCard key={a.id} title={a.title} subtitle={a.artist} rating={a.rating} type="album" />)}
        </div>
      </div>

      {/* Artists */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <PersonIcon className="w-4 h-4 text-accent-pink" />
          <p className="section-label mb-0">Artists</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {mockFavorites.artists.map(a => (
            <div key={a.id} className="retro-card retro-card-hover p-4 text-center">
              <div className="w-14 h-14 rounded-full bg-bg-secondary border-2 border-border flex items-center justify-center mx-auto mb-2">
                <PersonIcon className="w-7 h-7 text-accent-pink" />
              </div>
              <p className="font-hand font-bold text-sm text-txt-primary">{a.name}</p>
              <span className="chip chip-pink text-[10px] mt-1">{a.genre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabDiary() {
  return (
    <div className="fade-in-up space-y-6">
      {/* On this day */}
      <div className="retro-card p-5 border-accent-blue/30 bg-accent-blue/5">
        <div className="flex items-center gap-2 mb-3">
          <CalendarIcon className="w-4 h-4 text-accent-blue" />
          <p className="section-label mb-0">On This Day - 1 Year Ago</p>
        </div>
        <div className="flex items-center gap-3">
          <FilmIcon className="w-5 h-5 text-accent-pink" />
          <div>
            <p className="font-hand font-bold text-sm text-txt-primary">Watched "Everything Everywhere All at Once"</p>
            <p className="font-hand text-sm text-txt-secondary italic">Cried for 20 minutes straight. No regrets.</p>
          </div>
          <Stars rating={5} />
        </div>
      </div>

      {/* Diary entries */}
      <div className="space-y-3">
        {mockDiary.map(d => {
          const Icon = MEDIA_ICONS[d.type] || FilmIcon
          const color = MEDIA_COLORS[d.type] || 'text-accent-pink'
          const moodColors: Record<string, string> = { intense: 'chip-pink', emotional: 'chip-pink', comfort: 'chip-pink', focused: 'chip-blue', curious: 'chip-blue' }
          return (
            <div key={d.id} className="retro-card p-4 retro-card-hover">
              <div className="flex items-start gap-3">
                <div className="text-center flex-shrink-0 w-12">
                  <p className="font-mono text-xs text-txt-secondary">{d.date.split('-')[2]}</p>
                  <p className="font-mono text-[10px] text-txt-secondary">Mar</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                    <p className="font-hand font-bold text-sm text-txt-primary">{d.title}</p>
                    {d.rating && <Stars rating={d.rating} />}
                  </div>
                  {d.note && <p className="font-hand text-sm text-txt-secondary leading-relaxed">{d.note}</p>}
                  <div className="flex gap-2 mt-2">
                    <span className={`chip text-[10px] ${moodColors[d.mood] || 'chip'}`}>{d.mood}</span>
                    <span className="chip text-[10px]">{d.context}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TabCollection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [filter, setFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = mockCollection
    .filter(c => filter === 'all' || c.type === filter)
    .filter(c => statusFilter === 'all' || c.status === statusFilter)

  const statusColors: Record<string, string> = {
    finished: 'chip-blue', in_progress: 'chip-yellow', owned: 'chip-blue', wishlist: 'chip-pink',
  }

  return (
    <div className="fade-in-up space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <FilterChips
          filters={[{ id: 'all', label: 'All' }, { id: 'film', label: 'Films' }, { id: 'game', label: 'Games' }, { id: 'book', label: 'Books' }, { id: 'album', label: 'Albums' }]}
          active={filter} onChange={setFilter}
        />
        <div className="flex items-center gap-2">
          <FilterChips
            filters={[{ id: 'all', label: 'All Status' }, { id: 'finished', label: 'Finished' }, { id: 'in_progress', label: 'In Progress' }, { id: 'owned', label: 'Owned' }]}
            active={statusFilter} onChange={setStatusFilter}
          />
          <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="p-2 retro-card hover:bg-bg-secondary transition-colors" aria-label="Toggle view">
            {viewMode === 'grid' ? <RowsIcon className="w-4 h-4 text-txt-secondary" /> : <GridIcon className="w-4 h-4 text-txt-secondary" />}
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="retro-card divide-y divide-border">
          {filtered.map(c => {
            const Icon = MEDIA_ICONS[c.type] || FilmIcon
            const color = MEDIA_COLORS[c.type] || 'text-accent-pink'
            return (
              <div key={c.id} className="flex items-center gap-3 p-4 hover:bg-bg-secondary transition-colors">
                <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="font-hand font-bold text-sm text-txt-primary">{c.title}</p>
                  <span className="font-mono text-xs text-txt-secondary">{c.year}</span>
                </div>
                <span className={`chip text-[10px] ${statusColors[c.status] || 'chip'}`}>
                  {c.status.replace('_', ' ')}
                </span>
                {c.format && <span className="font-mono text-[10px] text-txt-secondary">{c.format}</span>}
                {c.rating && <Stars rating={c.rating} />}
                {c.rewatches > 0 && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-txt-secondary">
                    <RepeatIcon className="w-3 h-3" />{c.rewatches}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {filtered.map(c => (
            <MediaCard key={c.id} title={c.title} subtitle={c.format || String(c.year)} rating={c.rating || 0} type={c.type} />
          ))}
        </div>
      )}
    </div>
  )
}

function TabBacklog() {
  const priorityColor = { high: 'chip-pink', medium: 'chip-yellow', low: 'chip' } as const
  const statusColor = { next: 'text-accent-blue', queued: 'text-accent-yellow', someday: 'text-txt-secondary' } as const

  return (
    <div className="fade-in-up space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-hand text-sm text-txt-secondary">{mockBacklog.length} items in backlog</p>
        <div className="flex gap-2">
          <span className="chip chip-pink text-[10px]">{mockBacklog.filter(b => b.priority === 'high').length} high</span>
          <span className="chip chip-yellow text-[10px]">{mockBacklog.filter(b => b.priority === 'medium').length} medium</span>
          <span className="chip text-[10px]">{mockBacklog.filter(b => b.priority === 'low').length} low</span>
        </div>
      </div>

      <div className="space-y-3">
        {mockBacklog.map(b => {
          const Icon = MEDIA_ICONS[b.type] || FilmIcon
          const color = MEDIA_COLORS[b.type] || 'text-accent-pink'
          return (
            <div key={b.id} className="retro-card p-4 flex items-center gap-4 retro-card-hover">
              <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="font-hand font-bold text-txt-primary">{b.title}</p>
                <p className="font-mono text-xs text-txt-secondary flex items-center gap-1"><ClockIcon className="w-3 h-3" />{b.estimatedTime}</p>
              </div>
              <span className={`chip ${priorityColor[b.priority as keyof typeof priorityColor] ?? 'chip'}`}>{b.priority}</span>
              <span className={`font-mono text-xs font-bold ${statusColor[b.status as keyof typeof statusColor] ?? 'text-txt-secondary'}`}>{b.status}</span>
            </div>
          )
        })}
      </div>

      {/* Recommendation panel */}
      <div className="retro-card p-5 border-accent-blue/30 bg-accent-blue/5">
        <div className="flex items-center gap-2 mb-3">
          <SparklesIcon className="w-4 h-4 text-accent-blue" />
          <p className="section-label mb-0">What Should I Consume Next?</p>
        </div>
        <p className="font-hand text-sm text-txt-secondary mb-3">Based on your taste profile, we recommend:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'The Substance', type: 'film', reason: 'Trending in your circles' },
            { title: 'Metaphor: ReFantazio', type: 'game', reason: 'Matches your RPG taste' },
            { title: 'Hit Me Hard and Soft', type: 'album', reason: 'Your friends loved it' },
          ].map(rec => {
            const Icon = MEDIA_ICONS[rec.type] || FilmIcon
            const color = MEDIA_COLORS[rec.type] || 'text-accent-pink'
            return (
              <div key={rec.title} className="retro-card p-3 text-center">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                <p className="font-hand text-sm font-bold text-txt-primary">{rec.title}</p>
                <p className="font-mono text-[10px] text-txt-secondary mt-1">{rec.reason}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TabStats() {
  const maxMonthly = Math.max(...mockStats.monthlyActivity)

  return (
    <div className="fade-in-up space-y-6">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Hours Watched', val: mockStats.hoursWatched.toLocaleString(), color: 'text-accent-pink', icon: FilmIcon },
          { label: 'Hours Played', val: mockStats.hoursPlayed.toLocaleString(), color: 'text-accent-blue', icon: GamepadIcon },
          { label: 'Pages Read', val: mockStats.pagesRead.toLocaleString(), color: 'text-accent-blue', icon: BookIcon },
          { label: 'Hours Listened', val: mockStats.hoursListened.toLocaleString(), color: 'text-accent-blue', icon: VinylIcon },
        ].map(s => (
          <StatBlock key={s.label} label={s.label} value={s.val} color={s.color} icon={s.icon} />
        ))}
      </div>

      {/* Streak + Avg ratings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="retro-card p-5">
          <p className="section-label">Current Streak</p>
          <div className="flex items-center gap-2">
            <FireIcon className="w-6 h-6 text-accent-pink" />
            <span className="font-mono text-3xl font-bold text-accent-pink">{mockStats.currentStreak}</span>
            <span className="font-hand text-txt-secondary">days</span>
          </div>
          <p className="font-hand text-xs text-txt-secondary mt-1">Longest: {mockStats.longestStreak} days</p>
        </div>
        <div className="retro-card p-5">
          <p className="section-label">Avg Ratings</p>
          <div className="space-y-1.5">
            {Object.entries(mockStats.avgRating).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="font-hand text-xs text-txt-secondary capitalize w-12">{k}</span>
                <div className="flex-1 h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent-yellow rounded-full transition-all" style={{ width: `${(v / 5) * 100}%` }} />
                </div>
                <span className="font-mono text-xs font-bold text-txt-primary">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly activity chart */}
      <div className="retro-card p-5">
        <p className="section-label">Monthly Activity</p>
        <div className="flex items-end gap-2 h-32">
          {mockStats.monthlyActivity.map((val, i) => (
            <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5">
              <div
                className="w-full bg-accent-pink/80 rounded-t-md transition-all hover:bg-accent-pink"
                style={{ height: `${Math.max(3, (val / maxMonthly) * 88)}%` }}
              />
              <span className="font-mono text-[8px] text-txt-muted">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion rates */}
      <div className="retro-card p-5">
        <p className="section-label">Completion Rates</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(mockStats.completionRates).map(([type, rate]) => {
            const Icon = MEDIA_ICONS[type] || FilmIcon
            const color = MEDIA_COLORS[type] || 'text-accent-pink'
            return (
              <div key={type} className="text-center">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
                <div className="relative w-16 h-16 mx-auto mb-1">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E5E0DA" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeWidth="3"
                      className={color}
                      strokeDasharray={`${rate} ${100 - rate}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-txt-primary">{rate}%</span>
                </div>
                <p className="font-hand text-xs text-txt-secondary capitalize">{type}s</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top genres + meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="retro-card p-5">
          <p className="section-label">Top Genres</p>
          <div className="flex flex-wrap gap-2">
            {mockStats.topGenres.map((g, i) => (
              <span key={g} className={`chip ${i % 2 === 0 ? 'chip-pink' : 'chip-blue'}`}>{g}</span>
            ))}
          </div>
        </div>
        <div className="retro-card p-5">
          <p className="section-label">When You Log</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-accent-blue" />
              <span className="font-hand text-sm text-txt-primary">Most active: <span className="font-bold">{mockStats.mostActiveDay}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-accent-blue" />
              <span className="font-hand text-sm text-txt-primary">Peak time: <span className="font-bold">{mockStats.mostActiveTime}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating distribution */}
      <div className="retro-card p-5">
        <p className="section-label">Rating Distribution</p>
        <div className="space-y-2">
          {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((r, i) => {
            const count = mockStats.ratingDistribution[i] || 0
            const max = Math.max(...mockStats.ratingDistribution)
            return (
              <div key={r} className="flex items-center gap-3">
                <span className="font-mono text-xs text-txt-secondary w-6 text-right">{r}</span>
                <StarFilledIcon className="w-3 h-3 text-accent-yellow" />
                <div className="flex-1 h-3 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent-yellow rounded-full transition-all" style={{ width: `${(count / max) * 100}%` }} />
                </div>
                <span className="font-mono text-xs text-txt-secondary w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Heatmap calendar */}
      <div className="retro-card p-5">
        <p className="section-label">Activity Heatmap</p>
        <div className="grid grid-cols-[repeat(52,1fr)] gap-0.5">
          {Array.from({ length: 364 }, (_, i) => {
            const intensity = Math.random()
            const bg = intensity > 0.7 ? 'bg-accent-pink' : intensity > 0.4 ? 'bg-accent-pink/50' : intensity > 0.15 ? 'bg-accent-pink/20' : 'bg-bg-secondary'
            return <div key={i} className={`heatmap-cell ${bg}`} />
          })}
        </div>
        <div className="flex items-center gap-2 mt-2 justify-end">
          <span className="font-mono text-[9px] text-txt-secondary">Less</span>
          <div className="heatmap-cell bg-bg-secondary" />
          <div className="heatmap-cell bg-accent-pink/20" />
          <div className="heatmap-cell bg-accent-pink/50" />
          <div className="heatmap-cell bg-accent-pink" />
          <span className="font-mono text-[9px] text-txt-secondary">More</span>
        </div>
      </div>

      {/* Year in review */}
      <div className="retro-card p-5 border-accent-pink/30 bg-accent-pink/5 text-center">
        <SparklesIcon className="w-6 h-6 text-accent-pink mx-auto mb-2" />
        <p className="section-label text-accent-pink mb-1">YEAR IN REVIEW 2026</p>
        <p className="font-hand text-sm text-txt-secondary">Your personalized year-in-review is generating. Check back in December!</p>
      </div>
    </div>
  )
}

function TabSocial() {
  return (
    <div className="fade-in-up space-y-6">
      {/* Counts */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Followers', val: mockUser.stats.followers, color: 'text-accent-pink' },
          { label: 'Following', val: mockUser.stats.following, color: 'text-accent-blue' },
          { label: 'Mutuals', val: mockUser.stats.mutuals, color: 'text-accent-blue' },
        ].map(({ label, val, color }) => (
          <div key={label} className="retro-card p-4 text-center">
            <p className={`font-mono text-2xl font-bold ${color}`}>{val.toLocaleString()}</p>
            <p className="font-hand text-sm text-txt-secondary mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Followers */}
      <div>
        <p className="section-label">Recent Followers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockSocial.followers.map(u => (
            <div key={u.id} className="retro-card retro-card-hover p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-secondary border-2 border-border flex items-center justify-center flex-shrink-0">
                <PersonIcon className="w-5 h-5 text-accent-pink" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-hand font-bold text-sm text-txt-primary">{u.displayName}</p>
                <p className="font-mono text-xs text-txt-secondary">@{u.username}</p>
              </div>
              {u.mutual && <span className="chip chip-blue text-[10px]">mutual</span>}
              <span className="font-mono text-xs text-txt-secondary">{u.reviews} reviews</span>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Reviewers */}
      <div>
        <p className="section-label">Favorite Reviewers</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {mockSocial.favoriteReviewers.map(u => (
            <div key={u.id} className="retro-card p-4 text-center retro-card-hover">
              <div className="w-12 h-12 rounded-full bg-bg-secondary border-2 border-border flex items-center justify-center mx-auto mb-2">
                <PersonIcon className="w-6 h-6 text-accent-pink" />
              </div>
              <p className="font-hand font-bold text-sm text-txt-primary">{u.displayName}</p>
              <p className="font-mono text-xs text-txt-secondary">@{u.username}</p>
              <span className="chip text-[10px] mt-2">{u.specialty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clubs */}
      <div>
        <p className="section-label">Clubs & Communities</p>
        <div className="space-y-3">
          {mockSocial.clubs.map(c => (
            <div key={c.id} className="retro-card p-4 flex items-center gap-3 retro-card-hover">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-5 h-5 text-accent-blue" />
              </div>
              <div className="flex-1">
                <p className="font-hand font-bold text-sm text-txt-primary">{c.name}</p>
                <p className="font-hand text-xs text-txt-secondary">{c.description}</p>
              </div>
              <span className="font-mono text-xs text-txt-secondary">{c.members.toLocaleString()} members</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social summary */}
      <div className="retro-card p-5">
        <p className="section-label">Social Summary</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <HeartIcon className="w-4 h-4 text-accent-pink" />
            <div>
              <p className="font-mono text-lg font-bold text-accent-pink">{mockUser.stats.likes.toLocaleString()}</p>
              <p className="font-hand text-xs text-txt-secondary">Likes received</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MessageIcon className="w-4 h-4 text-accent-blue" />
            <div>
              <p className="font-mono text-lg font-bold text-accent-blue">847</p>
              <p className="font-hand text-xs text-txt-secondary">Comments received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabAbout() {
  return (
    <div className="fade-in-up space-y-6">
      {/* Extended bio */}
      <div className="retro-card p-5">
        <p className="section-label">About Me</p>
        <p className="font-hand text-sm text-txt-primary leading-relaxed">{mockUser.extendedBio}</p>
      </div>

      {/* Taste tags */}
      <div className="retro-card p-5">
        <p className="section-label">Taste Tags</p>
        <div className="flex flex-wrap gap-2">
          {mockUser.tasteTags.map((t, i) => (
            <span key={t} className={`chip ${i % 2 === 0 ? 'chip-pink' : 'chip-blue'}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* Favorite genres */}
      <div className="retro-card p-5">
        <p className="section-label">Favorite Genres</p>
        <div className="flex flex-wrap gap-2">
          {mockUser.favoriteGenres.map(g => (
            <span key={g} className="chip">{g}</span>
          ))}
        </div>
      </div>

      {/* Influences */}
      <div className="retro-card p-5">
        <p className="section-label">Influences & Inspirations</p>
        <div className="flex flex-wrap gap-2">
          {mockUser.influences.map(inf => (
            <span key={inf} className="chip chip-pink">{inf}</span>
          ))}
        </div>
      </div>

      {/* Favorite creators */}
      <div className="retro-card p-5">
        <p className="section-label">Favorite Creators & Studios</p>
        <div className="flex flex-wrap gap-2">
          {mockUser.favoriteCreators.map(c => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </div>

      {/* External links */}
      <div className="retro-card p-5">
        <p className="section-label">Links</p>
        <div className="space-y-2">
          {Object.entries(mockUser.socialLinks).map(([platform, handle]) => (
            <div key={platform} className="flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5 text-accent-blue" />
              <span className="font-hand text-sm text-txt-primary capitalize">{platform}</span>
              <span className="font-mono text-xs text-accent-blue">{handle}</span>
            </div>
          ))}
          {mockUser.website && (
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-3.5 h-3.5 text-accent-blue" />
              <span className="font-hand text-sm text-txt-primary">Website</span>
              <a href={`https://${mockUser.website}`} target="_blank" rel="noopener" className="font-mono text-xs text-accent-blue hover:underline">{mockUser.website}</a>
            </div>
          )}
        </div>
      </div>

      {/* Account milestones */}
      <div className="retro-card p-5">
        <p className="section-label">Account Milestones</p>
        <div className="space-y-3 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
          {mockUser.accountMilestones.map((m, i) => (
            <div key={i} className="flex items-start gap-3 relative">
              <div className="w-4 h-4 rounded-full bg-accent-pink border-2 border-white shadow-sm flex-shrink-0 z-10" />
              <div>
                <p className="font-hand text-sm text-txt-primary">{m.event}</p>
                <p className="font-mono text-[10px] text-txt-secondary">{m.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// MAIN PROFILE PAGE
// ══════════════════════════════════════════════════════════════

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [following, setFollowing] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const profile = await fetchProfileByUsername(params.username)
        const user = await getCurrentUser()

        if (profile) {
          setProfileData(profile)
          setIsOwner(user?.id === profile.id)
        } else if (params.username === 'retromatheus') {
          setIsDemo(true)
        } else {
          setNotFound(true)
        }
      } catch {
        if (params.username === 'retromatheus') {
          setIsDemo(true)
        } else {
          setNotFound(true)
        }
      }
      setIsLoading(false)
    }
    load()
  }, [params.username])

  const handleProfileSave = useCallback((updated: ProfileData) => {
    setProfileData(updated)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-accent-pink/10 border-2 border-accent-pink/30 flex items-center justify-center mx-auto mb-4 shimmer">
            <SparklesIcon className="w-6 h-6 text-accent-pink" />
          </div>
          <p className="font-hand text-txt-secondary">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center max-w-md">
          <PersonIcon className="w-12 h-12 text-txt-secondary/30 mx-auto mb-4" />
          <h1 className="font-hand font-bold text-2xl text-txt-primary mb-2">Profile not found</h1>
          <p className="font-hand text-txt-secondary mb-6">No user with the username &ldquo;{params.username}&rdquo; exists yet.</p>
          <Link href="/" className="retro-btn-pink text-sm">Back to Home</Link>
        </div>
      </div>
    )
  }

  const displayName = isDemo ? mockUser.displayName : (profileData?.display_name || profileData?.username || params.username)
  const bio = isDemo ? mockUser.bio : (profileData?.bio || '')
  const userLocation = isDemo ? mockUser.location : (profileData?.location || '')
  const website = isDemo ? mockUser.website : (profileData?.website || '')
  const pronouns = isDemo ? mockUser.pronouns : (profileData?.pronouns || '')
  const quote = isDemo ? mockUser.favoriteQuote : (profileData?.quote || '')
  const avatarUrl = isDemo ? null : profileData?.avatar_url
  const memberSince = isDemo ? mockUser.memberSince : (profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')

  const demoTabContent: Record<string, React.ReactNode> = {
    overview:   <TabOverview />,
    activity:   <TabActivity />,
    reviews:    <TabReviews />,
    ratings:    <TabRatings />,
    lists:      <TabLists />,
    favorites:  <TabFavorites />,
    diary:      <TabDiary />,
    collection: <TabCollection />,
    backlog:    <TabBacklog />,
    stats:      <TabStats />,
    social:     <TabSocial />,
    about:      <TabAbout />,
  }

  const realTabContent: Record<string, React.ReactNode> = {
    overview: (
      <div className="fade-in-up space-y-6">
        <div className="retro-card p-8 text-center">
          <SparklesIcon className="w-8 h-8 text-accent-pink/40 mx-auto mb-3" />
          <p className="font-hand text-txt-secondary">Start logging films, games, books, and albums to build your overview.</p>
        </div>
      </div>
    ),
    activity:   <EmptyState icon={ClockIcon} message="No activity yet. Start logging media to see your feed!" />,
    reviews:    <EmptyState icon={MessageIcon} message="No reviews written yet." />,
    ratings:    <EmptyState icon={StarFilledIcon} message="No ratings yet. Rate your first film, game, or book!" />,
    lists:      <EmptyState icon={ListIcon} message="No lists created yet." />,
    favorites:  <EmptyState icon={HeartFilledIcon} message="No favorites yet. Mark your all-time favorites!" />,
    diary:      <EmptyState icon={CalendarIcon} message="Your diary is empty. Log what you watch, play, and read!" />,
    collection: <EmptyState icon={BookmarkIcon} message="Nothing in your collection yet." />,
    backlog:    <EmptyState icon={TargetIcon} message="Your backlog is empty. Add things you want to consume!" />,
    stats:      <EmptyState icon={ChartIcon} message="Not enough data for stats yet. Keep logging!" />,
    social:     <EmptyState icon={UsersIcon} message="No social connections yet." />,
    about: (
      <div className="fade-in-up space-y-6">
        {bio && (
          <div className="retro-card p-5">
            <p className="section-label">About Me</p>
            <p className="font-hand text-sm text-txt-primary leading-relaxed">{bio}</p>
          </div>
        )}
        {!bio && <EmptyState icon={PersonIcon} message="No bio yet. Edit your profile to tell people about yourself!" />}
      </div>
    ),
  }

  const tabContent = isDemo ? demoTabContent : realTabContent

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* COVER */}
      <div className="w-full h-24 md:h-32 bg-bg-secondary border-b border-border" />

      {/* PROFILE HEADER */}
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="relative flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-bg-secondary border-4 border-bg-primary shadow-retro flex items-center justify-center flex-shrink-0 overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-pixel text-3xl text-accent-pink">{displayName.charAt(0)}</span>
            )}
          </div>
          {/* Info */}
          <div className="flex-1 pb-1">
            <h1 className="font-display font-bold text-2xl text-txt-primary tracking-tight mb-0.5">{displayName}</h1>
            <p className="font-mono text-sm text-txt-muted">@{params.username}</p>
            {pronouns && <p className="font-hand text-sm text-txt-secondary mt-0.5">{pronouns}</p>}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {!isOwner && (
              <>
                <button
                  onClick={() => setFollowing(!following)}
                  className={following ? 'retro-btn-ghost text-sm' : 'retro-btn-pink text-sm'}
                >
                  <UserPlusIcon className="w-4 h-4" />
                  {following ? 'Following' : 'Follow'}
                </button>
                <button className="retro-btn-ghost text-sm"><MailIcon className="w-4 h-4" />Message</button>
              </>
            )}
            <button className="retro-btn-ghost text-sm"><ShareIcon className="w-4 h-4" />Share</button>
            {isOwner && (
              <button onClick={() => setEditOpen(true)} className="retro-btn-ghost text-sm">
                <EditIcon className="w-4 h-4" />Edit
              </button>
            )}
          </div>
        </div>

        {/* Bio + meta */}
        <div className="mb-7 max-w-2xl">
          {bio && <p className="text-[15px] text-txt-primary leading-relaxed mb-3">{bio}</p>}
          {!bio && !isDemo && <p className="text-sm text-txt-secondary italic mb-3">No bio yet.</p>}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-txt-secondary">
            {userLocation && (
              <span className="flex items-center gap-1.5"><MapPinIcon className="w-3.5 h-3.5 text-accent-pink" />{userLocation}</span>
            )}
            {website && (
              <a href={`https://${website}`} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-accent-blue-deep hover:underline"><GlobeIcon className="w-3.5 h-3.5" />{website}</a>
            )}
            {memberSince && (
              <span className="flex items-center gap-1.5"><ClockIcon className="w-3.5 h-3.5" />Since {memberSince}</span>
            )}
          </div>
          {quote && (
            <p className="text-sm text-txt-secondary italic mt-3 border-l-2 border-accent-pink/40 pl-3">{quote}</p>
          )}
        </div>

        {/* Stats row — only for demo */}
        {isDemo && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 mb-6 px-1">
            {[
              { label: 'logs', val: mockUser.stats.totalLogs },
              { label: 'reviews', val: mockUser.stats.reviews },
              { label: 'lists', val: mockUser.stats.lists },
              { label: 'likes', val: mockUser.stats.likes.toLocaleString() },
              { label: 'followers', val: mockUser.stats.followers.toLocaleString() },
              { label: 'following', val: mockUser.stats.following },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-baseline gap-1">
                <span className="font-mono font-bold text-txt-primary">{val}</span>
                <span className="font-hand text-xs text-txt-secondary">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`tab-pill flex items-center gap-1.5 flex-shrink-0 ${activeTab === id ? 'active' : ''}`}
            >
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pb-16">
          {tabContent[activeTab]}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwner && profileData && (
        <EditProfileModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          profile={profileData}
          onSave={handleProfileSave}
        />
      )}
      {isDemo && (
        <EditProfileModal isOpen={editOpen} onClose={() => setEditOpen(false)} />
      )}
    </div>
  )
}
