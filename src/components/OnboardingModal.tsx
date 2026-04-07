'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const GLASS = {
  background: 'rgba(255,255,255,0.14)',
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.22)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.07), inset 0 0.5px 0 rgba(255,255,255,0.70)',
}

const INPUT = 'h-12 w-full rounded-3xl border border-white/30 bg-white/20 px-5 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4 placeholder:text-[#1d1d1f]/35'
const SELECT = 'h-12 w-full appearance-none rounded-3xl border border-white/30 bg-white/20 px-5 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4'
const CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231d1d1f' fill-opacity='.45' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`

type Profile = {
  name: string
  who_they_are: string
  tech_type: string
  description: string
}

export default function OnboardingModal({ user, onComplete }: { user: User; onComplete: (prof: Profile) => void }) {
  const [name, setName]               = useState('')
  const [whoTheyAre, setWhoTheyAre]   = useState('')
  const [techType, setTechType]       = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!techType) { setError('Please select what you need.'); return }
    setError('')
    setSaving(true)
    if (!supabase) { setError('Auth not configured.'); setSaving(false); return }
    const { error: err } = await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      name,
      who_they_are: whoTheyAre,
      tech_type: techType,
      description,
      onboarding_complete: true,
    })
    setSaving(false)
    if (err) setError(err.message)
    else onComplete({ name, who_they_are: whoTheyAre, tech_type: techType, description })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.20)', backdropFilter: 'blur(6px)' }}
    >
      <div className="w-full max-w-lg rounded-3xl p-8" style={GLASS}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">Welcome — tell us about yourself</h2>
          <p className="mt-1 text-sm text-[#1d1d1f]/55">Just a few quick details so we can get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[#1d1d1f]/75">Full name</span>
            <input
              required type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="John Smith" className={INPUT}
            />
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[#1d1d1f]/75">Who are you?</span>
            <select
              required value={whoTheyAre} onChange={(e) => setWhoTheyAre(e.target.value)}
              className={SELECT}
              style={{ backgroundImage: CHEVRON, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center' }}
            >
              <option value="" disabled>Select your role</option>
              <option>Business Owner</option>
              <option>Startup Founder</option>
              <option>Project Manager</option>
              <option>Individual</option>
              <option>Agency</option>
              <option>Other</option>
            </select>
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[#1d1d1f]/75">What do you need?</span>
            <select
              value={techType} onChange={(e) => setTechType(e.target.value)}
              className={SELECT}
              style={{ backgroundImage: CHEVRON, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center' }}
            >
              <option value="" disabled>Select a service</option>
              <option>Website Build</option>
              <option>App Build</option>
              <option>Hosting &amp; Maintenance</option>
            </select>
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[#1d1d1f]/75">Tell us about your project</span>
            <textarea
              required value={description} onChange={(e) => setDescription(e.target.value)}
              rows={4} placeholder="Describe what you're looking to build or maintain…"
              className="w-full resize-none rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4 placeholder:text-[#1d1d1f]/35"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit" disabled={saving}
            className="h-12 rounded-full bg-[#0071e3] text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Get started'}
          </button>
        </form>
      </div>
    </div>
  )
}
