'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(56px) saturate(200%)',
  WebkitBackdropFilter: 'blur(56px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.22)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 0.5px 0 rgba(255,255,255,0.70)',
}

export default function Login() {
  const [email, setEmail]     = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/dashboard')
    })
    inputRef.current?.focus()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) { setError('Auth not configured.'); return }
    setError('')
    setSending(true)
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/auth/callback' },
    })
    setSending(false)
    if (err) setError(err.message)
    else setSent(true)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-120px)] max-w-md items-center px-4 py-20 sm:px-6">
      <div className="w-full">
        <div className="rounded-3xl p-8" style={CARD_STYLE}>
          <div className="mb-6 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-[#1d1d1f]/75 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
              Client portal
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Let&apos;s Build Your Site</h1>
            <p className="mt-2 text-sm text-[#1d1d1f]/60">I&apos;m ready to build your site — drop in your email below to get started.</p>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-[#0071e3]/20 bg-[#0071e3]/8 p-5 text-center">
              <p className="text-sm font-semibold">Check your inbox</p>
              <p className="mt-1 text-sm text-[#1d1d1f]/60">
                A sign-in link was sent to <span className="font-medium">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-3">
              <label className="grid gap-1 text-sm">
                <span className="font-medium text-[#1d1d1f]/75">Email</span>
                <input
                  ref={inputRef}
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 rounded-2xl border border-white/30 bg-white/20 px-4 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                />
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="h-11 rounded-full bg-[#0071e3] text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Sending link…' : 'Send magic link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
