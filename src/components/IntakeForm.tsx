'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

// ── Zod Schemas (one per step) ─────────────────────────────────────────────────
const step1Schema = z.object({
  org_name:             z.string().min(2, 'Name is required').max(150).transform(s => s.trim()),
  primary_contact_name: z.string().min(2, 'Contact name is required').max(100).transform(s => s.trim()),
  address:              z.string().min(5, 'Address is required').max(300).transform(s => s.trim()),
  denomination:         z.string().max(100).transform(s => s.trim()),
})

const step2Schema = z.object({
  logo_url:          z.string().url('Must be a valid URL').or(z.literal('')).transform(s => s.trim()),
  vibe_word1:        z.string().min(1, 'Required').max(50).transform(s => s.trim()),
  vibe_word2:        z.string().min(1, 'Required').max(50).transform(s => s.trim()),
  vibe_word3:        z.string().min(1, 'Required').max(50).transform(s => s.trim()),
  color_preferences: z.string().max(200).transform(s => s.trim()),
  design_preference: z.string().max(1000).transform(s => s.trim()),
  media_links:       z.string().max(500).transform(s => s.trim()),
})

const step3Schema = z.object({
  current_site_url: z.string().url('Must be a valid URL').or(z.literal('')).transform(s => s.trim()),
  domain_info:      z.string().max(500).transform(s => s.trim()),
  mission_summary:  z.string().max(2000).transform(s => s.trim()),
})

// ── Feature lists ──────────────────────────────────────────────────────────────
const CHURCH_FEATURES = [
  'Sermon Archive (YouTube embed)',
  'Online Giving',
  'Events Calendar',
  'Staff Bios',
  'Prayer Request feature (+$300)',
  'Newsletter Signup',
  'Blog / Devotionals',
  'Live Stream',
  'other',
] as const

const BUSINESS_FEATURES = [
  'Events Calendar',
  'Staff / Team Bios',
  'Newsletter Signup',
  'Blog / Articles',
  'Online Store / Payments',
  'Live Stream',
  'other',
] as const

type OrgType = 'church' | 'business'

const CHURCH_STEPS = [
  { title: 'Church Info',    subtitle: 'Basic details about your organization.' },
  { title: 'Vibe & Design',  subtitle: "Help us capture your church's identity." },
  { title: 'Tech Access',    subtitle: 'Domain and current website information.' },
  { title: 'Features',       subtitle: 'Select everything you need on your new site.' },
]

const BUSINESS_STEPS = [
  { title: 'Business Info',  subtitle: 'Basic details about your organization.' },
  { title: 'Vibe & Design',  subtitle: 'Help us capture your brand identity.' },
  { title: 'Tech Access',    subtitle: 'Domain and current website information.' },
  { title: 'Features',       subtitle: 'Select everything you need on your new site.' },
]

// ── Shared styles ──────────────────────────────────────────────────────────────
const GLASS: React.CSSProperties = {
  background:           'rgba(255,255,255,0.12)',
  backdropFilter:       'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border:               '1px solid rgba(255,255,255,0.22)',
  boxShadow:            '0 4px 24px rgba(0,0,0,0.05), inset 0 0.5px 0 rgba(255,255,255,0.70)',
}
const INPUT    = 'h-12 w-full rounded-3xl border border-white/30 bg-white/20 px-5 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4 placeholder:text-[#1d1d1f]/35'
const TEXTAREA = 'w-full resize-none rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4 placeholder:text-[#1d1d1f]/35'
const LABEL    = 'text-sm font-medium text-[#1d1d1f]/75'
const ERR      = 'mt-1 text-xs text-red-500'

// ── Types ─────────────────────────────────────────────────────────────────────
type FormData = {
  org_type: OrgType | ''
  org_name: string; primary_contact_name: string; address: string; denomination: string
  logo_url: string; vibe_word1: string; vibe_word2: string; vibe_word3: string
  color_preferences: string; design_preference: string; media_links: string
  current_site_url: string; domain_info: string; mission_summary: string
  requested_features: string[]
  other_features_text: string
}

const INITIAL: FormData = {
  org_type: '',
  org_name: '', primary_contact_name: '', address: '', denomination: '',
  logo_url: '', vibe_word1: '', vibe_word2: '', vibe_word3: '',
  color_preferences: '', design_preference: '', media_links: '',
  current_site_url: '', domain_info: '', mission_summary: '',
  requested_features: [],
  other_features_text: '',
}

