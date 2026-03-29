import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

type Entry = { id: number; type: 'cmd' | 'output' | 'error' | 'info'; content: React.ReactNode }

const SPINNER = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']

function NpmAuditFixOutput() {
  const [frame, setFrame] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const spin = setInterval(() => setFrame(f => (f + 1) % SPINNER.length), 80)
    const s1 = setTimeout(() => setStep(1), 1200)
    const s2 = setTimeout(() => setStep(2), 2200)
    const s3 = setTimeout(() => { setStep(3); clearInterval(spin) }, 3000)
    return () => { clearInterval(spin); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3) }
  }, [])

  return (
    <div className="space-y-0.5">
      <p className="text-zinc-500">{step < 3 ? SPINNER[frame] : '✓'} scanning vulnerabilities...</p>
      {step >= 1 && <p className="text-zinc-500">{step < 3 ? SPINNER[(frame+3) % SPINNER.length] : '✓'} applying fixes...</p>}
      {step >= 2 && <p className="text-zinc-500">{step < 3 ? SPINNER[(frame+6) % SPINNER.length] : '✓'} rebuilding tree...</p>}
      {step >= 3 && (
        <>
          <p className="text-zinc-400 mt-1">fixed: <span className="text-green-500">0</span></p>
          <p className="text-zinc-400">introduced: <span className="text-red-400">3 new critical vulnerabilities</span></p>
          <p className="text-red-400 font-medium">53 critical vulnerabilities found</p>
          <p className="text-zinc-400">congratulations, it's worse now.</p>
        </>
      )}
    </div>
  )
}

function NpmInstallOutput() {
  const [frame, setFrame] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const spin = setInterval(() => setFrame(f => (f + 1) % SPINNER.length), 80)
    const finish = setTimeout(() => { clearInterval(spin); setDone(true) }, 2800)
    return () => { clearInterval(spin); clearTimeout(finish) }
  }, [])

  if (!done) return (
    <div className="space-y-0.5">
      <p className="text-zinc-500">{SPINNER[frame]} installing packages...</p>
      <p className="text-zinc-400">{SPINNER[(frame + 3) % SPINNER.length]} resolving dependencies</p>
      <p className="text-zinc-400">{SPINNER[(frame + 6) % SPINNER.length]} fetching modules</p>
    </div>
  )

  return (
    <div className="space-y-0.5">
      <p className="text-zinc-500">added 1,337 packages in 6.7s</p>
      <p className="text-zinc-400">324 packages are looking for funding</p>
      <p className="text-red-400 font-medium mt-1">50 critical vulnerabilities found</p>
      <p className="text-zinc-400">run `npm audit fix` to feel worse about it</p>
    </div>
  )
}

