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
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Auth error — redirect back to auth page with error
  return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`)
}
