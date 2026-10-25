import { useState, useRef, useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDB } from './store.js'
import { NotFound } from './pages.jsx'
import { submitRequest } from './codes.js'
import { P, G, Icon, Logo, CourseImg, CourseCard, CountUp, DEFAULT_TAG, slugOf, useTag, usePage } from './ui.jsx'
import { reviews, pricing, contactFaqs, TELEGRAM, YOUTUBE, EMAIL, PHONE, PHONE_TEL, FORM, PLATFORM, PORTFOLIO } from './data.js'

const Wrap = ({ children, className = '' }) => <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>
const Head = ({ eyebrow, title, sub, center }) => (
  <div className={`reveal ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
    {sub && <p className="mt-3 text-lg text-muted">{sub}</p>}
  </div>
)
const Stat = ({ n, l }) => <div className="cursor-default transition duration-300 hover:-translate-y-1 hover:scale-105"><dt className="font-display text-3xl font-semibold">{n}</dt><dd className="mt-0.5 text-sm text-muted">{l}</dd></div>
const Pill = ({ children }) => <p className="inline-flex items-center gap-2 rounded-full border border-hair bg-surface px-4 py-1.5 text-sm font-semibold shadow-sm"><span className="h-2 w-2 rounded-full bg-leaf" />{children}</p>

function Motto() {
  const words = ['Practice', 'makes', 'you', 'perfect']
  const loop = 'PRACTICE MAKES YOU PERFECT ✦ PRACTICE MAKES YOU PERFECT ✦ '
  return (
    <section className="relative overflow-hidden py-20 md:py-28" aria-label="Our motto">
      <div className="motto-glow" aria-hidden="true" />
      <div className="motto-track" aria-hidden="true">{[0, 1].map(k => <span key={k}>{loop}</span>)}</div>
      {['s1', 's2', 's3', 's4'].map(k => <span key={k} className={`motto-star ${k}`} aria-hidden="true">✦</span>)}
      <Wrap className="relative text-center">
        <p className="eyebrow !text-[#fbbf24]">Our motto</p>
        <h2 className="reveal motto-title mt-6 uppercase">{words.map((w, i) => <span key={w} className={i === 3 ? 'motto-hero' : ''}>{w}</span>)}</h2>
        <div className="motto-line" aria-hidden="true" />
        <p className="mx-auto mt-7 max-w-xl text-lg text-white/60">Every lesson, every line of code and every solved problem brings you one step closer.</p>
      </Wrap>
    </section>
  )
}

export function Footer({ tag }) {
  const soc = 'flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition duration-300 hover:-translate-y-1 hover:scale-110 hover:border-transparent hover:bg-white hover:text-[#0b1226]'
  return (
    <footer className="no-print mt-24 bg-deep text-white/75">
      <div className="grad-bar" />
      <Motto />
      <Wrap className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-white"><Logo /></Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Sol Tutoring &amp; Coding Academy helps students in Addis Ababa and beyond learn to code, master math, and build the digital skills that matter — one student at a time.</p>
          <div className="mt-5 flex gap-2">
            <a className={soc} href={TELEGRAM} aria-label="Telegram" target="_blank" rel="noopener"><Icon n="tg" /></a>
            <a className={soc} href={YOUTUBE} aria-label="YouTube" target="_blank" rel="noopener"><Icon n="yt" /></a>
            <a className={soc} href={`mailto:${EMAIL}`} aria-label="Email"><Icon n="mail" /></a>
          </div>
        </div>
        <div><h3 className="font-body text-sm font-bold uppercase tracking-wider text-white">Explore</h3><ul className="mt-4 space-y-2.5 text-sm"><li><Link to="/">Home</Link></li><li><Link to="/html/courses">Courses</Link></li><li><Link to="/html/contact">Contact</Link></li><li><Link to="/learn">Learn online</Link></li><li><a href={PLATFORM} target="_blank" rel="noopener" className="inline-flex items-center gap-1">STCA Platform <Icon n="ext" className="h-3.5 w-3.5" /></a></li></ul></div>
        <div><h3 className="font-body text-sm font-bold uppercase tracking-wider text-white">Courses</h3><ul className="mt-4 space-y-2.5 text-sm"><li><Link to="/html/python-course">Python</Link></li><li><Link to="/html/web-course">Web Development</Link></li><li><Link to="/html/scratch-course">Scratch</Link></li><li><Link to="/html/math-course">Math Tutoring</Link></li></ul></div>
        <div><h3 className="font-body text-sm font-bold uppercase tracking-wider text-white">Get in touch</h3><ul className="mt-4 space-y-2.5 text-sm"><li>{PHONE}</li><li>{EMAIL}</li><li>Addis Ababa, Ethiopia</li></ul></div>
      </Wrap>
      <Wrap className="pb-8">
        <p className="flex items-center justify-center gap-2 border-t border-white/10 pt-8 text-center">
          <span className="text-white/60">Developer:</span>
          <a href={PORTFOLIO} target="_blank" rel="noopener" className="dev-link group inline-flex items-center gap-1.5 pb-1 font-display text-lg text-white">Sol Ethio Coder <Icon n="ext" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </p>
      </Wrap>
      <div className="border-t border-white/10 px-5 py-6 text-center text-sm">© 2026 Sol Tutoring &amp; Coding Academy. All rights reserved.{tag !== DEFAULT_TAG && <> · {tag}</>}</div>
    </footer>
  )
}

function Hero() {
  const [t, setT] = useState({ x: 0, y: 0 })
  const chips = [['🐍 Python', 'left-0 top-8', '0s'], ['📐 Math', 'right-0 top-20', '1s'], ['🎮 Scratch', 'left-1 top-[44%]', '2s'], ['💻 Web', 'right-2 top-[52%]', '3s']]
  return (
    <section className="hero-bg overflow-hidden">
      <Wrap className="grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div>
          <div className="rise"><Pill>Now enrolling — Addis Ababa &amp; online</Pill></div>
          <h1 className="rise mt-6 text-6xl leading-[1.02] md:text-8xl" style={{ animationDelay: '.1s' }}>Learn <span className="grad-text">Coding</span></h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: '.2s' }}>Sol Tutoring &amp; Coding Academy helps students master academics and coding from scratch — with real tutors, real projects, and real progress you can see.</p>
          <div className="rise mt-6 max-w-xl rounded-2xl border border-hair bg-surface/70 p-5" style={{ animationDelay: '.3s' }}>
            <div className="flex gap-4"><span className="w-1 shrink-0 rounded-full" style={{ background: 'linear-gradient(var(--g1),var(--g3))' }} />
              <div><p className="eyebrow">Our mission</p><p className="mt-1.5 text-muted">To make quality tutoring and coding education accessible to every student in Addis Ababa and beyond — one patient lesson, one solved problem, one confident student at a time.</p></div></div>
          </div>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '.4s' }}><Link className={P} to="/html/courses">Explore Courses <Icon n="arrow" className="h-4 w-4" /></Link><Link className={G} to="/html/contact">Book a Free Call</Link></div>
          <dl className="rise mt-10 flex gap-10 border-t border-hair pt-6" style={{ animationDelay: '.5s' }}><Stat n={<CountUp to={50} suffix="+" />} l="Students taught" /><Stat n={<CountUp to={7} />} l="Courses offered" /><Stat n="1:1" l="Personalized tutoring" /></dl>
        </div>
        <div className="relative mx-auto h-[26rem] w-full max-w-md lg:h-[32rem]" style={{ perspective: '900px' }} onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setT({ x: ((e.clientX - r.left) / r.width - 0.5) * 12, y: ((e.clientY - r.top) / r.height - 0.5) * -12 }) }} onMouseLeave={() => setT({ x: 0, y: 0 })}>
          <div className="absolute inset-6 overflow-hidden rounded-[2rem] bg-deep shadow-2xl" style={{ transform: `rotateX(${t.y}deg) rotateY(${t.x}deg)`, transition: 'transform .25s ease-out' }}>
            <div className="dots absolute inset-0 opacity-30" />
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl" style={{ background: 'var(--g2)', opacity: 0.35 }} />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full blur-3xl" style={{ background: 'var(--g1)', opacity: 0.3 }} />
            <img src="/Images/logo-mark.svg" alt="Sol Tutoring & Coding Academy logo — a shield blending a book and code brackets" className="float relative mx-auto mt-16 w-56 max-w-[60%] drop-shadow-2xl lg:mt-24" />
            <p className="relative z-20 mt-6 text-center font-display text-2xl text-white">Practice makes you perfect!</p>
          </div>
          {chips.map(([t, pos, d]) => <span key={t} className={`glass float absolute ${pos} rounded-full border border-hair px-4 py-2 text-sm font-bold shadow-lg`} style={{ animationDelay: d }}>{t}</span>)}
        </div>
      </Wrap>
    </section>
  )
}

function Features() {
  const f = [['user', 'Expert Tutors', 'Experienced and passionate instructors guiding your journey.'], ['code', 'Practical Learning', 'Hands-on projects and real-world coding exercises.'], ['coin', 'Affordable', 'High-quality learning at fair prices without compromise.']]
  return (
    <Wrap className="py-8"><div className="reveal grid gap-6 md:grid-cols-3">
      {f.map(([i, t, d]) => <div key={t} className="card card-hover group p-7"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-accent transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-onbrand"><Icon n={i} className="h-6 w-6" /></span><h3 className="mt-5 text-xl font-semibold">{t}</h3><p className="mt-2 text-muted">{d}</p></div>)}
    </div></Wrap>
  )
}

const ORDER = ['web', 'math', 'scratch', 'python', 'digital', 'exam', 'js', 'cpp', 'cs', 'ai', 'english']
const rank = c => { const i = ORDER.indexOf(c.id); return i < 0 ? 99 : i }
function CourseCarousel() {
  const db = useDB()
  const list = db.courses.filter(c => c.published).sort((a, b) => rank(a) - rank(b))
  const items = [...list, ...list]
  return (
    <section className="py-20">
      <Wrap><Head eyebrow="What we teach" title="Our Courses" sub="Pick a subject. Every course is taught 1:1 and adapted to the student." /></Wrap>
      <div className="marquee mt-10" aria-label="Our courses">
        <div className="marquee-track">
          {items.map((c, i) => <div key={c.id + i} className="w-[19rem] shrink-0" aria-hidden={i >= list.length || undefined} inert={i >= list.length ? '' : undefined}><CourseCard c={c} to={c.tutorPrice ? `/html/${slugOf(c)}` : `/learn/${c.id}`} /></div>)}
        </div>
      </div>
      <p className="mt-2 text-center text-sm text-muted">Hover to pause · <Link className="font-semibold text-accent underline underline-offset-4" to="/html/courses">See all courses and pricing</Link></p>
    </section>
  )
}

function How() {
  const s = [['Book a free call', 'Tell us the student’s age, goals and level. No commitment.'], ['Get a learning plan', 'We pick the course, pace and schedule that fit.'], ['Learn 1:1 and grow', 'Lessons online or in Addis Ababa, with projects and regular progress updates.']]
  return (
    <Wrap className="py-10"><Head center eyebrow="How it works" title="From first call to first project" />
      <div className="reveal mt-12 grid gap-6 md:grid-cols-3">
        {s.map(([t, d], i) => <div key={t} className="card card-hover group relative overflow-hidden p-7"><span className="grad-text inline-block font-display text-6xl font-bold transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">0{i + 1}</span><h3 className="mt-3 text-xl font-semibold">{t}</h3><p className="mt-2 text-muted">{d}</p></div>)}
      </div>
    </Wrap>
  )
}

function LearnBanner() {
  const f = [['cap', 'Certificate of completion', 'Pass the final exam with 70% or more to earn it.'], ['check', 'Interactive lessons', 'Live code editor, graphs, drag-to-order and quizzes.'], ['spark', 'AI tutor, any time', 'Stuck? Ask a question and get a hint.']]
  return (
    <Wrap className="py-16"><div className="relative overflow-hidden rounded-[2rem] bg-deep p-8 text-white md:p-14">
      <div className="dots absolute inset-0 opacity-20" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl" style={{ background: 'var(--g2)', opacity: 0.3 }} />
      <div className="relative grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow !text-[#fbbf24]">New: learn online</p>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl">Free lessons, quizzes and certificates</h2>
          <p className="mt-4 text-lg text-white/75">Practice between tutoring sessions with interactive lessons, pass the final exam, and earn your certificate. No account needed — two courses are completely free.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link className="btn bg-white text-[#0b1226]" to="/learn">Start learning <Icon n="arrow" className="h-4 w-4" /></Link><a className="btn border border-white/30 text-white hover:bg-white/10" href={PLATFORM} target="_blank" rel="noopener">Open STCA Platform <Icon n="ext" className="h-4 w-4" /></a></div>
        </div>
        <ul className="reveal space-y-4">{f.map(([i, t, d]) => <li key={t} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#fbbf24]"><Icon n={i} /></span><div><p className="font-semibold">{t}</p><p className="text-sm text-white/70">{d}</p></div></li>)}</ul>
      </div>
    </div></Wrap>
  )
}

function ReviewCard({ r }) {
  return (
    <figure className="card card-hover group flex h-full flex-col p-7">
      <Icon n="quote" className="h-8 w-8 text-accent/40 transition duration-300 group-hover:rotate-12 group-hover:scale-125 group-hover:text-accent" />
      <p className="mt-3 text-yellow-500" aria-label="5 out of 5 stars">★★★★★</p>
      <blockquote className="mt-3 flex-1 leading-relaxed">“{r.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-hair pt-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-[#0b1226]" style={{ background: 'linear-gradient(135deg,#4ade80,#fbbf24)' }}>{r.init}</span><span className="font-semibold">{r.name}<span className="block text-sm font-normal text-muted">{r.role}</span></span></figcaption>
    </figure>
  )
}
const StatCard = () => (
  <div className="card card-hover flex h-full flex-col justify-center p-7 text-center">
    <p className="grad-text font-display text-6xl font-bold">50+</p>
    <p className="mt-2 text-lg font-semibold">students taught</p>
    <p className="mt-1 text-muted">1:1 lessons in Addis Ababa and online</p>
  </div>
)
const JoinCard = () => (
  <div className="flex h-full flex-col justify-center rounded-[1.25rem] bg-deep p-7 text-white">
    <p className="eyebrow !text-[#fbbf24]">Your turn</p>
    <p className="mt-2 font-display text-3xl leading-tight">Be our next success story</p>
    <p className="mt-2 text-white/70">Start with a free 15-minute intro call.</p>
    <Link to="/html/contact" className="btn mt-5 self-start bg-white !py-2.5 text-[#0b1226]">Book a Free Call <Icon n="arrow" className="h-4 w-4" /></Link>
  </div>
)
// One scrolling row. Repeats the cards until the loop is wide enough for any screen, then scrolls by itself (pauses on hover).
function ReviewRow({ cards, reverse }) {
  const reps = Math.max(1, Math.ceil(3200 / (cards.length * 376)))
  const base = Array.from({ length: reps }, () => cards).flat()
  const items = [...base, ...base]
  return (
    <div className="marquee" role="group" aria-label="Student reviews">
      <div className={`marquee-track ${reverse ? 'rev' : ''}`} style={{ animationDuration: `${Math.max(35, base.length * 9)}s` }}>
        {items.map((c, i) => (
          <div key={i} className="w-[22rem] max-w-[85vw] shrink-0" aria-hidden={i >= cards.length || undefined} inert={i >= cards.length ? '' : undefined}>
            {c.stat ? <StatCard /> : c.join ? <JoinCard /> : <ReviewCard r={c.r} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function Testimonials() {
  // Every review in data.js appears here automatically. With 6 or more reviews the section becomes two rows moving in opposite directions.
  const cards = reviews.flatMap((r, i) => [{ r }, ...(i === 1 ? [{ stat: true }] : [])]).concat([{ join: true }])
  const rows = reviews.length >= 6 ? [cards.filter((_, i) => i % 2 === 0), cards.filter((_, i) => i % 2 === 1)] : [cards]
  return (
    <section className="py-16">
      <Wrap><Head center eyebrow="What families are saying" title="Real students. Real progress." sub="A few words from students and parents we’ve worked with." /></Wrap>
      <div className="mt-10">{rows.map((row, i) => <ReviewRow key={i} cards={row} reverse={i === 1} />)}</div>
      <Wrap><dl className="card mt-4 grid grid-cols-2 gap-6 p-8 text-center md:grid-cols-4"><Stat n={<CountUp to={50} suffix="+" />} l="Students taught" /><Stat n={<CountUp to={7} />} l="Courses offered" /><Stat n="< 3 hrs" l="Avg. reply time" /><Stat n="1:1" l="Personalized tutoring" /></dl></Wrap>
    </section>
  )
}

function CtaBand() {
  return (
    <Wrap className="py-8"><div className="rounded-[2rem] bg-soft p-10 text-center md:p-16">
      <h2 className="text-4xl md:text-5xl">Ready to start your <span className="grad-text">next lesson</span>?</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted">Book a free 15-minute intro call. We’ll find the right course and schedule together.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link className={P} to="/html/contact">Book a Free Call</Link><a className={G} href={TELEGRAM} target="_blank" rel="noopener"><Icon n="tg" className="h-4 w-4" /> Chat on Telegram</a></div>
    </div></Wrap>
  )
}

export function Home() {
  usePage('Empowering Young Minds | STCA', '1:1 tutoring in Addis Ababa for Python, Web Development, Scratch, Math and Exam Prep. Personalized coding and academic tutoring for all ages.')
  return <><Hero /><Features /><CourseCarousel /><How /><LearnBanner /><Testimonials /><CtaBand /></>
}

export function CoursesPage() {
  const db = useDB()
  usePage('STCA | Courses', "Explore STCA's courses — Python, Web Development, Scratch, Math Tutoring, Digital Literacy and Exam Prep — with simple hourly pricing.")
  const list = db.courses.filter(c => c.published && c.tutorPrice)
  return (
    <>
      <section className="hero-bg"><Wrap className="pb-8 pt-16 text-center"><p className="eyebrow">1:1 tutoring</p><h1 className="mt-3 text-5xl md:text-7xl">Our Courses</h1><p className="mx-auto mt-4 max-w-xl text-lg text-muted">Choose from our variety of academic and coding courses.</p></Wrap></section>
      <Wrap className="py-10"><div className="reveal grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{list.map(c => <CourseCard key={c.id} c={c} src={c.listImg} to={`/html/${slugOf(c)}`} text={c.listBlurb || c.blurb} />)}</div></Wrap>
      <Wrap className="py-16">
        <Head center eyebrow="Simple, hourly pricing" title="No hidden fees, no packages to decode" sub="Pay per hour, switch courses anytime. Prices in Ethiopian Birr." />
        <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map(p => (
            <div key={p.t} className={`relative flex flex-col rounded-[1.25rem] p-7 ${p.pop ? 'bg-deep text-white shadow-2xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_70px_-24px_rgba(251,191,36,.45)]' : 'card card-hover'}`}>
              {p.pop && <span className="absolute -top-3 left-6 rounded-full bg-[#fbbf24] px-3 py-1 text-xs font-bold text-[#0b1226]">Most popular</span>}
              <h3 className="text-xl font-semibold">{p.t}</h3>
              <p className="mt-3 font-display text-3xl font-semibold">{p.p}</p>
              <ul className={`mt-5 flex-1 space-y-2.5 ${p.pop ? 'text-white/75' : 'text-muted'}`}>{p.f.map(x => <li key={x} className="flex gap-2"><Icon n="check" className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />{x}</li>)}</ul>
              <Link to="/html/contact" className={`btn mt-7 ${p.pop ? 'bg-white text-[#0b1226]' : 'btn-primary'}`}>Get Started</Link>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-muted">Not sure which course fits? <Link className="font-semibold text-accent underline underline-offset-4" to="/html/contact">Message us</Link> and we’ll help you choose.</p>
      </Wrap>
    </>
  )
}

export function CourseDetail() {
  const { slug } = useParams()
  const db = useDB()
  const key = slug.replace(/\.html$/, '')
  const c = db.courses.find(x => slugOf(x) === key && x.published)
  usePage(c?.pageTitle || (c && `${c.title} | STCA`), c?.meta)
  useTag(c?.tag)
  if (!c) return <NotFound />
  const enroll = `/html/contact?course=${encodeURIComponent(c.title)}`
  return (
    <>
      <section className="hero-bg"><Wrap className="grid items-center gap-10 pb-10 pt-14 md:grid-cols-2">
        <div>
          <Link to="/html/courses" className="text-sm font-semibold text-muted hover:text-text">← All courses</Link>
          <h1 className="mt-4 text-5xl leading-tight md:text-6xl">{c.h1 || c.title}</h1>
          {c.tagline && <p className="mt-4 text-lg text-muted">{c.tagline}</p>}
          <div className="mt-7 flex flex-wrap gap-3"><Link className={P} to={enroll}>Enroll Now</Link>{c.lessons?.length > 0 && <Link className={G} to={`/learn/${c.id}`}>Try free lessons</Link>}</div>
        </div>
        <div className="card overflow-hidden rounded-[1.75rem] p-2"><CourseImg c={c} src={c.detailImg} className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" /></div>
      </Wrap></section>
      <Wrap className="grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-3xl">{c.learnTitle || 'What Students Will Learn'}</h2>
          {c.learnSub && <p className="mt-2 text-muted">{c.learnSub}</p>}
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">{(c.learn || []).map(x => <li key={x} className="card flex items-center gap-3 !rounded-xl px-4 py-3 font-medium"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf"><Icon n="check" className="h-4 w-4" /></span>{x}</li>)}</ul>
          {c.perks && <div className="mt-10 grid gap-5 md:grid-cols-3">{c.perks.map(([t, d]) => <div key={t} className="rounded-2xl bg-soft p-6"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-1 text-muted">{d}</p></div>)}</div>}
          {c.lessons?.length > 0 && <div className="mt-10 rounded-2xl border border-hair p-6"><div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-accent"><Icon n="cap" /></span><div><h3 className="text-lg font-semibold">Practice online between sessions</h3><p className="mt-1 text-muted">Interactive lessons with quizzes and a certificate. {c.price > 0 ? `${c.price} ETB.` : 'Free, no account needed.'}</p><Link className="mt-3 inline-flex items-center gap-1.5 font-semibold text-accent" to={`/learn/${c.id}`}>Open online lessons <Icon n="arrow" className="h-4 w-4" /></Link></div></div></div>}
        </div>
        {c.tutorPrice > 0 && (
          <aside className="lg:sticky lg:top-28 lg:self-start"><div className="card p-7">
            <p className="eyebrow">1:1 tutoring</p>
            <p className="mt-2 font-display text-4xl font-semibold">{c.tutorPrice} <span className="text-lg font-normal text-muted">Birr / hour</span></p>
            <ul className="mt-4 space-y-2 text-sm text-muted"><li className="flex gap-2"><Icon n="check" className="h-5 w-5 text-leaf" />Online or in Addis Ababa</li><li className="flex gap-2"><Icon n="check" className="h-5 w-5 text-leaf" />Flexible scheduling</li><li className="flex gap-2"><Icon n="check" className="h-5 w-5 text-leaf" />Pay as you go</li></ul>
            <Link className={`${P} mt-6 w-full`} to={enroll}>Enroll Now</Link>
            <a className={`${G} mt-3 w-full`} href={TELEGRAM} target="_blank" rel="noopener"><Icon n="tg" className="h-4 w-4" /> Ask on Telegram</a>
          </div></aside>
        )}
      </Wrap>
    </>
  )
}

function Network() {
  const pts = useMemo(() => { let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; return Array.from({ length: 26 }, () => [r() * 100, r() * 100]) }, [])
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-accent opacity-30" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {pts.flatMap((a, i) => pts.slice(i + 1).filter(b => Math.hypot(a[0] - b[0], a[1] - b[1]) < 24).map((b, k) => <line key={`${i}-${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="currentColor" strokeWidth=".15" />))}
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r=".7" fill="currentColor" />)}
    </svg>
  )
}