function NpmBuildOutput({ onClear, onScroll }: { onClear: () => void; onScroll: () => void }) {
  const [frame, setFrame]         = useState(0)
  const [step, setStep]           = useState(0)
  const [countdown, setCountdown] = useState<number | null>(null)

  useEffect(() => { onScroll() }, [step, countdown])

  useEffect(() => {
    const spin = setInterval(() => setFrame(f => (f + 1) % SPINNER.length), 80)
    const s1 = setTimeout(() => setStep(1), 800)
    const s2 = setTimeout(() => setStep(2), 1600)
    const s3 = setTimeout(() => { setStep(3); clearInterval(spin) }, 2400)
    const s4 = setTimeout(() => setStep(4), 3200)
    const s5 = setTimeout(() => setCountdown(3), 4200)
    const s6 = setTimeout(() => setCountdown(2), 5200)
    const s7 = setTimeout(() => setCountdown(1), 6200)
    const s8 = setTimeout(() => onClear(), 7200)
    return () => { clearInterval(spin); [s1,s2,s3,s4,s5,s6,s7,s8].forEach(clearTimeout) }
  }, [])

  return (
    <div className="space-y-0.5">
      <p className="text-zinc-500">&gt; portfolio@1.0.0 build</p>
      <p className="text-zinc-500">&gt; tsc && vite build</p>
      <p className="text-zinc-400 mt-1">
        {step < 3 ? `${SPINNER[frame]} compiling...` : '✓ compiled'}
      </p>
      {step >= 1 && (
        <p className="text-zinc-400">
          {step < 3 ? `${SPINNER[(frame+3)%SPINNER.length]} type checking...` : '✓ type checked'}
        </p>
      )}
      {step >= 2 && (
        <p className="text-zinc-400">
          {step < 3 ? `${SPINNER[(frame+6)%SPINNER.length]} bundling...` : '✓ bundled'}
        </p>
      )}
      {step >= 3 && (
        <div className="mt-1 space-y-0.5">
          <p className="text-red-400">error TS2551: Property 'fix' does not exist on type 'Bug[]'. Did you mean 'ignore'?</p>
          <p className="text-red-400">error TS2339: Property 'sleep' does not exist on type 'Developer'.</p>
          <p className="text-red-400">error TS2740: Type 'hope' is missing properties: 'tests', 'docs'.</p>
        </div>
      )}
      {step >= 4 && (
        <div className="mt-2 space-y-0.5">
          <p className="text-red-500 font-bold animate-pulse">💥 CATASTROPHIC FAILURE</p>
          <p className="text-red-400">INITIATING SELF-DESTRUCT SEQUENCE...</p>
          {countdown !== null && (
            <p className="text-red-300 font-bold text-lg">{countdown}...</p>
          )}
        </div>
      )}
    </div>
  )
}

type Actions = { clear: () => void; scroll: () => void }
const RESPONSES: Record<string, (actions: Actions) => React.ReactNode> = {
  help: () => (
    <div className="space-y-1.5">
      <p className="text-zinc-400 mb-2">available commands:</p>
      {([
        ['whoami',             'who is this guy?'],
        ['5k time',           'so u like running?'],
        ['cups of coffee',    'a few'],
        ['bugs',              'yes'],
        ['npm install',       'what can go wrong?'],
        ['npm run build',    'bold strategy'],
        ['sudo hire ', 'trust me'],
        ['clear',             'clear terminal'],
      ]).map(([cmd, desc]) => (
        <div key={cmd} className="flex gap-3">
          <span className="text-accent shrink-0 w-44">{cmd}</span>
          <span className="text-zinc-500">— {desc}</span>
        </div>
      ))}
    </div>
  ),
  whoami: () => (
    <div className="space-y-1">
      <p className="text-zinc-800">Michael Anagnostou</p>
      <p className="text-zinc-500">CS Student · Front-End Developer</p>
      <p className="text-zinc-500">Love running and hiking</p>
      <p className="text-zinc-400 mt-1">(Also enjoys playing League of Legends</p>
      <p className="text-zinc-400">and World of Warcraft, a lot)</p>
    </div>
  ),
  '5k time': () => (
    <p className="text-zinc-500">we don't ask such things</p>
  ),
  'cups of coffee': () => (
    <div className="space-y-0.5">
      <p className="text-red-400">ArrayIndexOutOfBoundsException:</p>
      <p className="text-zinc-500 pl-2">Index 2,847 out of bounds for length 3</p>
      <p className="text-zinc-400 pl-2">at CoffeeCounter.getCount(CoffeeCounter.java:7)</p>
      <p className="text-zinc-400 pl-2">at Main.main(Main.java:1)</p>
    </div>
  ),
  'bugs': () => (
    <div className="space-y-0.5">
      <p className="text-zinc-500">yes.</p>
      <p className="text-zinc-400">we call them "features" here.</p>
    </div>
  ),
  'npm install': () => <NpmInstallOutput />,
  'npm run build': ({ clear, scroll }) => <NpmBuildOutput onClear={clear} onScroll={scroll} />,
  'npm audit fix': () => <NpmAuditFixOutput />,
  'sudo hire': () => (
    <div className="space-y-1">
      <p className="text-green-500">[sudo] permission granted ✓</p>
      <p className="text-zinc-500">best decision you'll make today.</p>
    </div>
  ),
}

