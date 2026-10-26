import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './ui.jsx'
import { INTRO_VIDEO_ID as ID, INTRO_VIDEO_URL } from './data.js'

const YT = 'https://www.youtube-nocookie.com'
export const embedUrl = origin => `${YT}/embed/${ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&loop=1&playlist=${ID}${origin ? '&origin=' + encodeURIComponent(origin) : ''}`
const THUMBS = [`https://i.ytimg.com/vi/${ID}/maxres2.jpg`, `https://i.ytimg.com/vi/${ID}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${ID}/hqdefault.jpg`]

// Intro video section. The YouTube player is only loaded after a tap (saves visitors' mobile data), and it pauses itself when scrolled out of view.
export default function IntroVideo() {
  const [play, setPlay] = useState(false)
  const [thumb, setThumb] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const box = useRef(null)
  const frame = useRef(null)

  useEffect(() => {
    if (!play || !box.current) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), YT)
    }, { threshold: 0.15 })
    io.observe(box.current)
    return () => io.disconnect()
  }, [play])

  const move = e => {
    if (play) return
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 14, y: ((e.clientY - r.top) / r.height - 0.5) * -14 })
  }
  const points = [['bg-leaf', '1:1 lessons with real tutors'], ['bg-gold', 'Hands-on projects, not only theory'], ['bg-rose', 'Online or in person in Addis Ababa']]
  const chip = 'glass float absolute hidden rounded-full border border-hair px-4 py-2 text-sm font-bold text-text shadow-lg sm:block'

  return (
    <section className="mx-auto max-w-6xl px-5 py-16" aria-label="Introduction video">
      <div className="relative overflow-hidden rounded-[2rem] bg-deep p-8 text-white md:p-14">
        <div className="dots absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: 'var(--g1)', opacity: 0.18 }} aria-hidden="true" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full blur-3xl" style={{ background: 'var(--g3)', opacity: 0.22 }} aria-hidden="true" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal">
            <p className="eyebrow !text-[#fbbf24]">Introducing the new STCA</p>
            <h2 className="mt-3 text-4xl leading-tight md:text-6xl">Meet us in <span className="grad-text">30 seconds</span></h2>
            <p className="mt-4 max-w-xl text-lg text-white/75">A quick hello from the Sol Tutoring &amp; Coding Academy team about our updated website, and how we help students learn to code and master school subjects.</p>
            <ul className="mt-6 space-y-3">{points.map(([c, t]) => <li key={t} className="flex items-center gap-3 text-white/90"><span className={`h-2.5 w-2.5 rounded-full ${c}`} />{t}</li>)}</ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn bg-white text-[#0b1226]" to="/html/contact">Book a Free Call <Icon n="arrow" className="h-4 w-4" /></Link>
              <a className="btn border border-white/30 text-white hover:bg-white/10" href={INTRO_VIDEO_URL} target="_blank" rel="noopener"><Icon n="yt" className="h-4 w-4" /> Watch on YouTube</a>
            </div>
          </div>

          <div ref={box} className="relative mx-auto w-[min(19rem,76vw)]" style={{ perspective: '1000px' }} onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
            <div className="halo" aria-hidden="true" />
            <span className={`${chip} -left-10 top-20`} style={{ animationDelay: '0s' }} aria-hidden="true">▶ 30 sec</span>
            <span className={`${chip} -right-10 top-1/2`} style={{ animationDelay: '1.2s' }} aria-hidden="true">🎓 1:1 tutors</span>
            <span className={`${chip} -left-8 bottom-16`} style={{ animationDelay: '2.4s' }} aria-hidden="true">📍 Addis Ababa</span>
            <div className="relative rounded-[2.6rem] border-[10px] border-[#0b1226] bg-black shadow-2xl ring-1 ring-white/20 transition-transform duration-200 ease-out" style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}>
              <span className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.9rem] bg-[#0b1226]">
                {play ? (
                  <iframe ref={frame} title="STCA introduction video" src={embedUrl(typeof location !== 'undefined' ? location.origin : '')} className="absolute inset-0 h-full w-full"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                ) : (
                  <button onClick={() => setPlay(true)} aria-label="Play the STCA introduction video" className="group absolute inset-0 block h-full w-full text-left">
                    {thumb < THUMBS.length
                      ? <img src={THUMBS[thumb]} alt="" className="kenburns absolute inset-0 h-full w-full object-cover" onError={() => setThumb(t => t + 1)} />
                      : <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(160deg,#0b1226,#1d4ed8)' }}><img src="/Images/logo-mark.svg" alt="" className="h-28 w-28" /></div>}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,7,14,.9), rgba(4,7,14,.15) 55%, rgba(4,7,14,.35))' }} />
                    <span className="absolute left-4 top-9 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-xs font-bold backdrop-blur"><span className="h-2 w-2 rounded-full bg-red-500" />YouTube Short</span>
                    <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center" aria-hidden="true">
                      <span className="play-ring" /><span className="play-ring" style={{ animationDelay: '1.1s' }} />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#0b1226] shadow-2xl transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" className="ml-1 h-9 w-9" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-5"><span className="block font-display text-2xl leading-tight">Meet the new STCA</span><span className="mt-1 block text-sm text-white/70">30 seconds · tap to play</span></span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
