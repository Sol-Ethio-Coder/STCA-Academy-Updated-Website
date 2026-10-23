import { useState, useEffect } from 'react'
import { Link, NavLink, Routes, Route, useLocation } from 'react-router-dom'
import { useDB, logoutAdmin } from './store.js'
import { TELEGRAM, PLATFORM } from './data.js'
import { Icon, Logo, TagCtx, DEFAULT_TAG } from './ui.jsx'
import { Home, CoursesPage, CourseDetail, ContactPage, Footer } from './site.jsx'
import { Catalog, CoursePage, ExamPage, CertificatePage, Admin, AITutor, NotFound } from './pages.jsx'

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('stca-theme', theme) } catch (e) {}
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme === 'dark' ? '#04070e' : '#0b1226')
  }, [theme])
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))]
}

function Announce() {
  const [show, setShow] = useState(() => { try { return !sessionStorage.getItem('stca-ann') } catch (e) { return true } })
  if (!show) return null
  return (
    <div className="no-print relative z-50 bg-deep px-10 py-2 text-center text-sm text-white">
      <span className="mr-2">✨</span>Explore the <b>STCA Platform</b>, our newer version of this site.{' '}
      <a className="font-bold underline underline-offset-4" href={PLATFORM} target="_blank" rel="noopener">Visit stca-platform.vercel.app ↗</a>
      <button aria-label="Dismiss announcement" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => { try { sessionStorage.setItem('stca-ann', '1') } catch (e) {} setShow(false) }}><Icon n="close" className="h-4 w-4" /></button>
    </div>
  )
}

function Nav({ theme, toggle, admin }) {
  const [open, setOpen] = useState(false)
  const links = [['Home', '/'], ['Courses', '/html/courses'], ['Learn online', '/learn'], ['Contact', '/html/contact'], ...(admin ? [['Admin', '/admin']] : [])]
  const cls = ({ isActive }) => `nav-link relative rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'bg-soft text-text' : 'text-muted hover:text-text'}`
  const dark = theme === 'dark'
  return (
    <header className="no-print sticky top-3 z-40 px-3 pt-3">
      <div className="glass mx-auto max-w-6xl rounded-full border border-hair px-4 py-2 shadow-lg">
        <nav className="flex items-center justify-between" aria-label="Main">
          <Link to="/" aria-label="STCA home" className="pl-1"><Logo size={36} /></Link>
          <ul className="hidden items-center gap-1 md:flex">{links.map(([l, h]) => <li key={h}><NavLink end={h === '/'} className={cls} to={h}>{l}</NavLink></li>)}</ul>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="flex h-10 w-10 items-center justify-center rounded-full border border-hair-strong hover:bg-soft"><Icon n={dark ? 'sun' : 'moon'} /></button>
            {admin ? <button className="btn btn-ghost btn-sm hidden md:inline-flex" onClick={logoutAdmin}>Log out</button> : <Link className="btn btn-primary btn-sm hidden md:inline-flex" to="/html/contact">Book a free call</Link>}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-hair-strong md:hidden" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><Icon n={open ? 'close' : 'menu'} /></button>
          </div>
        </nav>
        {open && (
          <ul className="mt-3 border-t border-hair pt-3 md:hidden" onClick={() => setOpen(false)}>
            {links.map(([l, h]) => <li key={h}><Link className="block rounded-xl px-3 py-3 font-semibold" to={h}>{l}</Link></li>)}
            <li className="pt-2"><Link className="btn btn-primary w-full" to="/html/contact">Book a free call</Link></li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default function App() {
  const [theme, toggle] = useTheme()
  const db = useDB()
  const { pathname } = useLocation()
  const [top, setTop] = useState(false)
  const [prog, setProg] = useState(0)
  const [tag, setTag] = useState(DEFAULT_TAG)
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => { // cursor spotlight on cards
    const mv = e => { const c = e.target.closest?.('.card'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px') }
    document.addEventListener('pointermove', mv, { passive: true })
    return () => document.removeEventListener('pointermove', mv)
  }, [])
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      setTop(scrollY > 600); setProg(h > 0 ? Math.min(1, scrollY / h) : 0)
    }
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [pathname])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    const t = setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el)), 50)
    return () => { clearTimeout(t); io.disconnect() }
  }, [pathname, db.courses.length])
  return (
    <TagCtx.Provider value={setTag}>
      <div className="grad-bar no-print fixed left-0 top-0 z-[60] w-full origin-left" style={{ transform: `scaleX(${prog})` }} aria-hidden="true" />
      <Announce />
      <Nav theme={theme} toggle={toggle} admin={db.admin} />
      <main id="top" key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/html/courses" element={<CoursesPage />} />
          <Route path="/html/contact" element={<ContactPage />} />
          <Route path="/html/:slug" element={<CourseDetail />} />
          <Route path="/learn" element={<Catalog />} />
          <Route path="/learn/:id" element={<CoursePage />} />
          <Route path="/exam/:id" element={<ExamPage />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer tag={tag} />
      <div className="no-print fixed bottom-[5rem] right-5 z-50 flex flex-col items-end gap-3">
        {top && <a href="#top" aria-label="Back to top" className="glass flex h-11 w-11 items-center justify-center rounded-full border border-hair-strong shadow-lg"><Icon n="arrow" className="h-5 w-5 -rotate-90" /></a>}
        <a href={TELEGRAM} target="_blank" rel="noopener" className="btn shadow-lg" style={{ background: '#22c55e', color: '#052e14' }}><Icon n="tg" className="h-4 w-4" />Chat on Telegram</a>
        <AITutor />
      </div>
    </TagCtx.Provider>
  )
}
