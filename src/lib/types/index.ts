// ============================================================
// RETROLOG — CORE TYPES
// ============================================================

export type MediaType = 'film' | 'game' | 'book' | 'album' | 'artist'

export type RatingValue = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5

export type LogStatus =
  | 'finished'
  | 'in_progress'
  | 'owned'
  | 'wishlist'
  | 'revisit'
  | 'dropped'

export type ActivityType =
  | 'logged'
  | 'reviewed'
  | 'rated'
  | 'favorited'
  | 'listed'
  | 'followed'
  | 'liked_review'
  | 'shared_list'
  | 'finished_game'
  | 'finished_book'

// ---- USER ----
export interface User {
  id: string
  username: string
  display_name: string
  pronouns?: string
  bio?: string
  avatar_url?: string
  cover_url?: string
  location?: string
  website?: string
  favorite_quote?: string
  is_verified: boolean
  is_supporter: boolean
  theme: ProfileTheme
  accent_color: string
  layout_style: LayoutStyle
  created_at: string
  followers_count: number
  following_count: number
  logs_count: number
  reviews_count: number
  lists_count: number
  likes_count: number
  privacy_settings: PrivacySettings
}

export type ProfileTheme = 'paper-light' | 'midnight-archive' | 'sunset-tape' | 'mint-catalog'
export type LayoutStyle = 'classic' | 'editorial' | 'shelf' | 'dashboard'

export interface PrivacySettings {
  public_profile: boolean
  private_likes: boolean
  hide_activity: boolean
  hide_followers: boolean
}

// ---- MEDIA ----
export interface MediaItem {
  id: string
  type: MediaType
  title: string
  subtitle?: string // director / studio / author / artist
  year?: number
  cover_url?: string
  genres?: string[]
  description?: string
  external_id?: string // tmdb/igdb/google books/musicbrainz id
}

// ---- LOG ----
export interface Log {
  id: string
  user_id: string
  media_item: MediaItem
  status: LogStatus
  rating?: RatingValue
  is_favorite: boolean
  rewatch_count: number
  date_logged: string
  date_finished?: string
  notes?: string
  created_at: string
}

// ---- REVIEW ----
export interface Review {
  id: string
  user_id: string
  user: Pick<User, 'id' | 'username' | 'display_name' | 'avatar_url'>
  media_item: MediaItem
  rating?: RatingValue
  body: string
  contains_spoilers: boolean
  likes_count: number
  comments_count: number
  tags: string[]
  created_at: string
  updated_at: string
}

// ---- LIST ----
export interface MediaList {
  id: string
  user_id: string
  title: string
  description?: string
  cover_url?: string
  is_pinned: boolean
  is_featured: boolean
  items: MediaItem[]
  items_count: number
  likes_count: number
  comments_count: number
  tags: string[]
  created_at: string
  updated_at: string
}

// ---- ACTIVITY ----
export interface ActivityItem {
  id: string
  user_id: string
  type: ActivityType
  media_item?: MediaItem
  review?: Pick<Review, 'id' | 'body' | 'rating'>
  list?: Pick<MediaList, 'id' | 'title'>
  target_user?: Pick<User, 'id' | 'username' | 'avatar_url'>
  rating?: RatingValue
  created_at: string
}

// ---- STATS ----
export interface UserStats {
  total_films: number
  total_games: number
  total_books: number
  total_albums: number
  total_artists: number
  hours_watched: number
  hours_played: number
  hours_listened: number
  pages_read: number
  avg_rating_films: number
  avg_rating_games: number
  avg_rating_books: number
  avg_rating_albums: number
  current_streak: number
  longest_streak: number
  rating_distribution: Record<string, number>
  monthly_activity: MonthlyActivity[]
  top_genres: GenreStat[]
}

export interface MonthlyActivity {
  month: string
  films: number
  games: number
  books: number
  albums: number
}

export interface GenreStat {
  genre: string
  count: number
  percentage: number
}

// ---- BADGE ----
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earned_at: string
}
