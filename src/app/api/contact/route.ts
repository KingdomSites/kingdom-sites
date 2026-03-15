import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { rateLimit, getIP } from '@/lib/rateLimit'

const contactSchema = z.object({
  website: z.string().max(100).optional(), // honeypot
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less')
    .transform(s => s.trim()),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be 255 characters or less')
    .transform(s => s.trim().toLowerCase()),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message must be 2000 characters or less')
    .transform(s => s.trim()),
  topic: z
    .string()
    .max(100)
    .optional()
    .transform(s => s?.trim()),
})

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getIP(req))
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { website, name, email, message, topic } = result.data
  if (website) {
    return NextResponse.json({ success: true }) // silently reject bots
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from('inquiries')
    .insert({ name, email, message, topic: topic ?? null })

  if (error) {
    console.error('Supabase insert error:', error.message)
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }

  // Send email notification via Resend (plug in domain + API key when ready)
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail   = process.env.RESEND_TO_EMAIL

  if (resendKey && fromEmail && toEmail) {
    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: `Kingdom Sites <${fromEmail}>`,
      to: toEmail,
      subject: `New inquiry from ${name}${topic ? ` — ${topic}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}${topic ? `\nTopic: ${topic}` : ''}\n\nMessage:\n${message}`,
    })
  }

  return NextResponse.json({ success: true })
}
