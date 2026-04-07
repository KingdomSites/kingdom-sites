'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import heroImage from '../../public/Photos/hero.jpeg'

type FieldErrors = {
  name?: string[]
  email?: string[]
  message?: string[]
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setErrors({})
    setServerError('')

    const data = new FormData(e.currentTarget)
    const body = {
      website: data.get('website')?.toString() || '', // honeypot
      name:    data.get('name') as string,
      email:   data.get('email') as string,
      message: data.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setSubmitted(true)
        ;(e.target as HTMLFormElement).reset()
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
    <div className="overflow-x-hidden w-full">
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Custom software solutions scoped and quoted to your needs.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#1d1d1f]/75 sm:text-lg">
              Websites, apps, platforms and more — every engagement is quoted individually based on what you actually need.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-[#0071e3] hover:bg-[#f5f5f7] hover:text-[#0071e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
              >
                Get a Quote
              </a>
              <a
                href="#value"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#0071e3] transition hover:bg-[#0071e3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
              >
                What We Build
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#0071e3]/10 blur-2xl" />
              <div className="glass overflow-hidden rounded-3xl">
                <Image
                  src={heroImage}
                  alt="Photo"
                  quality={75}
                  placeholder="blur"
                  className="w-full object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/25 px-5 py-2.5 text-sm font-medium text-[#1d1d1f]/80 backdrop-blur-sm transition hover:bg-white/40"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        data-dark-section
        className="dark"
        style={{
          background:
            'radial-gradient(ellipse 130% 80% at 5% 0%, rgba(0,80,200,0.22) 0%, transparent 55%),' +
            'radial-gradient(ellipse 90% 70% at 98% 5%, rgba(30,80,180,0.14) 0%, transparent 55%),' +
            '#0b1a32',
          color: '#e8eef7',
        }}
      >
      <section id="value" aria-label="Value proposition">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="built-premium"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl shine-once"
            >
              We build software solutions, not cookie-cutter sites.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#e8eef7]/65 sm:text-lg">
              Every project is scoped, quoted, and built around your specific goals.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {[
              {
                title: 'Built with purpose',
                desc: 'We care about the work we do and the people we serve. Every project gets our full attention and best effort.',
              },
              {
                title: 'Quoted to your project',
                desc: 'No templates or fixed packages. Every engagement is scoped and quoted individually — from a simple site to a full custom platform.',
              },
              {
                title: 'Ongoing partnership',
                desc: 'Need updates, new features, or ongoing support? We stick around after launch. This is a relationship, not a transaction.',
              },
              {
                title: 'Long-term partnership',
                desc: "We're not just building and disappearing. Your success is our success — we stay invested in your project long after launch.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl p-6" style={{ background: 'rgba(10,25,60,0.55)', border: '1px solid rgba(100,150,255,0.12)', backdropFilter: 'blur(16px)' }}>
                <h3 className="text-sm font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#e8eef7]/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>

      {/* Pricing */}
      <section aria-label="Pricing" className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Every project quoted individually.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/65">
            No fixed packages. Tell me what you need and I will scope it out and put together a custom quote.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <ul className="grid gap-3 sm:grid-cols-2 text-left w-full max-w-xl">
            {[
              'Websites and landing pages',
              'Custom web and mobile applications',
              'Login portals and admin dashboards',
              'APIs and backend systems',
              'Ongoing retainer and support',
              'White label development',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-[#1d1d1f]/65">
                <span className="mt-0.5 shrink-0 text-[#0071e3] font-medium">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
          >
            Request a Quote
          </button>
        </div>
      </section>

      <section id="contact" aria-label="Contact">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {"Let's talk about your project."}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/70 sm:text-lg">
              {"Tell me what you're building and I'll put together a quote."}
            </p>
          </div>

          <div className="glass mx-auto mt-10 max-w-2xl rounded-3xl p-6" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
            {submitted ? (
              <div className="py-6 text-center">
                <p className="text-sm font-semibold tracking-tight">Message sent!</p>
                <p className="mt-2 text-sm text-[#1d1d1f]/70">
                  {"Thanks—I'll reply as soon as I can."}
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-3 text-xs text-[#0071e3]">Send another</button>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
                {/* Honeypot — hidden from humans, bots fill it */}
                <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} />

                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="grid gap-1 text-sm">
                    <span className="font-medium text-[#1d1d1f]/80">Name</span>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your name"
                      maxLength={100}
                      className="h-11 rounded-2xl border border-white/30 bg-white/20 px-4 text-sm backdrop-blur outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                      style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500">{errors.name[0]}</span>
                    )}
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-medium text-[#1d1d1f]/80">Email</span>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      maxLength={255}
                      className="h-11 rounded-2xl border border-white/30 bg-white/20 px-4 text-sm backdrop-blur outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                      style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500">{errors.email[0]}</span>
                    )}
                  </label>
                </div>

                <label className="grid gap-1 text-sm">
                  <span className="font-medium text-[#1d1d1f]/80">What do you need built?</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="One-page landing, multi-page site, redesign, etc."
                    maxLength={2000}
                    className="resize-none rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-sm backdrop-blur outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                    style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500">{errors.message[0]}</span>
                  )}
                </label>

                {serverError && (
                  <p className="text-xs text-red-500">{serverError}</p>
                )}

                <div className="mt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-[#0071e3] hover:bg-[#f5f5f7] hover:text-[#0071e3] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
