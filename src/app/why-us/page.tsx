'use client'

import { useEffect, useRef } from 'react'

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
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transitionDelay: `${delay}ms`,
        boxSizing: 'border-box',
      }}
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
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transitionDelay: `${delay}ms`,
        boxSizing: 'border-box',
      }}
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
            Your ministry deserves a website that works as hard as you do.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[#1d1d1f]/55 sm:mt-5 sm:text-base">
            First impressions happen online. A clear, fast, functional website helps seekers find you and learn more about your ministry.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard value="81%"  label="of people research a church online before their first visit"  delay={0}   />
          <StatCard value="$499" label="flat rate build — or overhaul. No surprises."         delay={80}  />
          <StatCard value="$50"  label="per month — unlimited updates, hosting & maintenance" delay={160} />
          <StatCard value="100%" label="focused on keeping donors and visitors informed"          delay={240} />
        </div>
      </section>

      {/* Why quality matters */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <RevealCard>
          <h2 className="mb-3 text-xl font-semibold tracking-tight sm:mb-4 sm:text-2xl lg:text-3xl">
            Why a quality website matters for your church or organization.
          </h2>
          <p className="mb-3 text-base font-medium leading-relaxed text-[#1d1d1f]/70">
            Most church and ministry websites were built years ago, load slowly, and look dated on mobile.
            That matters — most visitors decide whether to show up based on your statement of faith, location, and service times. When I've searched for a church while traveling, if a site wasn't clear on those basics, I'd look elsewhere.
          </p>
          <p className="text-base font-medium leading-relaxed text-[#1d1d1f]/70">
            A well-built site communicates that your church or organization is alive, organized, and welcoming.
            It removes friction for first-time visitors, makes key info instantly findable, and keeps donors and guests informed.
          </p>
        </RevealCard>
      </section>

      {/* Unique position */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <RevealCard delay={0}>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#0071e3]/70">The Kingdom Sites difference</p>
          <h3 className="mb-3 text-lg font-semibold tracking-tight sm:text-xl">
            South Asia costs. American quality.
          </h3>
          <p className="text-base font-medium leading-relaxed text-[#1d1d1f]/70">
            We live and serve in South Asia, where the cost of living is a
            fraction of the US — which means I can offer premium, American-standard
            development at a price your budget can actually handle — without
            cutting any corners.
          </p>
        </RevealCard>
      </section>

      {/* Convictions */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:pb-28">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">Who we work with.</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/55 sm:mt-3">
            We collaborate with churches, ministries, and small businesses.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Bible-believing churches',
              desc: 'We hold the Scriptures as the fully inspired, inerrant, and authoritative Word of God — the only rule for faith and practice.',
            },
            {
              title: 'All evangelical traditions',
              desc: "Baptist, Reformed, Anglican, non-denominational — if you love the gospel and the local church, we'd be honored to work with you.",
            },
            {
              title: 'Mission-minded ministries',
              desc: 'We especially love serving churches and organizations reaching the lost for Christ.',
            },
            {
              title: 'Small businesses',
              desc: "Not a ministry? No problem. If you're a small business owner who likes what we're about, we'd love to build something great for you — same quality, same pricing.",
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
