import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDB, canAccess, loginAdmin, logoutAdmin, saveCourse, deleteCourse, completeLesson, issueCert, submitExam, setName, markUnlocked, resetDemo, newId } from './store.js'
import { askAI } from './ai.js'
import { redeem, adminCall, adminReq, getCreds, setCreds } from './codes.js'
import { P, G, Icon, CourseImg, CourseCard, chipOf, slugOf, usePage } from './ui.jsx'
import { TELEGRAM, PLATFORM, PASS, IMG } from './data.js'
import { Question, Act, Rich, Explore, isGraded, actsOf, examOf, initVal, grade, shuffle } from './activities.jsx'

const Wrap = ({ children, w = 'max-w-6xl' }) => <div className={`mx-auto ${w} px-5 py-14`}>{children}</div>
const priceOf = c => (c.price > 0 ? `${c.price} ETB` : 'Free')

export function NotFound() {
  return <Wrap w="max-w-xl"><h1 className="text-5xl">Page not found</h1><p className="mt-3 text-muted">The page you are looking for does not exist.</p><Link to="/" className={`${P} mt-6`}>Go home</Link></Wrap>
}

export function Catalog() {
  const db = useDB()
  usePage('Learn online | STCA', 'Free and paid self-paced courses with quizzes and certificates from Sol Tutoring & Coding Academy.')
  const [f, setF] = useState('All')
  const [q, setQ] = useState('')
  const list = db.courses.filter(c => c.published && (f === 'All' || (f === 'Free') === (c.price === 0)) && c.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <section className="hero-bg"><Wrap w="max-w-6xl"><p className="eyebrow">No account needed</p><h1 className="mt-3 text-5xl md:text-7xl">Learn online</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">Free and paid self-paced courses with quizzes and a certificate. Prefer a real tutor? See our <Link className="font-semibold text-accent underline underline-offset-4" to="/html/courses">1:1 tutoring courses</Link>, or visit the <a className="font-semibold text-accent underline underline-offset-4" href={PLATFORM} target="_blank" rel="noopener">STCA Platform ↗</a>.</p></Wrap></section>
      <Wrap>
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Free', 'Paid'].map(t => <button key={t} onClick={() => setF(t)} className={`rounded-full px-5 py-2 font-semibold ${f === t ? 'bg-brand text-onbrand' : 'border border-hair-strong hover:bg-soft'}`}>{t}</button>)}
          <input aria-label="Search courses" placeholder="Search courses" value={q} onChange={e => setQ(e.target.value)} className="field !mt-0 max-w-xs sm:ml-auto" />
        </div>
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{list.map(c => <CourseCard key={c.id} c={{ ...c, tutorPrice: 0 }} to={`/learn/${c.id}`} />)}</div>
        {!list.length && <p className="mt-10 text-muted">No courses match your search.</p>}
      </Wrap>
    </>
  )
}

