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

export default function Footer() {
  return (
    <footer
      className="border-t border-white/30"
      style={{
        background: 'rgba(200, 220, 248, 0.30)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-center text-xs text-[#1d1d1f]/55 sm:px-6">
        <p>Kingdom Sites — premium sites with mission impact. All prices subject to applicable tax fees of 15%.</p>

        {/* Page links — desktop only */}
        <div className="hidden sm:flex flex-wrap justify-center gap-x-5 gap-y-1">
          {PAGE_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-[#1d1d1f] transition-colors">
              {label}
            </Link>
          ))}
        </div>
        

        {/* Sign in — always visible */}
        <div className="flex justify-center">
          <Link href="/login" className="hover:text-[#1d1d1f] transition-colors">
            Sign In
          </Link>
        </div>

        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
