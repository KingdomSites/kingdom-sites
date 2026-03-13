'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const NAV_LINKS = [
  { to: '/about',    label: 'About' },
  { to: '/mission',  label: 'Our Mission' },
  { to: '/why-us',   label: 'Why Kingdom Sites' },
  { to: '/articles', label: 'Articles' },
]

const GLASS_LIGHT = {
  background: 'rgba(232, 238, 247, 0.85)',
  backdropFilter: 'blur(20px) saturate(130%)',
  WebkitBackdropFilter: 'blur(20px) saturate(130%)',
}

const GLASS_DARK = {
  background: 'rgba(9, 18, 36, 0.90)',
  backdropFilter: 'blur(20px) saturate(130%)',
  WebkitBackdropFilter: 'blur(20px) saturate(130%)',
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Header() {
  const pathname  = usePathname()
  const [user, setUser]         = useState<{ email?: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkBg, setDarkBg]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark]     = useState(false)
  const headerRef               = useRef<HTMLElement>(null)

  // Sync isDark with the html class (set by the anti-flash script)
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  useEffect(() => {
    const check = () => {
      setScrolled(window.scrollY > 8)
      const headerHeight = headerRef.current?.offsetHeight ?? 56
      const sections = document.querySelectorAll('[data-dark-section]')
      let over = false
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top < headerHeight && r.bottom > 0) { over = true; break }
      }
      setDarkBg(over)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [pathname])

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const isActive    = (path: string) => pathname === path
  const onDashboard = pathname === '/dashboard'

  const effectiveDark = isDark || darkBg
  const GLASS_HEADER  = isDark ? GLASS_DARK : GLASS_LIGHT

  const textColor   = effectiveDark ? 'text-white'          : 'text-[#1d1d1f]'
  const mutedColor  = effectiveDark ? 'text-white/65'       : 'text-[#1d1d1f]/60'
  const hoverColor  = effectiveDark ? 'hover:text-white'    : 'hover:text-[#0071e3]'
  const activeColor = effectiveDark ? 'text-white'          : 'text-[#1d1d1f]'
  const accountColor = effectiveDark ? 'text-white/80'      : 'text-[#1d1d1f]/80'
  const burgerColor  = effectiveDark ? 'text-white/80'      : 'text-[#1d1d1f]/70'
  const toggleColor  = effectiveDark ? 'text-white/60 hover:bg-white/10' : 'text-[#1d1d1f]/50 hover:bg-black/5'

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled ? GLASS_HEADER.background : 'transparent',
          backdropFilter: scrolled ? GLASS_HEADER.backdropFilter : 'none',
          WebkitBackdropFilter: scrolled ? GLASS_HEADER.WebkitBackdropFilter : 'none',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-5">
            <Link href="/" className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${textColor}`}>
              Kingdom Sites
            </Link>
            {!onDashboard && (
              <nav className="hidden sm:flex items-center gap-4">
                {NAV_LINKS.map(({ to, label }) => (
                  <Link
                    key={to} href={to}
                    className={`text-sm font-medium transition-colors duration-300 ${isActive(to) ? activeColor : `${mutedColor} ${hoverColor}`}`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleDark}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${toggleColor}`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {!isActive('/dashboard') && (
              <Link
                href={user ? '/dashboard' : '/login'}
                className={`inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors duration-300 hover:bg-white/40 ${accountColor}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                {user ? 'Dashboard' : 'Your Account'}
              </Link>
            )}
            {!user && (
              <Link
                href="/login"
                className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
              >
                Get Started
              </Link>
            )}
          </div>

          {!onDashboard && (
            <button
              className={`sm:hidden flex h-9 w-9 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-colors duration-300 hover:bg-white/35 ${burgerColor}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="sm:hidden"
          style={{ ...GLASS_HEADER, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to} href={to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive(to)
                      ? `bg-white/30 ${activeColor}`
                      : `${mutedColor} hover:bg-white/20`
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/20 pt-3">
              <button
                onClick={toggleDark}
                className={`rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/35 ${accountColor}`}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              {!isActive('/dashboard') && (
                <Link
                  href={user ? '/dashboard' : '/login'}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/35 ${accountColor}`}
                >
                  {user ? 'Dashboard' : 'Your Account'}
                </Link>
              )}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-[#0071e3] px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-95"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