export function CoursePage() {
  const { id } = useParams()
  const db = useDB()
  const [idx, setIdx] = useState(0)
  const [solved, setSolved] = useState({})
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const c = db.courses.find(x => x.id === id)
  const locked = c ? !canAccess(db, c) : false
  const l = c?.lessons[idx]
  const blocked = locked && idx > 0
  const acts = l ? actsOf(l) : []
  const graded = acts.map((a, i) => [a, i]).filter(([a]) => isGraded(a))
  const allSolved = graded.length > 0 && graded.every(([, i]) => solved[`${l.id}:${i}`])
  useEffect(() => { if (c && l && !blocked && allSolved) completeLesson(c.id, l.id) }, [allSolved, l?.id, blocked])
  usePage(c && `${c.title} | Learn online | STCA`)
  if (!c || (!c.published && !db.admin)) return <NotFound />
  const p = db.progress[c.id]
  const done = p?.done || []
  const pct = c.lessons.length ? Math.round((done.length / c.lessons.length) * 100) : 0
  const lessonsDone = c.lessons.length > 0 && c.lessons.every(x => done.includes(x.id))
  const msg = encodeURIComponent(`Hello STCA! I'd like to unlock "${c.title}" (${priceOf(c)}).`)
  const tryCode = async e => { e.preventDefault(); if (!code.trim()) return; setBusy(true); setErr(''); try { await redeem(code, c.id); markUnlocked(c.id) } catch (x) { setErr(x.message) } setBusy(false) }
  return (
    <Wrap>
      <div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-soft px-3 py-1 text-sm font-bold">{priceOf(c)}</span><span className="text-sm font-semibold text-muted">{c.level}</span></div>
      <h1 className="mt-3 text-4xl md:text-6xl">{c.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{c.blurb}</p>
      {c.tutorPrice > 0 && <Link className="mt-3 inline-flex items-center gap-1.5 font-semibold text-accent" to={`/html/${slugOf(c)}`}>Prefer 1:1 tutoring? See details and price <Icon n="arrow" className="h-4 w-4" /></Link>}
      {locked && (
        <div className="card mt-8 max-w-xl p-7">
          <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft text-accent"><Icon n="lock" className="h-6 w-6" /></span><h2 className="text-2xl">Paid course · {priceOf(c)}</h2></div>
          <p className="mt-3 text-muted">Lesson 1 is a free preview. To unlock every lesson, the final exam and your certificate, message us on Telegram to pay. We will send you a personal, one-time access code.</p>
          <a className={`${P} mt-5`} href={`${TELEGRAM}?text=${msg}`} target="_blank" rel="noopener"><Icon n="tg" className="h-4 w-4" /> Get access on Telegram</a>
          <form onSubmit={tryCode} className="mt-6 border-t border-hair pt-6"><label className="block text-sm font-semibold">Have an access code?<div className="mt-1 flex gap-2"><input className="field !mt-0 uppercase" value={code} onChange={e => { setCode(e.target.value); setErr('') }} placeholder="STCA-XXXX-XXXX-XXXX" /><button className={`${G} btn-sm`} disabled={busy}>{busy ? 'Checking…' : 'Unlock'}</button></div></label>{err && <p className="mt-2 text-sm font-semibold text-rose" role="alert">{err}</p>}<p className="mt-2 text-xs text-muted">Your code is personal and works only once.</p></form>
        </div>
      )}
      {!locked && <div className="mt-8 max-w-md"><div className="flex justify-between text-sm font-semibold"><span>Your progress</span><span>{pct}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-soft"><div className="grad-bar transition-all duration-700" style={{ width: `${pct}%`, height: '100%' }} /></div></div>}
      <div className="mt-8 grid gap-6 md:grid-cols-[18rem_1fr]">
        <div>
          <ol className="space-y-2 md:max-h-[34rem] md:overflow-y-auto md:pr-1">{c.lessons.map((x, i) => (
            <li key={x.id}>{x.module && x.module !== c.lessons[i - 1]?.module && <p className="eyebrow mb-2 mt-4 first:mt-0">{x.module}</p>}<button onClick={() => setIdx(i)} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left font-medium transition-all ${i === idx ? 'border-accent bg-surface shadow-sm' : 'border-hair hover:translate-x-1 hover:border-accent/60 hover:bg-soft'}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${done.includes(x.id) ? 'bg-leaf text-[#06140d]' : 'border border-hair-strong'}`}>{done.includes(x.id) ? <Icon n="check" className="h-4 w-4" /> : locked && i > 0 ? <Icon n="lock" className="h-3.5 w-3.5" /> : i + 1}</span>{x.title}</button></li>
          ))}</ol>
          <div className="mt-4 rounded-2xl border border-hair p-4">
            <p className="flex items-center gap-2 font-semibold"><Icon n="cap" className="h-5 w-5 text-accent" />Final exam</p>
            <p className="mt-1 text-sm text-muted">Score {PASS}% or more to earn your certificate.</p>
            {p?.exam && <p className={`mt-2 text-sm font-semibold ${p.exam.passed ? 'text-leaf' : 'text-rose'}`}>{p.exam.passed ? 'Passed' : 'Not passed yet'} · best score {p.exam.best}%</p>}
            {locked ? <p className="mt-2 text-sm text-muted">Unlock the course to take the exam.</p> : lessonsDone ? <Link className={`${P} btn-sm mt-3`} to={`/exam/${c.id}`}>{p?.exam ? 'Retake exam' : 'Start exam'}</Link> : <p className="mt-2 text-sm text-muted">Complete all lessons to unlock the exam.</p>}
            {p?.exam?.passed && <Link className="mt-3 flex items-center gap-1.5 font-semibold text-accent" to={`/certificate/${c.id}`}>View certificate <Icon n="arrow" className="h-4 w-4" /></Link>}
          </div>
        </div>
        <div className="card p-7">
          {blocked ? (
            <div className="py-10 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-accent"><Icon n="lock" className="h-7 w-7" /></span><h2 className="mt-4 text-2xl">Unlock to continue</h2><p className="mt-2 text-muted">This lesson is part of the paid course. Lesson 1 is a free preview.</p></div>
          ) : l ? (<div key={l.id}>
            <p className="eyebrow">Lesson {idx + 1} of {c.lessons.length}</p>
            <h2 className="mt-2 text-3xl">{l.title}</h2>
            <div className="mt-4"><Rich text={l.body} /></div>
            <div className="mt-6 space-y-5">{acts.map((a, i) => isGraded(a)
              ? <Act key={`${l.id}:${i}`} a={a} onSolved={() => setSolved(s => ({ ...s, [`${l.id}:${i}`]: true }))} />
              : <Explore key={`${l.id}:${i}`} a={a} />)}</div>
            {!graded.length && !done.includes(l.id) && <button className={`${P} mt-6`} onClick={() => completeLesson(c.id, l.id)}>Mark as complete</button>}
            {done.includes(l.id) && <p className="mt-6 flex items-center gap-2 font-semibold text-leaf"><Icon n="check" className="h-5 w-5" />Lesson complete</p>}
          </div>) : <p className="text-muted">Lessons are coming soon.</p>}
          <div className="mt-7 flex justify-between"><button className={G} disabled={idx === 0} onClick={() => setIdx(idx - 1)}>Back</button><button className={P} disabled={idx >= c.lessons.length - 1} onClick={() => setIdx(idx + 1)}>Next lesson</button></div>
          {!locked && lessonsDone && !p?.exam?.passed && <div className="mt-7 rounded-2xl bg-leaf/15 p-5"><p className="font-semibold">All lessons done! 🎉 Take the final exam to earn your certificate.</p><Link className={`${P} mt-3`} to={`/exam/${c.id}`}>Start the final exam</Link></div>}
        </div>
      </div>
    </Wrap>
  )
}

function ScoreRing({ pct, pass }) {
  const [shown, setShown] = useState(0)
  useEffect(() => { const t = setTimeout(() => setShown(pct), 100); return () => clearTimeout(t) }, [pct])
  const R = 54, C = 2 * Math.PI * R
  return (
    <svg viewBox="0 0 130 130" className="mx-auto h-44 w-44" role="img" aria-label={`Score ${pct} percent`}>
      <circle cx="65" cy="65" r={R} fill="none" stroke="var(--hair-strong)" strokeWidth="10" />
      <circle cx="65" cy="65" r={R} fill="none" stroke={pass ? 'var(--g1)' : 'var(--g3)'} strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - shown / 100)} transform="rotate(-90 65 65)" style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)' }} />
      <text x="65" y="74" textAnchor="middle" className="font-display" fontSize="30" fontWeight="600" fill="var(--text)">{pct}%</text>
    </svg>
  )
}

export function ExamPage() {
  const { id } = useParams()
  const db = useDB()
  const c = db.courses.find(x => x.id === id)
  const [attempt, setAttempt] = useState(0)
  const qs = useMemo(() => (c ? shuffle(examOf(c)) : []), [id, attempt, c?.exam?.length])
  const [ans, setAns] = useState(() => qs.map(initVal))
  const [res, setRes] = useState(null)
  useEffect(() => { setAns(qs.map(initVal)); setRes(null) }, [qs])
  usePage(c && `Final exam · ${c.title} | STCA`)
  if (!c) return <NotFound />
  const p = db.progress[id]
  const allDone = c.lessons.length > 0 && c.lessons.every(l => p?.done.includes(l.id))
  const gate = (t, d, to, label) => <Wrap w="max-w-xl"><h1 className="text-4xl">{t}</h1><p className="mt-2 text-muted">{d}</p><Link className={`${P} mt-5`} to={to}>{label}</Link></Wrap>
  if (!canAccess(db, c)) return gate('Course locked', 'Unlock this paid course to take the final exam.', `/learn/${id}`, 'Back to course')
  if (!allDone) return gate('Finish the lessons first', 'Complete every lesson to unlock the final exam.', `/learn/${id}`, 'Back to lessons')
  if (!qs.length) return gate('No exam yet', 'This course does not have exam questions yet.', `/learn/${id}`, 'Back to course')
  const answered = ans.filter((a, i) => (qs[i]?.t === 'order' ? true : a !== null && a !== '')).length
  const submit = () => {
    const wrong = []
    let ok = 0
    qs.forEach((q, i) => { if (grade(q, ans[i])) ok++; else wrong.push(i + 1) })
    const pct = Math.round((ok / qs.length) * 100)
    submitExam(id, pct)
    setRes({ ok, pct, wrong })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  if (res) {
    const pass = res.pct >= PASS
    return (
      <Wrap w="max-w-xl"><div className="card p-8 text-center">
        <ScoreRing pct={res.pct} pass={pass} />
        <h1 className="mt-4 text-4xl">{pass ? 'You passed! 🎉' : 'Not quite there yet'}</h1>
        <p className="mt-2 text-muted">You answered {res.ok} of {qs.length} correctly. The pass mark is {PASS}%.</p>
        {pass ? <Link className={`${P} mt-6`} to={`/certificate/${id}`}><Icon n="cap" className="h-4 w-4" /> Get your certificate</Link> : (
          <>
            <p className="mt-4 text-sm">Review these questions: <b>{res.wrong.join(', ')}</b>. Revisit the lessons, then try again.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3"><button className={P} onClick={() => setAttempt(a => a + 1)}>Retake exam</button><Link className={G} to={`/learn/${id}`}>Review lessons</Link></div>
          </>
        )}
      </div></Wrap>
    )
  }
  return (
    <Wrap w="max-w-3xl">
      <p className="eyebrow">Final exam</p>
      <h1 className="mt-2 text-4xl md:text-5xl">{c.title}</h1>
      <p className="mt-3 text-muted">{qs.length} questions. Score {PASS}% or more to earn your certificate. You can retake the exam if you do not pass.</p>
      <div className="mt-8 space-y-5">{qs.map((q, i) => (
        <div key={`${attempt}-${i}`} className="card p-6"><p className="eyebrow mb-2">Question {i + 1}</p><Question q={q} value={ans[i]} onChange={v => setAns(a => a.map((x, j) => (j === i ? v : x)))} /></div>
      ))}</div>
      <div className="mt-8 flex flex-wrap items-center gap-4"><button className={P} onClick={submit}>Submit exam</button><span className="text-sm text-muted">{answered} of {qs.length} answered</span></div>
    </Wrap>
  )
}

export function CertificatePage() {
  const { id } = useParams()
  const db = useDB()
  const [n, setN] = useState('')
  const c = db.courses.find(x => x.id === id)
  const p = db.progress[id]
  const lessonsDone = !!(c && p && c.lessons.length && c.lessons.every(l => p.done.includes(l.id)))
  const ok = lessonsDone && !!p.exam?.passed
  useEffect(() => { if (ok && db.name && !p.cert) issueCert(id) }, [ok, db.name])
  if (!ok) return <Wrap w="max-w-xl"><h1 className="text-4xl">Certificate not available yet</h1><p className="mt-2 text-muted">{lessonsDone ? `Pass the final exam with ${PASS}% or more to earn your certificate.` : 'Finish every lesson, then pass the final exam to earn your certificate.'}</p><Link className={`${P} mt-5`} to={lessonsDone ? `/exam/${id}` : `/learn/${id}`}>{lessonsDone ? 'Go to the final exam' : 'Back to course'}</Link></Wrap>
  if (!db.name) return (
    <Wrap w="max-w-md"><form className="card p-8" onSubmit={e => { e.preventDefault(); n.trim() && setName(n) }}>
      <h1 className="text-3xl">Congratulations!</h1><p className="mt-2 text-muted">Enter your full name exactly as you want it printed on your certificate.</p>
      <label className="mt-5 block text-sm font-semibold">Full name<input required className="field" value={n} onChange={e => setN(e.target.value)} /></label>
      <button className={`${P} mt-5 w-full`}>Create certificate</button></form></Wrap>
  )
  if (!p.cert) return null
  return (
    <Wrap w="max-w-4xl">
      <div className="no-print mb-5 flex gap-3"><button className={P} onClick={() => window.print()}>Download / Print PDF</button><Link className={G} to="/learn">More courses</Link></div>
      <div className="rounded-3xl p-1.5" style={{ background: 'linear-gradient(135deg,#4ade80,#fbbf24,#fb7185)' }}>
        <div className="rounded-[1.4rem] bg-white p-8 text-center text-[#0b1226] sm:p-14">
          <img src="/Images/logo-mark.svg" alt="" className="mx-auto h-20 w-20" />
          <p className="mt-3 text-sm font-bold tracking-[0.3em]">SOL TUTORING &amp; CODING ACADEMY</p>
          <h1 className="mt-8 text-4xl font-semibold sm:text-6xl">Certificate of Completion</h1>
          <p className="mt-8 text-lg text-[#566176]">This certifies that</p>
          <p className="mt-2 font-display text-4xl font-semibold sm:text-6xl">{p.cert.name}</p>
          <p className="mt-5 text-lg text-[#566176]">has successfully completed the course</p>
          <p className="mt-2 font-display text-3xl font-semibold">{c.title}</p>
          <p className="mt-3 text-[#566176]">with a final exam score of <b className="text-[#0b1226]">{p.cert.score ?? p.exam.best}%</b></p>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 text-sm">
            <div><p className="font-semibold">{new Date(p.cert.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p><p className="mt-1 border-t border-[#0b1226]/30 pt-1 text-[#566176]">Date</p></div>
            <div><p className="font-display text-xl">Solomon Ashagre</p><p className="mt-1 border-t border-[#0b1226]/30 pt-1 text-[#566176]">Founder, STCA</p></div>
            <div><p className="font-semibold">{p.cert.id}</p><p className="mt-1 border-t border-[#0b1226]/30 pt-1 text-[#566176]">Certificate ID</p></div>
          </div>
        </div>
      </div>
    </Wrap>
  )
}

const blank = () => ({ id: newId(), title: '', cat: 'Coding', level: 'Beginner', price: 0, blurb: '', img: IMG.web, fallback: '/Images/ict.svg', published: false, lessons: [] })

function Editor({ init, onClose }) {
  const [d, setD] = useState(init)
  const [busy, setBusy] = useState(false)
  const up = (k, v) => setD({ ...d, [k]: v })
  const upL = (i, p) => setD({ ...d, lessons: d.lessons.map((l, j) => (j === i ? { ...l, ...p } : l)) })
  const draft = async () => {
    if (!d.title) return alert('Enter a course title first')
    setBusy(true)
    try {
      const t = await askAI([{ role: 'user', content: `Create 3 short beginner lessons for a course titled "${d.title}" (level: ${d.level}). Return a JSON array of objects: {"title": string, "body": string (2-3 sentences), "q": {"q": string, "options": [4 strings], "answer": index 0-3}}.` }], 'json')
      const arr = JSON.parse(t.replace(/```json|```/g, '').trim())
      setD(x => ({ ...x, lessons: [...x.lessons, ...arr.map(l => ({ ...l, id: 'l' + newId() }))] }))
    } catch (e) { alert('AI draft failed: ' + e.message) }
    setBusy(false)
  }
  const upQ = (i, patch) => setD({ ...d, exam: (d.exam || []).map((q, j) => (j === i ? { ...q, ...patch } : q)) })
  const draftExam = async () => {
    if (!d.title) return alert('Enter a course title first')
    setBusy(true)
    try {
      const t = await askAI([{ role: 'user', content: `Create 6 multiple-choice exam questions for a beginner course titled "${d.title}". Return a JSON array of objects: {"q": string, "options": [4 strings], "answer": index 0-3}.` }], 'json')
      const arr = JSON.parse(t.replace(/```json|```/g, '').trim())
      setD(x => ({ ...x, exam: [...(x.exam || []), ...arr.map(q => ({ t: 'mcq', q: q.q, options: q.options, answer: q.answer }))] }))
    } catch (e) { alert('AI draft failed: ' + e.message) }
    setBusy(false)
  }
  const save = () => {
    if (!d.title.trim()) return alert('Title is required')
    saveCourse({ ...d, exam: (d.exam || []).filter(q => q.q?.trim()), learn: (d.learn || []).filter(Boolean), price: Number(d.price) || 0, lessons: d.lessons.filter(l => l.title.trim()).map(l => (l.q?.q?.trim() ? l : { ...l, q: undefined })) })
    onClose()
  }
  const lab = 'block text-sm font-semibold'
  return (
    <div className="card p-7">
      <h2 className="text-3xl">{init.title ? 'Edit course' : 'New course'}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className={`${lab} sm:col-span-2`}>Title<input className="field" value={d.title} onChange={e => up('title', e.target.value)} /></label>
        <label className={lab}>Category<select className="field" value={d.cat} onChange={e => up('cat', e.target.value)}><option>Coding</option><option>School</option></select></label>
        <label className={lab}>Level<input className="field" value={d.level} onChange={e => up('level', e.target.value)} /></label>
        <label className={lab}>Self-paced course price in ETB (0 = free)<input type="number" min="0" className="field" value={d.price} onChange={e => up('price', e.target.value)} /></label>
        <label className={lab}>1:1 tutoring price (Birr per hour, optional)<input type="number" min="0" className="field" value={d.tutorPrice || ''} onChange={e => up('tutorPrice', e.target.value ? Number(e.target.value) : undefined)} /></label>
        <label className={lab}>Image path or URL<input className="field" value={d.img} onChange={e => up('img', e.target.value)} /></label>
        <label className={`${lab} sm:col-span-2`}>What students will learn (one per line)<textarea rows="4" className="field" value={(d.learn || []).join('\n')} onChange={e => up('learn', e.target.value.split('\n'))} /></label>
        <label className={`${lab} sm:col-span-2`}>Short description<textarea rows="2" className="field" value={d.blurb} onChange={e => up('blurb', e.target.value)} /></label>
        <label className="flex items-center gap-2 font-semibold"><input type="checkbox" checked={d.published} onChange={e => up('published', e.target.checked)} />Published (visible on the site)</label>
      </div>
      <h3 className="mt-8 text-2xl">Lessons</h3>
      {d.lessons.map((l, i) => (
        <div key={l.id} className="mt-4 rounded-2xl border border-hair p-5">
          <label className={lab}>Lesson {i + 1} title<input className="field" value={l.title} onChange={e => upL(i, { title: e.target.value })} /></label>
          <label className={`${lab} mt-3`}>Content<textarea rows="3" className="field" value={l.body} onChange={e => upL(i, { body: e.target.value })} /></label>
          <label className={`${lab} mt-3`}>Quiz question (optional)<input className="field" value={l.q?.q || ''} onChange={e => upL(i, { q: { options: [], answer: 0, ...l.q, q: e.target.value } })} /></label>
          <label className={`${lab} mt-3`}>Answer options (one per line)<textarea rows="4" className="field" value={(l.q?.options || []).join('\n')} onChange={e => upL(i, { q: { answer: 0, ...l.q, options: e.target.value.split('\n') } })} /></label>
          <label className={`${lab} mt-3`}>Correct option number (1 = first)<input type="number" min="1" className="field max-w-[8rem]" value={(l.q?.answer ?? 0) + 1} onChange={e => upL(i, { q: { options: [], ...l.q, answer: Math.max(0, Number(e.target.value) - 1) } })} /></label>
          <button className="mt-3 text-sm font-semibold text-rose underline" onClick={() => setD({ ...d, lessons: d.lessons.filter((_, j) => j !== i) })}>Remove lesson</button>
        </div>
      ))}
      <div className="mt-4 flex flex-wrap gap-3">
        <button className={G} onClick={() => setD({ ...d, lessons: [...d.lessons, { id: 'l' + newId(), title: '', body: '' }] })}>Add lesson</button>
        <button className={G} disabled={busy} onClick={draft}><Icon n="spark" className="h-4 w-4" />{busy ? 'Drafting…' : 'Draft 3 lessons with AI'}</button>
      </div>
      <h3 className="mt-10 text-2xl">Final exam <span className="text-base font-normal text-muted">(certificate needs {PASS}% or more)</span></h3>
      {(d.exam || []).map((q, i) => (
        <div key={i} className="mt-4 rounded-2xl border border-hair p-5">
          <div className="grid gap-3 sm:grid-cols-[11rem_1fr]">
            <label className={lab}>Type<select className="field" value={q.t} onChange={e => upQ(i, { t: e.target.value, ...(e.target.value === 'mcq' ? { options: q.options || [], answer: 0 } : e.target.value === 'tf' ? { answer: true } : { answer: '' }) })}><option value="mcq">Multiple choice</option><option value="tf">True / False</option><option value="fill">Fill in</option></select></label>
            <label className={lab}>Question<input className="field" value={q.q || ''} onChange={e => upQ(i, { q: e.target.value })} /></label>
          </div>
          {q.t === 'mcq' && <><label className={`${lab} mt-3`}>Options (one per line)<textarea rows="4" className="field" value={(q.options || []).join('\n')} onChange={e => upQ(i, { options: e.target.value.split('\n') })} /></label><label className={`${lab} mt-3`}>Correct option number (1 = first)<input type="number" min="1" className="field max-w-[8rem]" value={(q.answer ?? 0) + 1} onChange={e => upQ(i, { answer: Math.max(0, Number(e.target.value) - 1) })} /></label></>}
          {q.t === 'tf' && <label className={`${lab} mt-3`}>Correct answer<select className="field max-w-[10rem]" value={String(q.answer)} onChange={e => upQ(i, { answer: e.target.value === 'true' })}><option value="true">True</option><option value="false">False</option></select></label>}
          {q.t === 'fill' && <label className={`${lab} mt-3`}>Correct answer<input className="field" value={q.answer || ''} onChange={e => upQ(i, { answer: e.target.value })} /></label>}
          <button className="mt-3 text-sm font-semibold text-rose underline" onClick={() => setD({ ...d, exam: d.exam.filter((_, j) => j !== i) })}>Remove question</button>
        </div>
      ))}
      <div className="mt-4 flex flex-wrap gap-3"><button className={G} onClick={() => setD({ ...d, exam: [...(d.exam || []), { t: 'mcq', q: '', options: [], answer: 0 }] })}>Add exam question</button><button className={G} disabled={busy} onClick={draftExam}><Icon n="spark" className="h-4 w-4" />{busy ? 'Drafting…' : 'Draft 6 exam questions with AI'}</button></div>
      <div className="mt-8 flex gap-3"><button className={P} onClick={save}>Save course</button><button className={G} onClick={onClose}>Cancel</button></div>
    </div>
  )
}

function AdminLogin() {
  const [f, setF] = useState({ email: '', pw: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async e => { e.preventDefault(); setErr(''); setBusy(true); try { await loginAdmin(f.email, f.pw) } catch (x) { setErr(x.message) } setBusy(false) }
  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <form onSubmit={submit} className="card p-8">
        <img src="/Images/logo-mark.svg" alt="" className="h-14 w-14" />
        <h1 className="mt-4 text-3xl">Admin sign in</h1>
        <p className="mt-1 text-muted">Only the site owner can sign in here.</p>
        <label className="mt-6 block text-sm font-semibold">Email<input required type="email" autoComplete="username" className="field" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></label>
        <label className="mt-4 block text-sm font-semibold">Password<input required type="password" autoComplete="current-password" className="field" value={f.pw} onChange={e => setF({ ...f, pw: e.target.value })} /></label>
        {err && <p className="mt-3 font-semibold text-rose" role="alert">{err}</p>}
        <button className={`${P} mt-6 w-full`} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        {import.meta.env.DEV && <p className="mt-6 rounded-xl bg-soft p-4 text-sm text-muted">Local development: run <code>npx netlify dev</code> with ADMIN_EMAIL and ADMIN_PASSWORD set in your .env file.</p>}
      </form>
    </div>
  )
}

const invite = (courses, code, cid, label) => `${label ? `Hi ${label}! ` : ''}Thank you for your payment 🎉\nYour personal access code for "${courses.find(x => x.id === cid)?.title}" is: ${code}\n\nOpen ${location.origin}/learn/${cid}, type the code in the "Have an access code?" box and press Unlock.\nThis code works only once, so please do not share it.`
const copy = txt => navigator.clipboard?.writeText(txt).then(() => alert('Copied!'), () => prompt('Copy this:', txt))

function CodesPanel({ courses }) {
  const paid = courses.filter(c => c.price > 0)
  const [course, setCourse] = useState(paid[0]?.id || '')
  const [label, setLabel] = useState('')
  const [count, setCount] = useState(1)
  const [list, setList] = useState([])
  const [fresh, setFresh] = useState([])
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [needAuth, setNeedAuth] = useState(!getCreds())
  const [cred, setCred] = useState({ email: '', pw: '' })
  const title = id => courses.find(x => x.id === id)?.title || id
  const load = async () => { try { setErr(''); setList((await adminCall('list')).codes) } catch (e) { setErr(e.message); if (e.status === 401) setNeedAuth(true) } }
  useEffect(() => { if (!needAuth) load() }, [needAuth])
  const gen = async () => {
    setBusy(true); setErr('')
    try { const r = await adminCall('generate', { course, count: Number(count) || 1, label }); setFresh(r.codes.map(code => ({ code, cid: course, label }))); setLabel(''); load() } catch (e) { setErr(e.message); if (e.status === 401) setNeedAuth(true) }
    setBusy(false)
  }
  const revoke = async code => { if (confirm(`Revoke ${code}?`)) { try { await adminCall('revoke', { code }); load() } catch (e) { setErr(e.message) } } }
  if (needAuth) return (
    <form className="card mt-6 max-w-md p-7" onSubmit={e => { e.preventDefault(); setCreds(cred.email, cred.pw); setNeedAuth(false) }}>
      <h2 className="text-2xl">Confirm it’s you</h2><p className="mt-2 text-muted">Enter the admin email and password you set in Netlify to manage access codes.</p>
      {err && <p className="mt-3 text-sm font-semibold text-rose" role="alert">{err}</p>}
      <label className="mt-4 block text-sm font-semibold">Email<input required type="email" className="field" value={cred.email} onChange={e => setCred({ ...cred, email: e.target.value })} /></label>
      <label className="mt-3 block text-sm font-semibold">Password<input required type="password" className="field" value={cred.pw} onChange={e => setCred({ ...cred, pw: e.target.value })} /></label>
      <button className={`${P} mt-5 w-full`}>Continue</button>
    </form>
  )
  return (
    <div className="mt-6 space-y-6">
      <div className="card p-7">
        <h2 className="text-2xl">Create one-time access codes</h2>
        <p className="mt-1 text-muted">Make one code per student. A code works once, then it is burned, so sharing it with a friend does not work.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_1fr_7rem]">
          <label className="block text-sm font-semibold">Course<select className="field" value={course} onChange={e => setCourse(e.target.value)}>{paid.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></label>
          <label className="block text-sm font-semibold">Student name (optional)<input className="field" value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Hana T." /></label>
          <label className="block text-sm font-semibold">How many<input type="number" min="1" max="20" className="field" value={count} onChange={e => setCount(e.target.value)} /></label>
        </div>
        <button className={`${P} mt-5`} disabled={busy || !course} onClick={gen}>{busy ? 'Generating…' : 'Generate code'}</button>
        {err && <p className="mt-3 text-sm font-semibold text-rose" role="alert">{err}</p>}
      </div>
      {fresh.length > 0 && (
        <div className="card border-leaf p-7"><h3 className="text-xl">New codes — send each to one student</h3>
          <div className="mt-4 space-y-3">{fresh.map(f => { const msg = invite(courses, f.code, f.cid, f.label); return (
            <div key={f.code} className="flex flex-wrap items-center gap-3 rounded-xl bg-soft p-3"><code className="text-lg font-bold tracking-wider">{f.code}</code><span className="text-sm text-muted">{title(f.cid)}{f.label ? ` · ${f.label}` : ''}</span>
              <span className="ml-auto flex flex-wrap gap-2"><button className={`${G} btn-sm`} onClick={() => copy(f.code)}>Copy code</button><button className={`${G} btn-sm`} onClick={() => copy(msg)}>Copy message</button><a className={`${P} btn-sm`} target="_blank" rel="noopener" href={`https://t.me/share/url?url=${encodeURIComponent(location.origin)}&text=${encodeURIComponent(msg)}`}>Send on Telegram</a></span></div>) })}</div></div>
      )}
      <div className="card p-7"><div className="flex items-center justify-between"><h3 className="text-xl">All codes</h3><button className="text-sm font-semibold text-accent underline" onClick={load}>Refresh</button></div>
        {!list.length ? <p className="mt-3 text-muted">No codes yet.</p> : (
          <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-hair text-muted"><th className="py-2 pr-3">Code</th><th className="pr-3">Course</th><th className="pr-3">Student</th><th className="pr-3">Status</th><th /></tr></thead>
            <tbody>{list.map(x => <tr key={x.code} className="border-b border-hair"><td className="py-2 pr-3 font-mono font-semibold">{x.code}</td><td className="pr-3">{title(x.course)}</td><td className="pr-3">{x.label || '—'}</td>
              <td className="pr-3">{x.used ? <span className="font-semibold text-rose">Used {new Date(x.usedAt).toLocaleDateString()}</span> : <span className="font-semibold text-leaf">Unused</span>}</td>
              <td className="whitespace-nowrap py-2 text-right">{!x.used && <><button className="font-semibold underline" onClick={() => copy(x.code)}>Copy</button> <button className="ml-3 font-semibold text-rose underline" onClick={() => revoke(x.code)}>Revoke</button></>}</td></tr>)}</tbody></table></div>)}
      </div>
    </div>
  )
}

const contactLink = c => {
  const v = String(c || '').trim()
  if (/^@?[A-Za-z][A-Za-z0-9_]{4,}$/.test(v)) return `https://t.me/${v.replace('@', '')}`
  const d = v.replace(/[\s()-]/g, '')
  return /^\+?\d{6,}$/.test(d) ? `tel:${d}` : null
}
const STATUS = { new: 'bg-rose/15 text-rose', contacted: 'bg-gold/20 text-gold', done: 'bg-leaf/15 text-leaf' }

function RequestsPanel() {
  const [list, setList] = useState([])
  const [err, setErr] = useState('')
  const [need, setNeed] = useState(!getCreds())
  const [cred, setCred] = useState({ email: '', pw: '' })
  const [filter, setFilter] = useState('all')
  const load = async () => { try { setErr(''); setList((await adminReq('list')).requests) } catch (e) { setErr(e.message); if (e.status === 401) setNeed(true) } }
  useEffect(() => { if (!need) load() }, [need])
  const act = async (fn, extra) => { try { await adminReq(fn, extra); load() } catch (e) { setErr(e.message) } }
  if (need) return (
    <form className="card mt-6 max-w-md p-7" onSubmit={e => { e.preventDefault(); setCreds(cred.email, cred.pw); setNeed(false) }}>
      <h2 className="text-2xl">Confirm it’s you</h2><p className="mt-2 text-muted">Enter the admin email and password you set in Netlify to see contact requests.</p>
      {err && <p className="mt-3 text-sm font-semibold text-rose" role="alert">{err}</p>}
      <label className="mt-4 block text-sm font-semibold">Email<input required type="email" className="field" value={cred.email} onChange={e => setCred({ ...cred, email: e.target.value })} /></label>
      <label className="mt-3 block text-sm font-semibold">Password<input required type="password" className="field" value={cred.pw} onChange={e => setCred({ ...cred, pw: e.target.value })} /></label>
      <button className={`${P} mt-5 w-full`}>Continue</button>
    </form>
  )
  const shown = list.filter(r => filter === 'all' || r.status === filter)
  const count = s => list.filter(r => r.status === s).length
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        {[['all', `All (${list.length})`], ['new', `New (${count('new')})`], ['contacted', `Contacted (${count('contacted')})`], ['done', `Done (${count('done')})`]].map(([k, l]) => <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${filter === k ? 'bg-brand text-onbrand' : 'border border-hair-strong hover:bg-soft'}`}>{l}</button>)}
        <button className="ml-auto text-sm font-semibold text-accent underline" onClick={load}>Refresh</button>
      </div>
      {err && <p className="mt-3 text-sm font-semibold text-rose" role="alert">{err}</p>}
      {!shown.length && !err && <p className="mt-6 text-muted">No requests here yet. New requests from the Contact page appear in this list.</p>}
      <div className="mt-5 space-y-4">{shown.map(r => {
        const link = contactLink(r.contact)
        return (
          <div key={r.key} className="card p-5">
            <div className="flex flex-wrap items-center gap-3"><h3 className="text-xl">{r.name}</h3><span className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase ${STATUS[r.status]}`}>{r.status}</span><span className="ml-auto font-mono text-xs text-muted">{r.id} · {new Date(r.created).toLocaleString()}</span></div>
            <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              <div><dt className="inline text-muted">Contact: </dt><dd className="inline font-semibold">{link ? <a className="text-accent underline" href={link} target="_blank" rel="noopener">{r.contact}</a> : r.contact}</dd></div>
              {r.email && <div><dt className="inline text-muted">Email: </dt><dd className="inline font-semibold"><a className="text-accent underline" href={`mailto:${r.email}`}>{r.email}</a></dd></div>}
              <div><dt className="inline text-muted">Course: </dt><dd className="inline font-semibold">{r.course}</dd></div>
              <div><dt className="inline text-muted">For: </dt><dd className="inline font-semibold">{r.who}{r.age ? ` (${r.age})` : ''} · {r.mode}</dd></div>
              {r.time && <div className="sm:col-span-2"><dt className="inline text-muted">Best time: </dt><dd className="inline font-semibold">{r.time}</dd></div>}
            </dl>
            {r.message && <p className="mt-3 whitespace-pre-wrap rounded-xl bg-soft p-3 text-sm">{r.message}</p>}
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
              {r.status !== 'contacted' && <button className="text-accent underline" onClick={() => act('update', { key: r.key, status: 'contacted' })}>Mark contacted</button>}
              {r.status !== 'done' && <button className="text-leaf underline" onClick={() => act('update', { key: r.key, status: 'done' })}>Mark done</button>}
              {r.status !== 'new' && <button className="underline" onClick={() => act('update', { key: r.key, status: 'new' })}>Mark new</button>}
              <button className="ml-auto text-rose underline" onClick={() => confirm('Delete this request?') && act('delete', { key: r.key })}>Delete</button>
            </div>
          </div>)
      })}</div>
    </div>
  )
}

