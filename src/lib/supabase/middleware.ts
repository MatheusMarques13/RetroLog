import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  // Skip Supabase auth if credentials are not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // Authenticated user on landing or auth page → redirect to profile or setup
  if (user && (pathname === '/' || pathname === '/auth')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    if (profile) {
      url.pathname = `/profile/${profile.username}`
    } else {
      url.pathname = '/profile/setup'
    }
    return NextResponse.redirect(url)
  }

  // Unauthenticated user on protected routes → redirect to auth
  if (!user && (pathname.startsWith('/profile/setup') || pathname.startsWith('/profile/'))) {
    // Allow public profile viewing for /profile/[username] but protect /profile/setup
    if (pathname.startsWith('/profile/setup')) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
