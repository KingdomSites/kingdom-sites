import type { Metadata } from 'next'
import { Outfit, Prompt } from 'next/font/google'
import './tap-to-tick.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
})

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tap to Tick — your money, two seconds at a time',
  description:
    'A dead-simple iPhone budget that lives on your lock screen, your wrist, and your Apple Pay. Free to use; Advanced adds iCloud sharing and an AI money coach for $4.99 a month.',
  alternates: { canonical: '/tap-to-tick' },
  openGraph: {
    title: 'Tap to Tick — your money, two seconds at a time',
    description:
      'A dead-simple iPhone budget that lives on your lock screen, your wrist, and your Apple Pay.',
    url: 'https://kingdom-sites.com/tap-to-tick',
    siteName: 'Tap to Tick',
    locale: 'en_US',
    type: 'website',
  },
}

export default function TapToTickLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ttt ${outfit.variable} ${prompt.variable}`}>{children}</div>
}
