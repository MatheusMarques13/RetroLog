'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  CheckIcon, XIcon, SparklesIcon,
  FilmIcon, GamepadIcon, BookIcon, VinylIcon,
} from '@/components/icons'

export default function ProfileSetupPage() {
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)

  const usernameValid = username.length >= 3 && /^[a-z0-9_]+$/.test(username)

  // Check auth and prefill from user metadata
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      // Check if profile already exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      if (profile) {
        router.push(`/profile/${profile.username}`)
        return
      }

      // Prefill from OAuth metadata
      const meta = user.user_metadata
      setDisplayName(meta?.full_name || meta?.name || meta?.user_name || '')

      // Generate username suggestion
      const suggested = (
        meta?.user_name ||
        meta?.preferred_username ||
        user.email?.split('@')[0] ||
        ''
      ).toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20)
      setUsername(suggested)

      setLoading(false)
    }
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Check username availability with debounce
  useEffect(() => {
    if (!usernameValid) {
      setUsernameAvailable(null)
      return
    }

    setCheckingUsername(true)
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()
      setUsernameAvailable(!data)
      setCheckingUsername(false)
    }, 400)

    return () => clearTimeout(timeout)
  }, [username]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!usernameValid) {
      setError('Please choose a valid username (3+ chars, lowercase).')
      return
    }
    if (!usernameAvailable) {
      setError('That username is taken. Try another.')
      return
    }
    if (!displayName.trim()) {
      setError('Please enter a display name.')
      return
    }

    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Session expired. Please log in again.')
      setSaving(false)
      return
    }

    const { error: insertError } = await supabase.from('profiles').insert({
      id: user.id,
      username: username.trim(),
      display_name: displayName.trim(),
      bio: bio.trim() || null,
      location: location.trim() || null,
      avatar_url: user.user_metadata?.avatar_url || null,
    })

    if (insertError) {
      if (insertError.code === '23505') {
        setError('That username is already taken.')
      } else {
        setError(insertError.message)
      }
      setSaving(false)
      return
    }

    router.push(`/profile/${username}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent-pink border-t-transparent rounded-full mx-auto mb-4" />
          <p className="font-hand text-txt-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-bg-primary">
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />

      {/* ── LEFT BRANDING PANEL ── */}
      <aside className="lg:w-[44%] bg-dark relative overflow-hidden flex flex-col justify-center items-center p-8 lg:p-16 min-h-[40vh] lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-mint/20 via-transparent to-accent-pink/10" />
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.02) 0px,transparent 1px,transparent 4px)' }} />
        <div className="absolute inset-0 opacity-30 shimmer" />

        {/* Floating icons */}
        {[
          { Icon: FilmIcon, color: 'text-accent-pink', pos: 'top-[12%] left-[10%]', delay: '0s' },
          { Icon: GamepadIcon, color: 'text-accent-yellow', pos: 'top-[20%] right-[12%]', delay: '1.2s' },
          { Icon: BookIcon, color: 'text-accent-mint', pos: 'bottom-[25%] left-[8%]', delay: '2s' },
          { Icon: VinylIcon, color: 'text-accent-blue', pos: 'bottom-[15%] right-[10%]', delay: '0.6s' },
        ].map(({ Icon, color, pos, delay }, i) => (
          <div key={i} className={`absolute ${pos} float-anim hidden lg:block`} style={{ animationDelay: delay }}>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3">
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
          </div>
        ))}

        <div className="relative z-10 text-center max-w-sm w-full">
          <h1 className="font-pixel text-3xl md:text-4xl text-accent-pink mb-3" style={{ textShadow: '3px 3px 0 #FFD93D' }}>
            RetroLog
          </h1>
          <p className="font-hand text-xl text-white/90 mb-2">
            Welcome to the archive.
          </p>
          <p className="font-hand text-sm text-white/55 mb-8">
            Let&apos;s set up your profile so the world knows your taste.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left backdrop-blur-sm">
            <p className="font-pixel text-[9px] text-accent-yellow mb-3 tracking-widest">WHAT YOU CAN DO</p>
            <ul className="space-y-2.5">
              {[
                ['Rate and review across 5 media types', 'text-accent-pink'],
                ['Build curated lists and collections', 'text-accent-yellow'],
                ['Track your backlog and diary', 'text-accent-mint'],
                ['Share your profile with friends', 'text-accent-blue'],
              ].map(([t, c], i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/75 font-hand text-sm">
                  <CheckIcon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${c}`} />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* ── RIGHT SETUP FORM ── */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 bg-bg-primary relative">
        <div className="paper-grain absolute inset-0 pointer-events-none" />
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <SparklesIcon className="w-7 h-7 text-accent-yellow mx-auto mb-3" />
            <p className="font-hand text-xl text-txt-primary font-bold">Set up your profile</p>
            <p className="font-hand text-sm text-txt-secondary">
              Pick a username and tell us about yourself.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display Name */}
            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="input-field"
                autoComplete="name"
                maxLength={50}
              />
            </div>

            {/* Username */}
            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-txt-secondary select-none">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20))}
                  placeholder="your_username"
                  className="input-field pl-8 pr-10"
                  autoComplete="username"
                />
                {username && !checkingUsername && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameValid && usernameAvailable
                      ? <CheckIcon className="w-4 h-4 text-accent-mint" />
                      : <XIcon className="w-4 h-4 text-accent-pink" />}
                  </span>
                )}
                {checkingUsername && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin w-4 h-4 border-2 border-accent-blue border-t-transparent rounded-full" />
                  </span>
                )}
              </div>
              {username && !usernameValid && (
                <p className="font-hand text-xs text-accent-pink mt-1">Min 3 chars — lowercase, numbers, underscores only</p>
              )}
              {username && usernameValid && usernameAvailable === false && (
                <p className="font-hand text-xs text-accent-pink mt-1">Username is taken</p>
              )}
              {username && usernameValid && usernameAvailable === true && (
                <p className="font-hand text-xs text-accent-mint mt-1">Username available</p>
              )}
              <p className="font-mono text-[10px] text-txt-secondary mt-1">retro-log.vercel.app/profile/{username || '...'}</p>
            </div>

            {/* Bio */}
            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">
                Bio <span className="font-normal text-txt-secondary">(optional)</span>
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Cinephile, gamer, bookworm..."
                rows={3}
                className="input-field resize-none"
                maxLength={160}
              />
              <p className="font-mono text-[10px] text-txt-secondary mt-1">{bio.length}/160</p>
            </div>

            {/* Location */}
            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">
                Location <span className="font-normal text-txt-secondary">(optional)</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="City, Country"
                className="input-field"
                maxLength={50}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-accent-pink/10 border border-accent-pink/30 rounded-xl fade-in-up">
                <XIcon className="w-4 h-4 text-accent-pink flex-shrink-0 mt-0.5" />
                <p className="font-hand text-sm text-accent-pink">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={saving || !usernameValid || !usernameAvailable || !displayName.trim()}
              className={`w-full py-3.5 rounded-xl font-hand font-bold text-base text-white border-2 border-dark transition-all duration-200 flex items-center justify-center gap-2 ${
                saving || !usernameValid || !usernameAvailable || !displayName.trim()
                  ? 'bg-accent-pink/50 cursor-not-allowed shadow-none'
                  : 'bg-accent-pink shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 active:shadow-none active:translate-y-0'
              }`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Creating your archive...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  Create My Archive
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
