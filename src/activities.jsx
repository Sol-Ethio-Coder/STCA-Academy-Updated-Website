import { useState, useEffect } from 'react'
import { PASS } from './data.js'
export { PASS }

const norm = s => String(s ?? '').trim().toLowerCase().replace(/\s+/g, '')
export const isGraded = q => ['mcq', 'tf', 'fill', 'order', 'match', 'checklist', 'task', 'pytask', 'jstask', 'ctask'].includes(q.t)
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

export function Binary({ signed }) {
  const [bits, setBits] = useState([0, 0, 0, 0, 1, 0, 1, 0])
  const wt = i => (signed && i === 0 ? -128 : 2 ** (7 - i))
  const val = bits.reduce((t, b, i) => t + b * wt(i), 0)
  return (
    <Frame label={signed ? "Explore · two's complement (8 bits)" : 'Explore · binary numbers'}>
      <div className="flex flex-wrap justify-center gap-2">{bits.map((b, i) => (
        <button key={i} aria-label={`Bit worth ${wt(i)}`} aria-pressed={!!b} onClick={() => setBits(x => x.map((y, j) => (j === i ? 1 - y : y)))}
          className={`flex w-12 flex-col items-center rounded-xl border-2 px-1 py-2 font-mono transition-all hover:-translate-y-0.5 ${b ? 'border-accent bg-accent/15' : 'border-hair-strong bg-surface'}`}>
          <span className="text-xs text-muted">{wt(i)}</span><span className="text-2xl font-bold">{b}</span></button>))}</div>
      <p className="mt-4 text-center font-display text-3xl">{bits.join('')} = <span className="grad-text">{val}</span></p>
      <p className="mt-1 text-center text-sm text-muted">{signed ? 'The leftmost bit is worth −128. Tap bits and add the place values of the 1s.' : 'Tap the bits, then add the place values of the 1s.'}{!signed && val >= 33 && val <= 126 ? ` In the ASCII text code, ${val} is the character "${String.fromCharCode(val)}".` : ''}</p>
    </Frame>
  )
}

const FIT_PTS = [[1, 3.4], [2, 4.8], [3, 7.3], [4, 8.6], [5, 11.2], [6, 12.9]]
export function Fit() {
  const [m, setM] = useState(0.5)
  const [b, setB] = useState(0)
  const err = FIT_PTS.reduce((t, [x, y]) => t + (m * x + b - y) ** 2, 0) / FIT_PTS.length
  const X = x => 20 + x * 26, Y = v => 200 - v * 12
  return (
    <Frame label="Explore · teach the line">
      <div className="grid items-center gap-5 sm:grid-cols-[15rem_1fr]">
        <svg viewBox="0 0 240 220" className="w-full max-w-[15rem] rounded-xl border border-hair bg-surface" role="img" aria-label={`Data points and a line y = ${m}x + ${b}`}>
          <line x1="20" y1="200" x2="232" y2="200" stroke="var(--muted)" /><line x1="20" y1="8" x2="20" y2="200" stroke="var(--muted)" />
          {FIT_PTS.map(([x, y]) => <line key={'e' + x} x1={X(x)} y1={Y(y)} x2={X(x)} y2={Y(m * x + b)} stroke="var(--g3)" strokeDasharray="3 3" />)}
          <line x1={X(0)} y1={Y(b)} x2={X(8)} y2={Y(8 * m + b)} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          {FIT_PTS.map(([x, y]) => <circle key={x} cx={X(x)} cy={Y(y)} r="5" fill="var(--g2)" />)}
        </svg>
        <div className="space-y-4">
          <p className="text-lg">Error (lower is better): <b className={`font-display text-3xl ${err < 0.5 ? 'text-leaf' : ''}`}>{err.toFixed(2)}</b></p>
          <label className="block text-sm font-semibold">Slope m: {m.toFixed(1)}<input type="range" min="0" max="4" step="0.1" value={m} onChange={e => setM(Number(e.target.value))} className="mt-1 w-full" /></label>
          <label className="block text-sm font-semibold">Intercept b: {b.toFixed(1)}<input type="range" min="-2" max="6" step="0.1" value={b} onChange={e => setB(Number(e.target.value))} className="mt-1 w-full" /></label>
          <p className="text-sm font-semibold" role="status">{err < 0.5 ? 'Great fit! The model has learned the pattern. 🎉' : 'Keep adjusting. Dashed red lines show the error of each point.'}</p>
        </div>
      </div>
    </Frame>
  )
}

