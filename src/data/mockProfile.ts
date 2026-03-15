export const mockUser = {
  id: 'usr_001',
  username: 'retromatheus',
  displayName: 'Matheus Marques',
  pronouns: 'he/him',
  bio: 'Cinephile, gamer, bookworm, vinyl collector. Logging every piece of media that shaped me. Taylor Swift enthusiast. Anime connoisseur. Building RetroMynd.',
  location: 'Fortaleza, CE, Brazil',
  website: 'retromynd.com',
  memberSince: 'March 2026',
  favoriteQuote: '"The stuff that dreams are made of." — The Maltese Falcon',
  avatar: null as null,
  coverImage: null as null,
  isVerified: true,
  isSupporter: true,
  theme: 'Paper Light',
  accentColor: '#FF6B9D',
  stats: {
    following: 184,
    followers: 1203,
    totalLogs: 2847,
    reviews: 312,
    lists: 47,
    likes: 8921,
  },
  profileCompletion: 92,
}

export const mockFavorites = {
  films: [
    { id: 'f1', title: 'Blade Runner 2049', year: 2017, rating: 5 },
    { id: 'f2', title: 'Spirited Away',      year: 2001, rating: 5 },
    { id: 'f3', title: 'Parasite',           year: 2019, rating: 5 },
    { id: 'f4', title: 'Moonlight',          year: 2016, rating: 5 },
    { id: 'f5', title: 'The Grand Budapest Hotel', year: 2014, rating: 4.5 },
  ],
  games: [
    { id: 'g1', title: 'Hollow Knight',  year: 2017, rating: 5 },
    { id: 'g2', title: 'Elden Ring',     year: 2022, rating: 5 },
    { id: 'g3', title: 'Celeste',        year: 2018, rating: 5 },
    { id: 'g4', title: 'The Last of Us', year: 2013, rating: 5 },
    { id: 'g5', title: 'Hades',          year: 2020, rating: 4.5 },
  ],
  books: [
    { id: 'b1', title: 'Dune',           year: 1965, rating: 5 },
    { id: 'b2', title: '1984',           year: 1949, rating: 5 },
    { id: 'b3', title: 'Norwegian Wood', year: 1987, rating: 4.5 },
    { id: 'b4', title: 'The Alchemist',  year: 1988, rating: 4 },
    { id: 'b5', title: 'Sapiens',        year: 2011, rating: 4.5 },
  ],
  albums: [
    { id: 'a1', title: 'Random Access Memories', artist: 'Daft Punk',      year: 2013, rating: 5 },
    { id: 'a2', title: 'Folklore',               artist: 'Taylor Swift',   year: 2020, rating: 5 },
    { id: 'a3', title: 'To Pimp a Butterfly',    artist: 'Kendrick Lamar', year: 2015, rating: 5 },
    { id: 'a4', title: 'OK Computer',            artist: 'Radiohead',      year: 1997, rating: 5 },
    { id: 'a5', title: 'The Tortured Poets Dept',artist: 'Taylor Swift',   year: 2024, rating: 4.5 },
  ],
  artists: [
    { id: 'ar1', name: 'Taylor Swift',   genre: 'Pop / Folk' },
    { id: 'ar2', name: 'Kendrick Lamar', genre: 'Hip-Hop' },
    { id: 'ar3', name: 'Radiohead',      genre: 'Alt Rock' },
    { id: 'ar4', name: 'Daft Punk',      genre: 'Electronic' },
    { id: 'ar5', name: 'Frank Ocean',    genre: 'R&B' },
  ],
}

export const mockActivity = [
  { id: 'a1',  type: 'film',   action: 'logged',      title: 'Dune: Part Two',          rating: 4.5, timestamp: '2 hours ago' },
  { id: 'a2',  type: 'game',   action: 'finished',    title: "Baldur's Gate 3",          rating: 5,   timestamp: '5 hours ago' },
  { id: 'a3',  type: 'album',  action: 'rated',       title: 'GNX',  artist: 'Kendrick Lamar', rating: 4, timestamp: '8 hours ago' },
  { id: 'a4',  type: 'book',   action: 'started',     title: 'Project Hail Mary',                    timestamp: '1 day ago' },
  { id: 'a5',  type: 'artist', action: 'favorited',   title: 'SZA',                                  timestamp: '1 day ago' },
  { id: 'a6',  type: 'film',   action: 'reviewed',    title: 'Past Lives',              rating: 4.5, timestamp: '2 days ago' },
  { id: 'a7',  type: 'list',   action: 'created',     title: 'Comfort Films for Rainy Days',         timestamp: '2 days ago' },
  { id: 'a8',  type: 'social', action: 'followed',    title: '@cinephile_sam',                       timestamp: '3 days ago' },
  { id: 'a9',  type: 'game',   action: 'logged',      title: 'Persona 5 Royal',         rating: 5,   timestamp: '3 days ago' },
  { id: 'a10', type: 'film',   action: 'liked_review',title: 'Everything Everywhere All at Once',     timestamp: '4 days ago' },
]

