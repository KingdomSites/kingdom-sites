'use client'

import Image from 'next/image'
import Link from 'next/link'
import shotOverview from '../../../public/tap-to-tick/1-overview.jpg'
import shotLog from '../../../public/tap-to-tick/2-log-a-purchase.jpg'

const TTT_STACK = ['Swift', 'SwiftUI', 'WidgetKit', 'watchOS', 'CloudKit', 'StoreKit', 'Cloudflare Workers', 'Claude API']

const TTT_HIGHLIGHTS = [
  {
    title: 'Two seconds to log a purchase',
    desc: 'A Lock Screen widget, an Apple Watch app, and a Siri phrase all write to the same ledger — so recording a purchase takes about as long as making it.',
  },
  {
    title: 'Your data stays yours',
    desc: 'No servers holding your budget and no account to create. Everything syncs through your own iCloud, including an optional shared budget for two people.',
  },
  {
    title: 'An AI coach on real numbers',
    desc: 'The assistant answers questions from your actual entries and budgets, not generic advice — built on Claude behind a cost-capped relay so the API key never ships in the app.',
  },
  {
    title: 'Free tier plus a subscription',
    desc: 'Simple is free and complete on its own. Advanced, at $4.99 a month through Apple, adds shared budgets and the AI assistant.',
  },
]

const SITE_STACK = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Vercel', 'Supabase', 'Resend']

function openContact() {
  document.dispatchEvent(new CustomEvent('open-contact-modal'))
}

export default function MyWork() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="px-4 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-28">
        <p className="text-sm font-semibold text-[#86868b]">My work</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-[#f5f5f7] sm:text-6xl">
          Things I&apos;ve designed,
          <br />
          <span className="text-gradient">built, and shipped.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#86868b] sm:text-lg">
          Every project here was scoped, designed, built, and launched by me — front to back. Client work
          stays private unless I&apos;m asked to show it, so what follows is my own.
        </p>
      </section>

      {/* Featured project — Tap to Tick */}
      <section aria-label="Tap to Tick" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="tile-elevated grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2997ff]">
                iPhone · Apple Watch · Widgets
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl">
                Tap to Tick
              </h2>
              <p className="mt-2 text-base text-[#f5f5f7]/80">
                A budgeting app you can actually keep up with.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#86868b] sm:text-base">
                Most budgeting apps fail for the same reason: logging a purchase is more work than making
                one. Tap to Tick puts the whole thing on your Lock Screen, your wrist, and your Apple Pay —
                and then explains your own numbers back to you with an AI money coach.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {TTT_STACK.map((t) => (
                  <span key={t} className="text-xs font-medium tracking-wide text-[#86868b]/70">{t}</span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/tap-to-tick"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
                >
                  See the product page
                </Link>
                <Link href="/tap-to-tick/privacy" className="link-apple text-sm sm:ml-2">
                  Privacy policy <span aria-hidden="true">›</span>
                </Link>
              </div>
            </div>

            {/* Screens */}
            <div className="flex items-end justify-center gap-4 sm:gap-6">
              <div className="w-[42%] max-w-[180px] translate-y-4 overflow-hidden rounded-[22px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image src={shotLog} alt="Logging a purchase in Tap to Tick" sizes="180px" className="h-auto w-full" />
              </div>
              <div className="w-[48%] max-w-[210px] overflow-hidden rounded-[26px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                <Image src={shotOverview} alt="The Tap to Tick overview screen" sizes="210px" className="h-auto w-full" priority />
              </div>
            </div>
          </div>

          {/* What makes it work */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {TTT_HIGHLIGHTS.map((h) => (
              <div key={h.title} className="tile p-7">
                <h3 className="text-base font-semibold tracking-tight text-[#f5f5f7]">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#86868b]">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* This site */}
      <section aria-label="Kingdom Sites" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="tile p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2997ff]">Website</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#f5f5f7] sm:text-3xl">
              kingdom-sites.com
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#86868b] sm:text-base">
              This site. Server-rendered for speed, scored on real visitor performance, with a contact form
              that is rate-limited and validated end to end. The same setup I build client marketing sites on.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {SITE_STACK.map((t) => (
                <span key={t} className="text-xs font-medium tracking-wide text-[#86868b]/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Contact" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl">
            Want something like this <span className="text-gradient-blue">for your business?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#86868b]">
            Tell me what you have in mind and I&apos;ll scope it and send a quote. Free, fast, no obligation.
          </p>
          <button
            onClick={openContact}
            className="mt-8 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
          >
            Get a Quote
          </button>
        </div>
      </section>
    </div>
  )
}
