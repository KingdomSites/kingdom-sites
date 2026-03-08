'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import OnboardingModal from '@/components/OnboardingModal'
import IntakeForm from '@/components/IntakeForm'
import type { User } from '@supabase/supabase-js'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? ''

const STATUS: Record<string, { label: string; color: string }> = {
  in_progress: { label: 'In Progress', color: 'bg-[#0071e3]/15 text-[#0071e3]' },
  review:      { label: 'In Review',   color: 'bg-amber-100/80 text-amber-700' },
  complete:    { label: 'Complete',    color: 'bg-green-100/80 text-green-700' },
}

const TABS = ['Project', 'Messages', 'Meetings', 'Payments', 'Intake']

const TIME_SLOTS = (() => {
  const slots: { label: string; value: string }[] = []
  for (let h = 7; h <= 20; h++) {
    for (const m of [0, 30]) {
      const hour = h % 12 === 0 ? 12 : h % 12
      const period = h < 12 ? 'AM' : 'PM'
      const label = `${hour}:${m === 0 ? '00' : '30'} ${period}`
      const value = `${String(h).padStart(2, '0')}:${m === 0 ? '00' : '30'}`
      slots.push({ label, value })
    }
  }
  return slots
})()

const INPUT = 'h-12 w-full rounded-3xl border border-white/30 bg-white/20 px-5 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4 placeholder:text-[#1d1d1f]/35'
const TEXTAREA = 'w-full resize-none rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4 placeholder:text-[#1d1d1f]/35'
const CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231d1d1f' fill-opacity='.45' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl p-6 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(56px) saturate(200%)',
        WebkitBackdropFilter: 'blur(56px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.22)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 0.5px 0 rgba(255,255,255,0.70)',
      }}
    >
      {children}
    </div>
  )
}

