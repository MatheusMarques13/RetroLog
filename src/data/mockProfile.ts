// ============================================================
// RETROLOG — RICH MOCK DATA FOR PROFILE PAGE
// ============================================================

export const mockUser = {
  id: 'usr_001',
  username: 'retromatheus',
  displayName: 'Matheus Marques',
  pronouns: 'he/him',
  bio: 'Cinephile, gamer, bookworm, vinyl collector. Logging every piece of media that shaped me. Taylor Swift enthusiast. Anime connoisseur. Building RetroMynd.',
  location: 'Fortaleza, CE, Brazil',
  website: 'retromynd.com',
  memberSince: 'March 2026',
  favoriteQuote: '"The stuff that dreams are made of." -- The Maltese Falcon',
  avatar: null as null,
  coverImage: null as null,
  isVerified: true,
  isSupporter: true,
  theme: 'Paper Light',
  accentColor: '#FF6B9D',
  layoutStyle: 'Classic',
  stats: {
    following: 184,
    followers: 1203,
    totalLogs: 2847,
    reviews: 312,
    lists: 47,
    likes: 8921,
    mutuals: 67,
  },
  profileCompletion: 92,
  currentObsession: {
    title: 'Baldur\'s Gate 3',
    type: 'game' as const,
    note: 'On my third playthrough. Send help.',
  },
  socialLinks: {
    twitter: '@retromatheus',
    letterboxd: 'retromatheus',
    github: 'MatheusMarques13',
  },
  extendedBio: 'I grew up in a small town in northeast Brazil watching bootleg DVDs and playing emulated SNES games. That chaotic media diet shaped my taste forever. I believe in the power of stories to connect people across borders and generations. When I\'m not logging media, I\'m building tools for people who love media as much as I do.',
  tasteTags: ['Cinephile', 'Gamer', 'Bookworm', 'Vinyl Head', 'Anime Fan', 'Sci-Fi Nerd', 'Indie Seeker', 'Retro Enthusiast'],
  influences: ['Hayao Miyazaki', 'Denis Villeneuve', 'Haruki Murakami', 'Hideo Kojima', 'Taylor Swift', 'Frank Herbert'],
  favoriteGenres: ['Sci-Fi', 'RPG', 'Indie Folk', 'Literary Fiction', 'Metroidvania', 'Drama', 'Alt Rock', 'Animation'],
  favoriteCreators: ['Studio Ghibli', 'A24', 'FromSoftware', 'Team Cherry', 'Radiohead'],
  accountMilestones: [
    { date: 'Jan 2026', event: 'Joined RetroLog' },
    { date: 'Jan 2026', event: 'Became a supporter' },
    { date: 'Feb 2026', event: 'First review reached 100 likes' },
    { date: 'Feb 2026', event: '42-day logging streak' },
    { date: 'Mar 2026', event: 'Reached 1000 followers' },
    { date: 'Mar 2026', event: 'Featured on Explore page' },
  ],
}

