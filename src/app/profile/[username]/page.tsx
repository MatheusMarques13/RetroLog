'use client';

import { useState } from 'react';
import {
  FilmIcon, GamepadIcon, BookIcon, VinylIcon, PersonIcon,
  StarFilledIcon, StarIcon, HeartIcon, EyeIcon, MessageIcon,
  BookmarkIcon, ClockIcon, CalendarIcon, ChartIcon, ListIcon,
  SettingsIcon, ShareIcon, LinkIcon, EditIcon, UploadIcon,
  LockIcon, BellIcon, GlobeIcon, SearchIcon, LocationIcon,
  CheckIcon, XIcon, PlusIcon, ChevronDownIcon, LogOutIcon,
  ShieldIcon, TrendingIcon, GridIcon, SparkleIcon
} from '@/components/ui/Icons';

// ─── Mock Data ───────────────────────────────────────────
const mockUser = {
  username: 'pixel_archivist',
  displayName: 'Alex Rivera',
  pronouns: 'they/them',
  bio: 'Chasing the perfect late-night double feature. I log everything — even the bad stuff. Especially the bad stuff.',
  location: 'Fortaleza, CE — Brazil',
  website: 'alexrivera.dev',
  memberSince: 'March 2024',
  quote: '"Cinema is a mirror by which we often see ourselves." — Martin Scorsese',
  following: 312,
  followers: 1847,
  totalLogs: 2194,
  totalReviews: 487,
  totalLists: 34,
  totalLikes: 9203,
  verified: true,
  supporter: true,
  theme: 'Midnight Archive',
  completionPct: 84,
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: <GridIcon size={14} /> },
  { id: 'activity', label: 'Activity', icon: <TrendingIcon size={14} /> },
  { id: 'reviews', label: 'Reviews', icon: <MessageIcon size={14} /> },
  { id: 'ratings', label: 'Ratings', icon: <StarIcon size={14} /> },
  { id: 'lists', label: 'Lists', icon: <ListIcon size={14} /> },
  { id: 'favorites', label: 'Favorites', icon: <HeartIcon size={14} /> },
  { id: 'diary', label: 'Diary', icon: <CalendarIcon size={14} /> },
  { id: 'collection', label: 'Collection', icon: <BookmarkIcon size={14} /> },
  { id: 'backlog', label: 'Backlog', icon: <ClockIcon size={14} /> },
  { id: 'stats', label: 'Stats', icon: <ChartIcon size={14} /> },
  { id: 'social', label: 'Social', icon: <GlobeIcon size={14} /> },
  { id: 'about', label: 'About', icon: <PersonIcon size={14} /> },
];

type MediaType = 'films' | 'games' | 'books' | 'albums' | 'artists';
const mediaIcons: Record<MediaType, React.ReactNode> = {
  films: <FilmIcon size={14} color="#FF6B9D" />,
  games: <GamepadIcon size={14} color="#6BCB77" />,
  books: <BookIcon size={14} color="#7BD3EA" />,
  albums: <VinylIcon size={14} color="#FFD93D" />,
  artists: <PersonIcon size={14} color="#FF6B9D" />,
};
const mediaColors: Record<MediaType, string> = {
  films: '#FF6B9D', games: '#6BCB77', books: '#7BD3EA', albums: '#FFD93D', artists: '#FF6B9D',
};

const favorites = {
  films: [
    { title: 'Blade Runner 2049', year: 2017, rating: 5, color: '#1a1a2e' },
    { title: 'Eternal Sunshine', year: 2004, rating: 5, color: '#2d1b33' },
    { title: 'Mulholland Drive', year: 2001, rating: 5, color: '#1a2a1a' },
    { title: 'Synecdoche, NY', year: 2008, rating: 5, color: '#2a1a0e' },
  ],
  games: [
    { title: 'Hollow Knight', year: 2017, rating: 5, color: '#0d1117' },
    { title: 'Disco Elysium', year: 2019, rating: 5, color: '#1a1025' },
    { title: 'Outer Wilds', year: 2019, rating: 5, color: '#1a160a' },
  ],
  books: [
    { title: 'Dune', year: 1965, rating: 5, color: '#1a1508' },
    { title: 'Piranesi', year: 2020, rating: 5, color: '#0a1520' },
  ],
  albums: [
    { title: 'Blonde', year: 2016, rating: 5, color: '#0d0d0d' },
    { title: 'In Rainbows', year: 2007, rating: 5, color: '#1a0a0a' },
    { title: 'To Pimp a Butterfly', year: 2015, rating: 5, color: '#0a1a0a' },
  ],
  artists: [
    { title: 'Kendrick Lamar', year: 2003, rating: 5, color: '#1a1a0a' },
    { title: 'Frank Ocean', year: 2009, rating: 5, color: '#0a0a1a' },
  ],
};

const recentActivity = [
  { type: 'logged', media: 'film', title: 'Perfect Days', rating: 5, time: '2h ago', note: 'Wenders in full meditative mode. Gorgeous.' },
  { type: 'finished', media: 'game', title: 'Balatro', rating: 4, time: '1d ago', note: 'One more run. Always one more run.' },
  { type: 'rated', media: 'album', title: 'Chromakopia', rating: 4, time: '2d ago', note: null },
  { type: 'reviewed', media: 'film', title: 'The Zone of Interest', rating: 5, time: '3d ago', note: 'A horror film that never shows the horror. Devastating.' },
  { type: 'created_list', media: null, title: 'Films That Broke Me', rating: null, time: '5d ago', note: '12 entries' },
  { type: 'followed', media: null, title: '@cinema_ghost', rating: null, time: '1w ago', note: null },
  { type: 'liked', media: 'film', title: 'review of Caché', rating: null, time: '1w ago', note: 'by @pauline_kael_fan' },
];

