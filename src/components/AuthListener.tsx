'use client'

import { useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthListener() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const exchangingRef = useRef(false)

  useEffect(() => {
    const supabase = createClient()

    const redirect = (onboardingComplete: boolean) => {
      if (!onboardingComplete && !pathname.startsWith('/onboarding')) {
        router.replace('/onboarding')
      } else if (onboardingComplete && (pathname === '/auth' || pathname.startsWith('/auth/'))) {
        router.replace('/')
      }
    }

    // 1. Handle PKCE code exchange — Supabase sends ?code=xxx after OAuth
    const code = searchParams.get('code')
    if (code && !exchangingRef.current) {
      exchangingRef.current = true
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        exchangingRef.current = false
        if (!error && data.session) {
          // Clean the code from the URL
          const url = new URL(window.location.href)
          url.searchParams.delete('code')
          window.history.replaceState({}, '', url.toString())
          redirect(data.session.user.user_metadata?.onboarding_complete === true)
        }
      })
      return // Don't run other checks while exchanging
    }

    // 2. Check existing session (page refresh, already authenticated)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        redirect(session.user.user_metadata?.onboarding_complete === true)
      }
    })

    // 3. Listen for auth state changes (hash fragments, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
          redirect(session.user.user_metadata?.onboarding_complete === true)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, pathname, searchParams])

  return null
}
