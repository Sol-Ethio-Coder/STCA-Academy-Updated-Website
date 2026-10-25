import { useSyncExternalStore } from 'react'
import { seedCourses, PASS, SEED_VERSION } from './data.js'
import { serverLogin, setCreds } from './codes.js'

const KEY = 'stca-db-v5'
// Local-development fallback only. There are NO built-in credentials: set VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD in a local .env if you want it.
// (read only in development, so these variables can never be copied into the public website code)
const DEV_ADMIN = import.meta.env.DEV ? { email: import.meta.env.VITE_ADMIN_EMAIL || '', pass: import.meta.env.VITE_ADMIN_PASSWORD || '' } : { email: '', pass: '' }
const subs = new Set()
const fresh = () => ({ seedV: SEED_VERSION, courses: seedCourses, progress: {}, unlocked: [], name: '', admin: false })
let db = (() => {
  try {
    const d = JSON.parse(localStorage.getItem(KEY))
    if (d) {
      // New site version: refresh the built-in courses (new lessons, new courses) but keep progress, unlocked courses, name and any courses you created yourself.
      if (d.seedV !== SEED_VERSION) { const ids = new Set(seedCourses.map(c => c.id)); d.courses = [...seedCourses, ...(d.courses || []).filter(c => !ids.has(c.id))]; d.seedV = SEED_VERSION }
      return d
    }
  } catch (e) {}
  return fresh()
})()
const commit = next => { db = next; try { localStorage.setItem(KEY, JSON.stringify(db)) } catch (e) {} subs.forEach(f => f()) }
export const useDB = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f) }, () => db)
export const newId = () => Math.random().toString(36).slice(2, 10)
export const canAccess = (d, c) => c.price === 0 || d.admin || d.unlocked.includes(c.id)

export async function loginAdmin(email, pw) {
  // The password is checked on the server (ADMIN_EMAIL / ADMIN_PASSWORD set in Netlify), never in the browser.
  let last
  try { await serverLogin(email, pw); setCreds(email, pw); commit({ ...db, admin: true }); return } catch (e) { if (e.status === 401) throw new Error('Wrong email or password'); last = e }
  if (import.meta.env.DEV && DEV_ADMIN.email && DEV_ADMIN.pass && email.trim().toLowerCase() === DEV_ADMIN.email.toLowerCase() && pw === DEV_ADMIN.pass) { commit({ ...db, admin: true }); return }
  throw new Error(last?.status === 503 ? 'Admin sign-in is not set up yet. Add ADMIN_EMAIL and ADMIN_PASSWORD in Netlify, then redeploy.' : 'Sign-in is not available right now. Please try again in a moment.')
}
export const logoutAdmin = () => commit({ ...db, admin: false })
export const saveCourse = c => commit({ ...db, courses: db.courses.some(x => x.id === c.id) ? db.courses.map(x => (x.id === c.id ? c : x)) : [...db.courses, c] })
export const deleteCourse = id => commit({ ...db, courses: db.courses.filter(c => c.id !== id) })
export const resetDemo = () => commit({ ...fresh(), admin: true })
export const setName = name => commit({ ...db, name: name.trim() })
export const markUnlocked = cid => commit({ ...db, unlocked: [...new Set([...db.unlocked, cid])] })
export function completeLesson(cid, lid) {
  const p = db.progress[cid] || { done: [] }
  if (p.done.includes(lid)) return
  commit({ ...db, progress: { ...db.progress, [cid]: { ...p, done: [...p.done, lid] } } })
}
export function submitExam(cid, pct) {
  const p = db.progress[cid] || { done: [] }
  const prev = p.exam || { best: 0, passed: false }
  commit({ ...db, progress: { ...db.progress, [cid]: { ...p, exam: { best: Math.max(prev.best, pct), last: pct, passed: prev.passed || pct >= PASS, date: new Date().toISOString() } } } })
}
export function issueCert(cid) {
  const p = db.progress[cid]
  if (!p || p.cert || !db.name || !p.exam?.passed) return
  commit({ ...db, progress: { ...db.progress, [cid]: { ...p, cert: { id: 'STCA-' + newId().toUpperCase(), date: new Date().toISOString(), name: db.name, score: p.exam.best } } } })
}
