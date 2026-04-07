'use client'

import { useEffect, useRef } from 'react'

const CARD_STYLE = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(16px) saturate(140%)',
  WebkitBackdropFilter: 'blur(16px) saturate(140%)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal-card w-full rounded-2xl p-4 sm:p-6 lg:p-8 ${className}`}
      style={{ ...CARD_STYLE, transitionDelay: `${delay}ms`, boxSizing: 'border-box' }}
    >
      {children}
    </div>
  )
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal-card w-full rounded-2xl p-6 sm:p-8 text-center"
      style={{ ...CARD_STYLE, transitionDelay: `${delay}ms`, boxSizing: 'border-box' }}
    >
      <p className="text-3xl font-bold tracking-tight text-[#0071e3] sm:text-4xl lg:text-5xl">{value}</p>
      <p className="mt-2 text-sm font-medium leading-snug text-[#1d1d1f]/60 sm:text-base">{label}</p>
    </div>
  )
}

export default function WhyUs() {
  const heroRef = useRef<HTMLElement>(null)
  const heroInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = heroRef.current
    const inner = heroInnerRef.current
    if (!section || !inner) return
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const entry = Math.max(0, Math.min(1, (vh - rect.top) / vh))
      inner.style.transform = `translateY(${(1 - entry) * 50}px)`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section ref={heroRef} className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        <div ref={heroInnerRef} style={{ willChange: 'transform' }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-[#1d1d1f]/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            Why Kingdom Sites
          </p>
          <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
            Your business deserves software that works as hard as you do.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[#1d1d1f]/55 sm:mt-5 sm:text-base">
            Whether it is a website, app, or custom platform — we scope every project individually and quote based on what you actually need.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-4xl mx-auto">
          <StatCard value="Custom" label="every project scoped and quoted to your needs"         delay={0}  />
          <StatCard value="Full stack" label="websites, apps, platforms, APIs and more" delay={80} />
          <StatCard value="100%" label="focused on building solutions that drive real results"          delay={160} />
        </div>
      </section>

      {/* Why quality matters */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <RevealCard>
          <h2 className="mb-3 text-xl font-semibold tracking-tight sm:mb-4 sm:text-2xl lg:text-3xl">
            Why quality software matters for your business.
          </h2>
          <p className="mb-3 text-base font-medium leading-relaxed text-[#1d1d1f]/70">
            {"Most business websites and tools were built years ago, load slowly, and look dated on mobile. That matters — potential customers judge your credibility in seconds. If your site doesn't clearly communicate what you do and how to work with you, they'll move on."}
          </p>
          <p className="text-base font-medium leading-relaxed text-[#1d1d1f]/70">
            Well-built software communicates that your business is professional, organized, and ready to serve.
            It removes friction for potential customers, makes key info instantly findable, and drives real results.
          </p>
        </RevealCard>
      </section>

      {/* Unique position */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <RevealCard delay={0}>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#0071e3]/70">The Kingdom Sites difference</p>
          <h3 className="mb-3 text-lg font-semibold tracking-tight sm:text-xl">
            A true development partner, not a vendor.
          </h3>
          <p className="text-base font-medium leading-relaxed text-[#1d1d1f]/70">
            We take the time to understand your goals and scope every
            project individually. You get a custom quote based on exactly
            what you need — no bloated packages, no surprises, just
            thoughtful software built to serve your goals.
          </p>
        </RevealCard>
      </section>

      {/* Convictions */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:pb-28">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">Who we work with.</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/55 sm:mt-3">
            We partner with businesses and organizations of all sizes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Small businesses',
              desc: 'From local shops to growing startups — we build software that helps you operate more efficiently and reach more customers.',
            },
            {
              title: 'Agencies',
              desc: "Need a trusted dev partner for client work? We offer white label development with the same quality and process as our direct projects.",
            },
            {
              title: 'Non-profits and organizations',
              desc: 'We love working with mission-driven organizations that need reliable, well-built software on a realistic budget.',
            },
            {
              title: 'Growing teams',
              desc: "If you need custom tools, dashboards, or platforms to scale your operations, we'd love to build something great for you.",
            },
          ].map((item, i) => (
            <RevealCard key={item.title} delay={i * 90}>
              <h3 className="mb-2 text-sm font-semibold tracking-tight">{item.title}</h3>
              <p className="text-base font-medium leading-relaxed text-[#1d1d1f]/70">{item.desc}</p>
            </RevealCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
          >
            Start a conversation
          </button>
        </div>
      </section>
    </div>
  )
}
