import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const P = 'btn btn-primary'
export const G = 'btn btn-ghost'
export const slugOf = c => c.slug || `${c.id}-course`
const PATHS = {
  check: 'M5 12.5l4.5 4.5L19 7', arrow: 'M5 12h14M13 6l6 6-6 6', code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6', coin: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v10M15 9.5c0-1-1.3-1.5-3-1.5s-3 .7-3 1.8c0 2.4 6 1.2 6 3.7 0 1.1-1.3 1.8-3 1.8s-3-.5-3-1.6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z', mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  sun: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z', spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5', lock: 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z', pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  menu: 'M4 7h16M4 12h16M4 17h16', ext: 'M7 17L17 7M8 7h9v9', close: 'M6 6l12 12M18 6L6 18',
}
const FILLED = {
  tg: 'M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.6 13 1.9 11.5c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3z',
  yt: 'M22 8.2c-.2-1-1-1.7-1.9-1.9C18.4 6 12 6 12 6s-6.4 0-8.1.3C3 6.5 2.2 7.2 2 8.2 1.7 9.9 1.7 12 1.7 12s0 2.1.3 3.8c.2 1 1 1.7 1.9 1.9C5.6 18 12 18 12 18s6.4 0 8.1-.3c.9-.2 1.7-.9 1.9-1.9.3-1.7.3-3.8.3-3.8s0-2.1-.3-3.8zM10 15V9l5.2 3z',
  quote: 'M7 7h4v4c0 3-1.5 5-4 6l-.8-1.4C7.6 14.8 8 13.8 8 12.5H7zM15 7h4v4c0 3-1.5 5-4 6l-.8-1.4c1.4-.8 1.8-1.8 1.8-3.1h-1z',
}
export const Icon = ({ n, className = 'h-5 w-5' }) => FILLED[n]
  ? <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d={FILLED[n]} /></svg>
  : <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PATHS[n]} /></svg>

export const Logo = ({ size = 40 }) => (
  <span className="flex items-center gap-2.5">
    <img src="/Images/logo-mark.svg" alt="" width={size} height={size} />
    <span className="leading-none"><span className="block font-display text-xl font-bold">STCA</span><span className="hidden text-[11px] font-medium text-muted sm:block">Sol Tutoring &amp; Coding Academy</span></span>
  </span>
)
// Shows your original photo. If the file is missing, a colorful built-in cover is shown instead (never a broken image).
const ART = { web: ['#7c3aed', '#2b59ff', '</>'], math: ['#059669', '#14b8a6', '∑'], python: ['#1d4ed8', '#0ea5e9', 'py'], scratch: ['#f97316', '#facc15', '{ }'], digital: ['#0f766e', '#22c55e', 'www'], exam: ['#be123c', '#f97316', 'A+'], js: ['#ca8a04', '#f59e0b', 'JS'], cpp: ['#1e3a8a', '#2563eb', 'C++'], ai: ['#7c3aed', '#06b6d4', 'AI'], cs: ['#0f766e', '#1d4ed8', '01'], english: ['#e11d48', '#f59e0b', 'Aa'] }
export function CourseImg({ c, src, className }) {
  const [bad, setBad] = useState(false)
  const a = ART[c.id] || ['#334155', '#6366f1', '★']
  if (bad) return <div role="img" aria-label={c.title} className={`${className} flex items-center justify-center overflow-hidden`} style={{ background: `linear-gradient(135deg,${a[0]},${a[1]})` }}><span className="font-display text-6xl font-bold text-white/95 drop-shadow-lg">{a[2]}</span></div>
  return <img src={src || c.img} alt={c.title} loading="lazy" className={className} onError={() => setBad(true)} />
}
export function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = t => { const k = Math.min(1, (t - t0) / 1200); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}
export const chipOf = c => (c.tutorPrice ? `${c.tutorPrice} Birr / hr` : c.price > 0 ? `${c.price} ETB` : 'Free')
export function CourseCard({ c, src, to, text }) {
  return (
    <article className="card card-hover group h-full overflow-hidden">
      <Link to={to} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <CourseImg c={c} src={src} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold">{chipOf(c)}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-semibold">{c.title}</h3>
          <p className="mt-2 flex-1 text-muted">{text || c.blurb}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent">View course <Icon n="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </article>
  )
}
export const DEFAULT_TAG = 'Practice makes you perfect!'
export const TagCtx = createContext(() => {})
export function useTag(t) { const set = useContext(TagCtx); useEffect(() => { set(t || DEFAULT_TAG); return () => set(DEFAULT_TAG) }, [t]) }
export function usePage(title, desc) {
  useEffect(() => {
    if (title) document.title = title
    const m = document.querySelector('meta[name=description]')
    if (m && desc) m.setAttribute('content', desc)
  }, [title, desc])
}
