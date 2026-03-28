import { motion, type Variants } from 'framer-motion'
// @ts-ignore
import TextType from './TextType'
import { PointerHighlight } from './ui/pointer-highlight'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }
const item: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } }

const tools = [
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Astro',      slug: 'astro' },
  { name: 'Sanity',     slug: 'sanity' },
  { name: 'Git',        slug: 'git' },
  { name: 'Firebase',   slug: 'firebase' },
  { name: 'Tailwind',   slug: 'tailwindcss' },
  { name: 'React',      slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Node.js',    slug: 'nodedotjs' },
  { name: 'Express',    slug: 'express' },
  { name: 'MySQL',      slug: 'mysql' },
]


function BrowserWireframe() {
  const rows = [
    { label: 'Logo', w: 'w-8' },
    { label: 'Nav', w: 'w-20' },
    { label: 'H1', w: 'w-24' },
    { label: 'Body', w: 'w-28' },
    { label: 'CTA', w: 'w-12' },
  ]
  return (
    <div className="border border-zinc-300/50 rounded bg-white/60 w-44 overflow-hidden shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-zinc-200/60 bg-zinc-50/80">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
        <div className="ml-1 flex-1 h-1.5 bg-zinc-200/70 rounded-full" />
      </div>
      {/* Skeleton rows */}
      <div className="p-2.5 space-y-2">
        {rows.map(({ label, w }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-zinc-300 w-7 shrink-0">{label}</span>
            <div className={`h-1.5 bg-zinc-200/80 rounded-full ${w}`} />
            <div className="h-1.5 bg-zinc-200/50 rounded-full flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CodePanel() {
  const lines = [
    { key: '"name"',   val: '"Michael Anagnostou"', accent: true },
    { key: '"role"',   val: '"Front-End Developer"', accent: true },
    { key: '"stack"',  val: '["React", "Astro", ...]', accent: false },
    { key: '"status"', val: '"Open to work"', accent: true },
  ]
  return (
    <div className="border border-zinc-300/50 rounded bg-white/60 w-52 overflow-hidden shadow-sm">
      {/* Chrome */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-zinc-200/60 bg-zinc-50/80">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
        <span className="ml-auto text-[8px] font-mono text-zinc-400">[ .JSON ]</span>
      </div>
      {/* Code lines */}
      <div className="p-2.5 space-y-1.5 font-mono text-[8px]">
        <div className="text-zinc-300">{'{'}</div>
        {lines.map(({ key, val, accent }) => (
          <div key={key} className="flex gap-1 pl-2">
            <span className="text-zinc-400">{key}:</span>
            <span className={accent ? 'text-accent' : 'text-zinc-400'}>{val}</span>
          </div>
        ))}
        <div className="text-zinc-300">{'}'}</div>
      </div>
      {/* Status bar */}
      <div className="px-2.5 py-1.5 border-t border-zinc-200/60 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[8px] font-mono text-accent">Available now</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
      }} />

      {/* Dot cluster — top-left, larger */}
      <div className="absolute top-16 left-10 grid gap-1.5 opacity-25 pointer-events-none select-none hidden lg:grid z-0"
        style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}>
        {Array.from({ length: 54 }).map((_, i) => (
          <div key={i} className="w-[3px] h-[3px] rounded-full bg-zinc-400" />
        ))}
      </div>

      {/* Dot cluster — right, lower + smaller */}
      <div className="absolute top-32 right-16 grid gap-1.5 opacity-20 pointer-events-none select-none hidden lg:grid z-0"
        style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-[2.5px] h-[2.5px] rounded-full bg-zinc-400" />
        ))}
      </div>

      {/* Teal dot cluster — mid-left, offset low */}
      <div className="absolute top-[52%] left-[26%] grid gap-1 opacity-15 pointer-events-none select-none hidden xl:grid z-0"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-[2.5px] h-[2.5px] rounded-full bg-accent" />
        ))}
      </div>

      {/* Teal dot cluster — mid-right, offset high */}
      <div className="absolute top-[32%] right-[24%] grid gap-1 opacity-15 pointer-events-none select-none hidden xl:grid z-0"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-[2.5px] h-[2.5px] rounded-full bg-accent" />
        ))}
      </div>

      {/* Browser wireframe — left, higher up */}
      <div className="absolute top-[22%] left-8 opacity-65 pointer-events-none select-none hidden xl:block z-0">
        <BrowserWireframe />
      </div>

      {/* Code panel — right, lower */}
      <div className="absolute top-[38%] right-8 opacity-65 pointer-events-none select-none hidden xl:block z-0">
        <CodePanel />
      </div>

      {/* + markers — intentionally uneven */}
      {([
        'top-[19%] left-[21%]',
        'top-[25%] right-[23%]',
        'top-[62%] left-[17%]',
        'top-[70%] right-[20%]',
        'top-[44%] left-[37%]',
        'top-[39%] right-[35%]',
        'top-[56%] right-[41%]',
      ] as const).map((pos, i) => (
        <span key={i} className={`absolute ${pos} text-accent/40 text-lg font-light select-none pointer-events-none z-0 hidden lg:block`}>+</span>
      ))}

      {/* Bracket corner labels */}
      <span className="absolute top-[13%] left-[7%] text-[9px] font-mono text-zinc-400 pointer-events-none select-none z-0 hidden xl:block">[ Front-End ]</span>
      <span className="absolute top-[13%] right-[7%] text-[9px] font-mono text-zinc-400 pointer-events-none select-none z-0 hidden xl:block">[ Full-Stack ]</span>
      <span className="absolute bottom-[24%] left-[7%] text-[9px] font-mono text-zinc-400 pointer-events-none select-none z-0 hidden xl:flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse inline-block" />
        Open to work
      </span>
      <span className="absolute bottom-[24%] right-[7%] text-[9px] font-mono text-zinc-400 pointer-events-none select-none z-0 hidden xl:block">Kavala, Greece</span>

      {/* Main content — centered */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center"
        >
          {/* Name — intro line */}
          <motion.div variants={item}>
            <p className="font-body text-lg text-zinc-700 font-semibold tracking-wide">
              Michael Anagnostou
            </p>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="mt-4">
            <h1
              className="font-heading font-black leading-[1.05] tracking-tighter text-zinc-950"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
            >
              Building the web,
              <br />
              <PointerHighlight
                rectangleClassName="border-accent/50"
                pointerClassName="text-accent"
                containerClassName="inline-block"
              >
                <span className="text-accent px-2 py-1">one experience</span>
              </PointerHighlight>
              <span className="text-zinc-950"> at a time.</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={item} className="mt-1.5">
            <TextType
              text={[
                'CS Student & Front-End Developer',
                'Open to internships, junior roles & freelance work',
              ]}
              typingSpeed={42}
              deletingSpeed={22}
              pauseDuration={2400}
              loop={true}
              showCursor={true}
              cursorCharacter="_"
              cursorClassName="text-accent"
              className="font-body text-sm text-zinc-500 font-light"
            />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3 items-center justify-center">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent text-zinc-950 font-body font-semibold text-sm px-7 py-3 rounded-full hover:bg-accent-light transition-colors duration-200 cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="/Michael_Anagnostou_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-700 font-body font-medium text-sm px-7 py-3 rounded-full hover:border-zinc-400 hover:text-zinc-900 bg-white transition-colors duration-200 cursor-pointer"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech stack — bottom, marquee carousel */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 w-full pt-6 pb-20"
      >
        <p className="text-center font-body text-[10px] tracking-widest uppercase text-zinc-500 mb-5 px-6">
          Nothing but cutting edge technologies.
        </p>
        {/* outer mask for fade edges */}
        <div className="relative overflow-hidden w-[820px] mx-auto [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-10 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...tools, ...tools].map((tool, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-default shrink-0">
                <div className="relative w-7 h-7">
                  <img
                    src={`https://cdn.simpleicons.org/${tool.slug}/a1a1aa`}
                    alt={tool.name}
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200 group-hover:opacity-0"
                  />
                  <img
                    src={`https://cdn.simpleicons.org/${tool.slug}/2DD4BF`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </div>
                <span className="font-body text-[11px] text-zinc-500 group-hover:text-accent tracking-wide transition-colors duration-200 whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  )
}
