'use client'

import { useEffect, useState } from 'react'
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
      website: data.get('website') as string, // honeypot
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
              Professional Websites that support mission work around the world.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#1d1d1f]/75 sm:text-lg">
              American-standard development at unbeatable prices.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-[#0071e3] hover:bg-[#f5f5f7] hover:text-[#0071e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
              >
                Build Now
              </Link>
              <a
                href="#value"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#0071e3] transition hover:bg-[#0071e3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
              >
                What You Get
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
              Built premium.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#e8eef7]/65 sm:text-lg">
              American quality websites with unbeatable prices. Direct
              impact to mission work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {[
              {
                title: 'Built for Christians, by Christians',
                desc: 'We believe our work is a way to glorify God and serve others. We\'d love to help your ministry achieve its tech goals.',
              },
              {
                title: '$499 flat rate build — or overhaul',
                desc: 'South Asia costs of living mean American-standard development at a price your budget can handle — no surprises.',
              },
              {
                title: '$50 / month — your personal IT support',
                desc: 'Event coming up? Need a page updated or a new feature? Just message me. Unlimited updates and maintenance for $50/month.',
              },
              {
                title: 'Direct mission impact',
                desc: "Your project funds our ministry work in South Asia. You're not just getting a great website — you're investing in something that has an eternal impact.",
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

      {/* Business callout — still inside dark block */}
      <section aria-label="Also serving businesses" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="rounded-3xl p-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" style={{ background: 'rgba(10,25,60,0.55)', border: '1px solid rgba(100,150,255,0.12)', backdropFilter: 'blur(16px)' }}>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#4d8cff] mb-1">Not a church?</p>
            <h3 className="text-sm font-semibold tracking-tight text-white">We also build for small businesses.</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#e8eef7]/60">
              Same quality, same pricing. If you&apos;re a small business owner who appreciates what we&apos;re about, we&apos;d love to work with you.
            </p>
          </div>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="mt-4 sm:mt-0 sm:ml-8 shrink-0 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#0071e3] px-5 py-2.5 text-sm font-semibold text-[#0071e3] transition hover:bg-[#0071e3] hover:text-white"
          >
            Get in touch
          </button>
        </div>
      </section>
      </div>

      {/* Pricing */}
      <section aria-label="Pricing" className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, honest pricing.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/65">
            One flat rate to build it right. One low monthly rate to keep it that way.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-7 flex flex-col">
            <p className="text-xs font-medium uppercase tracking-widest text-[#0071e3]/80 mb-3">One-time</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-semibold tracking-tight">$499</span>
            </div>
            <p className="text-sm font-medium mb-4">Website Build</p>
            <ul className="grid gap-2 mb-6 flex-1">
              {[
                'Custom-designed',
                'Fast performance, built from scratch',
                'Fully handed off — you own it',
                'Direct personal communication throughout',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#1d1d1f]/60">
                  <span className="mt-0.5 shrink-0 text-[#0071e3] font-medium">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="w-full cursor-pointer rounded-full bg-[#0071e3] py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              Get started — $499
            </button>
          </div>

          <div className="glass rounded-3xl p-7 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] font-medium text-[#1d1d1f]/60">
              First month free
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#0071e3]/80 mb-3">Monthly</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-semibold tracking-tight">$50</span>
              <span className="text-sm text-[#1d1d1f]/55 mb-1">/month</span>
            </div>
            <p className="text-sm font-medium mb-4">Hosting &amp; Maintenance</p>
            <ul className="grid gap-2 mb-6 flex-1">
              {[
                'Unlimited updates — just message me',
                'Events, new pages, copy changes',
                'Your personal website IT support',
                'Cancel any time',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#1d1d1f]/60">
                  <span className="mt-0.5 shrink-0 text-[#0071e3] font-medium">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="w-full cursor-pointer rounded-full border border-[#0071e3] py-3 text-center text-sm font-semibold text-[#0071e3] transition hover:bg-[#0071e3] hover:text-white"
            >
              Start free — then $50/mo
            </button>
          </div>
        </div>
      </section>

      <section id="contact" aria-label="Contact">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s build your site.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/70 sm:text-lg">
              Drop your details below and I&apos;ll be in touch.
            </p>
          </div>

          <div className="glass mx-auto mt-10 max-w-2xl rounded-3xl p-6" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
            {submitted ? (
              <div className="py-6 text-center">
                <p className="text-sm font-semibold tracking-tight">Message sent!</p>
                <p className="mt-2 text-sm text-[#1d1d1f]/70">
                  Thanks—I&apos;ll reply as soon as I can.
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

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#1d1d1f]/55">I&apos;ll reply as soon as possible.</p>
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
