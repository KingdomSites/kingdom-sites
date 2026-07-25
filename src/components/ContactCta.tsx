import { CONTACT_MAILTO } from '@/lib/contact'

export default function ContactCta({ label = 'Get a Quote', className = '' }: { label?: string; className?: string }) {
  return (
    <a
      href={CONTACT_MAILTO}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed] ${className}`}
    >
      {label}
    </a>
  )
}
