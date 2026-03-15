import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'your-supabase-project.supabase.co'],
  },
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
