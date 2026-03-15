'use client'
import React, { useState } from 'react'
import {
  FilmIcon, GamepadIcon, BookIcon, VinylIcon, PersonIcon,
  StarFilledIcon, StarIcon, HeartIcon, HeartFilledIcon, MessageIcon,
  BookmarkIcon, ClockIcon, ChartIcon, ListIcon, EditIcon,
  ShareIcon, SettingsIcon, MapPinIcon, GlobeIcon, LinkIcon,
  AwardIcon, FireIcon, CheckIcon, PlusIcon, UserPlusIcon, GridIcon,
} from '@/components/icons'
import {
  mockUser, mockFavorites, mockActivity,
  mockReviews, mockLists, mockStats, mockBadges, mockBacklog,
} from '@/data/mockProfile'

const TABS = [
  { id: 'overview',  label: 'Overview',  icon: GridIcon      },
  { id: 'films',     label: 'Films',     icon: FilmIcon      },
  { id: 'games',     label: 'Games',     icon: GamepadIcon   },
  { id: 'books',     label: 'Books',     icon: BookIcon      },
  { id: 'albums',    label: 'Albums',    icon: VinylIcon     },
  { id: 'artists',   label: 'Artists',   icon: PersonIcon    },
  { id: 'reviews',   label: 'Reviews',   icon: MessageIcon   },
  { id: 'lists',     label: 'Lists',     icon: ListIcon      },
  { id: 'backlog',   label: 'Backlog',   icon: BookmarkIcon  },
  { id: 'stats',     label: 'Stats',     icon: ChartIcon     },
  { id: 'badges',    label: 'Badges',    icon: AwardIcon     },
  { id: 'social',    label: 'Social',    icon: UserPlusIcon  },
]

const MEDIA_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  film: FilmIcon, game: GamepadIcon, book: BookIcon,
  album: VinylIcon, artist: PersonIcon,
}

const MEDIA_COLORS: Record<string, string> = {
  film: 'text-accent-pink',   game: 'text-accent-yellow',
  book: 'text-accent-mint',   album: 'text-accent-blue',
  artist: 'text-accent-pink', list: 'text-accent-mint',
  social: 'text-accent-blue',
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        i <= Math.floor(rating)
          ? <StarFilledIcon key={i} className="w-3.5 h-3.5 text-accent-yellow" />
          : rating % 1 >= 0.5 && i === Math.ceil(rating)
            ? <StarFilledIcon key={i} className="w-3.5 h-3.5 text-accent-yellow opacity-60" />
            : <StarIcon key={i} className="w-3.5 h-3.5 text-border" />
      ))}
    </span>
  )
}

function MediaCard({ title, subtitle, rating, type }: { title: string; subtitle?: string; rating: number; type: string }) {
  const Icon = MEDIA_ICONS[type] || FilmIcon
  const color = MEDIA_COLORS[type] || 'text-accent-pink'
  return (
    <div className="retro-card retro-card-hover p-4 flex flex-col gap-3">
      <div className="w-full aspect-[2/3] bg-bg-secondary rounded-xl flex items-center justify-center border border-border">
        <Icon className={`w-8 h-8 ${color} opacity-60`} />
      </div>
      <div>
        <p className="font-hand font-bold text-sm text-txt-primary leading-tight line-clamp-2">{title}</p>
        {subtitle && <p className="font-mono text-xs text-txt-secondary mt-0.5">{subtitle}</p>}
        <div className="mt-1"><Stars rating={rating} /></div>
      </div>
    </div>
  )
}

// ── TABS ──

