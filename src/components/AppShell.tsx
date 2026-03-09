'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false)
  const pathname = usePathname()
  const onDashboard = pathname === '/dashboard'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handler = () => setContactOpen(true)
    document.addEventListener('open-contact-modal', handler)
    return () => document.removeEventListener('open-contact-modal', handler)
  }, [])

  return (
    <div className="min-h-screen min-h-dvh w-full overflow-x-hidden text-[#1d1d1f]">
      <Header />
      <main>{children}</main>
      <Footer />

      {!onDashboard && (
        <button
          onClick={() => setContactOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-[#0071e3] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-95 active:brightness-90"
          style={{ boxShadow: '0 2px 8px rgba(0,113,227,0.25)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-4 3V6a2 2 0 0 1 2-2z"/>
          </svg>
          Contact
        </button>
      )}

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  )
}
