import { useState, useEffect } from 'react'
import { PASS } from './data.js'
export { PASS }

const norm = s => String(s ?? '').trim().toLowerCase().replace(/\s+/g, '')
export const isGraded = q => ['mcq', 'tf', 'fill', 'order', 'match', 'checklist', 'task', 'pytask', 'jstask'].includes(q.t)
export const actsOf = l => l.acts || (l.q?.q ? [{ t: 'mcq', ...l.q }] : [])
export const examOf = c => (c.exam?.length ? c.exam : (c.lessons || []).flatMap(actsOf).filter(q => ['mcq', 'tf', 'fill'].includes(q.t)))
export function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
export function initVal(q) {
  if (q.t === 'order') { let a = shuffle(q.items); if (a.every((x, i) => x === q.items[i])) a = [...a.slice(1), a[0]]; return a }
  if (q.t === 'match') return q.pairs.map(() => '')
  return q.t === 'fill' ? '' : null
}
export function grade(q, v) {
  if (q.t === 'mcq' || q.t === 'tf') return v === q.answer
  if (q.t === 'fill') return [q.answer, ...(q.alt || [])].some(a => norm(a) === norm(v))
  if (q.t === 'order') return Array.isArray(v) && v.length === q.items.length && v.every((x, i) => x === q.items[i])
  if (q.t === 'match') return Array.isArray(v) && v.every((x, i) => x === q.pairs[i][1])
  return false
}

export function Question({ q, value, onChange, locked, mark }) {
  const tone = sel => (sel ? (mark == null ? 'border-accent bg-accent/10' : mark ? 'border-leaf bg-leaf/15' : 'border-rose bg-rose/10') : 'border-hair-strong bg-surface hover:border-accent')
  const base = 'rounded-xl border px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none'
  const move = (i, d) => { const a = [...value], j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a) }
  return (
    <div>
      <p className="font-semibold">{q.q}</p>
      {q.t === 'mcq' && <div className="mt-3 grid gap-2">{q.options.map((o, i) => <button key={i} disabled={locked} onClick={() => onChange(i)} className={`${base} ${tone(value === i)}`}>{o}</button>)}</div>}
      {q.t === 'tf' && <div className="mt-3 grid grid-cols-2 gap-2">{[true, false].map(b => <button key={String(b)} disabled={locked} onClick={() => onChange(b)} className={`${base} text-center font-semibold ${tone(value === b)}`}>{b ? 'True' : 'False'}</button>)}</div>}
      {q.t === 'fill' && <input disabled={locked} className="field" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="Type your answer" aria-label="Your answer" />}
      {q.t === 'match' && (
        <div className="mt-3 space-y-2">{q.pairs.map(([l], i) => (
          <div key={l} className="flex flex-wrap items-center gap-3 rounded-xl border border-hair-strong bg-surface px-3 py-2">
            <span className="min-w-[8rem] flex-1 font-medium">{l}</span>
            <select disabled={locked} aria-label={`Match ${l}`} className="field !mt-0 !w-auto min-w-[12rem]" value={value[i]} onChange={e => { const n = [...value]; n[i] = e.target.value; onChange(n) }}>
              <option value="">Choose…</option>{[...new Set(q.pairs.map(p => p[1]))].sort().map(r => <option key={r}>{r}</option>)}
            </select>
          </div>))}</div>
      )}
      {q.t === 'order' && (
        <ol className="mt-3 space-y-2">{value.map((it, i) => (
          <li key={it} className={`flex items-center gap-2 rounded-xl border bg-surface px-3 py-2 ${mark == null ? 'border-hair-strong' : mark ? 'border-leaf' : 'border-rose'}`}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-xs font-bold">{i + 1}</span>
            <code className="flex-1 whitespace-pre font-mono text-sm">{it}</code>
            <button disabled={locked || i === 0} aria-label="Move up" onClick={() => move(i, -1)} className="h-8 w-8 rounded-lg border border-hair-strong disabled:opacity-30">↑</button>
            <button disabled={locked || i === value.length - 1} aria-label="Move down" onClick={() => move(i, 1)} className="h-8 w-8 rounded-lg border border-hair-strong disabled:opacity-30">↓</button>
          </li>))}</ol>
      )}
    </div>
  )
}