function PillGroup({ options, value, onChange, name }: { options: string[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-2xl border py-2.5 text-sm font-medium transition ${
            value === opt
              ? 'border-[#0071e3]/30 bg-[#0071e3]/12 text-[#0071e3]'
              : 'border-white/30 bg-white/15 text-[#1d1d1f]/65 hover:bg-white/25'
          }`}
        >
          <input type="radio" name={name} value={opt} className="sr-only" checked={value === opt} onChange={() => onChange(opt)} />
          {opt}
        </label>
      ))}
    </div>
  )
}

// ── Admin View ────────────────────────────────────────────────────────────────
type ClientRow = {
  id: string
  name?: string
  email: string
  tech_type?: string
  who_they_are?: string
  description?: string
  created_at: string
  project: ProjectRow | null
}

type ProjectRow = {
  name: string
  status: string
  description?: string
  drive_link?: string
  created_at: string
}

const STATUSES = [
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review',      label: 'In Review'   },
  { value: 'complete',    label: 'Complete'     },
]

function AdminView({ onSignOut }: { onSignOut: () => void }) {
  const [clients, setClients]   = useState<ClientRow[]>([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState<ClientRow | null>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null)

  // Project form state
  const [showForm, setShowForm]       = useState(false)
  const [projName, setProjName]       = useState('')
  const [projStatus, setProjStatus]   = useState('in_progress')
  const [projDesc, setProjDesc]       = useState('')
  const [projDrive, setProjDrive]     = useState('')
  const [projSaving, setProjSaving]   = useState(false)
  const [projError, setProjError]     = useState('')

  useEffect(() => {
    async function load() {
      const [{ data: profiles }, { data: projects }] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*'),
      ])
      const merged = ((profiles ?? []) as ClientRow[]).map((p) => ({
        ...p,
        project: ((projects ?? []) as ProjectRow[]).find((pr: any) => pr.client_email === p.email) ?? null,
      }))
      setClients(merged)
      setLoading(false)
    }
    load()
  }, [])

  const techCounts = clients.reduce<Record<string, number>>((acc, c) => {
    const t = c.tech_type ?? 'Unknown'
    acc[t] = (acc[t] ?? 0) + 1
    return acc
  }, {})

  const handleSelect = (client: ClientRow) => {
    if (selected?.id === client.id) { setSelected(null); setSelectedProject(null); setShowForm(false); return }
    setSelected(client)
    setSelectedProject(client.project)
    setShowForm(false)
  }

  const openForm = (proj: ProjectRow | null) => {
    setProjName(proj?.name ?? '')
    setProjStatus(proj?.status ?? 'in_progress')
    setProjDesc(proj?.description ?? '')
    setProjDrive(proj?.drive_link ?? '')
    setProjError('')
    setShowForm(true)
  }

  const saveProject = async () => {
    if (!selected || !projName.trim()) { setProjError('Project name is required.'); return }
    setProjSaving(true)
    setProjError('')

    const payload = {
      name:         projName.trim(),
      status:       projStatus,
      description:  projDesc.trim() || null,
      drive_link:   projDrive.trim() || null,
      client_email: selected.email,
    }

    const { error } = selectedProject
      ? await supabase.from('projects').update(payload).eq('client_email', selected.email)
      : await supabase.from('projects').insert(payload)

    setProjSaving(false)
    if (error) { setProjError(error.message); return }

    // Update local state
    const updated: ProjectRow = {
      name:        payload.name,
      status:      payload.status,
      description: payload.description ?? undefined,
      drive_link:  payload.drive_link  ?? undefined,
      created_at:  selectedProject?.created_at ?? new Date().toISOString(),
    }
    setSelectedProject(updated)
    setClients(prev => prev.map(c =>
      c.id === selected.id ? { ...c, project: updated } : c
    ))
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-[#1d1d1f]/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            Admin
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">All Clients</h1>
        </div>
        <button
          onClick={onSignOut}
          className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-medium text-[#1d1d1f]/60 backdrop-blur-sm transition hover:bg-white/35"
        >
          Sign out
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <GlassCard className="!p-4">
          <p className="text-xs text-[#1d1d1f]/45 mb-1">Total clients</p>
          <p className="text-2xl font-semibold">{clients.length}</p>
        </GlassCard>
        {Object.entries(techCounts).map(([type, count]) => (
          <GlassCard key={type} className="!p-4">
            <p className="text-xs text-[#1d1d1f]/45 mb-1 truncate">{type}</p>
            <p className="text-2xl font-semibold">{count}</p>
          </GlassCard>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-[#1d1d1f]/50">Loading clients…</p>
      ) : clients.length === 0 ? (
        <GlassCard>
          <p className="text-sm text-[#1d1d1f]/55 text-center py-4">No clients yet.</p>
        </GlassCard>
      ) : (
        <div className="grid gap-3">
          {clients.map((client) => (
            <div key={client.id}>
              <button onClick={() => handleSelect(client)} className="w-full text-left">
                <GlassCard className={`transition hover:bg-white/20 ${selected?.id === client.id ? 'ring-2 ring-[#0071e3]/30' : ''}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{client.name ?? '—'}</p>
                      <p className="text-sm text-[#1d1d1f]/55 truncate">{client.email}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {client.tech_type && (
                        <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-[#1d1d1f]/60">
                          {client.tech_type}
                        </span>
                      )}
                      {client.project && (
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS[client.project.status]?.color ?? STATUS.in_progress.color}`}>
                          {STATUS[client.project.status]?.label ?? client.project.status.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                        </span>
                      )}
                      <svg
                        className={`h-4 w-4 text-[#1d1d1f]/30 transition-transform ${selected?.id === client.id ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </GlassCard>
              </button>

              {selected?.id === client.id && (
                <div className="mt-2 ml-2 grid gap-3">
                  <GlassCard>
                    <h3 className="mb-3 text-sm font-semibold text-[#1d1d1f]/70">Profile</h3>
                    <dl className="grid gap-2 text-sm">
                      {[
                        ['Name', client.name ?? '—'],
                        ['Email', client.email],
                        ['Role', client.who_they_are ?? '—'],
                        ['Needs', client.tech_type ?? '—'],
                        ['Description', client.description ?? '—'],
                        ['Joined', new Date(client.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
                      ].map(([dt, dd]) => (
                        <div key={dt} className="flex gap-2">
                          <dt className="text-[#1d1d1f]/45 w-28 shrink-0">{dt}</dt>
                          <dd className="text-[#1d1d1f]/70">{dd}</dd>
                        </div>
                      ))}
                    </dl>
                  </GlassCard>

                  <GlassCard>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#1d1d1f]/70">Project</h3>
                      {!showForm && (
                        <button
                          onClick={() => openForm(selectedProject)}
                          className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-[#1d1d1f]/60 transition hover:bg-white/35"
                        >
                          {selectedProject ? 'Edit' : 'Set up project'}
                        </button>
                      )}
                    </div>

                    {showForm ? (
                      <div className="grid gap-3">
                        <label className="grid gap-1 text-sm">
                          <span className="font-medium text-[#1d1d1f]/70">Project name *</span>
                          <input
                            type="text" value={projName} onChange={e => setProjName(e.target.value)}
                            placeholder="Grace Community Church Website" maxLength={150}
                            className={INPUT}
                          />
                        </label>

                        <label className="grid gap-1 text-sm">
                          <span className="font-medium text-[#1d1d1f]/70">Status</span>
                          <select
                            value={projStatus} onChange={e => setProjStatus(e.target.value)}
                            className="h-12 w-full appearance-none rounded-3xl border border-white/30 bg-white/20 px-5 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                            style={{ backgroundImage: CHEVRON, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center' }}
                          >
                            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </select>
                        </label>

                        <label className="grid gap-1 text-sm">
                          <span className="font-medium text-[#1d1d1f]/70">Notes <span className="font-normal text-[#1d1d1f]/40">(optional)</span></span>
                          <textarea
                            rows={3} value={projDesc} onChange={e => setProjDesc(e.target.value)}
                            placeholder="Brief description of the project scope…" maxLength={1000}
                            className={TEXTAREA}
                          />
                        </label>

                        <label className="grid gap-1 text-sm">
                          <span className="font-medium text-[#1d1d1f]/70">Google Drive link <span className="font-normal text-[#1d1d1f]/40">(optional)</span></span>
                          <input
                            type="url" value={projDrive} onChange={e => setProjDrive(e.target.value)}
                            placeholder="https://drive.google.com/drive/folders/…" maxLength={500}
                            className={INPUT}
                          />
                        </label>

                        {projError && <p className="text-xs text-red-500">{projError}</p>}

                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowForm(false)}
                            className="h-10 flex-1 rounded-full border border-white/30 bg-white/20 text-sm font-medium text-[#1d1d1f]/60 transition hover:bg-white/35"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveProject} disabled={projSaving}
                            className="h-10 flex-1 rounded-full bg-[#0071e3] text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60"
                          >
                            {projSaving ? 'Saving…' : selectedProject ? 'Save changes' : 'Create project'}
                          </button>
                        </div>
                      </div>
                    ) : selectedProject ? (
                      <dl className="grid gap-2 text-sm">
                        <div className="flex gap-2">
                          <dt className="text-[#1d1d1f]/45 w-28 shrink-0">Name</dt>
                          <dd className="font-medium">{selectedProject.name}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-[#1d1d1f]/45 w-28 shrink-0">Status</dt>
                          <dd>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS[selectedProject.status]?.color ?? STATUS.in_progress.color}`}>
                              {STATUS[selectedProject.status]?.label ?? selectedProject.status}
                            </span>
                          </dd>
                        </div>
                        {selectedProject.description && (
                          <div className="flex gap-2">
                            <dt className="text-[#1d1d1f]/45 w-28 shrink-0">Notes</dt>
                            <dd className="text-[#1d1d1f]/70">{selectedProject.description}</dd>
                          </div>
                        )}
                        {selectedProject.drive_link && (
                          <div className="flex gap-2">
                            <dt className="text-[#1d1d1f]/45 w-28 shrink-0">Drive</dt>
                            <dd><a href={selectedProject.drive_link} target="_blank" rel="noopener noreferrer" className="text-[#0071e3] underline text-xs">Open folder</a></dd>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <dt className="text-[#1d1d1f]/45 w-28 shrink-0">Started</dt>
                          <dd>{new Date(selectedProject.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</dd>
                        </div>
                      </dl>
                    ) : (
                      <p className="text-sm text-[#1d1d1f]/45 py-1">No project yet — click "Set up project" to create one.</p>
                    )}
                  </GlassCard>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Client Dashboard ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const [user, setUser]               = useState<User | null>(null)
  const [project, setProject]         = useState<ProjectRow | null>(null)
  const [profile, setProfile]         = useState<any>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [loading, setLoading]         = useState(true)
  const [tab, setTab]                 = useState('Project')
  const router = useRouter()

  const [msgSubmitted, setMsgSubmitted] = useState(false)
  const [msgSending, setMsgSending]     = useState(false)
  const msgFormRef = useRef<HTMLFormElement>(null)

  const [mtgDate, setMtgDate]         = useState('')
  const [mtgTime, setMtgTime]         = useState('')
  const [mtgPlatform, setMtgPlatform] = useState('Zoom')
  const [mtgTopic, setMtgTopic]       = useState('Development')
  const [mtgNotes, setMtgNotes]       = useState('')
  const [mtgSubmitted, setMtgSubmitted] = useState(false)
  const [mtgSending, setMtgSending]   = useState(false)
  const mtgFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.replace('/login'); return }
      const u = data.session.user
      setUser(u)

      if (u.email === ADMIN_EMAIL) { setLoading(false); return }

      const [{ data: proj }, { data: prof, error: profErr }] = await Promise.all([
        supabase.from('projects').select('*').eq('client_email', u.email).maybeSingle(),
        supabase.from('profiles').select('*').eq('id', u.id).maybeSingle(),
      ])
      setProject(proj)
      setProfile(prof)
      if (!profErr && (!prof || !prof.onboarding_complete)) setShowOnboarding(true)
      setLoading(false)
    })
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100dvh-120px)] items-center justify-center text-sm text-[#1d1d1f]/50">
        Loading…
      </div>
    )
  }

  if (user?.email === ADMIN_EMAIL) {
    return <AdminView onSignOut={signOut} />
  }

  const displayName = profile?.name ?? user?.email?.split('@')[0] ?? ''

  return (
    <>
      {showOnboarding && user && (
        <OnboardingModal
          user={user}
          onComplete={(prof) => { setProfile(prof); setShowOnboarding(false) }}
        />
      )}

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-[#1d1d1f]/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
              Client portal
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back{displayName ? `, ${displayName}` : ''}.
            </h1>
          </div>
          <button
            onClick={signOut}
            className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-medium text-[#1d1d1f]/60 backdrop-blur-sm transition hover:bg-white/35"
          >
            Sign out
          </button>
        </div>

        {/* Mobile: 2×2 grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:hidden">
          {[
            { t: 'Project',  icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5"/><path d="M7 11h8M7 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { t: 'Messages', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7l-4 3V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
            { t: 'Meetings', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9h16" stroke="currentColor" strokeWidth="1.5"/><path d="M8 2v3M14 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 13h2v2H7z" fill="currentColor" opacity=".6"/><path d="M10 13h2v2h-2z" fill="currentColor" opacity=".6"/></svg> },
            { t: 'Payments', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 9h18" stroke="currentColor" strokeWidth="1.5"/><path d="M6 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { t: 'Intake',   icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 8h8M7 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 15l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          ].map(({ t, icon }) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex flex-col items-center justify-center gap-2 rounded-3xl py-5 text-xs font-medium transition ${t === 'Intake' ? 'col-span-2' : ''} ${tab === t ? 'text-[#0071e3]' : 'text-[#1d1d1f]/55'}`}
              style={{
                background: tab === t ? 'rgba(0,113,227,0.10)' : 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                border: tab === t ? '1px solid rgba(0,113,227,0.20)' : '1px solid rgba(255,255,255,0.28)',
              }}
            >
              {icon}
              {t}
            </button>
          ))}
        </div>

        {/* Desktop: tab bar */}
        <div
          className="mb-6 hidden sm:flex gap-1 rounded-2xl p-1"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.28)',
          }}
        >
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
                tab === t ? 'bg-white/70 text-[#1d1d1f] shadow-sm backdrop-blur-sm' : 'text-[#1d1d1f]/50 hover:text-[#1d1d1f]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Project */}
        {tab === 'Project' && (
          <GlassCard>
            {project ? (
              <div className="grid gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold tracking-tight">{project.name}</h2>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS[project.status]?.color ?? STATUS.in_progress.color}`}>
                    {STATUS[project.status]?.label ?? project.status.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                  </span>
                </div>
                {project.description && (
                  <p className="text-sm leading-relaxed text-[#1d1d1f]/70">{project.description}</p>
                )}
                <p className="text-xs text-[#1d1d1f]/38">
                  Started {new Date(project.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="mt-2 border-t border-white/20 pt-4">
                  <h3 className="mb-2 text-sm font-semibold">Project Files</h3>
                  {project.drive_link ? (
                    <div className="grid gap-3">
                      <p className="text-sm text-[#1d1d1f]/60">
                        Upload documents, photos, or any files for your project directly to our shared folder.
                      </p>
                      <a
                        href={project.drive_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0071e3]/30 bg-[#0071e3]/10 px-5 py-2.5 text-sm font-medium text-[#0071e3] transition hover:bg-[#0071e3]/20"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        Open Upload Folder
                      </a>
                      <p className="text-xs text-[#1d1d1f]/38">Opens Google Drive — drag and drop your files there.</p>
                    </div>
                  ) : (
                    <p className="text-sm text-[#1d1d1f]/45">
                      Your file upload folder will appear here once your project manager sets it up.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="text-sm font-medium">No project found</p>
                <p className="mt-1 text-sm text-[#1d1d1f]/55">Your project will appear here once it&apos;s been set up.</p>
              </div>
            )}
          </GlassCard>
        )}

        {/* Messages */}
        {tab === 'Messages' && (
          <GlassCard>
            <h2 className="mb-4 text-base font-semibold tracking-tight">Send a message</h2>
            {msgSubmitted ? (
              <div className="rounded-2xl border border-[#0071e3]/20 bg-[#0071e3]/8 p-5 text-center">
                <p className="text-sm font-semibold">Message sent!</p>
                <p className="mt-1 text-sm text-[#1d1d1f]/60">I&apos;ll reply as soon as I can.</p>
                <button onClick={() => setMsgSubmitted(false)} className="mt-3 text-xs text-[#0071e3]">Send another</button>
              </div>
            ) : (
              <form ref={msgFormRef} className="grid gap-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setMsgSending(true)
                  await fetch('/api/message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      clientEmail: user?.email ?? '',
                      message: (new FormData(e.currentTarget)).get('message') as string,
                    }),
                  })
                  setMsgSending(false)
                  setMsgSubmitted(true)
                  msgFormRef.current?.reset()
                }}
              >
                <label className="grid gap-1 text-sm">
                  <span className="font-medium text-[#1d1d1f]/75">Message</span>
                  <textarea required name="message" rows={5} className={TEXTAREA} placeholder="Ask a question or share an update…" />
                </label>
                <button type="submit" disabled={msgSending}
                  className="h-11 rounded-full bg-[#0071e3] text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60"
                >
                  {msgSending ? 'Sending…' : 'Send'}
                </button>
              </form>
            )}
          </GlassCard>
        )}

        {/* Meetings */}
        {tab === 'Meetings' && (
          <GlassCard>
            <h2 className="mb-5 text-base font-semibold tracking-tight">Book a meeting</h2>
            {mtgSubmitted ? (
              <div className="rounded-2xl border border-[#0071e3]/20 bg-[#0071e3]/8 p-5 text-center">
                <p className="text-sm font-semibold">Meeting request sent!</p>
                <p className="mt-1 text-sm text-[#1d1d1f]/60">I&apos;ll confirm the time as soon as I can.</p>
                <button onClick={() => setMtgSubmitted(false)} className="mt-3 text-xs text-[#0071e3]">Book another</button>
              </div>
            ) : (
              <form ref={mtgFormRef} className="grid gap-5"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setMtgSending(true)
                  await fetch('/api/meeting', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      clientEmail: user?.email ?? '',
                      date: mtgDate,
                      time: mtgTime,
                      platform: mtgPlatform,
                      topic: mtgTopic,
                      notes: mtgNotes,
                    }),
                  })
                  setMtgSending(false)
                  setMtgSubmitted(true)
                  mtgFormRef.current?.reset()
                  setMtgDate(''); setMtgTime(''); setMtgPlatform('Zoom'); setMtgTopic('Development'); setMtgNotes('')
                }}
              >

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-sm">
                    <span className="font-medium text-[#1d1d1f]/75">Date</span>
                    <input required type="date" name="date" className={INPUT}
                      value={mtgDate} onChange={(e) => setMtgDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-medium text-[#1d1d1f]/75">Time</span>
                    <select
                      required name="time" value={mtgTime}
                      onChange={(e) => setMtgTime(e.target.value)}
                      className="h-12 w-full appearance-none rounded-3xl border border-white/30 bg-white/20 px-5 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                      style={{ backgroundImage: CHEVRON, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center' }}
                    >
                      <option value="" disabled>Select a time</option>
                      {TIME_SLOTS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-1 text-sm">
                  <span className="font-medium text-[#1d1d1f]/75">Where / how</span>
                  <PillGroup options={['Zoom', 'WhatsApp']} value={mtgPlatform} onChange={setMtgPlatform} name="platform" />
                </div>

                <div className="grid gap-1 text-sm">
                  <span className="font-medium text-[#1d1d1f]/75">Topic</span>
                  <select
                    name="topic" value={mtgTopic} onChange={(e) => setMtgTopic(e.target.value)}
                    className="h-12 w-full appearance-none rounded-3xl border border-white/30 bg-white/20 px-5 text-sm backdrop-blur-sm outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                    style={{ backgroundImage: CHEVRON, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center' }}
                  >
                    <option value="Development">Development</option>
                    <option value="Bug Fix">Bug Fix</option>
                    <option value="Payment">Payment</option>
                  </select>
                </div>

                <label className="grid gap-1 text-sm">
                  <span className="font-medium text-[#1d1d1f]/75">Notes <span className="font-normal text-[#1d1d1f]/40">(optional)</span></span>
                  <textarea name="notes" rows={3} className={TEXTAREA}
                    placeholder="Anything I should know beforehand…"
                    value={mtgNotes} onChange={(e) => setMtgNotes(e.target.value)}
                  />
                </label>

                <button type="submit" disabled={mtgSending}
                  className="h-11 rounded-full bg-[#0071e3] text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60"
                >
                  {mtgSending ? 'Sending…' : 'Request meeting'}
                </button>
              </form>
            )}
          </GlassCard>
        )}

        {/* Intake */}
        {tab === 'Intake' && user && (
          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold tracking-tight">Client Intake</h2>
              <p className="mt-0.5 text-sm text-[#1d1d1f]/55">
                Share your church's details so we can build exactly what you need.
              </p>
            </div>
            <IntakeForm user={user} />
          </div>
        )}

        {/* Payments */}
        {tab === 'Payments' && (
          <div className="grid gap-4">
            <div className="rounded-2xl border border-black/8 bg-white/60 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-[#1d1d1f]/40 mb-1">One-time</p>
              <p className="text-lg font-semibold tracking-tight mb-0.5">$499 — Website Build</p>
              <p className="text-sm text-[#1d1d1f]/55 mb-4">Custom-designed site, fully handed off.</p>
              <a
                href="https://paypal.me/thomasklein690/499"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Pay via PayPal — $499
              </a>
            </div>

            <div className="rounded-2xl border border-black/8 bg-white/60 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-[#1d1d1f]/40 mb-1">Monthly</p>
              <p className="text-lg font-semibold tracking-tight mb-0.5">$50/mo — Care Plan</p>
              <p className="text-sm text-[#1d1d1f]/55 mb-4">Unlimited updates. Cancel any time. First month free.</p>
              <a
                href="https://paypal.me/thomasklein690/50"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#0071e3] px-5 py-2.5 text-sm font-semibold text-[#0071e3] transition hover:bg-[#0071e3] hover:text-white"
              >
                Pay via PayPal — $50/mo
              </a>
            </div>

            <p className="text-xs text-center text-[#1d1d1f]/35">Payments go directly to Thomas via PayPal.</p>
          </div>
        )}
      </div>
    </>
  )
}
