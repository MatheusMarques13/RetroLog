'use client'
import React, { useState } from 'react'
import {
  XIcon, CameraIcon, UploadIcon, PaletteIcon, LayoutIcon,
  LockIcon, BellIcon, DownloadIcon, TrashIcon, AlertTriangleIcon,
  CheckIcon, GlobeIcon, LogOutIcon, SlidersIcon,
} from '@/components/icons'
import { ToggleSwitch } from './shared'

const ACCENT_COLORS = [
  { id: 'pink', color: '#FF6B9D', label: 'Pink' },
  { id: 'yellow', color: '#FFD93D', label: 'Yellow' },
  { id: 'mint', color: '#6BCB77', label: 'Mint' },
  { id: 'blue', color: '#7BD3EA', label: 'Blue' },
]

const THEMES = [
  { id: 'paper-light', label: 'Paper Light', desc: 'Warm cream tones' },
  { id: 'midnight-archive', label: 'Midnight Archive', desc: 'Deep dark mode' },
  { id: 'sunset-tape', label: 'Sunset Tape', desc: 'Golden warm hues' },
  { id: 'mint-catalog', label: 'Mint Catalog', desc: 'Cool green tones' },
]

const LAYOUTS = [
  { id: 'classic', label: 'Classic' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'shelf', label: 'Shelf' },
  { id: 'dashboard', label: 'Dashboard' },
]

