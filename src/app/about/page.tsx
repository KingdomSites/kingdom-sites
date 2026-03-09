import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import aboutImage from '../../../public/Photos/about.jpg'

export const metadata: Metadata = {
  title: 'About — Kingdom Sites',
  description: 'Meet Thomas Klein and Monisha — the people behind Kingdom Sites.',
}

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#0071e3]/10 blur-2xl" />
            <div className="glass overflow-hidden rounded-3xl">
              <Image
                src={aboutImage}
                alt="Thomas and Monisha"
                quality={75}
                placeholder="blur"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            About
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A little bit about us.
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-[#1d1d1f]/75 sm:text-lg">
            My name is Thomas Klein — a web developer and devoted Christian. My soon to be fiancée Monisha and I are passionate about seeing Jesus glorified throughout the world.
            This business is an extension of our ministry, and we love building relationships with believers everywhere — whether or not we end up building your website.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-sm font-semibold tracking-tight">What I focus on</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/70">
                I focus on building websites and apps that are fast, clean, mobile-friendly, and easy to maintain.
              </p>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-sm font-semibold tracking-tight">Why &quot;Kingdom Sites&quot;</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/70">
                You&apos;re not just getting a website — you&apos;re getting a partner in your ministry. We want to see churches and organizations thrive and reach people for Christ. Technology can accelerate the spread of the gospel, and we want to be part of that.
              </p>
            </div>

            <div className="mt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
              >
                Build Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