const reviews = [
  { title: 'The Zone of Interest', year: 2023, type: 'film', rating: 5, excerpt: 'Jonathan Glazer has made a film that refuses to look where horror happens, and in doing so creates something far more unsettling than any conventional horror film ever could. The mundanity is the point.', likes: 847, comments: 62, tags: ['arthouse', 'war', 'holocaust'], spoiler: false },
  { title: 'Disco Elysium', year: 2019, type: 'game', rating: 5, excerpt: 'This game is a novel. It is a confession. It is the most human thing I have experienced in interactive fiction. Harry Du Bois is every person who has ever tried to understand themselves through the wreckage of their choices.', likes: 1203, comments: 94, tags: ['rpg', 'detective', 'existential'], spoiler: false },
  { title: 'Piranesi', year: 2020, type: 'book', rating: 5, excerpt: 'There are books that feel like being found. Piranesi is one of those books. Susanna Clarke writes with such precision and wonder that I felt genuinely lost inside its impossible halls.', likes: 622, comments: 44, tags: ['fantasy', 'mystery', 'literary'], spoiler: false },
];

const lists = [
  { title: 'Films That Broke Me', items: 12, likes: 340, comments: 28, desc: 'Cinema that permanently altered my worldview.', pinned: true },
  { title: 'Comfort Games for Bad Days', items: 8, likes: 198, comments: 16, desc: 'Low-stakes, warm, forgiving.', pinned: false },
  { title: 'Best Rainy Day Albums', items: 15, likes: 412, comments: 33, desc: 'Music for grey skies and hot coffee.', pinned: true },
  { title: 'Books That Changed Me', items: 7, likes: 276, comments: 22, desc: 'Required reading if you want to understand me.', pinned: false },
];

const stats = {
  films: { count: 847, hours: 1694 },
  games: { count: 312, hours: 2840 },
  books: { count: 198, pages: 68400 },
  albums: { count: 534, hours: 890 },
  artists: { count: 203, hours: 0 },
};

const ratingDist = [2, 5, 14, 28, 51]; // % for 1-5 stars

// ─── Sub-components ───────────────────────────────────────

const Tag = ({ label, color }: { label: string; color: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
    borderRadius: '99px', border: `1.5px solid ${color}`,
    fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color, whiteSpace: 'nowrap'
  }}>{label}</span>
);

const Stars = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <StarFilledIcon key={i} size={size} color={i <= rating ? '#FFD93D' : '#E5E0DA'} />
    ))}
  </div>
);

const SectionHeader = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-4" style={{ marginTop: '28px' }}>
    {icon}
    <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem', color: '#6E6258', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
    <div style={{ flex: 1, height: '1px', background: '#E5E0DA' }} />
  </div>
);

const MediaCard = ({ title, year, color, type }: { title: string; year: number; color: string; type: MediaType }) => (
  <div style={{
    background: color, borderRadius: '12px', overflow: 'hidden',
    border: '2px solid rgba(255,255,255,0.08)', position: 'relative',
    aspectRatio: '2/3', minWidth: '90px', boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
    cursor: 'pointer', transition: 'transform 0.15s ease',
  }}
    className="hover:-translate-y-1"
  >
    <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
      {mediaIcons[type]}
    </div>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'white', lineHeight: 1.3 }}>{title}</p>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>{year}</p>
    </div>
  </div>
);

