import { NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY

type ContactForm = {
  name: string
  phone: string
  email?: string
  message?: string
}

function formatTelegramMessage({ name, phone, email, message }: ContactForm): string {
  const lines = [
    `<b>Nova wiadomość z formularza PodOS</b>`,
    ``,
    `<b>Imię:</b> ${escapeHtml(name)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
  ]

  if (email?.trim()) {
    lines.push(`<b>Email:</b> ${escapeHtml(email)}`)
  }

  if (message?.trim()) {
    lines.push(`<b>Wiadomość:</b> ${escapeHtml(message)}`)
  }

  return lines.join('\n')
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function sendTelegram(form: ContactForm): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: formatTelegramMessage(form),
      parse_mode: 'HTML',
    }),
    signal: AbortSignal.timeout(10000),
  })

  return res.ok
}

async function sendWeb3Forms(form: ContactForm): Promise<boolean> {
  if (!WEB3FORMS_API_KEY) return false

  const formData = new FormData()
  formData.append('access_key', WEB3FORMS_API_KEY)
  formData.append('name', form.name)
  formData.append('phone', form.phone)
  if (form.email) formData.append('email', form.email)
  if (form.message) formData.append('message', form.message)

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(10000),
  })

  return res.ok
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactForm

    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const [telegramOk, emailOk] = await Promise.allSettled([sendTelegram(body), sendWeb3Forms(body)]).then((results) =>
      results.map((r) => r.status === 'fulfilled' && r.value)
    )

    if (!telegramOk && !emailOk) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
