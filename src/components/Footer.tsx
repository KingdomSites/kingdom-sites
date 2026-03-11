import Link from 'next/link'

const PAGE_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About' },
  { href: '/mission', label: 'Our Mission' },
  { href: '/why-us',  label: 'Why Kingdom Sites' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms',   label: 'Terms' },
  { href: 'https://www.thegospelcoalition.org/what-is-the-gospel/', label: 'What is the Gospel?' },
]

export default function Footer({ isDark, onToggleDark }: { isDark: boolean; onToggleDark: () => void }) {
  return (
    <footer
      className="border-t border-white/30 dark:border-white/10"
      style={{
        background: 'rgba(200, 220, 248, 0.30)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-center text-xs text-[#1d1d1f]/55 dark:text-[#e8eef7]/45 sm:px-6">
        <p>Kingdom Sites — premium sites with mission impact.</p>

        {/* Page links — desktop only */}
        <div className="hidden sm:flex flex-wrap justify-center gap-x-5 gap-y-1">
          {PAGE_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-[#1d1d1f] dark:hover:text-[#e8eef7] transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Sign in — always visible */}
        <div className="flex justify-center">
          <Link href="/login" className="hover:text-[#1d1d1f] dark:hover:text-[#e8eef7] transition-colors">
            Sign In
          </Link>
        </div>

        {/* Dark mode toggle */}
        <div className="flex justify-center">
          <button
            onClick={onToggleDark}
            className="inline-flex items-center gap-1.5 rounded-full border border-current/20 px-3 py-1 text-xs transition-colors hover:text-[#1d1d1f] dark:hover:text-[#e8eef7]"
          >
            {isDark ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            {isDark ? 'Back to light mode' : 'Try dark mode'}
          </button>
        </div>

        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
