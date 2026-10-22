import { getStore } from '@netlify/blobs'
import { randomBytes, timingSafeEqual, createHash } from 'node:crypto'

// Contact-page requests: visitors submit; the owner reads them in Admin > Requests and (optionally) gets an instant Telegram message.
const j = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })
const sha = s => createHash('sha256').update(String(s)).digest()
const same = (a, b) => timingSafeEqual(sha(a), sha(b))
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const part = n => Array.from(randomBytes(n), b => ALPHA[b % ALPHA.length]).join('')
const clean = (v, n) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n)
const pick = (v, list, d) => (list.includes(v) ? v : d)

async function notify(r) {
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID
  if (!token || !chat) return
  const text = [`📩 New STCA request ${r.id}`, '', `Name: ${r.name}`, `Contact: ${r.contact}`, r.email && `Email: ${r.email}`, `Course: ${r.course}`, `For: ${r.who}${r.age ? ` (${r.age})` : ''} · ${r.mode}`, r.time && `Best time: ${r.time}`, r.message && `\n${r.message}`].filter(Boolean).join('\n')
  try { await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text }) }) } catch (e) {}
}

export default async (req, context) => {
  if (req.method !== 'POST') return j({ error: 'POST only' }, 405)
  let b
  try { b = await req.json() } catch { return j({ error: 'Bad request' }, 400) }
  const store = getStore('stca-requests')

  // ---- Public: a visitor sends a request ----
  if (b.action === 'submit') {
    const fake = () => j({ ok: true, id: 'REQ-' + part(6) })
    if (b.website) return fake()                        // hidden honeypot field filled in: a bot
    if ((Number(b.elapsed) || 0) < 2000) return fake()   // submitted in under 2 seconds: a bot
    const name = clean(b.name, 80), contact = clean(b.contact, 80), email = clean(b.email, 120)
    if (name.length < 2) return j({ error: 'Please enter your name.' }, 400)
    if (contact.length < 5) return j({ error: 'Please enter a phone number or Telegram username so we can reach you.' }, 400)
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return j({ error: 'That email address does not look right. Fix it or leave it empty.' }, 400)

    // Abuse limit: 5 requests per visitor per hour.
    const rl = getStore('stca-ratelimit')
    const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || 'unknown'
    const rk = sha(ip).toString('hex').slice(0, 16) + '-' + new Date().toISOString().slice(0, 13)
    const used = Number(await rl.get(rk)) || 0
    if (used >= 5) return j({ error: 'Too many requests from your device. Please try again later or message us on Telegram.' }, 429)
    await rl.set(rk, String(used + 1))

    const id = 'REQ-' + part(6), created = new Date().toISOString()
    const rec = { key: created.replace(/[^0-9]/g, '') + '-' + id, id, created, status: 'new', name, contact, email,
      course: clean(b.course, 80) || 'Not sure yet', who: pick(b.who, ['myself', 'child', 'other'], 'myself'), age: clean(b.age, 40),
      mode: pick(b.mode, ['online', 'in-person', 'not-sure'], 'not-sure'), time: clean(b.time, 80), message: clean(b.msg, 1500) }
    await store.setJSON(rec.key, rec)
    await notify(rec)
    return j({ ok: true, id })
  }

  // ---- Admin only ----
  const ae = process.env.ADMIN_EMAIL, ap = process.env.ADMIN_PASSWORD
  if (!ae || !ap) return j({ error: 'Admin is not configured on the server. Set ADMIN_EMAIL and ADMIN_PASSWORD in Netlify.' }, 503)
  if (!same(b.email || '', ae) || !same(b.password || '', ap)) return j({ error: 'Wrong email or password' }, 401)

  if (b.action === 'list') {
    const { blobs } = await store.list()
    const items = (await Promise.all(blobs.map(x => store.get(x.key, { type: 'json' })))).filter(Boolean)
    items.sort((a, c) => String(c.created).localeCompare(String(a.created)))
    return j({ requests: items.slice(0, 200) })
  }
  if (b.action === 'update') {
    const rec = await store.get(clean(b.key, 60), { type: 'json' })
    if (!rec) return j({ error: 'Request not found' }, 404)
    if (['new', 'contacted', 'done'].includes(b.status)) rec.status = b.status
    await store.setJSON(rec.key, rec)
    return j({ ok: true })
  }
  if (b.action === 'delete') { await store.delete(clean(b.key, 60)); return j({ ok: true }) }
  return j({ error: 'Unknown action' }, 400)
}
