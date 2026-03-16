'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthListener() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()

    const redirect = (onboardingComplete: boolean) => {
      if (!onboardingComplete && !pathname.startsWith('/onboarding')) {
        router.replace('/onboarding')
      } else if (onboardingComplete && (pathname === '/auth' || pathname.startsWith('/auth/'))) {
        router.replace('/')
      }
    }

    // 1. Check if user already has a session (e.g. page refresh, redirect without hash)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        redirect(session.user.user_metadata?.onboarding_complete === true)
      }
    })

    // 2. Listen for auth state changes — catches OAuth hash fragments,
    //    magic link tokens, and any other sign-in events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
          redirect(session.user.user_metadata?.onboarding_complete === true)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, pathname])

  return null
}