export function Activity({ q, onSolved }) {
  const [v, setV] = useState(() => initVal(q))
  const [mark, setMark] = useState(null)
  const check = () => { const ok = grade(q, v); setMark(ok); if (ok) onSolved() }
  return (
    <div className="rounded-2xl bg-soft p-5">
      <Question q={q} value={v} onChange={x => { setV(x); setMark(null) }} mark={mark} locked={mark === true} />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="btn btn-primary btn-sm" disabled={mark === true || v === null || (q.t === 'fill' && !v.trim()) || (q.t === 'match' && v.some(x => !x))} onClick={check}>Check answer</button>
        {mark !== null && <p className={`font-semibold ${mark ? 'text-leaf' : 'text-rose'}`} role="status">{mark ? 'Correct! ✓' : q.t === 'order' ? 'Not the right order yet — keep moving blocks.' : 'Not quite — try again.'}</p>}
      </div>
    </div>
  )
}

const Frame = ({ label, children }) => <div className="rounded-2xl border border-hair p-4"><p className="eyebrow mb-3">{label}</p>{children}</div>

export function Play({ html }) {
  const [code, setCode] = useState(html)
  const [run, setRun] = useState(html)
  return (
    <div className="overflow-hidden rounded-2xl border border-hair">
      <div className="flex items-center justify-between bg-deep px-4 py-2 text-xs font-bold text-white"><span>Try it yourself</span><button className="rounded-full bg-white px-3 py-1 text-[#0b1226]" onClick={() => setRun(code)}>Run ▶</button></div>
      <div className="grid md:grid-cols-2">
        <textarea aria-label="Code editor" spellCheck="false" value={code} onChange={e => setCode(e.target.value)} className="min-h-[11rem] resize-y bg-[#0b1226] p-4 font-mono text-sm text-[#e6edf7] outline-none" />
        <iframe title="Live preview" sandbox="allow-scripts" srcDoc={run} className="min-h-[11rem] w-full bg-white" />
      </div>
    </div>
  )
}

export function Stage() {
  const [s, setS] = useState({ x: 15, y: 55, a: 0 })
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n))
  const move = () => setS(p => ({ ...p, x: clamp(p.x + Math.cos((p.a * Math.PI) / 180) * 9, 0, 90), y: clamp(p.y + Math.sin((p.a * Math.PI) / 180) * 14, 0, 78) }))
  const turn = d => setS(p => ({ ...p, a: p.a + d }))
  const repeat = () => { let i = 0; const t = setInterval(() => { move(); if (++i >= 10) clearInterval(t) }, 140) }
  const b = 'rounded-lg bg-[#f59e0b] px-3 py-2 text-sm font-bold text-[#1b1200] hover:brightness-110'
  return (
    <Frame label="Explore · Scratch stage">
      <div className="relative h-44 overflow-hidden rounded-xl border border-hair" style={{ background: 'linear-gradient(#bae6fd,#d1fae5)' }}>
        <span className="absolute text-4xl transition-all duration-200" style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `rotate(${s.a}deg)` }}>🐱</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2"><button className={b} onClick={move}>move 10 steps</button><button className={b} onClick={() => turn(15)}>turn ↻ 15°</button><button className={b} onClick={() => turn(-15)}>turn ↺ 15°</button><button className={b} onClick={repeat}>repeat 10 × move</button><button className="rounded-lg border border-hair-strong px-3 py-2 text-sm font-bold" onClick={() => setS({ x: 15, y: 55, a: 0 })}>reset</button></div>
    </Frame>
  )
}

