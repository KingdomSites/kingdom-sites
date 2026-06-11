'use client'

import { useState } from 'react'
import Link from 'next/link'

type FieldErrors = {
  name?: string[]
  email?: string[]
  message?: string[]
}

const STACK = ['Next.js', 'React', 'TypeScript', 'React Native', 'Node.js', 'Supabase', 'PostgreSQL', 'AWS', 'Vercel']

const SERVICES = [
  {
    eyebrow: 'Websites',
    title: 'Fast, beautiful, built to convert.',
    desc: 'Landing pages, marketing sites, and full multi-page builds that load instantly and turn visitors into customers.',
  },
  {
    eyebrow: 'Mobile Apps',
    title: 'iOS and Android, done right.',
    desc: 'Mobile apps for your customers or your team — from first idea to the App Store.',
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

const PROCESS = [
  {
    step: '01',
    title: 'Tell me about your project',
    desc: 'A short message is enough. We hop on a call or keep it async — whatever works for you.',
  },
  {
    step: '02',
    title: 'Get a scoped quote',
    desc: 'I scope the work and send you a clear, competitive quote. Free, no obligation, no inflated agency rates.',
  },
  {
    step: '03',
    title: 'I design and build',
    desc: 'One developer, end to end — no handoffs, no telephone game. You get regular updates and working previews.',
  },
  {
    step: '04',
    title: 'Launch and beyond',
    desc: 'I stick around after launch: updates, new features, support. A partner, not a one-off transaction.',
  },
]

const WHY = [
  {
    title: 'One developer, end to end',
    desc: 'You talk directly to the person building your software. Decisions are fast, context never gets lost, and quality stays consistent from design to deployment.',
  },
  {
    title: 'Competitive quotes, no packages',
    desc: "I'm not the cheapest, and I don't try to be. Every project is scoped individually and priced competitively — you pay for exactly what you need, and you know the price up front.",
  },
  {
    title: 'Built to last',
    desc: 'Modern stack, clean code, real performance. Software you can build on for years — not a template you outgrow in six months.',
  },
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
      <section className="px-4 pb-20 pt-20 text-center sm:px-6 sm:pb-28 sm:pt-32">
        <p className="text-sm font-semibold text-[#86868b]">Kingdom Sites · Custom Software</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-[#f5f5f7] sm:text-6xl lg:text-7xl">
          Software that moves
          <br />
          <span className="text-gradient">your business forward.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#86868b] sm:text-lg">
          {"I'm Thomas — a full-stack developer building websites, mobile apps, and platforms for any project. Designed, built, and supported by one person who cares. Competitive pricing, every project quoted individually."}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={openContact}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
          >
            Get a Quote
          </button>
          <a href="#process" className="link-apple text-sm">
            How it works <span aria-hidden="true">›</span>
          </a>
        </div>

        {/* Stack strip */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {STACK.map((t) => (
            <span key={t} className="text-xs font-medium tracking-wide text-[#86868b]/70">{t}</span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-label="What I build" className="border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
            What I build.
            <br />
            <span className="text-[#86868b]">Whatever your project needs.</span>
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {SERVICES.map((s) => (
              <div key={s.eyebrow} className="tile flex flex-col p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#86868b]">{s.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#f5f5f7]">
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

      {/* Process */}
      <section id="process" aria-label="How it works" className="border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
            How it works.
            <br />
            <span className="text-[#86868b]">Simple, from first message to launch.</span>
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {PROCESS.map((p) => (
              <div key={p.step} className="tile p-7">
                <p className="text-gradient-blue text-2xl font-bold tracking-tight">{p.step}</p>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-[#f5f5f7]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#86868b]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why me */}
      <section aria-label="Why Kingdom Sites" className="border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
            Why work with me.
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {WHY.map((item) => (
              <div key={item.title} className="tile p-7">
                <h3 className="text-base font-semibold tracking-tight text-[#f5f5f7]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#86868b]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section aria-label="Built with purpose" className="border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl">
            Built with <span className="text-gradient-blue">purpose.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#86868b]">
            Kingdom Sites is more than a business. Every project also helps support the long-term
            mission work my wife and I are part of. You get great software — and your project
            becomes part of a bigger story.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6">
            <Link href="/about" className="link-apple text-sm">
              About us <span aria-hidden="true">›</span>
            </Link>
            <Link href="/mission" className="link-apple text-sm">
              Our mission <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-label="Contact" className="border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
              {"Let's talk about your project."}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#86868b] sm:text-lg">
              {"Tell me what you're building and I'll put together a quote. Free, fast, no obligation."}
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
