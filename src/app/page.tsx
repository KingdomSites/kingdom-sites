import Link from 'next/link'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/contact'

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

export default function Home() {
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
          <a
            href={CONTACT_MAILTO}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0071e3] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
          >
            Email me
          </a>
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
                <a href={CONTACT_MAILTO} className="link-apple mt-5 self-start text-sm">
                  Get a quote <span aria-hidden="true">›</span>
                </a>
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
              {"Email me what you're building and I'll put together a quote. Free, fast, no obligation."}
            </p>
          </div>

          <div className="tile mx-auto mt-10 max-w-2xl p-8 text-center sm:p-10">
            <a
              href={CONTACT_MAILTO}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0071e3] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
            >
              Email me
            </a>
            <p className="mt-5 text-sm text-[#86868b]">
              or write to{' '}
              <a href={CONTACT_MAILTO} className="link-apple">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