export const mockReviews = [
  { id: 'r1', mediaType: 'film',  title: 'Dune: Part Two',    year: 2024, rating: 4.5, excerpt: 'Villeneuve continues to prove he is the master of epic sci-fi. The scale is breathtaking, the performances mesmerizing. Zendaya finally gets her moment.', likes: 247, comments: 18, tags: ['sci-fi','epic','sequel'],          hasSpoilers: false },
  { id: 'r2', mediaType: 'game',  title: "Baldur's Gate 3",  year: 2023, rating: 5,   excerpt: 'New gold standard for CRPGs. Every choice matters, every companion feels real. 200 hours in and still discovering new things. Larian, you beautiful geniuses.', likes: 389, comments: 42, tags: ['rpg','masterpiece','choice-driven'], hasSpoilers: false },
  { id: 'r3', mediaType: 'film',  title: 'Past Lives',        year: 2023, rating: 4.5, excerpt: 'A devastating meditation on lives we could have lived. Greta Lee delivers one of the most quietly powerful performances of the decade. The final scene broke me.', likes: 156, comments: 11, tags: ['romance','drama','immigration'],   hasSpoilers: true  },
  { id: 'r4', mediaType: 'album', title: 'Folklore',          year: 2020, rating: 5,   excerpt: "Taylor's magnum opus. Every track is a short story, every lyric a painting. This album saved my 2020 and I'm not being dramatic. Exile and August are perfection.", likes: 512, comments: 67, tags: ['indie-folk','storytelling','masterpiece'], hasSpoilers: false },
  { id: 'r5', mediaType: 'book',  title: 'Dune',              year: 1965, rating: 5,   excerpt: 'The greatest world-building in all of literature. Herbert created a universe so rich and detailed that 60 years later we are still unpacking its layers.', likes: 203, comments: 24, tags: ['sci-fi','classic','world-building'],  hasSpoilers: false },
]

export const mockLists = [
  { id: 'l1', title: 'Comfort Films for Rainy Days',   description: 'When the weather is gloomy and you need a warm hug from cinema.', itemCount: 24, likes: 89,  comments: 12, isPinned: true,  mediaType: 'film'  },
  { id: 'l2', title: 'Games That Made Me Cry',         description: 'Interactive experiences that broke me emotionally.',               itemCount: 15, likes: 134, comments: 8,  isPinned: false, mediaType: 'game'  },
  { id: 'l3', title: 'Best Rainy Day Albums',          description: 'Perfect soundtracks for melancholic evenings.',                    itemCount: 32, likes: 67,  comments: 5,  isPinned: false, mediaType: 'album' },
  { id: 'l4', title: 'Books That Changed My Worldview',description: 'Reading that fundamentally shifted how I see things.',             itemCount: 18, likes: 201, comments: 29, isPinned: true,  mediaType: 'book'  },
  { id: 'l5', title: 'Favorite Boss Fights',           description: 'The most memorable boss encounters in gaming history.',            itemCount: 20, likes: 45,  comments: 7,  isPinned: false, mediaType: 'game'  },
]

export const mockStats = {
  totalFilms: 847, totalGames: 203, totalBooks: 156, totalAlbums: 412, totalArtists: 89,
  hoursWatched: 1694, hoursPlayed: 2847, hoursListened: 3201, pagesRead: 48720,
  avgRating: { film: 3.8, game: 4.1, book: 3.9, album: 3.7 },
  topGenres: ['Sci-Fi','RPG','Indie Folk','Literary Fiction','Alt Rock','Drama','Metroidvania','Hip-Hop'],
  currentStreak: 47,
  longestStreak: 89,
  monthlyActivity: [12,18,24,15,31,22,28,19,35,27,20,14],
  ratingDistribution: [5,12,28,45,62,89,134,187,156,129],
}

export const mockBadges = [
  { id: 'bd1', name: 'Century Club',  description: 'Logged 100 films',         color: 'accent-pink'   },
  { id: 'bd2', name: 'Bookworm',      description: 'Read 100 books',           color: 'accent-mint'   },
  { id: 'bd3', name: 'Vinyl Junkie',  description: 'Rated 200 albums',         color: 'accent-blue'   },
  { id: 'bd4', name: 'Completionist', description: 'Finished 50 games',        color: 'accent-yellow' },
  { id: 'bd5', name: 'Tastemaker',    description: '1000 likes on reviews',    color: 'accent-pink'   },
  { id: 'bd6', name: 'Streak Master', description: '30-day logging streak',    color: 'accent-mint'   },
]

export const mockBacklog = [
  { id: 'bl1', title: 'The Substance',                  type: 'film',  priority: 'high',   estimatedTime: '2h 20min', status: 'next'    },
  { id: 'bl2', title: 'Metaphor: ReFantazio',           type: 'game',  priority: 'high',   estimatedTime: '80h',      status: 'next'    },
  { id: 'bl3', title: 'Tomorrow and Tomorrow',          type: 'book',  priority: 'medium', estimatedTime: '12h',      status: 'queued'  },
  { id: 'bl4', title: 'Brat',                           type: 'album', priority: 'medium', estimatedTime: '45min',    status: 'queued'  },
  { id: 'bl5', title: 'Nosferatu',                      type: 'film',  priority: 'high',   estimatedTime: '2h 12min', status: 'next'    },
  { id: 'bl6', title: 'Astro Bot',                      type: 'game',  priority: 'low',    estimatedTime: '15h',      status: 'someday' },
]
