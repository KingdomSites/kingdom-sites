'use client'

export default function SentryTest() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-120px)] max-w-md items-center justify-center px-4">
      <button
        className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white"
        onClick={() => { throw new Error('Sentry test error — Kingdom Sites') }}
      >
        Trigger Sentry Test Error
      </button>
    </div>
  )
}