const ActivityItem = ({ item }: { item: typeof recentActivity[0] }) => {
  const typeLabel: Record<string, string> = {
    logged: 'logged', finished: 'finished', rated: 'rated',
    reviewed: 'reviewed', created_list: 'created list', followed: 'followed', liked: 'liked'
  };
  const typeColor: Record<string, string> = {
    logged: '#7BD3EA', finished: '#6BCB77', rated: '#FFD93D',
    reviewed: '#FF6B9D', created_list: '#FF6B9D', followed: '#6BCB77', liked: '#FF6B9D'
  };
  return (
    <div style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{ width: 40, height: 40, borderRadius: '8px', background: item.media ? mediaColors[item.media as MediaType] + '22' : '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1.5px solid #E5E0DA' }}>
        {item.media ? mediaIcons[item.media as MediaType] : <SparkleIcon size={14} color="#FF6B9D" />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <Tag label={typeLabel[item.type]} color={typeColor[item.type]} />
          <span style={{ fontFamily: "'Kalam', cursive", fontSize: '0.95rem', color: '#1F1A17', fontWeight: 700 }}>{item.title}</span>
          {item.rating && <Stars rating={item.rating} size={10} />}
        </div>
        {item.note && <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.85rem', color: '#6E6258', marginTop: '3px' }}>{item.note}</p>}
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
    </div>
  );
};

const StatBlock = ({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) => (
  <div style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '12px', padding: '16px', display: 'flex', flex-direction: 'column', gap: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {icon}
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
    </div>
    <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1.1rem', color }}>{value}</span>
  </div>
);

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    style={{
      width: 40, height: 22, borderRadius: '99px',
      background: enabled ? '#FF6B9D' : '#E5E0DA',
      border: 'none', cursor: 'pointer', position: 'relative',
      transition: 'background 0.2s ease', flexShrink: 0,
    }}
  >
    <div style={{
      width: 16, height: 16, borderRadius: '50%', background: 'white',
      position: 'absolute', top: 3, left: enabled ? 21 : 3,
      transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }} />
  </button>
);

const SettingRow = ({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: () => void }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E5E0DA' }}>
    <div>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#1F1A17' }}>{label}</p>
      {desc && <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.8rem', color: '#6E6258', marginTop: '2px' }}>{desc}</p>}
    </div>
    <ToggleSwitch enabled={value} onChange={onChange} />
  </div>
);

// ─── Edit Profile Modal ───────────────────────────────────
const EditProfileModal = ({ onClose }: { onClose: () => void }) => {
  const [privacyPublic, setPrivacyPublic] = useState(true);
  const [privateLikes, setPrivateLikes] = useState(false);
  const [hideActivity, setHideActivity] = useState(false);
  const [hideFollowers, setHideFollowers] = useState(false);
  const [notifReviews, setNotifReviews] = useState(true);
  const [notifFollows, setNotifFollows] = useState(true);
  const [notifLists, setNotifLists] = useState(false);
  const [spoilerDefault, setSpoilerDefault] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Midnight Archive');
  const [selectedLayout, setSelectedLayout] = useState('Classic');
  const [density, setDensity] = useState('comfortable');
  const themes = ['Paper Light', 'Midnight Archive', 'Sunset Tape', 'Mint Catalog'];
  const layouts = ['Classic', 'Editorial', 'Shelf', 'Dashboard'];
  const accentColors = ['#FF6B9D', '#FFD93D', '#6BCB77', '#7BD3EA', '#a78bfa', '#fb923c'];
  const [accent, setAccent] = useState('#FF6B9D');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
      <div style={{ width: '100%', maxWidth: '480px', height: '100vh', overflowY: 'auto', background: '#FFFDF8', borderLeft: '1.5px solid #E5E0DA', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }}>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1.5px solid #E5E0DA', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#FFFDF8', zIndex: 10 }}>
          <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem', color: '#1F1A17' }}>Edit Profile</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><XIcon size={18} color="#6E6258" /></button>
        </div>

        <div style={{ padding: '24px' }}>

          {/* Avatar & Cover */}
          <SectionHeader label="Identity" icon={<PersonIcon size={14} color="#FF6B9D" />} />
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B9D, #FFD93D)', border: '3px solid #E5E0DA', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                <UploadIcon size={16} color="white" />
              </div>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: '#6E6258' }}>Change Photo</span>
            </div>
            <div style={{ flex: 1, background: 'linear-gradient(135deg, #1F1A17, #4A3F2E)', borderRadius: '10px', border: '1.5px solid #E5E0DA', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '72px' }}>
              <div style={{ textAlign: 'center' }}>
                <UploadIcon size={16} color="rgba(255,255,255,0.5)" />
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Change Cover</p>
              </div>
            </div>
          </div>

          {/* Fields */}
          {[['Display Name', 'Alex Rivera'], ['Username', 'pixel_archivist'], ['Location', 'Fortaleza, CE — Brazil'], ['Website', 'alexrivera.dev'], ['Pronouns', 'they/them']].map(([label, val]) => (
            <div key={label} style={{ marginBottom: '14px' }}>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', display: 'block', marginBottom: '5px' }}>{label.toUpperCase()}</label>
              <input defaultValue={val} style={{ width: '100%', padding: '10px 12px', background: '#F5F0E8', border: '1.5px solid #E5E0DA', borderRadius: '8px', fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: '#1F1A17', outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', display: 'block', marginBottom: '5px' }}>BIO</label>
            <textarea rows={3} defaultValue={mockUser.bio} style={{ width: '100%', padding: '10px 12px', background: '#F5F0E8', border: '1.5px solid #E5E0DA', borderRadius: '8px', fontFamily: "'Kalam', cursive", fontSize: '0.9rem', color: '#1F1A17', outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', display: 'block', marginBottom: '5px' }}>FAVORITE QUOTE</label>
            <input defaultValue={mockUser.quote} style={{ width: '100%', padding: '10px 12px', background: '#F5F0E8', border: '1.5px solid #E5E0DA', borderRadius: '8px', fontFamily: "'Kalam', cursive", fontSize: '0.85rem', color: '#1F1A17', outline: 'none' }} />
          </div>

          {/* Theme */}
          <SectionHeader label="Appearance" icon={<SparkleIcon size={14} color="#FFD93D" />} />
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', display: 'block', marginBottom: '8px' }}>THEME MODE</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {themes.map(t => (
                <button key={t} onClick={() => setSelectedTheme(t)}
                  style={{ padding: '10px', borderRadius: '8px', border: `1.5px solid ${selectedTheme === t ? '#FF6B9D' : '#E5E0DA'}`, background: selectedTheme === t ? 'rgba(255,107,157,0.08)' : '#F5F0E8', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: selectedTheme === t ? '#FF6B9D' : '#6E6258', transition: 'all 0.15s' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', display: 'block', marginBottom: '8px' }}>ACCENT COLOR</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {accentColors.map(c => (
                <button key={c} onClick={() => setAccent(c)}
                  style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: accent === c ? '3px solid #1F1A17' : '2px solid transparent', cursor: 'pointer', transition: 'border 0.15s', outline: 'none' }} />
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', display: 'block', marginBottom: '8px' }}>PROFILE LAYOUT</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {layouts.map(l => (
                <button key={l} onClick={() => setSelectedLayout(l)}
                  style={{ padding: '10px', borderRadius: '8px', border: `1.5px solid ${selectedLayout === l ? '#6BCB77' : '#E5E0DA'}`, background: selectedLayout === l ? 'rgba(107,203,119,0.08)' : '#F5F0E8', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: selectedLayout === l ? '#6BCB77' : '#6E6258', transition: 'all 0.15s' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <SectionHeader label="Privacy" icon={<LockIcon size={14} color="#7BD3EA" />} />
          <SettingRow label="Public profile" desc="Anyone can view your profile" value={privacyPublic} onChange={() => setPrivacyPublic(!privacyPublic)} />
          <SettingRow label="Private likes" desc="Only you can see your liked items" value={privateLikes} onChange={() => setPrivateLikes(!privateLikes)} />
          <SettingRow label="Hide activity" desc="Don't show activity in feeds" value={hideActivity} onChange={() => setHideActivity(!hideActivity)} />
          <SettingRow label="Hide followers/following" desc="Keep social counts private" value={hideFollowers} onChange={() => setHideFollowers(!hideFollowers)} />

          {/* Notifications */}
          <SectionHeader label="Notifications" icon={<BellIcon size={14} color="#FF6B9D" />} />
          <SettingRow label="New review likes" value={notifReviews} onChange={() => setNotifReviews(!notifReviews)} />
          <SettingRow label="New followers" value={notifFollows} onChange={() => setNotifFollows(!notifFollows)} />
          <SettingRow label="List saves" value={notifLists} onChange={() => setNotifLists(!notifLists)} />

          {/* Content */}
          <SectionHeader label="Content" icon={<ShieldIcon size={14} color="#6BCB77" />} />
          <SettingRow label="Hide spoilers by default" desc="Blur review content with spoiler tags" value={spoilerDefault} onChange={() => setSpoilerDefault(!spoilerDefault)} />
          <div style={{ marginTop: '12px', marginBottom: '8px' }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', display: 'block', marginBottom: '5px' }}>LANGUAGE</label>
            <select style={{ width: '100%', padding: '10px 12px', background: '#F5F0E8', border: '1.5px solid #E5E0DA', borderRadius: '8px', fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#1F1A17', outline: 'none' }}>
              <option>English (US)</option>
              <option>Portuguese (BR)</option>
              <option>Spanish</option>
              <option>Japanese</option>
            </select>
          </div>

          {/* Data */}
          <SectionHeader label="Data" icon={<UploadIcon size={14} color="#6E6258" />} />
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <button style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1.5px solid #E5E0DA', background: '#F5F0E8', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', cursor: 'pointer' }}>Export Data</button>
            <button style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1.5px solid #E5E0DA', background: '#F5F0E8', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', cursor: 'pointer' }}>Import History</button>
          </div>

          {/* Danger zone */}
          <SectionHeader label="Danger Zone" icon={<XIcon size={14} color="#ef4444" />} />
          <div style={{ background: 'rgba(239,68,68,0.05)', border: '1.5px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '16px' }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#ef4444', marginBottom: '10px' }}>Permanent actions — proceed with caution.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Deactivate Account', 'Delete All Data', 'Permanently Delete Account'].map(a => (
                <button key={a} style={{ padding: '9px 14px', borderRadius: '8px', border: '1.5px solid rgba(239,68,68,0.3)', background: 'white', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#ef4444', cursor: 'pointer', textAlign: 'left' }}>{a}</button>
              ))}
            </div>
          </div>

          {/* Save */}
          <button
            onClick={onClose}
            style={{ width: '100%', marginTop: '24px', padding: '13px', background: '#FF6B9D', color: 'white', border: '2px solid #1F1A17', borderRadius: '10px', fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)', letterSpacing: '0.05em' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [editOpen, setEditOpen] = useState(false);
  const [following, setFollowing] = useState(false);

  const renderTab = () => {
    switch (activeTab) {

      case 'overview': return (
        <div>
          {/* Current Obsession */}
          <SectionHeader label="Now Into" icon={<SparkleIcon size={14} color="#FF6B9D" />} />
          <div style={{ background: 'linear-gradient(135deg, #171717, #2a1a2a)', borderRadius: '14px', padding: '20px', border: '1.5px solid rgba(255,107,157,0.2)', marginBottom: '4px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '10px', background: 'rgba(255,107,157,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1.5px solid rgba(255,107,157,0.2)' }}>
                <FilmIcon size={22} color="#FF6B9D" />
              </div>
              <div>
                <Tag label="currently obsessed with" color="#FF6B9D" />
                <p style={{ fontFamily: "'Kalam', cursive", fontSize: '1.1rem', color: 'white', marginTop: '4px' }}>Wim Wenders filmography</p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>14 films watched this month</p>
              </div>
            </div>
          </div>

          {/* Favorites grid */}
          {(['films', 'games', 'books', 'albums'] as MediaType[]).map(type => (
            <div key={type}>
              <SectionHeader label={`Favorite ${type}`} icon={mediaIcons[type]} />
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {favorites[type as keyof typeof favorites].map((f: any) => (
                  <MediaCard key={f.title} {...f} type={type} />
                ))}
              </div>
            </div>
          ))}

          {/* Recently logged */}
          <SectionHeader label="Recently Logged" icon={<ClockIcon size={14} color="#7BD3EA" />} />
          <div className="space-y-3">
            {recentActivity.slice(0, 4).map((a, i) => <ActivityItem key={i} item={a} />)}
          </div>

          {/* Pinned list */}
          <SectionHeader label="Pinned List" icon={<ListIcon size={14} color="#FFD93D" />} />
          <div style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '12px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Tag label="pinned" color="#FFD93D" />
                <p style={{ fontFamily: "'Kalam', cursive", fontSize: '1.05rem', color: '#1F1A17', fontWeight: 700, marginTop: '6px' }}>Films That Broke Me</p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', marginTop: '4px' }}>12 entries · 340 saves</p>
              </div>
              <BookmarkIcon size={18} color="#FFD93D" />
            </div>
          </div>

          {/* Taste tags */}
          <SectionHeader label="Taste Profile" icon={<SparkleIcon size={14} color="#6BCB77" />} />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['arthouse', 'slow cinema', 'existential fiction', 'metroidvania', 'ambient music', 'literary sf', 'indie games', 'jazz fusion', 'noir', 'post-rock'].map((tag, i) => (
              <Tag key={tag} label={tag} color={['#FF6B9D','#6BCB77','#7BD3EA','#FFD93D'][i % 4]} />
            ))}
          </div>

          {/* Badges */}
          <SectionHeader label="Achievements" icon={<ShieldIcon size={14} color="#FFD93D" />} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { label: 'Century Club', desc: '100+ films', color: '#FF6B9D' },
              { label: 'Completionist', desc: '50+ games', color: '#6BCB77' },
              { label: 'Bibliophile', desc: '100+ books', color: '#7BD3EA' },
              { label: 'Vinyl Head', desc: '200+ albums', color: '#FFD93D' },
              { label: 'Critic', desc: '100+ reviews', color: '#FF6B9D' },
              { label: 'Supporter', desc: 'Pro member', color: '#FFD93D' },
            ].map(b => (
              <div key={b.label} style={{ background: '#FFF9F0', border: `1.5px solid ${b.color}33`, borderRadius: '10px', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: b.color, fontWeight: 700 }}>{b.label}</span>
                <span style={{ fontFamily: "'Kalam', cursive", fontSize: '0.75rem', color: '#6E6258' }}>{b.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );

      case 'activity': return (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {['All', 'Films', 'Games', 'Books', 'Albums', 'Lists', 'Social'].map(f => (
              <button key={f} style={{ padding: '6px 14px', borderRadius: '99px', border: '1.5px solid #E5E0DA', background: f === 'All' ? '#FF6B9D' : 'white', color: f === 'All' ? 'white' : '#6E6258', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', cursor: 'pointer' }}>{f}</button>
            ))}
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => <ActivityItem key={i} item={a} />)}
          </div>
        </div>
      );

      case 'reviews': return (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Films', 'Games', 'Books', 'Albums'].map(f => (
                <button key={f} style={{ padding: '6px 14px', borderRadius: '99px', border: '1.5px solid #E5E0DA', background: f === 'All' ? '#FF6B9D' : 'white', color: f === 'All' ? 'white' : '#6E6258', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', cursor: 'pointer' }}>{f}</button>
              ))}
            </div>
            <select style={{ padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #E5E0DA', background: 'white', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', outline: 'none' }}>
              <option>Newest</option>
              <option>Most Liked</option>
              <option>Highest Rated</option>
              <option>Most Comments</option>
            </select>
          </div>
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: 52, height: 76, borderRadius: '8px', background: '#1F1A17', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {mediaIcons[r.type as MediaType]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span style={{ fontFamily: "'Kalam', cursive", fontSize: '1.05rem', color: '#1F1A17', fontWeight: 700 }}>{r.title}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}>{r.year}</span>
                      <Stars rating={r.rating} />
                    </div>
                    <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.9rem', color: '#6E6258', lineHeight: 1.6, marginBottom: '10px' }}>{r.excerpt}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {r.tags.map(t => <Tag key={t} label={t} color="#6E6258" />)}
                    </div>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}><HeartIcon size={13} color="#FF6B9D" />{r.likes}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}><MessageIcon size={13} color="#7BD3EA" />{r.comments}</span>
                      <button style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '6px', border: '1.5px solid #E5E0DA', background: 'white', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258', cursor: 'pointer' }}>Read More</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      case 'ratings': return (
        <div>
          <SectionHeader label="Rating Distribution" icon={<ChartIcon size={14} color="#FFD93D" />} />
          <div style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '14px', padding: '20px', marginBottom: '16px' }}>
            {ratingDist.map((pct, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '2px', width: '60px', flexShrink: 0 }}>
                  {[1,2,3,4,5].map(s => <StarFilledIcon key={s} size={10} color={s <= i + 1 ? '#FFD93D' : '#E5E0DA'} />)}
                </div>
                <div style={{ flex: 1, height: '10px', background: '#F5F0E8', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#FFD93D', borderRadius: '99px', transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258', width: '32px', textAlign: 'right' }}>{pct}%</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {Object.entries(stats).map(([type, data]) => (
              <div key={type} style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>{mediaIcons[type as MediaType]}</div>
                <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1rem', color: mediaColors[type as MediaType] }}>{data.count}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: '#6E6258', marginTop: '4px', textTransform: 'uppercase' }}>{type} logged</div>
              </div>
            ))}
          </div>
        </div>
      );

      case 'lists': return (
        <div className="space-y-4">
          {lists.map((l, i) => (
            <div key={i} style={{ background: '#FFF9F0', border: `1.5px solid ${l.pinned ? '#FFD93D44' : '#E5E0DA'}`, borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {l.pinned && <Tag label="pinned" color="#FFD93D" />}
                  <span style={{ fontFamily: "'Kalam', cursive", fontSize: '1.05rem', color: '#1F1A17', fontWeight: 700 }}>{l.title}</span>
                </div>
                <BookmarkIcon size={16} color={l.pinned ? '#FFD93D' : '#6E6258'} />
              </div>
              <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.88rem', color: '#6E6258', marginBottom: '10px' }}>{l.desc}</p>
              <div style={{ display: 'flex', gap: '14px' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258' }}>{l.items} items</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258' }}><HeartIcon size={11} color="#FF6B9D" />{l.likes}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258' }}><MessageIcon size={11} color="#7BD3EA" />{l.comments}</span>
              </div>
            </div>
          ))}
        </div>
      );

      case 'favorites': return (
        <div>
          {(['films', 'games', 'books', 'albums', 'artists'] as MediaType[]).map(type => (
            <div key={type}>
              <SectionHeader label={`Favorite ${type}`} icon={mediaIcons[type]} />
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {(favorites[type as keyof typeof favorites] || []).map((f: any) => (
                  <div key={f.title} style={{ background: f.color, borderRadius: '12px', padding: '16px', minWidth: '120px', border: '1.5px solid rgba(255,255,255,0.1)', boxShadow: '3px 3px 0 rgba(0,0,0,0.12)' }}>
                    <div style={{ marginBottom: '8px' }}>{mediaIcons[type]}</div>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'white', lineHeight: 1.4 }}>{f.title}</p>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{f.year}</p>
                    <div style={{ marginTop: '6px' }}><Stars rating={f.rating} size={9} /></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

      case 'diary': return (
        <div>
          <SectionHeader label="On This Day" icon={<CalendarIcon size={14} color="#7BD3EA" />} />
          <div style={{ background: 'rgba(123,211,234,0.08)', border: '1.5px solid #7BD3EA44', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <Tag label="March 15, 2025" color="#7BD3EA" />
            <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.95rem', color: '#1F1A17', marginTop: '8px' }}>Watched Mulholland Drive for the 3rd time. Still confused. Still floored.</p>
          </div>
          {recentActivity.slice(0, 5).map((a, i) => (
            <div key={i} style={{ borderLeft: '2px solid #E5E0DA', paddingLeft: '16px', marginBottom: '16px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B9D' }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258' }}>{a.time}</span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '3px', flexWrap: 'wrap' }}>
                {a.media && mediaIcons[a.media as MediaType]}
                <span style={{ fontFamily: "'Kalam', cursive", fontSize: '0.95rem', color: '#1F1A17' }}>{a.title}</span>
                {a.rating && <Stars rating={a.rating} size={10} />}
              </div>
              {a.note && <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.85rem', color: '#6E6258', marginTop: '2px' }}>{a.note}</p>}
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                {['weekend', 'late-night', 'comfort'].slice(0, i % 3 + 1).map(tag => <Tag key={tag} label={tag} color="#6E6258" />)}
              </div>
            </div>
          ))}
        </div>
      );

      case 'collection': return (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Owned', 'Finished', 'In Progress', 'Wishlist', 'Revisit'].map(s => (
                <button key={s} style={{ padding: '6px 14px', borderRadius: '99px', border: '1.5px solid #E5E0DA', background: s === 'All' ? '#1F1A17' : 'white', color: s === 'All' ? 'white' : '#6E6258', fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button style={{ padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #E5E0DA', background: 'white', cursor: 'pointer' }}><GridIcon size={14} color="#6E6258" /></button>
              <button style={{ padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #E5E0DA', background: 'white', cursor: 'pointer' }}><ListIcon size={14} color="#6E6258" /></button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
            {[...favorites.films, ...favorites.games].map((f, i) => (
              <div key={i} style={{ background: f.color, borderRadius: '10px', aspectRatio: '2/3', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px', border: '1.5px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                  <Tag label={i % 3 === 0 ? 'Owned' : i % 3 === 1 ? 'Finished' : 'In Progress'} color={i % 3 === 0 ? '#6BCB77' : i % 3 === 1 ? '#7BD3EA' : '#FFD93D'} />
                </div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: 'white', lineHeight: 1.3 }}>{f.title}</p>
              </div>
            ))}
          </div>
        </div>
      );

      case 'backlog': return (
        <div>
          <div style={{ background: 'rgba(255,107,157,0.06)', border: '1.5px solid rgba(255,107,157,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            <Tag label="RetroLog AI" color="#FF6B9D" />
            <p style={{ fontFamily: "'Kalam', cursive", fontSize: '1rem', color: '#1F1A17', marginTop: '8px' }}>Based on your taste profile, you should start with <strong>Outer Wilds</strong> next.</p>
          </div>
          <SectionHeader label="Priority Queue" icon={<ClockIcon size={14} color="#6E6258" />} />
          <div className="space-y-3">
            {[{ title: 'Outer Wilds', type: 'game', priority: 'high', time: '~20h' }, { title: 'Blood Meridian', type: 'book', priority: 'high', time: '~14h' }, { title: 'The Zone of Interest', type: 'film', priority: 'medium', time: '1h45m' }, { title: 'A Moon Shaped Pool', type: 'album', priority: 'low', time: '~1h' }].map((item, i) => (
              <div key={i} style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.priority === 'high' ? '#FF6B9D' : item.priority === 'medium' ? '#FFD93D' : '#6E6258', flexShrink: 0 }} />
                <span style={{ cursor: 'grab', color: '#6E6258' }}>::</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'Kalam', cursive", fontSize: '0.95rem', color: '#1F1A17' }}>{item.title}</span>
                </div>
                <Tag label={item.type} color={mediaColors[item.type as MediaType] || '#6E6258'} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      );

      case 'stats': return (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '16px' }}>
            {[{ label: 'Films Watched', value: '847', color: '#FF6B9D', icon: <FilmIcon size={14} color="#FF6B9D" /> }, { label: 'Games Beaten', value: '312', color: '#6BCB77', icon: <GamepadIcon size={14} color="#6BCB77" /> }, { label: 'Books Read', value: '198', color: '#7BD3EA', icon: <BookIcon size={14} color="#7BD3EA" /> }, { label: 'Albums Rated', value: '534', color: '#FFD93D', icon: <VinylIcon size={14} color="#FFD93D" /> }].map(s => (
              <div key={s.label} style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>{s.icon}<span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: '#6E6258', textTransform: 'uppercase' }}>{s.label}</span></div>
                <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1.1rem', color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
          <SectionHeader label="Hours Consumed" icon={<ClockIcon size={14} color="#6E6258" />} />
          <div style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '14px', padding: '20px' }}>
            {[{ label: 'Film', hours: 1694, color: '#FF6B9D' }, { label: 'Gaming', hours: 2840, color: '#6BCB77' }, { label: 'Music', hours: 890, color: '#FFD93D' }].map(h => (
              <div key={h.label} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}>{h.label}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: h.color, fontWeight: 700 }}>{h.hours}h</span>
                </div>
                <div style={{ height: '8px', background: '#F5F0E8', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(h.hours / 2840) * 100}%`, background: h.color, borderRadius: '99px' }} />
                </div>
              </div>
            ))}
          </div>
          <SectionHeader label="Activity Heatmap" icon={<CalendarIcon size={14} color="#6E6258" />} />
          <div style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '14px', padding: '20px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {Array.from({ length: 52 }).map((_, w) => (
                <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {Array.from({ length: 7 }).map((_, d) => {
                    const intensity = Math.random();
                    return <div key={d} title={`Week ${w+1}, Day ${d+1}`} style={{ width: 10, height: 10, borderRadius: '2px', background: intensity > 0.7 ? '#FF6B9D' : intensity > 0.4 ? 'rgba(255,107,157,0.4)' : intensity > 0.1 ? 'rgba(255,107,157,0.15)' : '#F5F0E8' }} />;
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      case 'social': return (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {[{ label: 'Following', value: mockUser.following }, { label: 'Followers', value: mockUser.followers }, { label: 'Mutuals', value: 148 }].map(s => (
              <div key={s.label} style={{ background: '#FFF9F0', border: '1.5px solid #E5E0DA', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.9rem', color: '#FF6B9D' }}>{s.value}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <SectionHeader label="Favorite Reviewers" icon={<PersonIcon size={14} color="#FF6B9D" />} />
          {['@pauline_kael_fan', '@cinema_ghost', '@ludo_historian', '@bookstack_anna'].map((u, i) => (
            <div key={u} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #E5E0DA' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${['#FF6B9D','#6BCB77','#7BD3EA','#FFD93D'][i]}, ${['#FFD93D','#7BD3EA','#FF6B9D','#6BCB77'][i]})`, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#1F1A17', flex: 1 }}>{u}</span>
              <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1.5px solid #FF6B9D', background: 'white', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#FF6B9D', cursor: 'pointer' }}>Follow</button>
            </div>
          ))}
        </div>
      );

      case 'about': return (
        <div>
          <SectionHeader label="Extended Bio" icon={<PersonIcon size={14} color="#FF6B9D" />} />
          <p style={{ fontFamily: "'Kalam', cursive", fontSize: '1rem', color: '#1F1A17', lineHeight: 1.8, marginBottom: '16px' }}>
            I have been obsessively cataloguing my media diet since 2019. What started as a Letterboxd account evolved into a full-blown habit spanning every medium. I believe that what we consume is a mirror of who we are — and I want that mirror to be well-kept.<br /><br />
            Currently based in Fortaleza, CE. Software engineering student. I teach English and programming by day and argue about film and games by night.
          </p>
          <SectionHeader label="Tastes and Influences" icon={<SparkleIcon size={14} color="#FFD93D" />} />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {['Wim Wenders', 'Andrei Tarkovsky', 'Haruki Murakami', 'Fromsoft', 'Radiohead', 'Cormac McCarthy', 'Kubrick', 'Frank Ocean'].map(n => (
              <Tag key={n} label={n} color="#FF6B9D" />
            ))}
          </div>
          <SectionHeader label="Favorite Genres" icon={<ListIcon size={14} color="#6BCB77" />} />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {['Slow Cinema', 'Arthouse', 'Metroidvania', 'Literary Fiction', 'Ambient', 'Noir', 'Existential RPG', 'Post-Rock'].map(g => (
              <Tag key={g} label={g} color="#6BCB77" />
            ))}
          </div>
          <SectionHeader label="Account Milestones" icon={<ShieldIcon size={14} color="#FFD93D" />} />
          {[{ label: 'First log', date: 'March 12, 2024', desc: 'Logged Perfect Blue' }, { label: '100th film', date: 'May 3, 2024', desc: 'Blade Runner 2049' }, { label: '500th log', date: 'Sept 18, 2024', desc: 'Across all media' }, { label: 'First review', date: 'March 20, 2024', desc: 'Disco Elysium — 5 stars' }].map(m => (
            <div key={m.label} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid #E5E0DA' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD93D', flexShrink: 0, marginTop: '5px' }} />
              <div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#1F1A17', fontWeight: 700 }}>{m.label}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#6E6258', marginLeft: '8px' }}>{m.date}</span>
                <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.85rem', color: '#6E6258', marginTop: '2px' }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );

      default: return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Kalam:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
        body { background: #FFFDF8; }
        .tab-scroll::-webkit-scrollbar { height: 0; }
      `}</style>

      {editOpen && <EditProfileModal onClose={() => setEditOpen(false)} />}

      <div style={{ maxWidth: '860px', margin: '0 auto', fontFamily: "'Kalam', cursive" }}>

        {/* Cover / Banner */}
        <div style={{ height: '200px', background: 'linear-gradient(135deg, #171717 0%, #2a1a2a 40%, #1a2a1a 100%)', position: 'relative', overflow: 'hidden', borderBottom: '1.5px solid #E5E0DA' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '8px' }}>
            <button onClick={() => setEditOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
              <EditIcon size={12} color="white" />Edit Profile
            </button>
          </div>
        </div>

        {/* Profile header */}
        <div style={{ padding: '0 24px 24px', background: '#FFFDF8', borderBottom: '1.5px solid #E5E0DA' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', marginTop: '-36px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B9D, #FFD93D)', border: '4px solid #FFFDF8', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />

            {/* Name + badges */}
            <div style={{ flex: 1, minWidth: 0, paddingTop: '40px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.9rem', color: '#1F1A17' }}>{mockUser.displayName}</h1>
                {mockUser.verified && <ShieldIcon size={14} color="#7BD3EA" />}
                {mockUser.supporter && <Tag label="Supporter" color="#FFD93D" />}
                <Tag label={mockUser.theme} color="#6E6258" />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#6E6258', marginTop: '3px' }}>@{mockUser.username} · {mockUser.pronouns}</p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setFollowing(!following)}
                style={{ padding: '8px 18px', borderRadius: '8px', border: '2px solid #1F1A17', background: following ? '#F5F0E8' : '#FF6B9D', color: following ? '#1F1A17' : 'white', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', boxShadow: '3px 3px 0 rgba(0,0,0,0.12)', transition: 'all 0.15s' }}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <button style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #E5E0DA', background: 'white', cursor: 'pointer' }}><MessageIcon size={14} color="#6E6258" /></button>
              <button style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #E5E0DA', background: 'white', cursor: 'pointer' }}><ShareIcon size={14} color="#6E6258" /></button>
            </div>
          </div>

          {/* Bio, location, website */}
          <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.95rem', color: '#1F1A17', lineHeight: 1.7, marginBottom: '10px', maxWidth: '600px' }}>{mockUser.bio}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <span style={{ display: 'flex', gap: '5px', alignItems: 'center', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}><LocationIcon size={13} color="#6E6258" />{mockUser.location}</span>
            <span style={{ display: 'flex', gap: '5px', alignItems: 'center', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#FF6B9D' }}><LinkIcon size={13} color="#FF6B9D" />{mockUser.website}</span>
            <span style={{ display: 'flex', gap: '5px', alignItems: 'center', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#6E6258' }}><CalendarIcon size={13} color="#6E6258" />Since {mockUser.memberSince}</span>
          </div>
          <p style={{ fontFamily: "'Kalam', cursive", fontSize: '0.85rem', color: '#6E6258', fontStyle: 'italic', borderLeft: '3px solid #E5E0DA', paddingLeft: '12px', marginBottom: '14px' }}>{mockUser.quote}</p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {[{ label: 'Logs', value: mockUser.totalLogs }, { label: 'Reviews', value: mockUser.totalReviews }, { label: 'Lists', value: mockUser.totalLists }, { label: 'Likes', value: mockUser.totalLikes.toLocaleString() }, { label: 'Following', value: mockUser.following }, { label: 'Followers', value: mockUser.followers.toLocaleString() }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.75rem', color: '#1F1A17' }}>{s.value}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: '#6E6258', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Profile completion */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#6E6258' }}>Profile {mockUser.completionPct}% complete</span>
            <div style={{ flex: 1, maxWidth: '160px', height: '5px', background: '#F5F0E8', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${mockUser.completionPct}%`, background: '#6BCB77', borderRadius: '99px' }} />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-scroll" style={{ overflowX: 'auto', borderBottom: '1.5px solid #E5E0DA', background: '#FFFDF8', position: 'sticky', top: 0, zIndex: 20 }}>
          <div style={{ display: 'flex', padding: '0 16px', minWidth: 'max-content' }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '14px 16px',
                  borderBottom: `2px solid ${activeTab === t.id ? '#FF6B9D' : 'transparent'}`,
                  background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === t.id ? '#FF6B9D' : 'transparent'}`,
                  fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
                  color: activeTab === t.id ? '#FF6B9D' : '#6E6258',
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.15s',
                }}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '24px', background: '#FFFDF8', minHeight: '600px' }}>
          {renderTab()}
        </div>
      </div>
    </>
  );
}
