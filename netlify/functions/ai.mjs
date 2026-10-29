const KB = `ABOUT STCA
Sol Tutoring & Coding Academy (STCA) is in Addis Ababa, Ethiopia. It offers 1:1 tutoring, online and in person, for all ages: Python, Web Development, Scratch (for kids), Mathematics (Grade 5-12), Digital Literacy and National Exam Preparation (Grade 6, 8, 12). Tutoring is paid per hour with no packages; a session is about 1 hour; students can pause or switch courses. A free 15-minute intro call is available. Online sessions need a laptop or desktop with stable internet. To reschedule or cancel, message STCA as early as possible.
CONTACT: Phone (+251) 901 436 358. Email solash5156@gmail.com. Telegram @Sol_Ethio_Coder. YouTube @stcaAcademy. The Contact page (/html/contact) has a request form and a registration form. STCA usually replies within a few hours.
ONLINE LEARNING (/learn): self-paced interactive courses with lessons, quizzes, coding tasks, a capstone project and a final exam. No student account is needed; progress is saved in the browser. Free courses are open to everyone. For paid courses, lesson 1 is a free preview; after paying through Telegram the student receives a personal one-time access code that unlocks the course (a code works only once). Certificate: finish every lesson, score 70% or more on the final exam, then enter your name and download or print the certificate.
EXTRA: The STCA Platform (https://stca-platform.vercel.app) is another version of the site. The website was built by Sol Ethio Coder.`

const tutorSys = ctx => `You are the STCA AI Tutor, the friendly assistant of Sol Tutoring & Coding Academy.
You do two jobs: (1) answer questions about STCA using ONLY the facts below, and (2) tutor students in coding (Python, C++, web, JavaScript, Scratch), computer science, computing for Years 10 to 12 (GCSE / IGCSE and A-level style), AI basics, math, English grammar, digital fluency, time management (Pomodoro Technique), digital skills and exam study.
Rules:
- Be warm, clear and short (under 180 words). Use simple steps and small examples. Reply in the language the student writes in (English or Amharic).
- For homework, guide with hints and questions first; give full solutions only when the student is stuck after trying.
- Never invent prices, discounts, schedules, availability or promises. If something is not in the facts, say you are not sure and suggest messaging STCA on Telegram (@Sol_Ethio_Coder) or using the Contact page.
- Prices for online courses and tutoring come from the live data below; quote them exactly as given.
- Keep everything safe and appropriate for children and teenagers. Do not ask for or store personal details.
- Stay on topic: STCA, learning and study help. Politely decline unrelated requests.

${KB}

LIVE SITE DATA (from the website right now): ${ctx || 'not available'}`

const SYS_JSON = 'You write beginner course content. Return only valid JSON, no markdown.'
const j = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } })

// Groq retires models every few months (llama-3.3-70b-versatile shut down on 16 Aug 2026), so we never trust one hard-coded name:
// 1) use GROQ_MODEL if you set a current one, 2) else a good default, 3) if Groq says the model is gone, ask Groq which models exist and pick one.
const GROQ = 'https://api.groq.com/openai/v1'
const DEAD = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant']
const PREFER = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.6-27b']
const BAD = /whisper|guard|tts|playai|orpheus|embed|safeguard|compound|vision|distil/i
let found = null

async function pickModel(key) {
  if (found) return found
  const r = await fetch(`${GROQ}/models`, { headers: { Authorization: `Bearer ${key}` } })
  const d = await r.json().catch(() => ({}))
  const ids = (d.data || []).filter(m => m.active !== false).map(m => m.id).filter(id => !BAD.test(id))
  found = PREFER.find(p => ids.includes(p)) || ids.find(id => /gpt-oss|qwen|llama/i.test(id)) || ids[0] || null
  return found
}
async function groq(key, model, msgs, mode, system) {
  const body = { model, messages: [{ role: 'system', content: system }, ...msgs], max_tokens: mode === 'json' ? 3500 : 1200 }
  if (model.startsWith('openai/gpt-oss')) body.reasoning_effort = 'low'
  const r = await fetch(`${GROQ}/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(body) })
  return { ok: r.ok, d: await r.json().catch(() => ({})) }
}

export default async req => {
  if (req.method !== 'POST') return j({ error: 'POST only' }, 405)
  let body
  try { body = await req.json() } catch { return j({ error: 'Bad request' }, 400) }
  const mode = body.mode === 'json' ? 'json' : 'tutor'
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 2000),
  }))
  if (!msgs.length || msgs[0].role !== 'user') return j({ error: 'Bad messages' }, 400)
  const system = mode === 'json' ? SYS_JSON : tutorSys(String(body.context || '').slice(0, 1600))

  if (process.env.GROQ_API_KEY) {
    const key = process.env.GROQ_API_KEY
    const envModel = process.env.GROQ_MODEL && !DEAD.includes(process.env.GROQ_MODEL) ? process.env.GROQ_MODEL : null
    const first = found || envModel || PREFER[0]
    let res = await groq(key, first, msgs, mode, system)
    if (!res.ok && /model|decommission|does not exist|access/i.test(res.d?.error?.message || '')) {
      const alt = await pickModel(key)
      if (alt && alt !== first) res = await groq(key, alt, msgs, mode, system)
    } else if (res.ok) found = first
    if (!res.ok) return j({ error: res.d?.error?.message || 'AI request failed' }, 502)
    return j({ text: res.d?.choices?.[0]?.message?.content || 'Sorry, I could not come up with an answer. Please try again.' })
  }

  if (process.env.GEMINI_API_KEY) {
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite'
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: msgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        generationConfig: { maxOutputTokens: mode === 'json' ? 3500 : 1200 },
      }),
    })
    const d = await r.json().catch(() => ({}))
    if (!r.ok) return j({ error: d?.error?.message || 'AI request failed' }, 502)
    return j({ text: (d?.candidates?.[0]?.content?.parts || []).map(p => p.text).join('') })
  }
  return j({ error: 'AI is not configured yet (set GROQ_API_KEY or GEMINI_API_KEY)' }, 503)
}
