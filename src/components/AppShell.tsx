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
    // Keep landing on a link like /tap-to-tick#pricing at that section
    // instead of yanking the visitor back to the top of the page.
    if (window.location.hash) return
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handler = () => setContactOpen(true)
    document.addEventListener('open-contact-modal', handler)
    return () => document.removeEventListener('open-contact-modal', handler)
  }, [])

  // The Tap to Tick product pages keep the app's own light branding, so they
  // render without the dark Kingdom Sites header and footer.
  const standalone = pathname?.startsWith('/tap-to-tick')

  if (standalone) {
    return <main className="w-full overflow-x-hidden">{children}</main>
  }

  return (
    <div className="min-h-screen min-h-dvh w-full overflow-x-hidden text-[#f5f5f7]">
      <Header />
      <main>{children}</main>
      <Footer />

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  )
}
