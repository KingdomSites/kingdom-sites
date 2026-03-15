import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import southasiaImage from '../../../public/Photos/southasia.jpg'

export const metadata: Metadata = {
  title: 'Our Mission — Kingdom Sites',
  description: 'How your website project supports gospel work in South Asia.',
}

export default function Mission() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#0071e3]/10 blur-2xl" />
            <div className="glass overflow-hidden rounded-3xl">
              <Image
                src={southasiaImage}
                alt="South Asia mission work"
                quality={75}
                placeholder="blur"
                className="aspect-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            Our mission work
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Mission work around the world.
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-[#1d1d1f]/75 sm:text-lg">
            {"In South Asia, 1.8 billion people have never heard the gospel. Our desire is to see Jesus glorified throughout South Asia. For security reasons I can't share specific details, but please reach out if you have any questions."}
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#1d1d1f]/75">
            <p>
              We collaborate with Christians toward seeing movements of Christ among Muslim-majority people groups in South Asia, using approaches from No Place Left.
            </p>
            <p>
              Your project fuels long-term mission work among people with little access to the gospel. My soon to be fiancée and I are in training for long-term ministry in South Asia.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
            >
              Build Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
