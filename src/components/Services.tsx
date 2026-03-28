import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

function BrowserVisual() {
  return (
    <div className="w-full border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-200 bg-zinc-50">
        <span className="w-2 h-2 rounded-full bg-zinc-300" />
        <span className="w-2 h-2 rounded-full bg-zinc-300" />
        <span className="w-2 h-2 rounded-full bg-zinc-300" />
        <span className="ml-2 text-[10px] font-mono text-zinc-400">Hero.tsx</span>
      </div>
      <div className="p-3 font-mono text-[10px] leading-5 select-none bg-white">
        <div><span className="text-violet-500">export default</span> <span className="text-accent">function</span> <span className="text-zinc-700">Hero</span><span className="text-zinc-400">() {'{'}</span></div>
        <div className="pl-4"><span className="text-accent">return</span> <span className="text-zinc-400">(</span></div>
        <div className="pl-8"><span className="text-zinc-400">&lt;</span><span className="text-rose-400">section</span> <span className="text-teal-600">className</span><span className="text-zinc-400">=</span><span className="text-amber-500">"hero"</span><span className="text-zinc-400">&gt;</span></div>
        <div className="pl-12"><span className="text-zinc-400">&lt;</span><span className="text-rose-400">h1</span><span className="text-zinc-400">&gt;</span><span className="text-zinc-600">Building the web</span><span className="text-zinc-400">&lt;/</span><span className="text-rose-400">h1</span><span className="text-zinc-400">&gt;</span></div>
        <div className="pl-12"><span className="text-zinc-400">&lt;</span><span className="text-rose-400">p</span> <span className="text-teal-600">className</span><span className="text-zinc-400">=</span><span className="text-amber-500">"text-accent"</span><span className="text-zinc-400">&gt;</span></div>
        <div className="pl-16"><span className="text-zinc-600">one experience at a time.</span></div>
        <div className="pl-12"><span className="text-zinc-400">&lt;/</span><span className="text-rose-400">p</span><span className="text-zinc-400">&gt;</span></div>
        <div className="pl-8"><span className="text-zinc-400">&lt;/</span><span className="text-rose-400">section</span><span className="text-zinc-400">&gt;</span></div>
        <div className="pl-4"><span className="text-zinc-400">)</span></div>
        <div><span className="text-zinc-400">{'}'}</span></div>
      </div>
    </div>
  )
}

function CmsVisual() {
  const fields = [
    { name: 'title',    type: 'string',   sample: 'About us' },
    { name: 'slug',     type: 'slug',     sample: '/about' },
    { name: 'body',     type: 'richtext', sample: 'Lorem ipsum...' },
    { name: 'image',    type: 'image',    sample: 'hero.jpg' },
    { name: 'author',   type: 'ref',      sample: 'Michael A.' },
    { name: 'category', type: 'string',   sample: 'Services' },
    { name: 'featured', type: 'boolean',  sample: 'true' },
  ]
  return (
    <div className="w-full border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="px-3 py-2 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
        <span className="text-[10px] font-mono text-zinc-400">page / document</span>
        <span className="text-[10px] font-mono text-accent">Sanity CMS</span>
      </div>
      <div className="p-3 space-y-2 bg-white">
        {fields.map(({ name, type, sample }) => (
          <div key={name} className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-accent w-10 shrink-0">{name}</span>
            <span className="text-[9px] font-mono text-violet-400 w-14 shrink-0">{type}</span>
            <span className="text-[9px] font-mono text-amber-500 truncate">"{sample}"</span>
          </div>
        ))}
        <div className="mt-1 pt-2 border-t border-zinc-100 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] font-mono text-accent">Published · client can edit</span>
        </div>
      </div>
    </div>
  )
}

function DeployVisual() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {[
        { label: 'Build', status: 'done' },
        { label: 'Deploy', status: 'done' },
        { label: 'Live', status: 'live' },
      ].map(({ label, status }) => (
        <div key={label} className="flex items-center justify-between bg-white border border-zinc-200 rounded-lg px-3 py-2">
          <span className="text-[11px] font-mono text-zinc-500">{label}</span>
          <span className={`flex items-center gap-1.5 text-[10px] font-mono ${status === 'live' ? 'text-accent' : 'text-zinc-400'}`}>
            {status === 'live'
              ? <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              : <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 inline-block" />}
            {status === 'live' ? 'Live' : '✓'}
          </span>
        </div>
      ))}
    </div>
  )
}

function FirebaseVisual() {
  const collections = [
    { name: 'users', fields: ['uid', 'email', 'plan'] },
    { name: 'data', fields: ['id', 'value', 'timestamp'] },
  ]
  return (
    <div className="flex gap-3 w-full">
      {collections.map((col) => (
        <div key={col.name} className="flex-1 border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="px-2.5 py-1.5 border-b border-zinc-100 bg-zinc-50">
            <span className="text-[9px] font-mono text-accent">{col.name}/</span>
          </div>
          <div className="p-2 space-y-1">
            {col.fields.map((f) => (
              <div key={f} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-zinc-300 shrink-0" />
                <span className="text-[9px] font-mono text-zinc-400">{f}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Services() {
  const { ref, inView } = useInView()

  const cards = [
    {
      visual: <BrowserVisual />,
      title: 'Front-End & Design',
      desc: 'Responsive interfaces with React and Tailwind. Smooth animations, clean typography, and pixel-perfect layouts.',
      span: 'lg:col-span-3',
    },
    {
      visual: <CmsVisual />,
      title: 'CMS Integration',
      desc: 'Sanity CMS setup so clients manage their own content — no developer needed after handoff.',
      span: 'lg:col-span-3',
    },
    {
      visual: <DeployVisual />,
      title: 'Deploy & Hosting',
      desc: 'CI/CD pipelines with Netlify. Every push to git ships to production automatically.',
      span: 'lg:col-span-2',
    },
    {
      visual: <FirebaseVisual />,
      title: 'Cloud & Backend',
      desc: 'Authentication, Firestore database, and serverless functions with Firebase — scalable from day one.',
      span: 'lg:col-span-4',
    },
  ]

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">What I do</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-zinc-900 tracking-tight">
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {cards.map(({ visual, title, desc, span }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09, ease: 'easeOut' }}
              className={`col-span-1 sm:col-span-1 ${span} bg-white border border-zinc-200/70 rounded-2xl p-5 flex flex-col gap-3`}
            >
              <div className="flex-1">{visual}</div>
              <div>
                <p className="font-heading font-semibold text-base text-zinc-900 mb-1.5">{title}</p>
                <p className="font-body text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