export function Graph() {
  const [m, setM] = useState(1)
  const [b, setB] = useState(0)
  const X = x => 110 + x * 10, Y = v => 110 - v * 10
  return (
    <Frame label="Explore · graph a line">
      <div className="grid items-center gap-5 sm:grid-cols-[14rem_1fr]">
        <svg viewBox="0 0 220 220" className="w-full max-w-[14rem] rounded-xl border border-hair bg-surface" role="img" aria-label={`Graph of y = ${m}x + ${b}`}>
          {[-10, -5, 5, 10].map(g => <g key={g} stroke="var(--hair-strong)" strokeWidth=".5"><line x1={X(g)} y1="0" x2={X(g)} y2="220" /><line x1="0" y1={Y(g)} x2="220" y2={Y(g)} /></g>)}
          <line x1="0" y1="110" x2="220" y2="110" stroke="var(--muted)" /><line x1="110" y1="0" x2="110" y2="220" stroke="var(--muted)" />
          <line x1={X(-12)} y1={Y(m * -12 + b)} x2={X(12)} y2={Y(m * 12 + b)} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="space-y-4">
          <p className="font-display text-3xl">y = {m}x {b < 0 ? '−' : '+'} {Math.abs(b)}</p>
          <label className="block text-sm font-semibold">Slope m: {m}<input type="range" min="-3" max="3" step="0.5" value={m} onChange={e => setM(Number(e.target.value))} className="mt-1 w-full" /></label>
          <label className="block text-sm font-semibold">Intercept b: {b}<input type="range" min="-8" max="8" step="1" value={b} onChange={e => setB(Number(e.target.value))} className="mt-1 w-full" /></label>
        </div>
      </div>
    </Frame>
  )
}

export function Explore({ a }) {
  if (a.t === 'play') return <Play html={a.html} />
  if (a.t === 'stage') return <Stage />
  if (a.t === 'graph') return <Graph />
  return null
}