function buildFeatures(data: FormData): string[] {
  const base = data.requested_features.filter(f => f !== 'other')
  const text = data.other_features_text.trim()
  if (data.requested_features.includes('other') && text) base.push(`Other: ${text}`)
  return base
}

function Req() {
  return <span className="text-[#0071e3]"> *</span>
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function IntakeForm({ user }: { user: User }) {
  const [step, setStep]               = useState(0)
  const [data, setData]               = useState<FormData>(INITIAL)
  const [errors, setErrors]           = useState<Record<string, string>>({})
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [loadingExisting, setLoadingExisting] = useState(true)
  const [editing, setEditing]         = useState(false)

  useEffect(() => {
    supabase
      .from('church_intake')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data: row }) => {
        if (row) {
          const features = (row.requested_features ?? []) as string[]
          const otherEntry = features.find((f: string) => f.startsWith('Other: '))
          const allFeatureValues = [...CHURCH_FEATURES, ...BUSINESS_FEATURES] as string[]
          const knownFeatures = features.filter((f: string) => allFeatureValues.includes(f))
          const hasOther = Boolean(otherEntry)

          setData({
            org_type:             (row.org_type as OrgType) || 'church',
            org_name:             row.org_name             ?? '',
            primary_contact_name: row.primary_contact_name ?? '',
            address:              row.address              ?? '',
            denomination:         row.denomination         ?? '',
            logo_url:             row.logo_url             ?? '',
            vibe_word1:           row.vibe_words?.[0]      ?? '',
            vibe_word2:           row.vibe_words?.[1]      ?? '',
            vibe_word3:           row.vibe_words?.[2]      ?? '',
            color_preferences:    row.color_preferences    ?? '',
            design_preference:    row.design_preference    ?? '',
            media_links:          row.media_links          ?? '',
            current_site_url:     row.current_site_url     ?? '',
            domain_info:          row.domain_info          ?? '',
            mission_summary:      row.mission_summary      ?? '',
            requested_features:   hasOther ? [...knownFeatures, 'other'] : knownFeatures,
            other_features_text:  otherEntry ? otherEntry.replace('Other: ', '') : '',
          })
          setSubmitted(true)
        }
        setLoadingExisting(false)
      })
  }, [user.id])

  const set = (field: keyof FormData, value: string | string[]) =>
    setData(prev => ({ ...prev, [field]: value }))

  const clearErr = (field: string) =>
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n })

  const validate = (): boolean => {
    const schema = step === 0 ? step1Schema : step === 1 ? step2Schema : step === 2 ? step3Schema : null
    if (!schema) return true
    const result = schema.safeParse(data)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach(issue => { errs[String(issue.path[0])] = issue.message })
      setErrors(errs)
      return false
    }
    setErrors({})
    return true
  }

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 3)) }
  const back = () => { setErrors({}); setStep(s => Math.max(s - 1, 0)) }

  const toggleFeature = (f: string) =>
    set(
      'requested_features',
      data.requested_features.includes(f)
        ? data.requested_features.filter(x => x !== f)
        : [...data.requested_features, f],
    )

  const submit = async () => {
    setSubmitting(true)
    setSubmitError('')
    const { error } = await supabase.from('church_intake').upsert(
      {
        user_id:              user.id,
        org_type:             data.org_type,
        org_name:             data.org_name.trim(),
        primary_contact_name: data.primary_contact_name.trim(),
        address:              data.address.trim(),
        denomination:         data.denomination.trim() || null,
        logo_url:             data.logo_url.trim()     || null,
        vibe_words:           [data.vibe_word1, data.vibe_word2, data.vibe_word3].map(w => w.trim()),
        color_preferences:    data.color_preferences.trim() || null,
        design_preference:    data.design_preference.trim() || null,
        media_links:          data.media_links.trim()       || null,
        current_site_url:     data.current_site_url.trim()  || null,
        domain_info:          data.domain_info.trim()       || null,
        mission_summary:      data.mission_summary.trim()   || null,
        requested_features:   buildFeatures(data),
      },
      { onConflict: 'user_id' },
    )
    setSubmitting(false)
    if (error) { setSubmitError(error.message); return }
    setSubmitted(true)
    setEditing(false)
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loadingExisting) {
    return (
      <div className="rounded-3xl p-8 text-center text-sm text-[#1d1d1f]/45" style={GLASS}>
        Loading…
      </div>
    )
  }

  // ── Summary / read-only ──────────────────────────────────────────────────────
  if (submitted && !editing) {
    const displayFeatures = buildFeatures(data)
    const isBusiness = data.org_type === 'business'
    const sections: { heading: string; rows: [string, string][] }[] = [
      {
        heading: isBusiness ? 'Business Info' : 'Church Info',
        rows: [
          ['Organization', data.org_name],
          ['Contact',      data.primary_contact_name],
          ['Address',      data.address],
          ...(!isBusiness ? [['Denomination', data.denomination || '—'] as [string, string]] : []),
        ],
      },
      {
        heading: 'Vibe & Design',
        rows: [
          ['Logo URL',    data.logo_url || '—'],
          ['Vibe words',  [data.vibe_word1, data.vibe_word2, data.vibe_word3].filter(Boolean).join(', ') || '—'],
          ['Colors',      data.color_preferences || '—'],
          ['Style notes', data.design_preference || '—'],
          ['Media links', data.media_links       || '—'],
        ],
      },
      {
        heading: 'Tech Access',
        rows: [
          ['Current site',                        data.current_site_url || '—'],
          ['Domain info',                         data.domain_info      || '—'],
          [isBusiness ? 'About / Description' : 'Mission', data.mission_summary || '—'],
        ],
      },
      {
        heading: 'Features',
        rows: [['Selected', displayFeatures.length ? displayFeatures.join(', ') : 'None selected']],
      },
    ]

    return (
      <div className="rounded-3xl p-6 sm:p-8" style={GLASS}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-[#0071e3]/20 bg-[#0071e3]/8 px-3 py-1 text-xs font-medium text-[#0071e3]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <polyline points="1.5 5 4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Submitted
            </div>
            <h2 className="text-base font-semibold tracking-tight">Your intake form</h2>
            <p className="mt-0.5 text-xs text-[#1d1d1f]/45">Review your responses below.</p>
          </div>
          <button
            onClick={() => { setEditing(true); setStep(0); setErrors({}) }}
            className="shrink-0 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-medium text-[#1d1d1f]/60 backdrop-blur-sm transition hover:bg-white/35"
          >
            Edit
          </button>
        </div>

        <div className="grid gap-5">
          {sections.map(({ heading, rows }) => (
            <div key={heading}>
              <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-widest text-[#1d1d1f]/35">
                {heading}
              </p>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                <dl className="grid gap-2.5">
                  {rows.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[7rem_1fr] gap-2 text-sm">
                      <dt className="text-[#1d1d1f]/40 shrink-0">{label}</dt>
                      <dd className="break-words text-[#1d1d1f]/75">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Type picker ──────────────────────────────────────────────────────────────
  if (!data.org_type) {
    return (
      <div className="rounded-3xl p-6 sm:p-8" style={GLASS}>
        <h2 className="mb-1 text-base font-semibold tracking-tight">Who are you?</h2>
        <p className="mb-6 text-sm text-[#1d1d1f]/50">Pick the option that best fits your organization — the form will adapt accordingly.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {([
            {
              type: 'church' as OrgType,
              label: 'Church or Ministry',
              desc: 'A local church, para-church ministry, mission organization, or non-profit.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7v15h20V7L12 2z" /><path d="M12 2v5M9 7h6" /><rect x="9" y="14" width="6" height="8" />
                </svg>
              ),
            },
            {
              type: 'business' as OrgType,
              label: 'Small Business',
              desc: 'A business or professional service that wants a clean, effective website.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
                </svg>
              ),
            },
          ] as const).map(({ type, label, desc, icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => set('org_type', type)}
              className="flex flex-col items-start gap-3 rounded-2xl border border-white/30 bg-white/15 p-5 text-left transition hover:bg-white/25 hover:border-[#0071e3]/30 cursor-pointer"
            >
              <span className="text-[#0071e3]">{icon}</span>
              <span>
                <span className="block text-sm font-semibold tracking-tight">{label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-[#1d1d1f]/55">{desc}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Multi-step form ──────────────────────────────────────────────────────────
  const isBusiness = data.org_type === 'business'
  const STEPS = isBusiness ? BUSINESS_STEPS : CHURCH_STEPS
  const FEATURES = isBusiness ? BUSINESS_FEATURES : CHURCH_FEATURES
  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="rounded-3xl p-6 sm:p-8" style={GLASS}>

      {/* Progress bar */}
      <div className="mb-7">
        <div className="mb-1.5 flex items-center justify-between text-xs text-[#1d1d1f]/50">
          <button
            type="button"
            onClick={() => { if (step === 0 && !editing) set('org_type', ''); else back() }}
            className="flex items-center gap-1 text-[#1d1d1f]/40 hover:text-[#1d1d1f]/70 transition"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {step === 0 && !editing ? 'Change type' : 'Back'}
          </button>
          <span className="font-medium">{STEPS[step].title}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full rounded-full bg-[#0071e3] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-[0.70rem] text-[#1d1d1f]/40">{STEPS[step].subtitle}</p>
      </div>

      {/* ── Step 1: Org Info ── */}
      {step === 0 && (
        <div className="grid gap-4">
          <label className="grid gap-1.5">
            <span className={LABEL}>{isBusiness ? 'Business Name' : 'Legal Organization Name'}<Req /></span>
            <input
              required type="text" className={INPUT}
              placeholder={isBusiness ? 'Acme Design Co.' : 'Grace Community Church'}
              maxLength={150}
              value={data.org_name}
              onChange={e => { set('org_name', e.target.value); clearErr('org_name') }}
            />
            {errors.org_name && <p className={ERR}>{errors.org_name}</p>}
          </label>

          <label className="grid gap-1.5">
            <span className={LABEL}>Primary Point of Contact<Req /></span>
            <input
              required type="text" className={INPUT}
              placeholder={isBusiness ? 'Jane Smith' : 'Pastor John Smith'}
              maxLength={100}
              value={data.primary_contact_name}
              onChange={e => { set('primary_contact_name', e.target.value); clearErr('primary_contact_name') }}
            />
            {errors.primary_contact_name && <p className={ERR}>{errors.primary_contact_name}</p>}
          </label>

          <label className="grid gap-1.5">
            <span className={LABEL}>{isBusiness ? 'Business Address' : 'Church Address'}<Req /></span>
            <input
              required type="text" className={INPUT} placeholder="123 Main St, City, State 00000"
              maxLength={300}
              value={data.address}
              onChange={e => { set('address', e.target.value); clearErr('address') }}
            />
            {errors.address && <p className={ERR}>{errors.address}</p>}
          </label>

          {!isBusiness && (
            <label className="grid gap-1.5">
              <span className={LABEL}>
                Denomination{' '}
                <span className="font-normal text-[#1d1d1f]/40">(optional)</span>
              </span>
              <input
                type="text" className={INPUT} placeholder="Baptist, Non-denominational, etc."
                maxLength={100}
                value={data.denomination}
                onChange={e => set('denomination', e.target.value)}
              />
            </label>
          )}
        </div>
      )}

      {/* ── Step 2: Brand & Vibe ── */}
      {step === 1 && (
        <div className="grid gap-4">
          <label className="grid gap-1.5">
            <span className={LABEL}>
              Logo URL{' '}
              <span className="font-normal text-[#1d1d1f]/40">(Google Drive, Dropbox, etc.)</span>
            </span>
            <input
              type="url" className={INPUT} placeholder="https://drive.google.com/…"
              maxLength={500}
              value={data.logo_url}
              onChange={e => { set('logo_url', e.target.value); clearErr('logo_url') }}
            />
            {errors.logo_url && <p className={ERR}>{errors.logo_url}</p>}
          </label>

          <div className="grid gap-1.5">
            <span className={LABEL}>
              3 Words That Describe Your {isBusiness ? 'Brand' : 'Church'}<Req />
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['vibe_word1', 'vibe_word2', 'vibe_word3'] as const).map((k, i) => (
                <input
                  required key={k} type="text" className={INPUT}
                  placeholder={['Bold', 'Warm', 'Modern'][i]}
                  maxLength={50}
                  value={data[k]}
                  onChange={e => { set(k, e.target.value); clearErr(k) }}
                />
              ))}
            </div>
            {(errors.vibe_word1 || errors.vibe_word2 || errors.vibe_word3) && (
              <p className={ERR}>All three words are required.</p>
            )}
          </div>

          <label className="grid gap-1.5">
            <span className={LABEL}>
              Color Preferences{' '}
              <span className="font-normal text-[#1d1d1f]/40">(optional)</span>
            </span>
            <input
              type="text" className={INPUT} placeholder="Navy blue, gold, white"
              maxLength={200}
              value={data.color_preferences}
              onChange={e => set('color_preferences', e.target.value)}
            />
          </label>

          <label className="grid gap-1.5">
            <span className={LABEL}>
              Design / Style{' '}
              <span className="font-normal text-[#1d1d1f]/40">(optional)</span>
            </span>
            <textarea
              rows={3} className={TEXTAREA}
              placeholder="Modern and minimal, warm and traditional, bold and energetic…"
              maxLength={1000}
              value={data.design_preference}
              onChange={e => set('design_preference', e.target.value)}
            />
          </label>

          <label className="grid gap-1.5">
            <span className={LABEL}>
              Media Asset Links{' '}
              <span className="font-normal text-[#1d1d1f]/40">(photos, videos — optional)</span>
            </span>
            <input
              type="text" className={INPUT} placeholder="Dropbox / Drive folder link"
              maxLength={500}
              value={data.media_links}
              onChange={e => set('media_links', e.target.value)}
            />
          </label>
        </div>
      )}

      {/* ── Step 3: Tech Access ── */}
      {step === 2 && (
        <div className="grid gap-4">
          <label className="grid gap-1.5">
            <span className={LABEL}>
              Current Website URL{' '}
              <span className="font-normal text-[#1d1d1f]/40">(if any)</span>
            </span>
            <input
              type="url" className={INPUT}
              placeholder={isBusiness ? 'https://mycompany.com' : 'https://gracechurch.org'}
              maxLength={500}
              value={data.current_site_url}
              onChange={e => { set('current_site_url', e.target.value); clearErr('current_site_url') }}
            />
            {errors.current_site_url && <p className={ERR}>{errors.current_site_url}</p>}
          </label>

          <label className="grid gap-1.5">
            <span className={LABEL}>
              Domain Registrar / Hosting Info{' '}
              <span className="font-normal text-[#1d1d1f]/40">(optional)</span>
            </span>
            <textarea
              rows={3} className={TEXTAREA}
              placeholder="e.g. GoDaddy — account email: yourname@email.com"
              maxLength={500}
              value={data.domain_info}
              onChange={e => set('domain_info', e.target.value)}
            />
            <p className="text-[0.68rem] text-[#1d1d1f]/38">
              Never share passwords here — we will arrange secure access separately.
            </p>
          </label>

          <label className="grid gap-1.5">
            <span className={LABEL}>
              {isBusiness ? 'About Your Business' : 'Mission Statement'}{' '}
              <span className="font-normal text-[#1d1d1f]/40">(optional)</span>
            </span>
            <textarea
              rows={4} className={TEXTAREA}
              placeholder={
                isBusiness
                  ? 'Tell us what your business does and who you serve…'
                  : "Share your church's mission or vision in your own words…"
              }
              maxLength={2000}
              value={data.mission_summary}
              onChange={e => set('mission_summary', e.target.value)}
            />
          </label>
        </div>
      )}

      {/* ── Step 4: Features ── */}
      {step === 3 && (
        <div className="grid gap-4">
          <p className="text-sm text-[#1d1d1f]/55">
            Select the features you want on your site. You can always adjust later.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {FEATURES.map(f => {
              const on = data.requested_features.includes(f)
              const isOther = f === 'other'
              return (
                <button
                  key={f} type="button"
                  onClick={() => toggleFeature(f)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    isOther ? 'col-span-2' : ''
                  } ${
                    on
                      ? 'border-[#0071e3]/30 bg-[#0071e3]/10 text-[#0071e3]'
                      : 'border-white/30 bg-white/15 text-[#1d1d1f]/60 hover:bg-white/25'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                      on ? 'border-[#0071e3] bg-[#0071e3]' : 'border-[#1d1d1f]/25'
                    }`}
                  >
                    {on && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <polyline points="1.5 5 4 7.5 8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {isOther ? 'Other — I have something specific in mind' : f}
                </button>
              )
            })}
          </div>

          {data.requested_features.includes('other') && (
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-[#1d1d1f]/75">
                Describe the feature(s) you have in mind
              </span>
              <textarea
                rows={3} className={TEXTAREA}
                placeholder="e.g. A booking system, multilingual support, a custom portal…"
                maxLength={500}
                value={data.other_features_text}
                onChange={e => set('other_features_text', e.target.value)}
              />
            </label>
          )}

          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-7 flex gap-3">
        {step > 0 && (
          <button
            type="button" onClick={back}
            className="h-11 flex-1 rounded-full border border-white/30 bg-white/20 text-sm font-medium text-[#1d1d1f]/60 backdrop-blur-sm transition hover:bg-white/35"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button" onClick={next}
            className="h-11 flex-1 rounded-full bg-[#0071e3] text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
          >
            Continue
          </button>
        ) : (
          <button
            type="button" onClick={submit} disabled={submitting}
            className="h-11 flex-1 rounded-full bg-[#0071e3] text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (editing ? 'Saving…' : 'Submitting…') : (editing ? 'Save changes' : 'Submit intake')}
          </button>
        )}
      </div>
    </div>
  )
}
