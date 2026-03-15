import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const defaultProps: IconProps = {
  size: 20,
  color: 'currentColor',
  strokeWidth: 1.8,
};

export const FilmIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="3" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M7 3v18" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M17 3v18" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M2 8h5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M2 12h20" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M2 16h5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M17 8h5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M17 16h5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const GamepadIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 11h4M8 9v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="15" cy="10" r="1" fill={color}/>
    <circle cx="17" cy="12" r="1" fill={color}/>
    <path d="M4 8h16l-1.5 7a3 3 0 01-3 2.5H8.5a3 3 0 01-3-2.5L4 8z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    <path d="M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const BookIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M8 7h8M8 11h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const VinylIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <path d="M15 6.5a7 7 0 014 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const PersonIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const StarIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
);

export const StarFilledIcon = ({ size = 20, color = 'currentColor', className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
  </svg>
);

export const HeartIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
);

export const EyeIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const MessageIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
);

export const BookmarkIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
);

export const ClockIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M12 6v6l4 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CalendarIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M3 10h18" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M8 2v4M16 2v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const ChartIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 3v18h18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M7 16l4-5 4 2 4-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ListIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const SettingsIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const ShareIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="18" cy="5" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="6" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const LinkIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const EditIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
);

export const UploadIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M17 8l-5-5-5 5M12 3v12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LockIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill={color}/>
  </svg>
);

export const BellIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const GlobeIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M2 12h20" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const SearchIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M21 21l-4.4-4.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const LocationIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const CheckIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const XIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const PlusIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 5v14M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const ChevronDownIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LogOutIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ShieldIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
);

export const TrendingIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M23 6l-9.5 9.5-5-5L1 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6h6v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const GridIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const SparkleIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    <path d="M19 3l.6 1.4L21 5l-1.4.6L19 7l-.6-1.4L17 5l1.4-.6L19 3z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
);
