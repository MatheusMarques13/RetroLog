'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FilmIcon, GamepadIcon, BookIcon, VinylIcon,
  PersonIcon, StarFilledIcon, CheckIcon, XIcon,
  LockIcon, GlobeIcon, EyeIcon, EyeIcon as EyeOffIcon
} from '@/components/ui/Icons';

type AuthTab = 'login' | 'signup' | 'magic';
type FormState = 'idle' | 'loading' | 'success' | 'error';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
  </svg>
);

const MediaFloater = ({ icon, label, rating, top, left, right, bottom, rotate }: {
  icon: React.ReactNode; label: string; rating: number;
  top?: string; left?: string; right?: string; bottom?: string; rotate?: string;
}) => (
  <div
    style={{ top, left, right, bottom, transform: `rotate(${rotate || '0deg'})` }}
    className="absolute hidden lg:flex flex-col items-center gap-1.5 bg-white border-2 border-[#E5E0DA] rounded-xl p-3 shadow-md w-[110px] animate-float"
  >
    <div className="w-10 h-10 rounded-lg bg-[#F5F0E8] flex items-center justify-center">
      {icon}
    </div>
    <span className="font-mono-custom text-[9px] text-[#6E6258] text-center leading-tight">{label}</span>
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarFilledIcon key={i} size={8} color={i < rating ? '#FFD93D' : '#E5E0DA'} />
      ))}
    </div>
  </div>
);