const POMO = { classic: [1500, 300, 900, 'Classic 25 / 5'], short: [900, 180, 600, 'Short 15 / 3'], demo: [10, 5, 8, 'Demo 10 s / 5 s'] }
export function Pomodoro() {
  const [mode, setMode] = useState('classic')
  const [phase, setPhase] = useState('work')
  const [left, setLeft] = useState(POMO.classic[0])
  const [run, setRun] = useState(false)
  const [done, setDone] = useState(0)
  const idx = phase === 'work' ? 0 : phase === 'break' ? 1 : 2
  const total = POMO[mode][idx]
  useEffect(() => { if (!run) return; const t = setInterval(() => setLeft(l => l - 1), 1000); return () => clearInterval(t) }, [run])
  useEffect(() => {
    if (left > 0) return
    if (phase === 'work') { const n = done + 1; const next = n % 4 === 0 ? 'long' : 'break'; setDone(n); setPhase(next); setLeft(POMO[mode][next === 'long' ? 2 : 1]) }
    else { setPhase('work'); setLeft(POMO[mode][0]) }
  }, [left])
  const pick = m => { setMode(m); setPhase('work'); setLeft(POMO[m][0]); setRun(false) }
  const reset = () => { setRun(false); setPhase('work'); setLeft(POMO[mode][0]); setDone(0) }
  const R = 54, C = 2 * Math.PI * R
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0')
  const label = phase === 'work' ? 'Focus' : phase === 'break' ? 'Short break' : 'Long break'
  const col = phase === 'work' ? 'var(--g3)' : 'var(--g1)'
  return (
    <Frame label="Explore · Pomodoro timer">
      <div className="grid items-center gap-6 sm:grid-cols-[13rem_1fr]">
        <div className="relative mx-auto h-48 w-48">
          <svg viewBox="0 0 130 130" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="65" cy="65" r={R} fill="none" stroke="var(--hair-strong)" strokeWidth="9" />
            <circle cx="65" cy="65" r={R} fill="none" stroke={col} strokeWidth="9" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - (total - left) / total)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl font-semibold tabular-nums" role="timer" aria-live="off">{mm}:{ss}</span>
            <span className="text-sm font-semibold" style={{ color: col }} aria-live="polite">{label}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">{Object.entries(POMO).map(([k, v]) => <button key={k} onClick={() => pick(k)} aria-pressed={mode === k} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${mode === k ? 'border-transparent bg-brand text-onbrand' : 'border-hair-strong hover:border-accent'}`}>{v[3]}</button>)}</div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn btn-primary btn-sm" onClick={() => setRun(r => !r)}>{run ? 'Pause' : left === total && done === 0 ? 'Start' : 'Resume'}</button>
            <button className="btn btn-ghost btn-sm" onClick={reset}>Reset</button>
          </div>
          <p className="text-sm">Pomodoros completed: <b className="font-display text-xl">{done}</b> <span aria-hidden="true">{'🍅'.repeat(Math.min(done, 8))}</span></p>
          <p className="text-sm text-muted">After every 4th pomodoro you get a long break. Try the Demo speed to see a whole cycle in seconds.</p>
        </div>
      </div>
    </Frame>
  )
}

