'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { to: '/my-work', label: 'My Work' },
  { to: '/about',   label: 'About' },
  { to: '/why-us',  label: 'Why Kingdom Sites' },
]

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export default function Header() {
  const pathname  = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [pathname])

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50">
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(22, 22, 23, 0.8)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.10)' : '0.5px solid transparent',
        }}
      >
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-7">
            <Link href="/" className="text-sm font-semibold tracking-tight text-[#f5f5f7]">
              Kingdom Sites
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to} href={to}
                  className={`text-xs font-normal transition-colors duration-200 ${
                    isActive(to) ? 'text-[#f5f5f7]' : 'text-[#f5f5f7]/65 hover:text-[#f5f5f7]'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden sm:flex items-center">
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="cursor-pointer rounded-full bg-[#0071e3] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#0077ed]"
            >
              Get a Quote
            </button>
          </div>

          <button
            className="sm:hidden flex h-9 w-9 items-center justify-center text-[#f5f5f7]/80"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="sm:hidden"
          style={{
            background: 'rgba(22, 22, 23, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <div className="mx-auto max-w-5xl px-4 pb-5 pt-2 sm:px-6">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to} href={to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm transition ${
                    isActive(to)
                      ? 'bg-white/10 text-[#f5f5f7]'
                      : 'text-[#f5f5f7]/65 hover:bg-white/5 hover:text-[#f5f5f7]'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 border-t border-white/10 pt-3">
              <button
                onClick={() => { setMenuOpen(false); document.dispatchEvent(new CustomEvent('open-contact-modal')) }}
                className="w-full cursor-pointer rounded-xl bg-[#0071e3] px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-[#0077ed]"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