function TabOverview() {
  return (
    <div className="space-y-8 fade-in-up">
      {/* Quick stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: 'Films',     val: mockStats.totalFilms,   color: 'text-accent-pink',   icon: FilmIcon   },
          { label: 'Games',     val: mockStats.totalGames,   color: 'text-accent-yellow', icon: GamepadIcon},
          { label: 'Books',     val: mockStats.totalBooks,   color: 'text-accent-mint',   icon: BookIcon   },
          { label: 'Albums',    val: mockStats.totalAlbums,  color: 'text-accent-blue',   icon: VinylIcon  },
          { label: 'Artists',   val: mockStats.totalArtists, color: 'text-accent-pink',   icon: PersonIcon },
          { label: 'Reviews',   val: mockUser.stats.reviews, color: 'text-accent-yellow', icon: MessageIcon},
        ].map(({ label, val, color, icon: Icon }) => (
          <div key={label} className="retro-card text-center p-4">
            <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
            <p className={`font-mono text-xl font-bold ${color}`}>{val.toLocaleString()}</p>
            <p className="font-hand text-xs text-txt-secondary">{label}</p>
          </div>
        ))}
      </div>

      {/* Favorites row */}
      <div>
        <p className="section-label">Favorite Films</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {mockFavorites.films.map(f => <MediaCard key={f.id} title={f.title} subtitle={String(f.year)} rating={f.rating} type="film" />)}
        </div>
      </div>

      <div>
        <p className="section-label">Favorite Games</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {mockFavorites.games.map(g => <MediaCard key={g.id} title={g.title} subtitle={String(g.year)} rating={g.rating} type="game" />)}
        </div>
      </div>

      <div>
        <p className="section-label">Favorite Albums</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {mockFavorites.albums.map(a => <MediaCard key={a.id} title={a.title} subtitle={a.artist} rating={a.rating} type="album" />)}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <p className="section-label">Recent Activity</p>
        <div className="retro-card divide-y divide-border">
          {mockActivity.slice(0, 8).map(act => {
            const Icon = MEDIA_ICONS[act.type] || FireIcon
            const color = MEDIA_COLORS[act.type] || 'text-accent-pink'
            return (
              <div key={act.id} className="flex items-center gap-3 p-4 hover:bg-bg-secondary transition-colors">
                <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="font-hand text-sm text-txt-primary">
                    <span className="text-txt-secondary capitalize">{act.action}</span>{' '}
                    <span className="font-bold">{act.title}</span>
                    {'artist' in act && act.artist ? ` — ${act.artist}` : ''}
                  </p>
                </div>
                {'rating' in act && act.rating ? <Stars rating={act.rating} /> : null}
                <span className="font-mono text-xs text-txt-secondary flex-shrink-0">{act.timestamp}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TabMedia({ type }: { type: 'films' | 'games' | 'books' | 'albums' }) {
  const items = mockFavorites[type]
  const label = type.charAt(0).toUpperCase() + type.slice(1)
  const Icon = MEDIA_ICONS[type.slice(0, -1)] || FilmIcon
  const color = MEDIA_COLORS[type.slice(0, -1)] || 'text-accent-pink'
  const stat = { films: mockStats.totalFilms, games: mockStats.totalGames, books: mockStats.totalBooks, albums: mockStats.totalAlbums }[type]
  return (
    <div className="fade-in-up space-y-6">
      <div className="retro-card p-5 flex items-center gap-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <div>
          <p className={`font-mono text-2xl font-bold ${color}`}>{stat?.toLocaleString()}</p>
          <p className="font-hand text-sm text-txt-secondary">{label} logged</p>
        </div>
      </div>
      <p className="section-label">Favorites</p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={'artist' in item ? item.artist : String(item.year)}
            rating={item.rating}
            type={type.slice(0, -1)}
          />
        ))}
      </div>
      <div className="retro-card p-5 text-center">
        <p className="font-hand text-txt-secondary">Full {label} diary coming soon — showing favorites for now.</p>
      </div>
    </div>
  )
}

function TabArtists() {
  return (
    <div className="fade-in-up space-y-6">
      <p className="section-label">Favorite Artists</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockFavorites.artists.map(a => (
          <div key={a.id} className="retro-card retro-card-hover p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bg-secondary border-2 border-border flex items-center justify-center flex-shrink-0">
              <PersonIcon className="w-6 h-6 text-accent-pink" />
            </div>
            <div>
              <p className="font-hand font-bold text-txt-primary">{a.name}</p>
              <span className="chip chip-pink text-[10px]">{a.genre}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabReviews() {
  return (
    <div className="fade-in-up space-y-4">
      {mockReviews.map(r => {
        const Icon = MEDIA_ICONS[r.mediaType] || FilmIcon
        const color = MEDIA_COLORS[r.mediaType] || 'text-accent-pink'
        return (
          <div key={r.id} className="retro-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                <p className="font-hand font-bold text-txt-primary">{r.title}</p>
                <span className="font-mono text-xs text-txt-secondary">{r.year}</span>
                {r.hasSpoilers && <span className="chip chip-yellow text-[10px]">spoilers</span>}
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="font-hand text-sm text-txt-secondary leading-relaxed">{r.excerpt}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 font-hand text-sm text-txt-secondary hover:text-accent-pink transition-colors">
                <HeartIcon className="w-4 h-4" />{r.likes}
              </button>
              <button className="flex items-center gap-1 font-hand text-sm text-txt-secondary hover:text-accent-blue transition-colors">
                <MessageIcon className="w-4 h-4" />{r.comments}
              </button>
              <div className="flex gap-1 flex-wrap">
                {r.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TabLists() {
  return (
    <div className="fade-in-up grid grid-cols-1 sm:grid-cols-2 gap-4">
      {mockLists.map(l => {
        const Icon = MEDIA_ICONS[l.mediaType] || ListIcon
        const color = MEDIA_COLORS[l.mediaType] || 'text-accent-pink'
        return (
          <div key={l.id} className="retro-card retro-card-hover p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
              {l.isPinned && <span className="chip chip-yellow text-[10px]">pinned</span>}
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
  )
}

function TabBacklog() {
  const priorityColor = { high: 'chip-pink', medium: 'chip-yellow', low: 'chip' } as const
  const statusColor = { next: 'text-accent-mint', queued: 'text-accent-yellow', someday: 'text-txt-secondary' } as const
  return (
    <div className="fade-in-up space-y-3">
      {mockBacklog.map(b => {
        const Icon = MEDIA_ICONS[b.type] || FilmIcon
        const color = MEDIA_COLORS[b.type] || 'text-accent-pink'
        return (
          <div key={b.id} className="retro-card p-4 flex items-center gap-4">
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
  )
}

function TabStats() {
  return (
    <div className="fade-in-up space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Hours Watched',  val: mockStats.hoursWatched.toLocaleString(), color: 'text-accent-pink',   icon: FilmIcon    },
          { label: 'Hours Played',   val: mockStats.hoursPlayed.toLocaleString(),  color: 'text-accent-yellow', icon: GamepadIcon },
          { label: 'Pages Read',     val: mockStats.pagesRead.toLocaleString(),    color: 'text-accent-mint',   icon: BookIcon    },
          { label: 'Hours Listened', val: mockStats.hoursListened.toLocaleString(),color: 'text-accent-blue',   icon: VinylIcon   },
        ].map(({ label, val, color, icon: Icon }) => (
          <div key={label} className="retro-card p-5 text-center">
            <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
            <p className={`font-mono text-2xl font-bold ${color}`}>{val}</p>
            <p className="font-hand text-xs text-txt-secondary mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="retro-card p-5">
          <p className="section-label">Current Streak</p>
          <div className="flex items-center gap-2">
            <FireIcon className="w-6 h-6 text-accent-yellow" />
            <span className="font-mono text-3xl font-bold text-accent-yellow">{mockStats.currentStreak}</span>
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
                  <div className="h-full bg-accent-yellow rounded-full transition-all" style={{width:`${(v / 5) * 100}%`}} />
                </div>
                <span className="font-mono text-xs font-bold text-txt-primary">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="retro-card p-5">
        <p className="section-label">Top Genres</p>
        <div className="flex flex-wrap gap-2">
          {mockStats.topGenres.map((g, i) => (
            <span key={g} className={`chip ${i < 3 ? 'chip-pink' : i < 5 ? 'chip-yellow' : 'chip-mint'}`}>{g}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabBadges() {
  const bgMap: Record<string, string> = {
    'accent-pink': 'bg-accent-pink/10 border-accent-pink/30',
    'accent-mint': 'bg-accent-mint/10 border-accent-mint/30',
    'accent-blue': 'bg-accent-blue/10 border-accent-blue/30',
    'accent-yellow': 'bg-accent-yellow/20 border-accent-yellow/40',
  }
  const txtMap: Record<string, string> = {
    'accent-pink': 'text-accent-pink', 'accent-mint': 'text-accent-mint',
    'accent-blue': 'text-accent-blue', 'accent-yellow': 'text-dark',
  }
  return (
    <div className="fade-in-up grid grid-cols-2 sm:grid-cols-3 gap-4">
      {mockBadges.map(b => (
        <div key={b.id} className={`retro-card p-5 text-center border-2 ${bgMap[b.color] ?? ''}`}>
          <AwardIcon className={`w-8 h-8 mx-auto mb-3 ${txtMap[b.color] ?? 'text-txt-secondary'}`} />
          <p className="font-hand font-bold text-txt-primary">{b.name}</p>
          <p className="font-hand text-xs text-txt-secondary mt-1">{b.description}</p>
          <CheckIcon className="w-4 h-4 text-accent-mint mx-auto mt-2" />
        </div>
      ))}
    </div>
  )
}

function TabSocial() {
  return (
    <div className="fade-in-up space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Followers', val: mockUser.stats.followers, color: 'text-accent-pink' },
          { label: 'Following', val: mockUser.stats.following, color: 'text-accent-blue' },
        ].map(({ label, val, color }) => (
          <div key={label} className="retro-card p-5 text-center">
            <p className={`font-mono text-3xl font-bold ${color}`}>{val.toLocaleString()}</p>
            <p className="font-hand text-sm text-txt-secondary mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="retro-card p-5 text-center">
        <UserPlusIcon className="w-8 h-8 text-accent-blue mx-auto mb-3" />
        <p className="font-hand text-txt-secondary">Friend feed and follower list coming soon.</p>
        <button className="retro-btn-pink mt-4 text-sm"><UserPlusIcon className="w-4 h-4" />Follow</button>
      </div>
    </div>
  )
}

// ── MAIN PAGE ──

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [following, setFollowing] = useState(false)

  const tabContent: Record<string, React.ReactNode> = {
    overview: <TabOverview />,
    films:    <TabMedia type="films" />,
    games:    <TabMedia type="games" />,
    books:    <TabMedia type="books" />,
    albums:   <TabMedia type="albums" />,
    artists:  <TabArtists />,
    reviews:  <TabReviews />,
    lists:    <TabLists />,
    backlog:  <TabBacklog />,
    stats:    <TabStats />,
    badges:   <TabBadges />,
    social:   <TabSocial />,
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-15" />

      {/* COVER */}
      <div className="w-full h-44 md:h-56 bg-gradient-to-r from-accent-pink via-accent-yellow to-accent-mint relative">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(45deg,rgba(0,0,0,0.05) 0px,transparent 1px,transparent 8px)'}} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-pixel text-white/20 text-2xl md:text-4xl select-none">{mockUser.displayName}</p>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="relative flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-bg-secondary border-4 border-bg-primary shadow-retro flex items-center justify-center flex-shrink-0">
            <span className="font-pixel text-3xl text-accent-pink">{mockUser.displayName.charAt(0)}</span>
          </div>
          {/* Info */}
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-hand font-bold text-2xl text-txt-primary">{mockUser.displayName}</h1>
              {mockUser.isVerified && <span className="chip chip-blue text-[10px]"><CheckIcon className="w-3 h-3" />verified</span>}
              {mockUser.isSupporter && <span className="chip chip-yellow text-[10px]">supporter</span>}
            </div>
            <p className="font-mono text-sm text-txt-secondary">@{params.username}</p>
            <p className="font-hand text-sm text-txt-secondary mt-1">{mockUser.pronouns}</p>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFollowing(!following)}
              className={following ? 'retro-btn-ghost text-sm' : 'retro-btn-pink text-sm'}
            >
              <UserPlusIcon className="w-4 h-4" />
              {following ? 'Following' : 'Follow'}
            </button>
            <button className="retro-btn-ghost text-sm"><ShareIcon className="w-4 h-4" />Share</button>
            <button className="retro-btn-ghost text-sm p-2.5"><SettingsIcon className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Bio + meta */}
        <div className="retro-card p-5 mb-6">
          <p className="font-hand text-sm text-txt-primary leading-relaxed mb-4">{mockUser.bio}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {mockUser.location && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-txt-secondary">
                <MapPinIcon className="w-3.5 h-3.5 text-accent-pink" />{mockUser.location}
              </span>
            )}
            {mockUser.website && (
              <a href={`https://${mockUser.website}`} target="_blank" rel="noopener" className="flex items-center gap-1.5 font-mono text-xs text-accent-blue hover:underline">
                <GlobeIcon className="w-3.5 h-3.5" />{mockUser.website}
              </a>
            )}
            <span className="flex items-center gap-1.5 font-mono text-xs text-txt-secondary">
              <ClockIcon className="w-3.5 h-3.5 text-accent-mint" />Member since {mockUser.memberSince}
            </span>
          </div>
          {mockUser.favoriteQuote && (
            <p className="font-hand text-sm text-txt-secondary italic mt-4 border-l-2 border-accent-yellow pl-3">
              {mockUser.favoriteQuote}
            </p>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-6 px-1">
          {[
            { label: 'logs',      val: mockUser.stats.totalLogs },
            { label: 'reviews',   val: mockUser.stats.reviews },
            { label: 'lists',     val: mockUser.stats.lists },
            { label: 'likes',     val: mockUser.stats.likes.toLocaleString() },
            { label: 'followers', val: mockUser.stats.followers.toLocaleString() },
            { label: 'following', val: mockUser.stats.following },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-baseline gap-1">
              <span className="font-mono font-bold text-txt-primary">{val}</span>
              <span className="font-hand text-xs text-txt-secondary">{label}</span>
            </div>
          ))}
        </div>

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
    </div>
  )
}
