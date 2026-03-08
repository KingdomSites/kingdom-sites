import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  clientEmail: z.string().email().max(255).transform(s => s.trim().toLowerCase()),
  date:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date'),
  time:        z.string().max(20).transform(s => s.trim()),
  platform:    z.enum(['Zoom', 'WhatsApp']),
  topic:       z.enum(['Development', 'Bug Fix', 'Payment']),
  notes:       z.string().max(1000).optional().transform(s => s?.trim()),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const { clientEmail, date, time, platform, topic, notes } = result.data
  const toEmail   = process.env.RESEND_TO_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const resendKey = process.env.RESEND_API_KEY

  if (resendKey && fromEmail && toEmail) {
    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: `Kingdom Sites <${fromEmail}>`,
      to: toEmail,
      subject: `Meeting request from: ${clientEmail}`,
      text: [
        `From:     ${clientEmail}`,
        `Date:     ${date}`,
        `Time:     ${time}`,
        `Platform: ${platform}`,
        `Topic:    ${topic}`,
        notes ? `\nNotes:\n${notes}` : '',
      ].join('\n'),
    })
  }

  return NextResponse.json({ success: true })
}