export const mockFavorites = {
  films: [
    { id: 'f1', title: 'Blade Runner 2049', year: 2017, rating: 5 },
    { id: 'f2', title: 'Spirited Away', year: 2001, rating: 5 },
    { id: 'f3', title: 'Parasite', year: 2019, rating: 5 },
    { id: 'f4', title: 'Moonlight', year: 2016, rating: 5 },
    { id: 'f5', title: 'The Grand Budapest Hotel', year: 2014, rating: 4.5 },
  ],
  games: [
    { id: 'g1', title: 'Hollow Knight', year: 2017, rating: 5 },
    { id: 'g2', title: 'Elden Ring', year: 2022, rating: 5 },
    { id: 'g3', title: 'Celeste', year: 2018, rating: 5 },
    { id: 'g4', title: 'The Last of Us', year: 2013, rating: 5 },
    { id: 'g5', title: 'Hades', year: 2020, rating: 4.5 },
  ],
  books: [
    { id: 'b1', title: 'Dune', year: 1965, rating: 5 },
    { id: 'b2', title: '1984', year: 1949, rating: 5 },
    { id: 'b3', title: 'Norwegian Wood', year: 1987, rating: 4.5 },
    { id: 'b4', title: 'The Alchemist', year: 1988, rating: 4 },
    { id: 'b5', title: 'Sapiens', year: 2011, rating: 4.5 },
  ],
  albums: [
    { id: 'a1', title: 'Random Access Memories', artist: 'Daft Punk', year: 2013, rating: 5 },
    { id: 'a2', title: 'Folklore', artist: 'Taylor Swift', year: 2020, rating: 5 },
    { id: 'a3', title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', year: 2015, rating: 5 },
    { id: 'a4', title: 'OK Computer', artist: 'Radiohead', year: 1997, rating: 5 },
    { id: 'a5', title: 'The Tortured Poets Dept', artist: 'Taylor Swift', year: 2024, rating: 4.5 },
  ],
  artists: [
    { id: 'ar1', name: 'Taylor Swift', genre: 'Pop / Folk' },
    { id: 'ar2', name: 'Kendrick Lamar', genre: 'Hip-Hop' },
    { id: 'ar3', name: 'Radiohead', genre: 'Alt Rock' },
    { id: 'ar4', name: 'Daft Punk', genre: 'Electronic' },
    { id: 'ar5', name: 'Frank Ocean', genre: 'R&B' },
  ],
}

export const mockActivity = [
  { id: 'a1', type: 'film', action: 'logged', title: 'Dune: Part Two', rating: 4.5, timestamp: '2 hours ago' },
  { id: 'a2', type: 'game', action: 'finished', title: "Baldur's Gate 3", rating: 5, timestamp: '5 hours ago' },
  { id: 'a3', type: 'album', action: 'rated', title: 'GNX', artist: 'Kendrick Lamar', rating: 4, timestamp: '8 hours ago' },
  { id: 'a4', type: 'book', action: 'started', title: 'Project Hail Mary', timestamp: '1 day ago' },
  { id: 'a5', type: 'artist', action: 'favorited', title: 'SZA', timestamp: '1 day ago' },
  { id: 'a6', type: 'film', action: 'reviewed', title: 'Past Lives', rating: 4.5, timestamp: '2 days ago' },
  { id: 'a7', type: 'list', action: 'created', title: 'Comfort Films for Rainy Days', timestamp: '2 days ago' },
  { id: 'a8', type: 'social', action: 'followed', title: '@cinephile_sam', timestamp: '3 days ago' },
  { id: 'a9', type: 'game', action: 'logged', title: 'Persona 5 Royal', rating: 5, timestamp: '3 days ago' },
  { id: 'a10', type: 'film', action: 'liked review of', title: 'Everything Everywhere All at Once', timestamp: '4 days ago' },
  { id: 'a11', type: 'album', action: 'logged', title: 'Brat', artist: 'Charli XCX', rating: 4, timestamp: '4 days ago' },
  { id: 'a12', type: 'book', action: 'finished', title: 'Piranesi', rating: 4.5, timestamp: '5 days ago' },
  { id: 'a13', type: 'film', action: 'rewatched', title: 'Interstellar', rating: 5, timestamp: '5 days ago' },
  { id: 'a14', type: 'social', action: 'shared list', title: 'Best Boss Fights Ever', timestamp: '6 days ago' },
  { id: 'a15', type: 'game', action: 'rated', title: 'Astro Bot', rating: 4.5, timestamp: '6 days ago' },
  { id: 'a16', type: 'album', action: 'favorited', title: 'In Rainbows', artist: 'Radiohead', timestamp: '1 week ago' },
  { id: 'a17', type: 'film', action: 'logged', title: 'The Substance', rating: 3.5, timestamp: '1 week ago' },
  { id: 'a18', type: 'book', action: 'started', title: 'Tomorrow, and Tomorrow, and Tomorrow', timestamp: '1 week ago' },
]

export const mockReviews = [
  { id: 'r1', mediaType: 'film', title: 'Dune: Part Two', year: 2024, rating: 4.5, excerpt: 'Villeneuve continues to prove he is the master of epic sci-fi. The scale is breathtaking, the performances mesmerizing. Zendaya finally gets her moment.', likes: 247, comments: 18, tags: ['sci-fi', 'epic', 'sequel'], hasSpoilers: false },
  { id: 'r2', mediaType: 'game', title: "Baldur's Gate 3", year: 2023, rating: 5, excerpt: 'New gold standard for CRPGs. Every choice matters, every companion feels real. 200 hours in and still discovering new things. Larian, you beautiful geniuses.', likes: 389, comments: 42, tags: ['rpg', 'masterpiece', 'choice-driven'], hasSpoilers: false },
  { id: 'r3', mediaType: 'film', title: 'Past Lives', year: 2023, rating: 4.5, excerpt: 'A devastating meditation on lives we could have lived. Greta Lee delivers one of the most quietly powerful performances of the decade. The final scene broke me.', likes: 156, comments: 11, tags: ['romance', 'drama', 'immigration'], hasSpoilers: true },
  { id: 'r4', mediaType: 'album', title: 'Folklore', year: 2020, rating: 5, excerpt: "Taylor's magnum opus. Every track is a short story, every lyric a painting. This album saved my 2020 and I'm not being dramatic. Exile and August are perfection.", likes: 512, comments: 67, tags: ['indie-folk', 'storytelling', 'masterpiece'], hasSpoilers: false },
  { id: 'r5', mediaType: 'book', title: 'Dune', year: 1965, rating: 5, excerpt: 'The greatest world-building in all of literature. Herbert created a universe so rich and detailed that 60 years later we are still unpacking its layers.', likes: 203, comments: 24, tags: ['sci-fi', 'classic', 'world-building'], hasSpoilers: false },
  { id: 'r6', mediaType: 'game', title: 'Hollow Knight', year: 2017, rating: 5, excerpt: 'Team Cherry built a world so rich and melancholic it feels like discovering a lost civilization. The combat is tight, the lore is deep, and Hornet is a legend.', likes: 312, comments: 29, tags: ['metroidvania', 'indie', 'atmospheric'], hasSpoilers: false },
  { id: 'r7', mediaType: 'film', title: 'Everything Everywhere All at Once', year: 2022, rating: 5, excerpt: 'A film about everything, which sounds impossible and yet they pulled it off. The multiverse as a metaphor for immigrant experience and family trauma is genius.', likes: 478, comments: 53, tags: ['sci-fi', 'action', 'family'], hasSpoilers: false },
  { id: 'r8', mediaType: 'album', title: 'Random Access Memories', year: 2013, rating: 5, excerpt: 'Daft Punk said goodbye by making the most human album of the decade. Touch alone contains more emotion than entire discographies. Giorgio by Moroder is storytelling perfection.', likes: 289, comments: 31, tags: ['electronic', 'disco', 'masterpiece'], hasSpoilers: false },
]

export const mockLists = [
  { id: 'l1', title: 'Comfort Films for Rainy Days', description: 'When the weather is gloomy and you need a warm hug from cinema.', itemCount: 24, likes: 89, comments: 12, isPinned: true, mediaType: 'film' },
  { id: 'l2', title: 'Games That Made Me Cry', description: 'Interactive experiences that broke me emotionally.', itemCount: 15, likes: 134, comments: 8, isPinned: false, mediaType: 'game' },
  { id: 'l3', title: 'Best Rainy Day Albums', description: 'Perfect soundtracks for melancholic evenings.', itemCount: 32, likes: 67, comments: 5, isPinned: false, mediaType: 'album' },
  { id: 'l4', title: 'Books That Changed My Worldview', description: 'Reading that fundamentally shifted how I see things.', itemCount: 18, likes: 201, comments: 29, isPinned: true, mediaType: 'book' },
  { id: 'l5', title: 'Favorite Boss Fights', description: 'The most memorable boss encounters in gaming history.', itemCount: 20, likes: 45, comments: 7, isPinned: false, mediaType: 'game' },
  { id: 'l6', title: 'Films That Should Be Games', description: 'Movies with worlds so rich they deserve to be explored interactively.', itemCount: 12, likes: 178, comments: 23, isPinned: false, mediaType: 'film' },
  { id: 'l7', title: 'Albums to Code To', description: 'The ultimate programming playlist. Ambient, electronic, focused.', itemCount: 28, likes: 345, comments: 41, isPinned: false, mediaType: 'album' },
  { id: 'l8', title: 'Sci-Fi Canon: The Essentials', description: 'Every sci-fi film, book, and game you need to experience.', itemCount: 50, likes: 567, comments: 72, isPinned: false, mediaType: 'film' },
]

export const mockStats = {
  totalFilms: 847, totalGames: 203, totalBooks: 156, totalAlbums: 412, totalArtists: 89,
  hoursWatched: 1694, hoursPlayed: 2847, hoursListened: 3201, pagesRead: 48720,
  avgRating: { film: 3.8, game: 4.1, book: 3.9, album: 3.7 },
  topGenres: ['Sci-Fi', 'RPG', 'Indie Folk', 'Literary Fiction', 'Alt Rock', 'Drama', 'Metroidvania', 'Hip-Hop'],
  currentStreak: 47,
  longestStreak: 89,
  monthlyActivity: [12, 18, 24, 15, 31, 22, 28, 19, 35, 27, 20, 14],
  ratingDistribution: [5, 12, 28, 45, 62, 89, 134, 187, 156, 129],
  completionRates: { film: 94, game: 78, book: 82, album: 97 },
  mostActiveDay: 'Saturday',
  mostActiveTime: 'Late night (10pm-2am)',
  thisMonthMedia: { films: 14, games: 3, books: 2, albums: 8, total: 27 },
}

export const mockBadges = [
  { id: 'bd1', name: 'Century Club', description: 'Logged 100 films', color: 'accent-pink' },
  { id: 'bd2', name: 'Bookworm', description: 'Read 100 books', color: 'accent-mint' },
  { id: 'bd3', name: 'Vinyl Junkie', description: 'Rated 200 albums', color: 'accent-blue' },
  { id: 'bd4', name: 'Completionist', description: 'Finished 50 games', color: 'accent-yellow' },
  { id: 'bd5', name: 'Tastemaker', description: '1000 likes on reviews', color: 'accent-pink' },
  { id: 'bd6', name: 'Streak Master', description: '30-day logging streak', color: 'accent-mint' },
  { id: 'bd7', name: 'Curator', description: 'Created 25 lists', color: 'accent-blue' },
  { id: 'bd8', name: 'Explorer', description: 'Logged all 5 media types', color: 'accent-yellow' },
  { id: 'bd9', name: 'Social Butterfly', description: '100 followers', color: 'accent-pink' },
]

export const mockBacklog = [
  { id: 'bl1', title: 'The Substance', type: 'film', priority: 'high', estimatedTime: '2h 20min', status: 'next' },
  { id: 'bl2', title: 'Metaphor: ReFantazio', type: 'game', priority: 'high', estimatedTime: '80h', status: 'next' },
  { id: 'bl3', title: 'Tomorrow and Tomorrow', type: 'book', priority: 'medium', estimatedTime: '12h', status: 'queued' },
  { id: 'bl4', title: 'Brat', type: 'album', priority: 'medium', estimatedTime: '45min', status: 'queued' },
  { id: 'bl5', title: 'Nosferatu', type: 'film', priority: 'high', estimatedTime: '2h 12min', status: 'next' },
  { id: 'bl6', title: 'Astro Bot', type: 'game', priority: 'low', estimatedTime: '15h', status: 'someday' },
  { id: 'bl7', title: 'Intermezzo', type: 'book', priority: 'medium', estimatedTime: '10h', status: 'queued' },
  { id: 'bl8', title: 'Hit Me Hard and Soft', type: 'album', priority: 'high', estimatedTime: '53min', status: 'next' },
  { id: 'bl9', title: 'A Real Pain', type: 'film', priority: 'medium', estimatedTime: '1h 30min', status: 'queued' },
  { id: 'bl10', title: 'Indiana Jones & The Great Circle', type: 'game', priority: 'low', estimatedTime: '25h', status: 'someday' },
]

export const mockDiary = [
  { id: 'd1', date: '2026-03-15', title: 'Dune: Part Two', type: 'film', rating: 4.5, note: 'Finally saw it in IMAX. The sandworm riding sequence is pure cinema.', mood: 'intense', context: 'theater' },
  { id: 'd2', date: '2026-03-14', title: "Baldur's Gate 3", type: 'game', rating: 5, note: 'Finished Act 3. The ending hit different this time.', mood: 'emotional', context: 'late-night' },
  { id: 'd3', date: '2026-03-13', title: 'GNX', type: 'album', rating: 4, note: 'Kendrick keeps evolving. Not his best but still ahead of everyone else.', mood: 'focused', context: 'commute' },
  { id: 'd4', date: '2026-03-12', title: 'Project Hail Mary', type: 'book', note: 'Started reading. 50 pages in and already hooked.', mood: 'curious', context: 'weekend' },
  { id: 'd5', date: '2026-03-11', title: 'Past Lives', type: 'film', rating: 4.5, note: 'Rewatched with friends. Everyone cried.', mood: 'comfort', context: 'weekend' },
  { id: 'd6', date: '2026-03-10', title: 'Persona 5 Royal', type: 'game', rating: 5, note: 'The third semester content is incredible. Best JRPG of its generation.', mood: 'intense', context: 'late-night' },
  { id: 'd7', date: '2026-03-09', title: 'Folklore', type: 'album', rating: 5, note: 'Annual relisten. Still perfect. Still healing.', mood: 'comfort', context: 'study-break' },
]

export const mockCollection = [
  { id: 'c1', title: 'Blade Runner 2049', type: 'film', status: 'finished', year: 2017, rating: 5, rewatches: 3, format: 'Blu-ray' },
  { id: 'c2', title: 'Hollow Knight', type: 'game', status: 'finished', year: 2017, rating: 5, rewatches: 2, format: 'Digital' },
  { id: 'c3', title: 'Dune', type: 'book', status: 'finished', year: 1965, rating: 5, rewatches: 1, format: 'Hardcover' },
  { id: 'c4', title: 'Random Access Memories', type: 'album', status: 'finished', year: 2013, rating: 5, rewatches: 50, format: 'Vinyl' },
  { id: 'c5', title: 'Elden Ring', type: 'game', status: 'in_progress', year: 2022, rating: 5, rewatches: 0, format: 'Digital' },
  { id: 'c6', title: 'Norwegian Wood', type: 'book', status: 'finished', year: 1987, rating: 4.5, rewatches: 0, format: 'Paperback' },
  { id: 'c7', title: 'Parasite', type: 'film', status: 'finished', year: 2019, rating: 5, rewatches: 4, format: 'Digital' },
  { id: 'c8', title: 'Celeste', type: 'game', status: 'finished', year: 2018, rating: 5, rewatches: 1, format: 'Digital' },
  { id: 'c9', title: 'OK Computer', type: 'album', status: 'finished', year: 1997, rating: 5, rewatches: 100, format: 'Vinyl' },
  { id: 'c10', title: 'Project Hail Mary', type: 'book', status: 'in_progress', year: 2021, rewatches: 0, format: 'eBook' },
  { id: 'c11', title: 'The Grand Budapest Hotel', type: 'film', status: 'owned', year: 2014, rating: 4.5, rewatches: 2, format: 'Blu-ray' },
  { id: 'c12', title: 'Hades', type: 'game', status: 'finished', year: 2020, rating: 4.5, rewatches: 3, format: 'Digital' },
]

export const mockRatings = [
  { id: 'rt1', title: 'Blade Runner 2049', type: 'film', year: 2017, rating: 5, isFavorite: true, rewatches: 3 },
  { id: 'rt2', title: 'Spirited Away', type: 'film', year: 2001, rating: 5, isFavorite: true, rewatches: 5 },
  { id: 'rt3', title: 'Parasite', type: 'film', year: 2019, rating: 5, isFavorite: true, rewatches: 4 },
  { id: 'rt4', title: 'Hollow Knight', type: 'game', year: 2017, rating: 5, isFavorite: true, rewatches: 2 },
  { id: 'rt5', title: 'Elden Ring', type: 'game', year: 2022, rating: 5, isFavorite: true, rewatches: 1 },
  { id: 'rt6', title: 'Dune', type: 'book', year: 1965, rating: 5, isFavorite: true, rewatches: 1 },
  { id: 'rt7', title: 'Random Access Memories', type: 'album', year: 2013, rating: 5, isFavorite: true, rewatches: 50 },
  { id: 'rt8', title: 'Folklore', type: 'album', year: 2020, rating: 5, isFavorite: true, rewatches: 100 },
  { id: 'rt9', title: 'The Substance', type: 'film', year: 2024, rating: 3.5, isFavorite: false, rewatches: 0 },
  { id: 'rt10', title: 'Brat', type: 'album', year: 2024, rating: 4, isFavorite: false, rewatches: 5 },
  { id: 'rt11', title: 'Past Lives', type: 'film', year: 2023, rating: 4.5, isFavorite: true, rewatches: 2 },
  { id: 'rt12', title: 'Celeste', type: 'game', year: 2018, rating: 5, isFavorite: true, rewatches: 1 },
  { id: 'rt13', title: '1984', type: 'book', year: 1949, rating: 5, isFavorite: true, rewatches: 0 },
  { id: 'rt14', title: 'To Pimp a Butterfly', type: 'album', year: 2015, rating: 5, isFavorite: true, rewatches: 30 },
  { id: 'rt15', title: 'Interstellar', type: 'film', year: 2014, rating: 5, isFavorite: true, rewatches: 6 },
  { id: 'rt16', title: 'Hades', type: 'game', year: 2020, rating: 4.5, isFavorite: false, rewatches: 3 },
]

export const mockSocial = {
  followers: [
    { id: 'u1', username: 'cinephile_sam', displayName: 'Sam Rodriguez', reviews: 89, mutual: true },
    { id: 'u2', username: 'pixel_warrior', displayName: 'Alex Chen', reviews: 234, mutual: true },
    { id: 'u3', username: 'bookish_bee', displayName: 'Beatrice Moore', reviews: 156, mutual: false },
    { id: 'u4', username: 'vinyl_dreamer', displayName: 'Jordan Park', reviews: 67, mutual: true },
    { id: 'u5', username: 'retro_gamer_42', displayName: 'Chris Taylor', reviews: 312, mutual: false },
    { id: 'u6', username: 'midnight_reader', displayName: 'Priya Sharma', reviews: 178, mutual: true },
  ],
  following: [
    { id: 'u1', username: 'cinephile_sam', displayName: 'Sam Rodriguez', reviews: 89, mutual: true },
    { id: 'u2', username: 'pixel_warrior', displayName: 'Alex Chen', reviews: 234, mutual: true },
    { id: 'u4', username: 'vinyl_dreamer', displayName: 'Jordan Park', reviews: 67, mutual: true },
    { id: 'u6', username: 'midnight_reader', displayName: 'Priya Sharma', reviews: 178, mutual: true },
    { id: 'u7', username: 'indie_scout', displayName: 'Luna Vasquez', reviews: 445, mutual: false },
  ],
  favoriteReviewers: [
    { id: 'u2', username: 'pixel_warrior', displayName: 'Alex Chen', specialty: 'Games & Anime' },
    { id: 'u7', username: 'indie_scout', displayName: 'Luna Vasquez', specialty: 'Indie Films & Music' },
    { id: 'u6', username: 'midnight_reader', displayName: 'Priya Sharma', specialty: 'Literary Fiction' },
  ],
  clubs: [
    { id: 'cl1', name: 'Sci-Fi Cinema Club', members: 2340, description: 'For lovers of science fiction on screen' },
    { id: 'cl2', name: 'Indie Game Collective', members: 1890, description: 'Celebrating indie game developers' },
    { id: 'cl3', name: 'Vinyl Heads', members: 987, description: 'Physical media collectors unite' },
  ],
}

export const mockMediaFormatPrefs = {
  film: { theatrical: 35, streaming: 50, physical: 15 },
  game: { digital: 80, physical: 20 },
  book: { physical: 45, ebook: 30, audiobook: 25 },
  album: { streaming: 60, vinyl: 30, cd: 10 },
}

export const mockMoodSummary = {
  topMoods: ['Contemplative', 'Adventurous', 'Melancholic', 'Nostalgic', 'Inspired'],
  tasteProfile: 'You gravitate toward deeply emotional narratives with rich world-building. Your taste spans accessible indie to challenging art-house, with a soft spot for stories about outsiders finding belonging.',
}
