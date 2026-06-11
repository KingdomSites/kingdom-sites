'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handler = () => setContactOpen(true)
    document.addEventListener('open-contact-modal', handler)
    return () => document.removeEventListener('open-contact-modal', handler)
  }, [])

  return (
    <div className="min-h-screen min-h-dvh w-full overflow-x-hidden text-[#f5f5f7]">
      <Header />
      <main>{children}</main>
      <Footer />

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  )
}
