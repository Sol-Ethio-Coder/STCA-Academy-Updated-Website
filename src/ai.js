// context = a short text about the live site (courses, prices, current page) that the server adds to the tutor's instructions.
export async function askAI(messages, mode = 'tutor', context = '') {
  const r = await fetch('/.netlify/functions/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages, mode, context }) })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error || 'The AI tutor is not available right now.')
  return j.text
}
