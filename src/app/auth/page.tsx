'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
  FilmIcon, GamepadIcon, BookIcon, VinylIcon, StarFilledIcon,
  GoogleIcon, AppleIcon, GitHubIcon, MagicLinkIcon,
  EyeIcon, CheckIcon, XIcon, HeartFilledIcon,
} from '@/components/icons'

type AuthMode = 'login' | 'signup'

export default function AuthPage() {
  const [mode, setMode]                     = useState<AuthMode>('login')
  const [email, setEmail]                   = useState('')
  const [password, setPassword]             = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername]             = useState('')
  const [rememberMe, setRememberMe]         = useState(false)
  const [agreeTerms, setAgreeTerms]         = useState(false)
  const [showPassword, setShowPassword]     = useState(false)
  const [loading, setLoading]               = useState(false)
  const [error, setError]                   = useState('')
  const [success, setSuccess]               = useState('')

  const emailValid    = email.includes('@') && email.includes('.')
  const usernameValid = username.length >= 3 && /^[a-z0-9_]+$/.test(username)
  const passStrength  = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 5 ? 2 : password.length > 0 ? 1 : 0
  const passColor     = ['bg-border','bg-accent-pink','bg-accent-yellow','bg-accent-yellow','bg-accent-mint'][passStrength]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!email || !password) { setError('Please fill in all required fields.'); return }
    if (mode === 'signup' && password !== confirmPassword) { setError('Passwords do not match.'); return }
    if (mode === 'signup' && !agreeTerms) { setError('Please agree to the terms to continue.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(mode === 'login' ? 'Welcome back to RetroLog!' : 'Account created! Check your email to verify.')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />

      {/* ── LEFT BRANDING PANEL ── */}
      <aside className="lg:w-[48%] bg-dark relative overflow-hidden flex flex-col justify-center items-center p-8 lg:p-16 min-h-[44vh] lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/20 via-transparent to-accent-mint/10" />
        <div className="absolute inset-0" style={{backgroundImage:'repeating-linear-gradient(0deg,rgba(255,255,255,0.02) 0px,transparent 1px,transparent 4px)'}} />
        {/* floating icons */}
        <div className="absolute top-[10%] left-[10%] float-anim text-accent-pink opacity-50"><FilmIcon className="w-12 h-12" /></div>
        <div className="absolute top-[22%] right-[14%] float-anim text-accent-yellow opacity-50" style={{animationDelay:'1s'}}><GamepadIcon className="w-10 h-10" /></div>
        <div className="absolute bottom-[28%] left-[18%] float-anim text-accent-mint opacity-50" style={{animationDelay:'2s'}}><BookIcon className="w-10 h-10" /></div>
        <div className="absolute bottom-[14%] right-[10%] float-anim text-accent-blue opacity-50" style={{animationDelay:'3s'}}><VinylIcon className="w-12 h-12" /></div>
        <div className="absolute top-[58%] left-[6%] float-anim text-accent-yellow opacity-30" style={{animationDelay:'1.5s'}}><StarFilledIcon className="w-8 h-8" /></div>

        <div className="relative z-10 text-center max-w-sm w-full">
          <Link href="/">
            <h1 className="font-pixel text-3xl md:text-4xl text-accent-pink mb-4 cursor-pointer" style={{textShadow:'3px 3px 0 #FFD93D'}}>RetroLog</h1>
          </Link>
          <p className="font-hand text-xl text-white/90 mb-2 leading-snug">Log every watch, play, read, and listen.</p>
          <p className="font-hand text-sm text-white/55 mb-10">Your complete archive of taste across cinema, games, books, albums, and artists.</p>

          {/* Why RetroLog */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left">
            <p className="font-pixel text-[9px] text-accent-yellow mb-3 tracking-widest">WHY RETROLOG?</p>
            <ul className="space-y-2.5">
              {[
                ['Track all 5 media types in one place', 'text-accent-pink'],
                ['Beautiful stats and year-in-review',   'text-accent-yellow'],
                ['Create lists and curate your taste',   'text-accent-mint'],
                ['Follow friends, discover new favorites','text-accent-blue'],
              ].map(([t, c], i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/75 font-hand text-sm">
                  <CheckIcon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${c}`} />{t}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust bar */}
          <div className="flex justify-center gap-6 mb-6">
            {[['48.2K','reviews'],['312K','entries'],['15.7K','lists']].map(([n, l], i) => (
              <div key={i} className="text-center">
                <p className="font-mono text-base font-bold text-accent-yellow">{n}</p>
                <p className="font-hand text-xs text-white/45">{l}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative">
            <div className="absolute -top-2.5 left-4 bg-accent-pink rounded-full p-1"><HeartFilledIcon className="w-3 h-3 text-white" /></div>
            <p className="font-hand text-sm text-white/65 italic mb-1.5">&ldquo;Finally one place for all my media obsessions. RetroLog gets it.&rdquo;</p>
            <p className="font-mono text-xs text-accent-mint">@pixel_warrior</p>
          </div>
        </div>
      </aside>

      {/* ── RIGHT AUTH PANEL ── */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 bg-bg-primary">
        <div className="w-full max-w-md">

          {/* Mode toggle */}
          <div className="flex bg-bg-secondary rounded-xl p-1 mb-7">
            {(['login', 'signup'] as AuthMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess('') }}
                className={`flex-1 py-3 rounded-lg font-hand font-bold text-base transition-all duration-300 ${
                  mode === m ? 'bg-white shadow-soft text-txt-primary' : 'text-txt-secondary hover:text-txt-primary'
                }`}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Social auth */}
          <div className="space-y-3 mb-5">
            {[
              { Icon: GoogleIcon, label: 'Continue with Google', cls: 'bg-white text-txt-primary border-border hover:border-accent-pink' },
              { Icon: AppleIcon,  label: 'Continue with Apple',  cls: 'bg-dark text-white border-dark' },
              { Icon: GitHubIcon, label: 'Continue with GitHub', cls: 'bg-[#24292e] text-white border-[#24292e]' },
            ].map(({ Icon, label, cls }, i) => (
              <button key={i} className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 font-hand font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft ${cls}`}>
                <Icon className="w-5 h-5" />{label}
              </button>
            ))}
          </div>

          {/* Magic link */}
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-accent-blue/40 text-accent-blue font-hand font-bold text-sm hover:border-accent-blue hover:bg-accent-blue/5 transition-all mb-5">
            <MagicLinkIcon className="w-4 h-4" />Send Magic Link
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-xs text-txt-secondary">or use email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'signup' && (
              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-txt-secondary select-none">@</span>
                  <input
                    type="text" value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="your_username"
                    className="input-field pl-8 pr-10"
                  />
                  {username && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {usernameValid
                        ? <CheckIcon className="w-4 h-4 text-accent-mint" />
                        : <XIcon     className="w-4 h-4 text-accent-pink" />}
                    </span>
                  )}
                </div>
                {username && !usernameValid && (
                  <p className="font-hand text-xs text-accent-pink mt-1">Min 3 chars — lowercase, numbers, underscores only</p>
                )}
              </div>
            )}

            <div>
              <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Email</label>
              <div className="relative">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pr-10" />
                {email && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {emailValid ? <CheckIcon className="w-4 h-4 text-accent-mint" /> : <XIcon className="w-4 h-4 text-accent-pink" />}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-hand text-sm font-bold text-txt-primary">Password</label>
                {mode === 'login' && <button type="button" className="font-hand text-xs text-accent-pink hover:underline">Forgot password?</button>}
              </div>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" className="input-field pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-secondary hover:text-txt-primary">
                  <EyeIcon className="w-4 h-4" />
                </button>
              </div>
              {password && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passStrength >= i ? passColor : 'bg-border'}`} />
                  ))}
                </div>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Confirm Password</label>
                <div className="relative">
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your password" className="input-field pr-10" />
                  {confirmPassword && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {password === confirmPassword ? <CheckIcon className="w-4 h-4 text-accent-mint" /> : <XIcon className="w-4 h-4 text-accent-pink" />}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-start gap-2.5">
              <button
                type="button"
                onClick={() => mode === 'login' ? setRememberMe(!rememberMe) : setAgreeTerms(!agreeTerms)}
                className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                  (mode === 'login' ? rememberMe : agreeTerms) ? 'bg-accent-pink border-accent-pink' : 'border-border hover:border-accent-pink'
                }`}
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

            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-accent-pink/10 border border-accent-pink/30 rounded-xl">
                <XIcon className="w-4 h-4 text-accent-pink flex-shrink-0 mt-0.5" />
                <p className="font-hand text-sm text-accent-pink">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-start gap-2.5 p-3 bg-accent-mint/10 border border-accent-mint/30 rounded-xl">
                <CheckIcon className="w-4 h-4 text-accent-mint flex-shrink-0 mt-0.5" />
                <p className="font-hand text-sm text-accent-mint">{success}</p>
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className={`w-full py-3.5 rounded-xl font-hand font-bold text-base text-white border-2 border-dark transition-all duration-200 flex items-center justify-center gap-2 ${
                loading ? 'bg-accent-pink/70 cursor-wait shadow-none' : 'bg-accent-pink shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>{mode === 'login' ? 'Logging in...' : 'Creating account...'}</>
              ) : (
                mode === 'login' ? 'Log In to RetroLog' : 'Create My Archive'
              )}
            </button>
          </form>

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