/* ---------- rich lesson text: paragraphs, "- " bullets, "1. " lists, "> " tips, **bold**, *italic*, ~code~, ~~~ blocks ~~~ ---------- */
const inline = s => s.split(/(~[^~]+~|\*\*[^*]+\*\*|\*[^*\n]+\*)/g).map((p, i) => {
  if (p.length > 2 && p[0] === '~') return <code key={i} className="rounded bg-soft px-1.5 py-0.5 font-mono text-[.88em]">{p.slice(1, -1)}</code>
  if (p.startsWith('**') && p.length > 4) return <strong key={i}>{p.slice(2, -2)}</strong>
  if (p[0] === '*' && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
  return p
})
export function Rich({ text }) {
  return (
    <div className="space-y-4 text-lg leading-relaxed">
      {text.split('~~~').map((chunk, i) => i % 2 ? (
        <pre key={i} className="overflow-x-auto rounded-xl bg-[#0b1226] p-4 font-mono text-sm leading-relaxed text-[#e6edf7]"><code>{chunk.trim()}</code></pre>
      ) : chunk.split(/\n{2,}/).map((blk, j) => {
        blk = blk.trim()
        if (!blk) return null
        const lines = blk.split('\n')
        if (lines.every(l => l.startsWith('- '))) return <ul key={`${i}-${j}`} className="list-disc space-y-1.5 pl-6">{lines.map((l, k) => <li key={k}>{inline(l.slice(2))}</li>)}</ul>
        if (lines.every(l => /^\d+\. /.test(l))) return <ol key={`${i}-${j}`} className="list-decimal space-y-1.5 pl-6">{lines.map((l, k) => <li key={k}>{inline(l.replace(/^\d+\. /, ''))}</li>)}</ol>
        if (blk.startsWith('> ')) return <div key={`${i}-${j}`} className="rounded-xl border-l-4 border-accent bg-soft p-4 text-base">{inline(blk.replace(/^> /gm, ''))}</div>
        return <p key={`${i}-${j}`}>{inline(blk)}</p>
      }))}
    </div>
  )
}

/* ---------- code runners: real Python (Pyodide) and sandboxed JavaScript ---------- */
let pyP = null
const loadPy = () => pyP || (pyP = new Promise((res, rej) => {
  const s = document.createElement('script')
  s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js'
  s.onload = () => window.loadPyodide().then(res, rej)
  s.onerror = () => { pyP = null; rej(new Error('Could not load the Python engine. Check your internet connection and try again.')) }
  document.head.appendChild(s)
}))
async function runPy(code) {
  const py = await loadPy()
  py.runPython('import sys, io\nsys.stdout = sys.stderr = io.StringIO()')
  let err = ''
  try { py.runPython(code) } catch (e) { err = String(e.message || e).trim().split('\n').slice(-2).join('\n') }
  const out = py.runPython('sys.stdout.getvalue()')
  return { out: out + (err ? (out && !out.endsWith('\n') ? '\n' : '') + err : ''), err }
}
const runJS = code => new Promise(res => {
  const id = Math.random().toString(36).slice(2)
  const f = document.createElement('iframe')
  f.setAttribute('sandbox', 'allow-scripts'); f.style.display = 'none'
  const out = []
  const stop = () => { removeEventListener('message', on); f.remove() }
  const on = e => { if (e.data?.id !== id) return; if (e.data.log !== undefined) out.push(e.data.log); if (e.data.done) { stop(); res({ out: out.join('\n') }) } }
  addEventListener('message', on)
  setTimeout(() => { stop(); res({ out: out.join('\n') + '\n(The program took too long and was stopped.)', err: 'timeout' }) }, 3000)
  f.srcdoc = '<script>const id=' + JSON.stringify(id) + ';const send=m=>parent.postMessage(Object.assign({id},m),"*");console.log=(...a)=>send({log:a.map(x=>typeof x==="object"?JSON.stringify(x):String(x)).join(" ")});try{' + code + '}catch(e){send({log:"Error: "+e.message})}send({done:1})<\/script>'
  document.body.appendChild(f)
})
const normOut = s => String(s).replace(/\r/g, '').split('\n').map(l => l.trimEnd()).join('\n').trim()

export function CodeTask({ a, onSolved }) {
  const kind = a.t
  const [code, setCode] = useState(a.starter || '')
  const [prev, setPrev] = useState(a.starter || '')
  const [out, setOut] = useState('')
  const [busy, setBusy] = useState(false)
  const [res, setRes] = useState(null)
  const [tries, setTries] = useState(0)
  const [hint, setHint] = useState(false)
  const run = async () => {
    setBusy(true); setRes(null)
    try {
      if (kind === 'task') { setPrev(code); return { out: '' } }
      const r = kind === 'pytask' ? await runPy(code) : await runJS(code)
      setOut(r.out); return r
    } catch (e) { setOut(e.message); return { out: '', err: e.message, fail: true } } finally { setBusy(false) }
  }
  const check = async () => {
    const r = await run()
    const msgs = []
    for (const c of a.checks || []) {
      const [re, msg] = Array.isArray(c) ? c : [c, 'Your code should use: ' + c]
      let ok = true
      try { ok = new RegExp(re, 'i').test(code) } catch (e) {}
      if (!ok) msgs.push(msg)
    }
    if (kind !== 'task' && a.expect != null) {
      if (r.fail) msgs.push(r.err)
      else if (normOut(r.out) !== normOut(a.expect)) msgs.push('Your output is different from the expected output. Run your code and compare.')
    }
    setRes({ ok: msgs.length === 0, msgs }); setTries(t => t + 1)
    if (!msgs.length) onSolved()
  }
  const onKey = e => {
    if (e.key !== 'Tab' || e.shiftKey) return
    e.preventDefault()
    const t = e.target, s = t.selectionStart
    setCode(code.slice(0, s) + '    ' + code.slice(t.selectionEnd))
    requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 4 })
  }
  const label = kind === 'pytask' ? 'Python' : kind === 'jstask' ? 'JavaScript' : 'HTML · CSS · JS'
  return (
    <div className="rounded-2xl border border-hair bg-soft p-5">
      <p className="eyebrow">Coding task</p>
      <div className="mt-2"><Rich text={a.q} /></div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-hair">
        <div className="flex items-center justify-between bg-deep px-4 py-2 text-xs font-bold text-white"><span>{label}</span><button disabled={busy} onClick={run} className="rounded-full bg-white px-3 py-1 text-[#0b1226] disabled:opacity-60">{busy ? 'Running…' : 'Run ▶'}</button></div>
        <div className={kind === 'task' ? 'grid md:grid-cols-2' : ''}>
          <textarea aria-label="Code editor" spellCheck="false" value={code} onChange={e => { setCode(e.target.value); setRes(null) }} onKeyDown={onKey} className="min-h-[12rem] w-full resize-y bg-[#0b1226] p-4 font-mono text-sm text-[#e6edf7] outline-none" />
          {kind === 'task' && <iframe title="Live preview" sandbox="allow-scripts" srcDoc={prev} className="min-h-[12rem] w-full bg-white" />}
        </div>
        {kind !== 'task' && <pre aria-live="polite" className="min-h-[3.5rem] whitespace-pre-wrap bg-[#060b18] p-4 font-mono text-sm text-[#a7f3d0]">{busy && kind === 'pytask' && !out ? 'Loading Python… (the first run takes a few seconds)' : out || 'Output appears here…'}</pre>}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="btn btn-primary btn-sm" disabled={busy} onClick={check}>Check my work</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setHint(h => !h)}>{hint ? 'Hide hint' : 'Hint'}</button>
        {tries >= 2 && a.solution && <button className="btn btn-ghost btn-sm" onClick={() => { setCode(a.solution); setRes(null) }}>Show solution</button>}
      </div>
      {hint && <p className="mt-3 rounded-xl bg-surface p-3 text-sm">💡 {a.hint}</p>}
      {res && (res.ok
        ? <p className="mt-3 font-semibold text-leaf" role="status">Perfect! Task complete ✓</p>
        : <ul className="mt-3 list-disc space-y-1 pl-5 font-semibold text-rose" role="status">{res.msgs.map(m => <li key={m}>{m}</li>)}</ul>)}
    </div>
  )
}

