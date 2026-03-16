'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  CameraIcon, CheckIcon, SparklesIcon, PersonIcon,
  FilmIcon, GamepadIcon, BookIcon, VinylIcon, HeadphonesIcon,
} from '@/components/icons'

const MEDIA_INTERESTS = [
  { key: 'films', Icon: FilmIcon, label: 'Films', color: 'accent-pink' },
  { key: 'games', Icon: GamepadIcon, label: 'Games', color: 'accent-yellow' },
  { key: 'books', Icon: BookIcon, label: 'Books', color: 'accent-mint' },
  { key: 'albums', Icon: VinylIcon, label: 'Albums', color: 'accent-blue' },
  { key: 'artists', Icon: HeadphonesIcon, label: 'Artists', color: 'accent-pink' },
] as const

export default function OnboardingPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null)
  const getSupabase = useCallback(() => {
    if (!supabaseRef.current) supabaseRef.current = createClient()
    return supabaseRef.current
  }, [])

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Profile fields
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [interests, setInterests] = useState<string[]>([])

  // Check auth on mount and prefill from Supabase metadata
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await getSupabase().auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }
      setUserId(user.id)
      // Prefill from OAuth or signup metadata
      const meta = user.user_metadata
      if (meta?.display_name) setDisplayName(meta.display_name)
      if (meta?.username) setUsername(meta.username)
      if (meta?.full_name) setDisplayName(meta.full_name)
      if (meta?.name) setDisplayName(meta.name)
      if (meta?.avatar_url) setAvatarPreview(meta.avatar_url)
      // Derive username from email if not set
      if (!meta?.username && user.email) {
        setUsername(user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''))
      }
      setCheckingAuth(false)
    }
    checkUser()
  }, [router, getSupabase])

  // Handle local file upload for avatar
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.')
      return
    }
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
    setError('')
  }

  // Upload avatar to Supabase Storage
  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !userId) return avatarPreview // Return existing (OAuth) avatar or null
    const ext = avatarFile.name.split('.').pop()
    const path = `${userId}/avatar.${ext}`
    const { error } = await getSupabase().storage
      .from('avatars')
      .upload(path, avatarFile, { upsert: true })
    if (error) {
      console.error('Avatar upload error:', error)
      return null
    }
    const { data } = getSupabase().storage.from('avatars').getPublicUrl(path)
    return data.publicUrl
  }

  // Save profile
  const handleFinish = async () => {
    setError('')
    if (!displayName.trim()) { setError('Please enter a display name.'); return }
    if (!username.trim() || username.length < 3) { setError('Username must be at least 3 characters.'); return }

    setLoading(true)

    // Upload avatar if local file chosen
    const avatarUrl = await uploadAvatar()

    // Update Supabase auth metadata
    const { error: updateError } = await getSupabase().auth.updateUser({
      data: {
        username: username.toLowerCase(),
        display_name: displayName,
        bio,
        avatar_url: avatarUrl,
        interests,
        onboarding_complete: true,
      },
    })

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
    } else {
      router.push('/')
    }
  }

  const toggleInterest = (key: string) => {
    setInterests(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />
        <svg className="animate-spin w-8 h-8 text-accent-pink" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />
      <div className="paper-grain absolute inset-0 pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-pixel text-2xl text-accent-pink mb-1" style={{ textShadow: '2px 2px 0 #FFD93D' }}>
            RetroLog
          </h1>
          <SparklesIcon className="w-6 h-6 text-accent-yellow mx-auto mb-3" />
          <p className="font-hand text-lg text-txt-primary font-bold">
            {step === 1 ? 'Set up your profile' : 'What do you track?'}
          </p>
          <p className="font-hand text-sm text-txt-secondary">
            {step === 1 ? 'Tell us a bit about yourself.' : 'Pick your media interests.'}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2].map(s => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-10 bg-accent-pink' : s < step ? 'w-10 bg-accent-mint' : 'w-6 bg-border'
              }`}
            />
          ))}
        </div>

        {/* ── STEP 1: Profile info + avatar ── */}
        {step === 1 && (
          <div className="space-y-5 fade-in-up">
            {/* Avatar upload */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative w-28 h-28 rounded-full border-3 border-dashed border-border hover:border-accent-pink transition-colors group overflow-hidden bg-bg-secondary"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-1">
                    <PersonIcon className="w-10 h-10 text-txt-secondary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-dark/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <CameraIcon className="w-6 h-6 text-white" />
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleAvatarSelect}
                className="hidden"
              />
              <p className="font-hand text-xs text-txt-secondary">
                Click to upload a photo <span className="text-txt-secondary/50">(max 5MB)</span>
              </p>
            </div>

            {/* Display name */}
            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="How others will see you"
                className="input-field"
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
                  onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="your_username"
                  className="input-field pl-8"
                  maxLength={30}
                />
              </div>
              {username && username.length < 3 && (
                <p className="font-hand text-xs text-accent-pink mt-1">Min 3 characters</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">
                Bio <span className="font-normal text-txt-secondary">(optional)</span>
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="A sentence about your taste..."
                className="input-field resize-none h-20"
                maxLength={160}
              />
              <p className="font-hand text-xs text-txt-secondary mt-1 text-right">{bio.length}/160</p>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-accent-pink/10 border border-accent-pink/30 rounded-xl">
                <p className="font-hand text-sm text-accent-pink">{error}</p>
              </div>
            )}

            <button
              onClick={() => {
                if (!displayName.trim()) { setError('Please enter a display name.'); return }
                if (!username.trim() || username.length < 3) { setError('Username must be at least 3 characters.'); return }
                setError('')
                setStep(2)
              }}
              className="w-full py-3.5 rounded-xl font-hand font-bold text-base text-white bg-accent-pink border-2 border-dark shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 transition-all"
            >
              Next
            </button>
          </div>
        )}

        {/* ── STEP 2: Media interests ── */}
        {step === 2 && (
          <div className="space-y-5 fade-in-up">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {MEDIA_INTERESTS.map(({ key, Icon, label, color }) => {
                const selected = interests.includes(key)
                return (
                  <button
                    key={key}
                    onClick={() => toggleInterest(key)}
                    className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 ${
                      selected
                        ? `border-${color} bg-${color}/10 shadow-soft`
                        : 'border-border bg-bg-secondary hover:border-txt-secondary/30'
                    }`}
                  >
                    {selected && (
                      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full bg-${color} flex items-center justify-center`}>
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <Icon className={`w-8 h-8 ${selected ? `text-${color}` : 'text-txt-secondary/50'}`} />
                    <span className={`font-hand text-sm font-bold ${selected ? 'text-txt-primary' : 'text-txt-secondary'}`}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-accent-pink/10 border border-accent-pink/30 rounded-xl">
                <p className="font-hand text-sm text-accent-pink">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setStep(1); setError('') }}
                className="flex-1 py-3.5 rounded-xl font-hand font-bold text-base text-txt-primary bg-bg-secondary border-2 border-border hover:border-txt-secondary/40 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={loading}
                className={`flex-[2] py-3.5 rounded-xl font-hand font-bold text-base text-white border-2 border-dark transition-all duration-200 flex items-center justify-center gap-2 ${
                  loading ? 'bg-accent-pink/70 cursor-wait' : 'bg-accent-pink shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Let's Go!"
                )}
              </button>
            </div>

            <button
              onClick={handleFinish}
              disabled={loading}
              className="w-full text-center font-hand text-sm text-txt-secondary hover:text-accent-pink transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
