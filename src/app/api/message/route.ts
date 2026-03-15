import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { rateLimit, getIP } from '@/lib/rateLimit'

const schema = z.object({
  clientEmail: z.string().email().max(255).transform(s => s.trim().toLowerCase()),
  message:     z.string().min(1).max(2000).transform(s => s.trim()),
})

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getIP(req))
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const { clientEmail, message } = result.data
  const toEmail   = process.env.RESEND_TO_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const resendKey = process.env.RESEND_API_KEY

  if (resendKey && fromEmail && toEmail) {
    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: `Kingdom Sites <${fromEmail}>`,
      to: toEmail,
      subject: `Message from client: ${clientEmail}`,
      text: `From: ${clientEmail}\n\nMessage:\n${message}`,
    })
  }

  return NextResponse.json({ success: true })
}