export default function AuthPage() {
  const [tab, setTab] = useState<AuthTab>('login');
  const [formState, setFormState] = useState<FormState>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (val: string) => {
    if (!val) { setEmailError('Email is required'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setEmailError('Enter a valid email address'); return false; }
    setEmailError(''); return true;
  };

  const validatePassword = (val: string) => {
    if (!val) { setPasswordError('Password is required'); return false; }
    if (val.length < 8) { setPasswordError('At least 8 characters required'); return false; }
    setPasswordError(''); return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = validateEmail(email);
    const passOk = validatePassword(password);
    if (!emailOk || !passOk) { setFormState('error'); return; }
    if (tab === 'signup' && !agreeTerms) { setFormState('error'); return; }
    setFormState('loading');
    setTimeout(() => setFormState('success'), 2000);
  };

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) { setFormState('error'); return; }
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Kalam:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rot, 0deg)); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-14px) rotate(var(--rot, 0deg)); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 5s ease-in-out infinite; }
        .scanlines-overlay {
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.012) 2px, rgba(0,0,0,0.012) 4px);
          pointer-events: none;
        }
        .tab-btn { transition: all 0.2s ease; }
        .tab-btn.active {
          background: #FF6B9D;
          color: white;
          border-color: #FF6B9D;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
        }
        .input-field {
          width: 100%;
          padding: 12px 14px;
          background: #FFFDF8;
          border: 1.5px solid #E5E0DA;
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          color: #1F1A17;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
        }
        .input-field:focus {
          border-color: #FF6B9D;
          box-shadow: 0 0 0 3px rgba(255,107,157,0.15);
        }
        .input-field.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 11px 16px;
          background: white;
          border: 1.5px solid #E5E0DA;
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: #1F1A17;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.06);
        }
        .social-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
          border-color: #FF6B9D;
        }
        .submit-btn {
          width: 100%;
          padding: 13px;
          background: #FF6B9D;
          color: white;
          border: 2px solid #1F1A17;
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.15);
          transition: all 0.15s ease;
          letter-spacing: 0.05em;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 rgba(0,0,0,0.15);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .submit-btn.success {
          background: #6BCB77;
        }
      `}</style>

      <div className="min-h-screen flex" style={{ background: '#FFFDF8', fontFamily: "'Kalam', cursive" }}>

        {/* LEFT PANEL */}
        <div
          className="hidden lg:flex flex-col justify-between relative overflow-hidden"
          style={{ width: '48%', background: '#171717', padding: '48px 44px' }}
        >
          {/* Scanlines */}
          <div className="absolute inset-0 scanlines-overlay z-0" />

          {/* Glow blobs */}
          <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(107,203,119,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Media floaters */}
          <MediaFloater icon={<FilmIcon size={22} color="#FF6B9D" />} label="Blade Runner 2049" rating={5} top="18%" left="72%" rotate="-4deg" />
          <MediaFloater icon={<GamepadIcon size={22} color="#6BCB77" />} label="Hollow Knight" rating={5} top="42%" left="68%" rotate="3deg" />
          <MediaFloater icon={<VinylIcon size={22} color="#FFD93D" />} label="Blonde - Frank Ocean" rating={5} top="64%" left="72%" rotate="-2deg" />
          <MediaFloater icon={<BookIcon size={22} color="#7BD3EA" />} label="Dune" rating={5} top="30%" left="-8%" rotate="4deg" />

          {/* Logo + copy */}
          <div className="relative z-10">
            <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1.8rem', color: '#FF6B9D', textShadow: '3px 3px 0 #FFD93D', lineHeight: 1.3, marginBottom: '20px' }}>
              RetroLog
            </div>
            <p style={{ fontFamily: "'Kalam', cursive", fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '12px', lineHeight: 1.6 }}>
              Log every watch, play, read, and listen.
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
              Your complete archive of taste across cinema, games, books, albums, and artists.
            </p>
          </div>

          {/* Why RetroLog */}
          <div className="relative z-10 my-6">
            <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem', color: '#FFD93D', letterSpacing: '0.1em', marginBottom: '16px', opacity: 0.8 }}>
              WHY RETROLOG?
            </div>
            <ul className="space-y-3">
              {[
                { icon: <FilmIcon size={14} color="#FF6B9D" />, text: 'Track films, games, books, albums & artists' },
                { icon: <StarFilledIcon size={14} color="#FFD93D" />, text: 'Rate and review with rich context' },
                { icon: <GlobeIcon size={14} color="#6BCB77" />, text: 'Discover taste through your social graph' },
                { icon: <CheckIcon size={14} color="#7BD3EA" />, text: 'Beautiful stats, streaks, and year reviews' },
              ].map(({ icon, text }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0">{icon}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)' }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust bar */}
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { n: '847K+', l: 'Reviews\nLogged' },
                { n: '2.4M+', l: 'Media\nTracked' },
                { n: '192K+', l: 'Public\nLists' },
              ].map(({ n, l }) => (
                <div key={n} className="text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 8px' }}>
                  <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.75rem', color: '#FF6B9D', marginBottom: '4px' }}>{n}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B9D, #FFD93D)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'white' }}>@pixel_archivist</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => <StarFilledIcon key={i} size={9} color="#FFD93D" />)}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontStyle: 'italic' }}>
                &ldquo;RetroLog replaced 4 different apps for me. Everything in one beautiful place.&rdquo;
              </p>
            </div>
          </div>

          {/* Footer links */}
          <div className="relative z-10 flex gap-4 flex-wrap">
            {['Terms', 'Privacy', 'Contact', 'About'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }} className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL - Auth Card */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{ background: '#F5F0E8' }}>
          <div className="w-full max-w-[420px]">

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1.4rem', color: '#FF6B9D', textShadow: '2px 2px 0 #FFD93D' }}>RetroLog</div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#6E6258', marginTop: '8px' }}>Log every watch, play, read & listen.</p>
            </div>

            <div style={{ background: '#FFFDF8', border: '1.5px solid #E5E0DA', borderRadius: '20px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.08), 6px 6px 0 rgba(0,0,0,0.05)' }}>

              {/* Tab switcher */}
              <div className="flex gap-2 mb-6" style={{ background: '#F5F0E8', borderRadius: '12px', padding: '4px' }}>
                {(['login', 'signup', 'magic'] as AuthTab[]).map(t => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setFormState('idle'); setEmailError(''); setPasswordError(''); }}
                    className="tab-btn flex-1 py-2 rounded-[9px] border-2 border-transparent"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: tab === t ? 'white' : '#6E6258',
                      background: tab === t ? '#FF6B9D' : 'transparent',
                      borderColor: tab === t ? '#FF6B9D' : 'transparent',
                      boxShadow: tab === t ? '3px 3px 0 rgba(0,0,0,0.12)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {t === 'login' ? 'Sign In' : t === 'signup' ? 'Sign Up' : 'Magic Link'}
                  </button>
                ))}
              </div>

              {/* Success state */}
              {formState === 'success' && (
                <div style={{ background: 'rgba(107,203,119,0.12)', border: '1.5px solid #6BCB77', borderRadius: '12px', padding: '16px', marginBottom: '20px' }} className="flex items-center gap-3">
                  <CheckIcon size={18} color="#6BCB77" />
                  <div>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: '#6BCB77', fontWeight: 700 }}>
                      {tab === 'magic' ? 'Magic link sent!' : tab === 'login' ? 'Welcome back!' : 'Account created!'}
                    </p>
                    <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.8rem', color: '#6E6258' }}>
                      {tab === 'magic' ? 'Check your inbox for the sign-in link.' : 'Redirecting to your archive...'}
                    </p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {formState === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid #ef4444', borderRadius: '12px', padding: '14px', marginBottom: '20px' }} className="flex items-center gap-3">
                  <XIcon size={16} color="#ef4444" />
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#ef4444' }}>
                    {tab === 'signup' && !agreeTerms ? 'Please agree to the terms.' : 'Please fix the errors below.'}
                  </p>
                </div>
              )}

              {/* Social Auth */}
              {tab !== 'magic' && (
                <div className="space-y-2.5 mb-5">
                  <button className="social-btn"><GoogleIcon /><span>Continue with Google</span></button>
                  <div className="flex gap-2">
                    <button className="social-btn"><AppleIcon /><span>Apple</span></button>
                    <button className="social-btn"><GithubIcon /><span>GitHub</span></button>
                  </div>
                  <div className="flex items-center gap-3 my-4">
                    <div style={{ flex: 1, height: '1px', background: '#E5E0DA' }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}>or with email</span>
                    <div style={{ flex: 1, height: '1px', background: '#E5E0DA' }} />
                  </div>
                </div>
              )}

              {/* Magic Link Form */}
              {tab === 'magic' && (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div style={{ background: 'rgba(123,211,234,0.1)', border: '1.5px solid #7BD3EA', borderRadius: '10px', padding: '12px 14px', marginBottom: '4px' }}>
                    <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.9rem', color: '#1F1A17' }}>
                      Enter your email and we will send a passwordless sign-in link. No password needed.
                    </p>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                    <input
                      className={`input-field ${emailError ? 'error' : ''}`}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onBlur={e => validateEmail(e.target.value)}
                    />
                    {emailError && <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#ef4444', marginTop: '4px' }}>{emailError}</p>}
                  </div>
                  <button className={`submit-btn ${formState === 'success' ? 'success' : ''}`} type="submit" disabled={formState === 'loading' || formState === 'success'}>
                    {formState === 'loading' ? 'Sending...' : formState === 'success' ? 'Link Sent!' : 'Send Magic Link'}
                  </button>
                </form>
              )}

              {/* Login / Signup Form */}
              {tab !== 'magic' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {tab === 'signup' && (
                    <div>
                      <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', display: 'block', marginBottom: '6px' }}>USERNAME</label>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="your_username"
                        value={username}
                        onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      />
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258', marginTop: '4px' }}>Only lowercase letters, numbers, and underscores.</p>
                    </div>
                  )}
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                    <input
                      className={`input-field ${emailError ? 'error' : ''}`}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onBlur={e => validateEmail(e.target.value)}
                    />
                    {emailError && <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#ef4444', marginTop: '4px' }}>{emailError}</p>}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}>PASSWORD</label>
                      {tab === 'login' && (
                        <Link href="/auth/forgot-password" style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#FF6B9D' }}>Forgot?</Link>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        className={`input-field ${passwordError ? 'error' : ''}`}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={tab === 'login' ? 'Your password' : 'Min. 8 characters'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onBlur={e => validatePassword(e.target.value)}
                        style={{ paddingRight: '44px' }}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        <EyeIcon size={16} color="#6E6258" />
                      </button>
                    </div>
                    {passwordError && <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#ef4444', marginTop: '4px' }}>{passwordError}</p>}
                    {tab === 'signup' && password.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {[password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password)].map((ok, i) => (
                          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '99px', background: ok ? '#6BCB77' : '#E5E0DA', transition: 'background 0.2s' }} />
                        ))}
                      </div>
                    )}
                  </div>
                  {tab === 'signup' && (
                    <div>
                      <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', display: 'block', marginBottom: '6px' }}>CONFIRM PASSWORD</label>
                      <input
                        className={`input-field ${confirmPassword && confirmPassword !== password ? 'error' : ''}`}
                        type="password"
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                      {confirmPassword && confirmPassword !== password && (
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#ef4444', marginTop: '4px' }}>Passwords do not match.</p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => setRememberMe(!rememberMe)}
                        style={{ width: 18, height: 18, border: '1.5px solid #E5E0DA', borderRadius: '5px', background: rememberMe ? '#FF6B9D' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}
                      >
                        {rememberMe && <CheckIcon size={11} color="white" />}
                      </div>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}>Remember me</span>
                    </label>
                  </div>

                  {tab === 'signup' && (
                    <label className="flex items-start gap-2 cursor-pointer">
                      <div
                        onClick={() => setAgreeTerms(!agreeTerms)}
                        style={{ width: 18, height: 18, border: `1.5px solid ${agreeTerms ? '#FF6B9D' : '#E5E0DA'}`, borderRadius: '5px', background: agreeTerms ? '#FF6B9D' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0, marginTop: '2px' }}
                      >
                        {agreeTerms && <CheckIcon size={11} color="white" />}
                      </div>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', lineHeight: 1.6 }}>
                        I agree to the{' '}
                        <Link href="/terms" style={{ color: '#FF6B9D', textDecoration: 'underline' }}>Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="/privacy" style={{ color: '#FF6B9D', textDecoration: 'underline' }}>Privacy Policy</Link>
                      </span>
                    </label>
                  )}

                  <button
                    className={`submit-btn ${formState === 'success' ? 'success' : ''}`}
                    type="submit"
                    disabled={formState === 'loading' || formState === 'success'}
                  >
                    {formState === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40 20"/>
                        </svg>
                        {tab === 'login' ? 'Signing in...' : 'Creating account...'}
                      </span>
                    ) : formState === 'success' ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckIcon size={14} color="white" />
                        {tab === 'login' ? 'Welcome back!' : 'Account created!'}
                      </span>
                    ) : (
                      tab === 'login' ? 'Sign In to RetroLog' : 'Create My Archive'
                    )}
                  </button>
                </form>
              )}

              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', textAlign: 'center', marginTop: '16px' }}>
                {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
                  style={{ color: '#FF6B9D', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700 }}
                >
                  {tab === 'login' ? 'Sign up free' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