export function Checklist({ a, onSolved }) {
  const [on, setOn] = useState(() => a.items.map(() => false))
  const all = on.every(Boolean)
  useEffect(() => { if (all) onSolved() }, [all])
  return (
    <div className="rounded-2xl border border-hair bg-soft p-5">
      <p className="eyebrow">Hands-on activity</p>
      <p className="mt-2 font-semibold">{a.q}</p>
      {a.link && <a className="btn btn-ghost btn-sm mt-3" href={a.link[1]} target="_blank" rel="noopener">{a.link[0]} ↗</a>}
      <ul className="mt-3 space-y-2">{a.items.map((it, i) => (
        <li key={i}><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-hair-strong bg-surface px-4 py-3"><input type="checkbox" className="mt-1 h-5 w-5" checked={on[i]} onChange={e => setOn(o => o.map((x, j) => (j === i ? e.target.checked : x)))} /><span>{it}</span></label></li>
      ))}</ul>
      {all && <p className="mt-3 font-semibold text-leaf" role="status">Great work! ✓</p>}
    </div>
  )
}

export function Act({ a, onSolved }) {
  if (['task', 'pytask', 'jstask'].includes(a.t)) return <CodeTask a={a} onSolved={onSolved} />
  if (a.t === 'checklist') return <Checklist a={a} onSolved={onSolved} />
  return <Activity q={a} onSolved={onSolved} />
}
