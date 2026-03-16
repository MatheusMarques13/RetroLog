import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/onboarding'
  const errorParam = searchParams.get('error')

  // If Supabase returned an error, redirect to auth with the error
  if (errorParam) {
    return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(errorParam)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Use forwarded host for Vercel/proxy deployments
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocal = process.env.NODE_ENV === 'development'
      if (!isLocal && forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // No code param — the implicit flow sends tokens as hash fragments
  // which aren't visible to the server. Redirect to onboarding and let
  // the client-side AuthListener handle the session.
  return NextResponse.redirect(`${origin}/onboarding`)
}