const KONAMI_KEYS = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

function TerminalCard({ inView }: { inView: boolean }) {
  const [history, setHistory] = useState<Entry[]>([
    { id: 0, type: 'info', content: (
      <div className="space-y-0.5">
        <p className="text-zinc-600 font-medium">michael@portfolio ~ v3.0.0</p>
        <p className="text-zinc-400">
          type <span className="text-accent">help</span> to see the available commands.
        </p>
      </div>
    )},
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdHistIdx, setCmdHistIdx] = useState(-1)
  const [cursorPos, setCursorPos] = useState(0)
  const [focused, setFocused] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const konamiIdx = useRef(0)
  const focusedRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history, input])

  // Keep triggerKonami fresh so the global listener always has latest setHistory
  const triggerKonami = () => {
    terminalRef.current?.focus()
    setHistory(h => [...h,
      { id: Date.now(),     type: 'cmd',    content: '↑↑↓↓←→←→BA' },
      { id: Date.now() + 1, type: 'output', content: (
        <div className="space-y-0.5">
          <p className="text-yellow-500 font-medium">★ CHEAT CODE ACCEPTED ★</p>
          <p className="text-zinc-500">How does one even find that? 😭😭</p>
          <p className="text-zinc-500">skill issue: resolved</p> 
          <p className="text-zinc-400">achievement unlocked: "Last easter egg, i promise"</p>
        </div>
      )},
    ])
  }
  const triggerKonamiRef = useRef(triggerKonami)
  triggerKonamiRef.current = triggerKonami

  function advanceKonami(key: string): boolean {
    if (key === KONAMI_KEYS[konamiIdx.current]) {
      konamiIdx.current++
      if (konamiIdx.current === KONAMI_KEYS.length) {
        konamiIdx.current = 0
        return true
      }
    } else {
      konamiIdx.current = key === KONAMI_KEYS[0] ? 1 : 0
    }
    return false
  }

  // Global listener — fires even when terminal is not focused
  useEffect(() => {
    function onGlobalKey(e: KeyboardEvent) {
      if (focusedRef.current) return // handleKeyDown already handles it
      if (advanceKonami(e.key)) triggerKonamiRef.current()
    }
    window.addEventListener('keydown', onGlobalKey)
    return () => window.removeEventListener('keydown', onGlobalKey)
  }, [])


  function submit(cmd: string) {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory([])
      setCmdHistory(h => [trimmed, ...h])
      setCmdHistIdx(-1)
      setInput('')
      setCursorPos(0)
      return
    }

    const scrollToBottom = () => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight }
    const clearTerminal = () => {
      setHistory([{ id: Date.now(), type: 'info', content: (
        <div className="space-y-0.5">
          <p className="text-zinc-600">look, the build failed — but that's never stopped anyone. Push to prod anyway!!</p>
        </div>
      )}])
      setInput('')
      setCursorPos(0)
    }
    const responseFn = RESPONSES[trimmed]
    setHistory(h => [
      ...h,
      { id: Date.now(),     type: 'cmd',   content: trimmed },
      responseFn
        ? { id: Date.now() + 1, type: 'output', content: responseFn({ clear: clearTerminal, scroll: scrollToBottom }) }
        : { id: Date.now() + 1, type: 'error',  content: `command not found: ${trimmed}. try 'help'` },
    ])
    setCmdHistory(h => [trimmed, ...h])
    setCmdHistIdx(-1)
    setInput('')
    setCursorPos(0)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.metaKey || e.ctrlKey || e.altKey) return
    e.preventDefault()
    e.stopPropagation()
    if (advanceKonami(e.key)) { triggerKonamiRef.current(); return }

    if (e.key === 'Enter') {
      submit(input)
    } else if (e.key === 'Backspace') {
      if (cursorPos === 0) return
      setInput(i => i.slice(0, cursorPos - 1) + i.slice(cursorPos))
      setCursorPos(p => p - 1)
    } else if (e.key === 'ArrowLeft') {
      setCursorPos(p => Math.max(0, p - 1))
    } else if (e.key === 'ArrowRight') {
      setCursorPos(p => Math.min(input.length, p + 1))
    } else if (e.key === 'ArrowUp') {
      const next = Math.min(cmdHistIdx + 1, cmdHistory.length - 1)
      setCmdHistIdx(next)
      const val = cmdHistory[next] ?? ''
      setInput(val)
      setCursorPos(val.length)
    } else if (e.key === 'ArrowDown') {
      const next = Math.max(cmdHistIdx - 1, -1)
      setCmdHistIdx(next)
      const val = next === -1 ? '' : cmdHistory[next]
      setInput(val)
      setCursorPos(val.length)
    } else if (e.key.length === 1) {
      setInput(i => i.slice(0, cursorPos) + e.key + i.slice(cursorPos))
      setCursorPos(p => p + 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      className="hidden md:block shrink-0 w-[28rem] mt-[40px]"
    >
      <div
        ref={terminalRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => { setFocused(true); focusedRef.current = true }}
        onBlur={() => { setFocused(false); focusedRef.current = false }}
        onClick={() => terminalRef.current?.focus()}
        className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white cursor-text outline-none"
      >
        {/* Chrome */}
        <div className="flex items-center gap-1.5 px-5 py-3.5 bg-zinc-50 border-b border-zinc-200 select-none">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="ml-auto font-mono text-[10px] text-zinc-400">michael@portfolio: ~</span>
        </div>

        {/* History */}
        <div ref={scrollRef} className="p-6 font-mono text-[13px] h-72 overflow-y-auto space-y-3 select-none">
          {history.map(entry => (
            <div key={entry.id}>
              {entry.type === 'cmd' && (
                <div className="flex gap-2">
                  <span className="text-accent shrink-0">~$</span>
                  <span className="text-zinc-800">{entry.content}</span>
                </div>
              )}
              {entry.type === 'output' && (
                <div className="pl-4 text-zinc-500">{entry.content}</div>
              )}
              {entry.type === 'error' && (
                <div className="pl-4 text-red-400">{entry.content}</div>
              )}
              {entry.type === 'info' && (
                <div className="text-zinc-400">{entry.content}</div>
              )}
            </div>
          ))}

          {/* Active prompt */}
          <div className="flex items-start gap-2">
            <span className="text-accent shrink-0">~$</span>
            <span className="text-zinc-800 break-all">
              {focused ? (
                <>
                  {input.slice(0, cursorPos)}
                  <span className="bg-accent text-white">{input[cursorPos] ?? '\u00A0'}</span>
                  {input.slice(cursorPos + 1)}
                </>
              ) : (
                <>{input}<span className="inline-block w-[7px] h-[13px] bg-zinc-300 align-middle ml-px" /></>
              )}
            </span>
          </div>

        </div>
      </div>

      <p className="font-body text-[10px] text-zinc-400 text-center mt-2">click to interact</p>
    </motion.div>
  )
}

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">About</p>

            <h2 className="font-heading font-bold text-3xl md:text-4xl text-zinc-900 leading-tight tracking-tight mb-8">
              From concept to{' '}
              <span className="text-accent">deployment</span>.
            </h2>

            <p className="font-body text-zinc-600 text-lg leading-relaxed mb-5">
              I'm a Computer Science student at DUTH and an aspiring developer. I'm
              continuously learning new tools and technologies to expand my skillset,
              and I love not only making things that work well, but also feel good to use.
            </p>
            <p className="font-body text-zinc-500 text-base leading-relaxed">
              My academic journey has provided me with a strong foundation in
              programming and software development. I've worked on everything from
              desktop applications in JavaFX to modern web apps with React and Astro —
              each project teaching me something new about craft and user experience.
              Outside of coding, I enjoy gaming, running, and hiking.
            </p>
          </motion.div>

          <TerminalCard inView={inView} />
        </div>
      </div>
    </section>
  )
}
