'use client'

import { useState } from 'react'
import Image from 'next/image'
import heroImage from '../../public/Photos/hero.jpeg'

type FieldErrors = {
  name?: string[]
  email?: string[]
  message?: string[]
}

const SERVICES = [
  {
    eyebrow: 'Websites',
    title: 'Fast. Beautiful. Built to convert.',
    desc: 'Landing pages, marketing sites, and full multi-page builds — designed to load instantly and turn visitors into customers.',
  },
  {
    eyebrow: 'Mobile Apps',
    title: 'iOS and Android. Done right.',
    desc: 'Native-quality mobile apps for your customers or your team — from idea to the App Store.',
  },
  {
    eyebrow: 'Platforms & Dashboards',
    title: 'Your operations, organized.',
    desc: 'Customer portals, admin dashboards, and internal tools that make running your business easier.',
  },
  {
    eyebrow: 'APIs & Backends',
    title: 'The engine behind it all.',
    desc: 'Reliable backend systems, integrations, and APIs that scale with you.',
  },
]

const VALUES = [
  {
    title: 'Built with purpose',
    desc: 'We care about the work we do and the people we serve. Every project gets our full attention and best effort.',
  },
  {
    title: 'Quoted to your project',
    desc: 'No templates or fixed packages. Every engagement is scoped and quoted individually — from a simple site to a full custom platform.',
  },
  {
    title: 'Competitive pricing',
    desc: "We're not the cheapest, and we don't try to be. We deliver serious quality at a competitive rate — and you always know the price up front.",
  },
  {
    title: 'A partner, not a vendor',
    desc: "We stick around after launch — updates, new features, ongoing support. Your success is our success.",
  },
]

const QUOTE_ITEMS = [
  'Websites and landing pages',
  'Mobile apps for iOS and Android',
  'Custom web applications',
  'Portals and admin dashboards',
  'APIs and backend systems',
  'Ongoing retainer and support',
  'White label development',
  'Redesigns and rebuilds',
]

function openContact() {
  document.dispatchEvent(new CustomEvent('open-contact-modal'))
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

  const inputClass = 'input-glass h-12 rounded-xl px-4 text-sm'

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-24">
        <p className="text-sm font-semibold text-[#86868b]">Kingdom Sites</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-[#f5f5f7] sm:text-6xl lg:text-7xl">
          Custom software.
          <br />
          <span className="text-gradient">Built around you.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#86868b] sm:text-lg">
          Websites, mobile apps, and platforms for any project — competitively priced, every engagement individually quoted.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={openContact}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
          >
            Get a Quote
          </button>
          <a href="#services" className="link-apple text-sm">
            See what we build <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div
            className="absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
            style={{ background: 'linear-gradient(108deg, rgba(8,148,255,0.25), rgba(201,89,221,0.18), rgba(255,46,84,0.14))' }}
          />
          <div className="tile-elevated">
            <Image
              src={heroImage}
              alt="Custom software, designed and built by Kingdom Sites"
              quality={75}
              placeholder="blur"
              className="w-full object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-label="What we build" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
            What we build.
            <br />
            <span className="text-[#86868b]">Whatever your project needs.</span>
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {SERVICES.map((s) => (
              <div key={s.eyebrow} className="tile flex flex-col p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#86868b]">{s.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#f5f5f7] sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#86868b] sm:text-base">{s.desc}</p>
                <button onClick={openContact} className="link-apple mt-5 cursor-pointer self-start text-sm">
                  Get a quote <span aria-hidden="true">›</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-label="Value proposition" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
              Not cookie-cutter. <span className="text-gradient-blue">Crafted.</span>
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#86868b] sm:text-lg">
              Every project is scoped, quoted, and built around your specific goals.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {VALUES.map((item) => (
              <div key={item.title} className="tile p-6">
                <h3 className="text-sm font-semibold tracking-tight text-[#f5f5f7]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#86868b]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section aria-label="Pricing" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
              Competitive pricing.
              <br />
              <span className="text-[#86868b]">Every project quoted.</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-[#86868b]">
              No fixed packages and no inflated agency rates. Tell us what you need — we scope it and put together a competitive quote based on exactly what you&apos;re building.
            </p>
          </div>

          <div className="tile-elevated mx-auto flex max-w-3xl flex-col items-center gap-8 p-8 text-center sm:p-12">
            <ul className="grid w-full max-w-xl gap-3 text-left sm:grid-cols-2">
              {QUOTE_ITEMS.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#86868b]">
                  <span className="mt-0.5 shrink-0 font-medium text-[#2997ff]">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={openContact}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-label="Contact" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
              {"Let's talk about your project."}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#86868b] sm:text-lg">
              {"Tell me what you're building and I'll put together a quote."}
            </p>
          </div>

          <div className="tile mx-auto mt-10 max-w-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-6 text-center">
                <p className="text-sm font-semibold tracking-tight text-[#f5f5f7]">Message sent!</p>
                <p className="mt-2 text-sm text-[#86868b]">
                  {"Thanks—I'll reply as soon as I can."}
                </p>
                <button onClick={() => setSubmitted(false)} className="link-apple mt-3 cursor-pointer text-xs">
                  Send another
                </button>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={handleSubmit}>
                {/* Honeypot — hidden from humans, bots fill it */}
                <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium text-[#f5f5f7]/80">Name</span>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your name"
                      maxLength={100}
                      className={inputClass}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-400">{errors.name[0]}</span>
                    )}
                  </label>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium text-[#f5f5f7]/80">Email</span>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      maxLength={255}
                      className={inputClass}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-400">{errors.email[0]}</span>
                    )}
                  </label>
                </div>

                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-[#f5f5f7]/80">What do you need built?</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="A website, a mobile app, a customer portal…"
                    maxLength={2000}
                    className="input-glass resize-none rounded-xl px-4 py-3 text-sm"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400">{errors.message[0]}</span>
                  )}
                </label>

                {serverError && (
                  <p className="text-xs text-red-400">{serverError}</p>
                )}

                <div className="mt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:opacity-60"
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