const MODES = [['online', 'Online'], ['in-person', 'In person (Addis Ababa)'], ['not-sure', 'Not sure yet']]
const WHO = [['myself', 'For myself'], ['child', 'For my child'], ['other', 'For someone else']]

function Choice({ value, onChange, options, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="mt-1.5 flex flex-wrap gap-2">
      {options.map(([v, l]) => (
        <button type="button" key={v} role="radio" aria-checked={value === v} onClick={() => onChange(v)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${value === v ? 'border-transparent bg-brand text-onbrand shadow-md' : 'border-hair-strong hover:border-accent hover:bg-soft'}`}>{l}</button>
      ))}
    </div>
  )
}

export function ContactPage() {
  usePage('STCA | Contact', 'Get in touch with Sol Tutoring & Coding Academy. Send a request, message us on Telegram, or call directly. We usually reply within hours.')
  useTag('Practice makes you perfect! 💡')
  const db = useDB()
  const [sp] = useSearchParams()
  const [tab, setTab] = useState('request')
  const courses = ['Not sure yet', ...db.courses.filter(c => c.published && c.tutorPrice).map(c => c.title)]
  const blank = { name: '', contact: '', email: '', course: sp.get('course') || 'Not sure yet', who: 'myself', age: '', mode: 'online', time: '', msg: '', website: '' }
  const [f, setF] = useState(blank)
  const [status, setStatus] = useState('idle')
  const [info, setInfo] = useState(null)
  const t0 = useRef(Date.now())
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const pick = k => v => setF(x => ({ ...x, [k]: v }))
  const options = [...new Set([f.course, ...courses])]
  const summary = `Hello STCA! My name is ${f.name || '...'}. I'm interested in ${f.course}${f.mode !== 'not-sure' ? ` (${f.mode})` : ''}. Contact: ${f.contact || f.email || '...'}.${f.msg ? ' ' + f.msg : ''}`
  const submit = async e => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending'); setInfo(null)
    try { setInfo(await submitRequest({ ...f, elapsed: Date.now() - t0.current })); setStatus('sent') } catch (x) { setInfo({ error: x.message }); setStatus('error') }
  }
  const reset = () => { setF({ ...blank, course: 'Not sure yet' }); setStatus('idle'); setInfo(null); t0.current = Date.now() }
  const lab = 'block text-sm font-semibold'
  const chan = 'card card-hover flex items-center gap-3 !rounded-2xl p-4'
  const ch = [['phone', 'Phone', PHONE, `tel:${PHONE_TEL}`], ['mail', 'Email', EMAIL, `mailto:${EMAIL}`], ['tg', 'Telegram', '@Sol_Ethio_Coder', TELEGRAM], ['yt', 'YouTube', '@stcaAcademy', YOUTUBE]]
  const tgRef = `${TELEGRAM}?text=${encodeURIComponent(status === 'sent' && info?.id ? `Hello STCA! I just sent request ${info.id}. ${summary}` : summary)}`
  return (
    <>
      <section className="hero-bg relative overflow-hidden"><Network />
        <Wrap className="relative py-16 text-center md:py-20">
          <Pill>Currently online &amp; taking new students</Pill>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-5xl md:text-7xl">Let’s connect the dots — your next lesson starts here.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">Every node in that network behind you is a student, a tutor, a question answered. Send us a request below and we’ll plug you in — usually within a few hours.</p>
          <dl className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4"><Stat n="< 3 hrs" l="Avg. reply time" /><Stat n={<CountUp to={7} />} l="Courses offered" /><Stat n="1:1" l="Personalized tutoring" /></dl>
        </Wrap>
      </section>

      <Wrap className="grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:py-16">
        <div className="card self-start p-6 sm:p-8">
          <div className="inline-flex rounded-full bg-soft p-1" role="tablist">{[['request', 'Request a call'], ['reg', 'Registration form']].map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${tab === k ? 'bg-surface shadow' : 'text-muted hover:text-text'}`}>{l}</button>)}</div>

          {tab === 'reg' ? (
            <div className="mt-6"><h2 className="text-3xl">Open the registration form</h2><p className="mt-2 text-muted">Ready to enroll? Our official registration form opens in a new tab. Google Forms doesn’t reliably embed across every browser, so we keep it as its own page.</p><a className={`${P} mt-6`} href={FORM} target="_blank" rel="noopener">Open registration form <Icon n="ext" className="h-4 w-4" /></a></div>
          ) : status === 'sent' ? (
            <div className="mt-6 text-center sm:text-left" role="status">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf/15 text-leaf sm:mx-0"><Icon n="check" className="h-7 w-7" /></span>
              <h2 className="mt-4 text-3xl">Request received!</h2>
              <p className="mt-2 text-muted">Thank you, {f.name.split(' ')[0]}. We’ll contact you at <b className="text-text">{f.contact}</b> — usually within a few hours.</p>
              <p className="mt-4 inline-block rounded-xl bg-soft px-4 py-2 text-sm">Your reference: <b className="font-mono">{info?.id}</b></p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start"><a className={P} href={tgRef} target="_blank" rel="noopener"><Icon n="tg" className="h-4 w-4" /> Message us on Telegram too</a><button className={G} onClick={reset}>Send another request</button></div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6" noValidate>
              <h2 className="text-3xl">Request a free intro call</h2>
              <p className="mt-2 text-muted">Tell us a little about the student. It takes about a minute.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className={lab}>Your name *<input required autoComplete="name" className="field" value={f.name} onChange={set('name')} /></label>
                <label className={lab}>Phone or Telegram *<input required autoComplete="tel" className="field" placeholder="+251… or @username" value={f.contact} onChange={set('contact')} /></label>
                <label className={lab}>Email (optional)<input type="email" autoComplete="email" className="field" value={f.email} onChange={set('email')} /></label>
                <label className={lab}>Course of interest<select className="field" value={f.course} onChange={set('course')}>{options.map(o => <option key={o}>{o}</option>)}</select></label>
                <div className={`${lab} sm:col-span-2`}>Who is it for?<Choice label="Who is it for" value={f.who} onChange={pick('who')} options={WHO} /></div>
                {f.who !== 'myself' && <label className={lab}>Student age or grade<input className="field" placeholder="e.g. 10 years, Grade 5" value={f.age} onChange={set('age')} /></label>}
                <div className={`${lab} sm:col-span-2`}>How would you like to learn?<Choice label="Session type" value={f.mode} onChange={pick('mode')} options={MODES} /></div>
                <label className={`${lab} sm:col-span-2`}>Best days or times to reach you (optional)<input className="field" placeholder="e.g. weekday evenings" value={f.time} onChange={set('time')} /></label>
                <label className={`${lab} sm:col-span-2`}>Tell us what you’d like to learn<textarea rows="4" className="field" value={f.msg} onChange={set('msg')} placeholder="Goals, current level, questions…" /></label>
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label></div>
              </div>
              {status === 'error' && (
                <div className="mt-5 rounded-2xl border border-rose/40 bg-rose/10 p-4" role="alert">
                  <p className="font-semibold text-rose">{info?.error || 'Something went wrong.'}</p>
                  <p className="mt-1 text-sm text-muted">You can still reach us right now:</p>
                  <div className="mt-3 flex flex-wrap gap-2"><a className={`${G} btn-sm`} href={tgRef} target="_blank" rel="noopener"><Icon n="tg" className="h-4 w-4" /> Telegram</a><a className={`${G} btn-sm`} href={`mailto:${EMAIL}?subject=${encodeURIComponent('STCA request: ' + f.course)}&body=${encodeURIComponent(summary)}`}><Icon n="mail" className="h-4 w-4" /> Email</a></div>
                </div>
              )}
              <button className={`${P} mt-6 w-full sm:w-auto`} disabled={status === 'sending' || f.name.trim().length < 2 || f.contact.trim().length < 5}>{status === 'sending' ? 'Sending…' : 'Send my request'} <Icon n="arrow" className="h-4 w-4" /></button>
              <p className="mt-3 text-xs text-muted">We only use your details to reply to this request.</p>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h2 className="text-2xl">What happens next</h2>
            <ol className="mt-4 space-y-4">{[['We reply', 'Usually within a few hours, on the number or Telegram you gave us.'], ['Free 15-minute intro call', 'We learn the student’s goals and level. No commitment.'], ['Pick a schedule', 'Choose your course, days and times, then start your first lesson.']].map(([t, d], i) => (
              <li key={t} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-soft font-display font-bold text-accent">{i + 1}</span><span><b className="block">{t}</b><span className="text-sm text-muted">{d}</span></span></li>))}</ol>
          </div>
          <div><h2 className="text-2xl">Reach out directly</h2>
            <div className="reveal mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{ch.map(([i, l, v, hr]) => <a key={l} className={chan} href={hr} target={hr.startsWith('http') ? '_blank' : undefined} rel="noopener"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-accent"><Icon n={i} /></span><span className="min-w-0"><span className="block text-xs text-muted">{l}</span><span className="block truncate font-semibold">{v}</span></span></a>)}</div>
          </div>
          <div><p className="flex items-center gap-2 font-semibold"><Icon n="pin" className="h-5 w-5 text-accent" />Addis Ababa, Ethiopia</p>
            <iframe title="Map of Addis Ababa, Ethiopia" loading="lazy" className="mt-3 h-56 w-full rounded-2xl border border-hair" src="https://www.google.com/maps?q=Addis%20Ababa%2C%20Ethiopia&output=embed" /></div>
        </aside>
      </Wrap>

      <Wrap className="py-6"><div className="rounded-[2rem] bg-deep p-7 text-white sm:p-10 md:p-14">
        <p className="eyebrow !text-[#fbbf24]">Prefer to talk first?</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Book a free 15-minute intro call</h2>
        <p className="mt-3 text-white/75">No commitment — we’ll figure out the right course and schedule together.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[['Message on Telegram', 'Fastest way to reach us — usually replies within hours.', 'Chat now', TELEGRAM], ['Call directly', 'Prefer talking? Give us a call during the day.', PHONE, `tel:${PHONE_TEL}`], ['Pick a time slot', 'Tell us your availability and we’ll confirm a slot by email.', 'Request by email', `mailto:${EMAIL}?subject=Intro%20call%20request&body=Hi%20STCA%2C%20I%27d%20like%20to%20book%20a%20free%20intro%20call.%20My%20availability%20is%3A%20`]].map(([t, d, b, hr]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10"><h3 className="text-xl font-semibold">{t}</h3><p className="mt-2 text-white/70">{d}</p><a className="btn mt-5 bg-white !py-2.5 text-[#0b1226]" href={hr}>{b}</a></div>
          ))}
        </div>
      </div></Wrap>

      <Wrap className="max-w-3xl py-16">
        <Head eyebrow="Common questions" title="Before you reach out" sub="Quick answers — if yours isn’t here, just message us." />
        <div className="reveal mt-8 space-y-3">{contactFaqs.map(([q, a]) => (
          <details key={q} className="card group !rounded-2xl px-6 py-4 transition-colors hover:border-accent open:border-accent"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">{q}<span className="text-2xl text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 text-muted">{a}</p></details>
        ))}</div>
      </Wrap>
    </>
  )
}
