'use client'

import { useState } from 'react'

const TOPICS = ['Website / App', 'More info on South Asia', 'Other']

type FieldErrors = {
  name?: string[]
  email?: string[]
  message?: string[]
}

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [topic, setTopic]         = useState(TOPICS[0])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [errors, setErrors]         = useState<FieldErrors>({})
  const [serverError, setServerError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setErrors({})
    setServerError('')

    const data = new FormData(e.currentTarget)
    const body = {
      website: data.get('website') as string, // honeypot
      name:    data.get('name') as string,
      email:   data.get('email') as string,
      message: data.get('message') as string,
      topic,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setSubmitted(true)
      } else if (res.status === 400) {
        const json = await res.json()
        setErrors(json.errors ?? {})
      } else {
        const json = await res.json()
        setServerError(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4"
      style={{ background: 'rgba(0,0,0,0.50)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="flex w-full max-w-md flex-col rounded-2xl"
        style={{
          maxHeight: '90dvh',
          background: '#1a1f2e',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.40)',
        }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4">
          <h2 className="text-sm font-semibold tracking-tight text-white">Get in touch</h2>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white/70"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-6 py-5">
          {submitted ? (
            <div className="rounded-xl border border-[#0071e3]/30 bg-[#0071e3]/15 p-5 text-center">
              <p className="text-sm font-semibold text-white">Message sent!</p>
              <p className="mt-1 text-sm text-white/55">I&apos;ll be in touch as soon as I can.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4" style={{ maxWidth: '100%' }}>
              {/* Honeypot — hidden from humans, bots fill it */}
              <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} />

              <div className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Topic</span>
                <div className="flex flex-col gap-1.5">
                  {TOPICS.map((t) => (
                    <label key={t} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                      topic === t
                        ? 'border-[#0071e3]/50 bg-[#0071e3]/20 text-white'
                        : 'border-white/8 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'
                    }`}>
                      <input type="radio" name="topic_select" value={t} checked={topic === t}
                        onChange={() => setTopic(t)} className="sr-only" />
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${topic === t ? 'bg-[#0071e3]' : 'bg-white/20'}`} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Name</span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={100}
                  className="h-11 rounded-xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12"
                  style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
                />
                {errors.name && (
                  <span className="text-xs text-red-400">{errors.name[0]}</span>
                )}
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={255}
                  className="h-11 rounded-xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12"
                  style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
                />
                {errors.email && (
                  <span className="text-xs text-red-400">{errors.email[0]}</span>
                )}
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Message</span>
                <textarea
                  required
                  name="message"
                  rows={3}
                  placeholder="Tell us a bit more…"
                  maxLength={2000}
                  className="resize-none rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12"
                  style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
                />
                {errors.message && (
                  <span className="text-xs text-red-400">{errors.message[0]}</span>
                )}
              </label>

              {serverError && (
                <p className="text-xs text-red-400">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="h-11 rounded-xl bg-[#0071e3] text-sm font-semibold text-white transition hover:bg-[#0071e3]/90 disabled:opacity-50"
              >
                {submitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
