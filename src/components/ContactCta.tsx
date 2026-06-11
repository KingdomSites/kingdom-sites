'use client'

export default function ContactCta({ label = 'Get a Quote', className = '' }: { label?: string; className?: string }) {
  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed] ${className}`}
    >
      {label}
    </button>
  )
}