export function Admin() {
  const db = useDB()
  useEffect(() => { const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex, nofollow'; document.head.appendChild(m); return () => m.remove() }, [])
  const [edit, setEdit] = useState(null)
  const [tab, setTab] = useState('courses')
  if (!db.admin) return <AdminLogin />
  return (
    <Wrap>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-4xl md:text-5xl">Admin</h1>
        <div className="inline-flex rounded-full bg-soft p-1" role="tablist">{[['courses', 'Courses'], ['requests', 'Requests'], ['codes', 'Access codes']].map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => { setTab(k); setEdit(null) }} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === k ? 'bg-surface shadow' : 'text-muted'}`}>{l}</button>)}</div>
        {tab === 'courses' && !edit && <button className={`${P} sm:ml-auto`} onClick={() => setEdit(blank())}>New course</button>}
        <button className={tab === 'courses' && !edit ? G : `${G} sm:ml-auto`} onClick={logoutAdmin}>Log out</button>
      </div>
      {tab === 'codes' ? <CodesPanel courses={db.courses} /> : tab === 'requests' ? <RequestsPanel /> : (
        <>
          <p className="mt-4 rounded-xl bg-gold/15 p-3 text-sm">Course edits are saved only in this browser for now. Access codes are real: they are created and checked on the server.</p>
          {edit ? <div className="mt-6"><Editor init={edit} onClose={() => setEdit(null)} /></div> : (
            <>
              <div className="mt-6 space-y-3">
                {db.courses.map(c => (
                  <div key={c.id} className="card flex flex-wrap items-center gap-4 !rounded-2xl p-3">
                    <CourseImg c={c} className="h-14 w-20 rounded-lg object-cover" />
                    <div className="min-w-[10rem] flex-1"><p className="font-semibold">{c.title}</p><p className="text-sm text-muted">{chipOf(c)} · {priceOf(c)} online · {c.lessons.length} lessons · {(c.exam || []).length} exam questions · {c.published ? 'Published' : 'Draft'}</p></div>
                    <button className="font-semibold text-accent underline" onClick={() => saveCourse({ ...c, published: !c.published })}>{c.published ? 'Unpublish' : 'Publish'}</button>
                    <button className="font-semibold underline" onClick={() => setEdit(c)}>Edit</button>
                    <button className="font-semibold text-rose underline" onClick={() => confirm(`Delete "${c.title}"?`) && deleteCourse(c.id)}>Delete</button>
                  </div>
                ))}
              </div>
              <button className="mt-8 text-sm text-muted underline" onClick={() => confirm('Reset all courses to the sample data?') && resetDemo()}>Reset to sample data</button>
            </>
          )}
        </>
      )}
    </Wrap>
  )
}

const QUICK = ['What courses do you offer?', 'How much is 1:1 tutoring?', 'How do I earn a certificate?', 'Explain a Python loop']

function useTutorContext() {
  const db = useDB()
  const { pathname } = useLocation()
  const pub = db.courses.filter(c => c.published)
  const tutoring = pub.filter(c => c.tutorPrice).map(c => `${c.title} ${c.tutorPrice} Birr/hour`).join('; ')
  const online = pub.map(c => `${c.title} (${c.price > 0 ? c.price + ' ETB' : 'free'}, ${c.lessons.length} lessons)`).join('; ')
  const m = pathname.match(/^\/learn\/([^/]+)/), h = pathname.match(/^\/html\/([^/]+)/)
  const cur = m ? pub.find(c => c.id === m[1]) : h ? pub.find(c => slugOf(c) === h[1].replace(/\.html$/, '')) : null
  const page = cur ? ` The visitor is currently viewing the ${cur.title} page. Its lessons: ${cur.lessons.map(l => l.title).join(', ')}.` : ''
  return `1:1 tutoring prices: ${tutoring || 'see the Courses page'}. Online self-paced courses: ${online || 'see the Learn page'}.${page}`
}

// Light markdown for the tutor's replies: **bold**, `code`, ``` blocks, "- " lists and "1." lists.
const mdInline = s => s.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((x, i) => (x.length > 2 && x[0] === '`' ? <code key={i} className="rounded bg-surface px-1 font-mono text-[.85em]">{x.slice(1, -1)}</code> : x.startsWith('**') && x.length > 4 ? <strong key={i}>{x.slice(2, -2)}</strong> : x))
function Md({ text }) {
  return (
    <div className="space-y-2">{String(text).split('```').map((chunk, i) => i % 2 ? (
      <pre key={i} className="overflow-x-auto rounded-lg bg-deep p-3 font-mono text-xs leading-relaxed text-white">{chunk.replace(/^[a-zA-Z]*\n/, '').trim()}</pre>
    ) : chunk.split(/\n{2,}/).map((b, j) => {
      b = b.trim()
      if (!b) return null
      const ls = b.split('\n')
      if (ls.every(l => /^[-*] /.test(l))) return <ul key={`${i}-${j}`} className="list-disc space-y-1 pl-5">{ls.map((l, k) => <li key={k}>{mdInline(l.slice(2))}</li>)}</ul>
      if (ls.every(l => /^\d+\. /.test(l))) return <ol key={`${i}-${j}`} className="list-decimal space-y-1 pl-5">{ls.map((l, k) => <li key={k}>{mdInline(l.replace(/^\d+\. /, ''))}</li>)}</ol>
      return <p key={`${i}-${j}`} className="whitespace-pre-wrap">{mdInline(b)}</p>
    }))}</div>
  )
}

export function AITutor() {
  const ctx = useTutorContext()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: 'Hi! I’m the STCA AI Tutor 👋 Ask me about our courses, prices and how to enroll, or get help with coding and math.' }])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef(null)
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }) }, [msgs, busy, open])
  const ask = async raw => {
    const t = raw.trim()
    if (!t || busy) return
    const next = [...msgs, { role: 'user', content: t }]
    setMsgs(next); setText(''); setBusy(true)
    try { setMsgs([...next, { role: 'assistant', content: await askAI(next.slice(1), 'tutor', ctx) }]) } catch (x) { setMsgs([...next, { role: 'assistant', content: `Sorry, the STCA AI Tutor is not available right now. You can message us on Telegram (@Sol_Ethio_Coder) instead. (${x.message})` }]) }
    setBusy(false)
  }
  const send = e => { e.preventDefault(); ask(text) }
  return (
    <>
      {open && (
        <div role="dialog" aria-label="STCA AI Tutor" className="no-print card fixed bottom-[8.75rem] right-5 z-50 flex h-[30rem] max-h-[calc(100dvh-10rem)] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden !rounded-3xl shadow-2xl">
          <div className="flex items-center justify-between bg-deep px-5 py-4 text-white"><span className="flex items-center gap-2.5"><img src="/Images/logo-mark.svg" alt="" className="h-7 w-7" /><span><span className="block font-semibold leading-tight">STCA AI Tutor</span><span className="block text-[11px] text-white/60">Courses, prices and study help</span></span></span><button aria-label="Close tutor" onClick={() => setOpen(false)}><Icon n="close" /></button></div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => <div key={i} className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'ml-auto whitespace-pre-wrap bg-brand text-onbrand' : 'bg-soft'}`}>{m.role === 'user' ? m.content : <Md text={m.content} />}</div>)}
            {msgs.length === 1 && <div className="flex flex-wrap gap-2 pt-1">{QUICK.map(q => <button key={q} onClick={() => ask(q)} className="rounded-full border border-hair-strong px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:bg-soft">{q}</button>)}</div>}
            {busy && <p className="text-sm text-muted">Thinking…</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-hair p-3"><input aria-label="Your question" className="field !mt-0" value={text} onChange={e => setText(e.target.value)} placeholder="Ask a question" /><button className="btn btn-primary !px-4" disabled={busy}>Send</button></form>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="no-print btn btn-primary shadow-lg"><Icon n="spark" className="h-4 w-4" />STCA AI Tutor</button>
    </>
  )
}
