import Image from 'next/image'
import type { Metadata } from 'next'
import southasiaImage from '../../../public/Photos/southasia.jpg'
import ContactCta from '@/components/ContactCta'

export const metadata: Metadata = {
  title: 'Our Mission — Kingdom Sites',
  description: 'How your project supports gospel work in South Asia.',
}

export default function Mission() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-6 -z-10 rounded-[36px] blur-3xl"
              style={{ background: 'linear-gradient(140deg, rgba(255,144,4,0.18), rgba(255,46,84,0.14))' }}
            />
            <div className="tile-elevated">
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
          <p className="text-sm font-semibold text-[#86868b]">Our mission work</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-[#f5f5f7] sm:text-5xl">
            Mission work <span className="text-gradient">around the world.</span>
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-[#86868b] sm:text-lg">
            {"In South Asia, 1.8 billion people have never heard the gospel. Our desire is to see Jesus glorified throughout South Asia. For security reasons I can't share specific details, but please reach out if you have any questions."}
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#86868b]">
            <p>
              We collaborate with Christians toward seeing movements of Christ among Muslim-majority people groups in South Asia, using approaches from No Place Left.
            </p>
            <p>
              Your project fuels long-term mission work among people with little access to the gospel. My wife and I are in training for long-term ministry in South Asia.
            </p>
          </div>

          <div className="mt-8">
            <ContactCta label="Start a Project" />
          </div>
        </div>
      </div>
    </div>
  )
}