export default function EditProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState('profile')
  const [displayName, setDisplayName] = useState('Matheus Marques')
  const [username, setUsername] = useState('retromatheus')
  const [bio, setBio] = useState('Cinephile, gamer, bookworm, vinyl collector.')
  const [pronouns, setPronouns] = useState('he/him')
  const [location, setLocation] = useState('Fortaleza, CE, Brazil')
  const [website, setWebsite] = useState('retromynd.com')
  const [quote, setQuote] = useState('"The stuff that dreams are made of."')
  const [accentColor, setAccentColor] = useState('pink')
  const [activeTheme, setActiveTheme] = useState('paper-light')
  const [activeLayout, setActiveLayout] = useState('classic')
  const [roundedCorners, setRoundedCorners] = useState(true)
  const [compactCards, setCompactCards] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)
  const [privateLikes, setPrivateLikes] = useState(false)
  const [hideActivity, setHideActivity] = useState(false)
  const [hideFollowers, setHideFollowers] = useState(false)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(true)
  const [reviewNotifs, setReviewNotifs] = useState(true)
  const [followNotifs, setFollowNotifs] = useState(true)
  const [spoilerDefaults, setSpoilerDefaults] = useState(false)

  if (!isOpen) return null

  const sections = [
    { id: 'profile', label: 'Profile Info', icon: CameraIcon },
    { id: 'appearance', label: 'Appearance', icon: PaletteIcon },
    { id: 'privacy', label: 'Privacy', icon: LockIcon },
    { id: 'preferences', label: 'Preferences', icon: SlidersIcon },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangleIcon },
  ]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-dark/50 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-bg-primary z-50 shadow-2xl overflow-y-auto slide-in-right border-l-2 border-border">
        {/* Header */}
        <div className="sticky top-0 bg-bg-primary/95 backdrop-blur-sm z-10 px-6 py-4 border-b-2 border-border flex items-center justify-between">
          <h2 className="font-hand font-bold text-xl text-txt-primary">Edit Profile</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-bg-secondary transition-colors" aria-label="Close">
            <XIcon className="w-5 h-5 text-txt-secondary" />
          </button>
        </div>

        {/* Section nav */}
        <div className="px-6 py-3 border-b border-border flex gap-2 overflow-x-auto scrollbar-none">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                activeSection === s.id
                  ? 'bg-accent-pink/10 text-accent-pink border border-accent-pink/30'
                  : 'text-txt-secondary hover:text-txt-primary border border-transparent'
              }`}
            >
              <s.icon className="w-3 h-3" />{s.label}
            </button>
          ))}
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* ── PROFILE INFO ── */}
          {activeSection === 'profile' && (
            <div className="fade-in-up space-y-5">
              {/* Avatar & Cover */}
              <div className="space-y-4">
                <p className="section-label">Profile Photo</p>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-bg-secondary border-2 border-border flex items-center justify-center">
                    <span className="font-pixel text-2xl text-accent-pink">M</span>
                  </div>
                  <div className="space-y-2">
                    <button className="retro-btn-ghost text-xs py-2 px-3">
                      <UploadIcon className="w-3.5 h-3.5" />Upload Photo
                    </button>
                    <p className="font-mono text-[10px] text-txt-secondary">JPG, PNG. Max 2MB.</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="section-label">Cover Image</p>
                <div className="w-full h-24 rounded-xl bg-gradient-to-r from-accent-pink/20 via-accent-yellow/20 to-accent-mint/20 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-accent-pink transition-colors">
                  <div className="text-center">
                    <CameraIcon className="w-5 h-5 text-txt-secondary mx-auto mb-1" />
                    <p className="font-hand text-xs text-txt-secondary">Click to upload</p>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Display Name</label>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-txt-secondary">@</span>
                  <input value={username} onChange={e => setUsername(e.target.value)} className="input-field pl-8" />
                </div>
              </div>
              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Bio</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="input-field resize-none" />
                <p className="font-mono text-[10px] text-txt-secondary mt-1">{bio.length}/160</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Pronouns</label>
                  <input value={pronouns} onChange={e => setPronouns(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Location</label>
                  <input value={location} onChange={e => setLocation(e.target.value)} className="input-field" />
                </div>
              </div>
              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Website</label>
                <input value={website} onChange={e => setWebsite(e.target.value)} className="input-field" placeholder="yoursite.com" />
              </div>
              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Favorite Quote</label>
                <input value={quote} onChange={e => setQuote(e.target.value)} className="input-field" />
              </div>

              <div>
                <p className="section-label">Social Links</p>
                <div className="space-y-3">
                  {[
                    { label: 'Twitter / X', placeholder: '@username' },
                    { label: 'Letterboxd', placeholder: 'username' },
                    { label: 'GitHub', placeholder: 'username' },
                  ].map(link => (
                    <div key={link.label}>
                      <label className="font-hand text-xs text-txt-secondary mb-1 block">{link.label}</label>
                      <input className="input-field py-2 text-xs" placeholder={link.placeholder} />
                    </div>
                  ))}
                </div>
              </div>

              <button className="retro-btn-pink text-sm w-full justify-center">
                <CheckIcon className="w-4 h-4" />Save Changes
              </button>
            </div>
          )}

          {/* ── APPEARANCE ── */}
          {activeSection === 'appearance' && (
            <div className="fade-in-up space-y-6">
              <div>
                <p className="section-label">Accent Color</p>
                <div className="flex gap-3">
                  {ACCENT_COLORS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setAccentColor(c.id)}
                      className={`w-10 h-10 rounded-xl border-2 transition-all ${
                        accentColor === c.id ? 'border-dark scale-110 shadow-retro' : 'border-border hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.color }}
                      aria-label={c.label}
                    >
                      {accentColor === c.id && <CheckIcon className="w-4 h-4 text-white mx-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="section-label">Theme</p>
                <div className="grid grid-cols-2 gap-3">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTheme(t.id)}
                      className={`retro-card p-3 text-left transition-all ${
                        activeTheme === t.id ? 'border-accent-pink shadow-retro' : ''
                      }`}
                    >
                      <p className="font-hand text-sm font-bold text-txt-primary">{t.label}</p>
                      <p className="font-mono text-[10px] text-txt-secondary">{t.desc}</p>
                      {activeTheme === t.id && <CheckIcon className="w-3 h-3 text-accent-pink mt-1" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="section-label">Layout Style</p>
                <div className="flex gap-2 flex-wrap">
                  {LAYOUTS.map(l => (
                    <button
                      key={l.id}
                      onClick={() => setActiveLayout(l.id)}
                      className={`filter-chip ${activeLayout === l.id ? 'active' : ''}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <ToggleSwitch active={roundedCorners} onChange={() => setRoundedCorners(!roundedCorners)} label="Rounded corners" />
              <ToggleSwitch active={compactCards} onChange={() => setCompactCards(!compactCards)} label="Compact card density" />

              <div>
                <p className="section-label">Profile Sections Order</p>
                <div className="retro-card p-3 space-y-1">
                  {['Overview', 'Activity', 'Reviews', 'Ratings', 'Lists', 'Favorites', 'Diary', 'Collection', 'Backlog', 'Stats', 'Social', 'About'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-bg-secondary transition-colors cursor-grab">
                      <span className="font-mono text-[10px] text-txt-secondary w-4">{i + 1}</span>
                      <span className="font-hand text-sm text-txt-primary flex-1">{s}</span>
                      <LayoutIcon className="w-3 h-3 text-txt-secondary/40" />
                    </div>
                  ))}
                </div>
              </div>

              <button className="retro-btn-pink text-sm w-full justify-center">
                <CheckIcon className="w-4 h-4" />Save Appearance
              </button>
            </div>
          )}

          {/* ── PRIVACY ── */}
          {activeSection === 'privacy' && (
            <div className="fade-in-up space-y-2">
              <p className="section-label">Visibility</p>
              <ToggleSwitch active={publicProfile} onChange={() => setPublicProfile(!publicProfile)} label="Public profile" />
              <ToggleSwitch active={privateLikes} onChange={() => setPrivateLikes(!privateLikes)} label="Private likes" />
              <ToggleSwitch active={hideActivity} onChange={() => setHideActivity(!hideActivity)} label="Hide activity feed" />
              <ToggleSwitch active={hideFollowers} onChange={() => setHideFollowers(!hideFollowers)} label="Hide followers / following" />

              <div className="pt-4">
                <p className="section-label">Notifications</p>
                <ToggleSwitch active={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} label="Email notifications" />
                <ToggleSwitch active={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} label="Push notifications" />
                <ToggleSwitch active={reviewNotifs} onChange={() => setReviewNotifs(!reviewNotifs)} label="Review likes and comments" />
                <ToggleSwitch active={followNotifs} onChange={() => setFollowNotifs(!followNotifs)} label="New followers" />
              </div>

              <button className="retro-btn-pink text-sm w-full justify-center mt-4">
                <CheckIcon className="w-4 h-4" />Save Privacy Settings
              </button>
            </div>
          )}

          {/* ── PREFERENCES ── */}
          {activeSection === 'preferences' && (
            <div className="fade-in-up space-y-4">
              <p className="section-label">Content</p>
              <ToggleSwitch active={spoilerDefaults} onChange={() => setSpoilerDefaults(!spoilerDefaults)} label="Hide spoilers by default" />

              <div>
                <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Language</label>
                <select className="input-field" defaultValue="en">
                  <option value="en">English</option>
                  <option value="pt">Portugues</option>
                  <option value="es">Espanol</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>

              <div>
                <p className="section-label">Pinned Content</p>
                <div className="space-y-2">
                  <div className="retro-card p-3 flex items-center justify-between">
                    <div>
                      <p className="font-hand text-sm text-txt-primary">Pinned Review</p>
                      <p className="font-mono text-xs text-txt-secondary">Dune: Part Two</p>
                    </div>
                    <button className="font-hand text-xs text-accent-pink hover:underline">Change</button>
                  </div>
                  <div className="retro-card p-3 flex items-center justify-between">
                    <div>
                      <p className="font-hand text-sm text-txt-primary">Pinned List</p>
                      <p className="font-mono text-xs text-txt-secondary">Comfort Films for Rainy Days</p>
                    </div>
                    <button className="font-hand text-xs text-accent-pink hover:underline">Change</button>
                  </div>
                </div>
              </div>

              <div>
                <p className="section-label">Favorite Categories to Highlight</p>
                <div className="flex gap-2 flex-wrap">
                  {['Films', 'Games', 'Books', 'Albums', 'Artists'].map(cat => (
                    <button key={cat} className="filter-chip active">{cat}</button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <p className="section-label">Data</p>
                <div className="space-y-2">
                  <button className="retro-btn-ghost text-sm w-full justify-center">
                    <DownloadIcon className="w-4 h-4" />Export My Data
                  </button>
                  <button className="retro-btn-ghost text-sm w-full justify-center">
                    <UploadIcon className="w-4 h-4" />Import Watch History
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── DANGER ZONE ── */}
          {activeSection === 'danger' && (
            <div className="fade-in-up space-y-4">
              <div className="retro-card border-red-300 bg-red-50/50 p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangleIcon className="w-5 h-5 text-red-500" />
                  <p className="font-hand font-bold text-red-700">Danger Zone</p>
                </div>
                <p className="font-hand text-sm text-red-600/80">These actions are permanent and cannot be undone.</p>

                <div className="space-y-3 pt-2">
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-red-300 text-red-600 font-hand font-bold text-sm hover:bg-red-50 transition-colors">
                    <LogOutIcon className="w-4 h-4" />Deactivate Account
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-red-500 bg-red-500 text-white font-hand font-bold text-sm hover:bg-red-600 transition-colors">
                    <TrashIcon className="w-4 h-4" />Delete Account Permanently
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
