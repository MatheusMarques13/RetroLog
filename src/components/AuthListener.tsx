'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/**
 * Global auth state listener.
 * Detects OAuth/magic-link sign-in (including hash-fragment tokens)
 * on any page and redirects the user accordingly.
 */
export default function AuthListener() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()

    // Listen for auth state changes (catches OAuth hash fragments, magic links, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const onboardingComplete =
            session.user.user_metadata?.onboarding_complete === true

          // Don't redirect if already on the right page
          if (!onboardingComplete && !pathname.startsWith('/onboarding')) {
            router.push('/onboarding')
          } else if (onboardingComplete && pathname === '/auth') {
            router.push('/')
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, pathname])

  // Render nothing — this is a side-effect-only component
  return null
}
