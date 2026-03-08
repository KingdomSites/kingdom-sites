'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (data.session && !error) {
          router.replace('/dashboard')
        } else {
          router.replace('/login?error=auth')
        }
      })
    } else {
      // Fallback for hash-based (implicit) flow
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) router.replace('/dashboard')
        else router.replace('/login')
      })
    }
  }, [router])

  return (
    <div className="flex min-h-[calc(100dvh-120px)] items-center justify-center text-sm text-[#1d1d1f]/50">
      Signing you in…
    </div>
  )
}
