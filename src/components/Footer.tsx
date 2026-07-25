import Link from 'next/link'

const PAGE_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/my-work', label: 'My Work' },
  { href: '/about',   label: 'About' },
  { href: '/why-us',  label: 'Why Kingdom Sites' },
  { href: '/mission', label: 'Mission' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms',   label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#161617]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-xs leading-relaxed text-[#86868b]">
          Kingdom Sites — websites, mobile apps, and custom software. Competitive pricing, every project individually quoted.
        </p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5">
          {PAGE_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-[#86868b] transition-colors hover:text-[#f5f5f7]"
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="mt-5 text-xs text-[#86868b]/70">
          Copyright © {new Date().getFullYear()} Kingdom Sites. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
