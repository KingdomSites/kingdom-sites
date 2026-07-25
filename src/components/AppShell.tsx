'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Keep landing on a link like /tap-to-tick#pricing at that section
    // instead of yanking the visitor back to the top of the page.
    if (window.location.hash) return
    window.scrollTo(0, 0)
  }, [pathname])

  // The Tap to Tick product pages keep the app's own light branding, so they
  // render without the dark Kingdom Sites header and footer.
  const standalone = pathname?.startsWith('/tap-to-tick')

  // No overflow clipping here — it would make this element the scroll container
  // and stop the product page's sticky nav from sticking.
  if (standalone) {
    return <main className="w-full">{children}</main>
  }

  return (
    <div className="min-h-screen min-h-dvh w-full overflow-x-hidden text-ink">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
