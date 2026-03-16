'use client'
import React, { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  FilmIcon, GamepadIcon, BookIcon, VinylIcon, StarFilledIcon,
  GoogleIcon, AppleIcon, GitHubIcon, MagicLinkIcon,
  EyeIcon, CheckIcon, XIcon, HeartFilledIcon, PersonIcon,
  HeadphonesIcon, SparklesIcon,
} from '@/components/icons'

type AuthMode = 'login' | 'signup'
type Provider = 'google' | 'apple' | 'github'

/* ── Floating media cards for the branding panel ── */
function FloatingMediaCards() {
  const cards = [
    { Icon: FilmIcon, color: 'text-accent-pink', title: 'Blade Runner', label: 'FILM', bg: 'bg-accent-pink/10 border-accent-pink/20', x: 'top-[8%] left-[6%]', delay: '0s', rotate: '-rotate-3' },
    { Icon: GamepadIcon, color: 'text-accent-yellow', title: 'Hollow Knight', label: 'GAME', bg: 'bg-accent-yellow/10 border-accent-yellow/20', x: 'top-[18%] right-[8%]', delay: '1.2s', rotate: 'rotate-2' },
    { Icon: BookIcon, color: 'text-accent-mint', title: 'Dune', label: 'BOOK', bg: 'bg-accent-mint/10 border-accent-mint/20', x: 'bottom-[30%] left-[8%]', delay: '2.4s', rotate: 'rotate-1' },
    { Icon: VinylIcon, color: 'text-accent-blue', title: 'OK Computer', label: 'ALBUM', bg: 'bg-accent-blue/10 border-accent-blue/20', x: 'bottom-[12%] right-[6%]', delay: '0.8s', rotate: '-rotate-2' },
    { Icon: PersonIcon, color: 'text-accent-pink', title: 'Taylor Swift', label: 'ARTIST', bg: 'bg-accent-pink/10 border-accent-pink/20', x: 'top-[52%] left-[3%]', delay: '1.8s', rotate: 'rotate-3' },
    { Icon: HeadphonesIcon, color: 'text-accent-blue', title: 'Folklore', label: 'ALBUM', bg: 'bg-accent-blue/10 border-accent-blue/20', x: 'top-[42%] right-[4%]', delay: '3s', rotate: '-rotate-1' },
  ]

  return (
    <>
      {cards.map((c, i) => (
        <div
          key={i}
          className={`absolute ${c.x} float-anim hidden lg:block`}
          style={{ animationDelay: c.delay }}
        >
          <div className={`${c.bg} border backdrop-blur-sm rounded-xl p-3 ${c.rotate} transition-transform duration-300`}>
            <c.Icon className={`w-6 h-6 ${c.color} mb-1.5`} />
            <p className="font-mono text-[8px] text-white/50 tracking-wider">{c.label}</p>
            <p className="font-hand text-[10px] text-white/70 leading-tight">{c.title}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default function AuthPageWrapper() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  )
}

function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [mode, setMode]                       = useState<AuthMode>('login')
  const [email, setEmail]                     = useState('')
  const [password, setPassword]               = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername]                = useState('')
  const [rememberMe, setRememberMe]           = useState(false)
  const [agreeTerms, setAgreeTerms]           = useState(false)
  const [showPassword, setShowPassword]       = useState(false)
  const [loading, setLoading]                 = useState(false)
  const [oauthLoading, setOauthLoading]       = useState<Provider | null>(null)
  const [magicLinkSent, setMagicLinkSent]     = useState(false)
  const [forgotMode, setForgotMode]           = useState(false)
  const [error, setError]                     = useState(searchParams.get('error') === 'auth_callback_failed' ? 'Authentication failed. Please try again.' : '')
  const [success, setSuccess]                 = useState('')

  const emailValid    = email.includes('@') && email.includes('.')
  const usernameValid = username.length >= 3 && /^[a-z0-9_]+$/.test(username)
  const passStrength  = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 5 ? 2 : password.length > 0 ? 1 : 0
  const passColor     = ['bg-border', 'bg-accent-pink', 'bg-accent-yellow', 'bg-accent-yellow', 'bg-accent-mint'][passStrength]
  const passLabel     = ['', 'Weak', 'Fair', 'Good', 'Strong'][passStrength]

  /* ── OAuth (Google / Apple / GitHub) ── */
  const handleOAuth = async (provider: Provider) => {
    setError(''); setSuccess('')
    setOauthLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // Redirect to /auth (this client-side page) so the Supabase JS client
        // can detect the hash-fragment tokens. The AuthListener component
        // will then redirect to /onboarding once the session is established.
        redirectTo: `${window.location.origin}/auth`,
      },
    })
    if (error) {
      setError(error.message)
      setOauthLoading(null)
    }
  }

  /* ── Magic Link ── */
  const handleMagicLink = async () => {
    setError(''); setSuccess('')
    if (!email || !emailValid) {
      setError('Please enter a valid email address first.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setMagicLinkSent(true)
      setSuccess('Magic link sent! Check your email inbox.')
    }
  }

  /* ── Forgot Password ── */
  const handleForgotPassword = async () => {
    setError(''); setSuccess('')
    if (!email || !emailValid) {
      setError('Please enter your email address above first.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setForgotMode(true)
      setSuccess('Password reset email sent! Check your inbox.')
    }
  }

  /* ── Email/Password submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!email || !password) { setError('Please fill in all required fields.'); return }
    if (!emailValid) { setError('Please enter a valid email address.'); return }

    if (mode === 'signup') {
      if (!usernameValid) { setError('Please choose a valid username (3+ chars, lowercase).'); return }
      if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
      if (password !== confirmPassword) { setError('Passwords do not match.'); return }
      if (!agreeTerms) { setError('Please agree to the terms to continue.'); return }

      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            username,
            display_name: username,
          },
        },
      })
      setLoading(false)

      if (error) {
        setError(error.message)
      } else {
        setSuccess('Account created! Check your email to verify.')
      }
    } else {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setLoading(false)

      if (error) {
        setError(error.message)
      } else {
        router.push('/onboarding')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-bg-primary">
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />

      {/* ── LEFT BRANDING PANEL ── */}
      <aside className="lg:w-[48%] bg-dark relative overflow-hidden flex flex-col justify-center items-center p-8 lg:p-16 min-h-[52vh] lg:min-h-screen">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/20 via-transparent to-accent-mint/10" />
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.02) 0px,transparent 1px,transparent 4px)' }} />
        <div className="absolute inset-0 opacity-30 shimmer" />

        {/* Floating media cards */}
        <FloatingMediaCards />

        {/* Extra floating decorative icons */}
        <div className="absolute top-[65%] left-[50%] float-anim text-accent-yellow opacity-20 lg:hidden" style={{ animationDelay: '1s' }}>
          <StarFilledIcon className="w-6 h-6" />
        </div>

        <div className="relative z-10 text-center max-w-sm w-full">
          {/* Logo */}
          <Link href="/" className="inline-block group">
            <h1 className="font-pixel text-3xl md:text-4xl text-accent-pink mb-2 cursor-pointer text-glow-pink transition-all duration-300 group-hover:scale-105" style={{ textShadow: '3px 3px 0 #FFD93D' }}>
              RetroLog
            </h1>
          </Link>

          {/* Tagline */}
          <p className="font-hand text-xl text-white/90 mb-2 leading-snug">
            Log every watch, play, read, and listen.
          </p>
          <p className="font-hand text-sm text-white/55 mb-10">
            Your complete archive of taste across cinema, games, books, albums, and artists.
          </p>

          {/* Why RetroLog */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left backdrop-blur-sm">
            <p className="font-pixel text-[9px] text-accent-yellow mb-3 tracking-widest">WHY RETROLOG?</p>
            <ul className="space-y-2.5">
              {[
                ['Track all 5 media types in one place', 'text-accent-pink'],
                ['Beautiful stats and year-in-review',   'text-accent-yellow'],
                ['Create lists and curate your taste',   'text-accent-mint'],
                ['Follow friends, discover new favorites', 'text-accent-blue'],
              ].map(([t, c], i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/75 font-hand text-sm">
                  <CheckIcon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${c}`} />{t}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust bar */}
          <div className="flex justify-center gap-6 mb-6">
            {[
              ['48.2K', 'reviews logged'],
              ['312K', 'media tracked'],
              ['15.7K', 'lists created'],
            ].map(([n, l], i) => (
              <div key={i} className="text-center">
                <p className="font-mono text-base font-bold text-accent-yellow">{n}</p>
                <p className="font-hand text-[11px] text-white/45">{l}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative backdrop-blur-sm">
            <div className="absolute -top-2.5 left-4 bg-accent-pink rounded-full p-1">
              <HeartFilledIcon className="w-3 h-3 text-white" />
            </div>
            <p className="font-hand text-sm text-white/65 italic mb-2">
              &ldquo;Finally one place for all my media obsessions. RetroLog gets it. The stats alone are worth it.&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent-mint/30 flex items-center justify-center">
                <PersonIcon className="w-3 h-3 text-accent-mint" />
              </div>
              <p className="font-mono text-xs text-accent-mint">@pixel_warrior</p>
              <span className="font-mono text-[10px] text-white/30">2,847 logs</span>
            </div>
          </div>

          {/* Media type indicators */}
          <div className="flex justify-center gap-4 mt-6">
            {[
              { Icon: FilmIcon, color: 'text-accent-pink', label: 'Films' },
              { Icon: GamepadIcon, color: 'text-accent-yellow', label: 'Games' },
              { Icon: BookIcon, color: 'text-accent-mint', label: 'Books' },
              { Icon: VinylIcon, color: 'text-accent-blue', label: 'Albums' },
              { Icon: PersonIcon, color: 'text-accent-pink', label: 'Artists' },
            ].map(({ Icon, color, label }, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-1 group-hover:bg-white/10 transition-colors`}>
                  <Icon className={`w-4 h-4 ${color} opacity-70`} />
                </div>
                <p className="font-mono text-[8px] text-white/35">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── RIGHT AUTH PANEL ── */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 bg-bg-primary relative">
        <div className="paper-grain absolute inset-0 pointer-events-none" />
        <div className="w-full max-w-md relative z-10">

          {/* Small welcome message */}
          <div className="text-center mb-6">
            <SparklesIcon className="w-6 h-6 text-accent-yellow mx-auto mb-2" />
            <p className="font-hand text-lg text-txt-primary font-bold">
              {mode === 'login' ? 'Welcome back!' : 'Join the archive'}
            </p>
            <p className="font-hand text-sm text-txt-secondary">
              {mode === 'login' ? 'Your media journal awaits.' : 'Start logging your taste today.'}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-bg-secondary rounded-xl p-1 mb-7 border border-border">
            {(['login', 'signup'] as AuthMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess(''); setForgotMode(false); setMagicLinkSent(false) }}
                className={`flex-1 py-3 rounded-lg font-hand font-bold text-base transition-all duration-300 ${
                  mode === m
                    ? 'bg-white shadow-soft text-txt-primary border border-border'
                    : 'text-txt-secondary hover:text-txt-primary'
                }`}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Social auth */}
          <div className="space-y-3 mb-5">
            {([
              { provider: 'google' as Provider, Icon: GoogleIcon, label: 'Continue with Google', cls: 'bg-white text-txt-primary border-border hover:border-accent-pink hover:shadow-soft' },
              { provider: 'apple' as Provider, Icon: AppleIcon, label: 'Continue with Apple', cls: 'bg-dark text-white border-dark hover:opacity-90' },
              { provider: 'github' as Provider, Icon: GitHubIcon, label: 'Continue with GitHub', cls: 'bg-[#24292e] text-white border-[#24292e] hover:bg-[#2f363d]' },
            ]).map(({ provider, Icon, label, cls }) => (
              <button
                key={provider}
                onClick={() => handleOAuth(provider)}
                disabled={oauthLoading !== null}
                className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 font-hand font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 ${cls} ${oauthLoading === provider ? 'opacity-70 cursor-wait' : ''}`}
              >
                {oauthLoading === provider ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Connecting...
                  </>
                ) : (
                  <><Icon className="w-5 h-5" />{label}</>
                )}
              </button>
            ))}
          </div>

          {/* Magic link */}
          <button
            onClick={handleMagicLink}
            disabled={loading || magicLinkSent}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-accent-blue/40 text-accent-blue font-hand font-bold text-sm hover:border-accent-blue hover:bg-accent-blue/5 transition-all mb-5 ${magicLinkSent ? 'opacity-60 cursor-default' : ''}`}
          >
            <MagicLinkIcon className="w-4 h-4" />
            {magicLinkSent ? 'Magic Link Sent!' : 'Send Magic Link'}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-xs text-txt-secondary">or use email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'signup' && (
              <div className="fade-in-up">
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-txt-secondary select-none">@</span>
                  <input
                    type="text" value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="your_username"
                    className="input-field pl-8 pr-10"
                    aria-label="Username"
                    autoComplete="username"
                  />
                  {username && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {usernameValid
                        ? <CheckIcon className="w-4 h-4 text-accent-mint" />
                        : <XIcon className="w-4 h-4 text-accent-pink" />}
                    </span>
                  )}
                </div>
                {username && !usernameValid && (
                  <p className="font-hand text-xs text-accent-pink mt-1">Min 3 chars -- lowercase, numbers, underscores only</p>
                )}
                {username && usernameValid && (
                  <p className="font-hand text-xs text-accent-mint mt-1">Username available</p>
                )}
              </div>
            )}

            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Email</label>
              <div className="relative">
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pr-10"
                  aria-label="Email address"
                  autoComplete="email"
                />
                {email && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {emailValid ? <CheckIcon className="w-4 h-4 text-accent-mint" /> : <XIcon className="w-4 h-4 text-accent-pink" />}
                  </span>
                )}
              </div>
              {email && !emailValid && (
                <p className="font-hand text-xs text-accent-pink mt-1">Enter a valid email address</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-hand text-sm font-bold text-txt-primary">Password</label>
                {mode === 'login' && (
                  <button type="button" onClick={handleForgotPassword} disabled={loading || forgotMode} className={`font-hand text-xs text-accent-pink hover:underline ${forgotMode ? 'opacity-60' : ''}`}>
                    {forgotMode ? 'Email sent!' : 'Forgot password?'}
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="input-field pr-10"
                  aria-label="Password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-secondary hover:text-txt-primary transition-colors">
                  <EyeIcon className="w-4 h-4" />
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passStrength >= i ? passColor : 'bg-border'}`} />
                    ))}
                  </div>
                  {mode === 'signup' && (
                    <p className={`font-mono text-[10px] mt-1 ${passStrength >= 3 ? 'text-accent-mint' : passStrength >= 2 ? 'text-accent-yellow' : 'text-accent-pink'}`}>
                      {passLabel}
                    </p>
                  )}
                </div>
              )}
            </div>

            {mode === 'signup' && (
              <div className="fade-in-up">
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password" value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="input-field pr-10"
                    aria-label="Confirm password"
                    autoComplete="new-password"
                  />
                  {confirmPassword && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {password === confirmPassword
                        ? <CheckIcon className="w-4 h-4 text-accent-mint" />
                        : <XIcon className="w-4 h-4 text-accent-pink" />}
                    </span>
                  )}
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="font-hand text-xs text-accent-pink mt-1">Passwords do not match</p>
                )}
              </div>
            )}

            <div className="flex items-start gap-2.5">
              <button
                type="button"
                onClick={() => mode === 'login' ? setRememberMe(!rememberMe) : setAgreeTerms(!agreeTerms)}
                className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                  (mode === 'login' ? rememberMe : agreeTerms) ? 'bg-accent-pink border-accent-pink' : 'border-border hover:border-accent-pink'
                }`}
                aria-label={mode === 'login' ? 'Remember me' : 'Agree to terms'}
              >
                {(mode === 'login' ? rememberMe : agreeTerms) && <CheckIcon className="w-3 h-3 text-white" />}
              </button>
              <span className="font-hand text-sm text-txt-secondary leading-snug">
                {mode === 'login'
                  ? 'Remember me on this device'
                  : (<>I agree to the <a href="#" className="text-accent-pink hover:underline">Terms of Service</a> and <a href="#" className="text-accent-pink hover:underline">Privacy Policy</a></>)
                }
              </span>
            </div>

            {/* Error state */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-accent-pink/10 border border-accent-pink/30 rounded-xl fade-in-up">
                <XIcon className="w-4 h-4 text-accent-pink flex-shrink-0 mt-0.5" />
                <p className="font-hand text-sm text-accent-pink">{error}</p>
              </div>
            )}

            {/* Success state */}
            {success && (
              <div className="flex items-start gap-2.5 p-3 bg-accent-mint/10 border border-accent-mint/30 rounded-xl fade-in-up">
                <CheckIcon className="w-4 h-4 text-accent-mint flex-shrink-0 mt-0.5" />
                <p className="font-hand text-sm text-accent-mint">{success}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className={`w-full py-3.5 rounded-xl font-hand font-bold text-base text-white border-2 border-dark transition-all duration-200 flex items-center justify-center gap-2 ${
                loading ? 'bg-accent-pink/70 cursor-wait shadow-none' : 'bg-accent-pink shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 active:shadow-none active:translate-y-0'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'login' ? 'Log In to RetroLog' : 'Create My Archive'
              )}
            </button>
          </form>

          {/* Switch mode prompt */}
          <p className="text-center font-hand text-sm text-txt-secondary mt-5">
            {mode === 'login' ? (
              <>New to RetroLog? <button onClick={() => { setMode('signup'); setError(''); setSuccess('') }} className="text-accent-pink font-bold hover:underline">Create an account</button></>
            ) : (
              <>Already have an account? <button onClick={() => { setMode('login'); setError(''); setSuccess('') }} className="text-accent-pink font-bold hover:underline">Log in</button></>
            )}
          </p>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap justify-center gap-5">
            {['Terms', 'Privacy', 'Contact', 'About'].map(l => (
              <a key={l} href="#" className="font-mono text-xs text-txt-secondary hover:text-accent-pink transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
