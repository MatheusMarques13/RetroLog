import { createClient } from './client'

export interface ProfileData {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  location: string | null
  website: string | null
  avatar_url: string | null
  cover_url: string | null
  pronouns: string | null
  quote: string | null
  accent_color: string
  theme: string
  layout: string
  created_at: string
  updated_at: string
}

export async function fetchProfileByUsername(username: string): Promise<ProfileData | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()
  return data
}

export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
