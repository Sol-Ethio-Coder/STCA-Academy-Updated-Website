import { getStore } from '@netlify/blobs'
import { randomBytes, timingSafeEqual, createHash } from 'node:crypto'

const j = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })
const h = s => createHash('sha256').update(String(s)).digest()
const same = (a, b) => timingSafeEqual(h(a), h(b))
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 32 symbols, no look-alikes (0/O, 1/I)
const part = n => Array.from(randomBytes(n), b => ALPHA[b % ALPHA.length]).join('')

export default async req => {
  if (req.method !== 'POST') return j({ error: 'POST only' }, 405)
  let b
  try { b = await req.json() } catch { return j({ error: 'Bad request' }, 400) }
  const store = getStore('stca-codes')

  // Learners: redeem a one-time code. The first successful redeem burns the code for everyone.
  if (b.action === 'redeem') {
    const code = String(b.code || '').trim().toUpperCase()
    if (!/^STCA-[A-Z0-9-]{8,40}$/.test(code)) return j({ error: 'That code is not valid.' }, 400)
    const got = await store.getWithMetadata(code, { type: 'json' })
    if (!got || got.data?.course !== b.course) return j({ error: 'That code is not valid for this course.' }, 404)
    if (got.data.used) return j({ error: 'This code has already been used.' }, 409)
    const res = await store.setJSON(code, { ...got.data, used: true, usedAt: new Date().toISOString() }, { onlyIfMatch: got.etag })
    if (res && res.modified === false) return j({ error: 'This code has already been used.' }, 409)
    return j({ ok: true })
  }

  // Everything below is admin-only. Credentials live in Netlify environment variables, never in the site code.
  const ae = process.env.ADMIN_EMAIL, ap = process.env.ADMIN_PASSWORD
  if (!ae || !ap) return j({ error: 'Admin is not configured on the server. Set ADMIN_EMAIL and ADMIN_PASSWORD in Netlify.' }, 503)
  if (!same(b.email || '', ae) || !same(b.password || '', ap)) return j({ error: 'Wrong email or password' }, 401)

  if (b.action === 'login') return j({ ok: true })
  if (b.action === 'generate') {
    const n = Math.min(20, Math.max(1, parseInt(b.count) || 1))
    const prefix = String(b.course || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) || 'COURSE'
    const codes = []
    for (let i = 0; i < n; i++) {
      const code = `STCA-${prefix}-${part(4)}-${part(4)}`
      await store.setJSON(code, { course: b.course, label: String(b.label || '').slice(0, 60), created: new Date().toISOString(), used: false })
      codes.push(code)
    }
    return j({ codes })
  }
  if (b.action === 'list') {
    const { blobs } = await store.list()
    const items = await Promise.all(blobs.map(async x => ({ code: x.key, ...(await store.get(x.key, { type: 'json' })) })))
    items.sort((a, c) => String(c.created).localeCompare(String(a.created)))
    return j({ codes: items })
  }
  if (b.action === 'revoke') {
    const code = String(b.code || '').toUpperCase()
    const rec = await store.get(code, { type: 'json' })
    if (rec && !rec.used) await store.delete(code)
    return j({ ok: true })
  }
  return j({ error: 'Unknown action' }, 400)
}
