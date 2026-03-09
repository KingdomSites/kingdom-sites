import Link from 'next/link'

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
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-center text-xs text-[#1d1d1f]/55 sm:px-6">
        <p>Kingdom Sites — premium sites with mission impact.</p>
        <p>© {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-[#1d1d1f] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#1d1d1f] transition-colors">
            Terms of Service
          </Link>
          <Link href="https://www.thegospelcoalition.org/what-is-the-gospel/" className="hover:text-[#1d1d1f] transition-colors">
            What is the Gospel?
          </Link>
        </div>
      </div>
    </footer>
  )
}