const GATES = { AND: (a, b) => a & b, OR: (a, b) => a | b, XOR: (a, b) => a ^ b, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b), NOT: a => 1 - a }
export function Gates() {
  const [g, setG] = useState('AND')
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const one = g === 'NOT'
  const out = one ? GATES.NOT(a) : GATES[g](a, b)
  const rows = one ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]]
  const tog = (v, set, name) => <button onClick={() => set(1 - v)} aria-pressed={!!v} aria-label={`Input ${name}`} className={`h-14 w-14 rounded-xl border-2 font-mono text-2xl font-bold transition-all hover:-translate-y-0.5 ${v ? 'border-accent bg-accent/15' : 'border-hair-strong bg-surface'}`}>{v}</button>
  return (
    <Frame label="Explore · logic gates">
      <div className="flex flex-wrap gap-2">{Object.keys(GATES).map(k => <button key={k} onClick={() => setG(k)} aria-pressed={g === k} className={`rounded-full border px-4 py-1.5 text-sm font-bold ${g === k ? 'border-transparent bg-brand text-onbrand' : 'border-hair-strong hover:border-accent'}`}>{k}</button>)}</div>
      <div className="mt-5 grid items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2"><span className="text-xs font-bold text-muted">A</span>{tog(a, setA, 'A')}{!one && <><span className="text-xs font-bold text-muted">B</span>{tog(b, setB, 'B')}</>}</div>
          <div className="rounded-xl border-2 border-hair-strong bg-surface px-5 py-6 font-display text-2xl font-bold">{g}</div>
          <div className={`flex h-16 w-16 items-center justify-center rounded-full border-4 font-mono text-2xl font-bold transition-colors ${out ? 'border-leaf bg-leaf/20 text-leaf' : 'border-hair-strong text-muted'}`} role="status" aria-label={`Output ${out}`}>{out}</div>
        </div>
        <table className="mx-auto text-center text-sm"><thead><tr>{(one ? ['A'] : ['A', 'B']).map(h => <th key={h} className="px-3 py-1">{h}</th>)}<th className="px-3 py-1">Out</th></tr></thead>
          <tbody>{rows.map(r => { const o = one ? GATES.NOT(r[0]) : GATES[g](r[0], r[1]); const cur = one ? r[0] === a : r[0] === a && r[1] === b; return <tr key={r.join('')} className={cur ? 'bg-accent/15 font-bold' : ''}>{r.map((v, i) => <td key={i} className="px-3 py-1 font-mono">{v}</td>)}<td className="px-3 py-1 font-mono">{o}</td></tr> })}</tbody></table>
      </div>
    </Frame>
  )
}

export function Explore({ a }) {
  if (a.t === 'play') return <Play html={a.html} />
  if (a.t === 'stage') return <Stage />
  if (a.t === 'graph') return <Graph />
  if (a.t === 'fit') return <Fit />
  if (a.t === 'binary') return <Binary signed={a.signed} />
  if (a.t === 'pomodoro') return <Pomodoro />
  if (a.t === 'gates') return <Gates />
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
      if (kind === 'ctask') return { out: '' }
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
  const label = kind === 'pytask' ? 'Python' : kind === 'jstask' ? 'JavaScript' : kind === 'ctask' ? 'C++ · checked for key parts, not compiled' : 'HTML · CSS · JS'
  return (
    <div className="rounded-2xl border border-hair bg-soft p-5">
      <p className="eyebrow">Coding task</p>
      <div className="mt-2"><Rich text={a.q} /></div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-hair">
        <div className="flex items-center justify-between bg-deep px-4 py-2 text-xs font-bold text-white"><span>{label}</span>{kind !== 'ctask' && <button disabled={busy} onClick={run} className="rounded-full bg-white px-3 py-1 text-[#0b1226] disabled:opacity-60">{busy ? 'Running…' : 'Run ▶'}</button>}</div>
        <div className={kind === 'task' ? 'grid md:grid-cols-2' : ''}>
          <textarea aria-label="Code editor" spellCheck="false" value={code} onChange={e => { setCode(e.target.value); setRes(null) }} onKeyDown={onKey} className="min-h-[12rem] w-full resize-y bg-[#0b1226] p-4 font-mono text-sm text-[#e6edf7] outline-none" />
          {kind === 'task' && <iframe title="Live preview" sandbox="allow-scripts" srcDoc={prev} className="min-h-[12rem] w-full bg-white" />}
        </div>
        {(kind === 'pytask' || kind === 'jstask') && <pre aria-live="polite" className="min-h-[3.5rem] whitespace-pre-wrap bg-[#060b18] p-4 font-mono text-sm text-[#a7f3d0]">{busy && kind === 'pytask' && !out ? 'Loading Python… (the first run takes a few seconds)' : out || 'Output appears here…'}</pre>}
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
  if (['task', 'pytask', 'jstask', 'ctask'].includes(a.t)) return <CodeTask a={a} onSolved={onSolved} />
  if (a.t === 'checklist') return <Checklist a={a} onSolved={onSolved} />
  return <Activity q={a} onSolved={onSolved} />
}
